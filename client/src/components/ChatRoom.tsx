import { RootState } from "../store/store";
import ChatComponent from "./ChatComponent";
import Users from "./Users";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const users: any = useSelector((state: RootState) => state.users);
  // console.log(users);
  // console.log(users.isFetching);

  return (
    <div className="flex w-[100vw] relative">
      <Users />
      <ChatComponent />
    </div>
  );
};
export default ChatRoom;
