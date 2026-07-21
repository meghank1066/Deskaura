import { useEffect, useState } from "react";
import StatCard from "../components/StatsCard";
import JobCard from "../components/JobCard";
import api from "../api/axios";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [stats, setStats] = useState({
    totalApplications: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
  });

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    jobType: "",
    status: "Saved",
    jobLink: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  // Helper to recalculate stats cleanly whenever jobs update
  const calculateStats = (jobsData) => {
    setStats({
      totalApplications: jobsData.length,
      applied: jobsData.filter((j) => j.status === "Applied").length,
      interviews: jobsData.filter((j) => j.status === "Interview").length,
      offers: jobsData.filter((j) => j.status === "Offer").length,
    });
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      const jobsData = res.data;
      setJobs(jobsData);
      calculateStats(jobsData);
    } catch (error) {
      console.error("Failed to load dashboard jobs", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.company.trim()) {
      setErrorMessage("Company Name is required.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post("/jobs", {
        company: formData.company,
        role: formData.role || "Role Not Specified",
        location: formData.location || "Remote",
        salary: formData.salary,
        jobType: formData.jobType || "Full-time",
        status: formData.status || "Saved",
        jobLink: formData.jobLink,
      });

      const updatedJobs = [response.data, ...jobs];
      setJobs(updatedJobs);
      calculateStats(updatedJobs);

      // Reset form defaults
      setFormData({
        company: "",
        role: "",
        location: "",
        salary: "",
        jobType: "",
        status: "Saved",
        jobLink: "",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to add job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard">
        {/* Top Analytics Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Applications"
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

        {/* Add Job Form Prompt */}
        <section className="add-job-card">
          <div className="card-header">
            <h2>Add New Application</h2>
            <p className="form-hint">
              Fill out job details to track a new role.
            </p>
          </div>

          {errorMessage && <div className="error-alert">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="job-form-grid">
            <input
              name="company"
              placeholder="Company Name *"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <input
              name="role"
              placeholder="Job Role (e.g. Frontend Developer)"
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
              <option value="">Select Job Type</option>
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
              placeholder="Job Link / URL (optional)"
              value={formData.jobLink}
              onChange={handleChange}
              className="full-width-input"
            />

            <button
              type="submit"
              className="submit-job-btn"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Job"}
            </button>
          </form>
        </section>

        {/* Tracked Applications Section */}
        <section className="applications-section">
          <div className="section-header">
            <h2>Recent Applications</h2>
          </div>

          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="empty-state">
                <h3>No applications yet</h3>
                <p>Start tracking your first application above.</p>
              </div>
            ) : (
              jobs.map((job) => <JobCard key={job._id || job.id} job={job} />)
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;