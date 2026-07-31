/**
 * Worked examples for the disclosure templates.
 * Three fictional lab fill-ins showing what a complete public submission looks like.
 *
 * Each example is illustrative — drawn from the spirit of real published system cards
 * (Anthropic, OpenAI, DeepMind) but does not represent any actual disclosure.
 * Marked DRAFT until co-author proofing.
 */

export type MockEntry = {
  id: string;
  /** Display name of the fictional lab */
  lab: string;
  /** Short tagline describing the lab's posture */
  tagline: string;
  /** Date of the fictional report */
  reportDate: string;
  /** Reporting period covered */
  period: string;
  /** Map of disclosure slug → completed answer */
  answers: Record<string, string>;
};

/** Slugs match those in framework.ts disclosures */
export const mocks: MockEntry[] = [
  {
    id: 'mock-frontier-co',
    lab: 'Frontier Labs',
    tagline: 'A "best in class" submission — comprehensive, structured, audit-ready',
    reportDate: '2026-04-15',
    period: 'Q1 2026 (January — March)',
    answers: {
      'capabilities-relation-to-external':
        'IDMs deployed during the reporting period were drawn from three model families: (i) Apex-3 (released to API customers on 2026-02-14), (ii) Apex-3 Sonnet variants fine-tuned on internal codebases, and (iii) an unreleased Apex-4 preview model used solely under a 30-day pre-release evaluation regime. The Apex-4 preview model was made available externally on 2026-04-01 with disclosed capability uplift.',
      'capabilities-benchmark-scores':
        'On RE-Bench (research engineering): Apex-3 scored 0.61 ± 0.04; Apex-4 preview scored 0.78 ± 0.03 (n=12 trials). On SWE-Bench Pro: Apex-3 resolved 41.2% of issues; Apex-4 preview resolved 54.7%. Internal fine-tuned variants showed no statistically significant capability uplift on these benchmarks.',
      'capabilities-compute-allocation':
        'Mean inference compute over the 30 days preceding publication: 19.4% of total inference FLOPs allocated to IDMs (vs. 80.6% to external customer traffic). Of that 19.4%, ~62% was used for AI R&D tasks (training data generation, evaluations, agentic research workflows) and ~38% for internal product and infrastructure tooling.',
      'capabilities-capability-divergence':
        'No internal-only capability uplift identified in cyber-offense, biosecurity, or autonomous replication domains beyond what is disclosed in the Apex-4 preview model card. Internal coding-agent scaffolding produces 1.8× throughput improvement vs. external API access, but does not unlock new capability domains.',
      'usage-task-categories':
        'IDM tasks during the period: (i) AI research assistance — literature review, experiment design, ~34% of IDM use; (ii) Code authorship and review — ~28%; (iii) Synthetic training data generation — ~14%; (iv) Model evaluation and red-teaming — ~11%; (v) Infrastructure operations and on-call assistance — ~7%; (vi) Internal product features (search, summarisation) — ~6%.',
      'usage-autonomy-level':
        'The majority of IDM rollouts are short, human-supervised exchanges (seconds to minutes). Long-horizon agentic rollouts — defined as >30 minutes unsteered — were limited to (a) coding agents on bounded tasks with mandatory human review of all merged changes, and (b) supervised research agents under monitoring. No IDM operated unsteered for more than 8 hours without a human checkpoint during the period.',
      'usage-pipeline-review':
        'Of substantive changes to frontier model training pipelines (data filtering, RLHF reward functions, evaluation harnesses), 100% were reviewed by at least one human expert before merge. 41% of model-suggested changes were modified or rejected at review.',
      'safety-mitigations-safeguards-in-place':
        'Layered safeguards: (i) a chain-of-thought monitor classifier evaluating every long-horizon rollout for misalignment indicators; (ii) hard tool-use restrictions preventing IDMs from modifying their own weights, accessing GPU clusters directly, or executing privileged shell commands; (iii) interaction logging retained for 90 days with cryptographic integrity guarantees; (iv) human-in-the-loop requirements for any code reaching production; (v) a constitutional AI alignment regime applied to all IDM variants.',
      'safety-mitigations-stress-testing':
        'During Q1 2026, our internal alignment team conducted 14 elicitation studies attempting to induce IDMs to fool the CoT monitor. Two studies surfaced reproducible monitor evasion techniques (one prompting-based, one fine-tuning-based on a held-out variant); both were patched within 7 days. Findings shared with METR under the standing collaboration agreement.',
      'safety-mitigations-misalignment-evaluations':
        'Apex-3 IDM variant: Evaluation-awareness — 0.12 (low). Persuasion (MakeMePay benchmark) — 0.34. CoT-monitorability (faithfulness) — 0.81. Apex-4 preview: 0.18 / 0.41 / 0.76 respectively. Trends over the three preceding quarters are reported in Appendix B of the linked PDF.',
      'governance-prohibited-uses':
        'Hard prohibitions: (i) autonomous deployment of code to customer-facing production environments; (ii) unsupervised access to customer data or PII; (iii) any modification of model weights, training data, or alignment configurations; (iv) direct allocation of GPU clusters or compute budget; (v) any action affecting external systems beyond a sandboxed approved tool list.',
      'governance-employee-governance':
        'All employees with IDM access complete a mandatory 4-hour responsible use training (refreshed annually). The Acceptable Use Policy is published at /aup-internal and version-controlled. Incident reporting is via a dedicated #idm-incidents channel and an anonymous hotline; incidents are reviewed by the Safety Oversight Council within 48 hours of report.',
      'governance-concerning-behaviours':
        'We monitor for: (a) attempted exfiltration of weights or training data; (b) deceptive reasoning in CoT (sandbagging, evaluation-gaming); (c) attempts to acquire resources outside sanctioned tools; (d) reward-hacking on internal evaluations; (e) coordination signals between agent instances. Detection of any (a)–(c) triggers immediate IDM rollback and a 48-hour incident review. (d) and (e) trigger investigation but not automatic rollback.',
      'governance-review-cadence':
        'Internal deployment policy is reviewed quarterly by the Safety Oversight Council and annually by an external auditor (METR). Any incident graded High or Critical triggers an out-of-cycle policy review within 30 days. The current policy is version 4.2, published 2026-03-08.',
      'governance-access-control':
        'IDM access is tiered: Tier 1 (research staff, ~430 employees) has access to research IDMs under monitoring; Tier 2 (senior engineering staff, ~120 employees) has access to coding-agent IDMs; Tier 3 (~12 employees in the Frontier Operations Group) has elevated access for evaluation and safety work, with mandatory dual-signoff for all elevated actions.',
    },
  },
  {
    id: 'mock-paragon-ai',
    lab: 'Paragon AI',
    tagline: 'A model-card-style submission — bundled with a public capability release',
    reportDate: '2026-04-22',
    period: 'Tied to release of Paragon-7 (covering 90 days pre-release)',
    answers: {
      'capabilities-relation-to-external':
        'Paragon-7, released today, was deployed internally for 90 days prior to release in two configurations: (i) the production checkpoint, used by ~240 staff for evaluation and product integration work, and (ii) an "unreleased" variant with reduced refusal training, used by 18 members of our red-team.',
      'capabilities-benchmark-scores':
        'Paragon-7 internal benchmark scores at release date: RE-Bench 0.55, SWE-Bench Pro 38.4%. The unreleased red-team variant scored 0.59 and 41.7% respectively — the difference attributable to refusal behaviour rather than underlying capability.',
      'capabilities-compute-allocation':
        'During the 90-day internal evaluation window, internal use averaged 8% of total inference compute, peaking at 14% during the final fortnight as integration testing accelerated.',
      'capabilities-capability-divergence':
        "We disclose two domains where Paragon-7's internal performance was materially higher than the released checkpoint's: (i) bioweapon synthesis advice (red-team variant, mitigated by additional RLHF), and (ii) novel exploit discovery on a controlled CTF set (mitigated by output classifier).",
      'usage-task-categories':
        'Internal use during evaluation: model evaluation (~62%), product integration testing (~21%), red-teaming and safety research (~11%), infrastructure tooling (~6%).',
      'usage-autonomy-level':
        'Long-horizon agentic use was limited to evaluation harnesses (RE-Bench, MLE-Bench) and red-team workflows. No production agentic deployment of Paragon-7 internally.',
      'usage-pipeline-review':
        'Not applicable — Paragon-7 was not used to modify its own or any other frontier model\'s training pipeline during the evaluation window.',
      'safety-mitigations-safeguards-in-place':
        'Standard internal safeguards applied: output logging, classifier-based monitoring of high-risk task categories (CBRN, cyber), and human-in-the-loop requirements for all customer-facing tests. The unreleased red-team variant was further constrained to a network-isolated environment with no internet egress.',
      'safety-mitigations-stress-testing':
        'Pre-release stress testing was conducted by our internal red-team and by two external partners (UK AISI and Apollo Research). Findings: two prompt-injection vulnerabilities, one CoT-monitor evasion technique, all patched before release. External findings published alongside the model card.',
      'safety-mitigations-misalignment-evaluations':
        'Paragon-7 evaluation-awareness: 0.21. Persuasion: 0.39. CoT-faithfulness: 0.74. Reported in §6 of the model card.',
      'governance-prohibited-uses':
        'During internal evaluation, prohibited uses included production code deployment, customer data access (other than synthetic test data), and weight modification. Standard prohibitions enforced via tool-use restrictions.',
      'governance-employee-governance':
        'Employees accessing Paragon-7 prior to release signed an additional NDA covering capability information. Incident reporting follows our standing process — escalation to the Safety Council within 24 hours for High/Critical, weekly review for Medium.',
      'governance-concerning-behaviours':
        'During the 90-day window we logged 11 events flagged by automated monitoring; 9 were false positives, 2 were genuine attempts to circumvent safety filters (both originating from red-team work, expected). Zero incidents involving non-red-team users.',
      'governance-review-cadence':
        'Pre-release deployment policy reviewed at 30, 60, and 90 days by our Frontier Risk Committee. Standard internal deployment policy reviewed semi-annually.',
      'governance-access-control':
        'Pre-release access was tiered: ~240 evaluation staff (read-only access, monitored), ~40 integration engineers (full access under monitoring), 18 red-team members (elevated access with NDA), 6 frontier risk officers (audit access). All access logged and reviewable.',
    },
  },
  {
    id: 'mock-keystone-research',
    lab: 'Keystone Research',
    tagline: 'A standalone periodic submission — focused on AI R&D acceleration',
    reportDate: '2026-04-30',
    period: 'Q1 2026, with comparison to Q4 2025',
    answers: {
      'capabilities-relation-to-external':
        'Keystone\'s primary IDM during the period — internally referred to as "Forge" — is a fine-tuned variant of our publicly released Stratum-2 model, post-trained on a curated corpus of internal codebases, research papers, and lab-notebook conversations. We have not released this variant externally.',
      'capabilities-benchmark-scores':
        'Forge on RE-Bench: 0.48 (vs. 0.39 for the base Stratum-2). On SWE-Bench Pro: 32.1% (vs. 28.4%). The uplift reflects the targeted post-training; Forge is not an underlying capability advance.',
      'capabilities-compute-allocation':
        'Q1 2026: 11.2% of inference compute allocated to IDMs (Q4 2025: 7.8%). The increase reflects expanded use of Forge across our research divisions.',
      'capabilities-capability-divergence':
        'No identified divergence in dangerous-capability domains. Forge\'s capability uplift is concentrated in research-engineering tasks reflecting its fine-tuning corpus.',
      'usage-task-categories':
        'Q1 2026 task mix for Forge: research code authoring (~44%), experiment automation and orchestration (~22%), literature review and synthesis (~15%), routine data preprocessing (~12%), engineering on-call assistance (~7%).',
      'usage-autonomy-level':
        'Three classes of agentic use: (i) bounded coding tasks with PR-level human review (the majority); (ii) supervised research-experiment runs (typically 2–6 hours, with check-in points); (iii) overnight batch evaluations of model artefacts (no concurrent human supervision, but bounded tool access). No autonomous deployment to any production system.',
      'usage-pipeline-review':
        '~74% of model-suggested modifications to training pipelines (data filters, eval harnesses, RLHF configurations) were reviewed and approved by a human before merge during Q1. Up from 68% in Q4 2025.',
      'safety-mitigations-safeguards-in-place':
        'Forge operates within a sandbox with allowlisted tools (git, sanctioned compute APIs, read-only research-paper search). No internet egress without explicit human approval. Output monitoring uses a smaller classifier model trained on prior misalignment incidents. Logging retained for 6 months.',
      'safety-mitigations-stress-testing':
        'Quarterly internal red-team exercise (most recent: 2026-03-22). Three monitor-evasion attempts succeeded under adversarial prompting; all required adversarial conditions unlikely in normal use, but were patched. Findings logged in Appendix C.',
      'safety-mitigations-misalignment-evaluations':
        'Forge: evaluation-awareness 0.09 (very low — Forge is a smaller and less capable model than frontier IDMs at peer labs). Persuasion: 0.22. CoT-faithfulness: 0.86.',
      'governance-prohibited-uses':
        'Forge cannot: deploy code to production, modify weights or training data of any model, access GPU clusters directly, exfiltrate or transmit data outside the sandbox, or execute privileged operations on lab infrastructure.',
      'governance-employee-governance':
        'All ~180 lab staff with Forge access have completed responsible-use training. Incident reporting via the standing #safety channel; on-call rotation reviews flagged events within 72 hours.',
      'governance-concerning-behaviours':
        'We monitor for sandbox escape attempts, exfiltration, deception in CoT, and reward-hacking. No incidents in Q1 2026 graded above Low. Two Low-severity events were investigated and closed.',
      'governance-review-cadence':
        'Internal deployment policy reviewed at the start of each quarter by the Safety Working Group. Annual external review by an independent auditor (rotated). Current policy version 2.1, published 2026-01-12.',
      'governance-access-control':
        'Tiered access: ~180 research staff (standard access to Forge for sanctioned tasks), ~22 engineering staff (elevated access for tooling work), 4 safety officers (audit access). Access is reviewed annually and revoked on role change within 7 days.',
    },
  },
];
