import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthUser } from "../hook/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import toast from "react-hot-toast";

const STEAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { chatId: targetChattingUser } = useParams();
  console.log("Chat ID:", targetChattingUser);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data } = useQuery({
    queryKey: ["stream-token"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  console.log("Stream Token:", data);

  useEffect(() => {
    const initalizedChat = async () => {
      if (!data?.token || !authUser) return;

      try {
        console.log("Initializing chat client...");

        const client = StreamChat.getInstance(STEAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data?.token
        );

        const channelId = [authUser._id, targetChattingUser].sort().join("-");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetChattingUser],
        });

        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel);
      } catch (error) {
        console.error("Error initializing chat client:", error);
      } finally {
        setLoading(false);
      }
    };

    initalizedChat();
  }, [data, authUser, targetChattingUser]);

  if (loading || !chatClient || !channel) {
    return <ChatLoader />;
  }

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `📞 Video Call Invitation: Join me for a video call! ${callUrl}`,
      });

      toast.success("Video call invitation sent!");
    }
  };

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
