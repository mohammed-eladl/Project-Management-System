import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../../../InterFaces/interfaces";
import avatar from "../../../../assets/Avatar.png";
import NoData from "../../../SharedModule/components/NoData/NoData";

const UsersList = () => {
  const navigate = useNavigate();
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  // Fucntion To Get All Users
  const getUsersList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Users/manager`, {
        headers: requestHeaders,
      });

      setUserList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Fucntion To Toggle Users status
  const toggleUsersStatus = async (id: number) => {
    try {
      const res = await axios.put(
        `${baseUrl}/Users/${id}`,
        {},
        {
          headers: requestHeaders,
        }
      );
      getUsersList();
    } catch (error) {
      console.log(error);
    }
  };
  // fucntion To Navigat To Add New User
  const navigateToAddProject = () => {
    navigate("/dashboard/userdata");
  };

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between p-4 shadow-sm">
        <h2>Users</h2>
        <button
          onClick={navigateToAddProject}
          className="btn warningg rounded-4 text-light"
        >
          <i className="fa fa-plus"></i> Add New User
        </button>
      </div>

      <div className="list-container p-5">
        {/* Table list Projects */}
        {userList.length > 0 ? (
          <>
            <table className="table table-striped table-hover text-center border w-100 my-5 mx-auto">
              <thead>
                <tr>
                  <th scope="col">Num Of User</th>
                  <th scope="col">user Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Status</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date Created</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user: Employee) => (
                  <tr key={user.id}>
                    <td scope="row">{user.id}</td>
                    <th>{user.userName}</th>
                    <th>
                      {user.imagePath ? (
                        <img
                          src={`https://upskilling-egypt.com:3003/${user.imagePath}`}
                          alt={user.userName}
                        />
                      ) : (
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={avatar}
                          alt={user.userName}
                        />
                      )}
                    </th>
                    <th>{user.status}</th>
                    <th>{user.phoneNumber}</th>
                    <th>{user.email}</th>
                    <th>{user.creationDate}</th>
                    <th>
                      {user.isActivated ? (
                        <i
                          onClick={() => {
                            toggleUsersStatus(user.id);
                          }}
                          className="fa-solid fa-2x fa-toggle-on text-success"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            toggleUsersStatus(user.id);
                          }}
                          className="fa-solid fa-2x fa-toggle-off text-danger"
                        ></i>
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default UsersList;
