---
title: "Advanced R-GAN: Smarter GANs for Fraud Detection in Imbalanced Datasets"
date: 2025-08-25
permalink: /posts/2025/08/advanced-rgan-fraud-detection/
excerpt: "A deep dive into Advanced R-GAN, a GAN-based approach for anomaly detection that generates realistic minority samples, improves model performance, and adds explainability to AI systems."
tags:
    - Artificial Intelligence
    - Machine Learning
    - GAN
---

## Imbalanced Data: The Invisible Barrier

If you look at a real-world fraud detection dataset, you'll immediately notice a problem: almost everything is normal. In the popular [Kaggle credit dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud/data), fewer than 500 out of nearly 285,000 transactions are fraudulent, less than 0.2%. A model that simply predicts "not fraud" every time will score a near-perfect accuracy of 99.8%, yet it is useless. This imbalance between majority classes is the invisible barrier that undermines many anomaly detection systems.

Traditional approaches have tried to get around this problem in different ways. Oversampling methods such as SMOTE create synthetic minority samples, but often end up placing them in unrealistic parts of the feature space. Undersampling does the opposite, throwing away data from the majority class and risking information loss. Algorithm-level tweaks like cost-sensitive learning can shift the balance by penalizing certain misclassifications more heavily, but they require careful manual tuning. Even ensemble methods, as powerful as they are, can overfit when the minority class is too small. None of these strategies solve the fundamental issue: the model is trying to learn from data that simply isn't representative of the real-world distribution.

This is where Generative Adversarial Networks (GAN) have started to show promise. Instead of crudely duplicating  or interpolating minority samples, GANs can actually learn the underlying distribution of fraudulent transactions and generate new, realistic instances. By doing so, they can rebalance the dataset in a way that preserves its integrity.

## The Idea Behind Advanced R-GAN

The paper [***"Advanced R-GAN: Generating anomaly data from improved detection in imbalanced datasets"***](https://pdf.sciencedirectassets.com/270704/1-s2.0-S1110016824X00253/1-s2.0-S1110016824012523/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAUaCXVzLWVhc3QtMSJHMEUCIDd89g0PwbAlsL9ru3dJ3eff%2F2s%2Bg5eDepfg62dG93VNAiEA3yRh9p7fPe6WU6%2FGXRo4t4t6EGy3%2FFQ9ZvyeUXjlaN4qswUIXhAFGgwwNTkwMDM1NDY4NjUiDOXqaL1BUuzHqVUGeCqQBYzY%2Feb2YFTT7rhxYo%2F72%2F4WKn5SdXEEGHGq8jW8mUbAjZ%2BbIHgAzhqL9R%2FwePt4zNcVzfsquvjPQ84tA%2FypszWHsoVUx6SbKiMPT1xUZDyYqvIqhgBO9LQJ1bKSniEVBcVtr83dmzMwB3FXLom%2B5zpT17ZSilBfdxaeQg4Y9qgDnZZDJY7I5mGyIQJFCJb100C66Hxm3scKEHi%2BucT2YNYxKrD3jP0gbzQWeEOMTmqb8u%2BBDRbPM8SMHYEztOaFww3ofZK7NxMcwfAWse8NgKfqccNW2nm6XlwZGIjZY3se2RkvZy270T68O7dUWUmyTag%2Fdym3nPubIhQn8pmpcC9T3C2lSvv2%2FYroAua4DbYd%2B6Qww3PCYKz4x87j9zbW%2FFfN0dw%2F86O%2FHPCPENoO%2BseAOqvNoYXppLMC%2Bf4OEFfnuDz1V02oy8Sb3D8HdXb%2Bne4ZQD4M3zhxMwPa1Jb1en7Sh7qMtJxvMukeI4kpwF%2F24ktqSIthir7XbpDOU1HdBfJHCuN3CsBhCYrA3NtIMBJeukSrPzcpdj9T7TNp7J90z7eTvAsCdjwvGp%2Bx1CRxugsPS4CbPb313I6KsHW4fXkf4Tl7ElYHQdsQ8ME3bV3VgTf5KZTRao%2FQdCfiS88W5%2FKxFW0uiWNceccsLscCfpXov9NruBXlZCYovQQjZjhl%2FU7HHR7GeFtLJ72oMvT3%2BJvmDEqszJ5fFidjZcd8GQEWe6Q5AMWNvW5RtarOau0WexqtGEiqAMzWrQOYQyX7G2ognC7eKKYEwrZBLVi5gPLMxPq%2BvmA48efIpxJDgvwWYLqJZ7JVeW10gkqObkwcO1FlrgxqKbF5OmiAsnA%2FB9qvj4OUc9AfsRqOOZbFsel9MIG7scUGOrEBoCvBJNmOpR4k4MRvyuCQvPL6LxXO4Nepm4fYRh7ntgWCrq3F0jPkk1dQn5pgSazIQhGYT6SXPqTY2eQjhSmCiLiPMbRLhpK8eE2%2B%2FuAJx22NZ6%2B88r7JfM4rIs2r101ZmjfIjnR9dNrUOSWDOD8vv8MPm5Xhsusyn%2FQcMR2IzIMEoyyEo1QvYUX7AOiSW9MqIx8%2F%2BKc89AlliaZyNjFpmk8czynJvG%2FvESqtz4C4AlfW&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250825T132422Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTY6CMWB5GI%2F20250825%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a74577a964a0a2fb5f2df498f76d663b4b7b0dd179be2a034281a527f93284f2&hash=73340f0b0cac1238d88953615c12430f7ec8533fc9834edf7b49217d58fb31c7&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S1110016824012523&tid=spdf-c2aee091-d119-4ff4-8086-a9b0795e70ba&sid=f9c8b6b9277dc94fec7a3c9276cb5f8c52ddgxrqb&type=client&tsoh=d3d3LnNjaWVuY2VkaXJlY3QuY29t&rh=d3d3LnNjaWVuY2VkaXJlY3QuY29t&ua=001459515506525c0c50&rr=974b68c68823217a&cc=es) builds on this intuition and takes GAN-based resampling further. The authors propose a ***regularized GAN (R-GAN)*** tailored specifically to anomaly detection in highly imbalanced settings.

What makes their approach interesting is not just that they use a GAN, but how they carefully modify both the generator and discriminator to produce synthetic samples that are faithful to the minority class while avoiding the common pitfalls of GAN training.

- **Generator:** Inspired by SNGAN, it uses spectral normalization to stabilize training and prevent mode collapse. This ensures that the fraudulent samples it generates are diverse rather than repetitive.

- **Discriminator:** Replaces the common LeakyReLY with CELU, a smoother activation that captures non-linear relationships more effectively and provides better gradients during training.

- **Similarity Measure Loss:** Adds a regularization term that compares features of real and synthetic fraud samples from the discriminators hidden layer, forcing the generated data to align closely with the true minority distribution.

Together, these modifications make the generator more reliable, the discriminator more expressive, and the training more stable.

## From Synthetic Data to Interpretable Models

Once the dataset has been augmented with high-quality synthetic fraud samples, the next step is training a classifier. Here the authors used **PyCarets AutoML framework**, which systematically evaluates a wide variety of models and selects the best. In their experiments, **LightGBM** emerged as the top choice.

When trained on the R-GAN augmented dataset, LightGBM achieved outstanding results: an **accuracy** of **99.5%**, a **precision** of **100.0%** (no false alarms), and a **recall** of **99.0%** (almost all fraud cases detected). The resulting **F1-score** of **99.5%** shows that the model did not have to trade precision for recall, a balance that earlier methods struggled with.

Another important element is interpretability. In financial applications, it is enough for a model to be accurate? It must also be explainable. A bank cannot simply tell a customer that their transaction was flagged as fraud without providing a reason. To address this, the authors integrated **Shapley Additive Explanations (SHAP)**. SHAP values break down each prediction and show which features contributed most to the decision, allowing analysts to understand why a transaction was considered suspicious. This transparency is crucial for compliance, trust, and real-world adoption.

## Comparing Against Other Methods

The paper includes extensive benchmarking. Traditional oversampling techniques like ROS, SMOTE ir ADASYN improved recall but collapsed in precision, leading to weak overall F1-scores. Isolation-based methods such as iForest and LSHiForest caught many anomalies but triggered far to many false positives. Even other GAN-based methods like WGAN or SNGAN fell short, either producing less diverse samples or failing to  align them properly with the real fraud distribution.

By contrast, R-GAN consistently maintained near-perfect precision and recall. The authors also ran ablation studies, removing one enhancement at a time. Without spectral normalization, the generator suffered from mode collapse. Without CELU, the discriminator was less effective at learning non-linear features. With the similarity loss, generated data drifted too far from real fraud samples. The conclusion was clear: each component of R-GAN contributes to its overall success.

## Beyond Finance

Although credit card fraud was the central case study, the authors were careful to test their approach in other domains where imbalance is a challenge. They experimented with microbiology datasets (Ecoli3), vehicle classification tasks, and yeast genomics data. In all cases, R-GAN improved minority class detection. This shows that the method is not tied to finance, it is a general solution for imbalanced datasets, with potential applications ranging from cybersecurity to healthcare.

## Why This Matters

There are tow big lessons from this work. 

First, it demonstrated that solving imbalance is not just about tweaking classifiers but about ***improving the training data itself***. BY generating synthetic samples that are diverse and realistic, R-GAN gives teh classifier a better foundation to learn from. 

Second, it shows the power of combining techniques into a single pipeline: GANs for data generation, AutoML for model selection, and SHAP for interpretability. Each by itself is valuable, but together they create a workflow that is both effective and practical.

## Final Thoughts

Advanced R-GAN is more than just another GAN variant. It is an example of how thoughtful design in architecture and loss functions can make synthetic data generation not only feasible but transformative for real-world anomaly detection. By producing balanced datasets, enabling powerful yet automated model selection, and ensuring transparency in predictions, it sets a new benchmark for handling imbalance in machine learning.

---

What do you think? Are GANs the key to finally solving the imbalanced data problem, or are we just layering more complexity onto an already tricky challenge?

I'd love to hear your take, drop a comment , share your perspective, or share this along to someone working on anomaly detection or AI in finance.