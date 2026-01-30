# Vibe Delivery — Backend

Small Express + MongoDB (native driver) scaffold.

Quick start:

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed (MONGO_URI)
npm run dev
```

Endpoints:
- `GET /` — simple text response
- `GET /api/hello` — JSON greeting

Notes:
- Uses Node ESM imports. `MONGO_URI` should point to your MongoDB server.
