
const form = document.getElementById("resultForm");
const studentTable = document.getElementById("studentTable");
const topperBox = document.getElementById("topper");

let students = JSON.parse(
    localStorage.getItem("students")
) || [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();

    const marks = [
        Number(document.getElementById("maths").value),
        Number(document.getElementById("science").value),
        Number(document.getElementById("english").value),
        Number(document.getElementById("computer").value),
        Number(document.getElementById("physics").value)
    ];

    // Validate marks
    if (marks.some(mark => mark < 0 || mark > 100)) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    // Check duplicate roll number
    if (students.some(student => student.roll === roll)) {
        alert("This roll number already exists!");
        return;
    }

    // Calculate total and percentage
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / 500) * 100;

    // Calculate pass or fail
    const result = marks.every(mark => mark >= 35)
        ? "Pass"
        : "Fail";

    // Create student record
    const student = {
        name: name,
        roll: roll,
        total: total,
        percentage: percentage,
        result: result
    };

    students.push(student);

localStorage.setItem(
    "students",
    JSON.stringify(students)
);

displayStudents();
form.reset();
});

function displayStudents() {
    studentTable.innerHTML = "";

    if (students.length === 0) {
        topperBox.textContent = "No records available";
        return;
    }

    const highestTotal = Math.max(
        ...students.map(student => student.total)
    );

    students.forEach(student => {
        const row = document.createElement("tr");

        if (student.total === highestTotal) {
            row.classList.add("topper-row");
        }

        const values = [
            student.name,
            student.roll,
            student.total + "/500",
            student.percentage.toFixed(2) + "%",
            student.result
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Create delete button
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            students = students.filter(
    item => item.roll !== student.roll
);

    localStorage.setItem(
    "students",
    JSON.stringify(students)
);

    displayStudents();
    });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        studentTable.appendChild(row);
    });

    // Find topper
    const topper = students.reduce((best, student) =>
        student.total > best.total ? student : best
    );

    topperBox.textContent =
        topper.name + " (Roll No: " + topper.roll + ") — " +
        topper.percentage.toFixed(2) + "%";
}
displayStudents();