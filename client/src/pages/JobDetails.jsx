import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Notes from "../components/Notes";
import api from "../api/axios";
import StatusTimeline from "../components/StatusTimeline";
import InterviewCard from "../components/InterviewCard";
import Documents from "../components/Documents";
import ContactCard from "../components/ContactCard";


function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchJob();
  }, []);



  const fetchJob = async () => {

    try {

      const res = await api.get(`/jobs/${id}`);

      setJob(res.data);

    } catch (error) {

      console.error(
        "Failed to fetch job",
        error
      );

      setError("Could not load job");

    }

  };



  const deleteJob = async () => {

    try {

      await api.delete(`/jobs/${id}`);

      navigate("/jobs");

    } catch(error) {

      console.error(
        "Failed to delete job",
        error
      );

    }

  };



  if(error){
    return <p>{error}</p>;
  }



  if(!job){
    return <p>Loading job...</p>;
  }



  return (

    <div className="job-details">


      <Link to="/jobs">
        ← Back to Jobs
      </Link>



      <div className="job-header">

        <h1>
          {job.company}
        </h1>


        <span className={`status ${job.status}`}>
          {job.status}
        </span>

      </div>




      <div className="job-info">

        <h2>
          {job.role}
        </h2>


        <p>
          📍 {job.location || "Location not provided"}
        </p>


        <p>
          Applied:
          {" "}
          {new Date(job.applicationDate)
          .toLocaleDateString()}
        </p>


        <p>
          Salary:
          {" "}
          {job.salary || "Not provided"}
        </p>


        <p>
          Job Type:
          {" "}
          {job.jobType || "Not provided"}
        </p>


        {job.jobLink && (
          <p>
            <a 
              href={job.jobLink}
              target="_blank"
              rel="noreferrer"
            >
              View Job Posting
            </a>
          </p>
        )}

      </div>




      <div className="job-actions">

        <button>
          Edit Job
        </button>


        <button onClick={deleteJob}>
          Delete Job
        </button>

      </div>




      <hr />



      <StatusTimeline
        timeline={job.timeline || []}
      />



      <InterviewCard
        date={job.interviewDate}
      />



      <Notes
        jobId={id}
      />



      <Documents
        documents={job.documents || {}}
      />



      <ContactCard
        contact={job.contact}
      />



    </div>

  );

}


export default JobDetails;