export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
type SubscriberType = (messages: ChatMessageType[]) => void;

//const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
let ws: WebSocket | null;
const closeHandler = () => {
  console.log("CLOSE WS");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((subscr) => subscr(newMessages));
};

export function createChannel() {
  ws?.removeEventListener("close", closeHandler);
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
}

let subscribers = [] as SubscriberType[];

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.close();
  },
  subscr(callback: SubscriberType) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((subscr) => subscr !== callback);
    };
  },
  unsubscr(callback: SubscriberType) {
    subscribers = subscribers.filter((subscr) => subscr !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
