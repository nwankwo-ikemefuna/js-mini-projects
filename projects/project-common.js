const departmentsStorageKey = 'DEPARTMENTS';
const studentsStorageKey = 'STUDENTS';
const superviorsStorageKey = 'SUPERVISORS';
const projectsStorageKey = 'PROJECTS';

function getDepartmentById(departmentId, key = null) {
  const departmentsArr = getLocalStorageData(departmentsStorageKey, departmentsDataArr);
  const departmentObj = departmentsArr.find(department => department.id === departmentId);
  if (key) {
    return departmentObj[key];
  }
  return departmentObj;
}

function getStudentById(studentId, key = null) {
  const studentsArr = getLocalStorageData(studentsStorageKey, studentsDataArr);
  const studentObj = studentsArr.find(student => student.id === studentId);
  if (key) {
    return studentObj[key];
  }
  return studentObj;
}

function getSupervisorById(superviorId, key = null) {
  const superviorsArr = getLocalStorageData(superviorsStorageKey, supervisorsDataArr);
  const supervisorObj = superviorsArr.find(supervior => supervior.id === superviorId);
  if (key) {
    return supervisorObj[key];
  }
  return supervisorObj;
}

function getProjects() {
  const projectsStr = localStorage.getItem(projectsStorageKey);
  const projectsArr = JSON.parse(projectsStr) || [];
  // sort by id in descending order
  projectsArr.sort((project1, project2) => +project2.id - +project1.id);
  return projectsArr;
}

function getProjectById(projectId, key = null) {
  const projectsArr = getProjects();
  const projectObj = projectsArr.find(project => +project.id === +projectId);
  if (key) {
    return projectObj[key];
  }
  return projectObj;
}

function addEventListenersToActionIcons(actionType, actionClassName) {
  const actionButtons = document.getElementsByClassName(actionClassName);
  Array.from(actionButtons).forEach((actionButton) => {
    actionButton.addEventListener("click", (event) => {
      const projectId = +event.target.dataset.projectid;
      const projectsArr = getProjects();
      if (actionType === "delete") {
        if (confirm('Sure to delete?')) {
          const updatedProjects = projectsArr.filter(project => project.id !== projectId);
          localStorage.setItem(projectsStorageKey, JSON.stringify(updatedProjects));
          displayProjectsInTable();
        }
      } else if (actionType === "view") {
        window.location.href = `display-projects.html?id=${projectId}`;

        // displayModal(
        //   `project-content-modal-${projectId}`,
        //   `Title - ${projectObj.title}`,
        //   projectObj.content,
        //   null,
        //   false
        // );
      } else if (actionType === "edit") {
        window.location.href = `add-edit-project.html?id=${projectId}&isEdit=1`;
      }
    });
  });
}