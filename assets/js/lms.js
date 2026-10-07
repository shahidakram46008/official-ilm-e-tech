/**
 * ILM E TECH PAKISTAN — Enterprise LMS, Interactive Quiz & Automated PDF Certification Engine
 * Domain: ilmetechpakistan.com
 */

class IlmLMSEngine {
  constructor() {
    this.currentCourse = null;
    this.currentLesson = null;
    this.progress = {};
    this.quizTimer = null;
    this.init();
  }

  init() {
    this.loadProgress();
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('classroomApp')) {
        this.initClassroom();
      }
      if (document.getElementById('studentDashboardApp')) {
        this.initStudentDashboard();
      }
    });
  }

  loadProgress() {
    const raw = localStorage.getItem('ilmetech_lms_progress');
    this.progress = raw ? JSON.parse(raw) : {
      'basic-ai': { completedLessons: [1, 2], totalLessons: 4, quizScore: 85, completed: false },
      'ai-tools-mastery': { completedLessons: [1, 2, 3, 4, 5], totalLessons: 5, quizScore: 92, completed: true }
    };
  }

  saveProgress() {
    localStorage.setItem('ilmetech_lms_progress', JSON.stringify(this.progress));
  }

  initClassroom() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id') || 'basic-ai';
    const courses = window.ilmDB ? window.ilmDB.getCourses() : [];
    this.currentCourse = courses.find(c => c.id === courseId) || courses[0];

    this.renderClassroomUI();
  }

  renderClassroomUI() {
    if (!this.currentCourse) return;

    const titleEl = document.getElementById('classroomCourseTitle');
    if (titleEl) titleEl.textContent = this.currentCourse.title;

    const syllabusEl = document.getElementById('classroomSyllabus');
    if (syllabusEl && this.currentCourse.syllabus) {
      const courseProg = this.progress[this.currentCourse.id] || { completedLessons: [], totalLessons: this.currentCourse.syllabus.length };
      
      syllabusEl.innerHTML = this.currentCourse.syllabus.map((item, idx) => {
        const isDone = courseProg.completedLessons.includes(idx + 1);
        return `
          <div class="card nasa-card" style="padding:1rem; margin-bottom:0.75rem; border-left:4px solid ${isDone ? '#10b981' : '#0284c7'};">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--text-dark); display:block; font-size:1rem;">Week ${item.week}: ${item.topic}</strong>
                <span style="font-size:0.85rem; color:var(--text-muted);">${item.detail}</span>
              </div>
              <button onclick="window.ilmLMS.toggleLesson(${idx + 1})" class="btn btn-sm ${isDone ? 'btn-primary' : 'btn-outline-blue'}">
                <i class="fas ${isDone ? 'fa-check-circle' : 'fa-play-circle'}"></i> ${isDone ? 'Completed' : 'Start Lesson'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    this.updateProgressGauge();
  }

  toggleLesson(lessonIdx) {
    if (!this.currentCourse) return;
    const courseId = this.currentCourse.id;
    if (!this.progress[courseId]) {
      this.progress[courseId] = { completedLessons: [], totalLessons: this.currentCourse.syllabus.length, quizScore: 0, completed: false };
    }

    const list = this.progress[courseId].completedLessons;
    const pos = list.indexOf(lessonIdx);
    if (pos >= 0) {
      list.splice(pos, 1);
    } else {
      list.push(lessonIdx);
    }

    const percent = (list.length / this.currentCourse.syllabus.length) * 100;
    if (percent >= 100) {
      this.progress[courseId].completed = true;
      this.issueCertificate(this.currentCourse);
    }

    this.saveProgress();
    this.renderClassroomUI();
    window.showToast?.(`Lesson ${lessonIdx} progress updated!`, 'success');
  }

  updateProgressGauge() {
    if (!this.currentCourse) return;
    const courseProg = this.progress[this.currentCourse.id] || { completedLessons: [], totalLessons: 4 };
    const percent = Math.round((courseProg.completedLessons.length / courseProg.totalLessons) * 100);

    const bar = document.getElementById('classroomProgressBar');
    if (bar) {
      bar.style.width = percent + '%';
    }
    const txt = document.getElementById('classroomProgressPercent');
    if (txt) {
      txt.textContent = percent + '% Complete';
    }
  }

  startQuiz(quizId) {
    const modal = document.getElementById('quizModal');
    if (!modal) return;
    modal.style.display = 'block';

    const questions = [
      { q: "What is the primary role of a Large Language Model (LLM)?", options: ["Generate text & assist workflows", "Edit videos automatically", "Fix physical hardware", "Create database indexes"], ans: 0 },
      { q: "Which prompting technique involves assigning a specific persona to AI?", options: ["Zero-shot", "Role-play prompting", "Chain of thought", "Few-shot"], ans: 1 },
      { q: "What is Prompt Engineering?", options: ["Writing code in C++", "Crafting effective queries for AI models", "Designing graphics", "Installing Windows"], ans: 1 }
    ];

    let currentQ = 0;
    let score = 0;
    const renderQ = () => {
      if (currentQ >= questions.length) {
        const finalScore = Math.round((score / questions.length) * 100);
        modal.querySelector('.quiz-body').innerHTML = `
          <div style="text-align:center; padding:2rem;">
            <div style="font-size:3rem; color:${finalScore >= 70 ? '#10b981' : '#ef4444'}; margin-bottom:1rem;"><i class="fas ${finalScore >= 70 ? 'fa-award' : 'fa-times-circle'}"></i></div>
            <h2>Quiz Result: ${finalScore}%</h2>
            <p>${finalScore >= 70 ? 'Congratulations! You passed the module quiz.' : 'Please review the course materials and try again.'}</p>
            <button onclick="document.getElementById('quizModal').style.display='none'" class="btn btn-primary" style="margin-top:1.5rem;">Close Quiz</button>
          </div>
        `;
        return;
      }

      const qObj = questions[currentQ];
      modal.querySelector('.quiz-body').innerHTML = `
        <div style="padding:1.5rem;">
          <h4>Question ${currentQ + 1} of ${questions.length}</h4>
          <p style="font-size:1.1rem; font-weight:700; margin:1rem 0;">${qObj.q}</p>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${qObj.options.map((opt, oIdx) => `
              <button onclick="window.ilmLMS.answerQuiz(${oIdx === qObj.ans})" class="btn btn-outline" style="text-align:left; padding:0.8rem 1rem;">${opt}</button>
            `).join('')}
          </div>
        </div>
      `;
    };

    window.ilmLMS.answerQuiz = (isCorrect) => {
      if (isCorrect) score++;
      currentQ++;
      renderQ();
    };

    renderQ();
  }

  issueCertificate(course) {
    const certId = 'ILM-2026-' + Math.floor(100000 + Math.random() * 900000);
    const studentName = window.ilmAuth?.currentUser?.fullName || 'Syed Muhammad Usama';
    const certData = {
      id: certId,
      studentName: studentName,
      courseName: course.title,
      issueDate: new Date().toISOString().split('T')[0],
      grade: 'A+ Distinction',
      status: 'Verified'
    };

    if (window.ilmDB) {
      window.ilmDB.addCertificate(certData);
    }
    window.showToast?.(`🎉 Course Completed! Verification ID: ${certId}`, 'success');
  }

  downloadPDFCertificate(certId) {
    window.open(`verify-certificate.html?id=${encodeURIComponent(certId)}`, '_blank');
  }

  initStudentDashboard() {
    const container = document.getElementById('studentEnrolledCoursesGrid');
    if (!container || !window.ilmDB) return;

    const courses = window.ilmDB.getCourses();
    container.innerHTML = courses.slice(0, 4).map(c => {
      const prog = this.progress[c.id] || { completedLessons: [], totalLessons: 4, completed: false };
      const percent = Math.round((prog.completedLessons.length / prog.totalLessons) * 100);

      return `
        <div class="card nasa-card" style="padding:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <span class="badge" style="background:var(--emerald-light); color:var(--primary-green); font-weight:700;">${c.category}</span>
            <span style="font-weight:800; color:var(--tech-blue);">${percent}% Completed</span>
          </div>
          <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-dark); margin-bottom:0.5rem;">${c.title}</h3>
          <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden; margin:1rem 0;">
            <div style="background:linear-gradient(90deg, var(--primary-green), var(--emerald-accent)); width:${percent}%; height:100%;"></div>
          </div>
          <div style="display:flex; gap:0.75rem; margin-top:1.25rem;">
            <a href="classroom.html?id=${c.id}" class="btn btn-primary btn-sm"><i class="fas fa-chalkboard-teacher"></i> Open Classroom</a>
            ${percent >= 100 ? `<a href="verify-certificate.html?id=ILM-2026-000101" class="btn btn-outline-blue btn-sm"><i class="fas fa-award"></i> Certificate</a>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }
}

window.ilmLMS = new IlmLMSEngine();
