const queryParams = getURLParams();
console.log("queryParams", queryParams);

const isView = !queryParams.isView;
console.log("isView", isView);

let currentlyViewedProjectId = 0;

if (isView) {
  currentlyViewedProjectId = +queryParams.id;

  const viewedProject = getProjectById(currentlyViewedProjectId);

  const displayProjectContainer = document.getElementById(
    "view-project-container"
  );

  const displayTitleHolder = createElementWithAttributes("div", {
    class: "project-display-title",
  });
  const displayContentHolder = createElementWithAttributes("div", {
    class: "project-display-content",
  });

  displayTitleHolder.textContent = `Title - ${viewedProject.title}`;
  displayContentHolder.textContent = viewedProject.content;

  displayProjectContainer.append(displayTitleHolder, displayContentHolder);

  console.log("displayProjectContainer", displayProjectContainer);
}
