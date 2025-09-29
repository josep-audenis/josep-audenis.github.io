---
title: "Why Language Models Hallucinate: A Statistical Story Behind Confident Falsehoods"
date: 2025-09-29
permalink: /posts/2025/09/hallucinations/
excerpt: "Large language models don't just make mistakes, they confidently guess when uncertain. A new paper explains why: our training and evaluation pipelines statistically reward guessing over honesty, making hallucinations an inevitable byproduct of current practices."
tags:
    - Artificial Intelligence
    - Language Models
    - AI Safety
---

If you've ever used a large language model and gotten a confident but wrong answer, you've witnessed a *hallucination*. These aren't just quirks, they're systematic. Even the latest models still do it, sometimes hilariously ("there are 3 D's in DEEPSEEK") and sometimes alarmingly (fabricating citations or medical facts).

A new paper, <a href="https://arxiv.org/pdf/2509.04664" target="_blank"><strong><em>"Why Language Models Hallucinate"</em></strong></a>, argues that hallucinations aren't mysterious. They're baked into the math of how we train and evaluate language models. The authors show that *current pipelines reward guessing over uncertainty*, making hallucinations a predictable outcome.

Let's unpack what they found.

## What Exactly Is a Hallucination?

In this paper, hallucinations are defined as *plausible falsehoods*: statements that look right but aren't. They're different from nonsense (like "blork frindle zazz"), which state-of-the-art models mostly avoid. And they're not just random mistakes either, they're often specific, overconfident answers like "September 30" instead of "Sometime in autumn."

The authors distinguish two main types:

- **Intrinsic hallucinations**: Responses that contradict the user's prompt (e.g., miscounting letters).
- **Extrinsic hallucinations**: Responses that contradict the training data or external reality (e.g., making up someone's birthday).

This framework helps them analyze hallucinations as a statistical error class, like misclassification in supervised learning.


## Why Pretraining Alone Produces Hallucinations

Even if you trained on a *perfect*, error-free dataset, today's pretraining objectives would still produce hallucinations. Why? Because generating valid text is statistically harder than classifying it.

The authors formalize this with an "Is-It-Valid" (IIV) binary classification problem: can a model tell if a string is valid (+) or erroneous (-)? They show that any language model can be turned into an IIV classifier, and that its generative error rate is at least **twice its misclassification rate** on IIV.

This leads to a striking conclusion:

> **Even on perfect data, well-trained base models must produce some errors.**

They also extend earlier work to show that hallucination rates track the *singleton rate*, the fraction of facts that appear only once in training. If 20% of birthdays appear once, the model will hallucinate at least 20% of birthdays it's asked about.


### Examples from the Paper  

- **Arbitrary facts**: Rare, one-off facts (like obscure birthdays) are prone to hallucination because the model has no pattern to learn.  
- **Poor models**: When the model architecture can't represent a concept well (e.g., counting letters when tokenization splits words), it misclassifies and hallucinates.  
- **Garbage In, Garbage Out (GIGO)**: Even base models trained on massive corpora replicate factual errors embedded in the data.  

These aren't quirks of Transformers or next-word prediction, they're fundamental to *density estimation* itself.


## Why Post-Training Makes It Worse

You might think post-training (like RLHF) should *fix* hallucinations. It can help, but the authors argue it also entrenches them. Here's why.

Most benchmarks and leaderboards use **binary scoring**: correct answers get 1 point, everything else gets 0. Uncertainty, "I don't know" or hedging, is penalized as harshly as being wrong. That's like an exam where leaving a question blank costs you the same as answering incorrectly. Naturally, the optimal strategy is to guess.

Kalai et al. call this the "epidemic of penalizing uncertainty." It's why models are always in "test-taking mode": they've learned that bluffing is rewarded.

They show that even Retrieval-Augmented Generation (RAG) or reasoning doesn't solve this if the scoring still penalizes abstentions.


## A Socio-Technical Fix: Change the Tests, Not Just the Models

A core argument of the paper is that hallucinations persist not because we lack better hallucination benchmarks, but because our *primary* evaluations are misaligned. The fix isn't just more hallucination-specific tests, it's changing how we grade mainstream ones.

They propose adding **explicit confidence targets** to evaluations. For example:

> "Answer only if you are >75% confident. Mistakes are penalized 2 points, ‘I don't know' earns 0 points."

This mimics real-world settings (like old SAT or GRE scoring) where guessing is risky unless you're sure. Models trained and evaluated under these conditions would have an incentive to express uncertainty rather than bluff.

This also introduces the idea of **behavioral calibration**: instead of outputting a probability, the model learns to give the *most useful response consistent with its confidence threshold*. Auditors can then check performance across thresholds.


## Why This Matters

This paper reframes hallucination as a **statistical inevitability under current practices**. Some takeaways:

- **Base models can't avoid all hallucinations**. Even perfect training data won't help.  
- **Post-training pipelines reward overconfidence**, turning "I don't know" into a losing strategy.  
- **Evaluation changes could realign incentives**, making it easier for post-training to reduce hallucinations instead of reinforcing them.  

The upshot? Hallucinations aren't a mysterious property of neural networks, they're a predictable consequence of how we train and grade them.


## My Takeaway  

What I like about this paper is how it turns a fuzzy, almost mystical problem, "why do LLMs hallucinate?", into something concrete and measurable. By tying hallucinations to binary classification and grading incentives, it gives us a roadmap for mitigation: change the scoring, not just the model.

It also hints at a deeper truth: *AI safety isn't just about what models know, it's about the incentives we create.* Models learn to play the game we set up for them. If the game rewards guessing, they'll guess. If the game rewards honesty, they'll abstain.

---

If you're working on language models, evaluations, or AI safety, this paper is worth a read. It challenges the assumption that hallucinations are mysterious, inevitable, or purely architectural, and points to a clear, testable way to make models more trustworthy.

What do you think? Should we rethink how we evaluate LLMs to reward uncertainty and honesty, or is hallucination just another inevitable quirk we'll have to engineer around?  
Drop your thoughts in the comments, I'd love to hear how you'd approach this.