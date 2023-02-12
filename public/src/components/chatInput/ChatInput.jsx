import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import "./ChatInput.css"

export const ChatInput = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("hello")

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        console.log(message);
        setMsg(message);
    };


    return (
        <div className="chat-input">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPicker} />
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                }
            </div>
            <div className="input-form">
                <input type="text"
                    placeholder="type your messages"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg} />
            </div>
            <div className="input-button">
                <IoMdSend />
            </div>
        </div>
    )
}
