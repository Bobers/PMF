# EMU API Reference

## Overview

This document outlines the current mock API implementations and future real API specifications for the EMU (Evolving Marketing Understanding) platform.

## Current Implementation (Mock APIs)

All current functionality uses simulated APIs with setTimeout delays to mimic real network calls.

### Foundation Extraction

**Current Mock Implementation:**
```typescript
const extractFoundation = async () => {
  setFoundationStatus('extracting');
  await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
  
  // Returns hardcoded mock data
  const mockData = {
    painPoints: [...],
    audiences: [...], 
    solutions: [...],
    whyItMatters: "..."
  };
};
```

**Future API Specification:**
```typescript
POST /api/foundation/extract
Content-Type: application/json

Request Body:
{
  "productInfo": {
    "name": "EMU",
    "category": "B2B SaaS", 
    "stage": "prototype",
    "description": "AI-powered PMF validation tool",
    "targetProblem": "Founders lack marketing structure"
  }
}

Response:
{
  "success": true,
  "data": {
    "extractionId": "ext_123",
    "painPoints": [
      {
        "id": "pp_1",
        "pain": "Lack of structured marketing process",
        "severity": 8,
        "description": "Founders waste 10-15 hours weekly...",
        "confidence": 0.85,
        "sources": ["product_description", "category_analysis"]
      }
    ],
    "audiences": [...],
    "solutions": [...],
    "whyItMatters": {
      "content": "73% of startups fail...",
      "confidence": 0.75,
      "sources": ["market_research", "industry_data"]
    }
  },
  "processingTime": 1847,
  "model": "gpt-4-turbo"
}
```

### Item Regeneration

**Current Mock Implementation:**
```typescript
const regenerateItem = async (id: string, type: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const alternatives = {
    painPoints: [/* hardcoded alternatives */],
    audiences: [/* hardcoded alternatives */],
    solutions: [/* hardcoded alternatives */]
  };
  
  return alternatives[type][Math.floor(Math.random() * alternatives[type].length)];
};
```

**Future API Specification:**
```typescript
POST /api/items/regenerate
Content-Type: application/json

Request Body:
{
  "itemId": "pp_1",
  "itemType": "painPoint", // painPoint | audience | solution
  "context": {
    "productInfo": {...},
    "existingItems": [...],
    "userFeedback": "Too generic, need more specific"
  },
  "options": {
    "alternatives": 3,
    "tone": "professional",
    "specificity": "high"
  }
}

Response:
{
  "success": true,
  "data": {
    "alternatives": [
      {
        "id": "pp_1_alt_1",
        "pain": "Marketing expertise gap", 
        "severity": 9,
        "description": "Can't afford senior marketers ($150k+/year)",
        "confidence": 0.78,
        "reasoning": "More specific based on salary data"
      }
    ]
  },
  "processingTime": 956,
  "model": "gpt-4-turbo"
}
```

## Data Models

### Core Types

```typescript
interface ProductInfo {
  name: string;
  category: 'B2B SaaS' | 'B2C App' | 'Marketplace' | 'Developer Tool' | 'E-commerce' | 'Enterprise';
  stage: 'idea' | 'prototype' | 'beta' | 'launched';
  description: string;
  targetProblem: string;
}

interface PainPoint {
  id: string;
  pain: string;
  severity: number; // 1-10
  description: string;
  confidence?: number; // 0-1
  sources?: string[];
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
}

interface Audience {
  id: string;
  segment: string;
  description: string;
  characteristics: string[];
  confidence?: number;
  sources?: string[];
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
}

interface Solution {
  id: string;
  solution: string;
  problems: string[];
  confidence?: number;
  sources?: string[];
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
}

interface WhyItMatters {
  content: string;
  confidence?: number;
  sources?: string[];
  isLocked: boolean;
  isEditing: boolean;
  isGenerating: boolean;
}

interface Foundation {
  id: string;
  version: number;
  status: 'draft' | 'validating' | 'locked' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  productInfo: ProductInfo;
  painPoints: PainPoint[];
  audiences: Audience[];
  solutions: Solution[];
  whyItMatters: WhyItMatters;
  confidence: number; // Overall confidence score
}
```

## Future API Endpoints

### Authentication
```typescript
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/logout
GET /api/auth/me
```

### Foundation Management
```typescript
// Foundation CRUD
GET /api/foundations              // List user's foundations
POST /api/foundations             // Create new foundation
GET /api/foundations/:id          // Get specific foundation
PUT /api/foundations/:id          // Update foundation
DELETE /api/foundations/:id       // Delete foundation

// Foundation Operations
POST /api/foundations/:id/extract     // AI extraction
POST /api/foundations/:id/validate    // Validate foundation
POST /api/foundations/:id/lock        // Lock foundation
POST /api/foundations/:id/unlock      // Unlock foundation
```

### Item Management
```typescript
// Individual item operations
POST /api/foundations/:id/items           // Add new item
PUT /api/foundations/:id/items/:itemId    // Update item
DELETE /api/foundations/:id/items/:itemId // Delete item
POST /api/foundations/:id/items/:itemId/regenerate // Regenerate item
POST /api/foundations/:id/items/:itemId/lock       // Lock item
POST /api/foundations/:id/items/:itemId/unlock     // Unlock item
```

### Analytics & Insights
```typescript
GET /api/foundations/:id/analytics    // Foundation analytics
GET /api/foundations/:id/confidence   // Confidence scoring
GET /api/foundations/:id/suggestions  // AI suggestions
GET /api/foundations/:id/validation   // Validation results
```

### Future: Pivot System
```typescript
// Pivot management (V3 features)
POST /api/foundations/:id/pivot/analyze    // Analyze pivot impact
POST /api/foundations/:id/pivot/execute    // Execute pivot
GET /api/foundations/:id/versions          // Get all versions
GET /api/foundations/:id/learning-trail    // Get learning history
```

## Error Handling

### Standard Error Response
```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product category",
    "details": {
      "field": "category",
      "allowedValues": ["B2B SaaS", "B2C App", ...]
    }
  },
  "requestId": "req_123456789"
}
```

### Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `EXTRACTION_FAILED` - AI extraction failed  
- `RATE_LIMIT_EXCEEDED` - API rate limit hit
- `INSUFFICIENT_CREDITS` - User out of AI credits
- `FOUNDATION_LOCKED` - Cannot modify locked foundation
- `ITEM_NOT_FOUND` - Requested item doesn't exist
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - User lacks permission

## Rate Limiting

### Current Limits (Planned)
- Foundation extraction: 10 per hour
- Item regeneration: 50 per hour  
- General API calls: 1000 per hour
- Authenticated requests: 5000 per hour

### Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 985
X-RateLimit-Reset: 1640995200
```

## Authentication

### JWT Token Structure
```typescript
{
  "sub": "user_123",
  "email": "user@example.com", 
  "plan": "pro",
  "credits": 150,
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Authorization Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Webhook Events

### Foundation Events
```typescript
// foundation.extracted
{
  "event": "foundation.extracted",
  "data": {
    "foundationId": "found_123",
    "userId": "user_456", 
    "extractionTime": 1847,
    "confidence": 0.82
  },
  "timestamp": "2024-01-15T10:30:00Z"
}

// foundation.locked
{
  "event": "foundation.locked",
  "data": {
    "foundationId": "found_123",
    "userId": "user_456",
    "version": 1,
    "finalConfidence": 0.91
  },
  "timestamp": "2024-01-15T11:45:00Z"
}
```

## SDK Integration

### JavaScript/TypeScript SDK
```typescript
import { EMUClient } from '@emu/sdk';

const client = new EMUClient({
  apiKey: 'emu_sk_test_...',
  baseURL: 'https://api.emu.ai/v1'
});

// Extract foundation
const foundation = await client.foundations.extract({
  productInfo: {
    name: 'MyProduct',
    category: 'B2B SaaS',
    // ...
  }
});

// Regenerate item
const alternatives = await client.items.regenerate({
  foundationId: foundation.id,
  itemId: 'pp_1',
  itemType: 'painPoint'
});
```

## Testing

### API Testing Strategy
- Unit tests for all endpoints
- Integration tests for user flows
- Load testing for AI endpoints
- Mock API responses for frontend testing

### Mock Data Generation
```typescript
// Generate consistent mock data for testing
const generateMockFoundation = (overrides = {}) => ({
  id: 'found_' + Math.random().toString(36).substr(2, 9),
  version: 1,
  status: 'draft',
  // ... other fields
  ...overrides
});
```

---

**API Version**: v1  
**Documentation Version**: 1.0  
**Last Updated**: January 2025