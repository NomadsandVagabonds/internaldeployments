/**
 * Legislation tracker — extracted from idm_legislation_tracker_v3_primary_links.html.
 * Each entry has been graded against the four-category disclosure framework.
 *
 * Source of truth: this file. The v3 HTML prototype is archived.
 * Refresh cadence: quarterly, aligned with SB 53 OES reporting cycles.
 */

export type TrackerStatus =
  | 'Enacted'
  | 'Pending'
  | 'Vetoed'
  | 'Did not pass'
  | 'Voluntary';

export type TrackerGrade = 'A' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';

export type FocusArea =
  | 'Frontier model'
  | 'Internal use'
  | 'Audit'
  | 'Systemic risk'
  | 'General AI governance'
  | 'Incident reporting'
  | 'Cybersecurity'
  | 'Standards';

export type TrackerEntry = {
  /** Stable slug for permalink */
  slug: string;
  /** Bill name or title */
  name: string;
  /** Short alias used in headers (e.g., "SB 53") */
  shortName: string;
  jurisdiction: string;
  status: TrackerStatus;
  grade: TrackerGrade;
  /** Numeric score 0–100 backing the grade */
  score: number;
  focus: FocusArea[];
  tags: string[];
  /** Editorial assessment of how the instrument relates to IDMs */
  notes: string;
  /** What the instrument would need to be a full IDM disclosure regime */
  gap: string;
  /** Link to primary text */
  url: string;
  /** Source description for the URL */
  primary: string;
};

export const gradeRubric: Array<{ grade: TrackerGrade; description: string }> = [
  { grade: 'A', description: 'Explicit IDM reporting across capabilities, usage, safeguards and governance.' },
  { grade: 'B+', description: 'Explicit internal-use reporting, but still framed as catastrophic-risk summaries.' },
  { grade: 'B', description: 'Meaningful frontier or systemic-risk regime with internal-use hooks.' },
  { grade: 'C', description: 'Could reach IDMs indirectly through safety, audit or assurance duties.' },
  { grade: 'D', description: 'Adjacent governance only; weak IDM visibility.' },
];

export const tracker: TrackerEntry[] = [
  {
    slug: 'ca-sb-53',
    name: 'SB 53, Transparency in Frontier Artificial Intelligence Act',
    shortName: 'SB 53',
    jurisdiction: 'California',
    status: 'Enacted',
    grade: 'B+',
    score: 86,
    focus: ['Frontier model', 'Internal use', 'Systemic risk', 'Incident reporting'],
    tags: ['explicit internal-use reports', 'public framework', 'confidential OES channel', 'whistleblowers'],
    notes:
      'Strongest live U.S. internal-deployment hook. Requires a public frontier AI framework that covers extensive internal use and oversight-circumvention risk, plus confidential summaries to OES every three months. Still not a dedicated IDM report because it does not require capabilities, usage, safeguards and governance to be separately reported in a structured way.',
    gap: 'Add a statutory IDM schedule with model lineage, internal task categories, autonomy levels, tool access, compute allocation ranges, safeguard testing and governance details.',
    url: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53',
    primary: 'California Legislative Information, chaptered text',
  },
  {
    slug: 'il-sb-3261',
    name: 'SB 3261 / HB 4705, Artificial Intelligence Public Safety and Child Protection Transparency Act',
    shortName: 'SB 3261 / HB 4705',
    jurisdiction: 'Illinois',
    status: 'Pending',
    grade: 'B+',
    score: 85,
    focus: ['Frontier model', 'Internal use', 'Systemic risk', 'Audit'],
    tags: ['explicit internal-use summaries', 'quarterly cadence', 'AG channel', 'third-party audits'],
    notes:
      'Surprisingly close to SB 53 for IDMs. Requires large frontier developers to confidentially submit summaries of catastrophic-risk assessments from internal use and to transmit those summaries to the Attorney General at least every three months. Includes incident reporting, redaction rules and audit machinery. Grades below an A because the required internal-use summaries are risk-summary based, not structured IDM disclosure.',
    gap: 'Convert the internal-use summary requirement into a true IDM report organised around capabilities, usage, safety mitigations and governance.',
    url: 'https://www.ilga.gov/Legislation/BillStatus/FullText?DocNum=3261&DocTypeID=SB&GAID=18&LegId=166031&SessionID=114',
    primary: 'Illinois General Assembly, SB 3261 full text',
  },
  {
    slug: 'ny-raise',
    name: 'A6453B / S6953B, Responsible AI Safety and Education Act',
    shortName: 'NY RAISE',
    jurisdiction: 'New York',
    status: 'Enacted',
    grade: 'B',
    score: 77,
    focus: ['Frontier model', 'Systemic risk', 'Incident reporting'],
    tags: ['frontier model use', 'safety protocol', 'unredacted access on request', 'employee protections'],
    notes:
      'Important frontier model law, but the final text is weaker for IDMs than SB 53. Defines deployment to include use, requires safety and security protocols, gives officials access to less-redacted protocol material on request, and covers unauthorised use, control failures and autonomous behaviour as safety incidents. However, it excludes use for training, developing and evaluating frontier models from the definition of deploy, so its direct coverage of AI R&D internal deployment is narrower than the paper\'s IDM concept.',
    gap: 'Add an independent internal-deployment reporting section so AI R&D, evaluation, alignment and infrastructure use are not lost in the deployment carveout.',
    url: 'https://www.nysenate.gov/legislation/bills/2025/A6453/amendment/B',
    primary: 'New York State Senate, A6453B text',
  },
  {
    slug: 'eu-ai-act',
    name: 'EU AI Act, Regulation (EU) 2024/1689',
    shortName: 'EU AI Act',
    jurisdiction: 'European Union',
    status: 'Enacted',
    grade: 'B',
    score: 76,
    focus: ['Frontier model', 'Systemic risk', 'Cybersecurity', 'Incident reporting'],
    tags: ['Article 55', 'GPAI systemic risk', 'model evaluations', 'serious incidents'],
    notes:
      'Strong systemic-risk framework for GPAI models with systemic risk. Article 55 requires model evaluations, adversarial testing, systemic-risk assessment and mitigation, serious-incident reporting and cybersecurity. IDM relevance is implicit: internal deployment for AI R&D could be part of systemic-risk assessment, but the Act does not make internal deployment a named reporting object.',
    gap: 'AI Office guidance should clarify that internal AI R&D automation, internal tool access and model-assisted model development are reportable systemic-risk sources.',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    primary: 'EUR-Lex, Regulation (EU) 2024/1689',
  },
  {
    slug: 'eu-gpai-code',
    name: 'EU General-Purpose AI Code of Practice, Safety and Security Chapter',
    shortName: 'EU GPAI Code',
    jurisdiction: 'European Union',
    status: 'Voluntary',
    grade: 'B',
    score: 74,
    focus: ['Frontier model', 'Systemic risk', 'Standards'],
    tags: ['systemic-risk practices', 'signatory taskforce', 'AI Act compliance', 'safety chapter'],
    notes:
      'Useful implementation layer for Article 55. The Safety and Security chapter is aimed at the most advanced GPAI models and gives providers a way to demonstrate compliance with systemic-risk obligations. Not a law by itself and still does not require dedicated IDM disclosure.',
    gap: 'Create an official IDM annex requiring disclosures on internal AI R&D usage, scaffolding, autonomy, monitorability, access controls and governance review cadence.',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    primary: 'European Commission, GPAI Code of Practice page',
  },
  {
    slug: 'ca-sb-1047',
    name: 'SB 1047, Safe and Secure Innovation for Frontier AI Models Act',
    shortName: 'SB 1047',
    jurisdiction: 'California',
    status: 'Vetoed',
    grade: 'B-',
    score: 70,
    focus: ['Frontier model', 'Systemic risk', 'Audit'],
    tags: ['safety determinations', 'covered models', 'annual certification', 'incident reporting'],
    notes:
      'Historically important but not law. Would have created duties for covered model developers around safety, shutdown capability, safety protocols and incidents. Internal-deployment relevance is mostly indirect because it focused on covered model development and release rather than a separate internal-use reporting regime.',
    gap: 'If revived, pair model-level safety duties with periodic internal deployment reporting and confidential regulator access.',
    url: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1047',
    primary: 'California Legislative Information, enrolled/vetoed text',
  },
  {
    slug: 'il-hb-3506',
    name: 'HB 3506, Artificial Intelligence Safety and Security Protocol Act',
    shortName: 'IL HB 3506',
    jurisdiction: 'Illinois',
    status: 'Did not pass',
    grade: 'C+',
    score: 64,
    focus: ['Frontier model', 'Systemic risk', 'Audit'],
    tags: ['public protocol', 'critical risk', 'large developer'],
    notes:
      'Relevant predecessor to the newer Illinois frontier AI bills. Creates a safety-and-security protocol model for large developers, but internal deployment is only implicit through general development and critical-risk management.',
    gap: 'Use as drafting precedent only; the newer Illinois SB 3261 / HB 4705 language is much better for IDMs.',
    url: 'https://www.ilga.gov/legislation/billstatus/fulltext?DocName=10400HB3506ham001&DocNum=3506&DocTypeID=HB&GAID=18&LegDocId=203540&LegID=162191&Session=&SessionID=114&SpecSess=',
    primary: 'Illinois General Assembly, HB 3506 full text',
  },
  {
    slug: 'mi-hb-4668',
    name: 'HB 4668, Foundation Model Safety and Security Protocol Act',
    shortName: 'MI HB 4668',
    jurisdiction: 'Michigan',
    status: 'Pending',
    grade: 'C',
    score: 60,
    focus: ['Frontier model', 'Systemic risk', 'Audit'],
    tags: ['large developers', 'safety protocols', 'critical risks'],
    notes:
      'Potentially relevant because it targets large developers and foundation model critical-risk management. IDM value appears indirect: it creates model-developer duties but does not separately require disclosure of how models are used internally for privileged tasks.',
    gap: 'Amend to require confidential internal-use summaries and public high-level IDM summaries.',
    url: 'https://legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4668',
    primary: 'Michigan Legislature, HB 4668 bill page/text',
  },
  {
    slug: 'ca-sb-813',
    name: 'SB 813, California AI Standards and Safety Commission / Independent Verification Organizations',
    shortName: 'SB 813',
    jurisdiction: 'California',
    status: 'Pending',
    grade: 'C-',
    score: 52,
    focus: ['Audit', 'General AI governance'],
    tags: ['IVO framework', 'commission', 'deployer definition', 'risk mitigation verification'],
    notes:
      'Important adjacent infrastructure. Defines deployer broadly enough to include entities that implement or make operational AI models, which could include some internal systems. But the bill is about independent verification organisations, not frontier IDM disclosure.',
    gap: 'Require IVOs assessing frontier developers to evaluate internal deployments as a mandatory assurance domain.',
    url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB813',
    primary: 'California Legislative Information, SB 813 bill page/text',
  },
  {
    slug: 'oh-hb-628',
    name: 'HB 628, Independent Verification Organization License',
    shortName: 'OH HB 628',
    jurisdiction: 'Ohio',
    status: 'Pending',
    grade: 'C-',
    score: 50,
    focus: ['Audit', 'General AI governance'],
    tags: ['IVO licensing', 'risk mitigation verification', 'annual reports'],
    notes:
      'Creates a licensing framework for organisations that verify AI risk mitigation. Could matter if frontier developers voluntarily seek certification or if later law uses these IVOs. Standing alone, it does not force frontier labs to disclose IDM use.',
    gap: 'Tie IVO licensing to a required IDM assurance module for frontier developers.',
    url: 'https://ohiosenate.gov/legislation/136/hb628',
    primary: 'Ohio Senate, HB 628 bill page/text',
  },
  {
    slug: 'va-hb-797',
    name: 'HB 797, Independent Verification Organization Framework Study',
    shortName: 'VA HB 797',
    jurisdiction: 'Virginia',
    status: 'Pending',
    grade: 'D+',
    score: 42,
    focus: ['Audit', 'General AI governance'],
    tags: ['study', 'IVO framework', 'AI commission'],
    notes:
      'A useful study bill rather than a substantive IDM regime. May shape future verification infrastructure, but does not currently require frontier developers to report internal deployment practices.',
    gap: 'Use the study process to define IDM audit scopes, data-room practices and confidentiality rules.',
    url: 'https://lis.virginia.gov/bill-details/20261/HB797/text/HB797',
    primary: 'Virginia LIS, HB 797 text',
  },
  {
    slug: 'us-vet-ai',
    name: 'VET AI Act, Validation and Evaluation for Trustworthy Artificial Intelligence Act',
    shortName: 'VET AI Act',
    jurisdiction: 'Federal',
    status: 'Pending',
    grade: 'D+',
    score: 40,
    focus: ['Audit', 'Standards', 'General AI governance'],
    tags: ['NIST guidelines', 'internal assurances', 'external assurances', 'TEVV'],
    notes:
      'Federal audit infrastructure bill. Explicitly asks NIST to develop voluntary guidelines for internal and external assurances, and its definitions include developers building AI systems for internal use. That makes it indirectly relevant to IDMs, but it creates no mandatory frontier-lab disclosure duty.',
    gap: 'Use NIST guidelines as the technical substrate for mandatory IDM assurance under a separate frontier AI statute.',
    url: 'https://www.capito.senate.gov/imo/media/doc/ve_ai_bill_text.pdf',
    primary: 'U.S. Senate draft bill text PDF',
  },
  {
    slug: 'co-sb-24-205',
    name: 'Colorado SB 24-205, Colorado Artificial Intelligence Act',
    shortName: 'CO SB 24-205',
    jurisdiction: 'Colorado',
    status: 'Enacted',
    grade: 'D',
    score: 32,
    focus: ['General AI governance'],
    tags: ['high-risk AI systems', 'consequential decisions', 'deployers', 'algorithmic discrimination'],
    notes:
      'Could apply if a frontier developer uses an internal AI system to make or substantially factor into consequential employment, housing, lending, education, insurance or similar decisions. Not meaningfully aimed at internal AI R&D or frontier model governance.',
    gap: 'Keep in tracker only as an adjacent law that may touch some internal enterprise uses, not frontier IDMs.',
    url: 'https://leg.colorado.gov/bills/sb24-205',
    primary: 'Colorado General Assembly, SB 24-205 bill page',
  },
  {
    slug: 'tx-traiga',
    name: 'Texas Responsible Artificial Intelligence Governance Act, TRAIGA',
    shortName: 'TX TRAIGA',
    jurisdiction: 'Texas',
    status: 'Enacted',
    grade: 'D',
    score: 30,
    focus: ['General AI governance'],
    tags: ['prohibited uses', 'government use', 'consumer notice', 'regulatory sandbox'],
    notes:
      'Relevant to the broader AI governance patchwork and some prohibited-use contexts, but not to frontier internal deployment disclosure. May cover some internal uses if they fall into prohibited categories or government-facing applications.',
    gap: 'Not a frontier IDM regime; only include as adjacent coverage.',
    url: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149',
    primary: 'Texas Legislature Online, HB 149 bill history/text',
  },
];

/** Helper for grade colour lookup */
export const gradeColor: Record<TrackerGrade, string> = {
  A: 'var(--grade-a)',
  'B+': 'var(--grade-a)',
  B: 'var(--grade-b)',
  'B-': 'var(--grade-b)',
  'C+': 'var(--grade-c)',
  C: 'var(--grade-c)',
  'C-': 'var(--grade-c)',
  'D+': 'var(--grade-d)',
  D: 'var(--grade-d)',
  F: 'var(--grade-f)',
};
