import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";


function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();


const handleLogin = async(e)=>{

e.preventDefault();

try{

const res = await api.post("/auth/login",{
email,
password
});


localStorage.setItem(
"token",
res.data.token
);


navigate("/dashboard");


}catch(error){

console.log(error);

}

};


return (

<div className="auth-page">

<h1>Login</h1>


<form onSubmit={handleLogin}>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button>
Login
</button>


</form>


<p>
Don't have an account?
<Link to="/register">
Register
</Link>
</p>


</div>

)

}

export default Login;