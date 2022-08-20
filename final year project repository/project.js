const projectForm = document.getElementById("project-form");
const supervisorSelect = document.getElementById("supervior-select");
const departmentSelect = document.getElementById("department-select");
const studentSelect = document.getElementById("student-select");
const projectTitleInput = document.getElementById("input-project-title");
const projectContentInput = document.getElementById("input-project-content");
const projectDateofSubmission = document.getElementById("input-project-date");
const feedbackTableBody = document.getElementById("feedback-table-body");

const studentsArr = getStudents();
const departmentsArr = getDepartments();

departmentsArr.forEach((department) => {
  const departmentOptions = createElementWithAttributes("option", {
    value: department.id,
  });
  departmentOptions.textContent = department.name;
  departmentSelect.appendChild(departmentOptions);
});

departmentSelect.addEventListener("change", (event) => {
  const selectedDepartmentId = event.target.value;

  const studentsInCurrentDepartment = studentsArr.filter((singleStudent) => {
    return singleStudent.departmentId === +selectedDepartmentId;
  });

  studentSelect.innerHTML = "";
  studentsInCurrentDepartment.forEach((student) => {
    const studentOptions = createElementWithAttributes("option", {
      value: student.id,
    });
    studentOptions.textContent = student.name;
    studentSelect.appendChild(studentOptions);
  });
});

const fetchPosts = async () => {
  // fetch all users
  const allUsers = await makeHttpRequest("users");
  // console.log("allUsers", allUsers);

  allUsers.forEach((user) => {
    const superviors = createElementWithAttributes("option", {
      value: user.id,
    });
    superviors.textContent = user.name;
    supervisorSelect.appendChild(superviors);
  });
};

fetchPosts();


projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!supervisorSelect.value || !departmentSelect.value || !studentSelect.value || !projectTitleInput.value || !projectContentInput.value || !projectDateofSubmission.value) {
    alert("Please fill all fields");
    return;
  }

  const selectedStudent = studentSelect.options[studentSelect.selectedIndex].text;
  const selectedDepartment = departmentSelect.options[departmentSelect.selectedIndex].text;
  const selectedSupervisor = supervisorSelect.options[supervisorSelect.selectedIndex].text;

  const feedbackRow = createElementWithAttributes("tr", { class: "feedback-body" });


  const tdId = createElementWithAttributes("td");
  tdId.textContent = studentSelect.value;

  const tdTitle = createElementWithAttributes("td");
  tdTitle.textContent = projectTitleInput.value;

  const tdStudent = createElementWithAttributes("td");
  tdStudent.textContent = selectedStudent;

  const tdDepartment = createElementWithAttributes("td");
  tdDepartment.textContent = selectedDepartment;

  const tdSupervisor = createElementWithAttributes("td");
  tdSupervisor.textContent = selectedSupervisor;

  const tdDateOfSubmission = createElementWithAttributes("td");
  tdDateOfSubmission.textContent = projectDateofSubmission.value;

  const tdAction = createElementWithAttributes("td");

  feedbackTableBody.appendChild(feedbackRow);
  feedbackRow.append(tdId, tdTitle, tdStudent, tdDepartment, tdSupervisor, tdDateOfSubmission, tdAction)

  departmentSelect.value = "";
  studentSelect.value = "";
  supervisorSelect.value = "";
  projectTitleInput.value = "";
  projectContentInput.value = "";
  projectDateofSubmission.value = "";
})

function createDepartments() {
  localStorage.setItem(
    "PROJECT DEPARTMENTS",
    JSON.stringify(departmentNamesAndIds)
  );
}

function getDepartments() {
  const departmentsStr = localStorage.getItem("PROJECT DEPARTMENTS");
  let departmentsArr = JSON.parse(departmentsStr) || [];
  if (departmentsArr.length === 0) {
    createDepartments();
    departmentsArr = getDepartments();
  }
  return departmentsArr;
}

function createStudents() {
  localStorage.setItem("STUDENTS", JSON.stringify(studentsAndIds));
}

function getStudents() {
  const studentsStr = localStorage.getItem("STUDENTS");
  let studentsArr = JSON.parse(studentsStr) || [];
  if (studentsArr.length === 0) {
    createStudents();
    studentsArr = getDepartments();
  }
  return studentsArr;
}
