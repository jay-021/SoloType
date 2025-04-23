# SoloType - Project Planning Document

## Project Goals

SoloType is a Solo Leveling themed typing test application designed to help users improve their typing skills in an engaging environment. The current refactoring effort aims to improve the project's structure, maintainability, and testability according to established full-stack development standards.

## Target Architecture

### Frontend
- **Framework:** Next.js with App Router
- **Components:** React Functional Components with Hooks
- **Language:** TypeScript with strict mode
- **Styling:** Tailwind CSS with Shadcn UI components
- **State Management:** Primarily Zustand for global state, React Context API for simple cases (auth, theme)
- **UI Libraries:** Shadcn UI (based on Radix UI primitives)

### Backend
- **API Implementation:** Node.js API routes within Next.js
- **Architecture:** Layered Architecture
  - Controllers: Handle HTTP requests/responses
  - Services: Contain business logic
  - Repositories/DAL: Data access layer for MongoDB
- **Language:** TypeScript with strict mode

### Database
- **Primary Database:** MongoDB for test results and user data
  - Efficient connection pooling
  - Schemas designed based on access patterns
  - Appropriate indexing for performance
- **Authentication:** Firebase Authentication for user management

### API Design
- **Style:** RESTful principles
- **Versioning:** URL Path Versioning (`/api/v1/...`)
- **Documentation:** OpenAPI Specification
- **Validation:** Zod for request validation
- **Error Handling:** Centralized error handling middleware with custom error classes

### Testing
- **Unit/Integration Tests:** Vitest
- **E2E Tests:** Playwright
- **Coverage:** Focus on core business logic, edge cases, and failure scenarios

### DevOps
- **Package Manager:** PNPM
- **Containerization:** Docker with multi-stage builds
- **CI/CD:** GitHub Actions
- **Deployment:** Azure Web Apps
- **Secret Management:** Environment variables with proper security practices

## Key Technologies
- React 18+
- Next.js 15+
- Node.js
- TypeScript 5+
- MongoDB
- Firebase Authentication
- Tailwind CSS
- Shadcn UI
- Zustand (for state management)
- Vitest (unit/integration testing)
- Playwright (E2E testing)
- PNPM (package manager)
- Docker
- GitHub Actions
- Azure (hosting)
- Zod (validation)

## Coding Standards

This project adheres to the "Full-Stack Development Standards" covering:

### Code Structure & Modularity
- **File Size Limit:** Keep files under 400 lines
- **Naming Conventions:**
  - `PascalCase` for Components/Types
  - `camelCase` for variables/functions
  - `kebab-case` for files/folders (except Component files)
  - `CAPITALIZED_SNAKE_CASE` for constants
- **File Structure:**
  - Feature-based/co-located for Next.js (using App Router with Route Groups and Private Folders)
  - Layered architecture for backend (Controllers, Services, Repositories)

### TypeScript Usage
- Use TypeScript's `strict` mode
- Avoid `any` types; use `unknown` with type guards when necessary
- Use proper interfaces and types for all components, functions, and data structures

### React Best Practices
- Use functional components with Hooks
- Extract reusable logic into custom Hooks
- Follow composition over inheritance
- Use appropriate state management based on complexity

### Testing Strategy
- Co-locate test files with source files (e.g., `*.test.tsx`)
- Focus on meaningful coverage over arbitrary percentage targets
- Test core business logic, edge cases, and failure scenarios

### API Design
- Follow REST principles
- Use standard HTTP methods and status codes
- Validate all incoming data
- Implement proper error handling
- Version APIs appropriately

### UI Implementation
- Use Tailwind CSS for styling
- Leverage Shadcn UI components
- Ensure accessibility compliance (WCAG 2.1 Level AA)
- Maintain consistent design language throughout the application

### Dependency Management
- Use PNPM for package management
- Review and clean up dependencies regularly
- Keep dependencies updated within semver constraints

## Documentation
- Keep `README.md` up-to-date with setup instructions
- Update `TASK.md` with completed tasks and newly discovered items
- Document key architectural decisions
- Use TSDoc for code documentation 