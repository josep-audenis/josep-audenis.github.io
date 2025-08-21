---
title: "Research Radar: Staying Ahead of the Curve in Scientific Publications"
date: 2025-08-21
permalink: /posts/2025/08/research-radar/
excerpt: "Keeping up with research is overwhelming. Research Radar helps you track the latest publications and insights effortlessly."
tags:
    - Research Tools
    - Data Science
    - Academic
---

In today's fast-moving scientific landscape, keeping up with the latest publications can feel like chasing a runaway train. From preprints to journal articles across multiple disciplines, there's simply too much content to track manually. That's why I created [**Research Radar**](https://github.com/josep-audenis/research-radar), a tool designed to help researchers, students, and enthusiasts stay up to date with the latest findings in their field.

Before building Research Radar, I found muself constantly searching multiple journal websites, newsletters, and Reddit forums trying to find new and interesting papers, an exhausting and inefficient process. Important papers could easily slip through the cracks, and organizing relevant publications for later reading was cumbersome. How much more would I learn if all those hours looking for papers would have been spent in studing them instead of searching for them in recondit forums in the internet.

## Relevant Features and Future Improvements

Research Radar is a lightweight, yet powerful tool that consolidates research publications from ArXiv. Its core features include:

1. **Keyword & Topic Filtering:** Define keywords, or topics you care about, and get only the publications that match your interests.
2. **Relevant Store:** Store relevant publications for later reading.

At the moment it's quite simple but future implementations will include:

1. **Daily/Weekly Digests:** Research Radar will periodically scan for new and relevant to you papers and send an email to your inbox with a digest of new papers.
2. **Advance Filtering:** Filter by authors or full paper keywrod search.
3. **Export & Download:** Download papers or export them to your reference manager.

## How it Works

At its core, Research Radar checks for ArXiv feed for all publications and filtering out those papers that are not of your interest. It takes into account you preferences through a **json** file where the user can check which fields are of their interest and which keywords do they look for. These keywords will be searched for in the title and the abstract of the paper, if they match, it will he added to the list of relevant papers.

## Benefits

- **Stay Up-to-Date:** Never miss important publications in your domain.
- **Save Time:** Skip sifting through irrelevant papers.
- **Increase Productivity:** Focus on reading and research rather than searching.
- **Discover Trends:** Identify emerging topcis and shifts in your field early.

## Example Use Case

Imagine you are a data scientist interested in **offline reinforcement learning**. Instead of manually checking multiple ArXiv categories, Research Radar filters for you keywords and sends you a digest. Now every morning it only takes you 10 minutes to read through all new papers abstracts instead of spending hours looking for the papers. Now you can spend more time implementing ideas rather than hunting for them.

---

If keeping up with research feels overwhelming, give Research Radar try. Stay informed, save time, and focus on waht truly matters: creating, experimenting, and contributing to your field

[Explore Research Radar](https://github.com/josep-audenis/research-radar)