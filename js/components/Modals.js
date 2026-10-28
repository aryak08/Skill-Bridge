/**
 * Interactive Modals System
 * Provides validated dialogs for Profile Editing, Skills, Projects, Achievements, and AI Settings.
 */

import { icon } from '../utils/icons.js';
import { CAREER_FRAMEWORK } from '../data/careerFramework.js';
import { aiService } from '../services/aiService.js';

export class ModalManager {
  constructor(store) {
    this.store = store;
    this.container = document.createElement('div');
    this.container.id = 'modal-container';
    document.body.appendChild(this.container);

    this.registerGlobalHelpers();
  }

  registerGlobalHelpers() {
    window.openEditProfileModal = () => this.showEditProfileModal();
    window.openAddSkillModal = () => this.showAddSkillModal();
    window.openAddProjectModal = () => this.showAddProjectModal();
    window.openAddAchievementModal = () => this.showAddAchievementModal();
    window.openSettingsModal = () => this.showSettingsModal();
  }

  close() {
    this.container.innerHTML = '';
  }

  renderModal(title, bodyHtml, onSubmit) {
    this.container.innerHTML = `
      <div class="modal-overlay" id="active-modal-overlay">
        <div class="modal-content p-6 sm:p-8" id="active-modal-content">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <h3 class="text-lg font-extrabold text-slate-900">${title}</h3>
            <button id="btn-modal-close" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
              ${icon('x', 'w-5 h-5')}
            </button>
          </div>

          <form id="modal-form" class="space-y-4">
            ${bodyHtml}
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
              <button type="button" id="btn-modal-cancel" class="btn-secondary text-xs py-2 px-4">
                Cancel
              </button>
              <button type="submit" class="btn-primary text-xs py-2 px-5">
                Save & Update
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const overlay = this.container.querySelector('#active-modal-overlay');
    const content = this.container.querySelector('#active-modal-content');
    const form = this.container.querySelector('#modal-form');

    // Close listeners
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });
    this.container.querySelector('#btn-modal-close').addEventListener('click', () => this.close());
    this.container.querySelector('#btn-modal-cancel').addEventListener('click', () => this.close());

    // ESC key close
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        this.close();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);

    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
      this.close();
    });
  }

  showEditProfileModal() {
    const profile = this.store.getProfile();
    const p = profile.personal || {};
    const c = profile.career || {};
    const a = profile.academics || {};

    const bodyHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Full Name *</label>
          <input type="text" name="name" value="${p.name || ''}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">College / Institution *</label>
          <input type="text" name="college" value="${p.college || ''}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Degree Program *</label>
          <input type="text" name="degree" value="${p.degree || ''}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Branch / Major *</label>
          <input type="text" name="branch" value="${p.branch || ''}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Current Academic Year *</label>
          <input type="text" name="year" value="${p.year || ''}" required placeholder="e.g. 2nd Year" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">CGPA (Out of 10.0) *</label>
          <input type="number" step="0.01" min="0" max="10" name="cgpa" value="${a.cgpa || 7.8}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>
      </div>

      <div class="text-xs pt-2">
        <label class="block font-bold text-slate-700 mb-1">Target Career Pathway *</label>
        <select name="targetRole" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
          ${Object.keys(CAREER_FRAMEWORK).map(role => `
            <option value="${role}" ${c.targetRole === role ? 'selected' : ''}>${role}</option>
          `).join('')}
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Email</label>
          <input type="email" name="email" value="${p.email || ''}" placeholder="student@university.edu" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">GitHub Profile URL</label>
          <input type="url" name="github" value="${p.github || ''}" placeholder="https://github.com/..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
        </div>
      </div>
    `;

    this.renderModal('Edit Student Profile', bodyHtml, (data) => {
      this.store.updatePersonal({
        name: data.name,
        college: data.college,
        degree: data.degree,
        branch: data.branch,
        year: data.year,
        email: data.email,
        github: data.github
      });
      this.store.updateAcademics({
        cgpa: parseFloat(data.cgpa) || 7.5
      });
      this.store.updateCareer({
        targetRole: data.targetRole
      });
      window.showToast?.('Profile updated successfully.');
    });
  }

  showAddSkillModal() {
    const bodyHtml = `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Skill Name *</label>
          <input type="text" name="name" placeholder="e.g. Data Structures & Algorithms, Docker, SQL" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Category</label>
            <input type="text" name="category" placeholder="e.g. Core Systems, Backend, Tools" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Self-Reported Proficiency</label>
            <select name="proficiency" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate" selected>Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Evidence Type *</label>
          <select name="evidenceType" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold">
            <option value="SELF-REPORTED">SELF-REPORTED (Claimed without test/repo)</option>
            <option value="PROJECT-BACKED">PROJECT-BACKED (Demonstrated in repository)</option>
            <option value="ASSESSED">ASSESSED (Verified through SkillBridge test)</option>
          </select>
          <span class="text-[0.68rem] text-slate-400 mt-1 block">Tip: Taking a 5-question test automatically upgrades a skill to ASSESSED.</span>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Evidence Context Note</label>
          <textarea name="evidenceNote" rows="2" placeholder="Brief note explaining how you apply or learned this skill..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"></textarea>
        </div>
      </div>
    `;

    this.renderModal('Add Skill to Portfolio', bodyHtml, (data) => {
      this.store.addSkill({
        name: data.name,
        category: data.category || 'General',
        proficiency: data.proficiency,
        evidenceType: data.evidenceType,
        evidenceNote: data.evidenceNote
      });
      window.showToast?.(`Skill "${data.name}" added to portfolio.`);
    });
  }

  showAddProjectModal() {
    const bodyHtml = `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Project Title *</label>
          <input type="text" name="title" placeholder="e.g. Real-Time Distributed Task Queue" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Description *</label>
          <textarea name="description" rows="3" required placeholder="Describe what the system does, architectural decisions, and key challenges solved..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Technologies (comma-separated) *</label>
            <input type="text" name="technologies" placeholder="e.g. Python, Redis, FastAPI, Docker" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Skills Demonstrated (comma-separated) *</label>
            <input type="text" name="skillsDemonstrated" placeholder="e.g. Python, Problem Solving, System Design" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">GitHub Repository Link</label>
            <input type="url" name="githubUrl" placeholder="https://github.com/..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Live Demo Link (optional)</label>
            <input type="url" name="liveUrl" placeholder="https://..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Demonstrated Metric / Impact (optional)</label>
          <input type="text" name="metrics" placeholder="e.g. Processed 10,000 tasks/min with sub-50ms latency" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
        </div>
      </div>
    `;

    this.renderModal('Add Practical Project Repository', bodyHtml, (data) => {
      this.store.addProject(data);
      window.showToast?.(`Project "${data.title}" added and skills linked.`);
    });
  }

  showAddAchievementModal() {
    const bodyHtml = `
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Achievement / Award Title *</label>
          <input type="text" name="title" placeholder="e.g. ICPC Regional Qualifier, AWS Certified Cloud Practitioner" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Issuing Organization / Event *</label>
            <input type="text" name="issuer" placeholder="e.g. AICTE, ACM, Google Cloud" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Date Achieved</label>
            <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg">
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Brief Description</label>
          <textarea name="description" rows="2" placeholder="Describe selection criteria, ranking, or competencies validated..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"></textarea>
        </div>
      </div>
    `;

    this.renderModal('Add Achievement / Certification', bodyHtml, (data) => {
      this.store.addAchievement(data);
      window.showToast?.('Achievement added to portfolio.');
    });
  }

  showSettingsModal() {
    const currentKey = aiService.getApiKey();

    const bodyHtml = `
      <div class="space-y-4 text-xs">
        <div class="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 leading-relaxed">
          <span class="font-bold block mb-1">Dual-Mode AI Engine Architecture:</span>
          SkillBridge includes a high-precision deterministic graph analysis engine that operates 100% reliably out of the box with zero setup. You may optionally supply a Google Gemini API key to run live LLM synthesis.
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Gemini API Key (Optional)</label>
          <input type="password" name="apiKey" value="${currentKey}" placeholder="AIzaSy..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono">
          <span class="text-[0.68rem] text-slate-400 mt-1 block">Key is stored strictly in your browser's LocalStorage and never transmitted elsewhere.</span>
        </div>

        <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <span class="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider block mb-1">Current Active Mode:</span>
          <span class="text-xs font-bold ${currentKey ? 'text-indigo-600' : 'text-emerald-700'}">
            ${currentKey ? 'Primary: Gemini 1.5 Flash Live API' : 'Primary: Intelligent Deterministic AI Graph Engine (100% Reliable)'}
          </span>
        </div>
      </div>
    `;

    this.renderModal('AI Configuration & Settings', bodyHtml, (data) => {
      aiService.setApiKey(data.apiKey || '');
      window.showToast?.(data.apiKey ? 'Gemini API key saved!' : 'Deterministic AI engine active.');
    });
  }
}
