---
name: seo-presentation-copy
description: Rewrite, audit, and improve website presentation copy with a strong SEO lens while reducing ambiguity and improving content design. Use when working on hero text, about sections, service blocks, landing page messaging, FAQ copy, contact sections, metadata, or any web copy that must rank better, read clearer, and fit the existing UI without sounding generic.
---

# SEO Presentation Copy

## Overview

Audit and rewrite website presentation text so it is clearer, less ambiguous, more searchable, and better matched to the page layout. Focus on SEO, information scent, readability, and content design rather than generic marketing filler.

## Workflow

### 1. Build context from the actual page

Inspect the source of truth before rewriting. Prefer source files over rendered HTML.

- Read copy from i18n files, section data, CMS payloads, or component props.
- Identify the page type: portfolio, landing page, service page, homepage, about page, or case study.
- Identify the audience, geography, and intent.
- Extract the primary topic, secondary topics, entity names, services, stack, location, and CTA targets.
- If the page is multilingual, compare languages and keep semantic parity.

For React/Vite projects, common places to inspect are section components, translation files, metadata files, and CTA/link definitions.

### 2. Diagnose before rewriting

Review the text against four dimensions:

1. SEO clarity
   - Does the copy clearly name the person, company, service, role, problem, and location?
   - Do important phrases appear early in headings and lead paragraphs?
   - Is the wording aligned with plausible search intent?
2. Ambiguity
   - Remove vague claims like "build amazing solutions" unless they are anchored to a concrete outcome.
   - Replace pronouns or generic labels that hide who does what.
   - Remove overloaded phrases that could mean several things.
3. Content design
   - Check heading hierarchy, density, scanning, CTA clarity, and whether the text fits the available space.
   - Prefer short, high-signal lines for cards and panels.
   - Avoid long labels in compact UI blocks unless the layout clearly supports them.
4. Voice and differentiation
   - Keep the tone credible, specific, and grounded in real strengths.
   - Avoid generic startup copy, buzzword stacks, and keyword stuffing.

Use the checklist in `references/review-checklist.md` when the rewrite touches multiple sections or when the page feels noisy or unfocused.

### 3. Choose the rewrite depth

Pick the lightest rewrite that solves the problem.

- Micro rewrite: tighten a heading, subtitle, chips, CTA, or metadata.
- Section rewrite: rework a hero, about block, services block, FAQ, or contact section.
- Messaging pass: align the whole page around one positioning angle and a small keyword set.

Preserve the existing design system and component constraints. Write to the shape of the UI, not against it.

### 4. Rewrite with SEO and UI constraints

Apply these rules:

- Put the primary entity and topic early.
- Use one primary phrase per section, supported by secondary phrases.
- Favor concrete nouns and verbs over abstractions.
- Keep hero headlines direct and scannable.
- Keep supporting copy compact enough for the layout.
- Preserve semantic consistency across headings, chips, CTAs, FAQ, and metadata.
- If the UI is a bento, card grid, or compact dashboard, shorten labels aggressively.
- If the user already has a strong brand voice, refine it rather than replacing it.

Examples of good direction:

- Better: `Backend software engineer in Armenia, Quindio building scalable APIs with Python and FastAPI`
- Worse: `Engineer passionate about innovative digital solutions`

### 5. Deliver the result in a useful format

If the user asks for an audit, return:

- Findings ordered by severity
- Ambiguous or weak phrases
- SEO gaps
- Suggested rewrites

If the user asks for implementation, update the source files and keep the changes structured:

- metadata and SEO text
- hero and presentation blocks
- CTA labels and support text
- multilingual parity if applicable

## Copy heuristics

- Prefer specificity over breadth.
- Prefer `who + what + where + outcome` over slogans.
- Use location only when it adds search value or trust.
- Name frameworks, services, and specialties only when they support the page intent.
- Keep repeated phrases intentional; repetition is good when it reinforces a target topic, bad when it feels accidental.
- Do not stuff the same keyword into every block.
- Do not promise outcomes the rest of the page cannot support.

## Multilingual pages

When the page supports multiple languages:

- Rewrite the source language first.
- Translate meaning, not word order.
- Keep keyword intent equivalent across languages.
- Shorten localized strings if the UI is compact.
- Watch for cases where one language fits and the other overflows.

## Common triggers

This skill is a good fit for requests like:

- "Improve the hero text for SEO"
- "Make this homepage copy less ambiguous"
- "Rewrite my about section so it ranks better"
- "Audit the landing page messaging and CTA clarity"
- "Fix the presentation text without breaking the design"
- "Improve the bilingual copy on my portfolio"

## Resources

Read `references/review-checklist.md` when you need a compact scoring rubric for SEO, ambiguity, information scent, and layout fit.
