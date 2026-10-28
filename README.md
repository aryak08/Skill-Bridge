# SkillBridge — Evidence-Backed Placement & Career-Readiness Platform

> **"Don't just list what you know. Show what you can do."**

**PromptWars × KickToTech 2026 Hackathon**  
**Track:** Education & Student Life  
**Category:** Skill-Based Placement and Career-Readiness Platform  
**Target User:** College Students (Student-side experience)

---

## 1. Problem Statement

> **"Students struggle to secure jobs due to CGPA cutoffs and academic-based hiring criteria, which often fail to reflect their actual skills. The lack of personalized skill development and skill-based hiring limits their ability to showcase their true potential and access suitable career opportunities."**

Academic grades are only one signal of candidate potential. Traditional college placement drives frequently filter resumes through arbitrary CGPA thresholds, ignoring verified engineering abilities, practical project codebases, and problem-solving depth. The core issue is the **lack of visibility and credible evidence of practical student capabilities**.

---

## 2. Product Vision

The long-term vision of SkillBridge is to build an end-to-end skill-based placement ecosystem:
1. **Verify** a student's background, projects, and skills through objective benchmarks.
2. **Assess** domain knowledge and algorithmic tradeoffs through adaptive skill-based tests.
3. **Synthesize** an authenticated, evidence-backed Student Placement Portfolio.
4. **Generate** a credible performance report highlighting practical capability.
5. **Identify** high-priority competency gaps aligned with specific industry roles.
6. **Accelerate** skill development through personalized, action-oriented roadmaps.
7. **Discover** tailored job opportunities matched on demonstrated skill evidence.
8. **Empower** campus recruiters to filter candidate cohorts by practical proof rather than CGPA alone.

---

## 3. The Hackathon MVP

In strict adherence to hackathon engineering discipline, the MVP delivers **3 completely functional, production-quality core features working at 100%**:

```
[Student Profile]
       ↓
[Evidence-Backed Skills & Projects]
       ↓
[AI Skill Assessment + Gap Analysis]
       ↓
[Personalized 3-Priority Roadmap]
       ↓
[Placement Readiness Report & Evidence Score]
```

### Core Feature 1 — Evidence-Backed Student Portfolio
Moves the student from *"Here is what I claim I know"* to *"Here is evidence of what I can actually do."*
- **Personal & Academic Overview:** Name, institution, degree, branch, graduation year, and a concise academic CGPA snapshot (deliberately balanced so CGPA is not the dominant hero metric).
- **Three Verifiable Evidence Tiers:**
  1. `SELF-REPORTED`: The student claims the competency without test or repository proof (e.g. *Git · Self-reported · Beginner*).
  2. `ASSESSED`: The student proved knowledge through a SkillBridge benchmark assessment (e.g. *C Programming · Assessed · 84%*).
  3. `PROJECT-BACKED`: The student linked an authentic GitHub repository demonstrating real-world implementation (e.g. *Python · Project-backed*).
- **Practical Projects Showcase:** Project titles, architecture descriptions, technologies used, demonstrated skills, live links, and GitHub repository links.
- **Achievements & Milestones:** Hackathon finals, certifications, and open-source contributions contributing to external credibility.
- **Full Interactive CRUD:** Add/edit skills, link projects, log achievements, and edit student profile with instant persistence.

### Core Feature 2 — AI Skill Assessment + Skill Gap Analysis
The intelligent core connecting student capabilities to industry requirements.
- **Career Skill Framework:** Controlled benchmark dataset across 5 industry career tracks:
  - Software Developer (DSA, Programming, Problem Solving, Git/GitHub, Databases, Web Fundamentals)
  - Data Analyst (Python, SQL, Statistics, Data Visualization, Excel, Problem Solving)
  - AI/ML Engineer (Python, Mathematics, Machine Learning, Data Processing, Statistics, Problem Solving)
  - Cybersecurity Analyst (Networking, Linux, Security Fundamentals, Problem Solving, Programming)
  - Game Developer (Programming, Game Engines, Mathematics, Problem Solving, Game Concepts)
- **"Analyze My Skill Profile" CTA:** Evaluates the student's portfolio against target career benchmarks to deliver:
  - **Career Readiness Snapshot:** Validated strengths, missing competencies, and priority gaps.
  - **The "Why?" Narrative:** A tailored explanation of why the student has particular strengths and why their highest priority gap matters.
  - **Personalized Skill Roadmap ("Your Next 3 Priorities"):** Concise, high-yield action steps with practical rationales.
- **Interactive 5-Question Skill Assessment:**
  - Tests conceptual depth, asymptotic complexity, and algorithmic tradeoffs.
  - Features real-time progress indicators, timer context, and radio selections.
  - Provides instant automated scoring, proficiency tier determination (*Foundational*, *Developing*, *Proficient*, *Advanced*), strengths breakdown, and next-action advice.
  - **Live Evidence Upgrade:** Submitting an assessment instantly updates the student's skill in their portfolio to `ASSESSED` with score and date, immediately feeding into the Placement Report!

### Core Feature 3 — Placement Readiness Report
An executive, printable candidate performance portfolio summarizing practical capability:
- **Candidate Overview & Contact Details:** Clean, professional placement dossier header.
- **Skill Evidence Score (78 / 100):** A transparent metric summarizing evidence strength using an exact formula:
  - Assessments — **50%**
  - Practical Projects — **30%**
  - Achievements / Certifications — **20%**
  - *Responsible Design Notice:* Clearly labeled as an internal portfolio metric, not an employment guarantee or prediction.
- **Skill Evidence Classification Matrix:** Complete tabular audit of every competency with badge tier and supporting evidence details.
- **Demonstrated Projects & Repositories:** Codebase summaries with direct links and verified competencies.
- **Completed Assessment Audit:** Historical log of benchmark test scores and proficiency ratings.
- **Placement Readiness Summary:** Honest, descriptive synthesis of candidate readiness without ungrounded employment probability percentages.
- **Print / PDF Export:** Clean print stylesheet formatting the entire dossier for physical placement review.

---

## 4. AI Implementation & Responsible Design

### Where AI is Used
1. **Skill Gap Analysis:** Synthesizes multi-dimensional student inputs (skills, projects, test scores, target career) to detect unverified claims and critical missing prerequisites.
2. **Tailored Narrative Generation ("Why?"):** Contextualizes why specific gaps matter for the target career path rather than emitting generic advice.
3. **Personalized 3-Priority Roadmap:** Converts diagnostic findings into immediate, actionable milestones.
4. **Assessment Evaluation & Action Feedback:** Generates targeted technical recommendations based on quiz performance.

### Dual-Mode AI Architecture
- **Primary:** Live Google Gemini 1.5 Flash API integration (can be configured with a user API key via the in-app Settings modal).
- **Deterministic AI Fallback Engine:** A graph-based rule engine that matches portfolio skills against career requirement weights. This guarantees **100% uptime, zero blank screens, and flawless demo reliability** even without an API key or under network failures.

### Responsible AI Principles
- Never claims that CGPA is useless; treats academic metrics as one valid signal alongside practical evidence.
- Never makes false employment predictions (e.g. no "80% chance of being hired" claims).
- Never claims SkillBridge assessments represent "official accredited professional certifications".
- Transparently publishes the exact mathematical weights behind the SkillEvidence score.

---

## 5. Tech Stack

- **Frontend:** Modern vanilla ES6+ Single-Page Application (modular components, reactive observer state store, zero bundle friction).
- **Styling:** Tailwind CSS utility styling + custom Design System CSS (`css/styles.css`) with print media queries.
- **Typography:** Plus Jakarta Sans & JetBrains Mono.
- **Icons:** Zero-dependency inline SVG vector icon registry (100% offline reliability).
- **Persistence:** LocalStorage with instant reactivity, JSON export/import, and 1-click Demo Data reset.
- **Local Server:** Lightweight Python HTTP server (`serve.py`) with automatic browser launch, CORS, and module MIME handling.

---

## 6. Testing Strategy & Verification

The application underwent rigorous manual and automated testing across all core journeys:

1. **Profile Persistence:** Tested editing personal details, CGPA, target career, and refreshing the browser. Data persists seamlessly in LocalStorage.
2. **Evidence Upgrades:**
   - Adding a project automatically upgrades matching self-reported skills to `PROJECT-BACKED`.
   - Taking and completing an assessment instantly upgrades a skill from `SELF-REPORTED` to `ASSESSED` with score and date.
3. **AI Fallback Resilience:** Simulated complete network disconnection and missing API keys; verified the deterministic AI engine executes flawlessly with sub-second response times.
4. **Score Calculation Verification:** Tested boundary conditions (0 skills, partial assessments, full project coverage) against the 50/30/20 formula.
5. **Print Layout:** Verified print preview formats cleanly without navigation bars, headers, or buttons.
6. **Responsive Design:** Tested on desktop, laptop, tablet, and mobile viewport breakpoints.

---

## 7. Known Limitations

- **Question Bank Scope:** Currently includes curated 5-question test suites for 6 core competencies (Data Structures & Algorithms, Python, Problem Solving, C Programming, Git/GitHub, SQL). Additional subjects will be expanded in future releases.
- **Code Execution:** Assessments currently test conceptual and analytical reasoning via multiple-choice scenarios rather than executing student code in a live sandbox compiler.
- **Single Student Context:** The MVP focuses exclusively on the student-side experience without recruiter multi-tenant logins.

---

## 8. Future Implementation (Roadmap)

1. **Skill-Based Opportunity Matching:** Match candidates to verified internship and entry-level requisitions where employers set minimum evidence thresholds.
2. **Recruiter Candidate Discovery Portal:** Allow technical recruiters to search candidate cohorts using complex evidence queries rather than keyword resume filtering.
3. **AI Technical & Behavioral Mock Interviews:** Multimodal audio and code-pair interview evaluations assessing design choices and communication clarity.
4. **Cryptographic & Git Project Verification:** Static AST analysis and Git commit timeline verification to detect plagiarism and confirm authentic authorship.

---

## 9. Quick Setup & Run Instructions

### Prerequisites
- Python 3.8+ (or any modern web browser)

### Launching the Application

1. Open a terminal inside the project directory:
   ```powershell
   cd c:\Users\ARYA\OneDrive\Desktop\hackathon
   ```

2. Start the local server:
   ```powershell
   python serve.py
   ```
   *(This starts the server on `http://localhost:3000` and automatically launches your browser).*

3. Alternatively, run with Python's built-in server:
   ```powershell
   python -m http.server 3000
   ```
   Then navigate to `http://localhost:3000` in Google Chrome or Microsoft Edge.

4. To reset data to Arya Sharma's default demo portfolio at any time, click **"Reset Demo"** in the top navigation bar.

---

## 10. 3–4 Minute Judge Demonstration Script

| Time | Action | What to Highlight |
|---|---|---|
| **0:00–0:30** | Introduce Problem | Academic CGPA cutoffs filter out capable developers. Show how academic score is only one signal of potential. |
| **0:30–1:00** | Evidence Portfolio | Review Arya's profile. Point out the 3 visual evidence badges: `ASSESSED`, `PROJECT-BACKED`, and `SELF-REPORTED`. Show the AeroGrid project. |
| **1:00–1:45** | AI Gap Analysis | Click **"Analyze My Skill Profile"**. Highlight the Career Readiness Snapshot, the personalized "Why?" narrative, and the Next 3 Priorities. |
| **1:45–2:30** | Take Assessment | Click **"Assess DSA"**. Answer the 5 questions, submit, and watch the score (e.g. 80%) instantly upgrade the skill in the portfolio to `ASSESSED`. |
| **2:30–3:15** | Placement Report | Switch to **"3. Placement Report"**. Show the transparent Skill Evidence Score (breakdown of 50% test + 30% project + 20% cert) and printable layout. |
| **3:15–3:45** | Future Scope & Wrap-up | Showcase Future Scope cards (Recruiter Portal & Opportunity Matching). Conclude: *"Don't just list what you know. Show what you can do."* |

---

## 11. Originality Declaration

This project was conceived and built specifically for the **PromptWars × KickToTech 2026 Hackathon**. All architecture, data models, assessment question banks, scoring logic, and responsive UI components were authored cleanly for this challenge.
