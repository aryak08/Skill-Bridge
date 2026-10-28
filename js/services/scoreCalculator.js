/**
 * Skill Evidence Score Calculator
 * 
 * IMPORTANT RESPONSIBLE DESIGN DISCLAIMER:
 * This score is strictly an internal profile metric that quantifies the depth and
 * verifiability of evidence provided in the student's portfolio.
 * It is NOT an employability prediction, hiring guarantee, or scientific metric.
 */

export function calculateSkillEvidenceScore(profile, targetCareerFramework) {
  if (!profile) {
    return {
      totalScore: 0,
      breakdown: { assessments: 0, projects: 0, achievements: 0 },
      maxPoints: { assessments: 50, projects: 30, achievements: 20 },
      evidenceCoverage: { assessedCount: 0, projectBackedCount: 0, selfReportedCount: 0, totalSkills: 0 }
    };
  }

  // 1. Evidence Type Coverage
  const skills = profile.skills || [];
  let assessedCount = 0;
  let projectBackedCount = 0;
  let selfReportedCount = 0;

  skills.forEach(skill => {
    if (skill.evidenceType === 'ASSESSED') assessedCount++;
    else if (skill.evidenceType === 'PROJECT-BACKED') projectBackedCount++;
    else selfReportedCount++;
  });

  // 2. Assessments Component (50 Points Max)
  // Evaluates performance and breadth across target competencies
  const assessments = profile.assessments || [];
  let assessmentPoints = 0;

  if (assessments.length > 0) {
    const avgScore = assessments.reduce((sum, a) => sum + (a.score || 0), 0) / assessments.length;
    // Coverage multiplier: taking at least 2-3 assessments reaches full multiplier
    const coverageMultiplier = Math.min(1.0, assessments.length / 2.5);
    assessmentPoints = Math.round((avgScore / 100) * 50 * coverageMultiplier);
    // Cap at 50
    assessmentPoints = Math.min(50, Math.max(0, assessmentPoints));
  }

  // 3. Projects Component (30 Points Max)
  // Evaluates practical execution, repository links, and demonstrated competencies
  const projects = profile.projects || [];
  let projectPoints = 0;

  projects.forEach(p => {
    let pScore = 0;
    if (p.title && p.title.length > 5) pScore += 4;
    if (p.description && p.description.length > 30) pScore += 4;
    if (p.skillsDemonstrated && p.skillsDemonstrated.length > 0) pScore += 4;
    if (p.githubUrl || p.liveUrl) pScore += 3;
    projectPoints += Math.min(15, pScore);
  });
  projectPoints = Math.min(30, projectPoints);

  // 4. Achievements & Certifications Component (20 Points Max)
  const achievements = profile.achievements || [];
  let achievementPoints = 0;

  achievements.forEach(a => {
    let aScore = 0;
    if (a.title) aScore += 5;
    if (a.issuer) aScore += 3;
    if (a.description) aScore += 2;
    achievementPoints += Math.min(10, aScore);
  });
  achievementPoints = Math.min(20, achievementPoints);

  const totalScore = assessmentPoints + projectPoints + achievementPoints;

  return {
    totalScore,
    breakdown: {
      assessments: assessmentPoints,
      projects: projectPoints,
      achievements: achievementPoints
    },
    maxPoints: {
      assessments: 50,
      projects: 30,
      achievements: 20
    },
    percentages: {
      assessments: Math.round((assessmentPoints / 50) * 100),
      projects: Math.round((projectPoints / 30) * 100),
      achievements: Math.round((achievementPoints / 20) * 100)
    },
    evidenceCoverage: {
      assessedCount,
      projectBackedCount,
      selfReportedCount,
      totalSkills: skills.length
    },
    disclaimer: 'Skill Evidence Score is an internal profile metric summarizing the verifiable evidence in your portfolio. It is not an employment prediction or guarantee.'
  };
}
