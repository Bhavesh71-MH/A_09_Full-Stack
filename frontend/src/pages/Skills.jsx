
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Skills() {
  const student = JSON.parse(localStorage.getItem("student") || "null");

  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    if (!student) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/skills/${student.id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load skills.");
        return response.json();
      })
      .then((data) => setSkills(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, [student?.id]);

  const addSkill = async (e) => {
    e.preventDefault();
    setMessage("");

    const name = skillName.trim();

    if (!student) {
      setMessage("Please log in first.");
      return;
    }

    if (!name) {
      setMessage("Please enter a skill name.");
      return;
    }

    if (name.length < 2) {
      setMessage("Skill name must contain at least 2 characters.");
      return;
    }

    if (name.length > 60) {
      setMessage("Skill name cannot exceed 60 characters.");
      return;
    }

    if (skills.some((skill) => skill.name.toLowerCase() === name.toLowerCase())) {
      setMessage("You have already added this skill.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add skill.");
      }

      setSkills((previous) => [...previous, data]);
      setSkillName("");
      setMessage("Skill added successfully!");
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

  const deleteSkill = async (id) => {
    setMessage("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/skills/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete skill.");
      }

      setSkills((previous) => previous.filter((skill) => skill._id !== id));
      setMessage("Skill deleted successfully!");
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
        <div className="card border-0 p-5 text-center">
          <div style={{ fontSize: "45px" }}>🔐</div>
          <h3 className="fw-bold mt-3">Login Required</h3>
          <p className="text-secondary">
            Please log in to add and manage your skills.
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
                letterSpacing: "1.5px",
              }}
            >
              PERSONAL DEVELOPMENT
            </span>

            <h2 className="fw-bold mt-2 mb-2" style={{ color: "#172554" }}>
              My Skills
            </h2>

            <p className="text-secondary mb-0">
              Build your profile by highlighting what you know.
            </p>
          </div>

          <div
            className="card border-0 px-4 py-3 text-center"
            style={{ minWidth: "125px" }}
          >
            <h2 className="fw-bold mb-0" style={{ color: "#405cf5" }}>
              {skills.length}
            </h2>
            <small className="text-secondary">Skills Added</small>
          </div>
        </div>

        <div className="card border-0 p-4 mb-4">
          <h5 className="fw-bold mb-1" style={{ color: "#172554" }}>
            + Add a New Skill
          </h5>

          <p className="text-secondary small mb-4">
            Include programming languages, tools, and technologies you know.
          </p>

          <form onSubmit={addSkill}>
            <div className="row g-3 align-items-end">
              <div className="col-md-9">
                <label className="form-label fw-semibold">Skill Name</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Java, HTML, React, SQL"
                  value={skillName}
                  onChange={(e) => {
                    setSkillName(e.target.value);
                    setMessage("");
                  }}
                  minLength={2}
                  maxLength={60}
                  required
                />

                <small className="text-secondary">
                  Enter 2–60 characters. Duplicate skills are not allowed.
                </small>
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Adding..." : "Add Skill +"}
                </button>
              </div>
            </div>
          </form>

          {message && (
            <div
              className={`alert ${
                message.toLowerCase().includes("success")
                  ? "alert-success"
                  : "alert-warning"
              } mt-3 mb-0`}
              role="status"
            >
              {message}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: "#172554" }}>
            My Skill Set
          </h4>

          <span className="text-secondary small">
            {skills.length} {skills.length === 1 ? "skill" : "skills"}
          </span>
        </div>

        {loading ? (
          <div className="card border-0 p-5 text-center">
            <p className="text-secondary mb-0">Loading your skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="card border-0 p-5 text-center">
            <div style={{ fontSize: "48px" }}>💡</div>
            <h5 className="fw-bold mt-3">Your skill set starts here</h5>
            <p className="text-secondary mb-0">
              Add your first skill using the form above.
            </p>
          </div>
        ) : (
          <div className="row g-3">
            {skills.map((skill) => (
              <div className="col-sm-6 col-lg-4" key={skill._id}>
                <div className="card border-0 p-3 h-100">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#eaf0ff",
                        borderRadius: "13px",
                        fontSize: "23px",
                      }}
                    >
                      💻
                    </div>

                    <div className="flex-grow-1 overflow-hidden">
                      <h6
                        className="fw-bold mb-1 text-break"
                        style={{ color: "#172554" }}
                      >
                        {skill.name}
                      </h6>
                      <small className="text-secondary">
                        Technical Skill
                      </small>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      aria-label={`Delete ${skill.name}`}
                      disabled={deletingId === skill._id}
                      onClick={() => deleteSkill(skill._id)}
                    >
                      {deletingId === skill._id ? "Deleting..." : "Delete"}
                    </button>
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
          <strong>Tip:</strong> Add skills you can confidently explain in an
          interview, such as Java, HTML, CSS, JavaScript, or SQL.
        </div>
      </div>
    </div>
  );
}

export default Skills;
