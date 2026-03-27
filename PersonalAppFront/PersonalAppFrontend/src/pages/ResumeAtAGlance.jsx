import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeAtAGlance.css';

const SIGN_URL_ENDPOINT = import.meta.env.VITE_SIGN_URL_ENDPOINT;

const contact = {
  name: 'Erik Mabes',
  location: 'Phoenix, AZ 85048',
  phone: '928-607-9156',
  email: 'erik.a.mabes@outlook.com',
  links: [
    { label: 'linkedin.com/in/erik-mabes-4b6133184', url: 'https://www.linkedin.com/in/erik-mabes-4b6133184/' },
    { label: 'github.com/emmabes', url: 'https://github.com/emmabes' },
    { label: 'erikmabes.com', url: 'https://erikmabes.com' },
  ],
};

const summary =
  'Python, Java, and AWS Software Engineer with hands-on production experience across the full ' +
  'software development lifecycle at Amazon-scale. Personally spearheaded an image inspection ' +
  'feature that reduced upload errors by 9% and saved ~$50M annually; collaborated on a listings ' +
  'error initiative saving ~$250M annually. Coded against 16+ AWS services via Infrastructure as ' +
  'Code in a high-availability, EC2-based microservices environment.';

const skills = [
  { label: 'Languages',          value: 'Java, Python, TypeScript, JavaScript, SQL, VBA' },
  { label: 'Frontend',           value: 'React, TypeScript, HTML/CSS' },
  { label: 'Backend',            value: 'Java, REST APIs, Microservices, Distributed Systems, Event-Driven Architecture, SQS' },
  { label: 'Cloud / AWS',        value: 'API Gateway, Lambda, EC2, DynamoDB, S3, IAM, Secrets Manager, CloudWatch, CodePipeline, CodeBuild, CodeCommit, KMS, Amplify, CloudFront, Glue, SQS' },
  { label: 'DevOps / CI/CD',     value: 'Git, Docker, CI/CD Pipelines, Infrastructure as Code (IaC), On-Call Operations' },
  { label: 'Testing',            value: 'JUnit, Postman, Test-Driven Development, Automated Testing, Performance Testing' },
  { label: 'Data / Analytics',   value: 'Python Scripting, Data Pipeline Design, Power Query, Excel, VBA Macros' },
  { label: 'Project Management', value: 'Agile, Scrum, Kanban, Lean Six Sigma' },
];

const jobs = [
  {
    id: 'tkm-director',
    company: 'TKM Restaurants, Inc.',
    role: 'Director of Operations',
    dates: 'Feb 2025 – Present',
    bullets: [
      'Built Python-based report consolidators, generators, payroll automators, and data mapping tools actively used in daily business operations',
      'Integrated with Silverware POS APIs, vendor APIs, and automated reporting systems to improve managerial and administrative workflows',
      'Developed a central KPI dashboard using Python data collection/processing, Excel, and Power Query',
      'Leading 63 employees including 4 managers; overseeing hiring, training, and operational strategy',
    ],
  },
  {
    id: 'tkm-pm',
    company: 'TKM Restaurants, Inc.',
    role: 'Project Manager',
    dates: 'Feb 2024 – Jan 2025',
    bullets: [
      'Revived a remodel stalled for 7+ months; compressed an 8-week projected shutdown to 3.5 weeks using Lean Six Sigma strategies',
      'Recouped approximately $360,000 in sales from the shortened closure; managed timelines, budgets, contractors, and compliance',
      'Personally executed plumbing, electrical, and IT networking tasks to eliminate blockers in a resource-constrained environment',
    ],
  },
  {
    id: 'amazon-sde',
    company: 'Amazon.com',
    role: 'Software Development Engineer I',
    dates: 'Oct 2022 – Dec 2023',
    bullets: [
      'Spearheaded an image URL inspection feature for 3rd-party seller bulk upload experience, reducing upload errors by 9% and saving approximately $50M in annual operational costs',
      'Collaborated on a team initiative that reduced listing error rates from 60%+ to 14%, contributing to approximately $250M in annual cost savings',
      'Contributed to a 61% reduction in seller report generation times through backend microservice improvements',
      'Owned full SDLC responsibilities: CI/CD pipeline management, on-call production incident response, code review, automated and performance testing',
      'Designed and implemented asynchronous system calls and revised data processing hierarchies across team-owned microservices',
      'Worked across team boundaries to unify 3rd-party seller and 1st-party vendor bulk upload pipelines into a shared Java backend system',
      'AWS services via IaC: API Gateway, Lambda, EC2, DynamoDB, S3, IAM, Secrets Manager, CloudWatch, CodePipeline, CodeBuild, CodeCommit, Polly, KMS, Amplify, CloudFront, Glue, SQS',
    ],
  },
  {
    id: 'amazon-ata',
    company: 'Amazon Technical Academy',
    role: 'SDE Training Program',
    dates: 'Feb 2022 – Oct 2022',
    bullets: [
      'Completed a 9-month, paid-leave internal SDE program with a 12% acceptance rate, 80% graduation rate, and fewer than 4% of graduates placed directly to SDE I',
      'Curriculum developed by Amazon Software Directors, Managers, and Principal Engineers; covered Java, AWS, microservices, CI/CD, Docker, Agile/Scrum, and test-driven development',
      'Achieved 99% overall program grade; led team to Top 3 of 44 teams in capstone web application project',
      'Directly promoted to SDE I, bypassing the standard Junior Developer / Apprenticeship track',
    ],
  },
  {
    id: 'amazon-pc',
    company: 'Amazon.com',
    role: 'Project Coordinator',
    dates: 'Feb 2021 – Feb 2022',
    bullets: [
      'Primary owner of the WFS Launch Tracker, a C-Suite data source synthesizing 32,000+ data points across 523 active launch sites in 2021',
      'Reduced Launch Tracker time demands by 42% through Python and VBA automation',
      'Reduced overall manual workflows by 62% by converting email-based reporting into an automated web dashboard',
    ],
  },
  {
    id: 'amazon-sa',
    company: 'Amazon.com',
    role: 'Staffing Ambassador',
    dates: 'Mar 2020 – Feb 2021',
    bullets: [
      'Self-assigned to an internal Optimization Team; reduced key report generation times from 1.5+ hours to under 10 minutes each',
      'Reduced team weekly hours from ~120 to under 60; automation saved $30,000 annually per field team and $210,000 annually after training additional teams',
      'Supported record launch of 13 sites in 4 months through process optimization and auditing',
    ],
  },
];

const projects = [
  {
    id: 'erikmabes-com',
    name: 'erikmabes.com — Personal Website',
    status: 'Live',
    stack: 'AWS, Python, React, TypeScript CDK',
    bullets: [
      'Rate-limited resume download backend (Python); browser-based games; interactive resume visualizer',
      'User authentication with RBAC via Cognito; fully deployed on AWS with active CI/CD pipelines',
    ],
  },
  {
    id: 'meal-planning',
    name: 'Mobile Application — Meal Planning & Household Management',
    status: 'In Development',
    stack: 'React Native, Node.js',
    bullets: [
      'Meal selection and planning, automated shopping list generation, inventory tracking, recipe database, cross-service price comparisons',
    ],
  },
  {
    id: 'tkm-tooling',
    name: 'TKM Operational Tooling',
    status: 'Production',
    stack: 'Python, Silverware POS API, Excel, VBA, Power Query',
    bullets: [
      'Production tools for report generation, payroll automation, and KPI tracking actively used by business operations team',
    ],
  },
];

const education = [
  {
    id: 'ua',
    school: 'University of Arizona',
    degree: 'B.S. Neuroscience & Cognitive Sciences',
    note: 'Neurobiology emphasis, Psychology minor',
    date: 'Dec 2017',
  },
  {
    id: 'ata',
    school: 'Amazon Technical Academy',
    degree: 'Internal SDE Program Certificate',
    note: '9-month program · 12% acceptance rate · 99% overall grade · Direct-to-SDE I placement',
    date: 'Oct 2022',
  },
  {
    id: 'ccc',
    school: 'Coconino Community College',
    degree: 'A.A.S. Applied Sciences of Pre-Health',
    note: 'Cum Laude',
    date: 'May 2014',
  },
];

function ResumeAtAGlance() {
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (downloading || !SIGN_URL_ENDPOINT) return;
    setDownloading(true);
    try {
      const res = await fetch(SIGN_URL_ENDPOINT);
      const { url } = await res.json();
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to get download URL. This endpoint is rate-limited.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="raag-root">
      <div className="raag-scanlines" />
      <button
        className="raag-nav-btn"
        onClick={() => navigate('/resume')}
        title="Interactive Resume"
      >
        Interactive
      </button>
      <div className="raag-container">

        {/* ── HEADER ── */}
        <header className="raag-header">
          <h1 className="raag-name">{contact.name}</h1>
          <p className="raag-contact-line">
            {contact.location}&nbsp;·&nbsp;{contact.phone}&nbsp;·&nbsp;{contact.email}
          </p>
          <div className="raag-links">
            {contact.links.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>
        </header>

        {/* ── SUMMARY ── */}
        <section className="raag-section">
          <h2 className="raag-section-title">Professional Summary</h2>
          <p className="raag-summary">{summary}</p>
        </section>

        {/* ── SKILLS ── */}
        <section className="raag-section">
          <h2 className="raag-section-title">Technical Skills</h2>
          <dl className="raag-skills">
            {skills.map(s => (
              <div className="raag-skill-row" key={s.label}>
                <dt className="raag-skill-label">{s.label}</dt>
                <dd className="raag-skill-value">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="raag-section">
          <h2 className="raag-section-title">Work Experience</h2>
          <div className="raag-jobs">
            {jobs.map(job => (
              <div className="raag-job" key={job.id}>
                <div className="raag-job-header">
                  <div className="raag-job-title-line">
                    <span className="raag-job-company">{job.company}</span>
                    <span className="raag-job-role">{job.role}</span>
                  </div>
                  <span className="raag-job-dates">{job.dates}</span>
                </div>
                <ul className="raag-bullets">
                  {job.bullets.map(b => <li key={b.slice(0, 30)}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="raag-section">
          <h2 className="raag-section-title">Projects</h2>
          <div className="raag-projects">
            {projects.map(p => (
              <div className="raag-project" key={p.id}>
                <div className="raag-project-header">
                  <span className="raag-project-name">{p.name}</span>
                  <span className="raag-project-status">({p.status})</span>
                </div>
                <div className="raag-project-stack">Stack: {p.stack}</div>
                <ul className="raag-bullets">
                  {p.bullets.map(b => <li key={b.slice(0, 30)}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="raag-section">
          <h2 className="raag-section-title">Education</h2>
          <div className="raag-edu-entries">
            {education.map(e => (
              <div className="raag-edu-entry" key={e.id}>
                <div>
                  <div className="raag-edu-school">{e.school}</div>
                  <div className="raag-edu-degree">{e.degree}</div>
                  <div className="raag-edu-note">{e.note}</div>
                </div>
                <div className="raag-edu-date">{e.date}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
      {/* ── FLOATING TOOLBAR ── */}
      <div className="raag-toolbar">
        <button
          className="raag-toolbar__btn"
          onClick={handleDownload}
          disabled={downloading}
          title="Download Resume"
        >
          {downloading ? '\u23F3' : '\u2913'}
        </button>
        <a
          className="raag-toolbar__btn"
          href="https://www.linkedin.com/in/erik-mabes-4b6133184/"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM2.2 6.5h2.6v7H2.2v-7ZM6.5 6.5h2.5v1c.5-.8 1.5-1.2 2.5-1.2 2.2 0 2.5 1.5 2.5 3.4v3.8h-2.6V10.3c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.2H6.5v-7Z" />
          </svg>
        </a>
        <a
          className="raag-toolbar__btn"
          href="https://github.com/emmabes"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 0 0-2.21 13.64c.35.06.48-.15.48-.34v-1.2c-1.96.43-2.37-.95-2.37-.95-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.73 1.08.73.63 1.07 1.65.76 2.05.58.06-.46.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.48 0-.77.27-1.4.73-1.89-.08-.18-.32-.9.07-1.87 0 0 .59-.19 1.94.72a6.76 6.76 0 0 1 3.54 0c1.35-.91 1.94-.72 1.94-.72.39.97.14 1.69.07 1.87.45.5.72 1.12.72 1.89 0 2.71-1.65 3.3-3.22 3.47.26.22.48.66.48 1.33v1.97c0 .19.13.41.48.34A7 7 0 0 0 8 1Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ResumeAtAGlance;
