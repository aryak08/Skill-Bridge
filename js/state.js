/**
 * Reactive Central State Management
 * Handles persistent synchronization with LocalStorage, reactive observer subscribers,
 * profile CRUD mutations, and instant demo data restore.
 */

import { INITIAL_STUDENT_PROFILE } from './data/sampleData.js';

const STORAGE_KEY = 'skillbridge_student_profile_v1';

class Store {
  constructor() {
    this.subscribers = [];
    this.profile = this.loadInitialProfile();
  }

  loadInitialProfile() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personal && parsed.skills) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load profile from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_STUDENT_PROFILE));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    // Immediately invoke with current state
    callback(this.profile);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.profile);
      } catch (err) {
        console.error('Subscriber error:', err);
      }
    });
  }

  getProfile() {
    return this.profile;
  }

  // Personal Info Mutation
  updatePersonal(personalData) {
    this.profile.personal = { ...this.profile.personal, ...personalData };
    this.save();
  }

  // Career Goal Mutation
  updateCareer(careerData) {
    this.profile.career = { ...this.profile.career, ...careerData };
    this.save();
  }

  // Academic Info Mutation
  updateAcademics(academicData) {
    this.profile.academics = { ...this.profile.academics, ...academicData };
    this.save();
  }

  // Skill Management
  addSkill(skill) {
    if (!this.profile.skills) this.profile.skills = [];
    const newSkill = {
      id: 'sk_' + Date.now(),
      name: skill.name.trim(),
      category: skill.category || 'General',
      proficiency: skill.proficiency || 'Beginner',
      evidenceType: skill.evidenceType || 'SELF-REPORTED',
      assessmentScore: skill.assessmentScore || null,
      assessedAt: skill.assessedAt || null,
      evidenceNote: skill.evidenceNote || 'Self-reported capability.'
    };
    this.profile.skills.push(newSkill);
    this.save();
    return newSkill;
  }

  updateSkill(skillId, updatedData) {
    const idx = this.profile.skills.findIndex(s => s.id === skillId);
    if (idx !== -1) {
      this.profile.skills[idx] = { ...this.profile.skills[idx], ...updatedData };
      this.save();
    }
  }

  deleteSkill(skillId) {
    this.profile.skills = (this.profile.skills || []).filter(s => s.id !== skillId);
    this.save();
  }

  // Upgrade Skill Evidence after Assessment
  upgradeSkillEvidence(skillName, assessmentResult) {
    if (!this.profile.skills) this.profile.skills = [];
    const lower = skillName.toLowerCase();
    let skill = this.profile.skills.find(s => s.name.toLowerCase() === lower);

    if (skill) {
      skill.evidenceType = 'ASSESSED';
      skill.assessmentScore = assessmentResult.score;
      skill.assessedAt = new Date().toISOString().split('T')[0];
      skill.evidenceNote = `Verified via SkillBridge benchmark on ${skill.assessedAt} (${assessmentResult.score}% - ${assessmentResult.level}).`;
      if (assessmentResult.score >= 80) skill.proficiency = 'Advanced';
      else if (assessmentResult.score >= 60) skill.proficiency = 'Intermediate';
    } else {
      // Add new assessed skill
      this.profile.skills.push({
        id: 'sk_' + Date.now(),
        name: skillName,
        category: 'Assessed Competency',
        proficiency: assessmentResult.score >= 80 ? 'Advanced' : 'Intermediate',
        evidenceType: 'ASSESSED',
        assessmentScore: assessmentResult.score,
        assessedAt: new Date().toISOString().split('T')[0],
        evidenceNote: `Verified via SkillBridge benchmark (${assessmentResult.score}% - ${assessmentResult.level}).`
      });
    }

    // Add to assessments history
    if (!this.profile.assessments) this.profile.assessments = [];
    this.profile.assessments.unshift(assessmentResult);

    this.save();
  }

  // Project Management
  addProject(project) {
    if (!this.profile.projects) this.profile.projects = [];
    const newProject = {
      id: 'proj_' + Date.now(),
      title: project.title.trim(),
      description: project.description.trim(),
      technologies: Array.isArray(project.technologies) 
        ? project.technologies 
        : project.technologies.split(',').map(t => t.trim()).filter(Boolean),
      skillsDemonstrated: Array.isArray(project.skillsDemonstrated)
        ? project.skillsDemonstrated
        : project.skillsDemonstrated.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      metrics: project.metrics || ''
    };
    this.profile.projects.push(newProject);

    // Automatically upgrade matching self-reported skills to PROJECT-BACKED!
    newProject.skillsDemonstrated.forEach(demonstratedSkillName => {
      const match = this.profile.skills.find(
        s => s.name.toLowerCase() === demonstratedSkillName.toLowerCase() && s.evidenceType === 'SELF-REPORTED'
      );
      if (match) {
        match.evidenceType = 'PROJECT-BACKED';
        match.linkedProjectIds = [newProject.id];
        match.evidenceNote = `Backed by practical implementation in project "${newProject.title}".`;
      }
    });

    this.save();
    return newProject;
  }

  deleteProject(projectId) {
    this.profile.projects = (this.profile.projects || []).filter(p => p.id !== projectId);
    this.save();
  }

  // Achievement Management
  addAchievement(ach) {
    if (!this.profile.achievements) this.profile.achievements = [];
    const newAch = {
      id: 'ach_' + Date.now(),
      title: ach.title.trim(),
      issuer: ach.issuer?.trim() || 'Organization',
      date: ach.date || new Date().toISOString().split('T')[0],
      type: ach.type || 'Certification',
      description: ach.description?.trim() || ''
    };
    this.profile.achievements.push(newAch);
    this.save();
    return newAch;
  }

  deleteAchievement(achId) {
    this.profile.achievements = (this.profile.achievements || []).filter(a => a.id !== achId);
    this.save();
  }

  // Set AI Analysis Result
  setAiAnalysis(analysis) {
    this.profile.lastAiAnalysis = analysis;
    this.save();
  }

  // Reset to Default Demo Profile
  resetToDemoData() {
    this.profile = JSON.parse(JSON.stringify(INITIAL_STUDENT_PROFILE));
    this.save();
  }

  // Clear All Data for fresh test
  clearAllData() {
    this.profile = {
      id: 'student_' + Date.now(),
      personal: {
        name: 'New Student',
        college: 'University Institute of Technology',
        degree: 'B.Tech',
        branch: 'Computer Science',
        year: '1st Year',
        avatarInitials: 'NS',
        email: '',
        github: '',
        linkedin: ''
      },
      career: {
        targetRole: 'Software Developer',
        interests: []
      },
      academics: {
        cgpa: 7.0,
        maxCgpa: 10.0,
        academicRemark: ''
      },
      skills: [],
      projects: [],
      achievements: [],
      assessments: []
    };
    this.save();
  }
}

export const store = new Store();
