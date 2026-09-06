export interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: FAQItem[] = [
  {
    q: 'Is this roadmap right for me if I am a complete beginner?',
    a: 'Yes — start with the Beginner path. We assume no prior DevOps knowledge, only willingness to learn. If you already know Linux well, jump to the DevOps Engineer path.',
  },
  {
    q: 'How long will it take to finish?',
    a: 'Realistically, 6–12 months of focused study for the full DevOps path, working through every exercise. The Beginner path is ~320 hours, the DevOps Engineer path is ~700. Quality matters more than speed.',
  },
  {
    q: 'Do I need to pay for anything?',
    a: 'No. Every skill here can be learned with free tools and free tiers of cloud providers. AWS, GCP, and Azure all offer free tiers that are enough for the projects. The few paid books listed are optional.',
  },
  {
    q: 'Why concepts before tools?',
    a: 'Because tools change every year. Concepts (containers, declarative state, reconciliation loops, the three pillars of observability) outlast tools. If you understand the concept, you can pick up a new tool in a week. The reverse is not true.',
  },
  {
    q: 'I already know Kubernetes. Where do I start?',
    a: 'Jump to the DevOps Engineer or SRE path. Look at the topics you feel weakest in — usually GitOps, observability, or IaC — and start there.',
  },
  {
    q: 'Will this get me a job?',
    a: 'It can, but it is not a guarantee. The combination of (1) concepts, (2) hands-on exercises, (3) one or more end-to-end projects, and (4) a public portfolio (blog, GitHub) is what gets interviews. This roadmap covers the first three. The fourth is on you.',
  },
  {
    q: 'Why so much emphasis on observability?',
    a: 'Because most production outages are debugged from metrics, logs, and traces. A senior engineer who can build an SLO and the alerts that go with it is more valuable than one who can deploy a cluster. The other reason: observability is what separates an SRE from a DevOps engineer.',
  },
  {
    q: 'Is AWS the only cloud?',
    a: 'No. The concepts are cloud-agnostic. We use AWS for examples because it is the most common in the industry. Once you understand AWS, the others map cleanly.',
  },
  {
    q: 'How do I track my progress?',
    a: 'Mark each skill as Not started, Learning, Practiced, or Completed. The header shows your overall progress. Progress is saved in your browser\'s local storage; no account is required in v1.',
  },
  {
    q: 'Can I use this for my team?',
    a: 'Yes. The content is meant to be shared. If you spot an error or want to suggest a skill, the project is open source — open a PR.',
  },
  {
    q: 'What is the difference between DevOps, SRE, and Platform Engineering?',
    a: 'DevOps is the practice of breaking the wall between dev and ops. SRE is the application of software engineering to operations, with a strong focus on reliability. Platform engineering is building internal products for developers. The boundaries are fuzzy, and most senior roles blend all three.',
  },
  {
    q: 'Is AI × DevOps really a thing?',
    a: 'Yes, but with caveats. AI is genuinely useful for summarization, code review, alert tuning, and capacity planning. It is not a replacement for the fundamentals. The 2026 skill is "use AI well, verify everything, and keep your mental model sharp."',
  },
];
