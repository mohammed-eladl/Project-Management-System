import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import deleteItem from "../../../../assets/delete.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { ProjectInterface } from "../../../../InterFaces/interfaces";

const ProjectsList = () => {
  const navigate = useNavigate();
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);

  // Fucntion To Get All Projects
  const getProjectsList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Project/manager`, {
        headers: requestHeaders,
      });

      setProjectList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fucntion To Navigat To Add New Project
  const navigateToAddProject = () => {
    navigate("/dashboard/projectdata");
  };

  // for Model To Delete Project
  const [projectId, setProjectId] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id:any) => {
    setProjectId(id);
    setDeleteShow(true);
  };

  // delete project Submit
  const onDeleteSubmit = async () => {
    try {
    
      const response = await axios.delete(`${baseUrl}/Project/${projectId}`, {
        headers: requestHeaders,
      });
      console.log(response)
      handleDeleteClose();
      getProjectsList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsList();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between p-4 shadow-sm">
        <h2>Projects</h2>
        <button
          onClick={navigateToAddProject}
          className="btn warningg rounded-4 text-light"
        >
          <i className="fa fa-plus"></i> Add New Project
        </button>
      </div>

      <div className="list-container p-5">
        {/* Table list Projects */}
        {projectList.length > 0 ? (
          <>
            <table className="table table-striped table-hover text-center border w-100 my-5 mx-auto">
              <thead>
                <tr>
                  <th scope="col">Num Of Project</th>
                  <th scope="col">Title</th>
                  <th scope="col">Task</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date Created</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project: ProjectInterface) => (
                  <tr key={project.id}>
                    <td scope="row">{project.id}</td>
                    <th>{project.title}</th>
                    <th>{project.task?.length}</th>
                    <th>{project.description}</th>
                    <th>{project.creationDate}</th>
                    <th>
                      <i className="fa fa-edit text-warning mx-1"></i>
                      <i
                        onClick={() => handleDeleteShow(project.id)}
                        className="fa fa-trash text-danger mx-1"
                      ></i>
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

      {/* For Delete Project */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3 mx-5">
            <div className="text-center">
              <img src={deleteItem} alt="" className="w-75" />
              <h6>Are you sure you want to delete this Project ?</h6>
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

export default ProjectsList;
