/**
 * Header Component
 * Displays brand identity, core insight tagline, live Evidence Score badge,
 * and quick demo controls (Reset Demo, Clean State, AI Key Settings).
 */

import { icon } from '../utils/icons.js';
import { calculateSkillEvidenceScore } from '../services/scoreCalculator.js';
import { CAREER_FRAMEWORK } from '../data/careerFramework.js';

export class Header {
  constructor(store, onNavigate) {
    this.store = store;
    this.onNavigate = onNavigate;
    this.element = document.createElement('header');
    this.element.className = 'w-full bg-white border-b border-slate-200 sticky top-0 z-40';
  }

  render(profile) {
    const targetCareer = profile.career?.targetRole || 'Software Developer';
    const framework = CAREER_FRAMEWORK[targetCareer];
    const scoreData = calculateSkillEvidenceScore(profile, framework);

    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Brand & Tagline -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
              ${icon('sparkles', 'text-white')}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-extrabold tracking-tight text-slate-900">SkillBridge</span>
                <span class="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
                  MVP 2026
                </span>
              </div>
              <p class="text-xs text-slate-500 hidden sm:block font-medium">
                "Don't just list what you know. Show what you can do."
              </p>
            </div>
          </div>

          <!-- Live Score & Demo Controls -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Target Career Pill -->
            <div class="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 border border-slate-200">
              <span class="text-slate-400 font-normal">Track:</span>
              <span>${targetCareer}</span>
            </div>

            <!-- Skill Evidence Score Pill -->
            <div id="btn-header-score" class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg text-xs font-bold text-emerald-800 border border-emerald-200 shadow-sm cursor-pointer hover:bg-emerald-100 transition-colors" title="Click to view detailed Placement Readiness Report">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Evidence Score:</span>
              <span class="text-sm font-extrabold text-emerald-900">${scoreData.totalScore}<span class="text-xs font-medium text-emerald-700">/100</span></span>
            </div>

            <!-- Demo Reset Button -->
            <button id="btn-reset-demo" class="btn-secondary text-xs py-1.5 px-2.5 sm:px-3 flex items-center gap-1.5" title="Reset to Arya's Demo Portfolio">
              ${icon('refresh-cw', 'w-3.5 h-3.5 text-slate-500')}
              <span class="hidden sm:inline">Reset Demo</span>
            </button>

            <!-- AI Settings -->
            <button id="btn-open-settings" class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" title="AI Settings / Gemini API Key">
              ${icon('settings')}
            </button>

          </div>

        </div>
      </div>
    `;

    // Attach listeners
    this.element.querySelector('#btn-reset-demo').addEventListener('click', () => {
      if (confirm('Reset application back to Arya\'s complete demo portfolio?')) {
        this.store.resetToDemoData();
        window.showToast?.('Restored realistic demo profile for Arya Sharma!');
      }
    });

    this.element.querySelector('#btn-header-score').addEventListener('click', () => {
      this.onNavigate('report');
    });

    this.element.querySelector('#btn-open-settings').addEventListener('click', () => {
      window.openSettingsModal?.();
    });

    return this.element;
  }
}
