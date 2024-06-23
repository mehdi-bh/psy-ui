"use client";
import { useState, useEffect } from 'react';
import { Button, Textarea, User } from "@nextui-org/react";

interface DiscussionMessage {
  MessageId: string;
  PsychologistId: string;
  PatientId: string;
  Message: string;
  Timestamp: string;
  Sender: string;
  Seen: boolean;
}

interface Patient {
  PatientId: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Sex: string;
  Email: string;
  PhoneNumber: string;
  Address: {
    Street: string;
    City: string;
    State: string;
    ZipCode: string;
  };
  Description?: string;
  Photo?: string;
  PsychologistId: string;
}

export default function Inbox() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatList, setChatList] = useState<Patient[]>([]);

  useEffect(() => {
    // fetch('https://6n97whk5nb.execute-api.eu-west-3.amazonaws.com/dev/patients/psychologist/456', {
    fetch('http://localhost:3000/dev/patients/psychologist/456')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setChatList(data);
      })
      .catch(error => console.error('Error fetching patient list:', error));
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      // fetch('https://6n97whk5nb.execute-api.eu-west-3.amazonaws.com/dev/discussion_messages/456/${selectedChatId}`', {
      fetch(`http://localhost:3000/dev/discussion_messages/456/${selectedChatId}`)
        .then(response => response.json())
        .then(data => {
          setMessages(data);
        })
        .catch(error => console.error('Error fetching discussion messages:', error));
    }
  }, [selectedChatId]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChatId) {
      const newMsg: DiscussionMessage = {
        MessageId: Date.now().toString(),
        PsychologistId: '456',
        PatientId: selectedChatId,
        Message: newMessage,
        Timestamp: new Date().toISOString(),
        Sender: 'Psychologist',
        Seen: false,
      };
      // fetch('https://6n97whk5nb.execute-api.eu-west-3.amazonaws.com/dev/discussion_message', {
      fetch('http://localhost:3000/dev/discussion_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMsg),
      })
        .then(response => response.json())
        .then(data => {
          console.log(messages)
          setMessages([...messages, data]);
          setNewMessage('');
        })
        .catch(error => console.error('Error sending message:', error));
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 border-r">
        <h2 className="text-xl font-bold p-4">Discussions</h2>
        <ul>
          {chatList.map(chat => (
            <li key={chat.PatientId} onClick={() => handleChatSelect(chat.PatientId)} className="cursor-pointer mr-4 p-2 hover:bg-gray-200 rounded">
              <User name={`${chat.FirstName} ${chat.LastName}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        {selectedChatId ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map(msg => (
                <div key={msg.MessageId} className={`p-2 my-2 ${msg.Sender === 'Psychologist' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded ${msg.Sender === 'Psychologist' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                    {msg.Message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <Textarea
                type="text"
                className="flex-1"
                value={newMessage}
                variant={"bordered"}
                onChange={e => setNewMessage(e.target.value)}
              />
              <Button
                color="primary"
                className="ml-2"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-gray-500">Select a discussion to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
