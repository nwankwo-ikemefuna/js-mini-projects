
function displayProjectsInTable() {
  const projectsArr = getProjects();
  const paginatedProjectRowsArr = [];
  projectsArr.forEach((project) => {
    const tdId = createElementWithAttributes("td");
    tdId.textContent = project.id;

    const tdTitle = createElementWithAttributes("td");
    tdTitle.textContent = project.title;

    const tdStudent = createElementWithAttributes("td");
    tdStudent.textContent = getStudentById(project.studentId, 'name');

    const tdDepartment = createElementWithAttributes("td");
    tdDepartment.textContent = getDepartmentById(project.departmentId, 'name');

    const tdSupervisor = createElementWithAttributes("td");
    tdSupervisor.textContent = getSupervisorById(project.superviorId, 'name');

    const tdDateOfSubmission = createElementWithAttributes("td");
    tdDateOfSubmission.textContent = project.dateOfSubmission;

    const tdAction = createElementWithAttributes("td");

    const buttonWrapper = createElementWithAttributes("div", {
      class: "project-actions",
    });
    const viewButton = createElementWithAttributes("i", {
      class: "fas fa-eye view-project",
      'data-projectid': project.id,
    });
    const editButton = createElementWithAttributes("i", {
      class: "fas fa-pen-to-square edit-project",
      'data-projectid': project.id,
    });
    const deleteButton = createElementWithAttributes("i", {
      class: "fas fa-trash delete-project",
      'data-projectid': project.id,
    });

    tdAction.appendChild(buttonWrapper);
    buttonWrapper.append(viewButton, editButton, deleteButton);

    const projectRow = createElementWithAttributes("tr", {
      class: "project-row",
    });
    projectRow.append(
      tdId,
      tdTitle,
      tdStudent,
      tdDepartment,
      tdSupervisor,
      tdDateOfSubmission,
      tdAction
    );
    paginatedProjectRowsArr.push(projectRow);
  });
  paginate('projectsTableBody', paginatedProjectRowsArr, 4, 3, 1, projectActionsEventListeners);
}
displayProjectsInTable();

function projectActionsEventListeners() {
  addEventListenersToActionIcons("view", "view-project");
  addEventListenersToActionIcons("edit", "edit-project");
  addEventListenersToActionIcons("delete", "delete-project");
}

