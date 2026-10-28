/**
 * SkillBridge — Main Application Coordinator
 * Connects the 3 Core Features into a seamless, unified student placement workflow.
 */

import { store } from './state.js';
import { icon } from './utils/icons.js';
import { Header } from './components/Header.js';
import { PortfolioView } from './components/PortfolioView.js';
import { AssessmentView } from './components/AssessmentView.js';
import { ReportView } from './components/ReportView.js';
import { FutureScopeView } from './components/FutureScopeView.js';
import { ModalManager } from './components/Modals.js';

class App {
  constructor() {
    this.currentTab = 'portfolio';
    this.modalManager = new ModalManager(store);

    this.header = new Header(store, (tab) => this.navigateTo(tab));
    this.portfolioView = new PortfolioView(
      store, 
      (tab) => this.navigateTo(tab),
      (skillName) => this.startAssessmentForSkill(skillName)
    );
    this.assessmentView = new AssessmentView(store, (tab) => this.navigateTo(tab));
    this.reportView = new ReportView(store, (tab) => this.navigateTo(tab));
    this.futureScopeView = new FutureScopeView();

    this.setupToastSystem();
    this.mount();
  }

  setupToastSystem() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toast-root';
    document.body.appendChild(toastContainer);

    window.showToast = (message, duration = 3200) => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <span class="text-emerald-400">${icon('check-circle', 'w-4 h-4')}</span>
        <span>${message}</span>
      `;
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.2s ease';
        setTimeout(() => toast.remove(), 250);
      }, duration);
    };
  }

  startAssessmentForSkill(skillName) {
    this.navigateTo('assessment');
    setTimeout(() => {
      this.assessmentView.startAssessment(skillName);
    }, 50);
  }

  navigateTo(tabId) {
    this.currentTab = tabId;
    this.updateTabStyles();
    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mount() {
    const root = document.getElementById('app');
    if (!root) return;

    root.innerHTML = `
      <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        
        <!-- Header Container -->
        <div id="header-container"></div>

        <!-- Navigation Bar -->
        <div class="bg-white border-b border-slate-200 no-print sticky top-16 z-30 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto" aria-label="Main Navigation">
              
              <button data-nav-tab="portfolio" class="nav-tab active">
                ${icon('user-check', 'w-4 h-4')}
                <span>1. Evidence Portfolio</span>
              </button>

              <button data-nav-tab="assessment" class="nav-tab">
                ${icon('sparkles', 'w-4 h-4 text-indigo-600')}
                <span>2. AI Gap Analysis</span>
              </button>

              <button data-nav-tab="report" class="nav-tab">
                ${icon('bar-chart', 'w-4 h-4 text-emerald-600')}
                <span>3. Placement Report</span>
              </button>

              <button data-nav-tab="future" class="nav-tab text-slate-400">
                ${icon('target', 'w-4 h-4 text-slate-400')}
                <span>Future Scope</span>
              </button>

            </nav>
          </div>
        </div>

        <!-- Main View Area -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div id="view-container"></div>
        </main>

        <!-- Footer -->
        <footer class="no-print bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2 font-medium">
              <span class="font-bold text-slate-800">SkillBridge</span>
              <span>·</span>
              <span>PromptWars × KickToTech 2026 Hackathon MVP</span>
            </div>
            <p class="text-slate-400 italic">
              "Don't just list what you know. Show what you can do."
            </p>
          </div>
        </footer>

      </div>
    `;

    // Attach navigation clicks
    root.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = e.currentTarget.getAttribute('data-nav-tab');
        this.navigateTo(tabId);
      });
    });

    // Subscribe to central store to reactively re-render header and active view
    store.subscribe((profile) => {
      const headerContainer = document.getElementById('header-container');
      if (headerContainer) {
        headerContainer.innerHTML = '';
        headerContainer.appendChild(this.header.render(profile));
      }
      this.renderCurrentView();
    });
  }

  updateTabStyles() {
    document.querySelectorAll('[data-nav-tab]').forEach(btn => {
      const tab = btn.getAttribute('data-nav-tab');
      if (tab === this.currentTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  renderCurrentView() {
    const container = document.getElementById('view-container');
    if (!container) return;
    container.innerHTML = '';

    const profile = store.getProfile();

    if (this.currentTab === 'portfolio') {
      container.appendChild(this.portfolioView.render(profile));
    } else if (this.currentTab === 'assessment') {
      container.appendChild(this.assessmentView.render(profile));
    } else if (this.currentTab === 'report') {
      container.appendChild(this.reportView.render(profile));
    } else if (this.currentTab === 'future') {
      container.appendChild(this.futureScopeView.render());
    }
  }
}

// Bootstrap when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.skillbridgeApp = new App();
});
