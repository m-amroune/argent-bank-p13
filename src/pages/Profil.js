import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, userUpdate } from "../redux/userSlice";

import Accounts from "../components/Accounts";

const Profil = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { userToken, userInfo } = useSelector((state) => state.user);
  const [displayForm, setDisplayForm] = useState(false);
  const dispatch = useDispatch();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  console.log(userInfo);

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  useEffect(() => {
    if (userToken) {
      dispatch(getUserProfile(userToken));
    }
  }, [userToken, dispatch]);

  const handleSaveChangeData = () => {
    const data = { firstName, lastName };
    dispatch(userUpdate(data));
    setDisplayForm(false);
  };

  const handleCancel = () => {
    if (displayForm) {
      setDisplayForm(false);
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
          {displayForm ? (
            <form>
              <input
                type="text"
                onChange={handleFirstNameChange}
                value={firstName}
              />
              <input
                type="text"
                onChange={handleLastNameChange}
                value={lastName}
              />
              <div>
                <button
                  type="button"
                  onClick={handleSaveChangeData}
                  className="edit-button"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="edit-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1>
                {userInfo && userInfo.firstName} {userInfo && userInfo.lastName}
              </h1>
              <button
                type="button"
                onClick={() => setDisplayForm(true)}
                className="edit-button"
              >
                Edit Name
              </button>
            </div>
          )}
        </div>
        <Accounts />
      </main>
    </div>
  );
};

export default Profil;
