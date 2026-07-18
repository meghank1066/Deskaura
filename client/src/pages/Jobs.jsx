import { useState } from "react";
import JobCard from "../components/JobCard";
import API from "../api/axios";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    status: "Applied",
    jobLink: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/jobs", formData);

      console.log(response.data);

      setJobs([...jobs, response.data]);


      setFormData({
        company: "",
        role: "",
        location: "",
        salary: "",
        jobType: "Full-time",
        status: "Applied",
        jobLink: "",
      });


    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };


  return (

    <div>

      <h1>My Applications</h1>


      <form onSubmit={handleSubmit}>

        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />


        <input
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
        />


        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />


        <input
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />


        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>


        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>


        <input
          name="jobLink"
          placeholder="Job Link"
          value={formData.jobLink}
          onChange={handleChange}
        />


        <button type="submit">
          Add Job
        </button>

      </form>



      <div className="jobs-grid">

        {jobs.length === 0 ? (

          <p>No jobs added yet</p>

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


export default Jobs;