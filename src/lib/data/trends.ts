export interface Trend {
  id: string;
  year: number;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
}

export const TRENDS: Trend[] = [
  {
    id: 'platform-engineering-goes-mainstream',
    year: 2026,
    title: 'Platform Engineering Goes Mainstream',
    summary: 'Internal Developer Platforms are no longer a luxury. They are the default organizational pattern for any team above 50 engineers.',
    detail: 'Gartner predicts that by 2026, 80% of large enterprises will have platform engineering teams. The shift from "DevOps teams" to "platform teams" is a maturation: it acknowledges that the user of an internal platform is a developer, and that product thinking applies. Expect Backstage to consolidate as the portal of choice, and a Cambrian explosion of opinionated platform stacks built on top of Crossplane, Argo CD, and Kubernetes.',
    tags: ['platform', 'backstage', 'idp'],
  },
  {
    id: 'gitops-is-default',
    year: 2026,
    title: 'GitOps Is the Default',
    summary: 'Push-based CD is being replaced by pull-based reconciliation. Every cluster is a git repository away from being reproducible.',
    detail: 'Argo CD and Flux have eaten the cluster-management space. The remaining frontier is "fleet GitOps" — managing thousands of clusters from a single control plane. Expect cluster API providers to mature further, and for the GitOps pattern to expand beyond Kubernetes: into VM management, into cloud resources, and into edge devices.',
    tags: ['gitops', 'argo', 'flux'],
  },
  {
    id: 'ai-as-a-default-tool',
    year: 2026,
    title: 'AI as a Default Engineering Tool',
    summary: 'AI is now table-stakes for engineers — but a skill atrophy risk for juniors.',
    detail: 'Coding assistants and incident summarization are normal parts of the workflow. The 2026 problem is not "is AI useful" but "how do we keep senior judgment sharp when AI does the typing". Best teams are explicit: AI is a co-pilot, the human reviews every diff, and postmortems explicitly track "what would we have missed without AI".',
    tags: ['ai', 'llm', 'aidevops'],
  },
  {
    id: 'ebpf-everywhere',
    year: 2026,
    title: 'eBPF Everywhere',
    summary: 'Cilium, Tetragon, Pixie, Parca: eBPF is now the default observability and security primitive at the kernel boundary.',
    detail: 'eBPF lets you run sandboxed programs in the kernel without changing source. The result: better observability (no sidecar), better security (every syscall), better networking (Cilium). Expect more tools to migrate from userspace to eBPF, and a new generation of "kernel-native" observability platforms.',
    tags: ['ebpf', 'cilium', 'tetragon', 'parca'],
  },
  {
    id: 'secure-supply-chain',
    year: 2026,
    title: 'Supply Chain Security Is Regulated',
    summary: 'SLSA, SBOMs, and signed images are moving from "nice to have" to "legally required" for many industries.',
    detail: 'Executive orders and EU regulations are pushing software supply chain requirements into procurement. If you ship to the US government, financial services, or healthcare, you will be asked for an SBOM and provenance. The good news: Sigstore and SLSA are mature, and most of the wiring is straightforward. The bad news: the policy work is real.',
    tags: ['slsa', 'sigstore', 'compliance'],
  },
  {
    id: 'finops-as-a-discipline',
    year: 2026,
    title: 'FinOps as a Discipline',
    summary: 'Cost engineering is now a first-class engineering concern, not a finance afterthought.',
    detail: 'Infracost and Kubecost are now standard in CI. Cost is in the PR review. Showback is automatic. FinOps certifications are common. Teams that ignore cost get budget cuts; teams that treat it as a feature ship faster.',
    tags: ['finops', 'cost', 'infracost'],
  },
  {
    id: 'platform-engineering-meets-ai',
    year: 2026,
    title: 'AI in the Platform Itself',
    summary: 'Internal developer platforms ship with AI assistance baked in: chat-with-runbooks, auto-generated docs, code review bots.',
    detail: 'Backstage plugins can already talk to your runbooks via RAG. Code review bots in your golden path catch domain-specific anti-patterns. Incident chatbots draft postmortems. The platform team\'s job includes "make the AI assistance boring and reliable" — and that means evals, guardrails, and observability for LLM apps.',
    tags: ['platform', 'ai', 'rag'],
  },
  {
    id: 'polyrepo-to-monorepo',
    year: 2026,
    title: 'Polyrepo → Monorepo (or the Reverse) Is a Live Decision',
    summary: 'There is no universally right answer. The trend is "let tooling, not religion, decide".',
    detail: 'Some teams are going from polyrepo to monorepo for atomic refactors. Others are going the other way for build speed. The pattern in 2026: pick the structure that fits your build/test graph, and use tools (Bazel, Nx, Turborepo, sparse checkout) to make it work. Repo structure is a means, not an identity.',
    tags: ['monorepo', 'bazel', 'tooling'],
  },
];
