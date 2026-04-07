# GenAI

Hands-on explorations of Generative AI — RAG pipelines with LangChain (TypeScript) and instruction tuning with HuggingFace Transformers (Python).

## Notebooks

| # | Notebook | Stack | Topics |
|---|----------|-------|--------|
| 01 | [Prompt Templates](notebooks/01_prompt_templates.ipynb) | TypeScript / LangChain | ChatOpenAI, prompt templates, LCEL chains, streaming, batching |
| 02 | [Vector Store](notebooks/02_vector_store.ipynb) | TypeScript / LangChain | OpenAI embeddings, cosine similarity, PDF loading, MemoryVectorStore |
| 03 | [LangChain Q&A](notebooks/03_langchain_qa.ipynb) | TypeScript / LangChain | RAG pipeline, document retrieval chain, augmented generation |
| 04 | [Conversational Q&A](notebooks/04_conversational_qa.ipynb) | TypeScript / LangChain | Chat history, question rephrasing, RunnableWithMessageHistory |
| 05 | [Instruction Tuning](notebooks/05_instruction_tuning.ipynb) | Python / HuggingFace | Alpaca dataset, prompt hydration, base vs. fine-tuned model comparison |

## Project Structure

```
GenAI/
├── notebooks/          # Jupyter notebooks (numbered in learning order)
├── src/
│   └── lib/
│       └── helpers.ts  # Shared LangChain utilities (PDF loading, vectorstore init)
├── data/               # Place PDF and dataset files here (not committed)
├── docs/
│   └── architecture.md # RAG pipeline and system diagrams
├── tests/              # Unit and integration tests
├── scripts/
│   └── setup.sh        # One-command environment setup
├── .env.example        # Required environment variables
├── package.json        # Node/TypeScript dependencies
└── requirements.txt    # Python dependencies
```

## Quickstart

```bash
# Clone and set up
git clone https://github.com/swapyface/GenAI.git
cd GenAI
./scripts/setup.sh      # installs both Node and Python deps, creates .env

# Add your API keys
vi .env

# Drop your PDF into data/
cp /path/to/MachineLearning-Lecture01.pdf data/

# Launch notebooks
jupyter notebook notebooks/
```

## Prerequisites

- **Node.js** ≥ 18 (for TypeScript/LangChain notebooks)
- **Python** ≥ 3.9 (for HuggingFace notebook)
- **OpenAI API key** (notebooks 01–04)
- **HuggingFace account** (notebook 05, for gated Llama models)

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for embeddings and chat |
| `LANGCHAIN_API_KEY` | No | LangSmith key for tracing |
| `LANGCHAIN_TRACING_V2` | No | Set to `true` to enable LangSmith traces |

## Key Concepts

- **RAG (Retrieval-Augmented Generation)** — ground LLM responses in your own documents
- **LCEL (LangChain Expression Language)** — compose chains with `|` and `RunnableSequence`
- **Instruction Tuning** — compare base vs. instruction-tuned models; fine-tune small models on domain data
- **Conversational Memory** — maintain chat history with `RunnableWithMessageHistory`

## License

MIT
