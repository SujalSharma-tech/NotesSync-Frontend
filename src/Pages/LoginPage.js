import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://noti-fy-backend.onrender.com/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="loginpage">
      <div className="loginpage__container">
        <div className="loginpage__container__title">
          <h1>Sign In</h1>
        </div>
        <div className="loginpage__container__form">
          <form onSubmit={handleSubmit} className=" flex flex-col">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="loginpage__"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="loginpage__"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="loginpage__btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
