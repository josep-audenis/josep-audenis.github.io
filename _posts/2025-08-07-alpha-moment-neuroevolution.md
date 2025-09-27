---
title: "An AlphaGo Moment for Neuroevolution? A Paper That Felt Uncannily Familiar"
date: 2025-08-07
permalink: /posts/2025/08/alphago-moment-neuroevolution/
excerpt: "I recently read a paper that made me do a double take — it felt like a high-powered version of my own Neuroevolutions project. In this post, I break down the key ideas from 'An AlphaGo Moment for Model Architecture Discovery' and how they connect to the genetic algorithms I used to evolve RL agents."
tags:
  - Evolutionary Algorithms
  - Genetic Algorithms
  - Reinforcement Learning
  - Neural Architecture Search
  - Deep Learning
  - Artificial Intelligence
---

I recently came across a paper titled <a href="https://arxiv.org/pdf/2507.18074" target="_blank"><strong><em>"An AlphaGo Moment for Model Architecture Discovery"</em></strong></a>, and while reading it, I couldn’t help but feel a strange sense of déjà vu.

Not because I’ve worked on neural architecture search before, but because the **core strategy used in the paper — evolution instead of gradient descent — was almost exactly what I explored in my** <a href="https://josep-audenis.github.io/portfolio/neuroevolutions/" target="_blank"><strong>Neuroevolutions project</strong></a>.

Sure, the scale and goal are different. They’re evolving architectures for image and language models; I evolved policies to solve reinforcement learning environments. But underneath both is the same idea:

> **Don’t optimize by gradients. Let evolution guide the search.**

Let’s dive into what this paper does — and why it felt like it was speaking my project’s language.

## What’s This Paper About?

The authors of the paper aim to solve a classic challenge in deep learning: **how to find better neural network architectures** without human intuition or brute-force grid searches.

Instead of hand-crafting architectures (like ResNet, Transformer, etc.), they let a **population of neural architectures evolve** over time using:
- Mutation and crossover (just like in biology)
- Fitness evaluation (based on model performance)
- Selection of the top performers to breed the next generation

This process is called **Neural Architecture Search (NAS)**, but their twist is to do it **without gradients or reinforcement learning**. The entire discovery pipeline is driven by **evolutionary algorithms**.

And it works — they evolve architectures that match or outperform modern baselines on ImageNet and language modeling tasks.



## How It Works (In Simple Terms)

Here’s a rough breakdown of their pipeline:

1. **Start with a population of random architectures.**
2. **Evaluate each one**: Train it briefly, see how well it performs on a task.
3. **Select the fittest** models (based on accuracy or loss).
4. **Mutate and recombine** the top models to create new architectures.
5. **Repeat** the process across multiple generations.

It’s kind of like a genetic breeding ground for neural networks — but instead of evolving animal traits, we’re evolving skip connections, activation functions, and layer types.



## This Felt… Familiar

When I was building my Neuroevolutions project, I applied genetic algorithms to evolve neural network policies for reinforcement learning environments like:
- <a href="https://github.com/josep-audenis/neuroevolution-cart-pole" target="_blank"><strong>CartPole-v1</strong></a>
- <a href="https://github.com/josep-audenis/neuroevolution-lunar-lander" target="_blank"><strong>LunarLander-v3</strong></a>
- <a href="https://github.com/josep-audenis/neuroevolution-bipedal-walker" target="_blank"><strong>BipedalWalker-v3</strong></a>

My networks were **simple feedforward models**, and instead of optimizing them with backpropagation, I used:
- Random initialization of weights
- Fitness scores from cumulative episode rewards
- Selection, crossover, and mutation to improve performance over generations

That’s evolution — raw and unfiltered.

The main difference?  
I was evolving **weights** to control an agent’s behavior.  
They’re evolving **architectures** to improve performance on vision and language tasks.

But the idea is the same:
> Search through the space of neural networks using genetic algorithms.


## Gradients? Who Needs ‘Em?

What I found really exciting about both projects is this:
> **You don’t need gradients to learn.**

In most ML pipelines, gradients and backpropagation are sacred. But evolutionary approaches sidestep all of that.

- No need for differentiability.
- No risk of exploding or vanishing gradients.
- No assumptions about the function you're optimizing.

Instead, evolution offers:
- **Exploration over exploitation** — it's less likely to get stuck in local minima.
- **Simplicity** — no need to tune learning rates or optimizers.
- **Robustness** — works even when gradients are noisy or undefined.

It’s not always more efficient, but it’s surprisingly effective — and that’s what makes both the paper and my project so interesting to me.



## Why This Paper Matters (and Why My Project Does Too)

The paper makes a bold claim — that **NAS using evolution could be the next "AlphaGo moment"** in AI. A breakthrough that shifts how we approach architecture design, just like AlphaGo changed how we think about reinforcement learning and search.

That might sound lofty, but I think it signals something deeper:
> **We’re moving from hand-engineered intelligence to automatically evolved intelligence.**

My project is a small-scale version of that philosophy.  
It’s not trying to beat SOTA on ImageNet. But it proves the same point — that **complex behavior can emerge from simple rules, if you let evolution take control**.



## Final Thoughts

Reading this paper felt like looking into a more powerful version of the approach I used.  
They have scale, compute, and benchmark results. I had curiosity, OpenAI Gym, and a stubborn love for clean evolutionary code.

But in both cases, the heart of the project is the same:
> Evolution works — not just in nature, but in artificial intelligence too.

---

If you're curious, you can check out the three environments I tackled and the genetic algorithm framework I built:

- <a href="https://github.com/josep-audenis/neuroevolution-cart-pole" target="_blank"><strong>CartPole Neuroevolution Repo</strong></a>
- <a href="https://github.com/josep-audenis/neuroevolution-lunar-lander" target="_blank"><strong>LunarLander Neuroevolution Repo</strong></a> 
- <a href="https://github.com/josep-audenis/neuroevolution-bipedal-walker" target="_blank"><strong>BipedalWalker Neuroevolution Repo</strong></a> 

---

Stay tuned!
