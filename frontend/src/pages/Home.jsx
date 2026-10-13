
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🎯",
    title: "Placement Opportunities",
    description:
      "Explore job opportunities and keep track of the positions you want to apply for.",
    link: "/jobs",
    color: "#eaf0ff",
  },
  {
    icon: "💻",
    title: "Skill Development",
    description:
      "Add your technical skills and build a profile that highlights your strengths.",
    link: "/skills",
    color: "#e5f8ef",
  },
  {
    icon: "🚀",
    title: "Project Portfolio",
    description:
      "Showcase your academic and personal projects in one organized place.",
    link: "/projects",
    color: "#fff0df",
  },
  {
    icon: "📋",
    title: "Application Tracking",
    description:
      "View your job applications and manage your placement journey with ease.",
    link: "/applications",
    color: "#f4eaff",
  },
];

function Home() {
  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section className="container py-5">
        <div
          className="row align-items-center g-5 py-lg-5"
          style={{ minHeight: "410px" }}
        >
          <div className="col-lg-6">
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                background: "#e5ebff",
                color: "#405cf5",
                fontSize: "13px",
              }}
            >
              YOUR CAREER STARTS HERE
            </span>

            <h1
              className="display-4 fw-bold mb-3"
              style={{ color: "#172554", lineHeight: 1.15 }}
            >
              Learn Skills.
              <br />
              Build Projects.
              <br />
              <span style={{ color: "#405cf5" }}>Get Placement Ready.</span>
            </h1>

            <p
              className="mb-4"
              style={{
                color: "#69758a",
                fontSize: "17px",
                lineHeight: 1.8,
                maxWidth: "520px",
              }}
            >
              CampusConnect helps students organize their skills, showcase
              projects, explore job opportunities, and track applications—all
              in one place.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/register"
                className="btn btn-primary btn-lg"
                style={{ padding: "13px 25px" }}
              >
                Get Started <span className="ms-2">→</span>
              </Link>

              <Link
                to="/jobs"
                className="btn btn-outline-secondary btn-lg"
                style={{ padding: "13px 25px", background: "#fff" }}
              >
                Explore Jobs
              </Link>
            </div>

            <div className="d-flex flex-wrap gap-4 mt-4">
              <span style={{ color: "#536178", fontSize: "14px" }}>
                <strong style={{ color: "#405cf5" }}>✓</strong> Student-focused
              </span>
              <span style={{ color: "#536178", fontSize: "14px" }}>
                <strong style={{ color: "#405cf5" }}>✓</strong> Easy to use
              </span>
              <span style={{ color: "#536178", fontSize: "14px" }}>
                <strong style={{ color: "#405cf5" }}>✓</strong> Career-oriented
              </span>
            </div>
          </div>

          {/* Decorative Dashboard Preview */}
          <div className="col-lg-6">
            <div
              className="p-3 p-md-4"
              style={{
                background: "linear-gradient(135deg, #dfe7ff, #edf2ff)",
                borderRadius: "26px",
              }}
            >
              <div
                className="card p-4"
                style={{ border: "none", borderRadius: "18px" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1 text-secondary small">
                      STUDENT DASHBOARD
                    </p>
                    <h4 className="mb-0" style={{ color: "#172554" }}>
                      Your Career Overview
                    </h4>
                  </div>
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#e5ebff",
                      fontSize: "25px",
                    }}
                  >
                    🎓
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{ background: "#eef2ff" }}
                    >
                      <div style={{ fontSize: "23px" }}>💡</div>
                      <h4 className="mt-2 mb-0">Skills</h4>
                      <small className="text-secondary">Your abilities</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{ background: "#e8f8ef" }}
                    >
                      <div style={{ fontSize: "23px" }}>🛠️</div>
                      <h4 className="mt-2 mb-0">Projects</h4>
                      <small className="text-secondary">Your work</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{ background: "#fff2e4" }}
                    >
                      <div style={{ fontSize: "23px" }}>📨</div>
                      <h4 className="mt-2 mb-0">Jobs</h4>
                      <small className="text-secondary">Opportunities</small>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-3"
                  style={{ background: "#f7f8fc" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: "30px" }}>🌟</div>
                    <div>
                      <h6 className="mb-1">Keep growing every day</h6>
                      <p className="text-secondary small mb-0">
                        Build your profile one step at a time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-3 mb-0"
                style={{ color: "#536178", fontSize: "13px" }}
              >
                One platform for your placement preparation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span
            className="fw-semibold text-uppercase"
            style={{ color: "#405cf5", fontSize: "12px", letterSpacing: "2px" }}
          >
            WHAT YOU CAN DO
          </span>
          <h2 className="mt-2 mb-3" style={{ color: "#172554" }}>
            Everything You Need to Prepare
          </h2>
          <p
            className="section-subtitle mx-auto"
            style={{ maxWidth: "600px" }}
          >
            Manage important parts of your placement preparation through one
            simple student-friendly platform.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-sm-6 col-lg-3" key={feature.title}>
              <div className="card h-100 p-4">
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{
                    background: feature.color,
                    width: "58px",
                    height: "58px",
                    borderRadius: "16px",
                    fontSize: "27px",
                  }}
                >
                  {feature.icon}
                </div>

                <h5 className="mb-3" style={{ color: "#172554" }}>
                  {feature.title}
                </h5>
                <p
                  className="flex-grow-1"
                  style={{
                    color: "#69758a",
                    fontSize: "14px",
                    lineHeight: 1.8,
                  }}
                >
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="fw-semibold"
                  style={{ color: "#405cf5", fontSize: "14px" }}
                >
                  Explore feature →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-5">
        <div
          className="p-4 p-md-5 text-center"
          style={{
            background: "#172554",
            borderRadius: "24px",
            color: "#fff",
          }}
        >
          <h2 className="fw-bold mb-3">Take the Next Step in Your Career</h2>
          <p
            className="mx-auto mb-4"
            style={{
              color: "#cbd5e1",
              maxWidth: "620px",
              lineHeight: 1.8,
            }}
          >
            Create your student account, add your skills and projects, and start
            exploring opportunities that match your career goals.
          </p>
          <Link
            to="/register"
            className="btn btn-lg"
            style={{
              background: "#60a5fa",
              color: "#172554",
              padding: "13px 26px",
              fontWeight: 700,
            }}
          >
            Create Your Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-4 mt-4"
        style={{ borderTop: "1px solid #e4e9f2", color: "#69758a" }}
      >
        <p className="mb-1 fw-bold" style={{ color: "#172554" }}>
          CampusConnect
        </p>
        <small>
          Student Skill &amp; Placement Management System
        </small>
        <br />
        <small>Built to support your journey from learning to placement.</small>
      </footer>
    </div>
  );
}

export default Home;