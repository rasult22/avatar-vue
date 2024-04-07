import { computed, ref } from "vue";

const API_KEY = process.env.VUE_APP_OPENAI_API_KEY;
const textArray = ref<string[]>([])
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};
const messages = ref<Message[]>([{
  role: 'system',
  content: 'Do not write long text. Your limit is 500 symbols. Try to reply only in this limits.'
}]);

const gtpIsStreaming = ref(false)
const currentMessage = ref("")
const currentWord = ref("")
export default function useOpenAI() {
  return {
    currentMessage,
    textArr: textArray,
    arrSize: computed(() => textArray.value.length),
    currentWord,
    gtpIsStreaming,
    messages,
    sendMessage
  };
}

const sendCompetions = async () => {
  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      stream: true,
      max_tokens: 1000,
      messages: messages.value,
    }),
  });
};

const sendMessage = async (text: string) => {
  messages.value.push({
    role: "user",
    content: text,
  });
  const stream = await sendCompetions();
  gtpIsStreaming.value = true
  const reader = stream.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;
    // Massage and parse the chunk of data
    const chunk = decoder.decode(value);
     // Clean up the data
    const lines = chunk
    .split("\n")
    .map((line) => line.replace("data: ", ""))
    .filter((line) => line.length > 0)
    .filter((line) => line !== "[DONE]")
    .map((line) => {
      try {
        return JSON.parse(line)
      } catch {
        console.log(line)
        return ""
      }
    });
  
    for (const parsedLine of lines) {
      const { choices } = parsedLine;
      if (choices && choices.length) {
        const { delta, finish_reason } = choices[0];
        const { content } = delta;
        
        if (content) {
          // currentWord.value = content
          currentMessage.value += content
  
          textArray.value.push(content)
        }
        if (finish_reason) {
          gtpIsStreaming.value = false
          messages.value.push({
            role: 'assistant',
            content: currentMessage.value
          })
          // currentMessage.value = ""
        }
      }
    }
  }
}
