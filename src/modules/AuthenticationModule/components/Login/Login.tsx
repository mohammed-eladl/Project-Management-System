import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/PMS 3.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../../../Context/baseUrl";
// import AuthContext from "../../../../Context/AuthContext";
const Login = ({ saveLoginData }) => {
// const {baseUrl} = useContext(AuthContext)

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const resposne = await axios.post(
        `${baseUrl}/Users/Login`,
        data
      );
      localStorage.setItem("token", resposne.data.token);
      saveLoginData();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="img-cont text-center">
                <img src={logo} alt="logo" className="w-25 my-3" />
              </div>
              <div className="p-5 form rounded-4">
                <h4 className="text-light mb-0 mt-3">Welcome To PMS</h4>
                <h2 className="form-Name ">
                  <span>L</span>ogin
                </h2>
                <form
                  action=""
                  className="d-flex flex-column gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="one-input-group">
                    <div
                      className="input-group mb-2
                    form-outline my-2  text-start
                  "
                    >
                      <input
                        type="email"
                        className="form-input form-control bg-transparent border-0 rounded-bottom-0  border-secondary border-bottom text-white p-1"
                        placeholder="Enter your E-mail"
                        autoComplete="off"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                            message: "Please enter a valid email address",
                          },
                          maxLength: {
                            value: 50,
                            message: "Email must be at most 30 characters",
                          },
                          minLength: {
                            value: 10,
                            message: "Email must be at least 10 characters",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1  text-danger">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="input-group mb-2 form-outline position-relative text-start d-flex flex-wrap">
                    <input
                      type={!showPassword ? "text" : "password"}
                      className="form-input form-control bg-transparent border-0 rounded-bottom-0  border-secondary border-bottom text-white p-1"
                      placeholder="Password"
                      id="psw"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is Required",
                        },
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
                          message:
                            "Password must contain at least one letter, one number, and one special character",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password must be at most 20 characters",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />

                    {/* For Hidden Password And Visibility */}
                    <span className="input-group-text border-0 bg-transparent position-absolute mt-2 end-0 p-1">
                      <i
                        className={`far text-secondary ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } eye`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </span>
                    {/* End Hidden Password And Visibility */}
                  </div>
                  {errors.password && (
                    <p className="  text-danger">{errors.password.message}</p>
                  )}

                  {/* Link For Register && Forget Password */}
                  <div className="d-flex justify-content-between mb-3 ">
                    <Link className="text-white-50" to="/register">
                      Register Now
                    </Link>
                    <Link className="text-white-50" to="/forget-pass">
                      Forget PassWord
                    </Link>
                  </div>
                  {/*  end Link For Register && Forget Password */}
                  <button className="btn btn warningg rounded rounded-5 w-75 mx-auto text-white fw-bold p-3">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
