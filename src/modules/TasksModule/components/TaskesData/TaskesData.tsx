import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const TaskesData = () => {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { baseUrl, requestHeaders }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addNewTask = async (data: any) => {
    try {
      const res = await axios.post(`${baseUrl}/Task/`, data, {
        headers: requestHeaders,
      });
      navigate("/dashboard/tasks");
    } catch (error) {
      console.log(error);
    }
  };
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

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getProjectsList();
    getUsersList();
  }, []);
  return (
    <>
      <div className="container-fluid p-4 shadow-sm mb-4">
        <div className="row align-items-center">
          <div className="col-md-6 E382F">
            <Link
              to="/dashboard/tasks"
              className="fw-light E382F text-decoration-none fs-6"
            >
              <p>&lt; View All Tasks</p>
            </Link>
            <h3>Add a New Task</h3>
          </div>
        </div>
      </div>

      <div className="form-container shadow-lg rounded-4 w-75 m-auto mt-5">
        <form
          action=""
          onSubmit={handleSubmit(addNewTask)}
          className="form-wrapper m-auto w-100  pt-5 pb-3 px-5"
        >
          <div className="form-group my-3">
            <label className="label-title mb-2 text-black-50">Title</label>
            <input
              {...register("title", {
                required: true,
              })}
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Title..."
            />

            {errors.title && errors.title.type === "required" && (
              <span className="text-danger ">title is required</span>
            )}
          </div>
          <div className="form-group my-3">
            <label className="label-title mb-2 text-black-50">
              Description
            </label>
            <textarea
              {...register("description", {
                required: true,
              })}
              rows={5}
              name="description"
              className="form-control"
              placeholder="Enter description..."
            ></textarea>

            {errors.title && errors.title.type === "required" && (
              <span className="text-danger ">title is required</span>
            )}
          </div>

          {/* fnkdhgjkhdkj */}

          <div className="row">
          
             <div className="col-md-6 ">
             <label className="label-title  text-black-50">
              Users
            </label>
              <select
                {...register("employeeId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="form-select mt-sm-3 mt-md-0"
              >
                <option className="text-muted">User</option>

                {userList?.map((user: any) => (
                  <>
                    <option key={user.id} value={user?.id}>
                      {user?.userName}
                    </option>
                  </>
                ))}
              </select>
              {errors.employeeId && errors.employeeId.type === "required" && (
                <span className="text-danger ">No Status Selected</span>
              )}
            </div>

            <div className="col-md-6 ">
            <label className="label-title  text-black-50">
              Project
            </label>
              <select
                {...register("projectId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="form-select mt-sm-3 mt-md-0"
              >
                <option className="text-muted">Project</option>

                {projectList?.map((project: any) => (
                  <>
                    <option key={project?.id} value={project.id}>
                      {project.title}
                    </option>
                  </>
                ))}
              </select>
              {errors.projectId && errors.projectId.type === "required" && (
                <span className="text-danger ">No Status Selected</span>
              )}
            </div>
          </div>

          <div className="form-group my-3 d-flex justify-content-between align-items-center">
            <button
              onClick={goBack}
              className="btn btn-outline-danger rounded-5"
            >
              Cancel
            </button>
            <button className="btn btn-outline-success rounded-5 my-3 px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskesData;
