/**
 * Realistic Default Demo Student Profile
 * Preloaded for immediate, polished demonstration during 3-4 minute judge reviews.
 * Fully editable and resettable at any time.
 */

export const INITIAL_STUDENT_PROFILE = {
  id: 'student_arya_2026',
  personal: {
    name: 'Arya Sharma',
    college: 'National Institute of Technology',
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    avatarInitials: 'AS',
    email: 'arya.sharma@nit.edu.in',
    github: 'https://github.com/aryasharma-code',
    linkedin: 'https://linkedin.com/in/aryasharma-tech'
  },
  career: {
    targetRole: 'Software Developer',
    interests: ['Systems Programming', 'Distributed Systems', 'Applied Algorithms', 'Cloud Infrastructure']
  },
  academics: {
    cgpa: 7.82,
    maxCgpa: 10.0,
    academicRemark: 'Consistent academic record with rigorous focus on practical computer systems coursework.'
  },
  skills: [
    {
      id: 'sk_c',
      name: 'C Programming',
      category: 'Core Systems',
      proficiency: 'Intermediate',
      evidenceType: 'ASSESSED',
      assessmentScore: 84,
      assessedAt: '2026-10-15',
      evidenceNote: 'Demonstrated strong dynamic memory management, pointer arithmetic, and POSIX system calls.'
    },
    {
      id: 'sk_prob_solving',
      name: 'Problem Solving',
      category: 'Algorithmic Thinking',
      proficiency: 'Intermediate',
      evidenceType: 'ASSESSED',
      assessmentScore: 76,
      assessedAt: '2026-10-20',
      evidenceNote: 'Verified proficiency in two-pointer strategies, sliding window techniques, and edge-case handling.'
    },
    {
      id: 'sk_python',
      name: 'Python',
      category: 'Software Engineering',
      proficiency: 'Beginner',
      evidenceType: 'PROJECT-BACKED',
      linkedProjectIds: ['proj_aerogrid'],
      evidenceNote: 'Demonstrated via AeroGrid backend dispatch algorithms and automated telemetry simulator.'
    },
    {
      id: 'sk_web',
      name: 'HTML/CSS',
      category: 'Web Fundamentals',
      proficiency: 'Intermediate',
      evidenceType: 'SELF-REPORTED',
      evidenceNote: 'Self-reported front-end styling experience from coursework and personal mini-sites.'
    },
    {
      id: 'sk_git',
      name: 'Git',
      category: 'Developer Tools',
      proficiency: 'Beginner',
      evidenceType: 'SELF-REPORTED',
      evidenceNote: 'Basic version control usage (commit, push, pull); limited team pull-request and rebase history.'
    },
    {
      id: 'sk_dsa',
      name: 'Data Structures & Algorithms',
      category: 'Computer Science Core',
      proficiency: 'Beginner',
      evidenceType: 'SELF-REPORTED',
      evidenceNote: 'Theoretical exposure through coursework; ready for practical SkillBridge benchmark assessment.'
    }
  ],
  projects: [
    {
      id: 'proj_aerogrid',
      title: 'AeroGrid — Disaster Response & Autonomous Drone Dispatch Prototype',
      description: 'An emergency response routing platform that ingests geographic distress coordinates and optimizes drone battery-to-payload trajectories across disaster zones. Features automated waypoint clustering and live status broadcasts.',
      technologies: ['Python', 'FastAPI', 'Algorithms', 'WebSockets', 'GeoJSON'],
      skillsDemonstrated: ['Python', 'Problem Solving', 'Data Processing', 'API Design'],
      githubUrl: 'https://github.com/aryasharma-code/aerogrid-dispatch',
      liveUrl: 'https://aerogrid-demo.preview.app',
      metrics: 'Simulated 120+ concurrent emergency flights with 18% lower average flight turnaround latency.'
    },
    {
      id: 'proj_memalloc',
      title: 'POSIX Custom Memory Allocator & Leak Detector',
      description: 'Implemented a custom `malloc` and `free` subsystem in C utilizing explicit free lists, first-fit coalescing, and boundary tags. Included real-time heap defragmentation metrics.',
      technologies: ['C Programming', 'GDB', 'Valgrind', 'Make'],
      skillsDemonstrated: ['C Programming', 'Memory Management', 'Debugging'],
      githubUrl: 'https://github.com/aryasharma-code/c-allocator-core',
      liveUrl: '',
      metrics: 'Achieved 82% peak memory utilization efficiency without internal heap corruption under stress tests.'
    }
  ],
  achievements: [
    {
      id: 'ach_1',
      title: 'Smart India Hackathon (SIH) 2025 Regional Finalist',
      issuer: 'Ministry of Education & AICTE',
      date: '2025-11-12',
      type: 'Hackathon',
      description: 'Selected among top 5 teams from 180+ university submissions for building disaster response telemetry.'
    },
    {
      id: 'ach_2',
      title: 'Open Source Contributor — DevDocs Community Tools',
      issuer: 'DevDocs Project',
      date: '2026-03-04',
      type: 'Open Source',
      description: 'Authored documentation parsers and resolved 3 accessibility bug issues in community repository.'
    }
  ],
  assessments: [
    {
      id: 'asmt_c_01',
      skillName: 'C Programming',
      score: 84,
      totalQuestions: 5,
      correctAnswers: 4,
      level: 'Proficient',
      completedAt: '2026-10-15',
      strengths: ['Dynamic memory lifecycle', 'Pointer arithmetic', 'Type qualifiers (volatile)'],
      weaknesses: ['Advanced preprocessor macros'],
      recommendedAction: 'Apply C concurrency primitives and POSIX thread pools in a system daemon project.'
    },
    {
      id: 'asmt_ps_01',
      skillName: 'Problem Solving',
      score: 76,
      totalQuestions: 5,
      correctAnswers: 4,
      level: 'Developing',
      completedAt: '2026-10-20',
      strengths: ['Two-pointer array navigation', 'Sliding window windowing'],
      weaknesses: ['Dynamic programming state formulation for multidimensional optimization'],
      recommendedAction: 'Practice interval scheduling and grid dynamic programming on LeetCode / Codeforces.'
    }
  ]
};
