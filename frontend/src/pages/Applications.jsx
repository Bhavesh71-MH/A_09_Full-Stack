
import { useState } from "react";
import { Link } from "react-router-dom";

function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Tech Solutions Pvt. Ltd.",
      role: "Software Developer",
      date: "08 Oct 2026",
      status: "Applied",
      icon: "💻",
      color: "#eaf0ff",
    },
    {
      id: 2,
      company: "WebWorks Technologies",
      role: "Frontend Developer",
      date: "06 Oct 2026",
      status: "Shortlisted",
      icon: "🎨",
      color: "#e5f8ef",
    },
    {
      id: 3,
      company: "CodeCraft Solutions",
      role: "Java Developer Intern",
      date: "02 Oct 2026",
      status: "Rejected",
      icon: "☕",
      color: "#fff0df",
    },
  ]);

  const withdrawApplication = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.filter((application) => application.id !== id)
    );
  };

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "Shortlisted") {
      return { background: "#dcfce7", color: "#166534" };
    }

    if (status === "Rejected") {
      return { background: "#fee2e2", color: "#991b1b" };
    }

    return { background: "#dbeafe", color: "#1d4ed8" };
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "85vh" }}>
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <span
              className="fw-semibold text-uppercase"
              style={{
                color: "#405cf5",
                fontSize: "12px",
                letterSpacing: "1.5px",
              }}
            >
              CAREER TRACKER
            </span>

            <h2 className="fw-bold mt-2 mb-2" style={{ color: "#172554" }}>
              My Applications
            </h2>

            <p className="text-secondary mb-0">
              Keep track of your job and internship applications.
            </p>
          </div>

          <Link to="/jobs" className="btn btn-primary">
            + Explore Jobs
          </Link>
        </div>

        <div className="row g-3 mb-5">
          <div className="col-sm-6 col-lg-4">
            <div className="card border-0 p-4 h-100">
              <p className="text-secondary mb-2">Total Applications</p>
              <h2 className="fw-bold mb-0" style={{ color: "#172554" }}>
                {applications.length}
              </h2>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="card border-0 p-4 h-100">
              <p className="text-secondary mb-2">In Progress</p>
              <h2 className="fw-bold mb-0" style={{ color: "#2563eb" }}>
                {appliedCount}
              </h2>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="card border-0 p-4 h-100">
              <p className="text-secondary mb-2">Shortlisted</p>
              <h2 className="fw-bold mb-0" style={{ color: "#15803d" }}>
                {shortlistedCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: "#172554" }}>
            Application History
          </h4>

          <span className="text-secondary small">
            {applications.length}{" "}
            {applications.length === 1 ? "record" : "records"}
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="card border-0 text-center p-5">
            <div style={{ fontSize: "48px" }}>📭</div>
            <h4 className="fw-bold mt-3" style={{ color: "#172554" }}>
              No Applications Yet
            </h4>
            <p className="text-secondary">
              Explore available jobs and start your career journey.
            </p>
            <Link to="/jobs" className="btn btn-primary mx-auto">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="row g-3">
            {applications.map((application) => (
              <div className="col-12" key={application.id}>
                <div className="card border-0 p-3 p-md-4">
                  <div className="row align-items-center g-3">
                    <div className="col-auto">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "58px",
                          height: "58px",
                          background: application.color,
                          fontSize: "27px",
                        }}
                      >
                        {application.icon}
                      </div>
                    </div>

                    <div className="col">
                      <h5 className="fw-bold mb-1" style={{ color: "#172554" }}>
                        {application.role}
                      </h5>

                      <p className="text-secondary mb-2">
                        {application.company}
                      </p>

                      <small className="text-secondary">
                        Applied on: {application.date}
                      </small>
                    </div>

                    <div className="col-12 col-md-auto text-md-end">
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={getStatusStyle(application.status)}
                      >
                        {application.status}
                      </span>

                      {application.status === "Applied" && (
                        <div className="mt-3">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="button"
                            onClick={() =>
                              withdrawApplication(application.id)
                            }
                          >
                            Withdraw Application
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="mt-4 p-3 rounded-3"
          style={{
            background: "#eaf0ff",
            color: "#344b9b",
            fontSize: "14px",
          }}
        >
          <strong>Tip:</strong> Check your application status regularly and
          continue preparing your skills for upcoming opportunities.
        </div>
      </div>
    </div>
  );
}

export default Applications;
