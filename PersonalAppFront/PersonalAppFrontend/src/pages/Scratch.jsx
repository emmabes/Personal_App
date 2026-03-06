import React from 'react';
import JobCard from '../components/JobCard';
import JobsList from '../components/JobsList';
import amazonLogo from '../assets/job logos/amazon_logo.png';
import './Scratch.css';

const SAMPLE_JOB = {
  company: 'Amazon',
  role: 'Software Development Engineer',
  image: amazonLogo,
  color: [255, 153, 0],
  startDate: '06/2022',
  endDate: 'Present',
  description:
    'Designed and built scalable microservices processing millions of daily transactions. Collaborated with cross-functional teams to deliver customer-facing features across multiple product lines.',
  achievements: [
    'Reduced API latency by 40% through query optimization and caching strategies',
    'Led migration of legacy monolith to event-driven microservices architecture',
    'Mentored 3 junior engineers and established team code review standards',
  ],
  skills: ['Java', 'AWS', 'DynamoDB', 'Lambda', 'React', 'TypeScript', 'Docker', 'CI/CD'],
  location: 'Seattle, WA',
  type: 'Full-time',
};

const Scratch = () => {
  return (
    <div className="scratch-page">
      <JobCard {...SAMPLE_JOB} />
      <JobsList
        jobs={['Job 1', 'Job 2', 'Job 3']}
        color={[255, 153, 0]}
      />
    </div>
  );
};

export default Scratch;
