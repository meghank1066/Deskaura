import { useState } from "react";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import "../styles/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    jobType: "",
    status: "",
    jobLink: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/jobs", formData);
      console.log(response.data);

      setJobs([...jobs, response.data]);

      // Reset form back to empty defaults
      setFormData({
        company: "",
        role: "",
        location: "",
        salary: "",
        jobType: "",
        status: "",
        jobLink: "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="jobs-page">
        <h1>My Applications</h1>

        <div className="add-job-card">
          <div className="card-header">
            <h2>Add New Application</h2>
            <p className="form-hint">
              Fill out as much or as little as you want.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="job-form-grid">
            <input
              name="company"
              placeholder="Company Name (optional)"
              value={formData.company}
              onChange={handleChange}
            />

            <input
              name="role"
              placeholder="Job Role (optional)"
              value={formData.role}
              onChange={handleChange}
            />

            <input
              name="location"
              placeholder="Location (optional)"
              value={formData.location}
              onChange={handleChange}
            />

            <input
              name="salary"
              placeholder="Salary (optional)"
              value={formData.salary}
              onChange={handleChange}
            />

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="">Select Job Type (optional)</option>
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
              <option value="">Select Status (optional)</option>
              <option value="Saved">Saved</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input
              name="jobLink"
              placeholder="Job Link / URL (optional)"
              value={formData.jobLink}
              onChange={handleChange}
            />

            <button type="submit" className="submit-job-btn">
              Add Job
            </button>
          </form>
        </div>

        <div className="jobs-section">
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="empty-jobs-state">No jobs added yet</div>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Jobs;