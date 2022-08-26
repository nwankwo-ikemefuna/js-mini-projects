const projectForm = document.getElementById("project-form");
const departmentSelect = document.getElementById("department-select");
const studentSelect = document.getElementById("student-select");
const supervisorSelect = document.getElementById("supervior-select");
const projectTitleInput = document.getElementById("input-project-title");
const projectContentInput = document.getElementById("input-project-content");
const projectDateofSubmission = document.getElementById("input-project-date");

const departmentsArr = getLocalStorageData(departmentsStorageKey, departmentsDataArr);
createSelectOptions(departmentsArr, departmentSelect, 'id', 'name');

// get project id from url (if editing)
const queryParams = getURLParams();
console.log('queryParams', queryParams);

const isEdit = !!queryParams.isEdit;
console.log('isEdit', isEdit);

// department select
departmentSelect.addEventListener("change", (event) => {
  const selectedDepartmentId = event.target.value;

  //show only students in the selected department
  const studentsArr = getLocalStorageData(studentsStorageKey, studentsDataArr);
  const studentsInSelectedDepartment = studentsArr.filter((singleStudent) => {
    return singleStudent.departmentId === +selectedDepartmentId;
  });
  // empty the student select field so we can put the student options in it
  studentSelect.innerHTML = "";
  studentSelect.appendChild(appendEmptySelectOption());
  createSelectOptions(studentsInSelectedDepartment, studentSelect, 'id', 'name');

  //show only superviors in the selected department  
  const superviorsArr = getLocalStorageData(superviorsStorageKey, supervisorsDataArr);
  const supervisorsInSelectedDepartment = superviorsArr.filter((singleSupervisor) => {
    return singleSupervisor.departmentId === +selectedDepartmentId;
  });
  // empty the supervior select field so we can put the supervisor options in it
  supervisorSelect.innerHTML = "";
  supervisorSelect.appendChild(appendEmptySelectOption());
  createSelectOptions(supervisorsInSelectedDepartment, supervisorSelect, 'id', 'name');
});

let currentlyEditedProjectId = 0;
if (isEdit) {
  document.title = 'Edit - Final Year Projects';
  document.getElementById('add-edit-title').textContent = 'Edit Project';
  document.getElementById('add-project-nav-btn').style.display = 'block';

  // get currently edited project details
  currentlyEditedProjectId = +queryParams.id;
  const project = getProjectById(currentlyEditedProjectId);
  console.log('project', project);

  // select department
  departmentSelect.value = project.departmentId;
  departmentSelect.dispatchEvent(new Event('change'));

  // select student
  studentSelect.value = project.studentId;

  // select supervior
  supervisorSelect.value = project.superviorId;

  // render title
  projectTitleInput.value = project.title;

  // render content
  projectContentInput.value = project.content;

  // render date
  projectDateofSubmission.value = project.dateOfSubmission;
}

// project form submission
let lastProjectId = 0;
projectForm.addEventListener("submit", (event) => {
  const projectsArr = getProjects();
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

  if (!isEdit) {
    // the projects have been sorted by id in descending order, 
    // so we get the last project Id
    lastProjectId = projectsArr[0]?.id || 0;
  }

  const projectObj = {
    id: isEdit ? currentlyEditedProjectId : lastProjectId + 1,
    studentId: +studentSelect.value,
    departmentId: +departmentSelect.value,
    superviorId: +supervisorSelect.value,
    title: projectTitleInput.value,
    content: projectContentInput.value,
    dateOfSubmission: projectDateofSubmission.value,
  };

  if (isEdit) {
    const currentProjectIndex = projectsArr.findIndex(project => project.id === currentlyEditedProjectId);
    projectsArr[currentProjectIndex] = projectObj;
  } else {
    projectsArr.push(projectObj);
  }
  localStorage.setItem(projectsStorageKey, JSON.stringify(projectsArr));

  // clear the form fields
  departmentSelect.value = "";
  studentSelect.value = "";
  supervisorSelect.value = "";
  projectTitleInput.value = "";
  projectContentInput.value = "";
  projectDateofSubmission.value = "";

  window.location.href = 'list-projects.html';
});