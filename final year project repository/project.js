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

const storedProjectInLocalStorage = localStorage.getItem("PROJECT FEEDBACKS");
const storedProjectInLocalStorageArr =
  JSON.parse(storedProjectInLocalStorage) || [];
console.log("storedProjectInLocalStorageArr", storedProjectInLocalStorageArr);

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

const postCardArr = [];
projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    !supervisorSelect.value ||
    !departmentSelect.value ||
    !studentSelect.value ||
    !projectTitleInput.value ||
    !projectContentInput.value ||
    !projectDateofSubmission.value
  ) {
    alert("Please fill all fields");
    return;
  }

  const selectedStudent =
    studentSelect.options[studentSelect.selectedIndex].text;
  const selectedDepartment =
    departmentSelect.options[departmentSelect.selectedIndex].text;
  const selectedSupervisor =
    supervisorSelect.options[supervisorSelect.selectedIndex].text;

  const projectObj = {
    id: studentSelect.value,
    student: selectedStudent,
    department: selectedDepartment,
    supervior: selectedSupervisor,
    title: projectTitleInput.value,
    content: projectContentInput.value,
    dateOfSubmission: projectDateofSubmission.value,
  };

  storedProjectInLocalStorageArr.push(projectObj);
  localStorage.setItem(
    "PROJECT FEEDBACKS",
    JSON.stringify(storedProjectInLocalStorageArr)
  );

  departmentSelect.value = "";
  studentSelect.value = "";
  supervisorSelect.value = "";
  projectTitleInput.value = "";
  projectContentInput.value = "";
  projectDateofSubmission.value = "";

  paginate("feedback-table-body", storedProjectInLocalStorageArr);
});

storedProjectInLocalStorageArr.forEach((project) => {
  const feedbackRow = createElementWithAttributes("tr", {
    class: "feedback-body",
  });
  const tdId = createElementWithAttributes("td");
  tdId.textContent = project.id;

  const tdTitle = createElementWithAttributes("td");
  tdTitle.textContent = project.title;

  const tdStudent = createElementWithAttributes("td");
  tdStudent.textContent = project.student;

  const tdDepartment = createElementWithAttributes("td");
  tdDepartment.textContent = project.department;

  const tdSupervisor = createElementWithAttributes("td");
  tdSupervisor.textContent = project.supervior;

  const tdDateOfSubmission = createElementWithAttributes("td");
  tdDateOfSubmission.textContent = project.dateOfSubmission;

  const tdAction = createElementWithAttributes("td");

  const buttonWrapper = createElementWithAttributes("div", {
    class: "button-wrapper",
  });
  const viewButton = createElementWithAttributes("i", {
    class: "fas fa-eye",
  });
  const editButton = createElementWithAttributes("i", {
    class: "fas fa-pen-to-square",
  });
  const deleteButton = createElementWithAttributes("i", {
    class: "fas fa-trash",
  });

  tdAction.appendChild(buttonWrapper);
  buttonWrapper.append(viewButton, editButton, deleteButton);
  feedbackTableBody.prepend(feedbackRow);
  feedbackRow.append(
    tdId,
    tdTitle,
    tdStudent,
    tdDepartment,
    tdSupervisor,
    tdDateOfSubmission,
    tdAction
  );

  addEventListenersToActionIcons("delete", "fas fa-trash");
  addEventListenersToActionIcons("view", "fas fa-eye");

});


  






















function addEventListenersToActionIcons(actionType, actionClassName) {
  const actionButtons = document.getElementsByClassName(actionClassName);
  Array.from(actionButtons).forEach((actionButton) => {
    actionButton.addEventListener("click", (event) => {
      const currentButton = event.target;
      const closestTableRow = currentButton.closest(".feedback-body");
      if (actionType === "delete") {
        closestTableRow.remove();
      } else if (actionType === "view") {
        displayModal(
          `project-content-modal-${studentSelect.id}`,
          `Title - ${projectTitleInput.value}`,
          projectContentInput.innerText,
          null,
          false
        );
      }
    });
  });
}

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
