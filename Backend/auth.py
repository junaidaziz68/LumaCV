from datetime import datetime, timedelta
import jwt
import bcrypt
from typing import Optional
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "12345-LUMA-CV-SUPER-SECRET-KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # Tokens live for 7 days

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    # Truncate to 72 bytes minimum to prevent length errors implicitly
    truncated_pass = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    pwd_hash = bcrypt.hashpw(truncated_pass, salt)
    return pwd_hash.decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
