const courses = [
    {
     subject: 'WDD',
     number: 130,
     title: 'Web Fundamentals',
     credits: 2,
     certificate: 'Web and Computer Programming',
     description: 'This course introduces web development concepts',
     completed: true
    },

    {
     subject: 'CSE',
     number: 131,
     title: 'Web Fundamentals',
     credits: 2,
     certificate: 'Web and Computer Programming',
     description: 'This course introduces web development concepts',
      completed: true   

    },

    {
      subject: 'WDD',
      number: 231,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces web development concepts',
      completed: true  
    }
];

const courseContainer = document.querySelector(".course-list");
function displayCourses(coursesToDisplay) {
    courseContainer.innerHTML = "";
 
    coursesToDisplay.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");

        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}<p>
            <p>Credits: ${course.credits}<p>
          `;

          courseContainer.appendChild(card);
    
});

const totalCredits =coursesToDisplay.reduce((sum,course) => sum + course.credits, 0);
console.log("Total Credits Calculated:", totalCredits);
const creditCountElem = document.querySelector("#credit-count");
if (creditCountElem) {
    creditCountElem.textContent = totalCredits;
}
}
const allBtn = document.querySelector("#all");
const cseBtn = document.querySelector("#cse");
const wddBtn = document.querySelector("#wdd");

allBtn.addEventListener("click", () => {
    displayCourses(courses);
});

cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});


