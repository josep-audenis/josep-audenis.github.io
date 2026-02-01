---
title: "F1 Race Winner Predictions: From Data Collection to Production-Ready API"
date: 2024-12-06
permalink: /portfolio/f1-predictions/
excerpt: "Building an end-to-end machine learning system to predict Formula 1 race winners. From collecting historical race data via FastF1, engineering predictive features, training gradient boosting models, to deploying a FastAPI service—this project showcases the complete ML lifecycle with a focus on production-ready architecture."
collection: portfolio
---

## Introduction: Beyond Prediction, Building Deployable Intelligence

Formula 1 racing captivates millions with its blend of speed, strategy, and split-second decisions that separate victory from defeat. As both a fan and machine learning practitioner, I found myself drawn to a compelling question: could we predict race winners before the checkered flag drops? More importantly, could such predictions be delivered through a robust, production-ready system rather than remaining trapped in a Jupyter notebook?

This project represents my journey through the complete machine learning lifecycle, from raw data acquisition to a fully functional REST API ready for deployment. What began as curiosity about predictive modeling in motorsport evolved into a comprehensive exploration of production machine learning architecture. The result is a FastAPI-based prediction service that leverages historical Formula 1 data spanning 2018 through 2025, employing gradient boosting models within a carefully architected system that separates offline training from online serving.

The technical foundation follows patterns established by industry leaders like Netflix's Metaflow, Uber's Michelangelo, and Google's TFX. This architecture enables independent scaling of training and inference workloads while maintaining clean separation between experimental model development and stable production serving.

## The Challenge: Navigating Formula 1's Complex Prediction Landscape

Predicting Formula 1 race winners presents unique challenges that distinguish it from typical classification problems. The sport exists at the intersection of human skill, engineering excellence, and strategic decision-making, each contributing nonlinearly to race outcomes.

**Temporal Dependencies**: Recent performance carries more predictive weight than historical dominance. A team that dominated last year might struggle with new technical regulations, while a midfield competitor could suddenly become championship contenders. This temporal decay required careful feature engineering to capture both long-term patterns and recent form.

**Team Dynamics**: Unlike individual sports, Formula 1 success depends heavily on team resources, car development trajectories, and strategic execution. A talented driver in an uncompetitive car has limited win probability, while a competent driver in the fastest car becomes a consistent threat. The model needed to distinguish between driver skill and machinery advantage.

**Circuit Variability**: Monaco's tight streets favor different car configurations than Monza's high-speed straights. A team dominant at technical circuits might struggle at power-dependent tracks. This spatial variability required building track-specific performance features.

Perhaps most critically, the prediction problem bifurcates based on information availability. Before qualifying sessions, predictions rely purely on historical performance and practice data. After qualifying, grid positions and demonstrated pace become available, dramatically changing the information landscape. This necessitated developing two distinct models with different input requirements.

## Architectural Foundation: Separating Training from Serving

Early in the project, I confronted a fundamental design decision: should I build a monolithic codebase combining training and serving logic, or architect separate subsystems for offline training and online inference? This choice carries profound implications for system maintainability, scalability, and operational characteristics.

I chose deliberate separation, implementing distinct codebases for the training pipeline (`src/`) and the API service (`app/`). This pattern acknowledges that training and serving have fundamentally incompatible requirements:

| Aspect | Training (Offline) | Serving (Online) |
|--------|-------------------|------------------|
| **Execution** | Periodic (weekly) | Continuous (24/7) |
| **Latency** | Hours acceptable | Sub-100ms required |
| **Resources** | CPU/GPU intensive | Lightweight |
| **Code Nature** | Experimental | Production-stable |
| **Scaling** | Vertical | Horizontal |

This architectural choice enables independent scaling strategies. Training workloads benefit from vertical scaling on powerful machines with abundant CPU and memory. Inference workloads scale horizontally, distributing requests across many lightweight instances. The separation also enhances security by ensuring experimental training code never executes in the production serving environment.

The data flow follows a unidirectional path: the training pipeline periodically collects fresh race data, engineers features, trains models, and persists them to shared storage. The API service loads these pre-trained artifacts at startup and uses them to serve predictions. This clean interface allows me to iterate rapidly on training strategies without touching production API code.

## Phase 1: Data Collection and Pipeline Engineering

The foundation of any machine learning system rests on data quality and accessibility. For this project, I leveraged FastF1, a Python package providing comprehensive access to Formula 1 telemetry and historical results through a clean API wrapping official FIA data sources.

### Pipeline Architecture

I designed the data collection pipeline as a modular system capable of fetching complete season data across multiple years. The pipeline begins by retrieving the race calendar for each season, identifying all scheduled events and their session types. For each event, it systematically downloads practice sessions, qualifying results, and race outcomes, extracting lap times, sector speeds, and final classifications for every driver.

The collection process required careful handling of missing data scenarios. Not all races include complete practice sessions, weather sometimes forces schedule changes, and mid-season driver changes introduce discontinuities. I implemented robust error handling to gracefully manage these edge cases, logging missing sessions for analysis rather than halting the pipeline.

### Data Organization

All raw data persists to CSV files in a structured directory hierarchy organized by year and event:

```
data/raw/
├── 2018/
│   ├── australia/
│   ├── bahrain/
│   └── ...
├── 2019/
└── ...
```

This design choice prioritizes reproducibility and transparency. Anyone can re-run the collection scripts and obtain identical datasets, crucial for validating results. The raw data remains untouched, with all transformations applied in subsequent pipeline stages, maintaining a clear audit trail from source to features.

One optimization involved implementing incremental updates. Rather than re-downloading entire seasons on each run, the pipeline checks for new races and selectively fetches only novel data, dramatically reducing API calls and accelerating the refresh cycle.

## Phase 2: Feature Engineering for Racing Intelligence

Raw lap times and finishing positions contain signal, but extracting that signal requires thoughtful feature engineering. I approached feature design by considering what information truly predicts race outcomes: driver form, car performance, qualifying pace, and contextual factors.

### Feature Categories

The feature engineering pipeline transforms raw race results into a rich dataset capturing temporal patterns and cross-sectional relationships:

**Driver Performance Features**
- Rolling statistics over recent races (average position in last 5 events)
- Consistency metrics measuring position variance
- Qualifying performance trends
- Season progression

**Team Performance Features**
- Team average positions (capturing car competitiveness)
- Constructor championship standing
- Development trajectory across the season

**Qualifying Features** (post-qualifying model only)
- Grid position and starting row
- Top-10 start indicator
- Gap to teammate in qualifying
- Delta from team average grid position


### Implementation Approach

Driver performance features include rolling statistics computed over recent races, such as average finishing position in the last five events. This captures current form while remaining robust to single-race anomalies like crashes or mechanical failures. Consistency metrics measure position variance, distinguishing reliable performers from erratic drivers.

Team-level aggregations proved essential for separating car performance from driver skill. By averaging positions across teammates, I created features representing underlying car competitiveness independent of who drives it. These team features change gradually as cars evolve through the season, providing a stable signal beneath the noise of individual race results.

For the post-qualifying model, grid position features became available. Rather than using raw grid positions, I created derived features like top-ten start indicators and position relative to team average. These transformations help the model learn nonlinear relationships, such as the disproportionate advantage of starting in the top three.

The feature generation process was automated through a dedicated pipeline module that loads raw data, computes rolling statistics and aggregations, and saves engineered features to processed data directories. This automation ensures consistency when retraining models on updated data.

## Phase 3: Model Selection and Training Strategy

With features prepared, I entered the modeling phase where machine learning algorithms transform historical patterns into predictive models. I framed the problem as binary classification: for each driver in a race, predict whether they will finish in first position.

### Algorithm Comparison

I evaluated several classification algorithms during initial experimentation:

| Algorithm | Strengths | Performance |
|-----------|-----------|-------------|
| Logistic Regression | Interpretable, fast | Baseline (~92%) |
| Random Forest | Captures non-linearity | Strong (~95%) |
| Gradient Boosting | Handles interactions well | Best (~97%) |

Gradient boosting emerged as the clear winner. Its success stems from the ability to learn complex decision boundaries through sequential refinement. The algorithm builds an ensemble of weak learners, each correcting errors made by predecessors. This iterative approach proves particularly effective for Formula 1 predictions where relationships between features and outcomes are nonlinear and interaction-heavy.

### Training Philosophy

The training strategy evolved as I transitioned from development to production readiness. During model development, I used traditional train-test splits to evaluate generalization and compare algorithms, following standard machine learning practices with 70-30 splits.

However, production deployment requires a different mindset. Once I validated the modeling approach and selected gradient boosting, I implemented a production training script that uses 100% of available historical data. This decision reflects a fundamental insight: in production, we optimize for real-world performance rather than test set metrics. Every additional training example improves model quality.

### Model Architecture

```python
target = (data['Position'] == 1).astype(int)

model = GradientBoostingClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)

model.fit(X, y)
```

The production training pipeline generates two distinct models:

| Model Type | Features Used | Accuracy | Use Case |
|------------|---------------|----------|----------|
| Pre-Qualifying | Historical + Practice | ~96% | Before qualifying |
| Post-Qualifying | Historical + Grid Position | ~97% | After qualifying |

Both models persist to disk as serialized pickle files in `models/top1/quali/` and `models/top1/pre-quali/` directories, ready for the API service to load.

## Phase 4: API Service Architecture and Implementation

Transforming trained models into a production service required careful architectural design. I selected FastAPI as the web framework for its modern asynchronous capabilities, automatic OpenAPI documentation generation, and excellent developer experience.

### Layered Architecture

The API implements a clean separation of concerns:

```
app/
├── api/routes/                 # HTTP endpoints
│   ├── predictions.py          # Prediction logic
│   ├── races.py                # Calendar & race info
│   ├── models.py               # Model metadata
│   └── training.py             # Trigger retraining
├── services/                   # Business logic
│   ├── data_service.py         # Data loading
│   └── prediction_service.py   # ML inference
├── utils/                      # Shared utilities
│   └── calendar_utils.py
└── main.py                     # FastAPI application
```

HTTP route handlers in the API layer accept requests, validate inputs, and serialize responses, but delegate all business logic to service classes. The prediction service encapsulates model loading, feature preparation, and inference logic. The data service handles loading race calendars, checking qualifying status, and retrieving engineered features.

### Intelligent Model Selection

Model selection happens automatically based on temporal context. When a prediction request arrives, the service determines whether qualifying has occurred for the target race by comparing current time against the scheduled qualifying session:

```python
def is_quali_done(self, quali_datetime) -> bool:
    now = datetime.now(timezone.utc)
    return now >= quali_datetime
```

If qualifying is complete, the service loads the post-qualifying model and includes grid position features. Otherwise, it uses the pre-qualifying model with features available before qualifying. This automatic switching provides the most accurate predictions possible given available information.

### API Endpoints

The API exposes thirteen endpoints organized into four functional categories:

**Prediction Endpoints**
- `GET /api/v1/predictions/next-race` - Predict next upcoming race winner
- `GET /api/v1/predictions/race/{year}/{gp}` - Predict specific race winner

**Race Information**
- `GET /api/v1/races/calendar/{year}` - Full race calendar
- `GET /api/v1/races/next` - Next race details
- `GET /api/v1/races/status` - Qualifying status check

**Model Metadata**
- `GET /api/v1/models/performance/top1-quali` - Post-qualifying metrics
- `GET /api/v1/models/performance/top1-pre-quali` - Pre-qualifying metrics
- `GET /api/v1/models/best` - Best performing models
- `GET /api/v1/models/available` - List all models

**Training Operations**
- `POST /api/v1/training/retrain` - Trigger retraining (background)
- `POST /api/v1/training/update-data` - Fetch latest race data

### Technical Challenges Solved

**Timezone Handling**: FastF1 returns pandas Timestamp objects with timezone information, while I initially used timezone-naive Python datetime objects. This caused subtle bugs in qualifying status checks. The solution involved ensuring all datetime objects carried explicit timezone information:

```python
if isinstance(race_time, pd.Timestamp):
    race_time = race_time.to_pydatetime()

if race_time.tzinfo is None:
    race_time = race_time.replace(tzinfo=timezone.utc)
```

**Name Normalization**: The race calendar returned "Abu Dhabi" while the features file contained "Abu Dhabi Grand Prix". I implemented a normalization function that strips "Grand Prix" suffixes, ensuring consistent matching:

```python
def normalize_gp_name(name: str) -> str:
    return name.replace("Grand Prix", "").strip()
```

**Import Path Issues**: The training code used relative imports while the API needed absolute imports. I created a fixing script that systematically updates all modules to use full package paths, ensuring both subsystems function correctly.

## Production Readiness

### Production Features

Beyond functional correctness, the API implements several production-ready features:

| Feature | Purpose | Implementation |
|---------|---------|----------------|
| CORS Middleware | Enable frontend integration | Configurable origins |
| Pydantic Validation | Type safety | Request/response models |
| Error Handling | Meaningful status codes | Try-catch with logging |
| Background Tasks | Async operations | FastAPI BackgroundTasks |
| Health Checks | Monitoring support | `/health` endpoint |

The system design prioritizes clean separation of concerns. When the timezone bug appeared, I modified only the calendar utilities without touching route handlers or prediction logic. This modularity makes the codebase maintainable and extensible.

## Reflections on Production Machine Learning

This project fundamentally transformed my understanding of machine learning systems. Before this work, my experience centered on model training and evaluation, treating deployment as an afterthought. Building this end-to-end system revealed that production ML involves far more than achieving good test set metrics.

### Key Insights

**Architectural Separation**: The offline-online separation proved invaluable. This pattern, borrowed from industrial ML systems, acknowledges that training and serving have fundamentally different operational profiles. Attempting to unify these concerns creates an unmaintainable system that cannot optimize for either use case effectively.

**Feature Engineering Complexity**: Raw data requires extensive transformation to become useful features, and these transformations must be reproducible and maintainable. Treating feature generation as a separate pipeline stage with its own testing pays dividends when retraining models or debugging predictions.

**Hidden Assumptions**: The timezone debugging experience taught me about subtle type incompatibilities that only manifest in production. These experiences reinforced the value of comprehensive testing with real-world data rather than idealized examples.

**API Design Matters**: Choosing appropriate status codes, designing intuitive endpoint hierarchies, and writing clear error messages all contribute to developer experience for API consumers. FastAPI's automatic OpenAPI documentation proved invaluable for making the API self-documenting.

### From Data Science to ML Engineering

This project bridged the gap between data scientist and ML engineer. Building production ML systems requires software engineering discipline, API design skills, operational awareness, and systematic problem decomposition. The result is not just a model, but a complete system ready for users.

## Future Enhancements

The system provides a solid foundation for Formula 1 predictions, but several enhancements would increase its value:

**Short-term Improvements**
- Docker containerization for simplified deployment
- CI/CD pipeline for automated testing
- Authentication mechanisms for controlled access
- Rate limiting to prevent abuse

**Feature Expansions**
- Podium predictions (partially done)
- Fastest lap predictions
- Real-time updates during race weekends
- Weather forecast integration

**Research Directions**
- Ensemble methods combining multiple algorithms
- Neural network architectures for temporal modeling
- Causal inference to distinguish correlation from causation
- Multi-objective optimization balancing accuracy and interpretability

## Conclusion

Building the F1 Predictions API transformed a data science exercise into a complete production machine learning system. The project demonstrates end-to-end ML pipeline development from data collection through deployment-ready API service, showcasing production architecture patterns that separate training from serving.

The technical journey encompassed data engineering challenges, feature engineering creativity, model selection rigor, and API design discipline. Each phase presented unique challenges requiring research, experimentation, and careful decision-making. The result is a system ready for deployment that could serve predictions to users worldwide with sub-100ms latency.

This work proves that building reliable, scalable ML systems requires thinking beyond model accuracy to consider data pipelines, feature reproducibility, API design, error handling, and operational concerns. The architecture patterns employed here follow industry best practices established by companies operating ML at massive scale.

Most fundamentally, this project represents the transition from building models to building systems that use models. Models are components, systems are products. This project delivers a product ready for users.

## Source Code

The complete implementation is available on GitHub, including all data collection scripts, feature engineering pipelines, model training code, and the FastAPI service. You can check it out in my project repo: <a href="https://github.com/josep-audenis/f1-predictions" target="_blank"><strong><em>F1 predictions</em></strong></a>.