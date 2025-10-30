"""
RFP Evaluation Prompts
"""

RFP_ANALYSIS_PROMPT = """You are an expert RFP analyst. Analyze the following RFP document and provide:

1. **Key Requirements**: List all major requirements mentioned
2. **Compliance Assessment**: Evaluate how well standard offerings would meet requirements (0-100 score)
3. **Risk Assessment**: Identify potential risks (technical, financial, timeline)
4. **Recommendations**: Provide strategic recommendations for response

RFP Document:
{rfp_text}

Provide your analysis in JSON format:
{{
  "key_requirements": ["requirement 1", "requirement 2", ...],
  "compliance_score": 85,
  "risk_assessment": {{
    "technical_risks": ["risk 1", ...],
    "financial_risks": ["risk 1", ...],
    "timeline_risks": ["risk 1", ...]
  }},
  "recommendations": ["recommendation 1", ...],
  "summary": "Overall assessment..."
}}
"""

RFP_CRITERION_EVALUATION = """Evaluate the following RFP criterion based on the document:

**Criterion**: {criterion_name}
**Type**: {criterion_type}
**Description**: {criterion_description}

**RFP Document Excerpt**:
{relevant_text}

Provide:
1. Score (0-10): How well is this criterion addressed?
2. Assessment: Brief explanation of the score
3. Evidence: Quote relevant sections from the document

Format:
{{
  "score": 8.5,
  "assessment": "...",
  "evidence": "..."
}}
"""
