import { useOptimistic} from "react";
import type { Message} from "@/interfaces/chat.ts";

type OptimisticAction = {
    type: "CREATE_MESSAGE";
    message: Message;
}

export function useOptimisticSendMessage(initial: Message[]) {
   const [messages, setMessages] = useOptimistic<Message[], OptimisticAction>(initial, (state, action) => {
       switch (action.type) {
           case "CREATE_MESSAGE":
               return [...state, action.message];
           default:
               return state;
       }
   });

   const createMessage = (message: Message) => {
       setMessages({ type: "CREATE_MESSAGE", message  });
   }

   return { messages, createMessage };
}