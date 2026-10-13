
import { Link } from "react-router-dom";

const features = [
  {
    icon: "👤",
    title: "Student Profile",
    description: "Maintain your student information and account details.",
  },
  {
    icon: "💻",
    title: "Skill Management",
    description: "Add and manage technical skills to showcase your abilities.",
  },
  {
    icon: "🚀",
    title: "Project Portfolio",
    description: "Organize your academic and personal projects in one place.",
  },
  {
    icon: "💼",
    title: "Placement Opportunities",
    description: "Explore sample jobs and internships relevant to your career.",
  },
  {
    icon: "📋",
    title: "Application Tracking",
    description: "View and manage your job application status in the system.",
  },
  {
    icon: "🔐",
    title: "Student Account",
    description: "Register and log in to access your personalized student area.",
  },
];

function About() {
  const technologies = [
    "HTML",
    "CSS",
    "Bootstrap",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
  ];

  return (
    <div style={{ background: "#f5f7fb", minHeight: "85vh" }}>
      <div className="container py-5">
        {/* Hero */}
        <div
          className="p-4 p-md-5 mb-5 text-center"
          style={{
            background: "linear-gradient(120deg, #172554, #344bb5)",
            color: "white",
            borderRadius: "24px",
          }}
        >
          <div style={{ fontSize: "44px" }}>🎓</div>

          <span
            className="badge rounded-pill px-3 py-2 mt-2 mb-3"
            style={{ background: "#dbeafe", color: "#1d4ed8" }}
          >
            ABOUT OUR PROJECT
          </span>

          <h1 className="display-5 fw-bold mb-3">About CampusConnect</h1>

          <p
            className="mx-auto mb-0"
            style={{
              maxWidth: "720px",
              color: "#dbeafe",
              lineHeight: 1.9,
              fontSize: "17px",
            }}
          >
            A Student Skill & Placement Management System designed to help
            students organize their skills, showcase projects, and explore
            career opportunities through one platform.
          </p>
        </div>

        {/* Project Overview */}
        <div className="row g-4 align-items-stretch mb-5">
          <div className="col-lg-7">
            <div className="card border-0 p-4 p-md-5 h-100">
              <span
                className="fw-semibold text-uppercase mb-2"
                style={{
                  color: "#405cf5",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                }}
              >
                PROJECT OVERVIEW
              </span>

              <h2 className="fw-bold mb-3" style={{ color: "#172554" }}>
                Helping Students Prepare for Their Future
              </h2>

              <p className="text-secondary" style={{ lineHeight: 1.9 }}>
                CampusConnect brings important parts of placement preparation
                together. Students can register, log in, maintain their skills,
                record projects, explore job opportunities, and view
                application information.
              </p>

              <p className="text-secondary mb-0" style={{ lineHeight: 1.9 }}>
                The goal is to provide a simple and organized interface that
                supports students as they prepare for internships and job
                opportunities.
              </p>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="card border-0 p-4 p-md-5 h-100"
              style={{ background: "#eaf0ff" }}
            >
              <div style={{ fontSize: "35px" }}>🎯</div>

              <h4 className="fw-bold mt-3" style={{ color: "#172554" }}>
                Our Objective
              </h4>

              <p style={{ color: "#536178", lineHeight: 1.9 }}>
                To create a student-friendly platform that makes it easier to
                manage skill information, organize projects, and explore
                placement opportunities.
              </p>

              <div className="mt-auto pt-3">
                <Link to="/dashboard" className="btn btn-primary">
                  Visit Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-4">
          <span
            className="fw-semibold text-uppercase"
            style={{
              color: "#405cf5",
              fontSize: "12px",
              letterSpacing: "1.5px",
            }}
          >
            KEY FEATURES
          </span>

          <h2 className="fw-bold mt-2" style={{ color: "#172554" }}>
            What CampusConnect Offers
          </h2>

          <p className="text-secondary">
            The main modules available in the student portal.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {features.map((feature) => (
            <div className="col-sm-6 col-lg-4" key={feature.title}>
              <div className="card border-0 p-4 h-100">
                <div
                  className="d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "15px",
                    background: "#eaf0ff",
                    fontSize: "26px",
                  }}
                >
                  {feature.icon}
                </div>

                <h5 className="fw-bold" style={{ color: "#172554" }}>
                  {feature.title}
                </h5>

                <p
                  className="text-secondary mb-0"
                  style={{ fontSize: "14px", lineHeight: 1.8 }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="card border-0 p-4 p-md-5 mb-5">
          <div className="text-center mb-4">
            <span
              className="fw-semibold text-uppercase"
              style={{
                color: "#405cf5",
                fontSize: "12px",
                letterSpacing: "1.5px",
              }}
            >
              TECHNOLOGY STACK
            </span>

            <h2 className="fw-bold mt-2" style={{ color: "#172554" }}>
              Technologies Used
            </h2>

            <p className="text-secondary mb-0">
              Frontend, backend, and database technologies used in this project.
            </p>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-pill px-4 py-2 fw-semibold"
                style={{
                  background: "#eef2ff",
                  color: "#344bb5",
                  border: "1px solid #dce4ff",
                  fontSize: "14px",
                }}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#172554" }}>
              How It Works
            </h2>
            <p className="text-secondary">
              A simple overview of the student journey.
            </p>
          </div>

          <div className="row g-3">
            {[
              ["01", "Register", "Create a student account."],
              ["02", "Build Profile", "Add skills and projects."],
              ["03", "Explore Jobs", "Browse available opportunities."],
              ["04", "Track Progress", "Review application information."],
            ].map(([number, title, description]) => (
              <div className="col-sm-6 col-lg-3" key={number}>
                <div className="card border-0 p-4 h-100">
                  <div
                    className="fw-bold mb-3"
                    style={{ color: "#405cf5", fontSize: "25px" }}
                  >
                    {number}
                  </div>
                  <h5 className="fw-bold" style={{ color: "#172554" }}>
                    {title}
                  </h5>
                  <p className="text-secondary small mb-0">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="text-center p-4 p-md-5"
          style={{
            background: "#172554",
            color: "white",
            borderRadius: "22px",
          }}
        >
          <h2 className="fw-bold mb-3">Start Building Your Future</h2>
          <p className="mb-4" style={{ color: "#cbd5e1" }}>
            Explore the features available on CampusConnect.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link
              to="/jobs"
              className="btn btn-lg"
              style={{ background: "#60a5fa", color: "#172554" }}
            >
              Explore Jobs →
            </Link>

            <Link
              to="/skills"
              className="btn btn-outline-light btn-lg"
            >
              Manage Skills
            </Link>
          </div>
        </div>

        <footer className="text-center pt-4 mt-4">
          <p className="text-secondary small mb-1">
            CampusConnect — Student Skill & Placement Management System
          </p>
          <p className="text-secondary small mb-0">
            Developed as a student project.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default About;