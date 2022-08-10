import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../../utils/mutations';
import "./userForm.css";

const UserForm = ({ editMe, setEditMe, accountInfo }) => {
  const [userName, setUserName] = useState("username");
  const [aboutMe, setAboutMe] = useState("aboutme");
  const [avatarPic, setAvatarPic] = useState(accountInfo.iconUrl);

  const [editUser, { error }] = useMutation(EDIT_USER);

  const handleNameChange = (e) => {
    e.preventDefault();
    var userNameInput = e.target.value.trim();
    if (userNameInput.length !== 0) {
      setUserName(userNameInput);
      // else tell user to enter valid username
    } else {
      setUserName(userName);
      console.log("Please enter a valid username:!");
      alert("Please enter a username");
    }
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    var descpInput = e.target.value.trim();
    if (descpInput.length !== 0) {
      console.log(aboutMe, "CHANGING TO ", descpInput);
      setAboutMe(descpInput);
    } else {
      setAboutMe(aboutMe);
      console.log("Please enter a description");
      alert("Please enter a description");
    }
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    var imgInput = e.target.value;
    console.log(imgInput);
    setAvatarPic(imgInput);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    //todo set everything back manually, change this when you change state too
    setUserName("username");
    setAboutMe("aboutme");
    setAvatarPic(accountInfo.iconUrl);
    setEditMe(!editMe);
  };

  const handleFormChanges = (e) => {
    e.preventDefault();
    // set to opposite of edit Value
    setEditMe(!editMe);
  };

  // edit button clicked? show Form, else, DISPLAY-ONLY variables
  // can change username, description , and Icon URL/avatar!
  return (
    <div className="grid text-center d-flex justify-content-center">
      <div className="g-col-12">
        <div className="userForm mx-4">
          <div>
            <div className="form-card ">
              <img src={avatarPic} alt="avatarPicture" id="avatarPicture" />
              <div className="avatar-container">
                <div className="input-container">
                  <label>
                    Choose an Avatar[URL]:
                    <input
                      type="text"
                      id="avatar"
                      onChange={handleAvatarChange}
                      className="user-input"
                      defaultValue={accountInfo.iconUrl}
                    />
                  </label>
                </div>
              </div>
              <div>
                <div>
                  <label>
                    Username:
                    <input
                      onChange={handleNameChange}
                      id="username"
                      className="user-input"
                      required
                      defaultValue={accountInfo.username}
                    />
                  </label>
                </div>
                <div>
                  <label className="labelAboutme">
                    About:
                    <textarea
                      onChange={handleDescriptionChange}
                      placeholder="About me.."
                      id="about-me"
                      rows={5}
                      cols={30}
                      required
                      defaultValue={accountInfo.description}
                    ></textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-btn">
              <button
                type="button"
                className="reset-btn"
                onClick={handleCancelSubmit}
              >
                Cancel
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={handleFormChanges}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
