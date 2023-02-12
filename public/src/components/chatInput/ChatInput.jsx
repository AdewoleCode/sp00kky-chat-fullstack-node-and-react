import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import "./ChatInput.css"

export const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        console.log(message);
        setMsg(message);
    };

     const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };


    return (
        <div className="chat-input">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPicker} />
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                }
            </div>
            <form className="input-form" onSubmit={(event) => sendChat(event)}>
                <input type="text"
                    placeholder="type your messages"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg} />
            </form>
            <div className="input-button" onClick={sendChat}>
                <IoMdSend />
            </div>
        </div>
    )
}
