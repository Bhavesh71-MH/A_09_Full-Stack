
const form = document.getElementById("employeeForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;

    // Clear previous messages
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    let isValid = true;

    // Name validation
    if (name.length < 3 || !/^[a-zA-Z ]+$/.test(name)) {
        document.getElementById("nameError").textContent =
            "Enter a valid name (at least 3 letters).";
        isValid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").textContent =
            "Enter a valid email address.";
        isValid = false;
    }

    // Password validation
    if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)) {
        document.getElementById("passwordError").textContent =
            "Use 8+ characters with uppercase, lowercase and a number.";
        isValid = false;
    }

    // Phone validation
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        document.getElementById("phoneError").textContent =
            "Enter a valid 10-digit Indian mobile number.";
        isValid = false;
    }

    // Department validation
    if (department === "") {
        document.getElementById("departmentError").textContent =
            "Please select a department.";
        isValid = false;
    }

    // Success message
  
if (isValid) {
    console.log("Employee Details:", {
        name: name,
        email: email,
        phone: phone,
        department: department
    });

    document.getElementById("successMessage").textContent =
        "Employee registered successfully!";

    form.reset();
}

});
