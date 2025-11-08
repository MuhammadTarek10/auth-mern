# MERN Auth Application

A modern, full-stack authentication application built with React, TypeScript, and TanStack Router. This application provides a complete authentication system with user registration, login, profile management, and secure token-based authentication.

## ✨ Features

- 🔐 **User Authentication**
  - Secure sign up with email and password
  - Sign in with email and password
  - Automatic token refresh
  - Protected routes with authentication guards

- 🛡️ **Security Features**
  - JWT token-based authentication
  - Automatic token refresh
  - Secure HTTP-only cookies
  - Protected API routes
  - Form validation with Zod

- ⚡ **Performance**
  - Fast page loads with Vite
  - Code splitting with TanStack Router
  - Optimized bundle size
  - Efficient state management

## 📸 Screenshots

### Sign In Page

![Sign In Page](./screenshots/sign-in.png)

The sign-in page features a clean, centered form with email and password fields. The design uses a beautiful green gradient background with a white card containing the form.

### Sign Up Page

![Sign Up Page](./screenshots/sign-up.png)

The sign-up page allows new users to create an account with name, email, password, and password confirmation fields. All fields include proper validation.

### Profile Page - Profile Tab

![Profile Page](./screenshots/profile.png)

The profile page displays user information including full name, email address, and user ID. The page features a beautiful header with user avatar and badges.

### Profile Page - Overview Tab

![Profile Overview](./screenshots/profile-overview.png)

The overview tab shows account statistics including account status, email verification status, member since date, and last active time. It also includes quick actions like signing out.

### Profile Page - Settings Tab

![Profile Settings](./screenshots/profile-settings.png)

The settings tab provides a placeholder for future account settings and preferences management.

## 🚀 Tech Stack

### Frontend

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Development Tools

- **Vitest** - Unit testing framework
- **TanStack Router Devtools** - Router debugging
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- A running backend API server (MERN stack backend)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd auth-mern/app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:3001
   VITE_API_VERSION=v1
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start the development server (port 3000)
- `npm run build` - Build the application for production
- `npm run serve` - Preview the production build locally
- `npm run test` - Run tests with Vitest

## 🏗️ Project Structure

```
app/
├── public/                 # Static assets
├── src/
│   ├── common/            # Shared components and utilities
│   │   ├── components/   # Reusable UI components
│   │   ├── constants.ts  # Application constants
│   │   ├── hooks/        # Shared React hooks
│   │   └── models/       # TypeScript type definitions
│   ├── components/        # Feature-specific components
│   ├── features/          # Feature modules
│   │   ├── auth/         # Authentication feature
│   │   │   ├── components/  # Auth-related components
│   │   │   └── pages/       # Auth pages
│   │   └── profile/      # Profile feature
│   │       ├── components/  # Profile components
│   │       └── pages/       # Profile pages
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── routes/           # TanStack Router routes
│   ├── services/         # API service layer
│   │   ├── api.service.ts    # Base API service
│   │   ├── auth.service.ts   # Authentication service
│   │   └── user.service.ts   # User service
│   ├── App.css           # Global styles
│   └── main.tsx          # Application entry point
├── screenshots/          # Application screenshots
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔌 API Endpoints

The application communicates with a backend API. The following endpoints are used:

### Authentication

- `POST /api/v1/auth/sign-in` - Sign in with email and password
- `POST /api/v1/auth/sign-up` - Create a new account
- `POST /api/v1/auth/refresh` - Refresh authentication token
- `POST /api/v1/auth/sign-out` - Sign out current user

### User

- `GET /api/v1/users/profile` - Get current user profile

## 🔐 Authentication Flow

1. **Sign Up/Sign In**: User provides credentials
2. **Token Storage**: JWT tokens are stored in HTTP-only cookies
3. **Token Refresh**: Tokens are automatically refreshed before expiration
4. **Protected Routes**: Routes check authentication status before rendering
5. **Sign Out**: Clears tokens and redirects to sign-in page

## 🎯 Key Features Explained

### Form Validation

All forms use Zod schemas for validation:

- Email format validation
- Password strength requirements
- Password confirmation matching
- Required field validation

### Token Management

- Automatic token refresh before expiration
- Secure token storage in HTTP-only cookies
- Automatic logout on token expiration
- Request retry on 401 errors with token refresh

### Route Protection

- Protected routes redirect to sign-in if not authenticated
- Public routes (sign-in, sign-up) redirect to profile if authenticated
- Loading states during authentication checks

## 🧪 Testing

Run tests with:

```bash
npm run test
```

## 🚢 Building for Production

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run serve
   ```

The production build will be in the `dist/` directory.

## 🔧 Configuration

### Environment Variables

| Variable           | Description          | Default                 |
| ------------------ | -------------------- | ----------------------- |
| `VITE_API_URL`     | Backend API base URL | `http://localhost:3001` |
| `VITE_API_VERSION` | API version          | `v1`                    |

### Vite Configuration

The project uses Vite with the following plugins:

- `@tanstack/router-plugin` - File-based routing
- `@vitejs/plugin-react` - React support
- `@tailwindcss/vite` - Tailwind CSS integration

## 📝 Code Style

- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting (if configured)
- Component-based architecture
- Custom hooks for reusable logic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a MERN stack authentication system.

## 🙏 Acknowledgments

- [TanStack Router](https://tanstack.com/router) for excellent routing solution
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development experience

## 📞 Support

For support, please open an issue in the repository.

---

**Note**: Make sure your backend API server is running and properly configured before starting the frontend application. The default API URL is `http://localhost:3001`, but you can change it via environment variables.
