const queryParams = getURLParams();

let currentlyViewedProjectId = 0;

currentlyViewedProjectId = +queryParams.id;

const viewedProject = getProjectById(currentlyViewedProjectId);

const studentName = getStudentById(viewedProject.studentId);

const studentDepartment = getDepartmentById(viewedProject.departmentId);

const studentSupervisor = getSupervisorById(viewedProject.superviorId);

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

displayStudentHolder.innerHTML = `<b>Name:</b> ${studentName.name}`;
displayDepartmentHolder.innerHTML = `<b>Department:</b> ${studentDepartment.name}`;
displaySupervisorHolder.innerHTML = `<b>Supervisor:</b> ${studentSupervisor.name}`;
displayTitleHolder.innerHTML = `<b>Title:</b> ${viewedProject.title}`;
displayContentHolder.innerHTML = `<b>Content:</b> ${viewedProject.content}`;
displayDateOfSubmissionHolder.innerHTML = `<b>Submitted on:</b> ${viewedProject.dateOfSubmission}`;