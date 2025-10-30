@echo off
echo 🚀 Setting up AI Hub on Windows...

cd backend

REM Check Python
python3 --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Create and activate virtual environment
python3 -m venv venv
call venv\Scripts\activate.bat

REM Install dependencies
python3 -m pip install --upgrade pip
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
