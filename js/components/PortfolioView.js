/**
 * Core Feature 1: Evidence-Backed Student Portfolio Component
 * 
 * Visually elevates Skills + Projects + Practical Evidence over raw CGPA.
 * Provides full interactive management of Skills (with 3 Evidence Types),
 * Projects with demonstrated competencies, Achievements, and Profile details.
 */

import { icon } from '../utils/icons.js';
import { CAREER_FRAMEWORK } from '../data/careerFramework.js';

export class PortfolioView {
  constructor(store, onNavigate, onStartAssessment) {
    this.store = store;
    this.onNavigate = onNavigate;
    this.onStartAssessment = onStartAssessment;
    this.element = document.createElement('div');
    this.element.className = 'w-full';
  }

  render(profile) {
    const personal = profile.personal || {};
    const career = profile.career || {};
    const academics = profile.academics || {};
    const skills = profile.skills || [];
    const projects = profile.projects || [];
    const achievements = profile.achievements || [];

    // Separate skills by evidence type
    const assessedSkills = skills.filter(s => s.evidenceType === 'ASSESSED');
    const projectSkills = skills.filter(s => s.evidenceType === 'PROJECT-BACKED');
    const selfReportedSkills = skills.filter(s => s.evidenceType === 'SELF-REPORTED' || !s.evidenceType);

    this.element.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- SECTION 1: STUDENT OVERVIEW & HERO -->
        <div class="sb-card p-6 sm:p-8 bg-gradient-to-r from-white via-white to-indigo-50/40 relative overflow-hidden">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div class="flex items-start gap-4">
              <!-- Avatar -->
              <div class="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-100 flex-shrink-0">
                ${personal.avatarInitials || personal.name?.charAt(0) || 'S'}
              </div>
              
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">${personal.name || 'Student Name'}</h1>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                    ${personal.year || '2nd Year'}
                  </span>
                </div>
                
                <p class="text-sm text-slate-600 font-medium mt-1">
                  ${personal.degree || 'B.Tech'} · ${personal.branch || 'Engineering'}
                </p>
                <p class="text-xs text-slate-400 mt-0.5">
                  ${personal.college || 'University Institute'}
                </p>

                <!-- Target Role Badge -->
                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Pathway:</span>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-white">
                    ${icon('target', 'w-3.5 h-3.5 text-indigo-400')}
                    ${career.targetRole || 'Software Developer'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Balanced Academic Info Card (Consciously NOT hero metric) -->
            <div class="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div class="border-b sm:border-b-0 sm:border-r border-slate-200 pb-3 sm:pb-0 sm:pr-5">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500 block">Academic Metric</span>
                <div class="flex items-baseline gap-1 mt-0.5">
                  <span class="text-2xl font-extrabold text-slate-800">${academics.cgpa || '7.8'}</span>
                  <span class="text-xs text-slate-500 font-medium">/ ${academics.maxCgpa || '10.0'} CGPA</span>
                </div>
                <span class="text-[0.65rem] text-slate-500 mt-1 block">One foundational signal</span>
              </div>

              <div class="flex flex-col gap-2">
                <button id="btn-edit-profile" class="btn-secondary text-xs py-1.5 px-3">
                  ${icon('edit', 'w-3.5 h-3.5')}
                  Edit Profile
                </button>
                <button id="btn-hero-analyze" class="btn-primary text-xs py-1.5 px-3">
                  ${icon('sparkles', 'w-3.5 h-3.5')}
                  Analyze Profile
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 2: EVIDENCE TYPES EXPLAINER BANNER -->
        <div class="bg-indigo-950 text-indigo-100 rounded-2xl p-5 shadow-sm border border-indigo-900">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Core Product Innovation</span>
              <h2 class="text-base font-bold text-white mt-0.5">Evidence-Backed Skill Representation</h2>
              <p class="text-xs text-indigo-200 max-w-2xl mt-1">
                Rather than accepting unverified resume claims or relying solely on CGPA, SkillBridge authenticates competencies across three verifiable evidence tiers.
              </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-shrink-0">
              <div class="flex items-center gap-2 bg-indigo-900/60 px-3 py-2 rounded-lg border border-indigo-800">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <div>
                  <span class="text-[0.7rem] font-extrabold text-white block">ASSESSED</span>
                  <span class="text-[0.65rem] text-indigo-300">Verified Test Score</span>
                </div>
              </div>
              <div class="flex items-center gap-2 bg-indigo-900/60 px-3 py-2 rounded-lg border border-indigo-800">
                <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                <div>
                  <span class="text-[0.7rem] font-extrabold text-white block">PROJECT-BACKED</span>
                  <span class="text-[0.65rem] text-indigo-300">Code Proof in Repo</span>
                </div>
              </div>
              <div class="flex items-center gap-2 bg-indigo-900/60 px-3 py-2 rounded-lg border border-indigo-800">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <div>
                  <span class="text-[0.7rem] font-extrabold text-white block">SELF-REPORTED</span>
                  <span class="text-[0.65rem] text-indigo-300">Unverified Claim</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: SKILLS PORTFOLIO MATRIX -->
        <div class="sb-card p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-extrabold text-slate-900">Student Skill Matrix</h2>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  ${skills.length} Competencies
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">
                Every skill is tied to its highest verifiable tier of evidence.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <button id="btn-add-skill" class="btn-primary text-xs py-2 px-3.5">
                ${icon('plus', 'w-3.5 h-3.5')}
                Add Skill
              </button>
            </div>
          </div>

          <!-- Empty State Check -->
          ${skills.length === 0 ? `
            <div class="text-center py-12">
              <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                ${icon('code')}
              </div>
              <h3 class="text-sm font-bold text-slate-800">No skills added yet</h3>
              <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click "Add Skill" or "Reset Demo" in the top bar to populate realistic sample data.</p>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              ${skills.map(skill => this.renderSkillCard(skill)).join('')}
            </div>
          `}
        </div>

        <!-- SECTION 4: PROJECTS SHOWCASE (PRACTICAL PROOF) -->
        <div class="sb-card p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-extrabold text-slate-900">Practical Projects & Proof of Execution</h2>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  ${projects.length} Verified Repositories
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">
                Applied repositories demonstrating practical architectural and coding capabilities.
              </p>
            </div>

            <button id="btn-add-project" class="btn-secondary text-xs py-2 px-3.5">
              ${icon('plus', 'w-3.5 h-3.5')}
              Add Project
            </button>
          </div>

          <!-- Projects List -->
          ${projects.length === 0 ? `
            <div class="text-center py-12">
              <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                ${icon('folder-git')}
              </div>
              <h3 class="text-sm font-bold text-slate-800">No projects added yet</h3>
              <p class="text-xs text-slate-500 mt-1">Add a project to upgrade your self-reported skills to Project-Backed evidence.</p>
            </div>
          ` : `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
              ${projects.map(proj => this.renderProjectCard(proj)).join('')}
            </div>
          `}
        </div>

        <!-- SECTION 5: ACHIEVEMENTS & CERTIFICATIONS -->
        <div class="sb-card p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-extrabold text-slate-900">Achievements, Hackathons & Validations</h2>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  ${achievements.length} Milestones
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">
                External competitive validation contributing 20% to your Skill Evidence Score.
              </p>
            </div>

            <button id="btn-add-achievement" class="btn-secondary text-xs py-2 px-3.5">
              ${icon('plus', 'w-3.5 h-3.5')}
              Add Achievement
            </button>
          </div>

          <!-- Achievements List -->
          ${achievements.length === 0 ? `
            <div class="text-center py-10 text-xs text-slate-400">
              No external achievements added yet.
            </div>
          ` : `
            <div class="divide-y divide-slate-100 pt-2">
              ${achievements.map(ach => `
                <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <div class="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0 mt-0.5">
                      ${icon('award')}
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">${ach.title}</h4>
                      <p class="text-xs text-slate-500 mt-0.5 font-medium">${ach.issuer} · <span class="text-slate-400">${ach.date}</span></p>
                      ${ach.description ? `<p class="text-xs text-slate-600 mt-1 max-w-xl">${ach.description}</p>` : ''}
                    </div>
                  </div>
                  <button data-delete-ach="${ach.id}" class="text-xs text-slate-400 hover:text-rose-600 p-1.5 self-end sm:self-center transition-colors" title="Delete achievement">
                    ${icon('trash-2', 'w-4 h-4')}
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  renderSkillCard(skill) {
    const isAssessed = skill.evidenceType === 'ASSESSED';
    const isProject = skill.evidenceType === 'PROJECT-BACKED';
    const isSelf = !isAssessed && !isProject;

    let badgeHtml = '';
    if (isAssessed) {
      badgeHtml = `
        <span class="badge-evidence badge-assessed" title="Validated through SkillBridge 5-question benchmark test">
          ${icon('shield-check', 'w-3 h-3 text-emerald-600')}
          Assessed · ${skill.assessmentScore || 80}%
        </span>
      `;
    } else if (isProject) {
      badgeHtml = `
        <span class="badge-evidence badge-project" title="Demonstrated in applied repository code">
          ${icon('folder-git', 'w-3 h-3 text-sky-600')}
          Project-backed
        </span>
      `;
    } else {
      badgeHtml = `
        <span class="badge-evidence badge-self" title="Claimed by student; not yet verified by test or project">
          ${icon('user-check', 'w-3 h-3 text-slate-500')}
          Self-reported · ${skill.proficiency || 'Beginner'}
        </span>
      `;
    }

    return `
      <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between sb-card-hover">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wide">${skill.category || 'Competency'}</span>
            ${badgeHtml}
          </div>

          <h3 class="text-base font-bold text-slate-900">${skill.name}</h3>

          <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">
            ${skill.evidenceNote || (isAssessed ? `Verified benchmark score: ${skill.assessmentScore}%` : 'Claimed student competency.')}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          ${isSelf ? `
            <button data-take-assessment="${skill.name}" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
              ${icon('sparkles', 'w-3 h-3')}
              Prove with Test →
            </button>
          ` : `
            <span class="text-[0.7rem] font-semibold ${isAssessed ? 'text-emerald-700' : 'text-sky-700'} flex items-center gap-1">
              ${icon('check-circle', 'w-3 h-3')}
              Evidence Established
            </span>
          `}

          <div class="flex items-center gap-1">
            <button data-delete-skill="${skill.id}" class="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors" title="Delete skill">
              ${icon('trash-2', 'w-3.5 h-3.5')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderProjectCard(project) {
    const techTags = (project.technologies || []).map(t => `
      <span class="px-2 py-0.5 rounded text-[0.68rem] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        ${t}
      </span>
    `).join('');

    const demonstratedTags = (project.skillsDemonstrated || []).map(s => `
      <span class="px-2 py-0.5 rounded text-[0.68rem] font-bold bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
        ${icon('check-circle', 'w-2.5 h-2.5')}
        ${s}
      </span>
    `).join('');

    return `
      <div class="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between sb-card-hover">
        <div>
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-base font-extrabold text-slate-900 leading-snug">${project.title}</h3>
            <button data-delete-proj="${project.id}" class="text-slate-400 hover:text-rose-600 p-1 flex-shrink-0" title="Delete project">
              ${icon('trash-2', 'w-4 h-4')}
            </button>
          </div>

          <p class="text-xs text-slate-600 mt-2 leading-relaxed">
            ${project.description}
          </p>

          ${project.metrics ? `
            <div class="mt-3 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 text-[0.72rem] text-emerald-800 font-medium">
              <span class="font-bold">Demonstrated Metric:</span> ${project.metrics}
            </div>
          ` : ''}

          <!-- Tech stack -->
          <div class="mt-4">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Technologies</span>
            <div class="flex flex-wrap gap-1.5">
              ${techTags}
            </div>
          </div>

          <!-- Demonstrated Competencies (Evidence link) -->
          <div class="mt-3">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-sky-600 block mb-1.5">Skills Demonstrated (Evidence Backed)</span>
            <div class="flex flex-wrap gap-1.5">
              ${demonstratedTags}
            </div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noreferrer" class="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1">
                ${icon('folder-git', 'w-3.5 h-3.5')}
                GitHub Repo
              </a>
            ` : ''}
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noreferrer" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                ${icon('external-link', 'w-3.5 h-3.5')}
                Live Demo
              </a>
            ` : ''}
          </div>
          <span class="text-[0.68rem] font-semibold text-slate-400">Project Verified</span>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Top Hero Actions
    this.element.querySelector('#btn-hero-analyze')?.addEventListener('click', () => {
      this.onNavigate('assessment');
    });

    this.element.querySelector('#btn-edit-profile')?.addEventListener('click', () => {
      window.openEditProfileModal?.();
    });

    // Add Skill Modal
    this.element.querySelector('#btn-add-skill')?.addEventListener('click', () => {
      window.openAddSkillModal?.();
    });

    // Add Project Modal
    this.element.querySelector('#btn-add-project')?.addEventListener('click', () => {
      window.openAddProjectModal?.();
    });

    // Add Achievement Modal
    this.element.querySelector('#btn-add-achievement')?.addEventListener('click', () => {
      window.openAddAchievementModal?.();
    });

    // Fast inline assessment triggers
    this.element.querySelectorAll('[data-take-assessment]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skillName = e.currentTarget.getAttribute('data-take-assessment');
        this.onStartAssessment(skillName);
      });
    });

    // Delete handlers
    this.element.querySelectorAll('[data-delete-skill]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-delete-skill');
        if (confirm('Delete this skill from portfolio?')) {
          this.store.deleteSkill(id);
          window.showToast?.('Skill removed.');
        }
      });
    });

    this.element.querySelectorAll('[data-delete-proj]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-delete-proj');
        if (confirm('Delete this project?')) {
          this.store.deleteProject(id);
          window.showToast?.('Project removed.');
        }
      });
    });

    this.element.querySelectorAll('[data-delete-ach]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-delete-ach');
        if (confirm('Delete this achievement?')) {
          this.store.deleteAchievement(id);
          window.showToast?.('Achievement removed.');
        }
      });
    });
  }
}
