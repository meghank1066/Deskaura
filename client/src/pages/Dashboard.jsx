import { useEffect, useState } from "react";
import StatCard from "../components/StatsCard";
import JobCard from "../components/JobCard";
import api from "../api/axios";
import "../styles/dashboard.css";

function Dashboard() {


  const [jobs, setJobs] = useState([]);

  const [stats, setStats] = useState({
    totalApplications: 0,
    applied: 0,
    interviews: 0,
    offers: 0
  });



  useEffect(() => {

    fetchJobs();

  }, []);




  const fetchJobs = async () => {

    try {

      const res = await api.get("/jobs");

      const jobsData = res.data;


      setJobs(jobsData);



      // calculate dashboard stats
      setStats({

        totalApplications: jobsData.length,


        applied: jobsData.filter(
          job => job.status === "Applied"
        ).length,


        interviews: jobsData.filter(
          job => job.status === "Interview"
        ).length,


        offers: jobsData.filter(
          job => job.status === "Offer"
        ).length

      });



    } catch(error) {

      console.error(
        "Failed to load dashboard",
        error
      );

    }

  };




  return (

    <div className="dashboard">


      <h1>
        Dashboard
      </h1>



      <div className="stats-grid">


        <StatCard
          title="Applications"
          value={stats.totalApplications}
          icon="📄"
        />


        <StatCard
          title="Applied"
          value={stats.applied}
          icon="📤"
        />


        <StatCard
          title="Interviews"
          value={stats.interviews}
          icon="🎤"
        />


        <StatCard
          title="Offers"
          value={stats.offers}
          icon="🎉"
        />


      </div>




      <h2>
        Recent Applications
      </h2>




      <div className="jobs-grid">


        {jobs.length === 0 ? (

          <p>
            No applications yet
          </p>


        ) : (


          jobs.map(job => (

            <JobCard

              key={job._id}

              job={job}

            />

          ))

        )}


      </div>



    </div>

  );

}


export default Dashboard;