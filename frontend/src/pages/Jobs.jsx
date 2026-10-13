
import { useState } from "react";

const jobData = [
  {
    id: 1,
    role: "Software Developer",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Pune",
    type: "Full Time",
    skills: ["Java", "React", "MongoDB"],
    cgpa: "7.0",
    icon: "💻",
    color: "#eaf0ff",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "WebWorks Technologies",
    location: "Mumbai",
    type: "Full Time",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    cgpa: "6.5",
    icon: "🎨",
    color: "#f4eaff",
  },
  {
    id: 3,
    role: "Java Developer Intern",
    company: "CodeCraft Solutions",
    location: "Nashik",
    type: "Internship",
    skills: ["Java", "SQL"],
    cgpa: "6.0",
    icon: "☕",
    color: "#fff0df",
  },
  {
    id: 4,
    role: "Web Development Intern",
    company: "Digital India Labs",
    location: "Remote",
    type: "Internship",
    skills: ["HTML", "CSS", "JavaScript"],
    cgpa: "6.0",
    icon: "🌐",
    color: "#e5f8ef",
  },
];

function Jobs() {
  const [jobs] = useState(jobData);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const applyJob = (job) => {
    if (appliedJobs.includes(job.id)) {
      setMessage("You have already applied for this opportunity.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to apply for ${job.role} at ${job.company}?`
    );

    if (!confirmed) return;

    setAppliedJobs((previous) => [...previous, job.id]);
    setMessage(`Successfully applied for ${job.role}!`);
  };

  const cleanSearch = search.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(cleanSearch) ||
      job.company.toLowerCase().includes(cleanSearch) ||
      job.location.toLowerCase().includes(cleanSearch) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(cleanSearch)
      );

    const matchesType = filter === "All" || job.type === filter;

    return matchesSearch && matchesType;
  });

  const clearFilters = () => {
    setSearch("");
    setFilter("All");
    setMessage("");
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "85vh" }}>
      <div className="container py-5">
        <div
          className="p-4 p-md-5 mb-4"
          style={{
            background: "linear-gradient(120deg, #172554, #344bb5)",
            borderRadius: "22px",
            color: "white",
          }}
        >
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ background: "#dbeafe", color: "#1d4ed8" }}
          >
            CAREER OPPORTUNITIES
          </span>

          <h1 className="fw-bold mb-3">Find Your Next Opportunity</h1>
          <p
            className="mb-4"
            style={{ color: "#dbeafe", maxWidth: "620px", lineHeight: 1.8 }}
          >
            Discover jobs and internships, explore required skills, and take
            the next step towards your career.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <div
              className="rounded-3 px-4 py-3"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <h3 className="fw-bold mb-0">{jobs.length}</h3>
              <small>Opportunities</small>
            </div>

            <div
              className="rounded-3 px-4 py-3"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <h3 className="fw-bold mb-0">
                {jobs.filter((job) => job.type === "Full Time").length}
              </h3>
              <small>Full-time jobs</small>
            </div>

            <div
              className="rounded-3 px-4 py-3"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <h3 className="fw-bold mb-0">
                {jobs.filter((job) => job.type === "Internship").length}
              </h3>
              <small>Internships</small>
            </div>
          </div>
        </div>

        <div className="card border-0 p-3 p-md-4 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <label htmlFor="jobSearch" className="form-label fw-semibold">
                Search Opportunities
              </label>
              <input
                id="jobSearch"
                type="search"
                className="form-control"
                placeholder="Search by role, company, skill, or location..."
                value={search}
                maxLength={100}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setMessage("");
                }}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="jobType" className="form-label fw-semibold">
                Job Type
              </label>
              <select
                id="jobType"
                className="form-select"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setMessage("");
                }}
              >
                <option value="All">All Opportunities</option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {message && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="status"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              aria-label="Close message"
              onClick={() => setMessage("")}
            />
          </div>
        )}

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <h4 className="fw-bold mb-1" style={{ color: "#172554" }}>
              Available Opportunities
            </h4>
            <p className="text-secondary small mb-0">
              Explore the role requirements before applying.
            </p>
          </div>
          <span className="text-secondary small" aria-live="polite">
            {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="row g-4">
          {filteredJobs.length === 0 ? (
            <div className="col-12">
              <div className="card border-0 text-center p-5">
                <div style={{ fontSize: "45px" }}>🔎</div>
                <h5 className="fw-bold mt-3">No matching jobs found</h5>
                <p className="text-secondary">
                  Try another keyword or select a different job type.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary mx-auto"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.includes(job.id);

              return (
                <div className="col-md-6 col-lg-4" key={job.id}>
                  <div className="card border-0 h-100 p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          background: job.color,
                          width: "55px",
                          height: "55px",
                          fontSize: "27px",
                        }}
                      >
                        {job.icon}
                      </div>

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={
                          job.type === "Internship"
                            ? { background: "#fff0c2", color: "#92400e" }
                            : { background: "#dbeafe", color: "#1d4ed8" }
                        }
                      >
                        {job.type}
                      </span>
                    </div>

                    <h5 className="fw-bold mb-2" style={{ color: "#172554" }}>
                      {job.role}
                    </h5>

                    <p className="text-secondary mb-2">{job.company}</p>

                    <div className="d-flex flex-wrap gap-3 mb-3">
                      <small className="text-secondary">
                        📍 {job.location}
                      </small>
                      <small className="text-secondary">
                        🎓 CGPA: {job.cgpa}+
                      </small>
                    </div>

                    <hr style={{ borderColor: "#e8edf5" }} />

                    <p className="fw-semibold small mb-2">Required Skills</p>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge rounded-pill"
                          style={{
                            background: "#f0f3fa",
                            color: "#44516a",
                            padding: "8px 10px",
                            fontWeight: 500,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <button
                        type="button"
                        className={`btn w-100 ${
                          isApplied ? "btn-success" : "btn-primary"
                        }`}
                        onClick={() => applyJob(job)}
                        disabled={isApplied}
                      >
                        {isApplied ? "Applied ✓" : "Apply Now →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="text-center text-secondary small mt-4 mb-0">
          Note: These are sample opportunities for the CampusConnect college
          project. Applications are stored temporarily in page state only.
        </p>
      </div>
    </div>
  );
}

export default Jobs;
