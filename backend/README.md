# AI Hub - Enterprise GenAI Platform

Production-ready backend for enterprise GenAI applications.

## Applications

### 1. RFP Evaluation ✅ Active
AI-powered RFP document analysis and evaluation.

**Features:**
- Upload RFP documents (PDF, DOCX)
- Automated requirement extraction
- Compliance scoring
- Risk assessment
- Strategic recommendations

**API Endpoints:**
- `POST /api/v1/rfp/upload` - Upload RFP
- `POST /api/v1/rfp/{id}/analyze` - Run AI analysis
- `GET /api/v1/rfp/{id}` - Get results
- `GET /api/v1/rfp/` - List evaluations

### 2. Report Generation 🚧 Coming Soon
Automated business report creation.

## Quick Start

Setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Configure
cp .env.development .env

Edit .env - set SECRET_KEY, DATABASE_URL, OPENAI_API_KEY
Run
python main.py


## Architecture

Modular, scalable architecture:

Core: Shared infrastructure

Shared: Common models/services

Projects: Independent applications


## Adding New Applications

1. Create folder: `projects/new_app/`
2. Add: routes.py, services.py, schemas.py, models.py
3. Register in main.py
4. Deploy!

## Environment Variables

Required
SECRET_KEY=your-secret-key-32-chars-min
DATABASE_URL=postgresql://user:pass@host:5432/dbname
OPENAI_API_KEY=sk-...

Optional
AZURE_OPENAI_KEY=...
AZURE_OPENAI_ENDPOINT=...


## License

Proprietary - Internal Use Only


# How to Run 

# Mac
# 1. Navigate to project
cd ai-hub/backend

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate

# 4. Upgrade pip
pip install --upgrade pip

# 5. Install dependencies
pip install -r requirements.txt

# 6. Setup environment
cp .env.development .env

# 7. Run application
python main.py


# Windows

@echo off
echo 🚀 Setting up AI Hub on Windows...

cd backend

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Create and activate virtual environment
python -m venv venv
call venv\Scripts\activate.bat

REM Install dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Setup environment
if not exist .env (
    copy .env.development .env
    echo ✅ Environment file created (.env)
    echo ⚠️  Please edit .env file with your settings
)

echo ✅ Setup complete!
echo 📝 To start: venv\Scripts\activate.bat ^&^& python main.py
pause
