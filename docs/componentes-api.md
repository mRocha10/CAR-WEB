# Recommended REST API - Components

## Endpoints
- `GET /api/categories`
- `GET /api/categories/{id}`
- `GET /api/components`
- `GET /api/components/{id}`
- `POST /api/search`
- `GET /api/components/{id}/compatibility`
- `GET /api/components/{id}/related`
- `GET /api/components/{id}/documents`
- `GET /api/components/{id}/videos`
- `GET /api/components/{id}/reviews`
- `POST /api/components/{id}/reviews`

## Advanced search example
### Request
```http
POST /api/search
Content-Type: application/json
```

```json
{
  "query": "rear brakes",
  "make": "Volkswagen",
  "model": "Golf VII",
  "year": 2017,
  "categoryId": "frenos",
  "maxPrice": 120
}
```

### Response
```json
{
  "total": 2,
  "items": [
    {
      "id": "pb-452r",
      "sku": "PB-452R",
      "name": "ProBrake Ceramic Rear Brake Pads",
      "category": "Braking System",
      "subgroup": "Brake Pads",
      "price": 69.9,
      "currency": "EUR",
      "stock": 28,
      "url": "/subPages/componente.html?id=pb-452r"
    }
  ],
  "facets": {
    "categories": [
      { "id": "frenos", "count": 2 }
    ],
    "makes": [
      { "name": "Volkswagen", "count": 2 }
    ]
  }
}
```

## Product detail contract
### Response `GET /api/components/{id}`
```json
{
  "id": "of-210",
  "sku": "OF-210",
  "name": "M-Filter OF-210 Oil Filter",
  "categoryId": "mecanica-motor",
  "subgroup": "Filters",
  "price": 14.5,
  "currency": "EUR",
  "stock": 120,
  "shortDescription": "High-retention spin-on filter...",
  "longDescription": "Efficient particle filtration...",
  "specifications": {
    "material": "Synthetic cellulose media",
    "dimensions": "76 x 86 mm",
    "standard": "ISO 4548",
    "thread": "M20x1.5"
  },
  "compatibility": [
    "Toyota Corolla 1.8 (2012-2019)"
  ],
  "images": [],
  "pdfs": [],
  "videos": [],
  "reviews": []
}
```
