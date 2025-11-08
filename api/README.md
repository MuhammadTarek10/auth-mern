# Authentication API - Robust MERN Stack Authentication System

A production-ready, enterprise-grade authentication API built with NestJS, MongoDB, and JWT. This system provides secure user authentication with session management, dual authentication support (Bearer tokens and HTTP-only cookies), and comprehensive security features.

## 🎯 Purpose

This project serves as a **robust, scalable authentication system** designed to handle user registration, login, token refresh, and session management with enterprise-level security practices. It can be integrated into any modern web application requiring secure user authentication.

## ✨ Key Features

### Authentication & Authorization

- **User Registration & Login** - Secure sign-up and sign-in with email/password
- **JWT-Based Authentication** - Access and refresh token implementation
- **Dual Authentication Support** - Works with both Bearer tokens and HTTP-only cookies
- **Session Management** - MongoDB-backed session storage with automatic expiration
- **Token Refresh Flow** - Automatic token rotation with refresh token invalidation
- **Secure Sign-Out** - Session deletion and cookie clearing

### Security Features

- **Password Hashing** - Argon2 algorithm for secure password storage
- **Password Validation** - Enforces strong password requirements (uppercase, lowercase, number, special character)
- **HTTP-Only Cookies** - Protection against XSS attacks
- **CORS Configuration** - Configurable cross-origin resource sharing
- **Token Rotation** - New tokens generated on each refresh to prevent token reuse
- **Session-Based Token Validation** - Tokens are tied to sessions, preventing unauthorized access after sign-out
- **Input Validation** - Class-validator with comprehensive DTO validation
- **SQL Injection Protection** - MongoDB naturally protects against SQL injection
- **XSS Protection** - Input sanitization and validation

### API Features

- **RESTful API Design** - Clean, intuitive endpoint structure
- **Swagger Documentation** - Interactive API documentation with authentication
- **Versioning Support** - URI-based API versioning (v1)
- **Global Response Interceptor** - Consistent response format across all endpoints
- **Comprehensive Error Handling** - Descriptive error messages and appropriate HTTP status codes
- **CORS Support** - Configurable for multiple frontend origins

### Development & Testing

- **End-to-End Testing** - Comprehensive e2e tests with Pactum
- **Docker Support** - MongoDB containerization for development
- **Environment Configuration** - Zod-based schema validation for environment variables
- **TypeScript** - Full type safety and modern JavaScript features
- **ESLint & Prettier** - Code quality and formatting enforcement

## 🛠 Tech Stack

### Core Framework

- **[NestJS](https://nestjs.com/)** v11 - Progressive Node.js framework with TypeScript
- **[TypeScript](https://www.typescriptlang.org/)** v5 - Static typing and modern JavaScript features

### Database & ODM

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for flexible data storage
- **[Mongoose](https://mongoosejs.com/)** v8 - Elegant MongoDB object modeling

### Authentication & Security

- **[Passport](https://www.passportjs.org/)** - Authentication middleware
  - `passport-local` - Local authentication strategy
  - `passport-jwt` - JWT authentication strategy
- **[@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)** - JWT token generation and verification
- **[Argon2](https://www.npmjs.com/package/argon2)** - Advanced password hashing algorithm
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** - HTTP-only cookie handling

### Validation & Configuration

- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **[Zod](https://zod.dev/)** v4 - TypeScript-first schema validation
- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** - Configuration management

### API Documentation

- **[@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)** v11 - OpenAPI/Swagger integration
- **[express-basic-auth](https://www.npmjs.com/package/express-basic-auth)** - Swagger UI protection

### Testing

- **[Jest](https://jestjs.io/)** v30 - JavaScript testing framework
- **[Pactum](https://pactum.js.org/)** v3 - REST API testing toolkit
- **[@nestjs/testing](https://docs.nestjs.com/fundamentals/testing)** - NestJS testing utilities
- **[Supertest](https://github.com/visionmedia/supertest)** - HTTP assertion library

### Development Tools

- **[Docker](https://www.docker.com/)** - MongoDB containerization
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[dotenv-cli](https://www.npmjs.com/package/dotenv-cli)** - Environment variable management

## 📁 Project Structure

```
api/
├── src/
│   ├── auth/                      # Authentication module
│   │   ├── dtos/                  # Data Transfer Objects
│   │   │   ├── sign-in.dto.ts
│   │   │   ├── sign-up.dto.ts
│   │   │   └── token-response.dto.ts
│   │   ├── guards/                # Authentication guards
│   │   │   ├── jwt.guard.ts       # Access token guard
│   │   │   ├── local.guard.ts     # Local strategy guard
│   │   │   └── refresh.guard.ts   # Refresh token guard
│   │   ├── schemas/               # Database schemas
│   │   │   ├── auth-methods.schema.ts
│   │   │   └── session.schema.ts
│   │   ├── strategies/            # Passport strategies
│   │   │   ├── jwt.strategy.ts    # JWT access token strategy
│   │   │   ├── local.strategy.ts  # Local authentication strategy
│   │   │   └── refresh.strategy.ts # JWT refresh token strategy
│   │   ├── auth.controller.ts     # Authentication endpoints
│   │   ├── auth.module.ts         # Authentication module
│   │   ├── auth.service.ts        # Authentication business logic
│   │   └── session.repository.ts  # Session data access layer
│   │
│   ├── users/                     # User management module
│   │   ├── dtos/                  # User DTOs
│   │   ├── schemas/               # User schema
│   │   │   └── user.schema.ts
│   │   ├── users.controller.ts    # User endpoints
│   │   ├── users.module.ts        # User module
│   │   ├── users.repository.ts    # User data access layer
│   │   └── users.service.ts       # User business logic
│   │
│   ├── core/                      # Core utilities and configuration
│   │   ├── config/                # Configuration files
│   │   │   ├── app.config.ts
│   │   │   ├── database.config.ts
│   │   │   ├── environment.ts
│   │   │   ├── jwt.config.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── validation.schema.ts
│   │   ├── database/              # Database module
│   │   │   ├── base.repository.ts # Base repository pattern
│   │   │   ├── common.schema.ts   # Shared schema fields
│   │   │   └── database.module.ts
│   │   ├── decorators/            # Custom decorators
│   │   │   ├── get-user.decorator.ts
│   │   │   └── response-message.decorator.ts
│   │   ├── interceptors/          # Response interceptors
│   │   │   └── response.interceptor.ts
│   │   └── utils/                 # Utility services
│   │       ├── hash.service.ts    # Password hashing (Argon2)
│   │       ├── token/             # Token management
│   │       └── cookie/            # Cookie utilities
│   │
│   ├── app.module.ts              # Root application module
│   ├── app.service.ts             # Root application service
│   └── main.ts                    # Application entry point
│
├── test/                          # End-to-end tests
│   ├── auth.e2e-spec.ts          # Authentication flow tests
│   ├── setup.ts                   # Test setup and configuration
│   └── jest-e2e.json             # Jest e2e configuration
│
├── docker-compose.yml             # MongoDB Docker configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── nest-cli.json                  # NestJS CLI configuration
├── eslint.config.mjs             # ESLint configuration
└── README.md                      # This file
```

## 🏗 Architecture Overview

### Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. POST /auth/sign-up or /auth/sign-in
       ↓
┌─────────────────────┐
│  Auth Controller    │
└──────┬──────────────┘
       │
       │ 2. Validate credentials
       ↓
┌─────────────────────┐
│   Auth Service      │──────→ Hash password (Argon2)
└──────┬──────────────┘
       │
       │ 3. Create/Find user
       ↓
┌─────────────────────┐
│   Users Service     │
└──────┬──────────────┘
       │
       │ 4. Create session
       ↓
┌─────────────────────┐
│ Session Repository  │──────→ Store in MongoDB
└──────┬──────────────┘
       │
       │ 5. Generate JWT tokens
       ↓
┌─────────────────────┐
│   Token Service     │──────→ Access & Refresh tokens
└──────┬──────────────┘
       │
       │ 6. Return tokens + Set HTTP-only cookies
       ↓
┌─────────────────────┐
│      Client         │
└─────────────────────┘
```

### Token Refresh Flow

```
┌─────────────┐
│   Client    │ (Sends Refresh Token)
└──────┬──────┘
       │
       │ 1. POST /auth/refresh
       ↓
┌─────────────────────┐
│ Refresh Guard       │──────→ Verify refresh token
└──────┬──────────────┘
       │
       │ 2. Validate session
       ↓
┌─────────────────────┐
│   Auth Service      │──────→ Verify refresh token hash
└──────┬──────────────┘
       │
       │ 3. Generate new token pair
       ↓
┌─────────────────────┐
│   Token Service     │──────→ Rotate tokens
└──────┬──────────────┘
       │
       │ 4. Update session with new refresh token hash
       ↓
┌─────────────────────┐
│ Session Repository  │
└──────┬──────────────┘
       │
       │ 5. Return new tokens
       ↓
┌─────────────────────┐
│      Client         │
└─────────────────────┘
```

### Session Management

- **Session Creation**: Created on sign-up and sign-in
- **Session Storage**: MongoDB with automatic TTL (Time To Live) expiration
- **Session Validation**: Every token includes `sessionId` for validation
- **Session Deletion**: Removed on sign-out or automatic expiration
- **Concurrent Sessions**: Multiple sessions per user supported

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** >= 7.x (or Docker)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd auth-mern/api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up MongoDB**

Using Docker (recommended for development):

```bash
docker-compose up -d
```

Or use your own MongoDB instance.

4. **Configure environment variables**

Create environment files:

**`.env.development`** (Development)

```env
# Application
NODE_ENV=development
APP_PORT=3000

# Frontend URLs
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_PROD=

# Database
DATABASE_URL=mongodb://root:password@localhost:27017/auth-db?authSource=admin

# Swagger Documentation
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin123

# JWT Secrets (Generate secure random strings in production!)
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=3600
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=604800
```

**`.env.test`** (Testing)

```env
NODE_ENV=test
APP_PORT=3334
FRONTEND_URL=http://localhost:5173
DATABASE_URL=mongodb://root:password@localhost:27017/auth-test-db?authSource=admin
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin123
JWT_ACCESS_SECRET=test-access-secret
JWT_ACCESS_EXPIRES_IN=3600
JWT_REFRESH_SECRET=test-refresh-secret
JWT_REFRESH_EXPIRES_IN=604800
```

**`.env.production`** (Production)

```env
NODE_ENV=production
APP_PORT=3000
FRONTEND_URL=https://your-frontend-domain.com
FRONTEND_URL_PROD=https://your-production-domain.com
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/auth-db
SWAGGER_USER=secure-admin-username
SWAGGER_PASSWORD=very-secure-password-here
JWT_ACCESS_SECRET=generate-long-random-string-minimum-32-chars
JWT_ACCESS_EXPIRES_IN=3600
JWT_REFRESH_SECRET=generate-different-long-random-string-minimum-32-chars
JWT_REFRESH_EXPIRES_IN=604800
```

> **⚠️ Security Warning**: Never commit `.env` files to version control. Use strong, randomly generated secrets in production.

### Running the Application

**Development mode with hot-reload:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

**Debug mode:**

```bash
npm run start:debug
```

The API will be available at `http://localhost:3000/api/v1`

## 📚 API Documentation

### Interactive Swagger UI

Once the application is running, access the Swagger documentation:

**URL**: `http://localhost:3000/docs`

**Credentials**:

- Username: `admin` (or your `SWAGGER_USER`)
- Password: `admin` (or your `SWAGGER_PASSWORD`)

### API Endpoints

#### Authentication Endpoints

| Method | Endpoint                | Description                     | Auth Required |
| ------ | ----------------------- | ------------------------------- | ------------- |
| POST   | `/api/v1/auth/sign-up`  | Register a new user             | No            |
| POST   | `/api/v1/auth/sign-in`  | Sign in a user                  | No            |
| POST   | `/api/v1/auth/refresh`  | Refresh access token            | Refresh Token |
| POST   | `/api/v1/auth/sign-out` | Sign out and invalidate session | Access Token  |

#### User Endpoints

| Method | Endpoint                | Description              | Auth Required |
| ------ | ----------------------- | ------------------------ | ------------- |
| GET    | `/api/v1/users/profile` | Get current user profile | Access Token  |

### Authentication Methods

The API supports **two authentication methods**:

1. **Bearer Token** (Authorization header)

```bash
Authorization: Bearer <access_token>
```

2. **HTTP-only Cookies** (Automatically set)

```bash
Cookie: access_token=<token>; refresh_token=<token>
```

### Example API Requests

#### 1. Sign Up

```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**

```json
{
  "message": "User signed up successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}
```

#### 2. Sign In

```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

#### 3. Refresh Token

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Authorization: Bearer <refresh_token>"
```

#### 4. Get Profile

```bash
curl -X GET http://localhost:3000/api/v1/users/profile \
  -H "Authorization: Bearer <access_token>"
```

**Response:**

```json
{
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 5. Sign Out

```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-out \
  -H "Authorization: Bearer <access_token>"
```

### Password Requirements

Passwords must meet the following criteria:

- **Minimum length**: 8 characters
- **Maximum length**: 50 characters
- **Must contain**:
  - At least one lowercase letter (a-z)
  - At least one uppercase letter (A-Z)
  - At least one number (0-9)
  - At least one special character (@$!%\*?&)

**Valid examples**: `SecurePass123!`, `MyP@ssw0rd`, `Test@2024`

**Invalid examples**: `password` (no uppercase/special char), `PASSWORD123` (no lowercase/special char)

## 🧪 Testing

### Run Tests

**End-to-end tests:**

```bash
npm run e2e
```

**Run tests with coverage:**

```bash
npm run test:cov
```

**Watch mode:**

```bash
npm run test:watch
```

### Test Coverage

The project includes comprehensive e2e tests covering:

✅ User registration with validation  
✅ User login with credentials  
✅ Token refresh flow  
✅ Token rotation and invalidation  
✅ Session management  
✅ Multiple concurrent sessions  
✅ Sign-out and session cleanup  
✅ Password complexity validation  
✅ Email validation and trimming  
✅ Edge cases (malformed data, SQL injection attempts, XSS)  
✅ Full authentication flow integration

### Test Results

All tests are automated and run in an isolated test database. The test suite includes:

- **29 test suites** covering all authentication flows
- **Pactum** for intuitive API testing
- **MongoDB in-memory** for isolated testing
- **Automatic database cleanup** between tests

## 🔒 Security Features

### Password Security

- ✅ **Argon2 Hashing** - Industry-standard password hashing
- ✅ **Strong Password Policy** - Enforced complexity requirements
- ✅ **Password Never Exposed** - Excluded from API responses

### Token Security

- ✅ **JWT with Separate Secrets** - Different secrets for access and refresh tokens
- ✅ **Token Rotation** - New tokens generated on each refresh
- ✅ **Refresh Token Invalidation** - Old refresh tokens cannot be reused
- ✅ **Session-Based Validation** - Tokens tied to active sessions
- ✅ **Configurable Expiration** - Separate TTL for access and refresh tokens

### Cookie Security

- ✅ **HTTP-Only Cookies** - Not accessible via JavaScript (XSS protection)
- ✅ **Secure Flag** - Transmitted only over HTTPS in production
- ✅ **SameSite Attribute** - CSRF protection
- ✅ **Automatic Expiration** - Cookies expire with tokens

### Input Validation

- ✅ **Class Validator** - DTO-based validation
- ✅ **Email Sanitization** - Automatic trimming and validation
- ✅ **SQL Injection Protection** - MongoDB NoSQL nature
- ✅ **XSS Protection** - Input sanitization

### Environment Security

- ✅ **Zod Validation** - Runtime validation of environment variables
- ✅ **No Hardcoded Secrets** - All secrets from environment
- ✅ **Swagger Authentication** - Basic auth protecting API docs

## 🛠 Configuration

### Environment Variables

| Variable                 | Type   | Description                 | Default       | Required |
| ------------------------ | ------ | --------------------------- | ------------- | -------- |
| `NODE_ENV`               | string | Environment mode            | `development` | ✅       |
| `APP_PORT`               | number | Application port            | `3000`        | ✅       |
| `FRONTEND_URL`           | string | Frontend development URL    | -             | ✅       |
| `FRONTEND_URL_PROD`      | string | Frontend production URL     | -             | ❌       |
| `DATABASE_URL`           | string | MongoDB connection string   | -             | ✅       |
| `SWAGGER_USER`           | string | Swagger UI username         | -             | ✅       |
| `SWAGGER_PASSWORD`       | string | Swagger UI password         | -             | ✅       |
| `JWT_ACCESS_SECRET`      | string | JWT access token secret     | -             | ✅       |
| `JWT_ACCESS_EXPIRES_IN`  | number | Access token TTL (seconds)  | `3600`        | ✅       |
| `JWT_REFRESH_SECRET`     | string | JWT refresh token secret    | -             | ✅       |
| `JWT_REFRESH_EXPIRES_IN` | number | Refresh token TTL (seconds) | `604800`      | ✅       |

### Token Expiration Guidelines

**Access Token** (`JWT_ACCESS_EXPIRES_IN`):

- **Recommended**: 15 minutes to 1 hour (900 - 3600 seconds)
- **Current**: 1 hour (3600 seconds)
- Short-lived for security, refreshed frequently

**Refresh Token** (`JWT_REFRESH_EXPIRES_IN`):

- **Recommended**: 7-30 days (604800 - 2592000 seconds)
- **Current**: 7 days (604800 seconds)
- Longer-lived, stored securely, rotates on use

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Build

```bash
npm run build
```

## 🚀 Deployment

### Production Checklist

Before deploying to production:

- [ ] Generate strong, random JWT secrets (minimum 32 characters)
- [ ] Use a secure MongoDB connection (MongoDB Atlas or managed instance)
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Use HTTPS for all communications
- [ ] Set strong Swagger credentials
- [ ] Enable MongoDB authentication
- [ ] Set up proper logging and monitoring
- [ ] Configure firewall rules
- [ ] Enable rate limiting (future enhancement)
- [ ] Set up automated backups for MongoDB
- [ ] Use environment variable management service (AWS Secrets Manager, etc.)

### Docker Deployment

```dockerfile
# Dockerfile (example)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 🔮 Future Enhancements

The following features are planned for future development:

### 1. 📧 Email Verification

- Email confirmation on registration
- Verification token generation and validation
- Resend verification email endpoint
- Account activation flow

### 2. 🔐 Password Reset

- Forgot password endpoint
- Password reset token generation
- Secure password reset flow
- Password reset email templates

### 3. 📊 Logging & Monitoring

- Structured logging with Winston or Pino
- Audit logs for security events
- Request/response logging
- Error tracking and monitoring
- Performance metrics

### 4. 🚦 Rate Limiting

- Authentication endpoint rate limiting
- IP-based rate limiting
- User-based rate limiting
- Brute force protection
- Account lockout after failed attempts

### 5. 🌐 Social Authentication (OAuth)

- Google OAuth integration
- GitHub OAuth integration
- Facebook OAuth integration
- Apple Sign In
- Unified social login flow

### Additional Considerations

- Two-Factor Authentication (2FA)
- Session management dashboard
- Refresh token families
- WebSocket authentication
- API key management
- Role-Based Access Control (RBAC)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

## 👨‍💻 Author

Muhammad Tarek

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- MongoDB team for the robust database
- Passport.js for authentication strategies
- The open-source community

---

**Built with ❤️ using NestJS, MongoDB, and TypeScript**
