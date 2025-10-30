"""
Document Processing Utilities
Extract text from PDF, DOCX, TXT for AI processing
"""
from typing import Dict, Any
from pathlib import Path
import PyPDF2
import docx
from loguru import logger


class DocumentProcessor:
    """Process various document formats"""
    
    @staticmethod
    async def extract_text(file_path: Path) -> Dict[str, Any]:
        """
        Extract text from document
        Returns: {text, pages, metadata}
        """
        extension = file_path.suffix.lower()
        
        if extension == '.pdf':
            return await DocumentProcessor._extract_from_pdf(file_path)
        elif extension in ['.docx', '.doc']:
            return await DocumentProcessor._extract_from_docx(file_path)
        elif extension == '.txt':
            return await DocumentProcessor._extract_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file format: {extension}")
    
    @staticmethod
    async def _extract_from_pdf(file_path: Path) -> Dict[str, Any]:
        """Extract text from PDF"""
        try:
            text_content = []
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                num_pages = len(pdf_reader.pages)
                
                for page_num, page in enumerate(pdf_reader.pages):
                    text_content.append({
                        'page': page_num + 1,
                        'text': page.extract_text()
                    })
                
                full_text = "\n\n".join([p['text'] for p in text_content])
                
                return {
                    'text': full_text,
                    'pages': text_content,
                    'num_pages': num_pages,
                    'format': 'pdf',
                    'metadata': pdf_reader.metadata
                }
        except Exception as e:
            logger.error(f"PDF extraction error: {e}")
            raise
    
    @staticmethod
    async def _extract_from_docx(file_path: Path) -> Dict[str, Any]:
        """Extract text from DOCX"""
        try:
            doc = docx.Document(file_path)
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            full_text = "\n\n".join(paragraphs)
            
            return {
                'text': full_text,
                'paragraphs': paragraphs,
                'num_paragraphs': len(paragraphs),
                'format': 'docx'
            }
        except Exception as e:
            logger.error(f"DOCX extraction error: {e}")
            raise
    
    @staticmethod
    async def _extract_from_txt(file_path: Path) -> Dict[str, Any]:
        """Extract text from TXT"""
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        
        return {
            'text': text,
            'format': 'txt'
        }
    
    @staticmethod
    def chunk_text(text: str, chunk_size: int = 4000, overlap: int = 200) -> list[str]:
        """
        Split text into chunks for AI processing
        Useful for large documents
        """
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start = end - overlap
        
        return chunks
