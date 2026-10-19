function createReceiptScanSEOPlanner() {
  // Always creates a NEW spreadsheet
  var ss = SpreadsheetApp.create('ReceiptScan SEO Content HQ');
  var ssUrl = ss.getUrl();

  // ---------- helpers ----------
  function setupSheet(name, headers, rows) {
    var sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);

    sh.clear();
    sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).clearDataValidations();
    sh.clearConditionalFormatRules();
    sh.clearNotes();
    sh.clearFormats();

    sh.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight('bold')
      .setBackground('#1f4e78')
      .setFontColor('#ffffff');

    if (rows && rows.length > 0) {
      sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
    }
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1, headers.length);
    return sh;
  }

  function addDropdown(sheet, a1Notation, options) {
    var range = sheet.getRange(a1Notation);
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(options, true)
      .setAllowInvalid(false)
      .build();
    range.setDataValidation(rule);
  }

  function addTextRule(sheet, a1Notation, text, bg, fontColor) {
    var range = sheet.getRange(a1Notation);
    var rule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(text)
      .setBackground(bg)
      .setFontColor(fontColor || '#000000')
      .setRanges([range])
      .build();
    var rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);
  }

  function addNumberRule(sheet, a1Notation, type, value, bg) {
    var range = sheet.getRange(a1Notation);
    var rule;
    if (type === 'lessThanOrEqual') {
      rule = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberLessThanOrEqualTo(value).setBackground(bg).setRanges([range]).build();
    } else if (type === 'greaterThan') {
      rule = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberGreaterThan(value).setBackground(bg).setRanges([range]).build();
    } else if (type === 'between') {
      rule = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberBetween(value[0], value[1]).setBackground(bg).setRanges([range]).build();
    }
    var rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);
  }

  // ==================================================================
  // RESEARCH PRE-FLIGHT MASTER PROMPT
  // ==================================================================
  var researchPrompt = `[AI PROMPT: Research Pre-Flight]

You are a senior SEO strategist and content researcher working for receiptscan.org, an AI receipt scanning tool.

Your job is NOT to write the article. Your job is to produce the research inputs that will feed a downstream article-writing prompt.

You will output structured research that a human editor can paste directly into a content brief.

-------------------------------------------------
INPUT
-------------------------------------------------
SITE: https://receiptscan.org/
PRODUCT: AI receipt scanning tool. Extracts merchant, date, total, tax, and line items from receipt images and PDFs. Works on mobile and desktop. Exports to CSV and accounting software. Has an API.
BUSINESS MODEL: SaaS with free tier and paid plans. Primary CTA: "Try ReceiptScan free". Secondary CTA: "See pricing".
TARGET COUNTRIES: US, UK, Canada, Australia. US first.
BRAND VOICE: Practical, clear, no hype, specific examples. Second person ("you"). Grade 8-9 reading level.

CANDIDATE PRIMARY KEYWORD: {{KEYWORD}}

REAL DATA I AM PROVIDING (paste what you have, leave blank if none):
- Google Search Console impressions: {{GSC_IMPRESSIONS}}
- Google Search Console current position: {{GSC_POSITION}}
- Top 3 ranking URLs: {{TOP_URLS}}
- People Also Ask questions: {{PAA}}
- Related searches: {{RELATED_SEARCHES}}

BUSINESS CONSTRAINTS:
- Do not recommend targeting keywords we cannot realistically rank for within 6 months given the site is new.
- Do not recommend black-hat tactics, doorway pages, or keyword stuffing.
- Do not invent statistics, customer names, testimonials, or revenue figures.
- Do not invent pricing. Use "[insert price]" if pricing is needed.

-------------------------------------------------
TASK
-------------------------------------------------
Produce a structured research brief with the 10 sections below. Be specific, not generic. Where you do not have real data, mark the field [VERIFY] or [ESTIMATE] and explain what data would resolve it.

-------------------------------------------------
OUTPUT FORMAT
-------------------------------------------------
Return the output exactly in the labeled format below. Use plain text. Do not add commentary outside the sections.

=== 1. PRIMARY KEYWORD ===
PRIMARY KEYWORD:
CONFIRMED OR RECOMMENDED:
WHY THIS KEYWORD:
SEARCH VOLUME:
DIFFICULTY:
CURRENT POSITION (if GSC data provided):
REALISTIC RANKING TIMELINE:
ALTERNATIVE PRIMARY KEYWORDS:

=== 2. SECONDARY KEYWORDS ===
Group by type. Aim for 12-20 total. Mark must-include vs nice-to-have.

COMMERCIAL:
-
INFORMATIONAL:
-
LONG-TAIL:
-
QUESTION KEYWORDS:
-
MODIFIER KEYWORDS:
-

MUST-INCLUDE IN ARTICLE:
NICE-TO-HAVE:

=== 3. SEARCH INTENT ===
PRIMARY INTENT:
MIXED INTENT:
WHAT THE USER ACTUALLY WANTS:
WHAT WOULD MAKE THEM CLICK:
WHAT WOULD MAKE THEM BOUNCE:
CONTENT TYPE GOOGLE REWARDS:

=== 4. AUDIENCE ===
PRIMARY SEGMENT 1:
- Name:
- Pain points:
- Goals:
- Context:
- Objections:
- What they need to see to convert:

PRIMARY SEGMENT 2:
- (same structure)

OPTIONAL SEGMENT 3:
- (same structure)

WHO THIS ARTICLE IS NOT FOR:

=== 5. EXTERNAL SOURCES ===
List 4-8 authoritative sources.

- Source name:
  URL:
  Type:
  Why relevant:
  Where in the article to cite it:
  Exact claim it supports:

RULES:
- US tax: IRS only. UK tax: HMRC or GOV.UK only. Canada tax: CRA only. Australia tax: ATO only.
- Privacy: GDPR, CCPA/CPRA, PIPEDA, Privacy Act (AU).
- Do not cite blogs, competitor marketing pages, or unverified sources for legal or tax claims.

=== 6. CONTENT GAP AND ANGLE ===
WHAT TOP-RANKING PAGES COVER:
WHAT THEY MISS:
OUR UNIQUE ANGLE:
OUR UNFAIR ADVANTAGE:
RISKS TO AVOID:

=== 7. RECOMMENDED ARTICLE SPEC ===
ARTICLE TYPE:
WORD COUNT:
SCHEMA:
PRIMARY H1:
TITLE TAG (under 60 chars):
META DESCRIPTION (150-155 chars):
URL SLUG:
INTERNAL LINKS:
CTA:

=== 8. FAQ QUESTIONS ===
6 questions with 40-60 word answers. Mark [VERIFY] if not from PAA.

1. Q:
   A:
2. Q:
   A:
3. Q:
   A:
4. Q:
   A:
5. Q:
   A:
6. Q:
   A:

=== 9. FACTS TO INCLUDE ===
Only facts the writer is allowed to state. Mark each with a source or [VERIFY].

-
-

=== 10. RISK FLAGS ===
- Claims that must be verified before publishing:
- Regulated topics requiring a disclaimer:
- Competitor mentions to handle carefully:
- Anything that could trigger a legal, tax, or compliance issue:
- Anything the writer must NOT say:

=== END OUTPUT ===

Now produce the research brief.`;

  // ==================================================================
  // ARTICLE PROMPT TEMPLATES
  // ==================================================================
  var pillarTemplate = `You are an SEO content strategist and expert writer for receiptscan.org, an AI receipt scanning tool.

TASK: Write a comprehensive PILLAR article.

PRIMARY KEYWORD: {{KEYWORD}}
SECONDARY KEYWORDS: {{SECONDARY_KEYWORDS}}
SEARCH INTENT: Commercial / Informational
AUDIENCE: {{AUDIENCE}}
WORD COUNT: {{WORD_COUNT}}
BRAND VOICE: Practical, clear, no hype, specific examples. Second person ("you"). Grade 8-9 reading level.
TARGET COUNTRIES: US, UK, Canada, Australia
INTERNAL LINKS: {{INTERNAL_LINKS}}
EXTERNAL SOURCES: {{EXTERNAL_SOURCES}}
CTA: {{CTA}}
SCHEMA: Article, FAQPage, SoftwareApplication, BreadcrumbList

FACTS TO INCLUDE (do not invent others):
{{FACTS}}

STRUCTURE:
1. One H1 containing the primary keyword
2. Intro (100-150 words): the problem, who this is for, what they will learn
3. 8-12 H2 sections with 3-5 H3 subsections each
4. One comparison table
5. FAQ section with 6 real People Also Ask questions and 40-60 word answers
6. Conclusion with CTA

RULES:
- Do not use cliches: "in today's fast-paced world," "delve," "landscape," "moreover," "furthermore," "it's important to note," "unlock," "leverage," "navigate"
- Vary sentence length. Use contractions.
- Include specific numbers only if provided in FACTS.
- Mark any claim you cannot verify as [VERIFY].
- Do not invent statistics, customer names, or testimonials.
- Write naturally, as if a human expert wrote it.

OUTPUT: Final article only. No commentary.`;

  var howtoTemplate = `You are an SEO content strategist and expert writer for receiptscan.org, an AI receipt scanning tool.

TASK: Write a step-by-step HOW-TO article.

PRIMARY KEYWORD: {{KEYWORD}}
SECONDARY KEYWORDS: {{SECONDARY_KEYWORDS}}
SEARCH INTENT: Informational / How-to
AUDIENCE: {{AUDIENCE}}
WORD COUNT: {{WORD_COUNT}}
BRAND VOICE: Practical, clear, no hype, specific examples. Second person ("you").
INTERNAL LINKS: {{INTERNAL_LINKS}}
EXTERNAL SOURCES: {{EXTERNAL_SOURCES}}
CTA: {{CTA}}
SCHEMA: Article, FAQPage, HowTo, BreadcrumbList

FACTS TO INCLUDE:
{{FACTS}}

STRUCTURE:
1. One H1 containing the primary keyword
2. Intro: what the reader will learn and why it matters
3. "What you'll need" section
4. Numbered step-by-step instructions (6-10 steps) with H2/H3 headings
5. Common mistakes to avoid
6. FAQ with 5 questions and 40-60 word answers
7. Conclusion with CTA

RULES:
- Each step must be actionable and specific.
- Insert [SCREENSHOT: description] where a screenshot would help.
- Do not use cliches.
- Do not invent facts, tools, or claims.
- Mark unverified claims as [VERIFY].

OUTPUT: Final article only. No commentary.`;

  var comparisonTemplate = `You are an SEO content strategist and expert writer for receiptscan.org, an AI receipt scanning tool.

TASK: Write an honest COMPARISON article.

PRIMARY KEYWORD: {{KEYWORD}}
SECONDARY KEYWORDS: {{SECONDARY_KEYWORDS}}
SEARCH INTENT: Commercial investigation
AUDIENCE: {{AUDIENCE}}
WORD COUNT: {{WORD_COUNT}}
BRAND VOICE: Practical, clear, no hype, balanced. Second person ("you").
INTERNAL LINKS: {{INTERNAL_LINKS}}
EXTERNAL SOURCES: {{EXTERNAL_SOURCES}}
CTA: {{CTA}}
SCHEMA: Article, FAQPage, BreadcrumbList

FACTS TO INCLUDE (use only these for pricing, features, specs):
{{FACTS}}

STRUCTURE:
1. One H1 containing the primary keyword
2. Intro: who this comparison is for and how it was researched
3. Side-by-side comparison table (features, pricing, pros, cons, best for)
4. Detailed section per option (H2), with pros and cons
5. Which option is best for which use case (H2)
6. FAQ with 5 questions and 40-60 word answers
7. Conclusion with CTA

RULES:
- Be honest about trade-offs. Do not trash competitors.
- Disclose any affiliation clearly.
- Do not invent features, prices, or claims. Use only FACTS.
- Mark unverified claims as [VERIFY].
- Do not use cliches.

OUTPUT: Final article only. No commentary.`;

  var usecaseTemplate = `You are an SEO content strategist and expert writer for receiptscan.org, an AI receipt scanning tool.

TASK: Write a USE CASE article for a specific audience.

PRIMARY KEYWORD: {{KEYWORD}}
SECONDARY KEYWORDS: {{SECONDARY_KEYWORDS}}
AUDIENCE: {{AUDIENCE}}
WORD COUNT: {{WORD_COUNT}}
BRAND VOICE: Practical, clear, no hype, specific examples. Second person ("you").
INTERNAL LINKS: {{INTERNAL_LINKS}}
EXTERNAL SOURCES: {{EXTERNAL_SOURCES}}
CTA: {{CTA}}
SCHEMA: Article, FAQPage, BreadcrumbList

FACTS TO INCLUDE:
{{FACTS}}

STRUCTURE:
1. One H1 containing the primary keyword
2. Intro: the specific problem this audience faces
3. Why this is hard today (pain points)
4. How receipt scanning solves it
5. Step-by-step workflow using the audience's real scenarios
6. Time or cost savings (only use provided facts)
7. FAQ with 5 questions and 40-60 word answers
8. Conclusion with CTA

RULES:
- Speak directly to the audience's pain points.
- Use concrete scenarios, not generic advice.
- Do not invent statistics, testimonials, or customer names.
- Mark unverified claims as [VERIFY].
- Do not use cliches.

OUTPUT: Final article only. No commentary.`;

  var localtaxTemplate = `You are an SEO content strategist and expert writer for receiptscan.org, an AI receipt scanning tool.

TASK: Write a country-specific TAX and RECEIPT COMPLIANCE article.

PRIMARY KEYWORD: {{KEYWORD}}
SECONDARY KEYWORDS: {{SECONDARY_KEYWORDS}}
COUNTRY / REGION: {{COUNTRY}}
AUDIENCE: {{AUDIENCE}}
WORD COUNT: {{WORD_COUNT}}
BRAND VOICE: Practical, clear, no hype, specific examples. Accurate and careful.
INTERNAL LINKS: {{INTERNAL_LINKS}}
EXTERNAL SOURCES: {{EXTERNAL_SOURCES}} (must include the official tax authority)
CTA: {{CTA}}
SCHEMA: Article, FAQPage, BreadcrumbList

FACTS TO INCLUDE:
{{FACTS}}

STRUCTURE:
1. One H1 containing the primary keyword
2. Intro: why receipt compliance matters in {{COUNTRY}}
3. What the tax authority requires (cite official source)
4. How long to keep receipts
5. Digital vs paper receipts
6. How ReceiptScan helps
7. FAQ with 6 questions and 40-60 word answers
8. Conclusion with CTA
9. Disclaimer: "This is general information, not legal or tax advice. Consult a qualified professional."

RULES:
- Cite the official tax authority (IRS, HMRC, ATO, CRA, etc.).
- Do not invent tax rules. Mark uncertain claims as [VERIFY].
- Do not use cliches.
- Include the disclaimer at the bottom.

OUTPUT: Final article only. No commentary.`;

  // ==================================================================
  // DASHBOARD
  // ==================================================================
  setupSheet('Dashboard',
    ['Metric', 'Value', 'Target', 'Notes'],
    [
      ['Articles planned', "=COUNTA('Content Calendar'!C2:C)", 30, 'Total articles in calendar'],
      ['Articles published', "=COUNTIF('Content Calendar'!G2:G,\"Published\")", 30, 'Status = Published'],
      ['AI drafts created', "=COUNTIF('Content Calendar'!M2:M,\"<>\")", 30, 'AI draft link filled'],
      ['Human edits done', "=COUNTIF('Content Calendar'!N2:N,\"Yes\")", 30, ''],
      ['Original screenshots', "=COUNTIF('Content Calendar'!O2:O,\"Yes\")", 30, ''],
      ['Expert/source added', "=COUNTIF('Content Calendar'!P2:P,\"Yes\")", 30, ''],
      ['Plagiarism checked', "=COUNTIF('Content Calendar'!Q2:Q,\"Yes\")", 30, ''],
      ['SEO polished', "=COUNTIF('Content Calendar'!R2:R,\"Yes\")", 30, ''],
      ['Indexed', "=COUNTIF('Content Calendar'!T2:T,\"Yes\")", 30, ''],
      ['Articles with completed research', "=COUNTA('Prompt Builder'!L2:L)", '', 'Stage 0 output filled'],
      ['Articles with final prompt ready', "=COUNTA('Prompt Builder'!N2:N)", '', 'Stage 2 output filled'],
      ['Prompts logged in history', "=COUNTA('Prompt History'!D2:D)", '', 'All stages'],
      ['Stage 0 research runs', "=COUNTIF('Prompt History'!B2:B,\"Stage 0 - Research\")", '', ''],
      ['Stage 1 stitch runs', "=COUNTIF('Prompt History'!B2:B,\"Stage 1 - Stitch\")", '', ''],
      ['Stage 2 article runs', "=COUNTIF('Prompt History'!B2:B,\"Stage 2 - Article\")", '', ''],
      ['Avg output rating', "=IFERROR(ROUND(AVERAGE('Prompt History'!I2:I),2),0)", '4+', '1-5 scale'],
      ['Total impressions', "=SUM('GSC Tracking'!D:D)", '', ''],
      ['Total clicks', "=SUM('GSC Tracking'!E:E)", '', ''],
      ['Avg position', "=IFERROR(AVERAGE('GSC Tracking'!G:G),0)", '', ''],
      ['Top query by impressions', "=IFERROR(INDEX('Keyword Bank'!A:A,MATCH(MAX('Keyword Bank'!D:D),'Keyword Bank'!D:D,0)),\"\")", '', ''],
      ['High priority keywords', "=COUNTIF('Keyword Bank'!G:G,\"High\")", '', '']
    ]
  );

  // ==================================================================
  // CONTENT CALENDAR
  // ==================================================================
  var calendarHeaders = [
    'Day', 'Publish Date', 'Target Keyword', 'Working Title', 'Article Type', 'Funnel',
    'Status', 'Primary Pillar Page', 'Internal Link 1', 'Internal Link 2', 'Internal Link 3',
    'Schema Needed', 'AI Draft Link', 'Human Edit Done?', 'Original Screenshot?',
    'Expert/Source Added?', 'Plagiarism Check?', 'SEO Polished?', 'Published URL',
    'GSC Indexed?', 'Primary Keyword Position', 'Impressions', 'Clicks', 'CTR', 'Notes'
  ];

  var calendarRows = [
    [1,'','ai receipt scanner','AI Receipt Scanner: How It Works and Why It Beats Manual Entry','Pillar','Top','Not Started','/ai-receipt-scanner','/receipt-scanner','/pricing','','Article, FAQPage, SoftwareApplication','','No','No','No','No','No','','No','','','','','Start here'],
    [2,'','receipt scanner','Receipt Scanner: Complete Guide to Scanning Receipts Online','Pillar','Top','Not Started','/receipt-scanner','/ai-receipt-scanner','/online-receipt-scanner','/pricing','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [3,'','online receipt scanner','Online Receipt Scanner: Free vs Paid Options','Commercial','Middle','Not Started','/online-receipt-scanner','/receipt-scanner','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [4,'','receipt scanning api','Receipt Scanning API: Extract Receipt Data at Scale','Technical','Bottom','Not Started','/receipt-scanning-api','/receipt-parser','/pricing','','Article, FAQPage, SoftwareApplication','','No','No','No','No','No','','No','','','','',''],
    [5,'','receipt parser','Receipt Parser: Convert Receipts to JSON/CSV','Technical','Bottom','Not Started','/receipt-parser','/receipt-scanning-api','/ai-receipt-scanner','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [6,'','ai receipt capture','AI Receipt Capture: Automate Expense Entry','Commercial','Middle','Not Started','/ai-receipt-scanner','/expense-receipt-scanner','/pricing','','Article, FAQPage, SoftwareApplication','','No','No','No','No','No','','No','','','','',''],
    [7,'','best way to scan receipts','Best Way to Scan Receipts for Bookkeeping','Informational','Top','Not Started','/receipt-scanner','/expense-receipt-scanner','/pricing','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [8,'','expense receipt scanner','Expense Receipt Scanner: Track Business Expenses','Commercial','Middle','Not Started','/expense-receipt-scanner','/receipt-scanner','/pricing','','Article, FAQPage, SoftwareApplication','','No','No','No','No','No','','No','','','','',''],
    [9,'','receipt scanner for small business','Receipt Scanner for Small Business','Commercial','Middle','Not Started','/receipt-scanner','/expense-receipt-scanner','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [10,'','receipt scanner for freelancers','Receipt Scanner for Freelancers','Use case','Middle','Not Started','/receipt-scanner','/expense-receipt-scanner','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [11,'','receipt scanning service','Receipt Scanning Service vs Software','Comparison','Middle','Not Started','/receipt-scanner','/pricing','/receipt-scanning-api','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [12,'','receipt checker','Receipt Checker: How to Verify Receipts and Prevent Fraud','Informational','Top','Not Started','/receipt-checker','/ai-receipt-scanner','/expense-receipt-scanner','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [13,'','receipt ai pricing','Receipt AI Pricing: What Should You Pay?','Commercial','Bottom','Not Started','/pricing','/ai-receipt-scanner','/receipt-scanner','','Article, FAQPage, SoftwareApplication','','No','No','No','No','No','','No','','','','',''],
    [14,'','shoeboxed receitp scan','ReceiptScan vs Shoeboxed','Comparison','Bottom','Not Started','/receipt-scanner','/pricing','/receipt-scanning-service','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [15,'','scan receipts','How to Scan Receipts on iPhone and Android','How-to','Top','Not Started','/receipt-scanner','/online-receipt-scanner','/import-receipts-from-photos','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [16,'','import receipts from photos','How to Import Receipts from Photos','How-to','Middle','Not Started','/receipt-scanner','/ai-receipt-capture','/pricing','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [17,'','ocr receipt scanner','OCR Receipt Scanner: How It Works','Technical','Middle','Not Started','/receipt-scanner','/receipt-parser','/receipt-scanning-api','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [18,'','receipt scanning data','Receipt Scanning Data: What Data Can You Extract?','Informational','Middle','Not Started','/receipt-parser','/receipt-scanning-api','/receipt-analysis','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [19,'','receipt analysis','Receipt Analysis: Turn Receipts into Insights','Informational','Middle','Not Started','/receipt-analysis','/expense-receipt-scanner','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [20,'','organize receipts for taxes','How to Organize Receipts for Taxes','Informational','Top','Not Started','/receipt-scanner','/receipt-retention-policy','/expense-receipt-scanner','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [21,'','receipt retention policy','How Long to Keep Receipts?','Informational','Top','Not Started','/receipt-scanner','/organize-receipts-for-taxes','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [22,'','scanned receipts','How to Digitize a Shoebox of Receipts','How-to','Middle','Not Started','/receipt-scanner','/import-receipts-from-photos','/expense-receipt-scanner','','Article, FAQPage, HowTo','','No','No','No','No','No','','No','','','','',''],
    [23,'','travel receipts','Receipt Scanning for Travel Expenses','Use case','Middle','Not Started','/expense-receipt-scanner','/restaurant-receipt-scanning','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [24,'','restaurant receipt scanning','Restaurant Receipt Scanning for Expense Reports','Use case','Middle','Not Started','/expense-receipt-scanner','/travel-receipts','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [25,'','grocery receipt scanning','Grocery Receipt Scanning for Budgeting','Use case','Top','Not Started','/receipt-scanner','/receipt-analysis','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [26,'','receipt scanning for VAT UK','VAT Receipt Scanning in the UK','Local/tax','Middle','Not Started','/receipt-scanner','/receipt-retention-policy','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [27,'','GST/HST Canada','GST/HST Receipt Scanning in Canada','Local/tax','Middle','Not Started','/receipt-scanner','/receipt-retention-policy','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [28,'','GST Australia','GST Receipt Scanning in Australia','Local/tax','Middle','Not Started','/receipt-scanner','/receipt-retention-policy','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [29,'','is AI receipt scanning safe','Is AI Receipt Scanning Safe? Privacy & Security','Informational','Middle','Not Started','/ai-receipt-scanner','/pricing','/receipt-scanner','','Article, FAQPage','','No','No','No','No','No','','No','','','','',''],
    [30,'','AI receipt scanner accuracy','AI Receipt Scanner Accuracy: How to Improve Results','Informational','Middle','Not Started','/ai-receipt-scanner','/receipt-parser','/pricing','','Article, FAQPage','','No','No','No','No','No','','No','','','','','']
  ];

  var cal = setupSheet('Content Calendar', calendarHeaders, calendarRows);

  // ==================================================================
  // KEYWORD BANK
  // ==================================================================
  setupSheet('Keyword Bank',
    ['Keyword', 'Source', 'Intent', 'Impressions', 'Current Position', 'Difficulty', 'Priority', 'Target Page', 'Status', 'Notes'],
    [
      ['ai receipt scanner','GSC Queries','Commercial',310,70.62,'','High','/ai-receipt-scanner','To Do','Top impression query'],
      ['receipt scan','GSC Queries','Informational',93,47.94,'','High','/receipt-scanner','To Do',''],
      ['receipt scanning','GSC Queries','Informational',38,61.53,'','High','/receipt-scanner','To Do',''],
      ['receipt scanner','GSC Queries','Commercial',35,43.49,'','High','/receipt-scanner','To Do',''],
      ['ai receipt capture','GSC Queries','Commercial',27,70.3,'','High','/ai-receipt-scanner','To Do',''],
      ['receipt scanning api','GSC Queries','Commercial',22,97.05,'','Medium','/receipt-scanning-api','To Do',''],
      ['receipt capture','GSC Queries','Commercial',19,66.63,'','Medium','/ai-receipt-scanner','To Do',''],
      ['ai receipt scanning','GSC Queries','Commercial',15,78.27,'','High','/ai-receipt-scanner','To Do',''],
      ['ai receipt scan','GSC Queries','Commercial',13,74.85,'','High','/ai-receipt-scanner','To Do',''],
      ['receipt scanning data','GSC Queries','Informational',13,90.23,'','Medium','/receipt-scanning-api','To Do',''],
      ['receipt parser','GSC Queries','Commercial',13,91.0,'','Medium','/receipt-parser','To Do',''],
      ['best way to scan receipts','GSC Queries','Informational',11,88.09,'','Medium','/receipt-scanner','To Do',''],
      ['receipt scanning service','GSC Queries','Commercial',9,58.56,'','Medium','/receipt-scanner','To Do',''],
      ['online receipt scanner','GSC Queries','Commercial',9,59.89,'','High','/online-receipt-scanner','To Do',''],
      ['receipt scanner online','GSC Queries','Commercial',9,65.89,'','High','/online-receipt-scanner','To Do',''],
      ['scanned receipts','GSC Queries','Informational',9,91.67,'','Medium','/receipt-scanner','To Do',''],
      ['receipt ai','GSC Queries','Commercial',8,65.88,'','High','/ai-receipt-scanner','To Do',''],
      ['shoeboxed receitp scan','GSC Queries','Commercial',7,40.86,'','Medium','/receipt-scanner','To Do','Comparison opportunity'],
      ['receiptron pricing','GSC Queries','Commercial',7,64.71,'','Medium','/pricing','To Do','Competitor pricing'],
      ['receipt checker','GSC Queries','Informational',7,68.86,'','Medium','/receipt-checker','To Do','']
    ]
  );

  // ==================================================================
  // BRIEFS
  // ==================================================================
  setupSheet('Briefs',
    ['Article Title','Target Keyword','Search Intent','Audience','H2 Outline','FAQ Ideas','Internal Links','External Sources','CTA','Schema','AI Prompt'],
    [
      [
        'AI Receipt Scanner: How It Works and Why It Beats Manual Entry',
        'ai receipt scanner','Commercial',
        'Small business owners, freelancers, accountants',
        'What is an AI receipt scanner?; How AI receipt scanning works; AI vs manual data entry; Key features to look for; ReceiptScan workflow; Pricing and ROI; FAQ',
        'How accurate is AI receipt scanning?; Is it secure?; Can it read handwritten receipts?; Does it work with accounting software?',
        '/receipt-scanner; /pricing; /receipt-parser',
        'IRS recordkeeping; GDPR/CCPA privacy guides',
        'Try ReceiptScan free',
        'Article, FAQPage, SoftwareApplication',
        'Run Stage 0 Research Pre-Flight in Prompt Builder, then Stage 1 Stitch, then Stage 2 Final Prompt.'
      ]
    ]
  );

  // ==================================================================
  // HUMANIZATION CHECKLIST
  // ==================================================================
  setupSheet('Humanization Checklist',
    ['Task','Description','Required?','Status','Owner','Notes'],
    [
      ['Original screenshot','Add at least one screenshot of ReceiptScan in action.','Yes','Not Started','',''],
      ['Real example','Add a redacted real receipt or customer scenario.','Yes','Not Started','',''],
      ['Specific numbers','Add 3-5 concrete numbers (time saved, accuracy, price).','Yes','Not Started','',''],
      ['Expert/source','Cite IRS/HMRC/ATO/CRA or quote an expert.','Yes','Not Started','',''],
      ['Rewrite intro/conclusion','Manually rewrite first and last paragraph.','Yes','Not Started','',''],
      ['Remove AI clichés',"Remove phrases like 'in today's fast-paced world', 'delve', 'landscape'.",'Yes','Not Started','',''],
      ['Fact-check','Verify every claim, date, name, and tax rule.','Yes','Not Started','',''],
      ['Read aloud','Read the full article aloud before publishing.','Yes','Not Started','',''],
      ['Plagiarism check','Run Copyscape or similar.','Yes','Not Started','',''],
      ['Verify [VERIFY] markers','Replace every [VERIFY] with a real source or delete the claim.','Yes','Not Started','','']
    ]
  );

  // ==================================================================
  // INTERNAL LINKS
  // ==================================================================
  setupSheet('Internal Links',
    ['From Page','To Page','Anchor Text','Link Type','Status','Notes'],
    [
      ['/ai-receipt-scanner','/receipt-scanner','receipt scanner','Pillar to Pillar','Planned',''],
      ['/ai-receipt-scanner','/pricing','ReceiptScan pricing','Pricing','Planned',''],
      ['/receipt-scanner','/online-receipt-scanner','online receipt scanner','Pillar to Pillar','Planned',''],
      ['/receipt-scanner','/pricing','see pricing','Pricing','Planned',''],
      ['/receipt-scanning-api','/receipt-parser','receipt parser','Blog to Blog','Planned','']
    ]
  );

  // ==================================================================
  // GSC TRACKING
  // ==================================================================
  setupSheet('GSC Tracking',
    ['Date','Page/Article','Query','Impressions','Clicks','CTR','Position','Action'],
    []
  );

  // ==================================================================
  // PROMPT LIBRARY
  // ==================================================================
  setupSheet('Prompt Library',
    ['Article Type','Description','When to Use','Best For','Word Count','Schema','Prompt Template','Example Filled Prompt'],
    [
      ['Pillar','Comprehensive definitive guide on a core topic.','Once per topic cluster. 6-10 pillars total.','Top-of-funnel and hub pages.','2500-4000','Article, FAQPage, SoftwareApplication, BreadcrumbList',pillarTemplate,'Pillar prompt for "ai receipt scanner" targeting small business owners with 3,000 words.'],
      ['How-to','Step-by-step instructional article.','When the query is "how to..." or a clear process.','Informational keywords and long-tail.','1200-2000','Article, FAQPage, HowTo, BreadcrumbList',howtoTemplate,'How-to prompt for "scan receipts" on iPhone and Android.'],
      ['Comparison','Honest side-by-side comparison of two or more options.','When users are evaluating tools or services.','Commercial investigation keywords.','1500-2500','Article, FAQPage, BreadcrumbList',comparisonTemplate,'Comparison prompt for "ReceiptScan vs Shoeboxed".'],
      ['Use case','Article for a specific audience segment.','When you want to speak to freelancers, small business, travel.','Mid-funnel and audience targeting.','1200-2000','Article, FAQPage, BreadcrumbList',usecaseTemplate,'Use case prompt for "receipt scanner for freelancers".'],
      ['Local/tax','Country-specific tax and compliance article.','When the query has a country or tax angle.','Local SEO and compliance traffic.','1500-2500','Article, FAQPage, BreadcrumbList',localtaxTemplate,'Local/tax prompt for "receipt scanning for VAT UK".']
    ]
  );

  var pl = ss.getSheetByName('Prompt Library');
  pl.getRange('G2:G10').setWrap(true);
  pl.getRange('H2:H10').setWrap(true);
  pl.setColumnWidth(7, 620);
  pl.setColumnWidth(8, 360);
  pl.getRange('G1:H1').setBackground('#0b5394');

  // ==================================================================
  // RESEARCH PRE-FLIGHT
  // ==================================================================
  setupSheet('Research Pre-Flight',
    ['Field','Value','Notes'],
    [
      ['Master Research Prompt', researchPrompt, 'Copy, fill the REAL DATA block, run in ChatGPT or Claude.'],
      ['Placeholders', '{{KEYWORD}}, {{GSC_IMPRESSIONS}}, {{GSC_POSITION}}, {{TOP_URLS}}, {{PAA}}, {{RELATED_SEARCHES}}', 'Auto-filled by Prompt Builder column K.'],
      ['Data to gather first', 'GSC impressions, GSC position, top 3 ranking URLs, People Also Ask, related searches', 'Fill Prompt Builder columns C-G before running Stage 0.'],
      ['What the AI outputs', '10 sections: Primary Keyword, Secondary Keywords, Search Intent, Audience, External Sources, Content Gap, Article Spec, FAQ, Facts, Risk Flags', 'Feeds directly into Prompt Builder column L.'],
      ['Rule 1', 'AI is for synthesis, not sourcing.', 'It does not know current search volumes or SERPs. Paste real data.'],
      ['Rule 2', 'Verify every [VERIFY] and [ESTIMATE].', 'Before publishing, not after.'],
      ['Rule 3', 'Do not let the AI invent statistics.', 'If it appears in the brief, you must be able to cite it.'],
      ['Rule 4', 'External sources must be official.', 'IRS, HMRC, ATO, CRA, GDPR, CCPA/CPRA, PIPEDA.'],
      ['Rule 5', 'The article is the last step, not the first.', 'Research → Stitch → Article.'],
      ['Modular alternatives', 'Keyword Research, Search Intent, Audience, External Sources, Content Gap', 'Ask for the modular versions if you need depth on one field only.']
    ]
  );

  var rpf = ss.getSheetByName('Research Pre-Flight');
  rpf.getRange('B2:B20').setWrap(true);
  rpf.setColumnWidth(1, 220);
  rpf.setColumnWidth(2, 900);
  rpf.setColumnWidth(3, 340);
  rpf.setRowHeight(2, 700);

  // ==================================================================
  // PROMPT BUILDER (3-stage pipeline)
  // ==================================================================
  var pbHeaders = [
    'Article Type','Target Keyword','GSC Impressions','GSC Position','Top 3 Ranking URLs',
    'PAA Questions','Related Searches','Word Count','CTA','Country/Region',
    'Stage 0: Research Prompt (copy-paste)',
    'Stage 0: Research Output (paste from AI)',
    'Stage 1: Stitch Prompt (copy-paste)',
    'Stage 2: Final Article Prompt (paste from AI running Stage 1)',
    'Research Status','Notes'
  ];

  var pbRows = [
    [
      'Pillar','ai receipt scanner','310','70.62','','',
      '','3000','Try ReceiptScan free','',
      '','','','','Not Started','Sample row'
    ],
    [
      'How-to','scan receipts','','','','','',
      '1500','Scan your first receipt','',
      '','','','','Not Started',''
    ],
    [
      'Comparison','shoeboxed receitp scan','7','40.86','','','',
      '2000','Try ReceiptScan free','',
      '','','','','Not Started',''
    ],
    [
      'Use case','receipt scanner for freelancers','','','','','',
      '1500','Try ReceiptScan free','',
      '','','','','Not Started',''
    ],
    [
      'Local/tax','receipt scanning for VAT UK','','','','','',
      '1800','Try ReceiptScan free','UK',
      '','','','','Not Started',''
    ]
  ];

  var pb = setupSheet('Prompt Builder', pbHeaders, pbRows);

  // Column K: Stage 0 Research Prompt
  for (var i = 2; i <= 101; i++) {
    var kFormula = '=IF(B' + i + '="","",SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(\'Research Pre-Flight\'!$B$2,"{{KEYWORD}}",B' + i + '),"{{GSC_IMPRESSIONS}}",C' + i + '),"{{GSC_POSITION}}",D' + i + '),"{{TOP_URLS}}",E' + i + '),"{{PAA}}",F' + i + '),"{{RELATED_SEARCHES}}",G' + i + '))';
    pb.getRange('K' + i).setFormula(kFormula);

    // Column M: Stage 1 Stitch Prompt
    var stitchIntro = '=== AI PROMPT: Stitch - Research to Article Prompt ===' + '\n\n' +
      'You are an SEO operations assistant for receiptscan.org.' + '\n\n' +
      'TASK: Take the research brief below and produce a completed, ready-to-run article prompt.' + '\n\n' +
      'Do not write the article. Only fill the template.' + '\n\n' +
      'TEMPLATE (fill every {{PLACEHOLDER}}):' + '\n';
    var stitchOutro = '\n\nRESEARCH BRIEF:\n';
    var stitchRules = '\n\nRULES:\n' +
      '- Fill every placeholder from the research brief.\n' +
      '- If a field is missing in the research brief, insert [VERIFY] rather than inventing it.\n' +
      '- Do not change the template structure.\n' +
      '- Do not add or remove sections.\n\n' +
      'OUTPUT: The completed prompt only. No commentary.';

    var mFormula =
      '=IF(L' + i + '="","",' +
      'TEXTJOIN(CHAR(10), TRUE, ' +
      '"' + stitchIntro.replace(/"/g, '""').replace(/\n/g, '"&CHAR(10)&"') + '", ' +
      "INDEX('Prompt Library'!$G$2:$G$10, MATCH(A" + i + ", 'Prompt Library'!$A$2:$A$10, 0)), " +
      '"' + stitchOutro.replace(/"/g, '""').replace(/\n/g, '"&CHAR(10)&"') + '", ' +
      'L' + i + ', ' +
      '"' + stitchRules.replace(/"/g, '""').replace(/\n/g, '"&CHAR(10)&"') + '"' +
      '))';
    pb.getRange('M' + i).setFormula(mFormula);
  }

  pb.getRange('K2:K101').setWrap(true);
  pb.getRange('L2:L101').setWrap(true);
  pb.getRange('M2:M101').setWrap(true);
  pb.getRange('N2:N101').setWrap(true);
  pb.setColumnWidth(2, 200);
  pb.setColumnWidth(3, 120);
  pb.setColumnWidth(4, 110);
  pb.setColumnWidth(5, 220);
  pb.setColumnWidth(6, 220);
  pb.setColumnWidth(7, 180);
  pb.setColumnWidth(8, 100);
  pb.setColumnWidth(9, 160);
  pb.setColumnWidth(10, 120);
  pb.setColumnWidth(11, 700);
  pb.setColumnWidth(12, 700);
  pb.setColumnWidth(13, 700);
  pb.setColumnWidth(14, 700);
  pb.setColumnWidth(15, 140);
  pb.setColumnWidth(16, 260);
  pb.getRange('K1:N1').setBackground('#0b5394');
  pb.getRange('O1:P1').setBackground('#38761d');

  // ==================================================================
  // PROMPT HISTORY
  // ==================================================================
  var phHeaders = [
    'Date Logged','Prompt Stage','Article Type','Target Keyword','AI Tool',
    'Prompt Template Used','AI Output Link','Output Size','Output Rating (1-5)',
    'Human Edit Time (min)','Issues Found','Fixes Applied','Published?','Reusable?','Notes'
  ];

  var phRows = [
    [
      new Date(),'Stage 0 - Research','Pillar','ai receipt scanner','ChatGPT',
      'Research Pre-Flight','','','',
      '','','','No','Yes','Research produced 12 secondary keywords and 6 FAQ ideas.'
    ],
    [
      new Date(),'Stage 2 - Article','Pillar','ai receipt scanner','ChatGPT',
      'Pillar','','','','',
      'Invented one statistic, generic intro','Removed fake stat, rewrote intro','No','Yes',''
    ]
  ];

  var ph = setupSheet('Prompt History', phHeaders, phRows);
  ph.getRange('A2:A1000').setNumberFormat('yyyy-mm-dd');
  ph.setColumnWidth(6, 160);
  ph.setColumnWidth(11, 300);
  ph.setColumnWidth(12, 300);
  ph.setColumnWidth(15, 320);
  ph.getRange('K2:O1000').setWrap(true);

  // ==================================================================
  // SETTINGS
  // ==================================================================
  setupSheet('Settings',
    ['Setting','Value','Notes'],
    [
      ['Site URL','https://receiptscan.org/',''],
      ['Brand voice','Practical, clear, no hype, specific examples',''],
      ['Target countries','US, UK, Canada, Australia','Prioritize US but add local tax pages'],
      ['Publishing cadence','1 article/day','30-day sprint'],
      ['Primary CTA','Try ReceiptScan free','Link to signup'],
      ['Schema defaults','Article, FAQPage, BreadcrumbList','Add HowTo/SoftwareApplication when relevant'],
      ['AI tool','ChatGPT/Claude/Jasper','Use for draft only'],
      ['Editor','','Assign human editor'],
      ['Three-stage pipeline','Stage 0 Research -> Stage 1 Stitch -> Stage 2 Article','Run in order. Do not skip Stage 0.'],
      ['How to use Prompt Builder','Fill columns A-J. Run Stage 0. Paste output in L. Copy M. Run in AI. Paste output in N. Run N for the article.','Every article follows the same 4-step flow.'],
      ['How to use Research Pre-Flight','Reference tab. Contains the master research prompt.','Do not edit unless you want to change AI behavior.'],
      ['How to use Prompt Library','Reference tab. One article template per type.','Called by Stage 1 Stitch to produce the Stage 2 prompt.'],
      ['How to use Prompt History','Log every prompt you run across all 3 stages.','Filter column B by stage to see research vs article runs.'],
      ['Placeholders used','{{KEYWORD}}, {{GSC_IMPRESSIONS}}, {{GSC_POSITION}}, {{TOP_URLS}}, {{PAA}}, {{RELATED_SEARCHES}}, {{SECONDARY_KEYWORDS}}, {{AUDIENCE}}, {{WORD_COUNT}}, {{INTERNAL_LINKS}}, {{EXTERNAL_SOURCES}}, {{FACTS}}, {{CTA}}, {{COUNTRY}}','Filled automatically by Prompt Builder.'],
      ['Rule','AI is for synthesis, not sourcing.','Paste real data, verify every [VERIFY].']
    ]
  );

  // ==================================================================
  // DATA VALIDATION
  // ==================================================================
  addDropdown(cal, 'E2:E1000', ['Pillar','Commercial','Informational','How-to','Comparison','Use case','Technical','Local/tax']);
  addDropdown(cal, 'F2:F1000', ['Top','Middle','Bottom']);
  addDropdown(cal, 'G2:G1000', ['Not Started','Outline','AI Draft','Human Edit','SEO Polish','Ready','Published','Needs Update']);
  addDropdown(cal, 'N2:R1000', ['Yes','No']);
  addDropdown(cal, 'T2:T1000', ['Yes','No']);

  var kb = ss.getSheetByName('Keyword Bank');
  addDropdown(kb, 'C2:C1000', ['Informational','Commercial','Transactional','Navigational']);
  addDropdown(kb, 'G2:G1000', ['High','Medium','Low']);
  addDropdown(kb, 'I2:I1000', ['To Do','In Progress','Done']);

  var hc = ss.getSheetByName('Humanization Checklist');
  addDropdown(hc, 'C2:C1000', ['Yes','No']);
  addDropdown(hc, 'D2:D1000', ['Not Started','In Progress','Done','N/A']);

  var il = ss.getSheetByName('Internal Links');
  addDropdown(il, 'D2:D1000', ['Pillar to Pillar','Pillar to Blog','Blog to Pillar','Blog to Blog','Pricing','Home']);
  addDropdown(il, 'E2:E1000', ['Planned','Added','Verified']);

  addDropdown(pb, 'A2:A101', ['Pillar','How-to','Comparison','Use case','Local/tax']);
  addDropdown(pb, 'O2:O101', ['Not Started','Research Prompted','Research Done','Stitch Prompted','Article Prompt Ready','Draft Generated']);

  addDropdown(ph, 'B2:B1000', ['Stage 0 - Research','Stage 1 - Stitch','Stage 2 - Article']);
  addDropdown(ph, 'C2:C1000', ['Pillar','How-to','Comparison','Use case','Local/tax']);
  addDropdown(ph, 'E2:E1000', ['ChatGPT','Claude','Jasper','Copy.ai','Writesonic','KoalaWriter','SurferSEO','Frase','Other']);
  addDropdown(ph, 'F2:F1000', ['Research Pre-Flight','Pillar','How-to','Comparison','Use case','Local/tax','Custom']);
  addDropdown(ph, 'N2:N1000', ['Yes','No']);
  addDropdown(ph, 'O2:O1000', ['Yes','No']);

  // ==================================================================
  // CONDITIONAL FORMATTING
  // ==================================================================
  addTextRule(cal, 'G2:G1000', 'Published', '#d9ead3');
  addTextRule(cal, 'G2:G1000', 'Ready', '#d9ead3');
  addTextRule(cal, 'G2:G1000', 'SEO Polish', '#fff2cc');
  addTextRule(cal, 'G2:G1000', 'Human Edit', '#fce5cd');
  addTextRule(cal, 'G2:G1000', 'AI Draft', '#cfe2f3');
  addTextRule(cal, 'G2:G1000', 'Not Started', '#efefef');
  addTextRule(cal, 'G2:G1000', 'Needs Update', '#f4cccc');

  addTextRule(cal, 'N2:R1000', 'Yes', '#d9ead3');
  addTextRule(cal, 'N2:R1000', 'No', '#f4cccc');
  addTextRule(cal, 'T2:T1000', 'Yes', '#d9ead3');
  addTextRule(cal, 'T2:T1000', 'No', '#f4cccc');

  addTextRule(kb, 'G2:G1000', 'High', '#f4cccc');
  addTextRule(kb, 'G2:G1000', 'Medium', '#fff2cc');
  addTextRule(kb, 'G2:G1000', 'Low', '#d9ead3');

  var gsc = ss.getSheetByName('GSC Tracking');
  addNumberRule(gsc, 'G2:G1000', 'lessThanOrEqual', 3, '#d9ead3');
  addNumberRule(gsc, 'G2:G1000', 'between', [4, 10], '#fff2cc');
  addNumberRule(gsc, 'G2:G1000', 'between', [11, 20], '#fce5cd');
  addNumberRule(gsc, 'G2:G1000', 'greaterThan', 20, '#f4cccc');

  addTextRule(pb, 'A2:A101', 'Pillar', '#cfe2f3');
  addTextRule(pb, 'A2:A101', 'How-to', '#d9ead3');
  addTextRule(pb, 'A2:A101', 'Comparison', '#fff2cc');
  addTextRule(pb, 'A2:A101', 'Use case', '#fce5cd');
  addTextRule(pb, 'A2:A101', 'Local/tax', '#e6d0f0');

  addTextRule(pb, 'O2:O101', 'Not Started', '#efefef');
  addTextRule(pb, 'O2:O101', 'Research Prompted', '#cfe2f3');
  addTextRule(pb, 'O2:O101', 'Research Done', '#fff2cc');
  addTextRule(pb, 'O2:O101', 'Stitch Prompted', '#fce5cd');
  addTextRule(pb, 'O2:O101', 'Article Prompt Ready', '#d9ead3');
  addTextRule(pb, 'O2:O101', 'Draft Generated', '#b6d7a8');

  addNumberRule(ph, 'I2:I1000', 'lessThanOrEqual', 2, '#f4cccc');
  addNumberRule(ph, 'I2:I1000', 'between', [3, 3], '#fff2cc');
  addNumberRule(ph, 'I2:I1000', 'greaterThan', 3, '#d9ead3');
  addTextRule(ph, 'B2:B1000', 'Stage 0 - Research', '#cfe2f3');
  addTextRule(ph, 'B2:B1000', 'Stage 1 - Stitch', '#fff2cc');
  addTextRule(ph, 'B2:B1000', 'Stage 2 - Article', '#d9ead3');
  addTextRule(ph, 'N2:N1000', 'Yes', '#d9ead3');
  addTextRule(ph, 'N2:N1000', 'No', '#efefef');
  addTextRule(ph, 'O2:O1000', 'Yes', '#d9ead3');
  addTextRule(ph, 'O2:O1000', 'No', '#f4cccc');

  // ==================================================================
  // CLEAN UP + FINISH
  // ==================================================================
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  ss.setActiveSheet(ss.getSheetByName('Prompt Builder'));
  console.log('ReceiptScan SEO Content HQ created.');
  console.log('URL: ' + ssUrl);
  return ssUrl;
}