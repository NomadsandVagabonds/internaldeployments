/**
 * Resources page data — primary legal texts, developer sources, and the
 * related literature. Seeded from the paper's bibliography (54 entries,
 * docs/internal_deployments.bib) and extended with the sources the scorecard
 * assesses.
 *
 * `url` is optional on purpose. A handful of cited works have no stable public
 * URL; listing them unlinked is better than inventing a link. Never guess a URL
 * to fill the field.
 */

export type Resource = {
  title: string;
  authors?: string;
  publisher: string;
  year: string;
  url?: string;
  /** Why this resource matters for IDM disclosure */
  note: string;
  /** Citation key in docs/internal_deployments.bib, where the work is cited by the paper. */
  bibKey?: string;
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
    url: 'https://www.ilga.gov/Legislation/BillStatus?GAID=18&DocNum=3261&DocTypeID=SB&LegId=166031&SessionID=114',
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
    bibKey: 'anthropic2026constitution',
  },
];

/**
 * The developer-published documents the scorecard grades against. Kept here so
 * the resources page is a usable index of the evidence base, not just a
 * reading list. Each is cited from at least one scorecard cell.
 */
export const developerSources: Resource[] = [
  {
    title: 'Alignment Risk Update: Claude Mythos Preview',
    publisher: 'Anthropic',
    year: '2026',
    url: 'https://www.anthropic.com/claude-mythos-preview-risk-report',
    note: 'The single most detailed public account of an internal deployment by any developer: monitoring coverage rates, the incident-response ladder, and an external red-team of the monitoring pipeline — including the vulnerabilities it found.',
    bibKey: 'anthropic2026mythosPreview',
  },
  {
    title: 'How we monitor internal coding agents for misalignment',
    publisher: 'OpenAI',
    year: '2026',
    url: 'https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/',
    note: 'Coverage of internal agentic traffic, the monitoring model, severity tiers, and the specific misaligned behaviours observed. The highest stated monitoring coverage of any developer reviewed.',
    bibKey: 'openai2026codingMonitor',
  },
  {
    title: "OpenAI's Raising Concerns Policy",
    publisher: 'OpenAI',
    year: '2026',
    url: 'https://openai.com/index/openai-raising-concerns-policy/',
    note: 'Published employee-reporting policy: anonymous integrity line, escalation to the board audit committee, preserved external reporting rights.',
    bibKey: 'openai2026raising',
  },
  {
    title: 'Frontier Safety Framework v3.1',
    publisher: 'Google DeepMind',
    year: '2026',
    url: 'https://deepmind.google/blog/strengthening-our-frontier-safety-framework/',
    note: 'The first frontier safety framework to extend safety-case review explicitly to large-scale internal deployments for ML R&D.',
  },
  {
    title: 'Securing internal systems against increasingly capable and imperfectly aligned AI',
    publisher: 'Google DeepMind',
    year: '2026',
    url: 'https://deepmind.google/blog/securing-the-future-of-ai-agents/',
    note: 'The AI Control Roadmap. Treats internal agents as insider threats: trusted-model supervisors, synchronous blocking, cryptographic action signing, kill switch, and named coverage/recall/time-to-response metrics.',
  },
  {
    title: 'Advanced AI Scaling Framework v2.0',
    publisher: 'Meta',
    year: '2026',
    url: 'https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2',
    note: 'Commits to regular assessment of catastrophic risk from internal use and to an internal-use risk report supplied to relevant authorities. The commitment is public; no instalment of the report is.',
  },
  {
    title: 'Frontier Artificial Intelligence Framework',
    publisher: 'xAI',
    year: '2025',
    url: 'https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf',
    note: 'Contains the only commitment by any developer to assess and report the share of its own code and pull requests generated by its models — the AI-R&D-automation signal the framework wants tracked.',
  },
  {
    title: 'Frontier Risk Report (February to March 2026)',
    publisher: 'METR',
    year: '2026',
    url: 'https://metr.org/blog/2026-05-19-frontier-risk-report/',
    note: 'The first cross-company assessment of internal-deployment risk, with Anthropic, Google, Meta and OpenAI each providing access to their most capable internal models. Much of what is publicly known about internal usage at these four developers comes from here.',
  },
  {
    title: 'Frontier AI safety policies — index of published frameworks',
    publisher: 'METR',
    year: '2026',
    url: 'https://metr.org/fsp',
    note: 'Running index of which developers have published a frontier safety framework, and at what version. The basis for the scorecard\'s finding that DeepSeek has published none.',
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
    bibKey: 'eth2025willairdautomati',
  },
  {
    title: 'AI behind closed doors: a primer on the governance of internal deployment',
    authors: 'Stix, C., Pistillo, M., Sastry, G. et al.',
    publisher: 'arXiv:2504.12170',
    year: '2025',
    url: 'https://arxiv.org/abs/2504.12170',
    note: 'The work that put internal deployment on the governance agenda. The paper adopts a deliberately broader definition of an internally deployed model than this one, to avoid excluding safety-critical models that are also available externally.',
    bibKey: 'stix2025aicloseddoorsprimer',
  },
  {
    title: 'Internal deployment gaps in AI regulation',
    authors: 'Kwon, J. & Casper, S.',
    publisher: 'arXiv:2601.08005',
    year: '2026',
    url: 'https://arxiv.org/abs/2601.08005',
    note: 'Maps where existing regulation fails to reach internal deployments, and argues internal systems evolve continuously in ways product releases do not — the argument behind the paper\'s reporting-cadence proposal.',
    bibKey: 'kwon2026internaldeploymentgapsai',
  },
  {
    title: 'Internal deployment in the EU AI Act',
    authors: 'Pistillo, M.',
    publisher: 'arXiv:2512.05742',
    year: '2026',
    url: 'https://arxiv.org/abs/2512.05742',
    note: 'Close reading of how far the EU AI Act and the GPAI Code of Practice actually reach internal deployments.',
    bibKey: 'pistillo2026internaldeploymenteuai',
  },
  {
    title: 'When AI builds AI: findings from a workshop on automation of AI R&D',
    authors: 'Toner, H., Beers, K., Newman, S. et al.',
    publisher: 'CSET',
    year: '2026',
    note: 'Workshop findings on AI R&D automation; one of the inputs the paper drew on in selecting its disclosure categories.',
    bibKey: 'toner2026whenaibuildsai',
  },
  {
    title: 'Responsible reporting for frontier AI development',
    authors: 'Kolt, N., Anderljung, M., Barnhart, J. et al.',
    publisher: 'AIES 2024',
    year: '2024',
    url: 'https://ojs.aaai.org/index.php/AIES/article/view/31678',
    note: 'Sets out what responsible reporting to government, industry and civil society requires. Direct antecedent to this framework.',
    bibKey: 'Kolt_Anderljung_Barnhart_Brass_Esvelt_Hadfield_Heim_Rodriguez_Sandbrink_Woodside_2024',
  },
  {
    title: 'A grading rubric for AI safety frameworks',
    authors: 'Alaga, J., Schuett, J. & Anderljung, M.',
    publisher: 'arXiv:2409.08751',
    year: '2024',
    url: 'https://arxiv.org/abs/2409.08751',
    note: 'Methodological precedent for grading developers against a published rubric — the approach this site\'s scorecard adapts to internal deployment.',
    bibKey: 'alaga2024gradingrubricaisafety',
  },
  {
    title: 'Third-party compliance reviews for frontier AI safety frameworks',
    authors: 'Homewood, A., Williams, S., Dreksler, N. et al.',
    publisher: 'arXiv:2505.01643',
    year: '2025',
    url: 'https://arxiv.org/abs/2505.01643',
    note: 'On external review as a mechanism for verifying safety-framework adherence, and on why confidential review can make developers less averse to scrutiny.',
    bibKey: 'homewood2025thirdpartycompliancereviewsfrontier',
  },
  {
    title: 'Assessing risk relative to competitors: an analysis of current AI company policies',
    authors: 'Williams, S., Dreksler, N., Homewood, A. et al.',
    publisher: 'GovAI',
    year: '2025',
    note: 'Documents the "marginal risk argument" — developers justifying their own practices by pointing at weaker competitors. A named risk of governance disclosure.',
    bibKey: 'williams2025',
  },
  {
    title: 'International AI Safety Report 2026',
    authors: 'Bengio, Y., Clare, S., Prunkl, C. et al.',
    publisher: 'internationalaisafetyreport.org',
    year: '2026',
    url: 'https://internationalaisafetyreport.org',
    note: 'The standing international scientific assessment. Provides the risk backdrop against which internal-deployment transparency is argued.',
    bibKey: 'ISRSAA2026',
  },
  {
    title: 'RE-Bench: evaluating frontier AI R&D capabilities of language model agents against human experts',
    authors: 'Wijk, H., Lin, T. R., Becker, J. et al.',
    publisher: 'PMLR v267',
    year: '2025',
    url: 'https://proceedings.mlr.press/v267/wijk25a.html',
    note: 'One of the two benchmarks the framework names as worth reporting for internally deployed models.',
    bibKey: 'pmlr-v267-wijk25a',
  },
  {
    title: 'SWE-Bench Pro: can AI agents solve long-horizon software engineering tasks?',
    authors: 'Deng, X., Da, J., Pan, E. et al.',
    publisher: 'arXiv:2509.16941',
    year: '2025',
    url: 'https://arxiv.org/abs/2509.16941',
    note: 'The second named benchmark. The paper notes both are difficult to run reliably, which is the burden argument against frequent reporting.',
    bibKey: 'deng2025swebenchproaiagents',
  },
  {
    title: 'SHADE-Arena: evaluating sabotage and monitoring in LLM agents',
    authors: 'Kutasov, J., Sun, Y., Colognese, P. et al.',
    publisher: 'arXiv:2506.15740',
    year: '2025',
    url: 'https://arxiv.org/abs/2506.15740',
    note: 'Sabotage-and-monitoring evaluation suite. Anthropic reports monitor recall against SHADE-Arena transcripts in its internal-deployment risk update.',
    bibKey: 'kutasov2025shadearenaevaluatingsabotagemonitoring',
  },
  {
    title: 'Monitoring monitorability',
    authors: 'Guan, M. Y., Wang, M., Carroll, M. et al.',
    publisher: 'arXiv:2512.18311',
    year: '2025',
    url: 'https://arxiv.org/abs/2512.18311',
    note: 'On measuring whether a model remains monitorable — the evaluation class the framework asks developers to report scores on.',
    bibKey: 'guan2025monitoringmonitorability',
  },
  {
    title: 'Sidestepping evaluation awareness and anticipating misalignment with production evaluations',
    authors: 'Williams, M., Raymond, C., Carroll, M. et al.',
    publisher: 'Anthropic / arXiv',
    year: '2025',
    note: 'On evaluation awareness — why real internal usage data is a distinct and necessary signal alongside constructed evaluations.',
    bibKey: 'williams2025prodevals',
  },
  {
    title: 'Subliminal learning: language models transmit behavioral traits via hidden signals in data',
    authors: 'Cloud, A., Le, M., Chua, J. et al.',
    publisher: 'arXiv:2507.14805',
    year: '2025',
    url: 'https://arxiv.org/abs/2507.14805',
    note: 'Why model lineage disclosure matters: behavioural traits can propagate through generated training data in ways not visible in the artefact.',
    bibKey: 'cloud2025subliminallearninglanguagemodels',
  },
  {
    title: 'What should companies share about risks from frontier AI models?',
    authors: 'METR',
    publisher: 'METR',
    year: '2025',
    url: 'https://metr.org/blog/2025-06-27-risk-transparency/',
    note: 'METR\'s own account of what frontier developers should publish. Useful comparator for the scope of this framework.',
    bibKey: 'what-should-companies-share-about-risks-from-frontier-ai-models',
  },
  {
    title: 'Early work on monitorability evaluations',
    authors: 'Kinniment, M., Nix, S., Broadley, T. et al.',
    publisher: 'METR',
    year: '2026',
    note: 'Prototype evaluations testing whether agents can discreetly bypass monitoring systems — the methodology behind safeguard stress-testing.',
    bibKey: 'early-work-on-monitorability-evaluations',
  },
  {
    title: "Red-teaming Anthropic's internal agent monitoring systems",
    authors: 'Rein, D.',
    publisher: 'METR',
    year: '2026',
    note: 'The three-week external red-team of an internal monitoring pipeline that the framework cites as a model for safeguard stress-testing, and that the scorecard credits Anthropic for publishing.',
    bibKey: 'red-teaming-anthropic-s-internal-agent-monitoring-systems',
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
