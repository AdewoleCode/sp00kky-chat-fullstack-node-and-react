import React, { useState, useEffect, useRef } from "react";
import "../components/Chatbox.css"
import Logout from "./Logout";
import { ChatInput } from "./chatInput/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentContactChat, currentUser, socket }) {

  const [chatMsg, setChatMsg] = useState([])

  useEffect(() => {
    fetchAllMessages()
  }, [currentContactChat])

  const fetchAllMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentContactChat._id
    })
    setChatMsg(response.data)
    console.log(response.data);
  }

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentContactChat._id,
      message: msg
    })
    console.log(msg);
  }

  console.log(currentUser.username, currentContactChat.username);


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
        {/* {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message?.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message?.message}</p>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
      <div className="chat-input-container">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   border: 1px solid green
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     border: 1px solid green

//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #4f04ff21;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9900ff20;
//       }
//     }
//   }
// `;
