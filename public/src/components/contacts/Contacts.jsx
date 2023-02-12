import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg"
import "./Contact.css"


export default function Contacts({ contacts, changeContact }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelectedContact, setCurrentSelectedContact] = useState(undefined);


  useEffect( () => {
    setUserAndImage()
  }, []);

  const setUserAndImage = async () => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-user")
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);

  }

  const changeSelectedContact = (index, contact) => {
    setCurrentSelectedContact(index);
    changeContact(contact);
  };


  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contact-container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>spooky</h3>
          </div> 
          <div className="contacts">
            {contacts?.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelectedContact ? "selected" : ""
                  }`}
                  onClick={() => changeSelectedContact(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

  
