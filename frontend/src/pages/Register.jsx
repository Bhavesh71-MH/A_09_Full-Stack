
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    branch: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
    setIsSuccess(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const cleanName = formData.fullName.trim();
    const cleanEmail = formData.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z][A-Za-z\s.'-]*$/;

    if (!cleanName) {
      newErrors.fullName = "Full name is required.";
    } else if (cleanName.length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    } else if (cleanName.length > 60) {
      newErrors.fullName = "Name cannot exceed 60 characters.";
    } else if (!namePattern.test(cleanName)) {
      newErrors.fullName =
        "Enter a valid name using letters, spaces, apostrophes or hyphens.";
    }

    if (!cleanEmail) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(cleanEmail)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.branch) {
      newErrors.branch = "Please select your branch.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Use uppercase, lowercase, and at least one number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("Registration successful! Your account has been created.");
      setIsSuccess(true);

      setFormData({
        fullName: "",
        email: "",
        branch: "",
        password: "",
      });
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Check that the backend is running."
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card border-0 shadow p-4">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-secondary">Join CampusConnect today</p>
            </div>

            {message && (
              <div
                className={`alert ${
                  isSuccess ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  maxLength={60}
                  autoComplete="name"
                  className={`form-control ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="branch" className="form-label">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className={`form-select ${
                    errors.branch ? "is-invalid" : ""
                  }`}
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="">Select Branch</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                </select>
                {errors.branch && (
                  <div className="invalid-feedback">{errors.branch}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
                <small className="text-secondary">
                  Use 8+ characters with uppercase, lowercase, and a number.
                </small>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                    }));
                    setMessage("");
                    setIsSuccess(false);
                  }}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
