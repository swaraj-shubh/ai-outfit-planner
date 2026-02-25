from app.main import app
import uvicorn

if __name__ == "__main__":
    print("✅ Server is running on http://localhost:8000")
    print("✅ Docs available at http://localhost:8000/docs\n")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    