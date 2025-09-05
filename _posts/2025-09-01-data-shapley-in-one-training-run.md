---
title: "Data Shapley in One Training Run: Measuring Data Contribution at Scale"
date: 2025-09-01
permalink: /posts/2025/09/data-shapley-in-one-training-run/
excerpt: "A new paper introduces In-Run Data Shapley, a scalable method to measure how much each data point contributes to training a specific model without the prohibitive cost of retraining."
tags:
    - Machine Learning
    - Data Attribution
    - Shapley Values
---

When we train modern machine learning models, especially foundation models, the spotlight often shines on architectures and compute budgets. But lurking underneath is the raw material that powers everything: data.

Datasets for large-scale models are scraped from diverse sources, ranging from Wikipedia and scientific papers to blogs and random web crawls. Som of this data is **high-value** (it teaches models to generalize, capture nuances, or solve tasks). Other parts are **low-quality** or **harmful** (biased, noisy, misleading). And beyond technical concerns, there's the legal question: *whose data built these models, and how should they be compensated?

Answering all of this requires on thing: a way to measure the contribution of data points to a model's final performance.

## Enter Data Shapley

The most principled approach so far has been **Data Shapley**. Borrowed from cooperative game theory, Shapley values provide a fair way of splitting total "credit" among participants, in this case among training data points. If each data point were a "player", the Shapley value assigns a score reflecting how much that point helps improve model performance.


The beauty is that Shapley values satisfy fairness axioms:
- **Symmetry:** Equally impactful points get the same score.
- **Efficiency:** Total contributions add up exactly to the model's utility.
- **Linearity:** Contributions can be decomposed across multiple test sets.

In theory, this is exactly what we want. In practice, it breaks down. Computing Shapley values requires retraining the model on countless subsets of  data, which is computationally impossible at the scale of today's models. Even worse, retraining-based approaches only give "average" contributions across runs, not the impact on the specific model you actually trained and deployed.

## The New Idea: In-Run Data Shapley

A recent paper [*"Data Shapley in One Training Run"*](https://arxiv.org/pdf/2406.11011?) introduces a way around these limitations. The authors purpose ***In-Run Data Shapley***, which computes data contributions during a single training run, without retraining.

The insight is simple but powerful: since deep learning uses iterative optimization (SGD for example) each step is small enough that its effect can be approximated using Taylor expansions of the loss function.

- **First-order approximation:** Contribution is captured by gradient dot products between training examples and validation points.
- **Second-order approximation:** Adds an interaction term with the Hessian, which accounts for how a data point influence changes depending on the presence of others.

By accumulating these contributions across training steps, you get a Shapley-style attribution score for each data point, tied directly to the specific model you trained.

## Solving the Efficiency Bottleneck

The technical brilliance of the paper lies in making this scalable. Naively, computing per-example gradients and Hessians would slow training by 100x or more. The authors introduce ***"ghost" techniques*** to sidestep this:

- **Ghost dot-product:** Computes all gradient dot products in one backprop, reusing information already calculated.

- **Ghost gradient-Hessian-gradient:** EXtends the trick to second-order terms with just one extra backprop.

The results:

- First-order In-Run Shapley runs almost as fast as normal training.
- Second-order is about **2x slower**, but still vastly more efficient than older methods.

This transforms data attribution from an academic curiosity into something feasible for large models.

## What the Experiments SHow

The authors demonstrate In-Run Data Shapley with case studies on GPT-2 and Pythia-410M, using the Pile dataset. Three findings stand out:

1. **Data curation still has room to grow**

    Even the carefully curated Pile dataset contained ~18% of data points with *negative* Shapley values, meaning they actively harmed training. Removing these led to faster convergence and better performance. This suggests that even "clean" datasets waste compute and reduce model quality.

2. **Contributions are stage-dependent**

    In the early stages of training, general-domain text (like common web crawls) contributes most, helping the model learn basic language structure. Later, domain-specific corpora (like arXiv papers for math validation tasks) take over. In other words, data value shifts over time, something previous approaches couldn't capture.

3. **Copyright implications go beyond memorization**

    A striking finding: even when validation examples were paraphrases or rewrites of training data with no lexical overlap, the original data still ranked highly in contribution. This suggests that copyrighted material may meaningfully shape model capabilities even when outputs are not direct copies, raising new questions about compensation frameworks for data creators.

## Why It Matters

This paper marks a turning point in data attribution research:

- **For ML practitioners:** It provides a tool to actively debug and curate datasets, potentially saving compute and improving quality.
- **For AI governance:** It gives a technical foundation for debates on  copyright, royalties, and data ownership in generative AI.
- **For research:** It unlocks the ability to study how data shapes models across different phases of training, at the scale of foundation models.

## Limitations and Open Directions

Like any method, In-Run Data Shapley comes with caveats. It assumes validation data is available before training, and it currently works most naturally with SGF (extensions to optimizers like Adam remain a challenge). Large-batch training may require memory workarounds. Still, the framework is flexible and promising.

## Final Thoughts

We've long known that ***"better data beats bigger models"***, but measuring *what better means* has been elusive at scale. By turning Shapley values into something practical, In-Run Data Shapley gives us a new lens to understand, and ultimately control, the data that fuels AI.

--- 

What do you think? Should models start accounting for data contributions in real time, or is this just an academic curiosity that won't make it into practice? 

Drop your thoughts in the comments, I'd love to hear how you see data attribution shaping  the future of AI.

