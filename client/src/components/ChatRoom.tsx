import ChatComponent from "./ChatComponent";
import Users from "./Users";

const ChatRoom = () => {
  return (
    <>
      <div className="flex w-[100vw] relative">
        <Users />
        <ChatComponent />
      </div>
    </>
  );
};
export default ChatRoom;
