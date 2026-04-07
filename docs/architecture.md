# Architecture Overview

## RAG Pipeline (TypeScript / LangChain)

```
PDF Document
    │
    ▼
PDFLoader → RecursiveCharacterTextSplitter
    │
    ▼
Document Chunks
    │
    ▼
OpenAIEmbeddings → MemoryVectorStore
    │
    ▼
Retriever
    │
    ▼
RunnableSequence:
  question → retriever → context string
        └──────────────────────┘
                   │
                   ▼
         ChatPromptTemplate
                   │
                   ▼
             ChatOpenAI (gpt-3.5-turbo)
                   │
                   ▼
          StringOutputParser → answer
```

## Conversational QA Extension

Adds a **rephrase step** before retrieval so follow-up questions are resolved
against the chat history before hitting the vector store:

```
follow-up question + history
         │
         ▼
  rephraseQuestionChain
         │
         ▼
  standalone question
         │
         ▼
  documentRetrievalChain
         │
         ▼
  answerGenerationChain + history
         │
         ▼
       answer
```

`RunnableWithMessageHistory` wraps the full chain to persist session history
automatically.

## Instruction Tuning (Python / HuggingFace)

1. Load `tatsu-lab/alpaca` dataset (streaming)
2. Hydrate prompt templates (with/without input)
3. Save processed prompts to `alpaca_processed.jsonl`
4. Compare base model (`Llama-2-7b-hf`) vs instruction-tuned (`Llama-2-7b-chat-hf`)
5. Fine-tune `EleutherAI/pythia-70m` on `lamini/lamini_docs` and evaluate
