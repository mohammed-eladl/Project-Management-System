import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import deleteItem from "../../../../assets/delete.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { TaskInterface } from "../../../../InterFaces/interfaces";

const TaskesList = () => {
  const navigate = useNavigate();
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);

  // Fucntion To Get All Projects
  const getTasksList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Task/manager`, {
        headers: requestHeaders,
      });

      setTaskList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fucntion To Navigat To Add New Project
  const navigateToAddTask = () => {
    navigate("/dashboard/taskdata");
  };

  // for Model To Delete Task
  const [taskId, setTaskId] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setTaskId(id);
    setDeleteShow(true);
  };

  // delete project Submit
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/Task/${taskId}`, {
        headers: requestHeaders,
      });
      handleDeleteClose();
      getTasksList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between p-4 shadow-sm">
        <h2>Tasks</h2>
        <button
          onClick={navigateToAddTask}
          className="btn warningg rounded-4 text-light"
        >
          <i className="fa fa-plus"></i> Add New Task
        </button>
      </div>

      <div className="list-container p-5">
        {/* Table list Projects */}

        {taskList.length > 0 ? (
          <>
            <table className="table table-striped table-hover text-center border w-100 my-5 mx-auto">
              <thead>
                <tr>
                  <th scope="col">Num Of Task</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  <th scope="col">Date Created</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task: TaskInterface) => (
                  <tr key={task.id}>
                    <td scope="row">{task.id}</td>
                    <th>{task.title}</th>
                    <th>{task.status}</th>
                    <th>{task.employee?.userName}</th>
                    <th>{task.project?.title}</th>
                    <th>{task.creationDate}</th>

                    <th>
                      <i className="fa fa-edit text-warning mx-1"></i>
                      <i
                        onClick={() => handleDeleteShow(task.id)}
                        className="fa fa-trash text-danger mx-1"
                      ></i>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
         <NoData/>
        )}
      </div>

      {/* For Delete Project */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Task</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3 mx-5">
            <div className="text-center">
              <img src={deleteItem} alt="" className="w-75" />
              <h6>Are you sure you want to delete this Task ?</h6>
              <h6>If you are sure just click on delete it.</h6>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger fw-bold" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskesList;
