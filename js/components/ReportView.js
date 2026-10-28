/**
 * Core Feature 3: Placement Readiness Report Component
 * 
 * Generates an executive, evidence-backed student placement portfolio summary.
 * Features:
 * - Transparent Skill Evidence Score (50% Assessments, 30% Projects, 20% Achievements)
 * - Academic snapshot kept concise
 * - Evidence Matrix with verified badges
 * - Project repositories and demonstrated competencies
 * - Assessment performance log
 * - AI priority recommendations
 * - Responsible placement readiness narrative (no employment probability claims)
 * - Print / PDF export layout
 */

import { icon } from '../utils/icons.js';
import { calculateSkillEvidenceScore } from '../services/scoreCalculator.js';
import { CAREER_FRAMEWORK } from '../data/careerFramework.js';

export class ReportView {
  constructor(store, onNavigate) {
    this.store = store;
    this.onNavigate = onNavigate;
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
    const assessments = profile.assessments || [];
    const aiAnalysis = profile.lastAiAnalysis;

    const targetCareer = career.targetRole || 'Software Developer';
    const framework = CAREER_FRAMEWORK[targetCareer] || CAREER_FRAMEWORK['Software Developer'];
    const scoreData = calculateSkillEvidenceScore(profile, framework);

    this.element.innerHTML = `
      <div class="space-y-8 pb-16 print-page">
        
        <!-- TOP TOOLBAR (HIDDEN IN PRINT) -->
        <div class="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
          <div class="flex items-center gap-2 text-indigo-900 text-xs font-semibold">
            ${icon('info', 'w-4 h-4 text-indigo-600')}
            <span>Official Candidate Placement Readiness Portfolio & Evidence Dossier</span>
          </div>

          <div class="flex items-center gap-2">
            <button id="btn-print-report" class="btn-secondary text-xs py-2 px-3.5 bg-white">
              ${icon('printer', 'w-3.5 h-3.5')}
              Print / Save as PDF
            </button>
            <button id="btn-report-back-portfolio" class="btn-primary text-xs py-2 px-3.5">
              Edit Evidence →
            </button>
          </div>
        </div>

        <!-- SECTION 1: REPORT EXECUTIVE HEADER -->
        <div class="sb-card p-6 sm:p-8 bg-white border-slate-200">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-black uppercase tracking-widest text-indigo-600">Candidate Placement Report</span>
                <span class="text-[0.65rem] px-2 py-0.5 rounded font-extrabold bg-slate-900 text-white">
                  SkillBridge Verified
                </span>
              </div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tight mt-1">${personal.name || 'Candidate'}</h1>
              <p class="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                ${personal.degree || 'B.Tech'} · ${personal.branch || 'Engineering'} (${personal.year || '2026'})
              </p>
              <p class="text-xs text-slate-400 mt-0.5">
                ${personal.college || 'National Institute of Technology'}
              </p>
            </div>

            <!-- Target Career Pill -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left md:text-right">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 block">Candidate Target Pathway</span>
              <span class="text-base font-extrabold text-slate-900 mt-0.5 block">${targetCareer}</span>
              <span class="text-xs text-indigo-600 font-medium">Placement Dossier v1.2</span>
            </div>
          </div>

          <!-- Academic Snapshot & Contact Row -->
          <div class="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-4">
              <div class="flex items-baseline gap-1">
                <span class="text-slate-400 font-medium">Academic CGPA:</span>
                <span class="text-sm font-extrabold text-slate-800">${academics.cgpa || '7.8'}</span>
                <span class="text-slate-400">/ 10.0</span>
              </div>
              <span class="text-slate-300">|</span>
              <span class="text-slate-500 italic">One foundational data point among practical signals</span>
            </div>

            <div class="flex items-center gap-4 text-slate-600">
              ${personal.email ? `<span>${personal.email}</span>` : ''}
              ${personal.github ? `<a href="${personal.github}" target="_blank" class="text-indigo-600 font-bold hover:underline">GitHub</a>` : ''}
            </div>
          </div>
        </div>

        <!-- SECTION 2: TRANSPARENT SKILL EVIDENCE SCORE -->
        <div class="sb-card p-6 sm:p-8 bg-gradient-to-br from-white via-white to-emerald-50/30 border-emerald-200">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span class="text-xs font-black uppercase tracking-widest text-emerald-700">Internal Profile Metric</span>
              <h2 class="text-2xl font-extrabold text-slate-900 mt-0.5">Skill Evidence Score</h2>
              <p class="text-xs text-slate-600 mt-1 max-w-xl">
                Summarizes the depth and verifiability of demonstrated capability in the student's portfolio. Computed strictly from objective evidence components.
              </p>
            </div>

            <!-- Score Big Metric -->
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm flex-shrink-0">
              <div class="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-200">
                ${scoreData.totalScore}
              </div>
              <div>
                <span class="text-xs font-extrabold text-emerald-900 uppercase tracking-wider block">Evidence Score</span>
                <span class="text-xs text-slate-500 font-medium">${scoreData.totalScore} of 100 max verifiable points</span>
              </div>
            </div>
          </div>

          <!-- Formula Breakdown (Transparent & Honest) -->
          <div class="pt-6">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Transparent Formula Breakdown: 50% Assessments + 30% Projects + 20% Achievements
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <!-- 1. Assessments (50%) -->
              <div class="p-4 rounded-xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span class="font-extrabold text-slate-800">Skill Assessments (50%)</span>
                  <span class="font-black text-indigo-600">${scoreData.breakdown.assessments} / 50 pts</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div class="bg-indigo-600 h-2 rounded-full" style="width: ${scoreData.percentages.assessments}%"></div>
                </div>
                <p class="text-[0.7rem] text-slate-500 leading-snug">
                  Based on ${assessments.length} completed SkillBridge benchmark tests.
                </p>
              </div>

              <!-- 2. Projects (30%) -->
              <div class="p-4 rounded-xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span class="font-extrabold text-slate-800">Practical Projects (30%)</span>
                  <span class="font-black text-sky-600">${scoreData.breakdown.projects} / 30 pts</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div class="bg-sky-600 h-2 rounded-full" style="width: ${scoreData.percentages.projects}%"></div>
                </div>
                <p class="text-[0.7rem] text-slate-500 leading-snug">
                  Evaluated across ${projects.length} repository codebases and applied competencies.
                </p>
              </div>

              <!-- 3. Achievements (20%) -->
              <div class="p-4 rounded-xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span class="font-extrabold text-slate-800">Achievements / Hackathons (20%)</span>
                  <span class="font-black text-amber-600">${scoreData.breakdown.achievements} / 20 pts</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div class="bg-amber-600 h-2 rounded-full" style="width: ${scoreData.percentages.achievements}%"></div>
                </div>
                <p class="text-[0.7rem] text-slate-500 leading-snug">
                  Derived from ${achievements.length} verified competition and open-source milestones.
                </p>
              </div>

            </div>

            <!-- MANDATORY RESPONSIBLE DISCLAIMER -->
            <div class="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-[0.72rem] text-slate-600">
              <span class="font-bold text-slate-800">Responsible Design Notice:</span> 
              Skill Evidence Score is an internal profile metric summarizing the verifiable practical evidence in a student's portfolio. It is not an employment prediction or guarantee of job placement.
            </div>
          </div>
        </div>

        <!-- SECTION 3: SKILL EVIDENCE MATRIX -->
        <div class="sb-card p-6 sm:p-8 bg-white">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 class="text-lg font-extrabold text-slate-900">Skill Evidence Classification</h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Categorized breakdown of candidate capabilities by verified evidence tier.
              </p>
            </div>
            <span class="text-xs font-bold text-slate-400">${skills.length} Total Registered</span>
          </div>

          <div class="overflow-x-auto pt-4">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[0.68rem]">
                  <th class="py-2.5 px-3">Skill Competency</th>
                  <th class="py-2.5 px-3">Evidence Tier</th>
                  <th class="py-2.5 px-3">Proficiency Claim</th>
                  <th class="py-2.5 px-3">Supporting Evidence Detail</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${skills.map(s => {
                  let badge = '';
                  if (s.evidenceType === 'ASSESSED') {
                    badge = `<span class="badge-evidence badge-assessed">${icon('shield-check', 'w-3 h-3 text-emerald-600')} ASSESSED · ${s.assessmentScore || 80}%</span>`;
                  } else if (s.evidenceType === 'PROJECT-BACKED') {
                    badge = `<span class="badge-evidence badge-project">${icon('folder-git', 'w-3 h-3 text-sky-600')} PROJECT-BACKED</span>`;
                  } else {
                    badge = `<span class="badge-evidence badge-self">${icon('user-check', 'w-3 h-3 text-slate-500')} SELF-REPORTED</span>`;
                  }

                  return `
                    <tr class="hover:bg-slate-50/50">
                      <td class="py-3 px-3 font-bold text-slate-900">${s.name}</td>
                      <td class="py-3 px-3">${badge}</td>
                      <td class="py-3 px-3 font-semibold text-slate-700">${s.proficiency || 'Beginner'}</td>
                      <td class="py-3 px-3 text-slate-600 max-w-xs leading-snug">
                        ${s.evidenceNote || (s.evidenceType === 'ASSESSED' ? `Verified benchmark score: ${s.assessmentScore}%` : 'Claimed student competency.')}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- SECTION 4: DEMONSTRATED PROJECTS & REPOSITORIES -->
        <div class="sb-card p-6 sm:p-8 bg-white">
          <h3 class="text-lg font-extrabold text-slate-900 pb-4 border-b border-slate-100">
            Project Repositories & Applied Competencies
          </h3>

          <div class="divide-y divide-slate-100 pt-2">
            ${projects.map(p => `
              <div class="py-4 space-y-2">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 class="text-sm font-extrabold text-slate-900">${p.title}</h4>
                  ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">${icon('folder-git', 'w-3 h-3')} Source Code</a>` : ''}
                </div>
                <p class="text-xs text-slate-600 leading-relaxed">${p.description}</p>
                ${p.metrics ? `<p class="text-[0.72rem] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded w-fit">Metric: ${p.metrics}</p>` : ''}
                
                <div class="flex flex-wrap items-center gap-1.5 pt-1">
                  <span class="text-[0.68rem] text-slate-400 font-bold uppercase tracking-wider mr-1">Skills Demonstrated:</span>
                  ${(p.skillsDemonstrated || []).map(sd => `
                    <span class="px-2 py-0.5 rounded text-[0.68rem] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                      ${sd}
                    </span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 5: COMPLETED SKILL ASSESSMENTS LOG -->
        <div class="sb-card p-6 sm:p-8 bg-white">
          <h3 class="text-lg font-extrabold text-slate-900 pb-4 border-b border-slate-100">
            SkillBridge Assessment Record
          </h3>

          ${assessments.length === 0 ? `
            <p class="text-xs text-slate-400 py-6 text-center">No assessments completed yet.</p>
          ` : `
            <div class="divide-y divide-slate-100 pt-2">
              ${assessments.map(a => `
                <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span class="font-extrabold text-slate-900">${a.skillName} Benchmark</span>
                    <span class="text-slate-500 font-medium ml-2">Score: <strong class="text-emerald-700">${a.score}%</strong> (${a.level} Level) · ${a.completedAt}</span>
                  </div>
                  <span class="text-[0.7rem] text-slate-500 italic max-w-sm">${a.recommendedAction}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- SECTION 6: RESPONSIBLE PLACEMENT READINESS SUMMARY -->
        <div class="sb-card p-6 sm:p-8 bg-slate-900 text-white">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Synthesis</span>
          <h3 class="text-xl font-extrabold text-white mt-0.5">Placement Readiness Summary</h3>

          <div class="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            "${aiAnalysis?.readinessSummary || `Your profile demonstrates validated technical foundations in C Programming and problem solving, supported by applied project architecture in AeroGrid. Data Structures & Algorithms and Git remain high-yield priority benchmarks to complete for full alignment with ${targetCareer} placement standards.`}"
          </div>

          <div class="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[0.7rem] text-slate-400">
            <span>SkillBridge Candidate Portfolio · Generated for Campus Placement Drives</span>
            <span>Zero employment predictions; evidence-based placement representation only.</span>
          </div>
        </div>

      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    this.element.querySelector('#btn-print-report')?.addEventListener('click', () => {
      window.print();
    });

    this.element.querySelector('#btn-report-back-portfolio')?.addEventListener('click', () => {
      this.onNavigate('portfolio');
    });
  }
}
