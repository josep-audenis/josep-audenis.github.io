---
title: "Solving a Million-Step LLM Task with Zero Errors: The Power of Massively Decomposed AI"
date: 2025-11-10
permalink: /posts/2025/11/million-step-task/
excerpt: "A groundbreaking paper introduces MAKER, a system that solves a million-step LLM task with zero errors by breaking problems into tiny pieces and voting on each step. It's a new path to scalable, reliable AI."
tags:
    - Artificial Intelligence
    - Machine Learning
    - Large Language Models
    - Multi-Agent Systems
    - AI Reliability
---

What if I told you that AI could now solve tasks requiring over a million steps without making a single error? That's exactly what a new paper from Cognizant AI Lab and UT Austin demonstrates with their system called **MAKER**, and it fundamentally changes how we think about scaling AI.

The paper, <a href="https://arxiv.org/abs/2511.09030" target="_blank"><strong><em>"Solving a Million-Step LLM Task with Zero Errors"</em></strong></a>, tackles a problem that has long haunted AI research: LLMs are fundamentally unreliable over long sequences. Even with per-step error rates as low as 0.1%, the probability of successfully completing a thousand-step task is near zero. For a million-step task? Forget about it.

But MAKER does it. And it doesn't rely on building smarter base models. Instead, it smashes intelligence into a million pieces.

## The Scaling Problem Nobody Talks About

We've become obsessed with building ever-larger LLMs, chasing marginal gains on benchmarks with short reasoning chains. But real-world impact often comes from executing long, complex processes, think supply chains, scientific research, or large-scale software projects, where a single error can derail everything.

The recent Towers of Hanoi benchmark perfectly illustrates this challenge. While LLMs can solve small instances, their success rate plummets to zero beyond 5-6 disks. The problem isn't intelligence, it's reliability. At scale, even tiny error rates become certain failure.

As the authors put it:

> "Technological achievements of advanced societies are built on the capacity to reliably execute tasks with vast numbers of steps."

We're hitting a quiet wall in AI development: we can build models that seem intelligent in short bursts, but they collapse when asked to maintain precision over extended horizons. This limitation affects everything from automated software engineering to scientific discovery pipelines.

## MAKER's Brilliantly Simple Insight

MAKER's approach rests on three key ideas that work together to achieve what single agents cannot:

### 1. Maximal Agentic Decomposition (MAD)

Instead of having one monolithic LLM tackle the entire problem, MAKER breaks it down into the smallest possible steps, in this case, over a million individual disk moves in the Towers of Hanoi problem. Each micro-agent gets exactly one job: execute a single step.

This extreme decomposition has surprising benefits. It allows the use of smaller, cheaper models, you don't need a reasoning-optimized o3-mini to move one disk when gpt-4.1-mini can do it just as well. More importantly, it prevents context pollution: each agent focuses only on what it needs to know for its specific step, avoiding the confusion that creeps into long reasoning chains.

### 2. First-to-Ahead-by-K Voting

Here's where the magic happens. For each step, MAKER samples multiple independent responses from the base LLM. It keeps sampling until one candidate solution has K more votes than any alternative.

This isn't just majority voting, it's a more robust scheme borrowed from sequential probability testing. The mathematics are compelling: even with a base per-step accuracy of only 60%, the system can achieve near-perfect reliability with moderate K values. The cost scales log-linearly with task length, making million-step tasks economically feasible.

### 3. Red-Flagging for Error Detection

MAKER automatically discards responses that show signs of confusion. Two main red flags are used: overly long reasoning chains and incorrectly formatted outputs. The research found that once an LLM's response exceeds about 700 tokens, its error rate increases precipitously. Similarly, formatting errors often indicate deeper reasoning problems.

By discarding these problematic responses, MAKER improves both average accuracy and, more importantly, reduces correlated errors across samples, a critical factor for scaling.

## Results That Defy Expectations

Using this approach, MAKER successfully solved the 20-disk Towers of Hanoi problem, requiring 1,048,575 steps, with zero errors. The system used gpt-4.1-mini as its base model, demonstrating that you don't need the most advanced reasoning models for long-horizon execution.

The empirical results validated the theoretical scaling laws perfectly. The number of undecided steps decreased exponentially with each voting round, and the vast majority of cost was incurred in the first few sampling rounds. After the initial K samples, completing the remaining steps became essentially a rounding error in terms of both cost and time.

Perhaps most strikingly, the approach proved robust even against "pathological steps", particular inputs that had unusually high inherent error rates. The voting mechanism, combined with red-flagging, eventually converged to correct solutions even for steps that required up to 18 voting rounds.

## Why This Changes Everything

This work represents what the authors call a "multi-agent advantage", akin to quantum advantage, where a multi-agent system can solve problems that are fundamentally unsolvable by any single agent.

It suggests an entirely different path forward for AI scaling:

> Instead of building endlessly larger models, we can achieve superintelligence through massively decomposed agentic processes (MDAPs).

This approach offers several compelling benefits that could reshape how we build AI systems:

- **Democratization:** Smaller organizations can tackle large problems using cheaper, more accessible models
- **Safety:** Micro-agents have limited scope and influence, reducing risks of harmful behaviors
- **Reliability:** Error correction makes systems predictable and trustworthy at scale
- **Efficiency:** The right model can be matched to each micro-task, optimizing cost and performance
- **Transparency:** Each step can be monitored and audited independently

## Parallels with Successful Systems

What's fascinating about MAKER is how it mirrors patterns that have driven scalability in other domains. The decomposition into micro-agents echoes microservices architecture in software engineering, where breaking monolithic applications into focused services enables scaling and maintainability. The voting mechanism resembles error-correcting codes in digital communications that make reliable data transmission possible over noisy channels.

As the authors note, this isn't just another AI technique, it's leveraging fundamental principles that have enabled scaling across computing, biology, and human organizations.

## The Future is Decomposed

The MAKER framework isn't limited to puzzle-solving. The authors demonstrate preliminary success on multi-digit multiplication and suggest applications to software engineering, scientific discovery, and large-scale planning. The framework could be extended to handle insight generation alongside execution, creating fully automated problem-solving pipelines.

What excites me most is the potential for this approach to address AI safety concerns. By keeping each agent's role limited and implementing voting at every step, we reduce the risk of single points of failure and make systems more transparent and controllable.

As the authors conclude:

> "LLMs today have just about all the raw intelligence needed to scaffold them into the great superintelligent skyscrapers of the coming age."

We might not need smarter AI. We might just need AI that's better at working together in massively decomposed, error-corrected processes.

---

What do you think? Is massive decomposition the key to reliable AI at scale, or are we just pushing the complexity into the system architecture? Would you trust a million micro-agents over one super-intelligent model for critical applications?

I'd love to hear your thoughts in the comments. If you found this breakdown compelling, stay tuned, I'll be exploring more frontier AI research in the coming weeks.

