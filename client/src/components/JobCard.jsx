import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job, onStatusChange }) {
  const formatDate = (rawDate) => {
    if (!rawDate) return "N/A";
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime())
      ? "N/A"
      : parsed.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const handleStatusSelect = (e) => {
    const newStatus = e.target.value;
    if (onStatusChange) {
      onStatusChange(job?._id || job?.id, newStatus);
    }
  };

  const companyName = job?.company || "Company";
  const cleanDomain = companyName.toLowerCase().trim().replace(/\s+/g, "") + ".com";
  const logoUrl = `https://unavatar.io/${cleanDomain}`;

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    companyName
  )}&background=0D8ABC&color=fff&bold=true`;

  const currentStatus = job?.status || "Saved";

  return (
    <div className="job-card">
      <div className="card-header">
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackAvatar;
          }}
          className="company-logo"
        />
        <div className="company-info">
          <h3 className="company-name">{companyName}</h3>
          <p className="job-title">{job?.role || job?.title || "Role Not Specified"}</p>
        </div>

        {/* Clickable Status Select Pill */}
        <select
          className={`status-badge ${currentStatus.toLowerCase()}`}
          value={currentStatus}
          onChange={handleStatusSelect}
        >
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="card-body">
        <div className="detail-item">
          <span className="icon">📍</span> {job?.location || "Remote"}
        </div>
        <div className="detail-item">
          <span className="icon">📅</span> Applied: {formatDate(job?.applicationDate || job?.createdAt || job?.date)}
        </div>
      </div>

      <div className="card-footer">
        <Link to={`/jobs/${job?._id}`} className="view-details-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default JobCard;