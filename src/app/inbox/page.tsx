"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Textarea, User } from "@nextui-org/react";

import { getPatients } from "../../services/patientService";
import { getMessages } from "../../services/discussionService";
import { DiscussionMessage } from "../../models/DiscussionMessage";
import { Patient } from "../../models/Patient";
import config from "../../config/config";

const Inbox: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chatList, setChatList] = useState<Patient[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const userId = "456";
  const userType = "PSYCHOLOGIST";

  const fetchPatients = useCallback(async () => {
    try {
      const data = await getPatients(userId);

      setChatList(data);
    } catch (error) {
      console.error("Error fetching patient list:", error);
    }
  }, [userId]);

  const fetchMessages = useCallback(
    async (chatId: string) => {
      try {
        const data = await getMessages(userId, chatId);

        setMessages(data);
      } catch (error) {
        console.error("Error fetching discussion messages:", error);
      }
    },
    [userId],
  );

  const initializeWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }

    const websocket = new WebSocket(
      `${config.WS_URL}?userId=${userId}&userType=${userType}`,
    );

    websocket.onopen = () => console.log("Connected to WebSocket");
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, message]);
    };
    websocket.onclose = () => console.log("Disconnected from WebSocket");

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current = websocket;

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId, userType]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId, fetchMessages]);

  useEffect(() => {
    return initializeWebSocket();
  }, [initializeWebSocket]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChatId) {
      const newMsg: DiscussionMessage = {
        MessageId: Date.now().toString(),
        PsychologistId: userId,
        PatientId: selectedChatId,
        Message: newMessage,
        Timestamp: new Date().toISOString(),
        Sender: "Psychologist",
        Seen: false,
      };

      if (ws.current) {
        ws.current.send(
          JSON.stringify({ action: "sendMessage", data: newMsg }),
        );
        setNewMessage("");
      }
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 border-r">
        <h2 className="text-xl font-bold p-4">Discussions</h2>
        <ul>
          {chatList.map((chat) => (
            <li
              key={chat.PatientId}
              className="cursor-pointer mr-4 p-2 hover:bg-gray-200 rounded"
              onClick={() => handleChatSelect(chat.PatientId)}
            >
              <User name={`${chat.FirstName} ${chat.LastName}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        {selectedChatId ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.MessageId}
                  className={`p-2 my-2 ${msg.Sender === "Psychologist" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded ${msg.Sender === "Psychologist" ? "bg-blue-200" : "bg-gray-200"}`}
                  >
                    {msg.Message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <Textarea
                className="flex-1"
                type="text"
                value={newMessage}
                variant="bordered"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                className="ml-2"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-gray-500">
              Select a discussion to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
