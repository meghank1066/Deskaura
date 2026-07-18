import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const register = async (e) => {

  e.preventDefault();


  try {

    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });


    localStorage.setItem(
      "token",
      res.data.token
    );

    console.log("Saved token:", res.data.token);

    navigate("/dashboard");


  } catch(error) {

    console.log(error);

  }

};


  return (

    <div className="auth-page">

      <h1>Create Account</h1>


      <form onSubmit={register}>


        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button>
          Register
        </button>


      </form>


      <Link to="/login">
        Already have an account?
      </Link>


    </div>

  );

}


export default Register;