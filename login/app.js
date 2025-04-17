// On load: fetch students.json, setup login logic
let students = [];

fetch('students.json')
  .then(res => res.json())
  .then(data => { students = data.students; });

const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard-container');
const loginContainer = document.getElementById('login-container');
const loginLogo = document.getElementById('login-logo');
const loginError = document.getElementById('login-error');
const appShell = document.getElementById('app-shell');
const navHome = document.getElementById('nav-home');
const navContact = document.getElementById('nav-contact');
const sectionDashboard = document.getElementById('dashboard-container');
const sectionContact = document.getElementById('contactus-container');
const logoutBtn = document.getElementById('logout-btn');

let currentStudent = null;

// Login logic
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  loginError.textContent = '';
  const roll = document.getElementById('roll').value.trim();
  const password = document.getElementById('password').value;
  const student = students.find(s => s.roll === roll);

  if (!student || password !== student.password) {
    loginError.textContent = "Invalid roll number or password.";
    return;
  }
  currentStudent = student;
  // Show app shell
  loginContainer.style.display = 'none';
  loginLogo.style.display = 'none';
  appShell.style.display = '';
  showDashboard(student);
  routeTo('home');
});

// Show dashboard info
function showDashboard(student) {
  document.getElementById('student-name').textContent = student.name;
  document.getElementById('student-name-info').textContent = student.name;
  document.getElementById('student-roll').textContent = student.roll;
  const feeElem = document.getElementById('student-fee');
  if(student.feePaid) {
    feeElem.textContent = "Yes";
    feeElem.classList.add('yes');
    feeElem.classList.remove('no');
  } else {
    feeElem.textContent = "No";
    feeElem.classList.add('no');
    feeElem.classList.remove('yes');
  }
  const courseList = document.getElementById('course-list');
  courseList.innerHTML = '';
  student.courses.forEach(c =>
    courseList.innerHTML += `<li>${c}</li>`
  );
}

// "Routing"
function routeTo(page) {
  // Remove all nav active states
  navHome.classList.remove('active');
  navContact.classList.remove('active');
  // Hide all sections
  sectionDashboard.style.display = 'none';
  sectionContact.style.display = 'none';
  if(page === 'home') {
    sectionDashboard.style.display = '';
    navHome.classList.add('active');
  }
  if(page === 'contact') {
    sectionContact.style.display = '';
    navContact.classList.add('active');
  }
}

// Nav button handlers
navHome.addEventListener('click', () => routeTo('home'));
navContact.addEventListener('click', () => routeTo('contact'));

// Logout
logoutBtn.addEventListener('click', function() {
  appShell.style.display = 'none';
  loginContainer.style.display = '';
  loginLogo.style.display = '';
  loginForm.reset();
  loginError.textContent = '';
  currentStudent = null;
  // Reset nav/page to home for next login
  routeTo('home');
});