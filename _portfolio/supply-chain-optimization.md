---
title: "Building a Multi-Layer Optimization Engine for Livestock Logistics"
date: 2025-11-24
permalink: /portfolio/pig-logistics-dss-optimization/
excerpt: "Designing and implementing a 5-layer decision support system using MILP, predictive scoring, Monte Carlo simulation, and genetic algorithms to optimize a complex supply chain, increasing profitability by strategically scheduling pig transport."
collection: portfolio
---


## Introduction: From AI/ML to Operational Optimization

My passion has long been in the predictive power of AI and Machine Learning. However, I've grown increasingly fascinated by a subsequent, more decisive question: *What is the best possible action to take?* This question lies at the heart of optimization. When I encountered the challenge of optimizing the Catalan pork supply chain during a hackathon, I saw the perfect opportunity to bridge this gap between prediction and prescription. The goal was not just to forecast outcomes, but to design a system that could autonomously make superior, profit-maximizing decisions daily.

This project represents my deep dive into the world of mathematical optimization. With no prior experience in operations research, I embarked on a weekend-long journey to architect and build a sophisticated, multi-layered Decision Support System (DSS) from the ground up. The result was a cohesive pipeline that strategically plans, tactically executes, and operationally refines the entire process of moving pigs from farms to slaughterhouses.

## The Problem: A Web of Biological, Temporal, and Economic Constraints

The Catalan pork industry is a complex ecosystem. My task was to build a system that could navigate its intricate web of constraints:

- **Biological Realities:** Pigs are not uniform products. Their weights follow a normal distribution and grow over time. Slaughterhouses impose severe financial penalties (15-20%) for deliveries outside the optimal 105-115 kg weight window, making timing a critical financial lever.
- **Operational Rules:** A fundamental and challenging rule was that each farm could only be visited once per week. This prevented simply picking up pigs as they reached optimal weight and introduced a significant scheduling constraint.
- **Physical Capacities:** Both slaughterhouses (with daily and weekly processing limits) and trucks (with 10 and 20-tonne capacities) presented hard bottlenecks that the system had to respect.
- **Economic Objective:** The ultimate goal was to maximize profit, a delicate balance between maximizing revenue (by minimizing penalties) and minimizing transportation costs (by optimizing truck utilization and routes).

This was not a simple routing problem. It was a multi-faceted, constrained optimization challenge that required a hierarchical approach, breaking down the strategic, tactical, and operational decisions into specialized, interconnected layers.

## System Architecture: A Hierarchical Pipeline for Complex Decision-Making

I conceived the solution as a five-layer engine, where each layer handles a specific level of decision-making, passing its refined output to the next. This architecture ensured that complex decisions were made in a logical sequence, from long-term strategy to immediate execution details.

The data flow was designed as follows: a Strategic MILP Planner first creates a high-level blueprint for the two-week period. This plan is then fed daily into a Tactical Planner that selects the best farms for pickup based on current conditions. The selected farms' financials are then validated by a Monte Carlo Revenue Simulator for accuracy. These farms are then assigned to specific trucks by a Bin Packing Assigner, and finally, the sequence of visits for each truck is optimized by a Genetic Algorithm Route Optimizer.

### Layer 1: Strategic Blueprinting with Mixed-Integer Linear Programming

The first and most conceptually challenging layer was the strategic planner. Its role was to answer the foundational question: *"Which farm should be assigned to which day in the upcoming two-week period to maximize expected profit?"*

Having discovered Mixed-Integer Linear Programming (MILP) through research blogs, I selected the ``PuLP`` library in Python for this task. The core of the challenge was formulating the business rules into linear constraints and a linear objective function.

- **Model Formulation:** I defined a set of binary decision variables, ``x[farm_id, day]``, representing whether a specific farm was to be picked up on a specific day.
- **The "One Farm Per Week" Constraint:** Translating this business rule into a linear constraint was a pivotal learning moment. The elegant solution was the constraint \\(\sum(\texttt{x[farm_id, day]} \text{ for day in } 1..10) = 1\\) for each farm, which perfectly encapsulated the requirement that every farm must be visited exactly once in the planning period.
- **Objective Function:** The model's goal was to maximize the sum of \\((\text{expected_revenue} - \text{transport_cost}) \times \texttt{x[farm_id, day]}\\), where expected revenue was calculated using predicted future weights and penalty rates.

This layer produced a robust, high-level schedule that served as a guiding blueprint, ensuring weekly capacities were balanced and strategic priorities were set.

### Layer 2: Tactical Execution with Predictive, Score-Based Planning

While Layer 1 created the plan, Layer 2 was responsible for its daily execution. Each day, this module decided which of the strategically eligible farms should actually be picked up, incorporating real-time data like exact pig weights and remaining slaughterhouse capacity.

This was not a simple sorting operation. I designed a sophisticated multi-criteria scoring system that evaluated each farm on several axes:

- **Strategic Alignment:** How well did picking this farm today align with the MILP-generated blueprint?
- **Predictive Potential:** A key innovation was modeling the weight trajectory of the pigs. The system could calculate if waiting two more days would bring the herd closer to the optimal weight range, thereby increasing revenue enough to justify the delay.
- **Weight Optimality:** A probabilistic score estimating the percentage of pigs currently within the optimal weight range.
- **Urgency Factor:** A measure based on how full the farm was, prioritizing farms at risk of exceeding their capacity.

The farms were ranked by their composite score, and the system selected them in order until the daily slaughterhouse capacity was filled, even implementing partial pickups for very large farms to maximize daily efficiency.

### Layer 3: Embracing Uncertainty with Monte Carlo Simulation

A critical insight I applied from my data science background was that using average weights for revenue calculation was financially naive. Reality is a distribution, not a point estimate. To address this, I built a Monte Carlo simulation module to provide a far more accurate and robust revenue forecast.

For any given farm load, this simulator would:

1. Generate thousands of simulated batches of pigs.
2. Sample each pig's weight from a normal distribution defined by the farm's reported mean and standard deviation.
3. Categorize each simulated pig into the correct penalty bracket (Optimal, Minor, Major).
4. Calculate the total revenue and penalties for each simulation run.

The final expected revenue was the average across all thousands of simulations. This approach directly quantified the financial risk of picking up a herd with a wide weight variance, providing a crucial data point for the tactical planner and ensuring our profit estimates were grounded in statistical reality.

### Layer 4: Operational Efficiency with Bin Packing and Smart Assignment

With the day's farms selected, the next problem was logistical: *"How do we efficiently assign these farms to our available fleet of trucks?"* This is a classic Bin Packing Problem, enhanced with real-world complexities.

I developed an assignment algorithm with two key features:

- **Smart Farm Splitting:** A major innovation was the system's ability to identify farms too large for a single truck. It would automatically split these "oversized" farms into multiple, balanced loads that could be assigned to different trucks, a capability essential for handling real-world farm inventories.
- **Cost-Aware Truck Selection:** The algorithm initially assigned farms to 20T trucks for simplicity, then performed a post-processing "downgrade" step. Any truck whose load could comfortably fit into a cheaper 10T truck was reassigned, effectively reducing the operational cost without changing the physical plan.

### Layer 5: Fine-Tuning with Genetic Algorithm Route Optimization

The final layer addressed the classic Traveling Salesman Problem (TSP). For each truck assigned multiple farms, the question was: *"What is the most efficient sequence of farm visits to minimize total distance and cost?"*

Given the computational complexity of finding an exact solution for multiple routes, I implemented a Genetic Algorithm (GA). This bio-inspired heuristic approach worked by:

- **Initialization:** Creating a population of random routes for the truck.
- **Evaluation:** Ranking these routes by a fitness function inversely proportional to their total cost (incorporating distance, truck type, and load factor).
- **Evolution:** Using tournament selection to pick the "fittest" routes, then applying crossover and mutation operators (like swap and scramble mutations) to create new, potentially better, offspring routes for the next generation.

Over multiple generations, the GA would converge on a highly efficient, low-cost route for each truck, completing the transition from strategic plan to executable daily itinerary.

### Technical Implementation and Integration

The entire system was implemented in Python, chosen for its rich ecosystem of scientific libraries. The five layers were integrated into a master ``OptimizationConductor`` that managed the state and data flow between them. Key to this integration was a unified data model using Python dataclasses, which ensured clean and consistent data passing from the strategic ``FarmState`` down to the operational ``TruckAssignment``.

While the front-end visualization was handled by other team members, my focus was on creating a robust backend API that could provide all necessary data, selected farms, assigned trucks, optimized routes, and financial projections, for visualization on a dashboard and interactive map.

### Reflection and Learning Journey

This project was a profound learning experience that significantly expanded my technical toolkit.

The most valuable insight was understanding the power of hierarchical decomposition in solving complex problems. Instead of being overwhelmed by the problem's scope, I learned to dissect it into manageable, sequential decisions. This architectural approach is applicable to countless domains beyond supply chain management.

I also gained a deep appreciation for the transition from prediction to prescription. While my AI/ML background is rooted in forecasting, this project forced me to think about how to use those predictions to drive optimal decisions, navigating a landscape of hard constraints and competing objectives.

Furthermore, I successfully translated theoretical concepts into working code. From formulating my first MILP constraint to implementing a GA from scratch, the project was a crash course in applied operations research. It demonstrated my ability to rapidly research, learn, and apply entirely new technical paradigms to solve a concrete problem.

### Conclusion and Future Directions

In one intensive weekend, I successfully transitioned from a novice to a functional practitioner in the field of optimization. This project is a testament to my ability to architect complex systems, rapidly acquire and apply new technical skills, and drive a substantial technical project from conception to a working prototype.

The resulting optimization engine provides a solid foundation for making intelligent, data-driven decisions that balance biological growth, operational logistics, and financial performance. It showcases the tangible value that can be unlocked by applying computational intelligence to traditional industry challenges.

**Future Enhancements:**

- Integrating high-performance commercial solvers to handle problem instances with thousands of farms.
- Developing a more dynamic state management system for continuous simulation.
- Implementing multi-objective optimization to factor in sustainability metrics like carbon footprint.
- Packaging the system into a containerized microservices architecture for scalability and deployment.

This project solidified my passion for optimization and opened a new frontier in my data science journey, proving that the most powerful solutions often lie at the intersection of prediction, prescription, and elegant system architecture.

