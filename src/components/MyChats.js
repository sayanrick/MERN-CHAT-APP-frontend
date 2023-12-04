import React, { useEffect, useState } from "react";
import { useChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box, Button, Text, Stack, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    if (loggedUser) {
      fetchChats();
    }
  }, [loggedUser, fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* My Chats Header */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work Sans"
        fontWeight="bold" // Make the text bold
        display="flex"
        width="100%"
        backgroundColor="#A9A9A9"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md" // Add a shadow for a modern look
        marginBottom={4} // Add margin to create a gap
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "17px" }}
            rightIcon={<AddIcon />}
            marginLeft="auto"
            colorScheme="facebook" // Use a color scheme for a cleaner look
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chats List */}
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#A9A9A9"
        // w="100%"
        // h="80%"
        borderRadius="lg"
      >
        {chats ? (
          <Stack overflow="hidden">
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "facebook.500" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
