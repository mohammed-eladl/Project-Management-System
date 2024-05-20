import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const ProjectsData = () => {
  const navigate = useNavigate();
  
  const { baseUrl, requestHeaders }: any = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addNewProject = async (data: any) => {
    try {
      const res = await axios.post(`${baseUrl}/Project/`, data, {
        headers: requestHeaders,
      });
      navigate("/dashboard/projects")      
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container-fluid p-4 shadow-sm mb-4">
        <div className="row align-items-center">
          <div className="col-md-6 E382F">
            <Link
              to="/dashboard/projects"
              className="fw-light E382F text-decoration-none fs-6"
            >
              <p>&lt; View All Projects</p>
            </Link>
            <h3>Add a New Project</h3>
          </div>
        </div>
      </div>

      <div className="form-container shadow-lg rounded-4 w-75 m-auto mt-5">
        <form
          action=""
          onSubmit={handleSubmit(addNewProject)}
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

export default ProjectsData;
