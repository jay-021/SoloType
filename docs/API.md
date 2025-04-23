# SoloType API Documentation

## API Versioning

All SoloType APIs are versioned using URL path versioning. The current stable version is `v1`.

Example:

```
https://example.com/api/v1/test-results
```

Legacy non-versioned endpoints (e.g., `/api/test-results`) are deprecated and will redirect to their versioned counterparts.

## Authentication

All API endpoints (except health checks) require authentication using a Firebase ID token.

To authenticate your requests, include an `Authorization` header with a Firebase ID token:

```
Authorization: Bearer <firebase-id-token>
```

## Endpoints

### Health Check

```
GET /api/v1/health
```

Returns the current API status. This endpoint does not require authentication.

**Response:**

```json
{
  "status": "OK",
  "version": "v1",
  "timestamp": "2023-06-15T12:34:56.789Z"
}
```

### Test Results

#### Get Test Results

```
GET /api/v1/test-results
```

Retrieves paginated test results for the authenticated user.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10, max: 100)
- `sortBy` (optional): Field to sort by (default: "createdAt")
- `sortOrder` (optional): Sort order, "asc" or "desc" (default: "desc")

**Response:**

```json
{
  "results": [
    {
      "_id": "60d21b4967d0d8992e610c85",
      "userId": "user123",
      "wpm": 75,
      "accuracy": 98.5,
      "duration": 60,
      "difficulty": "normal",
      "wordsTyped": 120,
      "selectedRank": "a",
      "createdAt": "2023-06-15T12:34:56.789Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "meta": {
    "sortBy": "createdAt",
    "sortOrder": "desc"
  }
}
```

#### Save Test Result

```
POST /api/v1/test-results
```

Saves a new test result for the authenticated user.

**Request Body:**

```json
{
  "wpm": 75,
  "accuracy": 98.5,
  "duration": 60,
  "difficulty": "normal",
  "wordsTyped": 120,
  "selectedRank": "a"
}
```

**Response:**

```json
{
  "message": "Test result saved successfully",
  "id": "60d21b4967d0d8992e610c85",
  "testResult": {
    "wpm": 75,
    "accuracy": 98.5,
    "duration": 60,
    "difficulty": "normal",
    "wordsTyped": 120,
    "selectedRank": "a",
    "userId": "user123",
    "createdAt": "2023-06-15T12:34:56.789Z"
  }
}
```

### User Profile

#### Get Profile

```
GET /api/v1/profile
```

Retrieves the profile for the authenticated user.

**Response:**

```json
{
  "profile": {
    "userId": "user123",
    "displayName": "John Doe",
    "preferredDuration": 60,
    "theme": "dark",
    "createdAt": "2023-05-01T10:20:30.456Z",
    "updatedAt": "2023-06-10T15:45:12.789Z"
  }
}
```

#### Update Profile

```
PUT /api/v1/profile
```

Updates the profile for the authenticated user.

**Request Body:**

```json
{
  "displayName": "Jane Doe",
  "preferredDuration": 120,
  "theme": "light"
}
```

**Response:**

```json
{
  "profile": {
    "userId": "user123",
    "displayName": "Jane Doe",
    "preferredDuration": 120,
    "theme": "light",
    "updatedAt": "2023-06-15T12:34:56.789Z"
  },
  "message": "Profile updated successfully"
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages in case of errors.

**Example Error Response:**

```json
{
  "error": "Authentication failed",
  "message": "Missing or invalid authorization header"
}
```

Common error status codes:

- `400 Bad Request`: Invalid request parameters or body
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authentication succeeded but user lacks permission
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Rate Limiting

API requests are subject to rate limiting to prevent abuse. The current limits are:

- 100 requests per minute per IP address
- 1000 requests per hour per user ID

When rate limits are exceeded, the API will return a `429 Too Many Requests` status code.
