import React, { useState, useEffect, useRef } from "react";
import "../chatContainer/Chatbox.css"
import Logout from "../logout/Logout";
import { ChatInput } from "../chatInput/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";

export default function ChatContainer({ currentContactChat, currentUser, socket }) {

  const [chatMsg, setChatMsg] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  useEffect(() => {
    fetchAllMessages()
  }, [currentContactChat])

  const fetchAllMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentContactChat._id
    })
    setChatMsg(response.data.projectMessages)
  }

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentContactChat._id,
      message: msg
    })
    socket.current.emit("send-msg", {
      to: currentContactChat._id,
      from: currentUser._id,
      message: msg
    })
    const msgs = [...chatMsg]
    msgs.push({fromSelf: true, message: msg})
    setChatMsg(msgs)
  }

  useEffect(()=> {
    if(socket.current){
      socket.current.on("msg-recieve", (msg)=> {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  }, [])

  useEffect(() => {
    arrivalMessage && setChatMsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsg]);


console.log(chatMsg);

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64, ${currentContactChat.avatarImage} `}
              alt="contact"
            />
          </div>
          <div className="username">
            <h3>{currentContactChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        <h1>messages</h1>
        {chatMsg?.map((message) => {
          return (
            // <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sent" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message?.message}</p>
                </div>
              </div>
            // </div>
          );
        })}
      </div>
      <div className="chat-input-container">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

