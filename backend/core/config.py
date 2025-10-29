"""
Configuration Management
Environment-based settings with validation
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import List, Union, Optional
from enum import Enum
from functools import lru_cache


class Environment(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"


class AuthProvider(str, Enum):
    LOCAL = "local"
    AZURE_AD = "azure-ad"


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "AI Hub"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: Environment = Environment.DEVELOPMENT
    DEBUG: bool = False
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = False
    
    # Security
    SECRET_KEY: str = Field(..., min_length=32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Authentication
    AUTH_PROVIDER: AuthProvider = AuthProvider.LOCAL
    AZURE_CLIENT_ID: Optional[str] = None
    AZURE_CLIENT_SECRET: Optional[str] = None
    AZURE_TENANT_ID: Optional[str] = None
    
    # Database
    DATABASE_URL: str = Field(..., description="Database connection string")
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    
    # CORS
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173,http://localhost:3000"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        """Parse CORS origins from string or list"""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    @property
    def is_development(self) -> bool:
        return self.ENVIRONMENT == Environment.DEVELOPMENT
    
    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == Environment.PRODUCTION
    
    model_config = SettingsConfigDict(
        env_file=".env.development",
        case_sensitive=True,
        extra='ignore'
    )


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
