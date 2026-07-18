import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import JobDetails from "./pages/JobDetails";

function App(){

return(

<Routes>
<Route path="/" element={<Dashboard/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/jobs" element={<Jobs/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/settings" element={<Settings/>}/>
<Route path="/jobs/:id" element={<JobDetails />} />
</Routes>
)
}

export default App;