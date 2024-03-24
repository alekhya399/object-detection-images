FROM node:14 as build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./


COPY frontend/ .

RUN npm run build

FROM python:3.9-slim

WORKDIR /app/backend

COPY backend/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

EXPOSE 5000

CMD ["python", "app.py"]
