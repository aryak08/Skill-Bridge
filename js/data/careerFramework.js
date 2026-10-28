/**
 * Career Skill Framework
 * Controlled internal benchmark dataset mapping career pathways to essential practical competencies.
 */

export const CAREER_FRAMEWORK = {
  'Software Developer': {
    title: 'Software Developer',
    description: 'Builds reliable, scalable software applications and services using modern programming paradigms, data structures, and system fundamentals.',
    icon: 'code',
    coreSkills: [
      {
        name: 'Data Structures & Algorithms',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        description: 'Time/space complexity analysis, arrays, linked lists, trees, graphs, sorting, and algorithmic design patterns.'
      },
      {
        name: 'Programming',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['C Programming', 'C++', 'Java', 'Python', 'Go'],
        description: 'Core syntax, object-oriented concepts, memory management, and clean code principles.'
      },
      {
        name: 'Problem Solving',
        priority: 'High',
        weight: 15,
        targetProficiency: 'Intermediate',
        description: 'Breaking down complex ambiguous specifications into testable modular solutions.'
      },
      {
        name: 'Git/GitHub',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        aliases: ['Git', 'GitHub', 'Version Control'],
        description: 'Branching workflows, pull requests, merge conflict resolution, and collaborative code review.'
      },
      {
        name: 'Databases',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        aliases: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'],
        description: 'Relational data modeling, indexing, ACID transactions, and query optimization.'
      },
      {
        name: 'Web Fundamentals',
        priority: 'Medium',
        weight: 10,
        targetProficiency: 'Intermediate',
        aliases: ['HTML/CSS', 'JavaScript', 'HTTP/REST', 'Web fundamentals'],
        description: 'Client-server architecture, RESTful API design, DOM manipulation, and responsive web principles.'
      }
    ]
  },

  'Data Analyst': {
    title: 'Data Analyst',
    description: 'Extracts actionable business intelligence, constructs automated analytical pipelines, and visualizes quantitative trends.',
    icon: 'bar-chart-2',
    coreSkills: [
      {
        name: 'Python',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        aliases: ['Python 3', 'Pandas', 'NumPy'],
        description: 'Data wrangling, scripting, exploratory data analysis with Pandas and NumPy.'
      },
      {
        name: 'SQL',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        aliases: ['SQL', 'Databases', 'PostgreSQL'],
        description: 'Complex aggregations, window functions, CTEs, and relational database queries.'
      },
      {
        name: 'Statistics',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        description: 'Hypothesis testing, distributions, regression analysis, and confidence intervals.'
      },
      {
        name: 'Data Visualization',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        aliases: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn'],
        description: 'Dashboard creation, executive storytelling, and visual communication of metrics.'
      },
      {
        name: 'Excel/Spreadsheets',
        priority: 'Medium',
        weight: 10,
        targetProficiency: 'Intermediate',
        aliases: ['Excel', 'Google Sheets'],
        description: 'Pivot tables, VLOOKUP/XLOOKUP, and rapid modeling.'
      },
      {
        name: 'Problem Solving',
        priority: 'Medium',
        weight: 5,
        targetProficiency: 'Intermediate',
        description: 'Translating business objectives into measurable quantitative inquiries.'
      }
    ]
  },

  'AI/ML Engineer': {
    title: 'AI/ML Engineer',
    description: 'Designs, trains, and operationalizes machine learning architectures, statistical models, and intelligent agent systems.',
    icon: 'cpu',
    coreSkills: [
      {
        name: 'Python',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Advanced',
        aliases: ['Python', 'PyTorch', 'TensorFlow'],
        description: 'Scientific computing, vectorization, and deep learning framework implementation.'
      },
      {
        name: 'Mathematics',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['Linear Algebra', 'Calculus', 'Probability'],
        description: 'Matrix calculus, optimization algorithms, and gradient descent mechanics.'
      },
      {
        name: 'Machine Learning',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['ML', 'Supervised Learning', 'Scikit-learn'],
        description: 'Feature engineering, model evaluation, cross-validation, and bias-variance tradeoff.'
      },
      {
        name: 'Data Processing',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        aliases: ['Data Pipelines', 'ETL', 'Pandas'],
        description: 'Data cleaning, normalization, embedding generation, and handling sparse datasets.'
      },
      {
        name: 'Statistics',
        priority: 'Medium',
        weight: 10,
        targetProficiency: 'Intermediate',
        description: 'Bayesian probability, sampling theory, and statistical significance testing.'
      },
      {
        name: 'Problem Solving',
        priority: 'Medium',
        weight: 10,
        targetProficiency: 'Intermediate',
        description: 'Diagnosing model failure modes and formulating mathematical hypotheses.'
      }
    ]
  },

  'Cybersecurity': {
    title: 'Cybersecurity Analyst',
    description: 'Secures organizational digital assets, conducts threat audits, implements network defenses, and monitors anomalous behaviors.',
    icon: 'shield',
    coreSkills: [
      {
        name: 'Networking',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        aliases: ['Computer Networks', 'TCP/IP', 'DNS'],
        description: 'OSI model, packet analysis (Wireshark), firewall configurations, and routing protocols.'
      },
      {
        name: 'Linux',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['Linux Administration', 'Bash', 'Shell Scripting'],
        description: 'Permissions, process monitoring, system logs, and command line automation.'
      },
      {
        name: 'Security Fundamentals',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['Information Security', 'Cryptography', 'OWASP'],
        description: 'Authentication, public key cryptography, vulnerability assessment, and threat vectors.'
      },
      {
        name: 'Problem Solving',
        priority: 'Medium',
        weight: 20,
        targetProficiency: 'Intermediate',
        description: 'Forensic event reconstruction, triage, and rapid incident response.'
      },
      {
        name: 'Programming',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Beginner',
        aliases: ['Python', 'C', 'Bash'],
        description: 'Scripting exploit proofs-of-concept and automated log parsing.'
      }
    ]
  },

  'Game Developer': {
    title: 'Game Developer',
    description: 'Architects real-time interactive game worlds, gameplay mechanics, graphics rendering pipelines, and physics interactions.',
    icon: 'gamepad-2',
    coreSkills: [
      {
        name: 'Programming',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        aliases: ['C++', 'C#', 'C Programming'],
        description: 'Memory layout, performance profiling, object lifecycle, and real-time execution.'
      },
      {
        name: 'Game Engines',
        priority: 'High',
        weight: 25,
        targetProficiency: 'Intermediate',
        aliases: ['Unity', 'Unreal Engine', 'Godot'],
        description: 'Scene graphs, asset pipelines, component-entity architectures, and lighting.'
      },
      {
        name: 'Mathematics',
        priority: 'High',
        weight: 20,
        targetProficiency: 'Intermediate',
        aliases: ['Linear Algebra', '3D Math', 'Physics'],
        description: 'Vectors, quaternions, collision matrices, coordinate transformations, and raycasting.'
      },
      {
        name: 'Problem Solving',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        description: 'Optimizing frame rates, debugging physics glitches, and concurrency control.'
      },
      {
        name: 'Game Development Concepts',
        priority: 'Medium',
        weight: 15,
        targetProficiency: 'Intermediate',
        description: 'Game state management, animation state machines, input buffering, and audio synthesis.'
      }
    ]
  }
};
