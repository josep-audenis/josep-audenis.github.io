---
title: "Modeling Tennis Matches with Markov Chains"
date: 2025-10-06
permalink: /posts/2025/10/tennis-markov/
excerpt: "From the probability of winning a point to the probability of winning a match, exploring how Markov chains model the structure of tennis scoring."
tags:
    - Mathematics
    - Markov Chains
    - Probability
---

# Modeling Tennis Matches with Markov Chains

Tennis is a perfect playground for probabilistic modeling.  
Each point is an independent event — yet matches follow a deeply nested structure of **points → games → sets → matches**.  

In this post, we’ll explore how to model this structure using **Markov chains**, starting from a single-point probability and climbing up to the match-level outcome.  
The code and visualizations come from the *Tennis Markov* notebooks, where we build a hierarchical model step by step.


## Why Markov Chains Fit Tennis

A **Markov chain** models a system that transitions between states with certain probabilities, where the next state depends only on the current one.  

In tennis:
- Each **state** represents the current score (e.g. 30–15, deuce, etc.).
- The **transitions** depend on the probability of winning a point, \\(p\\), or losing it, \\(q = 1 - p\\).
- The **absorbing states** correspond to winning or losing a game, set, or match.

We can therefore model a tennis match as a **hierarchy of Markov chains**:

$$
\text{Point} \rightarrow \text{Game} \rightarrow \text{Set} \rightarrow \text{Match}
$$


## From Point to Game: The Core Transition Logic

Let \\(p\\)be the probability that Player A wins a single point.  
The goal is to compute the probability\\(P_{\text{game}}(p)\\)that Player A wins the entire game.

A tennis game follows “win by two” logic:
- A player must win **at least four points** and **lead by two**.

The possible scores (0, 15, 30, 40) correspond to (0, 1, 2, 3) points in the model.  
We can represent this as a **Markov chain** with transient states like (0–0), (15–0), (30–15), and absorbing states “Win” and “Lose”.


<img src="/images/blogs/tennis-markov/markov-points.jpg" alt="Game possible score transitions" width="350" style="display: block; margin: auto;">

The recursive formula for the probability of winning a game from state\\((a, b)\\)is:

$$
P(a, b) = p \, P(a + 1, b) + q \, P(a, b + 1)
$$

with boundary conditions:

$$
P(a, b) =
\begin{cases}
1 & \text{if } a \ge 4 \text{ and } a - b \ge 2,\\
0 & \text{if } b \ge 4 \text{ and } b - a \ge 2.
\end{cases}
$$

## The Deuce and the “Infinite Loop” Problem

When both players reach 40–40 (i.e.\\(a = b = 3\\)), the game enters the **deuce** state.  
From here, a player must win **two consecutive points** to win the game — but if each player alternates wins, the game can in theory continue indefinitely.

This introduces a **loop** in the Markov chain:

$$
\text{Deuce} \xrightarrow{p} \text{Advantage A} \xrightarrow{p} \text{Win A}
$$

$$
\text{Deuce} \xrightarrow{q} \text{Advantage B} \xrightarrow{q} \text{Win B}
$$

and both advantage states can return to **Deuce** if the other player wins the next point.


<img src="/images/blogs/tennis-markov/deuce-markov.jpg" alt="Deuce–advantage–deuce transitions." width="600" style="display: block; margin: auto;">

To handle this properly, we can derive the probability of eventually winning from deuce,\\(P_D\\), using infinite series or recursion.

Let\\(p\\)be the probability of winning a single point.

From deuce:
- With probability\\(p^2\\), Player A wins two consecutive points and wins the game.
- With probability\\(q^2\\), Player B wins two consecutive points and A loses.
- With probability\\(2pq\\), they split points and return to deuce.

Thus:

$$
P_D = p^2 + 2pq \, P_D
$$

Solving for\\(P_D\\):

$$
P_D = \frac{p^2}{1 - 2pq}
$$

Finally, the total game-winning probability is:

$$
P_{\text{game}}(p) = \sum_{k=0}^{2} \binom{3+k}{k} p^4 (1-p)^k + \binom{6}{3} p^4 (1-p)^3 P_D
$$


<img src="/images/blogs/tennis-markov/p_game.png" alt="Probability of winning a game" width="500" style="display: block; margin: auto;">



## From Game to Set: Building a Higher-Level Markov Chain

A tennis set is usually first to **six games**, win by two, with a possible **tiebreak at 6–6**.  
We can use the same recursive logic, but now the unit of progression is **games**, not points.

Let\\(g = P_{\text{game}}(p)\\)be the probability of winning a game.  
Then, the probability of winning a set,\\(P_{\text{set}}(g)$, can be expressed as:

$$
P_{\text{set}}(a, b) = g \, P_{\text{set}}(a + 1, b) + (1 - g) \, P_{\text{set}}(a, b + 1)
$$

with absorbing states for winning or losing the set.

For a 6-game win condition (ignoring tiebreaks):

$$
P_{\text{set}}(g) = \sum_{k=0}^{4} \binom{5+k}{k} g^6 (1-g)^k + \binom{10}{5} g^6 (1-g)^5 \frac{g^2}{1 - 2g(1-g)}
$$


<img src="/images/blogs/tennis-markov/p_set.png" alt="Prunning tree example" width="500" style="display: block; margin: auto;">


## From Set to Match: Putting It All Together

Finally, the probability of winning a match (best of 3 or 5 sets) follows naturally.  
Let\\(s = P_{\text{set}}(g)\\)be the probability of winning a set. Then:

For best of 3:

$$
P_{\text{match}}(s) = s^2 (3 - 2s)
$$

For best of 5:

$$
P_{\text{match}}(s) = s^3 (10 - 15s + 6s^2)
$$


<img src="/images/blogs/tennis-markov/p_match.png" alt="Probability of winning a match" width="500" style="display: block; margin: auto;">


## Conclusions

Markov chains offer an elegant mathematical lens for tennis:
- Each level (point, game, set, match) is a **nested stochastic process**.
- The probability of winning a match grows **superlinearly** with point-level advantage.
- The **deuce cycle** introduces a theoretically infinite loop, elegantly resolved using geometric reasoning.
- This modeling framework provides a foundation for deeper extensions, such as different\\(p\\)values on serve and return, or momentum effects.


<img src="/images/blogs/tennis-markov/p_all.png" alt="Probability of winning" width="500" style="display: block; margin: auto;">


## Repository and Notebook

All formulas and derivations in this post come from the *Tennis Markov* notebook, where the entire model is implemented and visualized.  
You can explore the code and plots here:

<a href="https://github.com/josep-audenis/tennis-markov" target="_blank">GitHub Repo</a>


**Next post preview:**  
In the next entry, we’ll extend this model by incorporating different probabilities for **serving** and **returning** points, exploring how service dominance affects the overall match dynamics.
