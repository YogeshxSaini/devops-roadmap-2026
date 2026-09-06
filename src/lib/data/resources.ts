import type { Resource } from '../types';

export const RESOURCES: Resource[] = [
  { id: 'r-linux-journey', type: 'doc', title: 'Linux Journey', url: 'https://linuxjourney.com/', description: 'A friendly, visual introduction to Linux and the command line.', skillIds: ['linux-shell-navigation', 'linux-files-permissions', 'linux-text-processing'], free: true },
  { id: 'r-linux-command', type: 'book', title: 'The Linux Command Line', url: 'http://linuxcommand.org/tlcl.php', description: 'William Shotts\' free book. The best single resource on bash.', skillIds: ['bash-scripting', 'linux-shell-navigation'], free: true },
  { id: 'r-ohsh', type: 'book', title: 'Operating Systems: Three Easy Pieces', url: 'https://ostep.org/', description: 'Free. The best OS book for engineers.', skillIds: ['linux-processes-services'], free: true },
  { id: 'r-pro-git', type: 'book', title: 'Pro Git', url: 'https://git-scm.com/book/en/v2', description: 'Free. The canonical Git book.', skillIds: ['git-fundamentals', 'git-conflict-resolution'], free: true },
  { id: 'r-cka', type: 'course', title: 'Kubernetes the Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', description: 'Free. Build a cluster from scratch.', skillIds: ['kubernetes-fundamentals'], free: true },
  { id: 'r-k8s-docs', type: 'doc', title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/', description: 'The official docs. Boring and excellent.', skillIds: ['kubernetes-pods-workloads', 'kubernetes-services'], free: true },
  { id: 'r-terraform-up', type: 'course', title: 'Terraform Up & Running', url: 'https://www.terraformupandrunning.com/', description: 'Yevgeniy Brikman\'s book. Pragmatic Terraform patterns.', skillIds: ['terraform-fundamentals', 'terraform-modules'], free: false },
  { id: 'r-argo-cd-docs', type: 'doc', title: 'Argo CD Documentation', url: 'https://argo-cd.readthedocs.io/', description: 'The official Argo CD docs.', skillIds: ['argocd-essentials'], free: true },
  { id: 'r-sre-book', type: 'book', title: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/', description: 'Free. The SRE bible.', skillIds: ['observability-slos', 'cloud-fundamentals-sla'], free: true },
  { id: 'r-sre-workbook', type: 'book', title: 'The Site Reliability Workbook', url: 'https://sre.google/workbook/table-of-contents/', description: 'Free. Practical SRE companion.', skillIds: ['observability-slos'], free: true },
  { id: 'r-prometheus-book', type: 'book', title: 'Prometheus: Up & Running', url: 'https://www.oreilly.com/library/view/prometheus-up/9781492034131/', description: 'The best practical Prometheus book.', skillIds: ['observability-prometheus'], free: false },
  { id: 'r-otel-docs', type: 'doc', title: 'OpenTelemetry Documentation', url: 'https://opentelemetry.io/docs/', description: 'Vendor-neutral instrumentation standard.', skillIds: ['observability-otel', 'observability-tracing'], free: true },
  { id: 'r-backstage', type: 'doc', title: 'Backstage Documentation', url: 'https://backstage.io/docs', description: 'The official Backstage docs.', skillIds: ['platform-backstage'], free: true },
  { id: 'r-12factor', type: 'doc', title: 'The Twelve-Factor App', url: 'https://12factor.net/', description: 'Free. The classic methodology for SaaS apps.', skillIds: ['kubernetes-config-secrets'], free: true },
  { id: 'r-owasp-top10', type: 'doc', title: 'OWASP Top 10', url: 'https://owasp.org/Top10/', description: 'The reference for web app security risks.', skillIds: ['devsecops-threat-modeling'], free: true },
  { id: 'r-mega-linter', type: 'tool', title: 'MegaLinter', url: 'https://megalinter.io/', description: 'One linter to rule them all in CI.', skillIds: ['cicd-pipelines-as-code', 'devsecops-sast'], free: true },
  { id: 'r-act', type: 'tool', title: 'act', url: 'https://github.com/nektos/act', description: 'Run GitHub Actions locally.', skillIds: ['github-actions-basics'], free: true },
  { id: 'r-k9s', type: 'tool', title: 'k9s', url: 'https://k9scli.io/', description: 'Best Kubernetes TUI.', skillIds: ['kubernetes-pods-workloads'], free: true },
  { id: 'r-tldr', type: 'tool', title: 'tldr-pages', url: 'https://tldr.sh/', description: 'Simplified man pages. Great for muscle memory.', skillIds: ['linux-shell-navigation', 'linux-text-processing'], free: true },
  { id: 'r-explainshell', type: 'tool', title: 'explainshell', url: 'https://explainshell.com/', description: 'Paste a bash command; get an explanation.', skillIds: ['bash-scripting'], free: true },
  { id: 'r-regex101', type: 'tool', title: 'regex101', url: 'https://regex101.com/', description: 'Build, test, and learn regex.', skillIds: ['linux-text-processing'], free: true },
  { id: 'r-pulumi', type: 'doc', title: 'Pulumi', url: 'https://www.pulumi.com/docs/', description: 'IaC in TypeScript/Python/Go.', skillIds: ['terraform-pulumi-cdk'], free: true },
  { id: 'r-crossplane', type: 'doc', title: 'Crossplane', url: 'https://docs.crossplane.io/', description: 'Control-plane IaC for K8s.', skillIds: ['platform-self-service'], free: true },
  { id: 'r-istio', type: 'doc', title: 'Istio Documentation', url: 'https://istio.io/latest/docs/', description: 'Service mesh reference.', skillIds: ['service-mesh'], free: true },
  { id: 'r-cilium', type: 'doc', title: 'Cilium Documentation', url: 'https://docs.cilium.io/', description: 'eBPF-based networking and security.', skillIds: ['kubernetes-networking'], free: true },
];

export function getResourcesForSkill(skillId: string): Resource[] {
  return RESOURCES.filter((r) => r.skillIds.includes(skillId));
}
