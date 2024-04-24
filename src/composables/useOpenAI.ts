import { computed, ref } from "vue";

const textArray = ref<string[]>([])
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};
const collectionId = ref("")
const messages = ref<Message[]>([
  // {
  //   role: 'system',
  //   content: 'be concise, no fluff'
  // }
]);

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
    clearMessages: () => {
      messages.value=[]
      collectionId.value = ""
    },
    sendMessage
  };
}

const sendCompetions = async () => {
  const url = 'https://avatar.galimzhanov.com/apiv2/completions/'
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify(messages.value),
  }).then(r => r.json());
};

const sendMessage = async (text: string) => {
  messages.value.push({
    role: "user",
    content: text,
  });
  gtpIsStreaming.value = true
  const response_message = await sendCompetions();
  gtpIsStreaming.value = false
  currentMessage.value = response_message
  messages.value.push({
    role: 'assistant',
    content: response_message
  })
  // тут нужно сохранить ответ в pocketbase
  saveMessages()
  // const reader = stream.body.getReader();
  // const decoder = new TextDecoder("utf-8");

  // while (true) {
  //   const { done, value } = await reader.read();

  //   if (done) break;
  //   // Massage and parse the chunk of data
  //   const chunk = decoder.decode(value);
  //    // Clean up the data
  //   const lines = chunk
  //   .split("\n")
  //   .map((line) => line.replace("data: ", ""))
  //   .filter((line) => line.length > 0)
  //   .filter((line) => line !== "[DONE]")
  //   .map((line) => {
  //     try {
  //       return JSON.parse(line)
  //     } catch {
  //       console.log(line)
  //       return ""
  //     }
  //   });
  
  //   for (const parsedLine of lines) {
  //     const { choices } = parsedLine;
  //     if (choices && choices.length) {
  //       const { delta, finish_reason } = choices[0];
  //       const { content } = delta;
        
  //       if (content) {
  //         // currentWord.value = content
  //         currentMessage.value += content
  
  //         textArray.value.push(content)
  //       }
  //       if (finish_reason) {
  //         gtpIsStreaming.value = false
  //         messages.value.push({
  //           role: 'assistant',
  //           content: currentMessage.value
  //         })
  //         // currentMessage.value = ""
  //       }
  //     }
  //   }
  // }
}
function saveMessages () {
  if (!collectionId.value) {
    fetch('https://rasult22.pockethost.io/api/collections/avatar_history/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages.value.map(m => `<p><b>${m.role}</b>: ${m.content}</p>`).join('\n')
      })
    }).then(data => data.json()).then(data => {
      console.log(data)
      collectionId.value = data.id
    })
  } else {
    fetch('https://rasult22.pockethost.io/api/collections/avatar_history/records/' + collectionId.value, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages.value.map(m => `<p><b>${m.role}</b>: ${m.content}</p>`).join('\n')
      })
    })
  }
}