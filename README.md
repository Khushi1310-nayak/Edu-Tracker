<div align="center">

# 📘 Edu-Tracker
### Exam & Attendance Management System

*A web-based academic tracker designed for students to manage their attendance, exams, subjects, and performance insights efficiently from a single interactive dashboard.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Status](https://img.shields.io/badge/Project-Active-success?style=for-the-badge)

</div>

---

# 📖 Overview

Students often struggle to keep track of their attendance percentages, upcoming exams, subject-wise progress, and academic performance data.

**Edu-Tracker** solves this by providing a centralized, visual, and easy-to-use system that keeps all academic information organized and accessible. It helps track attendance, subjects, exams, feedback, and performance insights—all from a single interactive dashboard.

---

# ✨ Features

- 📊 **Dashboard:** A unified dashboard that gives an overview of attendance, exams, subjects, and performance insights at a glance.
- 📅 **Attendance Tracker:** Track attendance for each subject and monitor overall attendance percentage to stay exam-ready.
- 📚 **Subjects Management:** Add, edit, and manage subjects with ease for better academic organization.
- 📝 **Exam Tracker:** Keep track of exams, schedules, and subject-wise exam details.
- 💬 **Feedback System:** Add and manage feedback related to subjects or exams for self-improvement.
- 📈 **Visual Insights:** Interactive bar graphs and charts using **Chart.js** to visualize academic performance and attendance trends.
- 📤 **Export Dashboard:** Export your dashboard data for record-keeping or sharing purposes.
- 📄 **Resume Upload:** Upload and store resumes directly within the platform for academic or placement readiness.
- 🚀 **Getting Started Guide:** A guided onboarding experience to help users understand and use the app effectively.

---

# 🏗 Architecture

```mermaid
graph TD
    User["User (Student)"]
    
    subgraph Frontend ["React SPA Application"]
        UI["Edu-Tracker Interface"]
        
        subgraph Modules ["Edu-Tracker Modules"]
            Dashboard["Dashboard Overview"]
            Attendance["Attendance Tracker"]
            Subjects["Subjects Management"]
            Exams["Exam Tracker"]
            Feedback["Feedback System"]
            Insights["Visual Insights (Chart.js)"]
            Export["Export Dashboard"]
            Resume["Resume Upload"]
            Onboarding["Getting Started Guide"]
        end
    end
    
    subgraph ExternalServices ["External APIs"]
        EmailJS["Email.js (Communication)"]
    end
    
    User --> UI
    
    UI --> Dashboard
    UI --> Attendance
    UI --> Subjects
    UI --> Exams
    UI --> Feedback
    UI --> Insights
    UI --> Export
    UI --> Resume
    UI --> Onboarding
    
    Feedback --> EmailJS
```

---

# 🛠 Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend Framework** | React | Core UI component logic |
| **Styling** | Tailwind CSS, HTML/CSS | Modern UI design, structure, and responsive layout |
| **Data Visualization** | Chart.js | Interactive bar graphs and charts |
| **Core Logic** | JavaScript | Client-side application behavior |
| **Communication** | Email.js | Handling email and feedback features |

---

# 📸 Screenshots

### 🏠 Dashboard Overview
<img width="1890" height="1001" alt="Screenshot (971)" src="https://github.com/user-attachments/assets/2e998852-a129-4cc6-b9e0-c67e133708b2" />

---

### 📅 Attendance Tracker
<img width="1887" height="983" alt="Screenshot (972)" src="https://github.com/user-attachments/assets/f59f231e-267d-4c81-8d47-984da0b268a0" />

---

### 📝 Exam Tracker
<img width="1904" height="990" alt="Screenshot (973)" src="https://github.com/user-attachments/assets/338f5b9d-e31c-4f70-a907-b7b661435040" />

---

### 📈 Visual Insights
<img width="1845" height="988" alt="Screenshot (974)" src="https://github.com/user-attachments/assets/a24b0600-420f-4fa1-b104-d7dfcf1a877e" />

---

# ⚙️ Installation & Setup

## 1. Clone the repository
```bash
git clone https://github.com/Khushi1310-nayak/Edu-Tracker.git
cd Edu-Tracker
```

## 2. Install dependencies
```bash
npm install
```

## 3. Run the application
```bash
npm run dev
```

---

# 🚀 Future Enhancements

- **Authentication:** User authentication & profiles
- **Cloud Database:** Cloud storage for academic records
- **Alerts:** Notifications for exams & attendance alerts
- **Mobile First:** Mobile-responsive improvements
- **Advanced Metrics:** Advanced analytics & reports

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, create a feature branch, and submit a pull request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👩💻 Author

## **Manisa Nayak**

🎓 Student | Full-Stack Developer | AI Product Builder

Passionate about:
- Full-Stack Architecture
- User Experience (UI/UX)
- AI Automation & Product Building

### Connect with Me

**GitHub:** https://github.com/Khushi1310-nayak  
**LinkedIn:** https://www.linkedin.com/in/manisa-nayak-185bb5378/

---

## ⭐ If you found this project interesting, consider giving it a Star!
