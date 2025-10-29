# AI Hub Backend

Enterprise-grade Python backend for multiple AI applications.

## Quick Start

### 1. Setup
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt

### 2. Database
Install PostgreSQL
Create database
createdb aihub_dev


### 3. Environment
cp .env.development .env
Edit .env - change SECRET_KEY and DATABASE_URL


### 4. Run
python main.py


### 5. Test
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register user
- POST `/api/v1/auth/login` - Login
- GET `/api/v1/auth/me` - Get current user

### Chat AI
- POST `/api/v1/chat/send` - Send message
- GET `/api/v1/chat/history` - Get history

### Document AI
- POST `/api/v1/documents/upload` - Upload document

### Vision AI
- POST `/api/v1/vision/analyze` - Analyze image

## Project Structure
backend/
├── core/ # Core functionality
├── shared/ # Shared across projects
├── projects/ # AI applications
│ ├── chat/
│ ├── document_analysis/
│ └── vision/
└── main.py


## Add New Project

1. Create folder: `projects/my_project/`
2. Add files: `routes.py`, `services.py`, `schemas.py`, `models.py`
3. Register in `main.py`:

from projects.my_project.routes import router as my_router
app.include_router(my_router, prefix="/api/v1/my-project", tags=["My Project"])

Test the Complete Setup
# Terminal 1 - Start backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py

# Terminal 2 - Test API
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#","full_name":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#"}'

# Chat (use token from login)
curl -X POST http://localhost:8000/api/v1/chat/send \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello AI!"}'
