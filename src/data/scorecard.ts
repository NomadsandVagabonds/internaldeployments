/**
 * Developer scorecard — what six frontier developers actually disclose about
 * their internally deployed models, graded against Table 1 of the paper.
 *
 * METHOD AND LIMITS — read before editing:
 *
 * 1. This grades PUBLIC DISCLOSURE, not safety. A high score means a developer
 *    has published a lot about its internal deployments. It is not a finding
 *    that its internal deployments are safe, and a low score is not a finding
 *    that they are unsafe. Absence of disclosure is exactly that.
 * 2. Every non-`unassessed` cell cites at least one retrievable primary source.
 *    This is enforced at build time by assertScorecardIntegrity() in
 *    src/lib/score.ts — a cell with a verdict and no evidence fails the build.
 * 3. Sources are documents published by the developer itself, or clearly
 *    labelled third-party assessments (METR). Where a third party is the only
 *    source, the rationale says so.
 * 4. `unassessed` is a legitimate value and is excluded from the denominator.
 *    It means we could not verify, not that we judged unfavourably.
 * 5. `itemSlug` joins to src/data/framework.ts. Slugs are permalinks — do not
 *    rename without updating both files.
 *
 * Assessment window: sources retrieved 2026-07-31. Anything published after
 * that date is not reflected. Corrections: see /scorecard/methodology#corrections.
 */

export type Verdict = 'meets' | 'partial' | 'adjacent' | 'none' | 'unassessed';

export type Evidence = {
  /** Verbatim quote from the source, where the source says something specific. */
  quote?: string;
  /** Document title. */
  source: string;
  /** Who published it — the developer, or a third party such as METR. */
  publisher: string;
  url: string;
  /** Publication date of the source (ISO, or YYYY-MM where the day is unclear). */
  date: string;
  /** True when the publisher is not the developer being graded. */
  thirdParty?: boolean;
};

export type Cell = {
  itemSlug: string;
  verdict: Verdict;
  rationale: string;
  evidence: Evidence[];
};

export type Developer = {
  slug: string;
  name: string;
  shortName: string;
  /** One-paragraph editorial summary of this developer's disclosure posture. */
  note: string;
  cells: Cell[];
};

/** Sources retrieved on this date. Shown alongside every citation. */
export const RETRIEVED = '2026-07-31';

// ---------------------------------------------------------------------------
// Shared sources — cited by multiple cells, defined once.
// ---------------------------------------------------------------------------

const METR_RISK_REPORT: Omit<Evidence, 'quote'> = {
  source: 'Frontier Risk Report (February to March 2026)',
  publisher: 'METR',
  url: 'https://metr.org/blog/2026-05-19-frontier-risk-report/',
  date: '2026-05-19',
  thirdParty: true,
};

const ANTHROPIC_RISK_UPDATE: Omit<Evidence, 'quote'> = {
  source: 'Alignment Risk Update: Claude Mythos Preview (redacted)',
  publisher: 'Anthropic',
  url: 'https://www.anthropic.com/claude-mythos-preview-risk-report',
  date: '2026-04-10',
};

const ANTHROPIC_MYTHOS_CARD: Omit<Evidence, 'quote'> = {
  source: 'System Card: Claude Mythos Preview',
  publisher: 'Anthropic',
  url: 'https://cdn.sanity.io/files/4zrzovbb/website/7624816413e9b4d2e3ba620c5a5e091b98b190a5.pdf',
  date: '2026-04-07',
};

const ANTHROPIC_RSP: Omit<Evidence, 'quote'> = {
  source: 'Responsible Scaling Policy',
  publisher: 'Anthropic',
  url: 'https://www.anthropic.com/responsible-scaling-policy',
  date: '2026-07-08',
};

const OPENAI_MONITOR: Omit<Evidence, 'quote'> = {
  source: 'How we monitor internal coding agents for misalignment',
  publisher: 'OpenAI',
  url: 'https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/',
  date: '2026-03',
};

const OPENAI_RAISING_CONCERNS: Omit<Evidence, 'quote'> = {
  source: 'OpenAI Raising Concerns Policy',
  publisher: 'OpenAI',
  url: 'https://cdn.openai.com/policies/openai-raising-concerns-policy.pdf',
  date: '2024-10',
};

const OPENAI_PREPAREDNESS: Omit<Evidence, 'quote'> = {
  source: 'Preparedness Framework v2.0',
  publisher: 'OpenAI',
  url: 'https://openai.com/index/updating-our-preparedness-framework/',
  date: '2025-04-15',
};

const GDM_FSF: Omit<Evidence, 'quote'> = {
  source: 'Frontier Safety Framework v3.1 — announcement',
  publisher: 'Google DeepMind',
  url: 'https://deepmind.google/blog/strengthening-our-frontier-safety-framework/',
  date: '2026-04-17',
};

const GDM_CONTROL: Omit<Evidence, 'quote'> = {
  source:
    'Securing internal systems against increasingly capable and imperfectly aligned AI (AI Control Roadmap)',
  publisher: 'Google DeepMind',
  url: 'https://deepmind.google/blog/securing-the-future-of-ai-agents/',
  date: '2026-06-18',
};

const META_FRAMEWORK: Omit<Evidence, 'quote'> = {
  source: 'Advanced AI Scaling Framework v2.0',
  publisher: 'Meta',
  url: 'https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2',
  date: '2026-04-08',
};

const XAI_FAIF: Omit<Evidence, 'quote'> = {
  source: 'xAI Frontier Artificial Intelligence Framework',
  publisher: 'xAI',
  url: 'https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf',
  date: '2025-12-30',
};

const METR_FSP_LIST: Omit<Evidence, 'quote'> = {
  source: 'Frontier AI Safety Policies — index of published frameworks',
  publisher: 'METR',
  url: 'https://metr.org/fsp',
  date: '2026-07',
  thirdParty: true,
};

const FSF_SURVEY: Omit<Evidence, 'quote'> = {
  source: "Evaluating AI Providers' Frontier Safety Frameworks",
  publisher: 'arXiv:2512.01166',
  url: 'https://arxiv.org/html/2512.01166',
  date: '2025-12',
  thirdParty: true,
};

// The single finding that most constrains the Usage category across every
// developer: nobody published a human-oversight requirement in the window.
const NO_OVERSIGHT_REQUIREMENT: Evidence = {
  ...METR_RISK_REPORT,
  quote:
    'We are not aware of any company imposing strict requirements about human oversight of agents in Feb–Mar 2026.',
};

// ---------------------------------------------------------------------------

export const developers: Developer[] = [
  // =========================================================================
  {
    slug: 'anthropic',
    name: 'Anthropic',
    shortName: 'Anthropic',
    note: `The only developer to publish a document whose subject is the risk of its own internal deployment. The Mythos Preview alignment risk update names monitoring coverage rates, describes the escalation path when an internal agent misbehaves, and reports the results of a three-week external red-team of that monitoring pipeline. It is the closest thing the industry has to the report this framework asks for. The gaps are in the Usage category: no proportion of training-pipeline changes under human review, and autonomy described qualitatively rather than in the unsteered-duration terms the framework asks for.`,
    cells: [
      {
        itemSlug: 'relation-to-external',
        verdict: 'meets',
        rationale:
          'Anthropic published a full system card for Mythos Preview — a model deployed internally and never made generally available — and situates it against its public predecessor, Claude Opus 4.6. Publishing a system card for an internal-only model is the strongest available answer to this question.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              "We believe that our previous frontier models, including Claude Mythos Preview's immediate predecessor Claude Opus 4.6, lack the covert capabilities to hide coherent misaligned goals reliably across high volume usage",
          },
          ANTHROPIC_MYTHOS_CARD,
        ],
      },
      {
        itemSlug: 'benchmark-scores',
        verdict: 'partial',
        rationale:
          'Capability evaluations for the internally deployed model are published in the Mythos Preview system card. We did not find a standing commitment to report AI-R&D-automation benchmarks (RE-Bench, SWE-Bench Pro) for internal models on the recurring cadence the framework proposes — disclosure was tied to a one-off release event.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'The Mythos Preview System Card presents our capability evaluation results.',
          },
          ANTHROPIC_MYTHOS_CARD,
        ],
      },
      {
        itemSlug: 'compute-allocation',
        verdict: 'partial',
        rationale:
          'Anthropic publishes adjacent internal-automation metrics — a chart of PRs merged per active author alongside the share written by AI — but not the proportion of internal inference allocated to IDMs versus non-IDMs in FLOPs, GPU-hours or tokens.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'they shared a chart of PRs merged per active author that seemed to show a substantial increase from late January to late March, which appeared to coincide with an increase in the percent of daily merged PRs written by AI',
          },
        ],
      },
      {
        itemSlug: 'capability-divergence',
        verdict: 'meets',
        rationale:
          'Anthropic states plainly that the internally deployed model substantially exceeds its public models on autonomous research and engineering, and published a capability leap in cyber before any release. This is the disclosure the framework asks for, made about a model the public could not otherwise observe.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              "Mythos Preview's capabilities on autonomous research and engineering far exceed that of our prior models…",
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'In our testing and early internal use of Claude Mythos Preview, we have seen it reach unprecedented levels of reliability and alignment, and accordingly have come to use it quite broadly, often with greater affordances and less frequent human-interaction than we gave prior models.',
          },
        ],
      },
      {
        itemSlug: 'task-categories',
        verdict: 'meets',
        rationale:
          'Internal task categories are named across sources: coding, infrastructure, alignment research, and autonomous research and engineering, with an explicit account of how engineering work has shifted to reviewing and orchestrating agents.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              "A large percentage of code written at Anthropic is written by AI. Researchers' and engineers' work has increasingly shifted to reviewing PRs and directing and orchestrating coding agents.",
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'Mythos Preview is used extensively as an autonomous agent, including in applications that use computational resources, but does not have permission to manage access controls.',
          },
        ],
      },
      {
        itemSlug: 'autonomy-level',
        verdict: 'partial',
        rationale:
          'Autonomy is described in relative and qualitative terms — broader use, greater affordances, less frequent human interaction, task horizons of hours to days — and Anthropic identifies a distinct tier of "most autonomous" internal usage carrying extra safeguards. It does not report the unsteered-rollout durations the framework asks for.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'It is highly capable, though not fully reliable, at a wide range of tasks that would take hours or days for a human specialist in the absence of LLM assistance.',
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'For the most autonomous kinds of internal AI usage, we use either some form of sandboxing or blocking auto-mode classifiers.',
          },
        ],
      },
      {
        itemSlug: 'pipeline-review',
        verdict: 'adjacent',
        rationale:
          'Anthropic describes human review of model work as an informal incentive rather than a requirement, and publishes neither a proportion of training-pipeline changes reviewed nor the reviewing methods used. METR independently found no company imposing strict human-oversight requirements in the assessment window.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'staff are familiar with common mistakes that Mythos Preview makes (writing vulnerable code, overclaiming research results…), and they are thus incentivized to review its work, not take the claims it makes at face value',
          },
          NO_OVERSIGHT_REQUIREMENT,
        ],
      },
      {
        itemSlug: 'safeguards-in-place',
        verdict: 'meets',
        rationale:
          'The most specific safeguard disclosure of any developer reviewed: named monitor models, per-channel sampling rates, a two-stage filtering pipeline, roughly 50 trajectories manually reviewed per week, plus sandboxing and blocking classifiers on the most autonomous usage. Anthropic also publicly concedes the coverage gaps in that setup.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'An Opus 4.6 prompt+completion monitor covering prompts and completions by most internal users, covering a 25% subsample of prompts and completions that contain an action tool calls and coming from the most common agent scaffolds, covering 0.2% of other internal API traffic with one or more markers of using tools',
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'Second-stage pipelines for both monitors, filtering out common sources of false positives and using a hierarchical summarization tool to surface the most concerning actions to AI control researchers, which will then manually review on the order of 50 trajectories per week',
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'While our setup covers the majority of agentic usage, it does not cover some of it in ways which could in principle be predicted by a sufficiently situational aware AI, and it also offers some simple ways to disable monitoring.',
          },
        ],
      },
      {
        itemSlug: 'stress-testing',
        verdict: 'meets',
        rationale:
          'Anthropic commissioned an external red-team of its internal monitoring pipeline, published the fact that novel vulnerabilities were found, and reported monitor performance against model organisms and synthetic adversarial transcripts in a results table.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'A METR staff member spent three weeks red-teaming our automated offline monitoring pipeline. The exercise discovered several specific novel vulnerabilities, some of which have since been patched, and none as severe as the ones we were already aware of.',
          },
          {
            ...METR_RISK_REPORT,
            quote:
              'Very basic [jailbreaks] (even without knowledge of the specific monitor prompt format) are extremely effective and robust…I view this as a pretty severe vulnerability',
          },
        ],
      },
      {
        itemSlug: 'misalignment-evaluations',
        verdict: 'meets',
        rationale:
          'Monitor recall against misaligned model organisms, Shade-Arena stealth-selected conversations and synthetic chains-of-thought is published as a rate table, alongside the flag rate on real monitored internal traffic. Evaluation awareness is treated explicitly.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'Shade-Arena conversations, CoT only, selected for stealthiness — 96% … Synthetic Chains-of-Thought (single-completion) — 72% … Monitored internal traffic (lower is better) — 1.2%',
          },
        ],
      },
      {
        itemSlug: 'prohibited-uses',
        verdict: 'partial',
        rationale:
          'One concrete prohibition is disclosed — the internal model cannot manage access controls — and weight-processing systems are described as time-limited access. There is no published enumeration of prohibited internal uses of the kind the framework contemplates.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'Mythos Preview is used extensively as an autonomous agent, including in applications that use computational resources, but does not have permission to manage access controls.',
          },
        ],
      },
      {
        itemSlug: 'employee-governance',
        verdict: 'partial',
        rationale:
          'The incident path for staff is described concretely — issues surface on an internal Slack channel and are triaged into investigations sized to severity. We did not find a published staff acceptable-use policy governing employee use of internally deployed models.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'the issue is reported on the internal Slack and staff consider a variety of factors in determining how much effort to devote to an investigation',
          },
          ANTHROPIC_RSP,
        ],
      },
      {
        itemSlug: 'concerning-behaviours',
        verdict: 'meets',
        rationale:
          'Anthropic names the behaviours it looks for, reports what it has and has not observed, and sets out the response ladder in advance: revert the caught action, sweep for similar actions, patch monitors, update training pipelines, and feed incidents into root-cause research. It also states plainly where that response pipeline is untested.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'we expect that such investigations would result in actions such as reverting the consequences of the caught actions, looking for similar actions and reverting their consequences, deploying security or monitor-based patches to prevent similar incidents in the short-term, updates to training pipelines to prevent similar incidents in the medium-term',
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'We did not evaluate how good these post-deployment follow-up investigations are at catching the behavior of misaligned models and finding effective mitigations.',
          },
          {
            ...METR_RISK_REPORT,
            quote:
              'consistently looks for models having goals that extend beyond the immediate task during training',
          },
        ],
      },
      {
        itemSlug: 'review-cadence',
        verdict: 'partial',
        rationale:
          'The Responsible Scaling Policy is versioned and revised frequently, and the risk update commits to medium-term training-pipeline updates following incidents. There is no published review cadence specific to internal deployment practices.',
        evidence: [ANTHROPIC_RSP, ANTHROPIC_RISK_UPDATE],
      },
      {
        itemSlug: 'access-control',
        verdict: 'partial',
        rationale:
          'Access is characterised qualitatively — "most internal users" are covered by monitoring, the model cannot manage access controls, and access to weight-processing systems is time-limited. No employee counts, seniority bands or tiered access structure are published.',
        evidence: [
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote: 'time-limited access to systems that process model weights.',
          },
          {
            ...ANTHROPIC_RISK_UPDATE,
            quote:
              'An Opus 4.6 completion-only monitor covering completions with extended thinking by most internal users',
          },
        ],
      },
    ],
  },

  // =========================================================================
  {
    slug: 'openai',
    name: 'OpenAI',
    shortName: 'OpenAI',
    note: `Strong on the safety-mitigation and governance questions, near-silent on capabilities. OpenAI publishes a coverage figure for internal agent monitoring that no one else matches — 99.9% of internal coding traffic — names the behaviours it catches, and commits to a 30-minute human review for high-severity flags. It publishes nothing about how its internal models relate to or diverge from its public ones, which is the question the framework treats as most load-bearing in the capabilities category.`,
    cells: [
      {
        itemSlug: 'relation-to-external',
        verdict: 'adjacent',
        rationale:
          'OpenAI describes relationships between its own public models — for instance that mini and nano variants derive from flagship models — but publishes nothing about whether internally deployed models are members of the same family, fine-tunes or distillations.',
        evidence: [OPENAI_PREPAREDNESS],
      },
      {
        itemSlug: 'benchmark-scores',
        verdict: 'adjacent',
        rationale:
          'Benchmark reporting is thorough for released models and absent for internal-only ones. No AI-R&D-automation benchmark scores are published for models deployed internally.',
        evidence: [OPENAI_PREPAREDNESS],
      },
      {
        itemSlug: 'compute-allocation',
        verdict: 'none',
        rationale:
          'No published figure or range for the proportion of internal inference allocated to internally deployed models. We found no adjacent metric either.',
        evidence: [OPENAI_PREPAREDNESS, { ...METR_RISK_REPORT }],
      },
      {
        itemSlug: 'capability-divergence',
        verdict: 'adjacent',
        rationale:
          'OpenAI gave METR access to its most capable internal models, so a third party has assessed them — but OpenAI itself publishes no statement about how internal model capabilities diverge from public-facing ones. The public learns that an assessment happened, not what it found about divergence.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'Each participant provided access to their most capable internal model(s) at the time of assessment, including raw chains of thought',
          },
        ],
      },
      {
        itemSlug: 'task-categories',
        verdict: 'meets',
        rationale:
          'Internal task categories are stated with unusual breadth and specificity, including the safety-critical case of models acting as graders and monitors inside training and evaluation pipelines.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'AI assistance is used in practically all parts of the company across technical and non-technical teams with code-executing agents used in training, evaluating, and securing future models….AI assistance is now embedded in day-to-day R&D workflows across OpenAI, including extensive use of coding agents to write code, debug, and diagnose experiment issues, as well as substantial use of models as graders/monitors in evaluation and training pipelines.',
          },
        ],
      },
      {
        itemSlug: 'autonomy-level',
        verdict: 'adjacent',
        rationale:
          'Internal agents are described as operating across R&D workflows under monitoring, but no unsteered-duration figures or autonomy tiers are published. METR found no strict human-oversight requirement in place during its assessment window.',
        evidence: [OPENAI_MONITOR, NO_OVERSIGHT_REQUIREMENT],
      },
      {
        itemSlug: 'pipeline-review',
        verdict: 'adjacent',
        rationale:
          'OpenAI discloses that models are used substantially as graders and monitors within training pipelines — the inverse of the question — but publishes no proportion of pipeline changes reviewed by human experts, and no description of reviewing methods.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'substantial use of models as graders/monitors in evaluation and training pipelines',
          },
          NO_OVERSIGHT_REQUIREMENT,
        ],
      },
      {
        itemSlug: 'safeguards-in-place',
        verdict: 'meets',
        rationale:
          'A specific, quantified account of the internal monitoring architecture: near-total traffic coverage, the named model doing the monitoring, full-context access including chain of thought, layered monitors, and a stated human-review service level for high-severity flags.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote:
              'OpenAI now monitors 99.9% of internal coding traffic for signs of misalignment using our most powerful models.',
          },
          {
            ...OPENAI_MONITOR,
            quote:
              'The monitor gets access to the full conversation context, that is everything the agent saw, and everything the agent did, including tool calls and CoT.',
          },
          {
            ...OPENAI_MONITOR,
            quote: 'Higher severity cases are sent for human review within 30 minutes.',
          },
        ],
      },
      {
        itemSlug: 'stress-testing',
        verdict: 'partial',
        rationale:
          'OpenAI acknowledges honeypot validation of its monitors and states an intention to do more of it. Creditably candid, but well short of the adversarial elicitation testing the framework describes, and no results are reported.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote: 'A bit',
          },
        ],
      },
      {
        itemSlug: 'misalignment-evaluations',
        verdict: 'partial',
        rationale:
          'OpenAI reports monitoring outcomes at scale — alert volumes by severity tier across tens of millions of trajectories, and that no real conversation has triggered the top tier — rather than scores on misalignment or monitorability evaluations for the internal models themselves.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote:
              "We haven't yet detected any real world examples of sabotage, scheming or sandbagging.",
          },
        ],
      },
      {
        itemSlug: 'prohibited-uses',
        verdict: 'adjacent',
        rationale:
          'The behaviours OpenAI reports catching imply boundaries — exfiltrating files to the public internet, circumventing monitors — but no list of prohibited internal uses is published, and the post notes agents can inspect and could attempt to modify their own safeguard documentation.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote: 'Attempting to upload files to the public internet',
          },
        ],
      },
      {
        itemSlug: 'employee-governance',
        verdict: 'meets',
        rationale:
          'The Raising Concerns Policy is published in full: a 24/7 anonymous integrity line alongside manager, HR, compliance and legal routes, escalation to the board audit committee, explicit anti-retaliation terms, and preserved rights to report to external regulators.',
        evidence: [
          {
            ...OPENAI_RAISING_CONCERNS,
            quote:
              'OpenAI introduced a new 24/7 Integrity Line, which allows employees to anonymously raise concerns if they prefer not to use existing channels, such as through their manager, HR, Compliance or Legal.',
          },
        ],
      },
      {
        itemSlug: 'concerning-behaviours',
        verdict: 'meets',
        rationale:
          'OpenAI enumerates the specific behaviours it monitors for and has observed in internal agents, operates graded severity tiers, and states the response for the top tier. This is the framework\'s priority governance disclosure, answered directly.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote: 'Encoding commands in base64 to circumvent monitors',
          },
          {
            ...OPENAI_MONITOR,
            quote: 'Calling other versions of themselves to bypass restrictions',
          },
          {
            ...OPENAI_MONITOR,
            quote: 'Higher severity cases are sent for human review within 30 minutes.',
          },
        ],
      },
      {
        itemSlug: 'review-cadence',
        verdict: 'partial',
        rationale:
          'OpenAI committed to a follow-up report on internal agent monitoring, establishing an informal reporting rhythm. The Preparedness Framework has not been revised since April 2025, and no review cadence specific to internal deployment practices is published.',
        evidence: [OPENAI_MONITOR, OPENAI_PREPAREDNESS],
      },
      {
        itemSlug: 'access-control',
        verdict: 'partial',
        rationale:
          'What internal agents can reach is described qualitatively — internal systems, and their own safeguard documentation — but there is no disclosure of how many employees have access to internal models, at what seniority, or under what tiering.',
        evidence: [
          {
            ...OPENAI_MONITOR,
            quote:
              "OpenAI's agents have access to internal systems, can inspect their own safeguard documentation, and could theoretically attempt to modify those safeguards.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  {
    slug: 'google-deepmind',
    name: 'Google DeepMind',
    shortName: 'DeepMind',
    note: `The only developer to extend its frontier safety framework to cover large-scale internal deployments explicitly, and the only one to publish a dedicated architecture for controlling agents running on its own systems. The AI Control Roadmap treats internal agents as insider threats and describes supervisors, cryptographic action signing and a kill switch. Against that, the capabilities category is essentially blank: nothing on model lineage, internal benchmarks, compute allocation, or how internal capabilities diverge from Gemini as shipped.`,
    cells: [
      {
        itemSlug: 'relation-to-external',
        verdict: 'none',
        rationale:
          'No published statement on whether models deployed internally for ML R&D are the same family as released Gemini models, or fine-tuned or distilled variants of them.',
        evidence: [GDM_FSF, GDM_CONTROL],
      },
      {
        itemSlug: 'benchmark-scores',
        verdict: 'none',
        rationale:
          'No benchmark scores published for internally deployed models. Reported benchmarks attach to released models only.',
        evidence: [GDM_FSF],
      },
      {
        itemSlug: 'compute-allocation',
        verdict: 'none',
        rationale:
          'No disclosure of the share of internal inference allocated to internally deployed models, in any unit or at any level of aggregation.',
        evidence: [GDM_FSF, GDM_CONTROL],
      },
      {
        itemSlug: 'capability-divergence',
        verdict: 'adjacent',
        rationale:
          'The framework now recognises that large-scale internal deployments for ML R&D can themselves pose risk, which concedes that internal capability matters — but no statement is made about how internal capabilities diverge from public-facing models in any domain.',
        evidence: [
          {
            ...GDM_FSF,
            quote:
              'For advanced machine learning research and development CCLs, large-scale internal deployments can also pose risk, so we are now expanding this approach to include such deployments.',
          },
        ],
      },
      {
        itemSlug: 'task-categories',
        verdict: 'meets',
        rationale:
          'Internal task categories are enumerated specifically, including training-data production and eval-framework construction — both cases where a compromised model would touch safety-relevant artefacts.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              '[W]e use AI assistance for producing training data, building eval frameworks, implementing algorithms, writing core infra code. Basically AI is used in almost all work that involves writing code or configuration, technical design, research ideation, to different degrees depending on the task.',
          },
        ],
      },
      {
        itemSlug: 'autonomy-level',
        verdict: 'partial',
        rationale:
          'DeepMind publishes a permission model in which autonomy is earned incrementally against verified behaviour, which is a more structured answer than most. It does not report how long internal agents run unsteered, or the distribution of autonomy across internal use.',
        evidence: [
          {
            ...GDM_CONTROL,
            quote:
              'our AI control system grants AI agents permissions based on their verified behavior, allowing us to build trust through controlled, incremental access.',
          },
          NO_OVERSIGHT_REQUIREMENT,
        ],
      },
      {
        itemSlug: 'pipeline-review',
        verdict: 'none',
        rationale:
          'No proportion of frontier training-pipeline changes under human expert review is published, and no reviewing methods are described — despite DeepMind disclosing that AI is used to produce training data and build eval frameworks.',
        evidence: [NO_OVERSIGHT_REQUIREMENT, GDM_CONTROL],
      },
      {
        itemSlug: 'safeguards-in-place',
        verdict: 'meets',
        rationale:
          'A named control architecture for agents on internal systems: trusted model supervisors reviewing reasoning and actions, synchronous blocking as well as asynchronous review, cryptographic signing of agent actions, and a kill switch. DeepMind also names the metrics it holds itself to — coverage, recall and time-to-response.',
        evidence: [
          {
            ...GDM_CONTROL,
            quote:
              "We use other, trusted AI systems as 'supervisors' to constantly review a working agent's reasoning, actions and plans to see if it is going off track.",
          },
          {
            ...GDM_CONTROL,
            quote:
              'coverage (the fraction of traffic monitored), recall (the fraction of misaligned behaviors caught), and time-to-response',
          },
          {
            ...GDM_CONTROL,
            quote:
              'real-time prevention, blocking harmful actions before they can be executed',
          },
        ],
      },
      {
        itemSlug: 'stress-testing',
        verdict: 'partial',
        rationale:
          'DeepMind reports analysing a million coding agent trajectories and building its threat taxonomy on MITRE ATT&CK, which is substantial empirical grounding. It does not report adversarial elicitation against its own supervisors — whether an agent can be made to fool them — which is what this item asks.',
        evidence: [
          {
            ...GDM_CONTROL,
            quote: 'analyzed a million coding agent tasks',
          },
        ],
      },
      {
        itemSlug: 'misalignment-evaluations',
        verdict: 'partial',
        rationale:
          'DeepMind states what it looks for in internal agents and characterises what it found — that most flagged events stem from misinterpretation or overeagerness rather than adversarial intent — but publishes no scores on misalignment or monitorability evaluations for internal models.',
        evidence: [
          {
            ...GDM_CONTROL,
            quote:
              'the majority of flagged events do not stem from adversarial intent; instead, they often result from agent misinterpretation or overeagerness.',
          },
          {
            ...METR_RISK_REPORT,
            quote:
              'looking specifically for scheming, sabotage, and attempts to undermine human oversight, through a variety of methods',
          },
        ],
      },
      {
        itemSlug: 'prohibited-uses',
        verdict: 'none',
        rationale:
          'No enumeration of prohibited internal uses is published. The control architecture implies boundaries enforced technically, but the boundaries themselves are not stated.',
        evidence: [GDM_CONTROL, GDM_FSF],
      },
      {
        itemSlug: 'employee-governance',
        verdict: 'none',
        rationale:
          'We found no published staff acceptable-use policy for internally deployed models, and no internal-deployment-specific incident reporting or whistleblowing channel, in DeepMind or Google material.',
        evidence: [GDM_FSF, GDM_CONTROL],
      },
      {
        itemSlug: 'concerning-behaviours',
        verdict: 'meets',
        rationale:
          'DeepMind names the behaviours it monitors for in internal agents and publishes the graded response: asynchronous remediation after the fact, synchronous blocking before execution, and a kill switch for the severe case. Responses are mapped to capability milestones rather than left to discretion.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'looking specifically for scheming, sabotage, and attempts to undermine human oversight, through a variety of methods',
          },
          {
            ...GDM_CONTROL,
            quote:
              'reviewing transcripts with a delay and remediating issues quickly after they occur',
          },
          {
            ...GDM_CONTROL,
            quote:
              'real-time prevention, blocking harmful actions before they can be executed',
          },
        ],
      },
      {
        itemSlug: 'review-cadence',
        verdict: 'partial',
        rationale:
          'The Frontier Safety Framework is revised on a visible cadence and was expanded in 2026 specifically to reach internal deployments, with the Control Roadmap following two months later. No reassessment interval for internal deployment practices themselves is committed to.',
        evidence: [GDM_FSF, GDM_CONTROL],
      },
      {
        itemSlug: 'access-control',
        verdict: 'partial',
        rationale:
          'DeepMind describes what internal models can reach — codebase, internal documents and communications, logs — and states that sensitive material is access-limited by existing controls rather than hidden from models specifically. No figures on how many employees have access, or at what seniority.',
        evidence: [
          {
            ...METR_RISK_REPORT,
            quote:
              'Models used by employees can access the codebase, and can also access internal documents and communications […], relevant logs (including training/eval logs where the user has access), and other infrastructure context across […] systems.',
          },
          {
            ...METR_RISK_REPORT,
            quote:
              'Sensitive documents, code, security detections, etc. are access-limited and not broadly available [internally]. Because of these broader access controls, we do not focus on hiding internal information away from model access specifically.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  {
    slug: 'meta',
    name: 'Meta',
    shortName: 'Meta',
    note: `Meta's framework is the most explicit of any reviewed about the existence of an internal-use reporting obligation: it commits to regularly assessing catastrophic risk from internal use and to summarising those assessments in an internal-use risk report. But that report goes to relevant authorities, not the public, and no instalment of it has been published. What the public gets is the commitment and the governance structure around it — a named accountable executive, a whistleblower protocol — rather than any account of what Meta's internal models do.`,
    cells: [
      {
        itemSlug: 'relation-to-external',
        verdict: 'none',
        rationale:
          'No published statement on the relationship between internally deployed models and Meta\'s released models.',
        evidence: [META_FRAMEWORK],
      },
      {
        itemSlug: 'benchmark-scores',
        verdict: 'none',
        rationale:
          'No benchmark scores published for internally deployed models.',
        evidence: [META_FRAMEWORK],
      },
      {
        itemSlug: 'compute-allocation',
        verdict: 'adjacent',
        rationale:
          'The framework records "expectations for compute requirements" as part of anticipating each frontier model, and treats internal deployment as a distinct deployment class — but publishes no allocation figure between internal and public inference.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'we outline anticipated capabilities, planned deployment (i.e., internal deployment, limited deployment, controlled deployment, closed release, or open release), supported modalities, intended uses and anticipated benefits of the model, and expectations for compute requirements',
          },
        ],
      },
      {
        itemSlug: 'capability-divergence',
        verdict: 'none',
        rationale:
          'No statement about how the capabilities of internally deployed models diverge from public-facing ones in any domain.',
        evidence: [META_FRAMEWORK],
      },
      {
        itemSlug: 'task-categories',
        verdict: 'adjacent',
        rationale:
          'Internal deployment is named as a deployment class the framework governs, and Meta gave METR access to its internal models — but Meta publishes no account of what tasks those models are actually put to.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'planned deployment (i.e., internal deployment, limited deployment, controlled deployment, closed release, or open release)',
          },
          METR_RISK_REPORT,
        ],
      },
      {
        itemSlug: 'autonomy-level',
        verdict: 'none',
        rationale:
          'No disclosure of how autonomously internal models operate, in duration, steering or tiering terms.',
        evidence: [META_FRAMEWORK, NO_OVERSIGHT_REQUIREMENT],
      },
      {
        itemSlug: 'pipeline-review',
        verdict: 'none',
        rationale:
          'No proportion of training-pipeline changes under human expert review, and no reviewing methods described.',
        evidence: [META_FRAMEWORK, NO_OVERSIGHT_REQUIREMENT],
      },
      {
        itemSlug: 'safeguards-in-place',
        verdict: 'partial',
        rationale:
          'Meta commits to internal-use risk assessment resting on monitoring and preparedness evaluations tied to internal deployment threat models, and treats loss of control as a risk that materialises through internal deployment as readily as any other. What that monitoring consists of is not described.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'Our internal-use risk report will describe evidence regarding risks from internal use of our Frontier AI models, particularly relying on monitoring and preparedness evaluations tied to internal deployment threat models.',
          },
          {
            ...META_FRAMEWORK,
            quote:
              'Loss of Control risks may occur with similar probability with any type of deployment, including internal deployment.',
          },
        ],
      },
      {
        itemSlug: 'stress-testing',
        verdict: 'adjacent',
        rationale:
          'The framework describes red-teaming with internal and external experts and evaluations for adversarial robustness and controllability, but these attach to model releases rather than to the safeguards protecting internal deployments.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'exercises both internally and with external experts with relevant domain expertise',
          },
        ],
      },
      {
        itemSlug: 'misalignment-evaluations',
        verdict: 'partial',
        rationale:
          'Meta commits that preparedness reports will highlight undesirable behaviours incentivised by post-training, naming reward hacking and scheming, and will disclose training changes that reduce interpretability. These are commitments about future reports rather than published results for internal models.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'highlight undesirable model behaviors incentivized by post-training such as reward hacking or scheming',
          },
          {
            ...META_FRAMEWORK,
            quote:
              'including changes to the training process that reduce interpretability (including e.g., evidence that the training process may cause obfuscation of a model’s reasoning)',
          },
        ],
      },
      {
        itemSlug: 'prohibited-uses',
        verdict: 'none',
        rationale:
          'No enumeration of prohibited internal uses of frontier models.',
        evidence: [META_FRAMEWORK],
      },
      {
        itemSlug: 'employee-governance',
        verdict: 'meets',
        rationale:
          'A complete published account of the employee channel: confidential and optionally anonymous internal reporting, mandatory escalation to the internal governance function and named executives, status updates back to the reporter, and explicit anti-retaliation protection.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'employees will be able to confidentially, and, if they choose, anonymously issue reports through internal channels, and all reports will be ultimately submitted to the internal governance function, the Chief AI Officer, and the Director of Alignment and Risk',
          },
          {
            ...META_FRAMEWORK,
            quote:
              'all employees who in good faith report non-compliance or decline to engage in unlawful conduct will be explicitly protected from adverse employment action and retaliation',
          },
        ],
      },
      {
        itemSlug: 'concerning-behaviours',
        verdict: 'partial',
        rationale:
          'Meta names the behaviour classes of concern — reward hacking, scheming, oversight-relevant loss of control — and commits to reporting internal-use evidence about them. But the reporting runs to relevant authorities rather than the public, and no planned response to observing such behaviour internally is published.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'We will also regularly assess the potential for catastrophic risk from internal use of Frontier AI models and, as appropriate, provide relevant authorities with a summary of these assessments through an internal-use risk report.',
          },
          {
            ...META_FRAMEWORK,
            quote:
              'highlight undesirable model behaviors incentivized by post-training such as reward hacking or scheming',
          },
        ],
      },
      {
        itemSlug: 'review-cadence',
        verdict: 'meets',
        rationale:
          'The review architecture is published in full: regular internal-use risk assessment, prompt preparedness-report updates whenever circumstances materially alter a prior risk assessment, expedited updates on unprecedented capability jumps, a mandatory pre-launch risk review, and periodic compliance review by an internal governance function with board oversight above it.',
        evidence: [
          {
            ...META_FRAMEWORK,
            quote:
              'We will update a preparedness report promptly when there is a change in circumstances that materially alters our previous risk assessment.',
          },
          {
            ...META_FRAMEWORK,
            quote:
              'We will also provide expedited updates if we identify any unprecedentedly rapid increase in capabilities relevant to the areas outlined in this Framework.',
          },
          {
            ...META_FRAMEWORK,
            quote:
              "Meta's internal governance function periodically reviews our risk management practices and provides compliance oversight for product teams.",
          },
        ],
      },
      {
        itemSlug: 'access-control',
        verdict: 'none',
        rationale:
          'No disclosure of who inside Meta can access internally deployed frontier models, in numbers, seniority or access tiers.',
        evidence: [META_FRAMEWORK],
      },
    ],
  },

  // =========================================================================
  {
    slug: 'xai',
    name: 'xAI',
    shortName: 'xAI',
    note: `Thin overall, but with one disclosure no other developer matches: xAI is alone in committing to assess and report the share of its own code or pull requests generated by its models, which is precisely the AI-R&D-automation signal the framework wants tracked. Beyond that commitment and a whistleblowing provision, the framework gives internal deployment a single sentence. Nothing is published about what xAI's internal models can do, how autonomously they run, or what happens when one misbehaves.`,
    cells: [
      {
        itemSlug: 'relation-to-external',
        verdict: 'none',
        rationale:
          'No statement about the relationship between internally deployed models and released Grok models.',
        evidence: [XAI_FAIF],
      },
      {
        itemSlug: 'benchmark-scores',
        verdict: 'adjacent',
        rationale:
          'xAI commits to sharing leading benchmark results on new major releases, which covers released models. No benchmark reporting for internal-only models, and no AI-R&D-automation benchmarks named.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'Benchmark results: Share with relevant audiences leading benchmark results for general capabilities and the benchmarks listed above, upon new major releases.',
          },
        ],
      },
      {
        itemSlug: 'compute-allocation',
        verdict: 'none',
        rationale:
          'No disclosure of internal inference allocation between internally deployed and public models.',
        evidence: [XAI_FAIF],
      },
      {
        itemSlug: 'capability-divergence',
        verdict: 'none',
        rationale:
          'No statement about how internal model capabilities diverge from public-facing Grok models in any domain.',
        evidence: [XAI_FAIF],
      },
      {
        itemSlug: 'task-categories',
        verdict: 'adjacent',
        rationale:
          'The commitment to measure the share of xAI code and pull requests generated by its models implies internal software engineering as a task category, but xAI publishes no account of what its internal models are deployed to do.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'Internal AI usage: Assess the percent of code or percent of pull requests at xAI generated by our models, or other potential metrics related to AI research and development automation.',
          },
        ],
      },
      {
        itemSlug: 'autonomy-level',
        verdict: 'none',
        rationale:
          'No disclosure of how autonomously internal models operate.',
        evidence: [XAI_FAIF, NO_OVERSIGHT_REQUIREMENT],
      },
      {
        itemSlug: 'pipeline-review',
        verdict: 'adjacent',
        rationale:
          'xAI is the only developer committing to quantify AI-generated code and pull requests internally — the closest anyone comes to this item. But it measures how much the model writes, not what proportion of pipeline changes a human expert reviews, and no reviewing methods are described.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'Internal AI usage: Assess the percent of code or percent of pull requests at xAI generated by our models, or other potential metrics related to AI research and development automation.',
          },
        ],
      },
      {
        itemSlug: 'safeguards-in-place',
        verdict: 'adjacent',
        rationale:
          'The framework commits to reviewing catastrophic risks before extensive internal rollout, and lists real-time monitoring and alerting of threshold breaches via internal tooling. Neither describes what safeguards protect internally deployed models in operation.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'For internal use, we review catastrophic risks like oversight evasion before extensive rollout.',
          },
          {
            ...XAI_FAIF,
            quote:
              'Real-time monitoring, telemetry, and alerting of threshold breaches via internal tooling;',
          },
        ],
      },
      {
        itemSlug: 'stress-testing',
        verdict: 'adjacent',
        rationale:
          'Red-teaming and internal testing appear in a list of assurance activities, without reference to internal deployment safeguards and without published results.',
        evidence: [
          {
            ...XAI_FAIF,
            quote: 'Red-teaming and internal testing;',
          },
        ],
      },
      {
        itemSlug: 'misalignment-evaluations',
        verdict: 'none',
        rationale:
          'No misalignment or monitorability evaluation results published for internally deployed models.',
        evidence: [XAI_FAIF],
      },
      {
        itemSlug: 'prohibited-uses',
        verdict: 'none',
        rationale:
          'No enumeration of prohibited internal uses.',
        evidence: [XAI_FAIF],
      },
      {
        itemSlug: 'employee-governance',
        verdict: 'meets',
        rationale:
          'Both channels the framework contemplates are published: an internal anonymous route for reporting non-adherence with retaliation protection, and a preserved external route to government agencies for imminent public-safety threats.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'Internally, we allow xAI employees to anonymously report concerns about nonadherence, with protections from retaliation.',
          },
          {
            ...XAI_FAIF,
            quote:
              'xAI employees have whistleblower protections enabling them to raise concerns to relevant government agencies regarding imminent threats to public safety.',
          },
        ],
      },
      {
        itemSlug: 'concerning-behaviours',
        verdict: 'partial',
        rationale:
          'xAI names oversight evasion as a concerning behaviour reviewed before extensive internal rollout — a direct hit on the threat model this framework cares about. But it is a single clause: no wider set of monitored behaviours, and no planned response to observing any of them.',
        evidence: [
          {
            ...XAI_FAIF,
            quote:
              'For internal use, we review catastrophic risks like oversight evasion before extensive rollout.',
          },
        ],
      },
      {
        itemSlug: 'review-cadence',
        verdict: 'partial',
        rationale:
          'xAI commits to regular review of its own adherence to the framework and to updating the framework on incidents and before major capability launches. Nothing specific to reviewing internal deployment practices, and no interval given.',
        evidence: [
          {
            ...XAI_FAIF,
            quote: 'Frontier AI Framework adherence: Regularly review our adherence with this FAIF.',
          },
          {
            ...XAI_FAIF,
            quote:
              'this FAIF will be continually adapted and updated as circumstances change, before major new capabilities are launched, and in response to incidents.',
          },
        ],
      },
      {
        itemSlug: 'access-control',
        verdict: 'none',
        rationale:
          'No disclosure of who inside xAI can access internally deployed models.',
        evidence: [XAI_FAIF],
      },
    ],
  },

  // =========================================================================
  {
    slug: 'deepseek',
    name: 'DeepSeek',
    shortName: 'DeepSeek',
    note: `DeepSeek has published no frontier safety framework, did not sign the Seoul Frontier AI Safety Commitments, and does not publish system cards comparable to the other developers reviewed. There is consequently no document in which any of these fifteen questions could be answered. Every cell below is scored "None" against the same evidence — the absence of a published framework — rather than assessed individually. This row is a floor, not a judgment about DeepSeek's internal practices, which are simply unobservable from outside.`,
    cells: [
      'relation-to-external',
      'benchmark-scores',
      'compute-allocation',
      'capability-divergence',
      'task-categories',
      'autonomy-level',
      'pipeline-review',
      'safeguards-in-place',
      'stress-testing',
      'misalignment-evaluations',
      'prohibited-uses',
      'employee-governance',
      'concerning-behaviours',
      'review-cadence',
      'access-control',
    ].map((itemSlug) => ({
      itemSlug,
      verdict: 'none' as const,
      rationale:
        'DeepSeek has published no frontier safety framework and is not among the developers that made Seoul frontier safety commitments, so no public document addresses this question.',
      evidence: [
        METR_FSP_LIST,
        {
          ...FSF_SURVEY,
          quote:
            'DeepSeek has neither signed the Seoul commitments nor published frontier safety frameworks.',
        },
      ],
    })),
  },
];
