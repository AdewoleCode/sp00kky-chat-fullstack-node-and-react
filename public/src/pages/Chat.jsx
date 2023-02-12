import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import "./Chat.css"

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentContactChat, setCurrentContactChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    getCurrentUser()
  }, []);

  const getCurrentUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("chat-app-user")
        )
      );
    }
  }

  console.log(currentUser);


  useEffect(() => {
    getAndSetContacts()
  }, [currentUser]); 

  
  const getAndSetContacts = async ()=> {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        // console.log(data);
        setContacts(data.data.users);
      } else {
        navigate("/setAvatar");
      }
    }
  }


  const handleContactChange = (contact) => {
    setCurrentContactChat(contact);
    console.log(contact);
  };


  return (
    <>
      <div className="chat-container">
        <div className="container-1">
          <Contacts contacts={contacts} changeContact={handleContactChange} />
          {currentContactChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentContactChat={currentContactChat} currentUser={currentUser} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}



