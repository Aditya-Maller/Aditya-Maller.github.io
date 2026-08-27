export const projects = [
  {
    title: "FastRAG — Asynchronous High-Performance RAG Architecture",
    status: "Production Ready",
    category: "Generative AI Systems",
    summary:
      "An asynchronous full-stack Retrieval-Augmented Generation (RAG) backend engine. Built with FastAPI for concurrent async requests, MongoDB native vector similarity retrieval, Gemini synthesis, Redis query caching, Celery async indexing task queues, and Docker containerization.",
    architecture: [
      "Asynchronous API layer built on FastAPI with async/await database connectors",
      "MongoDB native vector search for fast cosine similarity vector retrieval",
      "Redis caching layer for query embeddings to reduce redundant LLM calls",
      "Celery worker pool for background document chunking and vector ingestion",
      "Multi-stage Docker build pipeline for reproducible deployment"
    ],
    tags: ["FastAPI", "MongoDB Vector Search", "Gemini", "Redis", "Celery", "Docker", "Python"],
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
    title: "SPIRE Dialect Classification & Quantization Demo UI",
    status: "Research Demo",
    category: "Speech / Audio ML",
    summary:
      "Demonstration application and quantization pipeline for Kannada regional dialect classification developed during research internship at SPIRE Lab, IISc. Connects speech processing pipelines to low-bit model quantization.",
    architecture: [
      "Streamlit web interface for real-time audio upload, MFCC spectral visualization, and dialect inference",
      "Post-training quantization (PTQ) routines reducing model memory footprint for edge devices",
      "Integration with RESPIN speech dataset and NeMo audio processing toolkits"
    ],
    tags: ["Speech ML", "Audio Signal Processing", "Quantization", "Streamlit", "IISc SPIRE Lab"],
    links: [
      { label: "Code Repository", href: "https://github.com/Aditya-Maller/Spire-Dialect-Quantisation" }
    ]
  }
];
