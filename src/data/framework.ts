/**
 * The four-category disclosure framework — extracted from
 * Charnock, Mehta Moreno, Miller & Anderson (2026), Table 1 + §3.
 *
 * Source: 2604.23065v1.pdf (April 2026 preprint).
 * Status: extracted verbatim where possible, lightly compressed for layout.
 *         Marked DRAFT until co-author proofing.
 */

export type DisclosureItem = {
  /** Stable slug for permalink (#capabilities-relation-to-external) */
  slug: string;
  /** The question itself, lifted from Table 1 */
  question: string;
  /** Examples / clarification — the parenthetical from Table 1 */
  examples: string;
  /** Whether this disclosure is appropriate for public reports vs. confidential only */
  scope: 'public' | 'confidential' | 'both';
};

export type Category = {
  slug: string;
  number: string;
  name: string;
  /** One-sentence definition of the category */
  description: string;
  /** What this category covers, paraphrased from §3 lead paragraph */
  scope: string;
  /** Benefits of disclosing this category (compressed from §3) */
  benefits: string[];
  /** Risks or concerns with disclosing this category */
  risks: string[];
  /** How those risks can be mitigated — i.e. why disclosure is still net-positive */
  mitigations: string[];
  disclosures: DisclosureItem[];
};

export const idmDefinition = {
  short:
    'Internally deployed models — models deployed within frontier labs to conduct privileged tasks.',
  long: `We define internally deployed models (IDMs) as models that are deployed within labs to conduct privileged tasks. Privileged tasks are tasks that materially shape the developer's AI research, development, or operational infrastructure — namely AI R&D, machine learning engineering, training data generation, model evaluations, alignment and safety research, and maintenance of core development and deployment infrastructure.`,
};

export const categories: Category[] = [
  {
    slug: 'capabilities',
    number: 'I',
    name: 'Capabilities',
    description:
      'What the internally deployed model can do, and how that compares to what the public sees.',
    scope:
      "This category covers key information about the capabilities of IDMs, including how IDMs relate to the developer's publicly available models, perform on key benchmarks, and their computational resources.",
    benefits: [
      'Capability information indicates the potential risk profile of IDMs and the pace of internal AI progress. Compute allocation between IDMs and public models lets third parties make more accurate predictions about IDM capabilities, given that inference-time compute scaling can amplify a model\'s effective capabilities far beyond training compute.',
      'Shifts in compute and staff allocation toward internal use can signal the pace at which AI R&D is being automated.',
      'Disclosing whether IDMs are part of the same model family as external models (e.g., distilled or fine-tuned variants) helps third parties infer the alignment and safety training these models likely underwent.',
      'Tracking internal performance on specific benchmarks (e.g., RE-Bench or SWE-Bench Pro) enables third parties to identify capability jumps in domains where autonomous AI may pose significant risks.',
    ],
    risks: [
      'Compute allocation and model family details could reveal sensitive R&D strategy and provide competitors with sensitive business information (e.g., knowledge of a new pre-training run well before release).',
      'Public disclosures revealing a significant shift in compute toward internal use could intensify competitive pressure, as competitors may feel compelled to accelerate their own internal AI R&D in response.',
      'Regularly benchmarking IDMs may be burdensome — high-complexity agentic evaluations such as RE-Bench and SWE-Bench Pro are currently difficult to run reliably and require significant compute infrastructure.',
    ],
    mitigations: [
      'Developers can initially provide model family information to auditors and regulators, and release it publicly after a short delay (as previous model cards have done).',
      'To avoid revealing detailed compute allocation, developers can disclose normalised or high-level summaries that still enable independent oversight of capability acceleration.',
      'In cases where compute allocation cannot be summarised (e.g., GPU hours) or may exacerbate race dynamics, developers should provide disclosures to third parties under NDAs, or in non-public reports to regulators.',
      'Developers could default to reporting benchmark scores for major internal model updates, or every 90 days — whichever is sooner. In practice, reporting on RE-Bench and SWE-Bench Pro is already standard for frontier model releases.',
    ],
    disclosures: [
      {
        slug: 'relation-to-external',
        question: 'How are internal deployments related to external models?',
        examples:
          'i.e., are they part of the same model family, fine-tuned, or distilled variants, etc.',
        scope: 'public',
      },
      {
        slug: 'benchmark-scores',
        question:
          'How do IDMs score on a few public benchmarks you consider especially relevant to automating AI R&D?',
        examples: 'e.g., RE-Bench, SWE-Bench Pro',
        scope: 'public',
      },
      {
        slug: 'compute-allocation',
        question:
          'What is the proportion of internal inference allocated to IDMs vs. non-IDMs?',
        examples:
          'measured in FLOPs, GPU-hours, or tokens, reported as a mean taken over the month before publication',
        scope: 'both',
      },
      {
        slug: 'capability-divergence',
        question:
          "Broadly, how do IDMs' capabilities diverge from public-facing models in relevant domains?",
        examples: 'i.e., step changes in key domains such as cyber-offense',
        scope: 'public',
      },
    ],
  },
  {
    slug: 'usage',
    number: 'II',
    name: 'Usage',
    description:
      'How the model is being used inside the lab — what tasks, what autonomy, what oversight.',
    scope:
      'This category covers key information about how models are used, including details about the tasks they are given (e.g., coding, AI R&D, generating training data) and the degree of human oversight for these tasks.',
    benefits: [
      'Knowledge of the tasks IDMs perform helps third parties identify potentially high-risk applications such as models contributing to frontier model training pipelines or generating synthetic training data.',
      "Information about the degree of autonomy IDMs have — such as the proportion of model-generated changes that undergo human review, and the duration models operate unsteered — can indicate the potential scale of risks and demonstrate responsible internal use practices to stakeholders.",
    ],
    risks: [
      'Disclosing tasks could indicate proprietary workflows, such as where in the training pipeline models are used and for what purposes. It could also signal entirely novel use cases to competitors.',
      'Disclosing that models operate with a high degree of autonomy or limited human oversight could attract public or regulatory scrutiny.',
    ],
    mitigations: [
      'Developers can limit public disclosures to high-level summaries of how models are used (e.g., for coding assistance, to generate synthetic data). This would only slightly expand on public declarations developers already make about IDM use.',
      'More sensitive information about specific pipelines models are used within and how much autonomy they have can be disclosed to trusted third parties. Developers could safely disclose this information by expanding arrangements such as Anthropic\'s collaboration with METR on their Sabotage Risk Report.',
      'Limiting public disclosures to high-level summaries can reduce the risk of public reputational damage, but cannot remove the risk that regulators or third parties find internal practices concerning. Despite this, identifying concerning use cases is ultimately in developers\' interest, as it allows them to address risks before they escalate.',
    ],
    disclosures: [
      {
        slug: 'task-categories',
        question: 'On which kinds of tasks are IDMs deployed?',
        examples:
          'e.g., coding, research assistance, AI evaluations, AI R&D, and training data generation',
        scope: 'public',
      },
      {
        slug: 'autonomy-level',
        question: 'How autonomous are IDMs?',
        examples:
          'i.e., are rollouts generally unsteered by humans for seconds, minutes, hours, or days?',
        scope: 'public',
      },
      {
        slug: 'pipeline-review',
        question:
          'What proportion of changes to your frontier model training pipeline(s) is reviewed by a human expert?',
        examples: '',
        scope: 'both',
      },
    ],
  },
  {
    slug: 'safety-mitigations',
    number: 'III',
    name: 'Safety mitigations',
    description:
      'The technical and procedural safeguards applied to internal deployments — and how rigorously those safeguards have been tested.',
    scope:
      'This category covers key information about the safety mitigations in place for IDMs, including general alignment training measures, monitoring or oversight mechanisms, and the extent to which those safety mitigations have been stress tested for vulnerabilities.',
    benefits: [
      'Disclosing the strength of safeguards and specific examples (e.g., output monitoring systems, human-in-the-loop requirements, linear probes) provides external assurance that developers are taking adequate mitigations for IDMs.',
      'Disclosing whether and how these mitigations have been stress tested (e.g., revealing the elicitation efforts developers run to test if their safeguards can be bypassed) provides further external assurance that developers\' safety mitigations remain effective.',
      'Developers should provide scores on misalignment and monitorability evaluations to help ensure that safeguards implemented are appropriate to the observed levels of misalignment risk. These results can also provide evidence for safety cases about internal use.',
      'Disclosing information about IDM safeguards and mitigations can also help developers improve their own safety practices, as expert third parties use this information to identify potential weaknesses or vulnerabilities.',
    ],
    risks: [
      'Declaring information about internal security mitigations and monitoring practices could present security challenges and cause reputational damage. Disclosing specific safeguards (e.g., internal monitoring setups or classifiers), the ways developers stress test their classifiers, and security measures implemented to protect models from theft, could inadvertently expose security vulnerabilities.',
      'Developers may be reluctant to disclose information about stress-testing results or identified vulnerabilities if this evidence points towards inadequate safeguards or weak internal safety practices.',
    ],
    mitigations: [
      "Not all information about safety mitigations carries the same risk from disclosure. Information on alignment practices (e.g., constitutional AI, RLAIF) generally won't reveal specific vulnerabilities, while disclosing specific safeguards (e.g., internal monitoring setups or classifiers) could expose vulnerabilities.",
      'To overcome security risks from sharing more security-critical information about safeguards, developers can provide documents to trusted third parties through secure document management and transfer tools (e.g., encrypted file transfers or secure collaboration platforms) that are routinely used in auditing contexts.',
      'Public disclosures can also be limited to redacted materials or high-level accounts of safeguards to preserve sensitive details. OpenAI, for instance, has described how it monitors internal coding agents for signs of misalignment.',
      'As noted above, sharing findings with regulators can limit public reputational damage but cannot prevent regulators from finding internal practices inadequate. However, any residual risk is likely outweighed by the benefits of identifying weaknesses early.',
    ],
    disclosures: [
      {
        slug: 'safeguards-in-place',
        question: 'What safety mitigations are in place for IDMs?',
        examples:
          'e.g., output monitoring systems, control mechanisms, human-in-the-loop requirements, interaction logging, and specific monitoring techniques such as probes or classifiers',
        scope: 'both',
      },
      {
        slug: 'stress-testing',
        question: 'How have you stress tested your safeguards?',
        examples:
          'e.g., have you explicitly tested if you can get the model to consistently fool monitors through prompting, fine-tuning, and similar elicitation techniques?',
        scope: 'both',
      },
      {
        slug: 'misalignment-evaluations',
        question:
          'How do IDMs score on misalignment- and monitorability-related evaluations?',
        examples:
          'e.g., evaluation awareness, persuasion, and CoT-monitorability/faithfulness evaluations',
        scope: 'public',
      },
    ],
  },
  {
    slug: 'governance',
    number: 'IV',
    name: 'Governance',
    description:
      'How internal deployment is governed — who can use IDMs, what uses are prohibited, how policies are reviewed.',
    scope:
      "This category covers key information about developers' internal governance of IDMs, including the prohibited uses for IDMs, acceptable use policies, and whether and how governance practices are reviewed and updated over time.",
    benefits: [
      'Governance information provides assurance to stakeholders that internal deployments are governed responsibly. It also enables policymakers and third parties to assess whether internal risk management systems are adequate.',
      'Disclosing prohibited uses allows external parties to assess whether developers have considered key threat models such as self-modification of model weights or unsupervised access to GPU clusters.',
      'Governance disclosures can reveal the concrete steps developers take to mitigate risks (e.g., 24-hour alignment stress-testing windows before wide internal deployment), helping external parties gauge the maturity of internal practices and surface potential gaps.',
      'Disclosing who has access to IDMs can help third parties assess insider risk and the concentration of control over powerful internal systems.',
      'Transparency into governance mechanisms for staff (e.g., acceptable use policies, access restrictions, and incident reporting channels / whistleblower protections) can also increase accountability by confirming that risks can be flagged by employees through designated channels.',
    ],
    risks: [
      'Developers may be reluctant to disclose governance practice if this reveals inadequate internal processes (e.g., insufficient safeguards, or no whistleblower protections) that could cause reputational damage.',
      'Pressure to publicly disclose information about internal governance could discourage developers from scrutinising their own internal practices too closely, to avoid having to disclose unfavourable findings.',
      'Governance disclosures could enable "marginal risk arguments", where developers point to competitors\' lower internal governance to justify that their own practices are sufficient and do not need to be improved.',
    ],
    mitigations: [
      'Most of these risks are manageable or unlikely to be significant in practice. OpenAI describes its internal monitoring and escalation processes including the functions of its Safety Oversight and Security Incident Response teams, and its Raising Concerns Policy.',
      'To avoid disclosing more sensitive details about internal governance structures including which employees can access internal models, and details of internal/external audits, developers can limit public disclosure to high-level summaries and provide more detailed sensitive information with trusted third parties and regulators through secure channels routinely used in auditing practices in other industries.',
      'Developers may still be reluctant to disclose governance practices that reveal inadequate internal processes. In such cases, third parties can agree to keep reviews confidential to reduce reputational risks, leading to more open and collaborative reviews.',
    ],
    disclosures: [
      {
        slug: 'prohibited-uses',
        question: 'Which uses of IDMs are prohibited?',
        examples:
          'e.g., autonomous code deployment to production, unsupervised access to customer data, self-modification of model weights, and access to GPU clusters',
        scope: 'public',
      },
      {
        slug: 'employee-governance',
        question: 'What are your internal governance mechanisms for employees?',
        examples:
          'e.g., staff acceptable use policies, incident reporting and response channels',
        scope: 'public',
      },
      {
        slug: 'concerning-behaviours',
        question:
          'What concerning model behaviours do you monitor and what are your planned responses to observing concerning behaviour?',
        examples: '',
        scope: 'public',
      },
      {
        slug: 'review-cadence',
        question:
          'How are internal deployment practices reviewed or updated over time?',
        examples:
          'e.g., periodic risk reassessments, post-incident reviews, policy revision cadence, and internal/external audits',
        scope: 'public',
      },
      {
        slug: 'access-control',
        question: 'Who has access to IDMs?',
        examples:
          'i.e., approximate number of employees and their level of seniority, tiered access restrictions',
        scope: 'both',
      },
    ],
  },
];
