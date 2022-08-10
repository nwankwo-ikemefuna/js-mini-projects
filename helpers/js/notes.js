
const functionName = (lName, lCourses) => {
  const lecturer1Name = lName;
  const lecturer1Courses = lCourses;
  console.log(`${lecturer1Name} is taking these courses: ${lecturer1Courses.join(', ')}`);
}

const lName1 = 'Mr. Lecturer 1';
const lCourses1 = ['CSC101', 'CSC102', 'CSC103'];
functionName(lName1, lCourses1);

const lName2 = 'Mr. Lecturer 2';
const lCourses2 = ['CSC101', 'CSC102', 'CSC103'];
functionName(lName2, lCourses2);

const lName3 = 'Mr. Lecturer 3';
const lCourses3 = ['CSC101', 'CSC102', 'CSC103'];
functionName(lName3, lCourses3);
