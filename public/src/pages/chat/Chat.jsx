import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import ChatContainer from "../../components/chatContainer/ChatContainer";
import Contacts from "../../components/contacts/Contacts";
import Welcome from "../../components/welcome/Welcome";
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

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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



