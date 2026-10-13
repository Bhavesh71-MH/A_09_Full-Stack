
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const student = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  if (!student) {
    return (
      <div className="container py-5 text-center">
        <h3>Please log in to view your dashboard.</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h2 className="fw-bold">
          Welcome, {student.fullName}! 👋
        </h2>
        <p className="text-secondary mb-1">
          Email: {student.email}
        </p>
        <p className="text-secondary mb-3">
          Branch: {student.branch}
        </p>
        <div>
          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h5>My Skills</h5>
            <p className="text-secondary mb-0">
              Manage your technical skills.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h5>Projects</h5>
            <p className="text-secondary mb-0">
              Showcase your college projects.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h5>Job Applications</h5>
            <p className="text-secondary mb-0">
              Track your placement applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;