import { ref } from "vue";
import useQueue from "./useQueue";

const API_KEY = process.env.VUE_APP_OPENAI_API_KEY;
const { add, first, remove, size, queue } = useQueue<string>([]);
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};
const messages = ref<Message[]>([]);

const gtpIsStreaming = ref(false)
const currentMessage = ref("")
const currentWord = ref("")
export default function useOpenAI() {
  return {
    currentMessage,
    textQueue: queue,
    currentWord,
    gtpIsStreaming,
    messages,
    sendMessage: async (text: string) => {
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
          console.log(line)
          return JSON.parse(line)
        });
      
        for (const parsedLine of lines) {
          const { choices } = parsedLine;
          const { delta, finish_reason } = choices[0];
          const { content } = delta;
          
          if (content) {
            currentWord.value = content
            currentMessage.value += content
            add(content)
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
    },
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
      max_tokens: 50,
      messages: messages.value,
    }),
  });
};
