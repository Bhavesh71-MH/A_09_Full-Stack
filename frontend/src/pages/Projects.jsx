
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Projects() {
  const student = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    if (!student) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/projects/${student.id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load projects.");
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, [student?.id]);

  const addProject = async (e) => {
    e.preventDefault();
    setMessage("");

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!student) {
      setMessage("Please log in first.");
      return;
    }

    if (!cleanTitle) {
      setMessage("Please enter a project title.");
      return;
    }

    if (cleanTitle.length < 3) {
      setMessage("Project title must contain at least 3 characters.");
      return;
    }

    if (cleanTitle.length > 80) {
      setMessage("Project title cannot exceed 80 characters.");
      return;
    }

    if (cleanDescription.length > 500) {
      setMessage("Description cannot exceed 500 characters.");
      return;
    }

    if (
      projects.some(
        (project) =>
          project.title.toLowerCase() === cleanTitle.toLowerCase()
      )
    ) {
      setMessage("A project with this title already exists.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          title: cleanTitle,
          description: cleanDescription
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add project.");
      }

      setProjects((previous) => [...previous, data]);
      setTitle("");
      setDescription("");
      setMessage("Project added successfully!");
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check the backend."
          : error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id) => {
    setMessage("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete project.");
      }

      setProjects((previous) =>
        previous.filter((project) => project._id !== id)
      );

      setMessage("Project deleted successfully!");
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check the backend."
          : error.message
      );
    } finally {
      setDeletingId("");
    }
  };

  if (!student) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm p-5 text-center">
          <div style={{ fontSize: "45px" }}>🔐</div>
          <h3 className="fw-bold mt-3">Login Required</h3>
          <p className="text-secondary">
            Please log in to add and manage your projects.
          </p>
          <Link to="/login" className="btn btn-primary mx-auto">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

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
                letterSpacing: "1.5px"
              }}
            >
              YOUR PORTFOLIO
            </span>

            <h2 className="fw-bold mt-2 mb-2" style={{ color: "#172554" }}>
              My Projects
            </h2>

            <p className="text-secondary mb-0">
              Showcase the projects you have built.
            </p>
          </div>

          <div className="card border-0 px-4 py-3 text-center">
            <h2 className="fw-bold mb-0" style={{ color: "#405cf5" }}>
              {projects.length}
            </h2>
            <small className="text-secondary">Projects Added</small>
          </div>
        </div>

        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-warning"
            }`}
            role="status"
          >
            {message}
          </div>
        )}

        <div className="card shadow-sm border-0 p-4 mb-5">
          <h5 className="fw-bold mb-1" style={{ color: "#172554" }}>
            + Add a New Project
          </h5>

          <p className="text-secondary small mb-4">
            Add your academic, personal, or development projects.
          </p>

          <form onSubmit={addProject}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Project Title
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="e.g. CampusConnect"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setMessage("");
                }}
                minLength={3}
                maxLength={80}
                required
              />

              <small className="text-secondary">
                Enter 3–80 characters.
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>

              <textarea
                className="form-control"
                placeholder="Briefly describe your project"
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setMessage("");
                }}
                maxLength={500}
              />

              <small className="text-secondary">
                Optional · {description.length}/500 characters
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving Project..." : "Add Project +"}
            </button>
          </form>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: "#172554" }}>
            My Saved Projects
          </h4>

          <span className="text-secondary small">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {loading ? (
          <div className="card border-0 p-5 text-center">
            <p className="text-secondary mb-0">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="card border-0 p-5 text-center">
            <div style={{ fontSize: "48px" }}>🚀</div>
            <h5 className="fw-bold mt-3">Your portfolio starts here</h5>
            <p className="text-secondary mb-0">
              Add your first project using the form above.
            </p>
          </div>
        ) : (
          <div className="row g-3">
            {projects.map((project) => (
              <div className="col-md-6" key={project._id}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#eaf0ff",
                        borderRadius: "13px",
                        fontSize: "23px"
                      }}
                    >
                      💻
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="fw-bold text-break">{project.title}</h5>
                      <p className="text-secondary text-break mb-3">
                        {project.description || "No description provided."}
                      </p>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={deletingId === project._id}
                        onClick={() => deleteProject(project._id)}
                      >
                        {deletingId === project._id
                          ? "Deleting..."
                          : "Delete Project"}
                      </button>
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
            fontSize: "14px"
          }}
        >
          <strong>Tip:</strong> Add a clear description explaining what your
          project does and which technologies you used.
        </div>
      </div>
    </div>
  );
}

export default Projects;
