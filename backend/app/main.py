from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project25 API")

# Allow requests from your Next.js frontend during development
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping")
def ping():
    """
    Simple health-check endpoint.
    """
    return {"status": "ok", "message": "pong"}


DEMO_PRODUCTS = {
    "851712": {
        "hs6": "851712",
        "product": "Mobile phones",
        "suppliers": [
            {"country": "China", "share": 0.61},
            {"country": "Vietnam", "share": 0.17},
            {"country": "South Korea", "share": 0.08},
        ],
        "notes": "High exposure to East Asian electronics supply chains and maritime chokepoints in the South China Sea and Taiwan Strait.",
    },
    "100630": {
        "hs6": "100630",
        "product": "Semi-milled or wholly milled rice",
        "suppliers": [
            {"country": "India", "share": 0.35},
            {"country": "Thailand", "share": 0.22},
            {"country": "Pakistan", "share": 0.10},
        ],
        "notes": "Exposure to export restrictions and weather-driven supply shocks in key Asian producers and to chokepoints linking the Indian Ocean with Europe.",
    },
}


@app.get("/api/product/{hs6}")
def get_product(hs6: str):
    """
    Return demo product risk information for a given HS6 code.
    """
    product = DEMO_PRODUCTS.get(hs6)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found in demo dataset")
    return product