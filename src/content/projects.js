export const projects = [
  {
    title: "FastRAG — Async RAG Knowledge Engine",
    status: "Completed",
    category: "Generative AI Systems",
    summary:
      "An asynchronous full-stack Retrieval-Augmented Generation (RAG) knowledge engine for domain-specific question answering. Implements a custom cosine-similarity retrieval pipeline over 384-dimensional Hugging Face embeddings in MongoDB, paired with Google Gemini 2.5 Flash answer generation and dual hallucination gates (0.50 similarity threshold and strict context-bound generation).",
    architecture: [
      "FastAPI asynchronous REST backend for non-blocking API query processing",
      "Hugging Face sentence-transformers/all-MiniLM-L6-v2 model generating 384-dimensional dense embeddings",
      "MongoDB document and vector persistence with custom cosine-similarity aggregation pipeline (top-3 chunk retrieval)",
      "Dual hallucination protection: 0.50 similarity threshold gate (bypasses LLM call if unmet) and strict context-bound prompting",
      "Google Gemini 2.5 Flash for grounded answer synthesis paired with an interactive Streamlit frontend"
    ],
    tags: ["FastAPI", "MongoDB", "Google Gemini 2.5 Flash", "Hugging Face", "Streamlit", "Python"],
    links: [
      { label: "Code Repository", href: "https://github.com/Aditya-Maller/Rag-based-chatbot-fastapi-project" }
    ]
  },
  {
    title: "Static Malware Interception & Detection System",
    status: "Completed",
    category: "ML Systems & Cybersecurity",
    summary:
      "A static malware classification engine and real-time cross-platform download interceptor. Evaluates 526 static Portable Executable (PE) metadata features on the EMBER dataset using LightGBM gradient boosted decision trees.",
    architecture: [
      "526-dimensional static feature extraction engine analyzing PE headers, sections, and import tables",
      "LightGBM classifier tuned for high recall against novel zero-day malware signatures",
      "Real-time download interception daemon for Windows file system monitoring",
      "Isolated sandbox runner for suspicious binary execution evaluation"
    ],
    metrics: "~92% Accuracy | ~0.91 Malware Recall",
    tags: ["LightGBM", "Cybersecurity", "PE Static Features", "EMBER", "Python", "System Interception"],
    links: [
      { label: "Code Repository", href: "https://github.com/Aditya-Maller/Malware-detection" }
    ]
  },
  {
    title: "Joint ASR-DID Pipeline Distillation (SPIRE Lab, IISc)",
    status: "In Progress",
    category: "Speech / Audio ML",
    summary:
      "Joint Automatic Speech Recognition + Dialect Identification (ASR-DID) pipeline that improves ASR capacity using dialect features. Builds on prior Conformer-based Kannada dialect classification and speech model work at SPIRE Lab, IISc; the model is built, and current work focuses on distilling parts of it to reduce inference time, parameter count, and compute.",
    architecture: [
      "Joint ASR-DID modeling to leverage dialect features for stronger ASR performance",
      "Builds on Conformer-based speech modeling, Kannada dialect classification (5 regional zones), and speech model quantization on the IISc RESPIN corpus",
      "Model distillation of pipeline components targeting lower inference latency, fewer parameters, and reduced compute cost"
    ],
    tags: ["ASR", "Dialect Identification", "Conformer", "Model Distillation", "Speech ML", "IISc SPIRE Lab", "RESPIN Corpus", "PyTorch"],
    links: [
      { label: "Related Research Code", href: "https://github.com/Aditya-Maller/Spire-Dialect-Quantisation" }
    ]
  },
  {
    title: "SPIRE Dialect Classification & Quantization Demo UI",
    status: "Research Demo",
    category: "Speech / Audio ML",
    summary:
      "Demonstration application and quantization pipeline for Kannada regional dialect classification developed during research internship at SPIRE Lab, IISc. Built alongside Conformer-based dialect modeling and post-training quantization experiments.",
    architecture: [
      "Streamlit web interface for real-time audio upload, MFCC spectral visualization, and dialect inference",
      "Post-training quantization (PTQ) routines reducing model memory footprint for edge devices",
      "Integration with RESPIN speech dataset and NeMo audio processing toolkits"
    ],
    tags: ["Speech ML", "Audio Signal Processing", "Conformer", "Quantization", "Streamlit", "IISc SPIRE Lab"],
    links: [
      { label: "Code Repository", href: "https://github.com/Aditya-Maller/Spire-Dialect-Quantisation" }
    ]
  },
  {
    title: "Structured Innovation Board Game & Design Thinking",
    status: "Cohort Winner & Best Project Award",
    category: "Product Design & Innovation",
    summary:
      "Designed and fabricated an interactive, strategic board game applying structured innovation methodology, game mechanics, upcycling, and design thinking. Built for the Semester 1 Structured Innovation course under the guidance of Prof. Phani Kumar Pullela, Prof. Chidhanand R.S., Prof. Ramesha G N, and Dean Prof. Sanjay Chitnis, winning the Best Project Award in the cohort and scoring 70/70 for internal evaluations.",
    architecture: [
      "Formulated strategic game mechanics, rulebook design, and interactive board mechanics",
      "Applied structured innovation frameworks, upcycling design principles, and product marketing concepts",
      "Achieved a 70/70 internal evaluation score and awarded Best Project Award in the course cohort"
    ],
    metrics: "Best Project Award | 70/70 Internal Score",
    tags: ["Structured Innovation", "Product Design", "Game Mechanics", "Upcycling", "Design Thinking", "Cohort Winner"],
    links: []
  }
];
