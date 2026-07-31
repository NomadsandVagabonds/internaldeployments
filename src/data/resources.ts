/**
 * Resources page data — primary legal texts, system cards, and the related literature.
 * Citations drawn from the paper's bibliography (2604.23065v1.pdf, p.9–10).
 */

export type Resource = {
  title: string;
  authors?: string;
  publisher: string;
  year: string;
  url: string;
  /** Why this resource matters for IDM disclosure */
  note: string;
};

export const primaryTexts: Resource[] = [
  {
    title: 'SB 53 — Transparency in Frontier Artificial Intelligence Act',
    publisher: 'California Legislative Information',
    year: '2025',
    url: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53',
    note:
      'The strongest live U.S. internal-deployment hook. Requires a public frontier AI framework and confidential summaries to OES every three months.',
  },
  {
    title: 'A6453B / S6953B — Responsible AI Safety and Education Act (NY RAISE)',
    publisher: 'New York State Senate',
    year: '2025',
    url: 'https://www.nysenate.gov/legislation/bills/2025/A6453/amendment/B',
    note:
      'New York frontier model law. Defines deployment to include use, requires safety and security protocols, gives officials access to less-redacted protocol material on request.',
  },
  {
    title: 'Regulation (EU) 2024/1689 — EU AI Act',
    publisher: 'EUR-Lex',
    year: '2024',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    note:
      'Article 55 requires model evaluations, adversarial testing, systemic-risk assessment, serious-incident reporting and cybersecurity for GPAI models with systemic risk.',
  },
  {
    title: 'EU General-Purpose AI Code of Practice — Safety and Security Chapter',
    publisher: 'European Commission',
    year: '2025',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    note:
      'Implementation layer for Article 55. Aimed at the most advanced GPAI models; provides a way for providers to demonstrate compliance with systemic-risk obligations.',
  },
  {
    title: 'SB 3261 / HB 4705 — AI Public Safety and Child Protection Transparency Act',
    publisher: 'Illinois General Assembly',
    year: '2025',
    url: 'https://www.ilga.gov/Legislation/BillStatus/FullText?DocNum=3261&DocTypeID=SB&GAID=18&LegId=166031&SessionID=114',
    note:
      'Pending Illinois bill that requires confidential submissions to the Attorney General for catastrophic-risk assessments resulting from internal use, on at least a three-month cadence.',
  },
];

export const systemCards: Resource[] = [
  {
    title: 'System card: Claude Opus 4.6',
    publisher: 'Anthropic',
    year: '2026',
    url: 'https://www-cdn.anthropic.com/6a5fa276ac68b9aeb0c8b6af5fa36326e0e166dd.pdf',
    note: 'Frontier model system card. The paper cites this as a touchstone for what public reporting on capabilities and safeguards already covers.',
  },
  {
    title: 'System card: Claude Mythos Preview',
    publisher: 'Anthropic',
    year: '2026',
    url: 'https://cdn.sanity.io/files/4zrzovbb/website/7624816413e9b4d2e3ba620c5a5e091b98b190a5.pdf',
    note: 'Mid-development system card cited in the paper as evidence that detailed benchmark results and significant capability leaps can be disclosed pre-release.',
  },
  {
    title: 'Sabotage Risk Report: Claude Opus 4.6',
    publisher: 'Anthropic / METR',
    year: '2026',
    url: 'https://www-cdn.anthropic.com/f21d93f21602ead5cdbecb8c8e1c765759d9e232.pdf',
    note: 'Joint report with METR — illustrative of how confidential, detailed information about internal deployments can be shared with trusted third parties.',
  },
  {
    title: 'Gemini 3.1 Pro model card',
    publisher: 'Google DeepMind',
    year: '2026',
    url: 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Pro-Model-Card.pdf',
    note: 'DeepMind model card; relevant comparator for current best-practice disclosure norms.',
  },
  {
    title: "Anthropic's Constitution",
    publisher: 'Anthropic',
    year: '2026',
    url: 'https://www.anthropic.com/constitution',
    note: 'Public articulation of an alignment-practices document — example of safety-mitigation disclosure that does not expose security vulnerabilities.',
  },
];

export const literature: Resource[] = [
  {
    title: 'Managing risks from internal AI systems',
    authors: 'Acharya, A. & Delaney, O.',
    publisher: 'IAPS',
    year: '2025',
    url: 'https://www.iaps.ai/research/managing-risks-from-internal-ai-systems',
    note: 'Foundational treatment of internal-deployment risk management cited throughout the paper.',
  },
  {
    title: 'Toward trustworthy AI development: mechanisms for supporting verifiable claims',
    authors: 'Brundage, M. et al.',
    publisher: 'arXiv:2004.07213',
    year: '2020',
    url: 'https://arxiv.org/abs/2004.07213',
    note: 'Seminal paper on AI accountability infrastructure.',
  },
  {
    title: 'Frontier AI auditing: toward rigorous third-party assessment of safety and security practices',
    authors: 'Brundage, M. et al.',
    publisher: 'arXiv:2601.11699',
    year: '2026',
    url: 'https://arxiv.org/abs/2601.11699',
    note: 'Recent companion work on auditing frontier labs — informs the confidential-channel pathway for IDM disclosure.',
  },
  {
    title: 'Measuring AI R&D automation',
    authors: 'Chan, A., Padarath, R., Kwon, J., Greaves, H. & Anderljung, M.',
    publisher: 'arXiv:2603.03992',
    year: '2026',
    url: 'https://arxiv.org/abs/2603.03992',
    note: "Quantitative work on the rate of AI R&D automation — context for why IDM disclosure matters now.",
  },
  {
    title: 'AI models can be dangerous before public deployment',
    authors: 'Chan, L.',
    publisher: 'METR',
    year: '2025',
    url: 'https://metr.org/blog/2025-01-17-ai-models-dangerous-before-public-deployment/',
    note: 'Argument that pre-deployment internal use can itself be a risk surface — complementary to the disclosure framework.',
  },
  {
    title: 'AI-enabled coups: how a small group could use AI to seize power',
    authors: 'Davidson, T., Finnveden, L. & Hadshar, R.',
    publisher: 'Forethought',
    year: '2025',
    url: 'https://www.forethought.org/research/ai-enabled-coups-how-a-small-group-could-use-ai-to-seize-power',
    note: 'Threat model the paper cites for why governance disclosures (especially access concentration) matter.',
  },
  {
    title: 'AI researchers\' views on automating AI R&D and intelligence explosions',
    authors: 'Field, S., Douglas, R. & Krueger, D.',
    publisher: 'arXiv:2603.03338',
    year: '2026',
    url: 'https://arxiv.org/abs/2603.03338',
    note: 'Survey of AI researchers on AI R&D automation expectations.',
  },
  {
    title: 'Will AI R&D automation cause a software intelligence explosion?',
    authors: 'Eth, D. & Davidson, T.',
    publisher: 'Forethought',
    year: '2025',
    url: 'https://www.forethought.org/research/will-ai-r-and-d-automation-cause-a-software-intelligence-explosion',
    note: 'Theoretical treatment of why internal AI R&D acceleration is consequential.',
  },
];

export const externalAuditors: Resource[] = [
  {
    title: 'METR — Model Evaluation & Threat Research',
    publisher: 'metr.org',
    year: '',
    url: 'https://metr.org/',
    note: 'Independent third-party evaluator. Referenced in the paper as a model for confidential, detailed sharing of IDM information.',
  },
  {
    title: 'UK AI Security Institute',
    publisher: 'AISI',
    year: '',
    url: 'https://www.aisi.gov.uk/',
    note: 'Government evaluator with which several frontier developers have voluntary pre-deployment access agreements.',
  },
  {
    title: 'CA Office of Emergency Services (SB 53 reporting recipient)',
    publisher: 'OES',
    year: '',
    url: 'https://www.caloes.ca.gov/',
    note: 'The confidential channel for SB 53 catastrophic-risk summaries.',
  },
];
