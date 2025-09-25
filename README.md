Edu Tracker

Edu Tracker is a React-based web app for students to track attendance, exams, and study progress in one place. It provides visual charts, upcoming exam schedules, and interactive features to help students stay organized and on top of their academics.

Features

---

Dashboard

---

Overall attendance percentage.

Subject-wise attendance chart.

Upcoming exams preview.

What-if analysis for missed classes.

Export attendance data as PDF.

Subjects Page

---

Add, edit, and delete subjects.

Track theory and lab attendance separately.

Progress bars for each subject’s attendance.

Exams Page

---

Add exams with subject, date, syllabus, and type (Midterm, Final, Quiz, Revision).

Automatically categorize exams by type.

Edit and delete exams.

Calendar view for upcoming exams.

Contact Page

---

Contact form integrated with EmailJS for sending messages.

Sign Up / Sign In

---

Redirects to Dashboard after signup.

Stores user info in local storage.

Export / Resume Feature

Export full attendance data as PDF.

Option to attach your resume or CV.

---

Tech Stack

Frontend: React, Tailwind CSS, Chart.js

Email: EmailJS for contact form functionality

PDF Export: jsPDF

State Management: React useState and useEffect

Routing: React Router DOM
---

```
Installation

Clone the repository:

git clone https://github.com/your-username/edu-tracker.git
cd edu-tracker/my-project


Install dependencies:

npm install


Run the project:

npm run dev


Open the app in your browser at http://localhost:5173
```
---
Usage

Sign Up

Enter your name, email, and password.

Click “Sign Up” to go to the Dashboard.

Add Subjects

Click “Add Subject” → fill in name, code, total classes, attended classes, lab info.

Track Attendance

Increment attended or missed classes with buttons.

See progress bars and overall attendance percentages.

Add Exams

Click “Add Exam” → fill in subject, code, syllabus (up to 10 chapters), date, and type.

Edit or delete exams as needed.

Export Data

Go to Dashboard → use export buttons to generate PDF of attendance, exams, and subjects.

Contact

Fill in your message → EmailJS will send it directly to your configured email.

Notes

Make sure to set up EmailJS with your service ID, template ID, and user ID in the Contact page.

node_modules/ is ignored in Git. Run npm install after cloning.

License

This project is open-source and free to use.
