import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'automated-web-deployment',
    slug: 'automated-web-deployment',
    name: 'Automated Web Application Deployment',
    summary: 'Deploy a static or simple web app to a VM with Nginx, with a CI pipeline that ships on every merge.',
    architecture: `flowchart LR
  Dev[Developer] -->|git push| GH[GitHub]
  GH -->|workflow| GH Actions[GitHub Actions]
  GH Actions -->|ssh| VM[EC2 / VM]
  GH Actions -->|scp| VM
  VM --> Nginx[Nginx]
  Nginx --> User((User))`,
    prerequisites: [
      'linux-shell-navigation',
      'linux-ssh',
      'git-fundamentals',
      'github-actions-basics',
      'cloud-fundamentals-concepts',
    ],
    technologies: [
      { name: 'GitHub Actions', role: 'CI pipeline' },
      { name: 'Nginx', role: 'Reverse proxy + web server' },
      { name: 'systemd', role: 'Service supervisor' },
      { name: 'Let\'s Encrypt', role: 'TLS certificates' },
    ],
    requirements: [
      'A Linux server (or VM) reachable from GitHub Actions',
      'A domain name pointing at the server',
      'A GitHub repo with the app and the workflow',
    ],
    milestones: [
      { title: 'Provision the server', description: 'Create an EC2 instance, lock down SSH, install Nginx, and serve a placeholder page over HTTPS.' },
      { title: 'Add the app', description: 'Replace the placeholder with your app; reverse-proxy a backend if needed.' },
      { title: 'CI deploys on merge', description: 'Write a GitHub Actions workflow that SSHes in and updates the running app on every push to main.' },
      { title: 'Health check and rollback', description: 'Add a healthcheck and a previous-version rollback script. Test it.' },
      { title: 'Harden', description: 'Run the workflow on a non-root deploy user; add basic firewall rules; document the runbook.' },
    ],
    outcome: 'A web app that ships to a public URL on every merge, with HTTPS, healthcheck, and one-command rollback.',
    difficulty: 2,
    estimatedHours: 8,
  },
  {
    id: 'dockerized-application',
    slug: 'dockerized-application',
    name: 'Dockerized Application',
    summary: 'Package a multi-service app with Docker Compose, shippable as a single repo.',
    architecture: `flowchart LR
  Browser -->|https| Nginx
  Nginx -->|/api| API
  API --> DB[(Postgres)]
  API --> Redis[(Redis)]
  API --> Worker[Background Worker]
  Worker --> DB`,
    prerequisites: [
      'containers-concepts',
      'docker-fundamentals',
      'dockerfile',
      'docker-networking',
      'docker-volumes',
      'docker-compose',
    ],
    technologies: [
      { name: 'Docker', role: 'Container runtime' },
      { name: 'Docker Compose', role: 'Local stack' },
      { name: 'Multi-stage builds', role: 'Small images' },
      { name: 'Healthchecks', role: 'Dependency ordering' },
    ],
    requirements: [
      'An app with at least 2 services (e.g. API + database)',
      'Local Docker or Podman',
      'A registry to push images to (Docker Hub or GHCR)',
    ],
    milestones: [
      { title: 'Compose the stack', description: 'Author a compose.yaml for your app, its DB, and any caches. Wire healthchecks.' },
      { title: 'Slim the images', description: 'Rewrite Dockerfiles as multi-stage, distroless where possible. Aim under 150MB for the API.' },
      { title: 'Externalize config', description: 'Move all config to env files and read them in code; never bake them into the image.' },
      { title: 'Push and run elsewhere', description: 'Push the images to a registry; pull them on a different host and bring the stack up there.' },
      { title: 'Document', description: 'Write a README with prerequisites, run commands, and known gotchas.' },
    ],
    outcome: 'A reproducible multi-service stack that one teammate can run with one command.',
    difficulty: 2,
    estimatedHours: 10,
  },
  {
    id: 'kubernetes-application',
    slug: 'kubernetes-application',
    name: 'Kubernetes Application',
    summary: 'Deploy a real application to a Kubernetes cluster with proper Deployments, Services, Ingress, and observability.',
    architecture: `flowchart TB
  User((User)) -->|https| ALB[ALB / Ingress]
  ALB --> Frontend
  ALB --> API
  API --> DB[(StatefulSet Postgres)]
  API --> Cache[(Redis)]
  API --> Queue[(SQS / Kafka)]
  Worker --> Queue`,
    prerequisites: [
      'kubernetes-fundamentals',
      'kubernetes-pods-workloads',
      'kubernetes-services',
      'kubernetes-config-secrets',
      'kubernetes-volumes',
      'helm-fundamentals',
      'docker-compose',
    ],
    technologies: [
      { name: 'Kubernetes', role: 'Orchestrator' },
      { name: 'Helm', role: 'Packaging' },
      { name: 'NGINX Ingress', role: 'Ingress' },
      { name: 'cert-manager', role: 'TLS' },
      { name: 'External Secrets / SOPS', role: 'Secrets' },
    ],
    requirements: [
      'A Kubernetes cluster (kind, EKS, or GKE free tier)',
      'A real domain (or a free DuckDNS / nip.io)',
      'An app you can containerize',
    ],
    milestones: [
      { title: 'Helm chart', description: 'Author a Helm chart for your app with templated values.' },
      { title: 'Ingress + TLS', description: 'Expose the app via Ingress; provision TLS with cert-manager; verify HTTPS.' },
      { title: 'State', description: 'Run a database as a StatefulSet with a PVC; or wire to a managed DB and use secrets.' },
      { title: 'Observability', description: 'Install kube-prometheus-stack; create a service dashboard; wire alerts on SLOs.' },
      { title: 'Canary deploy', description: 'Use Argo Rollouts or a manual canary to verify safe rollouts.' },
    ],
    outcome: 'An app running on Kubernetes with HTTPS, observability, and progressive delivery.',
    difficulty: 4,
    estimatedHours: 18,
  },
  {
    id: 'terraform-aws-infrastructure',
    slug: 'terraform-aws-infrastructure',
    name: 'Terraform AWS Infrastructure',
    summary: 'Provision a complete, multi-tier AWS environment with Terraform, modules, and remote state.',
    architecture: `flowchart TB
  subgraph VPC
    direction TB
    subgraph Public
      ALB[ALB]
    end
    subgraph Private
      App[ECS / EKS]
    end
    subgraph Data
      RDS[(RDS)]
    end
  end
  Route53 --> ALB
  ALB --> App
  App --> RDS
  App --> S3[(S3)]
  CloudWatch --- App`,
    prerequisites: [
      'cloud-fundamentals-iam',
      'aws-ec2',
      'aws-vpc',
      'aws-s3',
      'aws-rds',
      'terraform-fundamentals',
      'terraform-state',
      'terraform-modules',
    ],
    technologies: [
      { name: 'Terraform', role: 'IaC' },
      { name: 'S3 + DynamoDB', role: 'Remote state' },
      { name: 'GitHub Actions', role: 'CI for Terraform' },
      { name: 'Infracost', role: 'Cost in PRs' },
    ],
    requirements: [
      'An AWS account',
      'A domain in Route 53',
      'A GitHub repo to host the Terraform code',
    ],
    milestones: [
      { title: 'Remote state', description: 'Set up S3 + DynamoDB for state and locking.' },
      { title: 'VPC + subnets', description: 'Module-ize the VPC; provision public, private, and data subnets across 3 AZs.' },
      { title: 'Compute and data', description: 'Provision compute (EKS or ECS) and a managed database.' },
      { title: 'CI for Terraform', description: 'Plan on PRs; require an approval to apply. Add Infracost to surface cost deltas.' },
      { title: 'Module library', description: 'Extract repeated patterns into versioned modules.' },
    ],
    outcome: 'A production-shaped AWS environment defined in code, with safe applies and cost visibility.',
    difficulty: 4,
    estimatedHours: 22,
  },
  {
    id: 'gitops-kubernetes-platform',
    slug: 'gitops-kubernetes-platform',
    name: 'GitOps Kubernetes Platform',
    summary: 'Run a multi-tenant cluster where every change is a PR. Argo CD, sealed secrets, progressive delivery.',
    architecture: `flowchart TB
  Dev -->|PR| Git[Git Repo]
  Git -->|app-of-apps| Argo[Argo CD]
  Argo -->|sync| Cluster
  Vault[Vault] -->|ESO| Cluster
  SOPS -->|sealed| Git
  Prometheus -->|metrics| Rollouts[Argo Rollouts]
  Rollouts -->|canary| Cluster`,
    prerequisites: [
      'kubernetes-fundamentals',
      'kubernetes-rbac',
      'kubernetes-networking',
      'helm-fundamentals',
      'gitops-principles',
      'argocd-essentials',
      'gitops-secrets',
    ],
    technologies: [
      { name: 'Argo CD', role: 'GitOps controller' },
      { name: 'Argo Rollouts', role: 'Progressive delivery' },
      { name: 'SOPS + age', role: 'Encrypted secrets' },
      { name: 'External Secrets Operator', role: 'Sync from Vault' },
      { name: 'kube-prometheus-stack', role: 'Metrics' },
    ],
    requirements: [
      'A Kubernetes cluster (EKS, GKE, or kind)',
      'A Git repo to host manifests',
      'Optional: a Vault instance for dynamic secrets',
    ],
    milestones: [
      { title: 'App of apps', description: 'Bootstrap a cluster with an app-of-apps pattern; deploy 2 sample apps via Argo CD.' },
      { title: 'Sealed secrets', description: 'Wire SOPS or Sealed Secrets so secrets live in Git safely.' },
      { title: 'Progressive delivery', description: 'Add Argo Rollouts with a Prometheus-based canary analysis.' },
      { title: 'Multi-tenancy', description: 'Define AppProjects per team; restrict cluster-wide access.' },
      { title: 'Drift detection', description: 'Make a manual cluster change; verify Argo CD reports drift; alert on persistent drift.' },
    ],
    outcome: 'A cluster that reconciles to Git; every change is a PR with a plan; secrets are encrypted; rollouts are progressive.',
    difficulty: 4,
    estimatedHours: 24,
  },
  {
    id: 'observability-stack',
    slug: 'observability-stack',
    name: 'Observability Stack',
    summary: 'A complete three-pillar stack with Prometheus, Grafana, Loki, Tempo, and OpenTelemetry. SLOs and alerts included.',
    architecture: `flowchart LR
  App[Apps] -->|OTel| Collector[OTel Collector]
  Collector --> Prom[Prometheus]
  Collector --> Loki
  Collector --> Tempo
  Prom --> Grafana
  Loki --> Grafana
  Tempo --> Grafana
  Prom --> Alert[Alertmanager]
  Alert --> PD[PagerDuty]
  SLO[Sloth] --> Prom`,
    prerequisites: [
      'observability-three-pillars',
      'observability-prometheus',
      'observability-grafana',
      'observability-alerting',
      'observability-loki',
      'observability-tracing',
      'observability-otel',
    ],
    technologies: [
      { name: 'OpenTelemetry', role: 'Instrumentation' },
      { name: 'Prometheus', role: 'Metrics' },
      { name: 'Grafana', role: 'Visualization' },
      { name: 'Loki', role: 'Logs' },
      { name: 'Tempo', role: 'Traces' },
      { name: 'Alertmanager', role: 'Routing' },
      { name: 'Sloth', role: 'SLO generator' },
    ],
    requirements: [
      'A Kubernetes cluster',
      'A sample instrumented app',
    ],
    milestones: [
      { title: 'Stand up the stack', description: 'Install Prometheus, Grafana, Loki, Tempo, and the OTel Collector with Helm.' },
      { title: 'Instrument', description: 'Add OpenTelemetry to the app; verify metrics, logs, and traces all flow.' },
      { title: 'Service dashboard', description: 'Build a Grafana dashboard with RED metrics, log samples, and a trace link.' },
      { title: 'SLOs', description: 'Define an availability and a latency SLO with Sloth; wire multi-window burn-rate alerts.' },
      { title: 'Drill', description: 'Run a chaos exercise; verify the alerts fire, the runbook is reachable, and the postmortem template exists.' },
    ],
    outcome: 'A working three-pillar observability stack with SLOs, alerts, and dashboards you actually use.',
    difficulty: 4,
    estimatedHours: 20,
  },
  {
    id: 'devsecops-pipeline',
    slug: 'devsecops-pipeline',
    name: 'DevSecOps Pipeline',
    summary: 'A CI/CD pipeline that fails the build on secrets, high CVEs, and policy violations.',
    architecture: `flowchart LR
  Dev[Dev] -->|PR| CI[GitHub Actions]
  CI --> Gitleaks
  CI --> Semgrep
  CI --> Trivy
  CI --> OPA
  CI --> Tests
  CI --> Build
  Build --> Sign[cosign sign]
  Sign --> Registry
  Registry --> K8s[Cluster]
  K8s --> Kyverno[Kyverno verify]`,
    prerequisites: [
      'cicd-pipelines-as-code',
      'cicd-secrets-management',
      'devsecops-threat-modeling',
      'devsecops-sast',
      'devsecops-secrets-scanning',
      'devsecops-sca',
      'devsecops-image-scanning',
      'devsecops-supply-chain',
    ],
    technologies: [
      { name: 'GitHub Actions', role: 'CI/CD' },
      { name: 'Gitleaks', role: 'Secret scan' },
      { name: 'Semgrep', role: 'SAST' },
      { name: 'Trivy', role: 'Image + IaC scan' },
      { name: 'OPA / Conftest', role: 'Policy as code' },
      { name: 'cosign', role: 'Image signing' },
      { name: 'Kyverno', role: 'Admission policy' },
    ],
    requirements: [
      'A repo with an app to build',
      'A container registry',
      'A cluster with Kyverno installed',
    ],
    milestones: [
      { title: 'Pre-commit', description: 'Add gitleaks to pre-commit; verify it blocks a fake key.' },
      { title: 'PR security', description: 'Add Semgrep, Trivy (filesystem), and OPA/Conftest to a PR workflow; fail on findings.' },
      { title: 'Build + sign', description: 'Build the image; scan it with Trivy; fail on critical CVEs; sign with cosign.' },
      { title: 'Admit only signed', description: 'Add a Kyverno policy that only admits signed images; verify rejection of an unsigned one.' },
      { title: 'Audit', description: 'Document what each gate catches and how to triage findings.' },
    ],
    outcome: 'A pipeline that catches secrets, vulnerable code, vulnerable images, and unsigned deploys before they reach prod.',
    difficulty: 4,
    estimatedHours: 18,
  },
  {
    id: 'internal-developer-platform',
    slug: 'internal-developer-platform',
    name: 'Internal Developer Platform',
    summary: 'Build a Backstage portal with golden paths, self-service infra, and a real adoption metric.',
    architecture: `flowchart TB
  Dev[Developer] --> Portal[Backstage]
  Portal -->|create service| Argo
  Portal -->|provision DB| Crossplane
  Portal --> Catalog
  Portal --> Docs[TechDocs]
  Argo -->|sync| Cluster
  Crossplane -->|reconcile| Cloud
  Portal --> Survey[DevEx Survey]
  Survey --> Roadmap`,
    prerequisites: [
      'platform-engineering-concepts',
      'platform-backstage',
      'platform-self-service',
      'platform-templates',
      'gitops-monorepo',
      'terraform-platform',
    ],
    technologies: [
      { name: 'Backstage', role: 'Developer portal' },
      { name: 'Argo CD', role: 'GitOps' },
      { name: 'Crossplane or Terraform', role: 'Self-service infra' },
      { name: 'Kubernetes', role: 'Runtime' },
    ],
    requirements: [
      'A Kubernetes cluster',
      'A Git org for templates and catalog',
      'A pilot team willing to use the portal',
    ],
    milestones: [
      { title: 'Backstage', description: 'Stand up Backstage; connect a GitHub org; populate the catalog; add 2 docs.' },
      { title: 'Golden path template', description: 'Write a scaffolder template that creates a service with CI, Argo app, and an entry in the catalog.' },
      { title: 'Self-service infra', description: 'Add a "create a Postgres" workflow backed by Crossplane or Terraform Cloud.' },
      { title: 'Pilot', description: 'Onboard 1 team; measure time-to-first-deploy; capture feedback.' },
      { title: 'Adoption metric', description: 'Define a metric; baseline; report; iterate.' },
    ],
    outcome: 'A working IDP with a catalog, a golden path, and a pilot team using it.',
    difficulty: 5,
    estimatedHours: 30,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
