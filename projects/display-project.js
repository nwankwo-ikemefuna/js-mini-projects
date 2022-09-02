const queryParams = getURLParams();

const currentlyViewedProjectId = +queryParams.id;

const viewedProject = getProjectById(currentlyViewedProjectId);

const studentNameObj = getStudentById(viewedProject.studentId);
const studentName = studentNameObj.name;

const studentDepartmentObj = getDepartmentById(viewedProject.departmentId);
const studentDepartment = studentDepartmentObj.name;

const studentSupervisorObj = getSupervisorById(viewedProject.superviorId);
const studentSupervisor = studentSupervisorObj.name;

const displayProjectContainer = document.getElementById(
  "view-project-container"
);

const displayStudentHolder = document.getElementById("display-student-holder");
const displayDepartmentHolder = document.getElementById(
  "display-depatment-holder"
);
const displaySupervisorHolder = document.getElementById(
  "display-supervisor-holder"
);
const displayTitleHolder = document.getElementById("display-title-holder");
const displayContentHolder = document.getElementById("display-content-holder");
const displayDateOfSubmissionHolder = document.getElementById(
  "display-date-of-submission-holder"
);

displayStudentHolder.innerHTML = `<b>Name:</b> ${studentName}`;
displayDepartmentHolder.innerHTML = `<b>Department:</b> ${studentDepartment}`;
displaySupervisorHolder.innerHTML = `<b>Supervisor:</b> ${studentSupervisor}`;
displayTitleHolder.innerHTML = `<b>Title:</b> ${viewedProject.title}`;
displayContentHolder.innerHTML = `<b>Content:</b> ${viewedProject.content}`;
displayDateOfSubmissionHolder.innerHTML = `<b>Submitted on:</b> ${viewedProject.dateOfSubmission}`;