# MediaForge Backend

MediaForge Backend is a **Node.js (ExpressJS)** service that powers the CDN layer.  
It handles **image upload, retrieval, and caching**, with support for **Dockerized infrastructure** including:

- **MongoDB** – metadata storage (images, users, requests, etc.)  
- **Redis** – caching layer for fast access  
- **MinIO** – object storage for image files  
- **ExpressJS** – RESTful API server  

---

## Features

- 📤 Upload images (to MinIO, metadata stored in MongoDB)  
- 📥 Retrieve images with caching via Redis  
- ⚡ Optimized API response with middleware  
- 🐳 Fully containerized with Docker & Docker Compose  
- 🔒 Environment-based configuration with `.env`  

---

## Tech Stack

- **Backend**: Node.js, ExpressJS  
- **Database**: MongoDB  
- **Cache**: Redis  
- **Storage**: MinIO (S3-compatible)  
- **Deployment**: Docker, Docker Compose  

---

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/Hkhan2712/MediaForge-backend.git
cd mediaforge-backend

