import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Notes from "../components/Notes";
import api from "../api/axios";
import StatusTimeline from "../components/StatusTimeline";
import InterviewCard from "../components/InterviewCard";
import Documents from "../components/Documents";
import ContactCard from "../components/ContactCard";
import Navbar from "../components/Navbar";
import "../styles/jobDetails.css";

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
      console.error("Failed to fetch job", error);
      setError("Could not load job details.");
    }
  };

  const deleteJob = async () => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      try {
        await api.delete(`/jobs/${id}`);
        navigate("/jobs");
      } catch (error) {
        console.error("Failed to delete job", error);
      }
    }
  };

  if (error) {
    return (
      <div className="dashboard-layout">
        <Navbar />
        <main className="job-details-page">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="dashboard-layout">
        <Navbar />
        <main className="job-details-page">
          <div className="loading-state">Loading job details...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="job-details-page">
        {/* Navigation / Header Bar */}
        <div className="job-top-bar">
          <Link to="/jobs" className="back-btn">
            ← Back to Jobs
          </Link>
          <div className="job-actions">
            <button className="btn btn-secondary">Edit Job</button>
            <button className="btn btn-danger" onClick={deleteJob}>
              Delete
            </button>
          </div>
        </div>

        {/* Primary Job Overview Header */}
        <div className="job-main-card">
          <div className="job-title-row">
            <div>
              <h1>{job.company}</h1>
              <h2>{job.role}</h2>
            </div>
            <span className={`status ${job.status}`}>{job.status}</span>
          </div>

          <div className="job-meta-grid">
            <div className="meta-item">
              <span className="meta-label">📍 Location</span>
              <span className="meta-value">{job.location || "Not provided"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">📅 Applied Date</span>
              <span className="meta-value">
                {new Date(job.applicationDate).toLocaleDateString()}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">💰 Salary</span>
              <span className="meta-value">{job.salary || "Not provided"}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">💼 Job Type</span>
              <span className="meta-value">{job.jobType || "Not provided"}</span>
            </div>
          </div>

          {job.jobLink && (
            <div className="job-link-row">
              <a href={job.jobLink} target="_blank" rel="noreferrer" className="external-link">
                View Original Posting ↗
              </a>
            </div>
          )}
        </div>

        {/* Detailed Sections Grid */}
        <div className="job-widgets-grid">
          <div className="widget-card">
            <h3>Application Timeline</h3>
            <StatusTimeline timeline={job.timeline || []} />
          </div>

          <div className="widget-card">
            <h3>Interview Schedule</h3>
            <InterviewCard date={job.interviewDate} />
          </div>

          <div className="widget-card">
            <h3>Contact Information</h3>
            <ContactCard contact={job.contact} />
          </div>

          <div className="widget-card">
            <h3>Documents</h3>
            <Documents documents={job.documents || {}} />
          </div>

          <div className="widget-card full-width">
            <h3>Notes</h3>
            <Notes jobId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetails;