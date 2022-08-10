import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import UserForm from "../../components/userForm/index";
import "./Account.css";

const About = () => {
  const [editMe, setEditMe] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);

  const accountInfo = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMe(!editMe);
  };

  return (
    <section className='account-section'>
      {editMe ? 
        <UserForm editMe={editMe} setEditMe={setEditMe} accountInfo={accountInfo} />
        :
        <div className="grid text-center d-flex justify-content-center">
          {/* bootstrap rsponsive */}
          <div className="g-col-12">
            <div className="userForm  mx-4">
              <form>
                <div className="form-container">
                  <div className="avatar-container">
                    <img
                      src={accountInfo.iconUrl}
                      alt="avatarPicture"
                      id="avatarPicture"
                    />
                  </div>
                  <div>
                    <div className="username">
                      <h1>Username:</h1>
                      <span className="user-input">{accountInfo.username}</span>
                    </div>
                    <div className="email">
                      <h1>Email:</h1>
                      <span className="user-input">{accountInfo.email}</span>
                    </div>
                    <div className="aboutme">
                      <h1>About:</h1>
                      <span className="user-input text-wrap">{accountInfo.description}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-btn">
                  {/* <button
                    type="submit"
                    className="editMe-btn"
                    onClick={handleEdit}
                  >
                    Edit
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default About;