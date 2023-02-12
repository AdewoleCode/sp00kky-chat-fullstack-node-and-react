import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../../utils/APIRoutes";
import './SetAvatar.css'


export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645446`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=> {
    unAuthorized()
  }, []);


  const unAuthorized = () => {
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isImageSet) {
        console.log(data);
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = []
      for (let i = 0; i < 5; i++) {
        let response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
        const buffer = new Buffer(response.data)
        data.push(buffer.toString("base64"))
        // console.log(response.data);
        // console.log(data);
        // console.log(data[1]);
      }
      setAvatars(data)
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {isLoading ? (
        <div className="avatar-container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="avatar-container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                key={avatar}

                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

