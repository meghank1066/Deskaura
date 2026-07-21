import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

// Validates time strings like "8:45", "08:45 AM", "14:30", "9:00", "00:00"
const isValidClockTime = (timeStr) => {
  if (!timeStr) return false;

  const clean = timeStr.trim();
  const timeRegex = /^(0?[0-9]|1[0-2]|2[0-3]):([0-5][0-9])\s*(AM|PM|am|pm)?$/;

  return timeRegex.test(clean);
};

function Profile() {
  // Calendar & Scheduling state
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [timeError, setTimeError] = useState("");

  // Cancellation Confirmation State
  const [interviewToDelete, setInterviewToDelete] = useState(null);

  // Job Preferences Filter State
  const [preferences, setPreferences] = useState({
    type: "Full-Time",
    mode: "Remote",
    experience: "Mid-Senior",
  });

  const [previousPreferences, setPreviousPreferences] = useState({
    type: "Contract",
    mode: "On-site",
    experience: "Junior",
  });

  // Placeholder jobs list
  const userJobsPlaceholder = [
    { id: "1", title: "Frontend Engineer - TechCorp" },
    { id: "2", title: "React Developer - StartupX" },
    { id: "3", title: "Full Stack Engineer - InnovateLabs" },
  ];

  // Helper to generate 30-minute time slot suggestions
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

      slots.push(`${displayHour}:00 ${period}`);
      if (hour !== 18) {
        slots.push(`${displayHour}:30 ${period}`);
      }
    }
    return slots;
  };

  const suggestedTimeSlots = generateTimeSlots();

  // Filter slots based on input
  const filteredTimeSlots = suggestedTimeSlots.filter((slot) => {
    if (!selectedTime) return true;
    return slot.toLowerCase().includes(selectedTime.toLowerCase());
  });

  const isExactMatch = suggestedTimeSlots.some(
    (slot) => slot.toLowerCase() === selectedTime.trim().toLowerCase()
  );

  // Auto-format raw times like "8:45" to "8:45 AM"
  const formatCustomTime = (input) => {
    let cleanInput = input.trim();
    if (!cleanInput) return "";

    if (!/AM|PM/i.test(cleanInput)) {
      const match = cleanInput.match(/^(\d{1,2}):?(\d{2})?$/);
      if (match) {
        let hour = parseInt(match[1], 10);
        const min = match[2] || "00";
        const period = hour >= 12 && hour < 24 ? "PM" : "AM";
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;
        return `${hour}:${min} ${period}`;
      }
    }
    return cleanInput;
  };

  // Calendar setup for the current month
  const today = new Date();
  const daysInMonth = 30;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    if (day >= today.getDate()) {
      setSelectedDate(day);
      setShowModal(true);
      setTimeError("");
    }
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();

    const formattedTime = formatCustomTime(selectedTime);
    if (!isValidClockTime(selectedTime) && !isValidClockTime(formattedTime)) {
      setTimeError("Please enter a valid time (e.g. 09:00, 8:45 AM, or 14:30)");
      return;
    }

    if (!selectedJob) return;

    setScheduledInterviews([
      ...scheduledInterviews,
      { id: Date.now(), day: selectedDate, time: formattedTime || selectedTime, job: selectedJob },
    ]);
    setShowModal(false);
    setSelectedJob("");
    setSelectedTime("");
    setTimeError("");
    setShowTimeDropdown(false);
  };

  // Request cancellation confirmation
  const confirmCancelInterview = (interview) => {
    setInterviewToDelete(interview);
  };

  // Execute cancellation after confirmation
  const executeCancellation = () => {
    if (interviewToDelete) {
      setScheduledInterviews(
        scheduledInterviews.filter((item) => item.id !== interviewToDelete.id)
      );
      setInterviewToDelete(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const formattedTime = formatCustomTime(selectedTime);
      if (isValidClockTime(selectedTime) || isValidClockTime(formattedTime)) {
        setSelectedTime(formattedTime || selectedTime);
        setTimeError("");
        setShowTimeDropdown(false);
      } else {
        setTimeError("Please enter a valid time (e.g. 09:00, 8:45 AM, or 14:30)");
      }
    }
  };

  const handlePreferenceChange = (category, value) => {
    setPreviousPreferences((prev) => ({
      ...prev,
      [category]: preferences[category],
    }));
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const existingEventsOnSelectedDate = scheduledInterviews.filter(
    (item) => item.day === selectedDate
  );

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="profile-page">
        <header className="profile-header">
          <h1>My Profile</h1>
          <button className="edit-btn">Edit Profile</button>
        </header>

        <div className="profile-grid">
          {/* Left Column: User Profile Card */}
          <div className="profile-card user-card">
            <div className="profile-avatar">
              <span>M</span>
            </div>
            <h2>Meghan</h2>
            <p className="profile-role">Software Developer</p>

            <div className="user-contact">
              <p>📍 San Francisco, CA</p>
              <p>✉️ meghan@example.com</p>
              <p>🔗 linkedin.com/in/meghan</p>
            </div>
          </div>

          {/* Center Column: Overview & Preferences */}
          <div className="profile-details-column">
            <div className="stats-card">
              <h3>Search Overview</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-num">12</span>
                  <span className="stat-label">Applied</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">3</span>
                  <span className="stat-label">Interviews</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">1</span>
                  <span className="stat-label">Offers</span>
                </div>
              </div>
            </div>

            <div className="details-card">
              <h3>Job Search Preferences</h3>
              <div className="pref-filter-section">
                <span className="pref-title">Job Type</span>
                <div className="filter-options">
                  {["Full-Time", "Part-Time", "Contract"].map((type) => (
                    <button
                      key={type}
                      className={`filter-chip ${preferences.type === type ? "active" : ""}`}
                      onClick={() => handlePreferenceChange("type", type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pref-filter-section">
                <span className="pref-title">Work Mode</span>
                <div className="filter-options">
                  {["Remote", "Hybrid", "On-site"].map((mode) => (
                    <button
                      key={mode}
                      className={`filter-chip ${preferences.mode === mode ? "active" : ""}`}
                      onClick={() => handlePreferenceChange("mode", mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="previous-pref-banner">
                <p>
                  <strong>Previous Saved Filters:</strong> {previousPreferences.type} • {previousPreferences.mode} • {previousPreferences.experience}
                </p>
              </div>
            </div>

            <div className="details-card">
              <h3>Skills & Expertise</h3>
              <div className="skills-badge-container">
                <span className="skill-badge">React</span>
                <span className="skill-badge">JavaScript (ES6+)</span>
                <span className="skill-badge">TypeScript</span>
                <span className="skill-badge">CSS3 / Tailwind</span>
                <span className="skill-badge">UX/UI Design</span>
                <span className="skill-badge">Node.js</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calendar & Interview Scheduler */}
          <div className="calendar-column">
            <div className="details-card calendar-card">
              <h3>Interview Calendar</h3>
              <p className="calendar-subtext">Click a future date to schedule an interview</p>

              {/* Confirmation Prompt Popover */}
              {interviewToDelete && (
                <div className="confirm-modal-overlay">
                  <div className="confirm-modal">
                    <h4>Cancel Interview?</h4>
                    <p>
                      Are you sure you want to cancel your interview for{" "}
                      <strong>{interviewToDelete.job}</strong> on Date {interviewToDelete.day} at {interviewToDelete.time}?
                    </p>
                    <div className="confirm-actions">
                      <button className="cancel-btn-danger" onClick={executeCancellation}>
                        Yes, Cancel
                      </button>
                      <button className="cancel-btn-secondary" onClick={() => setInterviewToDelete(null)}>
                        No, Keep It
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Popover */}
              {showModal && (
                <div className="schedule-modal">
                  <div className="modal-header">
                    <h4>Schedule Interview ({selectedDate}th)</h4>
                    <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                  </div>

                  {existingEventsOnSelectedDate.length > 0 && (
                    <div className="existing-events-banner">
                      <p className="banner-title">📍 Scheduled for Date {selectedDate}:</p>
                      <ul className="existing-events-list">
                        {existingEventsOnSelectedDate.map((event) => (
                          <li key={event.id} className="existing-event-item">
                            <span>⏰ <strong>{event.time}</strong> — {event.job}</span>
                            <button
                              type="button"
                              className="delete-item-btn"
                              title="Cancel this interview"
                              onClick={() => confirmCancelInterview(event)}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handleScheduleSubmit}>
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      required
                    >
                      <option value="">-- Select Application --</option>
                      {userJobsPlaceholder.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>

                    <div className="custom-time-wrapper">
                      <input
                        type="text"
                        placeholder="Select or type time (e.g. 09:00, 8:45 AM)"
                        value={selectedTime}
                        onChange={(e) => {
                          setSelectedTime(e.target.value);
                          setTimeError("");
                          setShowTimeDropdown(true);
                        }}
                        onFocus={() => setShowTimeDropdown(true)}
                        onKeyDown={handleKeyDown}
                        className={`time-input ${timeError ? "input-error" : ""}`}
                        required
                      />

                      {timeError && <p className="time-error-text">{timeError}</p>}

                      {showTimeDropdown && (
                        <ul className="time-suggestions-list">
                          {selectedTime && !isExactMatch && isValidClockTime(selectedTime) && (
                            <li
                              className="custom-time-option"
                              onMouseDown={() => {
                                const formatted = formatCustomTime(selectedTime);
                                setSelectedTime(formatted);
                                setTimeError("");
                                setShowTimeDropdown(false);
                              }}
                            >
                              Set time to "<strong>{formatCustomTime(selectedTime)}</strong>"
                            </li>
                          )}

                          {filteredTimeSlots.map((slot) => (
                            <li
                              key={slot}
                              onMouseDown={() => {
                                setSelectedTime(slot);
                                setTimeError("");
                                setShowTimeDropdown(false);
                              }}
                            >
                              {slot}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <button type="submit" className="confirm-btn">
                      + Add Interview
                    </button>
                  </form>
                </div>
              )}

              {/* Calendar Grid */}
              <div className="mini-calendar-grid">
                {calendarDays.map((day) => {
                  const isToday = day === today.getDate();
                  const isPast = day < today.getDate();
                  const dayEvents = scheduledInterviews.filter((i) => i.day === day);
                  const isScheduled = dayEvents.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      disabled={isPast}
                      className={`calendar-day ${isToday ? "today" : ""} ${
                        isPast ? "disabled" : ""
                      } ${isScheduled ? "scheduled" : ""}`}
                    >
                      <span className="day-number">{day}</span>
                      {isScheduled && (
                        <div className="dots-container">
                          {dayEvents.slice(0, 3).map((_, idx) => (
                            <span key={idx} className="event-dot"></span>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Scheduled List */}
              <div className="scheduled-list">
                <h4>Upcoming Scheduled</h4>
                {scheduledInterviews.length === 0 ? (
                  <p className="empty-msg">No interviews booked yet.</p>
                ) : (
                  scheduledInterviews.map((item) => (
                    <div key={item.id} className="scheduled-item">
                      <div className="scheduled-info">
                        📅 Date {item.day} @ {item.time}: <strong>{item.job}</strong>
                      </div>
                      <button
                        className="delete-item-btn"
                        title="Cancel interview"
                        onClick={() => confirmCancelInterview(item)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;