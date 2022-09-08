
// function usage
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


// object spreading
const obj1 = { name: 'Ik', age: 21 };
const obj2 = { nationality: 'Nigerian', ...obj1 };
console.log('obj2', obj2);


// local storage
const storageKey = 'samplePost';
const storageData = {
  title: 'Sample post 1',
  body: 'lorem ipsum dolor sit emeka',
  accountId: 3
};
//localStorage.setItem(storageKey, JSON.stringify(storageData));

const samplePostLocalStorageData = localStorage.getItem(storageKey);
const samplePostLocalStorageDataObj = JSON.parse(samplePostLocalStorageData);
console.log('samplePostLocalStorageData', samplePostLocalStorageData);
console.log('samplePostLocalStorageDataObj', samplePostLocalStorageDataObj);
console.log('samplePostLocalStorageData type', typeof samplePostLocalStorageData);
console.log('samplePostLocalStorageDataObj type', typeof samplePostLocalStorageDataObj);