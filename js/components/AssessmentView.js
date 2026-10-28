/**
 * Core Feature 2: AI Skill Assessment + Skill Gap Analysis Component
 * 
 * Features:
 * 1. Career Framework Selection (5 career tracks)
 * 2. Prominent "Analyze My Skill Profile" AI CTA with loading & retry states
 * 3. Career Readiness Snapshot: Strengths, Priority Gaps, "Why?" Narrative
 * 4. Personalized 3-Priority Roadmap
 * 5. Interactive 5-Question Skill Assessment Interface with instant scoring & live evidence upgrade!
 */

import { icon } from '../utils/icons.js';
import { CAREER_FRAMEWORK } from '../data/careerFramework.js';
import { aiService } from '../services/aiService.js';
import { getAvailableAssessmentSkills, getQuestionsForSkill } from '../data/questionBank.js';

export class AssessmentView {
  constructor(store, onNavigate) {
    this.store = store;
    this.onNavigate = onNavigate;
    this.element = document.createElement('div');
    this.element.className = 'w-full';

    this.isAnalyzing = false;
    this.analysisError = null;

    // Active Assessment State
    this.activeAssessment = null; // { skillName, questions, currentIndex, answers, isSubmitted, result }
  }

  render(profile) {
    const targetCareer = profile.career?.targetRole || 'Software Developer';
    const framework = CAREER_FRAMEWORK[targetCareer] || CAREER_FRAMEWORK['Software Developer'];
    const aiAnalysis = profile.lastAiAnalysis;

    this.element.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- SECTION 1: CAREER TRACK BENCHMARK SELECTOR -->
        <div class="sb-card p-6 sm:p-8 bg-white">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  ${icon('target')}
                </span>
                <h2 class="text-xl font-extrabold text-slate-900">Career Skill Framework Benchmark</h2>
              </div>
              <p class="text-xs text-slate-500 mt-1 max-w-xl">
                Compare your portfolio evidence against rigorous industry placement requirements across 5 specialized career pathways.
              </p>
            </div>

            <!-- Career Track Dropdown -->
            <div class="flex items-center gap-2">
              <label for="select-career-track" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Track:</label>
              <select id="select-career-track" class="text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                ${Object.keys(CAREER_FRAMEWORK).map(trackKey => `
                  <option value="${trackKey}" ${trackKey === targetCareer ? 'selected' : ''}>
                    ${trackKey}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Selected Career Benchmarks Grid -->
          <div class="pt-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Competencies Required for ${framework.title}
              </span>
              <span class="text-xs text-indigo-600 font-semibold">
                ${framework.coreSkills.length} Verified Competencies
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${framework.coreSkills.map(cs => {
                const studentSkill = (profile.skills || []).find(s => 
                  s.name.toLowerCase() === cs.name.toLowerCase() || 
                  (cs.aliases && cs.aliases.some(a => a.toLowerCase() === s.name.toLowerCase()))
                );

                const hasEvidence = studentSkill && studentSkill.evidenceType !== 'SELF-REPORTED';
                const isAssessed = studentSkill && studentSkill.evidenceType === 'ASSESSED';

                return `
                  <div class="p-3.5 rounded-xl border ${hasEvidence ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50'} flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between gap-1 mb-1">
                        <span class="text-xs font-bold text-slate-900">${cs.name}</span>
                        <span class="text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${cs.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'}">
                          ${cs.priority} Priority
                        </span>
                      </div>
                      <p class="text-[0.72rem] text-slate-500 leading-snug line-clamp-2">
                        ${cs.description}
                      </p>
                    </div>

                    <div class="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[0.7rem]">
                      <span class="text-slate-400 font-medium">Target: ${cs.targetProficiency}</span>
                      ${studentSkill ? `
                        <span class="font-bold ${isAssessed ? 'text-emerald-700' : (hasEvidence ? 'text-sky-700' : 'text-slate-500')}">
                          ${studentSkill.evidenceType === 'ASSESSED' ? `Assessed (${studentSkill.assessmentScore}%)` : studentSkill.evidenceType}
                        </span>
                      ` : `
                        <span class="font-bold text-rose-600">Missing Gap</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- SECTION 2: PROMINENT AI ANALYSIS CTA -->
        <div class="sb-card p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                ${icon('sparkles', 'w-3.5 h-3.5 text-indigo-400')}
                AI Competency Graph Engine
              </div>
              <h2 class="text-2xl font-extrabold tracking-tight text-white">
                AI Skill Assessment & Gap Analysis
              </h2>
              <p class="text-xs sm:text-sm text-indigo-200 mt-1.5 max-w-2xl leading-relaxed">
                Click below to trigger our AI analysis. The engine compares your verifiable portfolio evidence against ${targetCareer} hiring standards, detects priority gaps, and crafts a bespoke action roadmap.
              </p>
            </div>

            <button id="btn-analyze-profile" class="btn-primary text-sm font-extrabold py-3.5 px-7 rounded-xl flex-shrink-0 shadow-lg shadow-indigo-600/40 border border-indigo-400/30 ${this.isAnalyzing ? 'opacity-80 cursor-wait' : ''}">
              ${this.isAnalyzing ? `
                <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Evaluating Competency Graph...</span>
              ` : `
                ${icon('sparkles')}
                <span>Analyze My Skill Profile</span>
              `}
            </button>
          </div>

          <!-- Background ambient glow -->
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <!-- SECTION 3: AI ANALYSIS RESULTS (SNAPSHOT & ROADMAP) -->
        ${this.isAnalyzing ? `
          <div class="sb-card p-12 text-center bg-white ai-pulse-glow">
            <div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              ${icon('sparkles', 'w-8 h-8')}
            </div>
            <h3 class="text-lg font-bold text-slate-900">Synthesizing Practical Portfolio Signals...</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Cross-referencing verified assessment scores, GitHub project implementations, and ${targetCareer} prerequisites.
            </p>
          </div>
        ` : (aiAnalysis ? this.renderAiAnalysisResults(aiAnalysis, profile) : `
          <!-- Empty State: Encouraging student to click Analyze -->
          <div class="sb-card p-10 text-center bg-white">
            <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              ${icon('sparkles')}
            </div>
            <h3 class="text-base font-bold text-slate-800">Ready to Discover Your Placement Priorities?</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Click the "Analyze My Skill Profile" button above to evaluate your practical capabilities and receive your personalized Next 3 Priorities.
            </p>
          </div>
        `)}

        <!-- SECTION 4: INTERACTIVE 5-QUESTION SKILL ASSESSMENT MODULE -->
        <div id="assessment-test-section" class="sb-card p-6 sm:p-8 bg-white">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  ${icon('shield-check')}
                </span>
                <h2 class="text-xl font-extrabold text-slate-900">SkillBridge Interactive Skill Assessment</h2>
              </div>
              <p class="text-xs text-slate-500 mt-1 max-w-xl">
                Take a focused 5-question benchmark testing complexity, architectural choices, and problem-solving reasoning to convert a skill into <span class="font-bold text-emerald-700">ASSESSED</span> evidence.
              </p>
            </div>

            <!-- Choose skill to assess -->
            <div class="flex items-center gap-2">
              <label for="select-skill-test" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill:</label>
              <select id="select-skill-test" class="text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500">
                ${getAvailableAssessmentSkills().map(skillName => `
                  <option value="${skillName}">${skillName}</option>
                `).join('')}
              </select>
              <button id="btn-start-assessment-ui" class="btn-primary text-xs py-2 px-3.5">
                Start Test
              </button>
            </div>
          </div>

          <!-- Dynamic Assessment View (Active Quiz or Intro) -->
          <div id="assessment-interactive-container" class="pt-6">
            ${this.activeAssessment ? this.renderActiveQuiz() : this.renderAssessmentIntro(profile)}
          </div>
        </div>

      </div>
    `;

    this.attachEventListeners(profile);
    return this.element;
  }

  renderAiAnalysisResults(analysis, profile) {
    const strengths = analysis.strengths || [];
    const priorityGaps = analysis.priorityGaps || [];
    const roadmap = analysis.roadmap || [];

    return `
      <div class="space-y-6">
        
        <!-- Snapshot Header Card -->
        <div class="sb-card p-6 sm:p-8 bg-white border-indigo-200 shadow-sm">
          <div class="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Career Readiness Snapshot</span>
                <span class="text-[0.65rem] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-200">
                  Target: ${analysis.targetCareer}
                </span>
              </div>
              <h3 class="text-xl font-extrabold text-slate-900 mt-1">AI Competency Evaluation</h3>
            </div>
            
            <span class="text-[0.7rem] text-slate-400 font-medium">
              Generated ${new Date(analysis.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <!-- The "Why?" Tailored Narrative -->
          <div class="my-5 p-4 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <span class="text-[0.7rem] font-extrabold uppercase tracking-wider text-indigo-700 block mb-1">
              Personalized AI Evaluation
            </span>
            <p class="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
              "${analysis.whyNarrative}"
            </p>
          </div>

          <!-- Strengths vs Priority Gaps Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <!-- Validated Strengths -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                ${icon('check-circle', 'text-emerald-600 w-4 h-4')}
                <h4 class="text-sm font-extrabold text-slate-900">Demonstrated Strengths</h4>
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ${strengths.length} Verified
                </span>
              </div>

              <div class="space-y-2">
                ${strengths.length === 0 ? `
                  <p class="text-xs text-slate-400">No verified evidence found yet. Complete a test or add a project.</p>
                ` : strengths.map(st => `
                  <div class="p-3 rounded-lg border border-emerald-100 bg-emerald-50/40 text-xs">
                    <div class="flex items-center justify-between font-bold text-emerald-950">
                      <span>${st.skillName}</span>
                      <span class="text-[0.68rem] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold">
                        ${st.evidenceType}
                      </span>
                    </div>
                    <p class="text-slate-600 text-[0.72rem] mt-1 leading-snug">
                      ${st.evidenceReason}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Priority Gaps -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                ${icon('alert-triangle', 'text-amber-500 w-4 h-4')}
                <h4 class="text-sm font-extrabold text-slate-900">Highest Priority Gaps</h4>
                <span class="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                  Action Required
                </span>
              </div>

              <div class="space-y-2">
                ${priorityGaps.length === 0 ? `
                  <p class="text-xs text-slate-400">All core benchmarks met for this pathway!</p>
                ` : priorityGaps.map(gap => `
                  <div class="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs">
                    <div class="flex items-center justify-between font-bold text-slate-900">
                      <span class="text-slate-900">${gap.skillName}</span>
                      <button data-take-assessment="${gap.skillName}" class="text-[0.68rem] font-bold text-indigo-700 hover:text-indigo-900 underline">
                        Assess Now →
                      </button>
                    </div>
                    <p class="text-slate-600 text-[0.72rem] mt-1 leading-snug">
                      <span class="font-semibold text-slate-700">Reason:</span> ${gap.reason}
                    </p>
                    <p class="text-indigo-700 font-semibold text-[0.72rem] mt-1">
                      → ${gap.action}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION: PERSONALIZED SKILL ROADMAP (NEXT 3 PRIORITIES) -->
        <div class="sb-card p-6 sm:p-8 bg-white border-slate-200">
          <div class="pb-4 border-b border-slate-100">
            <span class="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Action Plan</span>
            <h3 class="text-xl font-extrabold text-slate-900 mt-0.5">Your Next 3 Priorities</h3>
            <p class="text-xs text-slate-500 mt-1">
              Targeted, high-yield steps to systematically close evidence gaps for ${analysis.targetCareer}.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            ${roadmap.map(item => `
              <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between sb-card-hover">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-2xl font-black text-indigo-600 font-mono">${item.step}</span>
                    <span class="text-[0.7rem] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      ${item.skill}
                    </span>
                  </div>

                  <h4 class="text-sm font-extrabold text-slate-900 leading-snug">${item.title}</h4>
                  
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                    ${item.action}
                  </p>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-200/80">
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">Why this priority:</span>
                  <p class="text-[0.72rem] text-slate-600 leading-snug">
                    ${item.why}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  renderAssessmentIntro(profile) {
    const assessments = profile.assessments || [];

    return `
      <div class="space-y-6">
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center max-w-2xl mx-auto">
          <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            ${icon('shield-check', 'w-6 h-6')}
          </div>
          <h3 class="text-base font-extrabold text-slate-900">Select a Skill & Prove Your Capability</h3>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">
            Each assessment presents 5 rigorously curated questions evaluating your conceptual depth, time complexity tradeoffs, and design decisions. Submitting immediately scores your response and updates your portfolio with <span class="font-bold text-emerald-700">ASSESSED</span> evidence.
          </p>

          <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button data-quick-assess="Data Structures & Algorithms" class="btn-primary text-xs py-2 px-3">
              Assess DSA (5 Qs)
            </button>
            <button data-quick-assess="Python" class="btn-secondary text-xs py-2 px-3">
              Assess Python (5 Qs)
            </button>
            <button data-quick-assess="Problem Solving" class="btn-secondary text-xs py-2 px-3">
              Assess Problem Solving (5 Qs)
            </button>
          </div>
        </div>

        <!-- History of completed assessments -->
        ${assessments.length > 0 ? `
          <div class="pt-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recently Completed Assessments</h4>
            <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              ${assessments.map(a => `
                <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${a.score >= 70 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'} font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      ${a.score}%
                    </div>
                    <div>
                      <h5 class="text-sm font-bold text-slate-900">${a.skillName}</h5>
                      <p class="text-xs text-slate-500">${a.level} Level · Completed ${a.completedAt} · ${a.correctAnswers}/${a.totalQuestions} Correct</p>
                    </div>
                  </div>
                  <span class="badge-evidence badge-assessed self-start sm:self-center">
                    ${icon('shield-check', 'w-3 h-3 text-emerald-600')}
                    ASSESSED
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderActiveQuiz() {
    const qState = this.activeAssessment;
    const currentQ = qState.questions[qState.currentIndex];
    const total = qState.questions.length;
    const progressPercent = Math.round(((qState.currentIndex + 1) / total) * 100);

    // If assessment result is already computed, show result view
    if (qState.isSubmitted && qState.result) {
      return this.renderAssessmentResult(qState.result);
    }

    const selectedOption = qState.answers[qState.currentIndex];

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        
        <!-- Header & Progress bar -->
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span class="flex items-center gap-1.5 text-indigo-700">
              ${icon('sparkles', 'w-3.5 h-3.5')}
              Assessing ${qState.skillName}
            </span>
            <span>Question ${qState.currentIndex + 1} of ${total}</span>
          </div>

          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div class="bg-indigo-600 h-2 transition-all duration-300 rounded-full" style="width: ${progressPercent}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50/50">
          <span class="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            ${currentQ.topic || 'Concept Evaluation'}
          </span>
          <h3 class="text-base font-extrabold text-slate-900 leading-relaxed">
            ${currentQ.question}
          </h3>

          <!-- Options List -->
          <div class="mt-5 space-y-2.5">
            ${currentQ.options.map((optText, optIdx) => `
              <label class="flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${selectedOption === optIdx ? 'bg-indigo-50/80 border-indigo-400 ring-1 ring-indigo-400' : 'bg-white border-slate-200 hover:border-slate-300'}">
                <input type="radio" name="quiz-option" value="${optIdx}" ${selectedOption === optIdx ? 'checked' : ''} class="mt-1 text-indigo-600 focus:ring-indigo-500">
                <span class="text-xs sm:text-sm font-medium text-slate-800 leading-snug">${optText}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between pt-2">
          <button id="btn-quiz-prev" class="btn-secondary text-xs py-2 px-4" ${qState.currentIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed"' : ''}>
            ← Previous
          </button>

          <button id="btn-quiz-cancel" class="text-xs text-slate-400 hover:text-slate-600">
            Cancel Assessment
          </button>

          ${qState.currentIndex === total - 1 ? `
            <button id="btn-quiz-submit" class="btn-primary text-xs py-2 px-5 bg-emerald-600 hover:bg-emerald-700">
              ${icon('check-circle', 'w-4 h-4')}
              Submit & Grade
            </button>
          ` : `
            <button id="btn-quiz-next" class="btn-primary text-xs py-2 px-5">
              Next Question →
            </button>
          `}
        </div>

      </div>
    `;
  }

  renderAssessmentResult(res) {
    const isPassing = res.score >= 70;

    return `
      <div class="max-w-2xl mx-auto space-y-6 animate-scaleUp">
        
        <!-- Score Card Header -->
        <div class="p-8 rounded-3xl ${isPassing ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-200' : 'bg-gradient-to-b from-amber-50 to-white border-amber-200'} border text-center">
          <div class="w-16 h-16 rounded-2xl ${isPassing ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} font-black text-2xl flex items-center justify-center mx-auto mb-3">
            ${res.score}%
          </div>

          <h3 class="text-2xl font-extrabold text-slate-900">${res.skillName} Assessment Complete</h3>
          
          <div class="flex items-center justify-center gap-2 mt-2">
            <span class="badge-evidence badge-assessed">
              ${icon('shield-check', 'w-3.5 h-3.5 text-emerald-600')}
              Evidence Upgraded: Assessed
            </span>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Level: ${res.level}
            </span>
          </div>

          <p class="text-xs text-slate-600 mt-3 max-w-md mx-auto">
            ${res.correctAnswers} out of ${res.totalQuestions} questions answered correctly. Your placement portfolio has been updated in real-time.
          </p>
        </div>

        <!-- Detailed Feedback -->
        <div class="sb-card p-6 bg-white space-y-4">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Demonstrated Strengths</h4>
            <div class="flex flex-wrap gap-1.5">
              ${res.strengths.map(s => `
                <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ✓ ${s}
                </span>
              `).join('')}
            </div>
          </div>

          ${res.weaknesses && res.weaknesses.length > 0 ? `
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Areas for Deepening</h4>
              <div class="flex flex-wrap gap-1.5">
                ${res.weaknesses.map(w => `
                  <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    • ${w}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <span class="text-[0.68rem] font-extrabold uppercase tracking-wider text-indigo-700 block mb-0.5">
              Recommended Next Action
            </span>
            <p class="text-xs text-indigo-950 font-medium">
              ${res.recommendedAction}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button id="btn-result-view-report" class="btn-primary text-xs py-2.5 px-4">
            View Updated Placement Report →
          </button>
          
          <button id="btn-result-done" class="btn-secondary text-xs py-2.5 px-4">
            Done (Back to Benchmarks)
          </button>
        </div>

      </div>
    `;
  }

  startAssessment(skillName) {
    const questions = getQuestionsForSkill(skillName);
    this.activeAssessment = {
      skillName,
      questions,
      currentIndex: 0,
      answers: {},
      isSubmitted: false,
      result: null
    };

    // Re-render
    const profile = this.store.getProfile();
    this.render(profile);

    // Scroll to test section
    setTimeout(() => {
      this.element.querySelector('#assessment-test-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  gradeAssessment() {
    const qState = this.activeAssessment;
    let correct = 0;
    const strengths = [];
    const weaknesses = [];

    qState.questions.forEach((q, idx) => {
      const userChoice = qState.answers[idx];
      if (userChoice === q.correctIndex) {
        correct++;
        strengths.push(q.topic);
      } else {
        weaknesses.push(q.topic);
      }
    });

    const score = Math.round((correct / qState.questions.length) * 100);
    let level = 'Foundational';
    if (score >= 80) level = 'Proficient';
    else if (score >= 60) level = 'Developing';

    const result = {
      id: 'asmt_' + Date.now(),
      skillName: qState.skillName,
      score,
      totalQuestions: qState.questions.length,
      correctAnswers: correct,
      level,
      completedAt: new Date().toISOString().split('T')[0],
      strengths: strengths.length > 0 ? strengths : ['Core terminology comprehension'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['Edge case time complexity'],
      recommendedAction: score >= 80 
        ? `Implement an advanced ${qState.skillName} project or take an interview simulation.`
        : `Review complexity tradeoffs and practice 5 problem exercises in ${qState.skillName}.`
    };

    qState.isSubmitted = true;
    qState.result = result;

    // LIVE STATE UPGRADE!
    this.store.upgradeSkillEvidence(qState.skillName, result);
    window.showToast?.(`Assessment completed! ${qState.skillName} upgraded to ASSESSED (${score}%).`);

    const profile = this.store.getProfile();
    this.render(profile);
  }

  attachEventListeners(profile) {
    // Track selector change
    this.element.querySelector('#select-career-track')?.addEventListener('change', (e) => {
      const newRole = e.target.value;
      this.store.updateCareer({ targetRole: newRole });
      window.showToast?.(`Target pathway updated to ${newRole}`);
    });

    // "Analyze My Skill Profile" CTA
    this.element.querySelector('#btn-analyze-profile')?.addEventListener('click', async () => {
      if (this.isAnalyzing) return;
      this.isAnalyzing = true;
      this.render(this.store.getProfile());

      try {
        const analysis = await aiService.analyzeProfile(this.store.getProfile());
        this.store.setAiAnalysis(analysis);
        window.showToast?.('AI Skill Gap Analysis complete!');
      } catch (err) {
        console.error('AI Analysis failed:', err);
        window.showToast?.('Analysis failed, please try again.');
      } finally {
        this.isAnalyzing = false;
        this.render(this.store.getProfile());
      }
    });

    // Start assessment UI button
    this.element.querySelector('#btn-start-assessment-ui')?.addEventListener('click', () => {
      const skill = this.element.querySelector('#select-skill-test')?.value || 'Data Structures & Algorithms';
      this.startAssessment(skill);
    });

    // Quick assess buttons
    this.element.querySelectorAll('[data-quick-assess]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skill = e.currentTarget.getAttribute('data-quick-assess');
        this.startAssessment(skill);
      });
    });

    // Inline gap assess buttons
    this.element.querySelectorAll('[data-take-assessment]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skill = e.currentTarget.getAttribute('data-take-assessment');
        this.startAssessment(skill);
      });
    });

    // Active Quiz interactions
    if (this.activeAssessment && !this.activeAssessment.isSubmitted) {
      // Radio choice change
      this.element.querySelectorAll('input[name="quiz-option"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          const val = parseInt(e.target.value, 10);
          this.activeAssessment.answers[this.activeAssessment.currentIndex] = val;
        });
      });

      // Next
      this.element.querySelector('#btn-quiz-next')?.addEventListener('click', () => {
        this.activeAssessment.currentIndex++;
        this.render(this.store.getProfile());
      });

      // Prev
      this.element.querySelector('#btn-quiz-prev')?.addEventListener('click', () => {
        if (this.activeAssessment.currentIndex > 0) {
          this.activeAssessment.currentIndex--;
          this.render(this.store.getProfile());
        }
      });

      // Cancel
      this.element.querySelector('#btn-quiz-cancel')?.addEventListener('click', () => {
        if (confirm('Cancel active assessment? Progress will not be saved.')) {
          this.activeAssessment = null;
          this.render(this.store.getProfile());
        }
      });

      // Submit
      this.element.querySelector('#btn-quiz-submit')?.addEventListener('click', () => {
        this.gradeAssessment();
      });
    }

    // Results interactions
    if (this.activeAssessment && this.activeAssessment.isSubmitted) {
      this.element.querySelector('#btn-result-view-report')?.addEventListener('click', () => {
        this.activeAssessment = null;
        this.onNavigate('report');
      });

      this.element.querySelector('#btn-result-done')?.addEventListener('click', () => {
        this.activeAssessment = null;
        this.render(this.store.getProfile());
      });
    }
  }
}
