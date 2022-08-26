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