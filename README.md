# 🚀 Hackathon Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hedi72/hackathon-platform)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://hackathon-platform-sigma.vercel.app/)

A modern, full-stack web application built with Next.js for hosting and managing hackathons. Connect with developers, form teams, and participate in exciting coding competitions.

🌐 **Live Demo**: [https://hackathon-platform-sigma.vercel.app/](https://hackathon-platform-sigma.vercel.app/)

![Hackathon Platform](./public/images/generated-image%20-%202025-09-24T170711.890.png)

## ✨ Features

### 🎯 Core Features
- **Event Management**: Create, host, and manage hackathons with comprehensive tools
- **Team Building**: Connect with talented developers and form powerful teams
- **User Authentication**: Secure authentication system with NextAuth.js
- **Project Submissions**: Submit and showcase your hackathon projects
- **Real-time Updates**: Stay updated with event progress and announcements

### 🔧 Technical Features
- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Database Integration**: MongoDB with Prisma ORM for data management
- **Modern UI Components**: Radix UI components with custom styling
- **Type Safety**: Full TypeScript support throughout the application
- **Form Validation**: React Hook Form with Zod schema validation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Tailwind Animate
- **UI Components**: Radix UI + Custom Components
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js v4
- **Database**: MongoDB
- **ORM**: Prisma
- **Password Hashing**: bcryptjs

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Quality**: TypeScript strict mode
- **Development**: Next.js dev server with hot reload

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/hedi72/hackathon-platform.git
cd hackathon-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following environment variables:

```bash
# Database
DATABASE_URL="mongodb://localhost:27017/hackathon-platform"
# or for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/hackathon-platform"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: OAuth providers (if using)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Optional: Seed database (if you have a seed script)
npx prisma db seed
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

> **🌟 Want to see it in action?** Check out the live demo at [https://hackathon-platform-sigma.vercel.app/](https://hackathon-platform-sigma.vercel.app/)

## 📁 Project Structure

```
hackathon-platform/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── auth/                 # Authentication endpoints
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # User dashboard
│   ├── events/                   # Hackathon events pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable UI components
│   └── ui/                       # Shadcn/ui components
├── src/                          # Source code
│   ├── components/               # Custom components
│   │   ├── layout/               # Layout components
│   │   └── providers/            # Context providers
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions and configurations
│   ├── store/                    # State management (Zustand)
│   └── types/                    # TypeScript type definitions
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets
└── hooks/                        # Additional custom hooks
```

## 🎨 UI Components

This project uses a combination of:
- **Radix UI**: Unstyled, accessible components
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Located in `components/ui/`

Key components include:
- Forms and inputs
- Navigation menus
- Dialogs and modals
- Cards and layouts
- Data tables
- Charts and visualizations

## 🔐 Authentication

The application uses **NextAuth.js** for authentication with support for:
- **Credentials**: Email/password authentication
- **OAuth Providers**: Google, GitHub (configurable)
- **Session Management**: Secure session handling
- **Database Sessions**: Stored in MongoDB via Prisma

## 📊 Database Schema

The application uses **MongoDB** with **Prisma** ORM. Key models include:

- **User**: User profiles with authentication data
- **Account**: OAuth account linking
- **Session**: User session management
- **Hackathon**: Event information and management
- **Team**: Team formation and management
- **Project**: Project submissions and details

## 🚀 Deployment

### Vercel (Recommended) ✅ **DEPLOYED**
🌐 **Current Deployment**: [https://hackathon-platform-sigma.vercel.app/](https://hackathon-platform-sigma.vercel.app/)

To deploy your own version:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

#### Required Environment Variables for Vercel:
```bash
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-secret-key"
```

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🐛 Troubleshooting

### Common Deployment Issues

#### 1. 500 Internal Server Error on `/api/auth/signup`
**Problem**: Database connection or environment variables not configured properly.

**Immediate Debugging Steps**:
1. **Check Health Endpoints** (after redeployment):
   - 🏥 Basic health: `https://hackathon-platform-sigma.vercel.app/api/health`
   - 🔍 Database test: `https://hackathon-platform-sigma.vercel.app/api/test-db`

2. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → Functions tab
   - Look for detailed error logs with 🔍 emojis

**Solutions**:
- ✅ Verify `DATABASE_URL` is set in Vercel environment variables
- ✅ Ensure MongoDB database is accessible from Vercel's servers  
- ✅ Use MongoDB Atlas (recommended for production)
- ✅ Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access (temporarily for testing)
- ✅ Run `npx prisma generate` and `npx prisma db push` after schema changes
- ✅ Check detailed logs in Vercel dashboard

**Example working DATABASE_URL formats**:
```bash
# MongoDB Atlas
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hackathon-platform?retryWrites=true&w=majority"

# Local MongoDB (development only)
DATABASE_URL="mongodb://localhost:27017/hackathon-platform"
```

#### 2. Database Connection Errors
**Problem**: MongoDB connection string or network issues.

**Solutions**:
- ✅ Use MongoDB Atlas for cloud deployment (recommended)
- ✅ Whitelist Vercel IP ranges in MongoDB Atlas
- ✅ Ensure connection string includes database name
- ✅ Test connection string locally first

#### 3. NextAuth Configuration Issues
**Problem**: NextAuth session errors and authentication problems.

**Common Errors**:
- `CLIENT_FETCH_ERROR`: Server configuration issue
- 500 errors on `/api/auth/session`
- 500 errors on `/api/auth/_log`

**Solutions**:
- ✅ Ensure all required environment variables are set:
  - `NEXTAUTH_URL="https://hackathon-platform-sigma.vercel.app"`
  - `NEXTAUTH_SECRET="random-secret-string-32-chars-min"`
- ✅ Test NextAuth config: `https://hackathon-platform-sigma.vercel.app/api/test-auth`
- ✅ Remove GitHub provider if `GITHUB_ID` and `GITHUB_SECRET` are not set
- ✅ Verify Prisma adapter is working with database

#### 4. Missing API Routes (404 Errors)
**Problem**: Routes like `/projects` returning 404 errors.

**Solutions**:
- ✅ Verify all API routes exist in `/app/api/` directory
- ✅ Test projects API: `https://hackathon-platform-sigma.vercel.app/api/projects`
- ✅ Check for typos in route names and file structure
- ✅ Ensure proper file naming: `route.ts` not `index.ts`

#### 4. Build Errors
**Problem**: TypeScript or dependency issues during build.

**Solutions**:
- ✅ Run `npm run build` locally to test
- ✅ Ensure all dependencies are in `package.json`
- ✅ Check TypeScript configuration
- ✅ Verify Prisma client is generated

### Environment Variables Checklist
- [ ] `DATABASE_URL` - MongoDB connection string
- [ ] `NEXTAUTH_URL` - Your production domain
- [ ] `NEXTAUTH_SECRET` - Random secret string
- [ ] OAuth provider credentials (if using)

### Debugging Steps
1. **Check Health Endpoints** (after redeployment):
   ```bash
   # Basic configuration check
   curl https://hackathon-platform-sigma.vercel.app/api/health
   
   # Database connection test
   curl https://hackathon-platform-sigma.vercel.app/api/test-db
   
   # NextAuth configuration test
   curl https://hackathon-platform-sigma.vercel.app/api/test-auth
   
   # Projects API test
   curl https://hackathon-platform-sigma.vercel.app/api/projects
   ```

2. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Your project → Functions tab
   - Look for error messages with 🔍, ❌, and ✅ emojis for easy identification

3. **Test Database Connection**:
   ```bash
   npx prisma db push
   npx prisma studio
   ```

4. **Local Environment Test**:
   ```bash
   npm run build
   npm start
   ```

5. **Prisma Issues**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint

# Database
npx prisma studio   # Open Prisma Studio
npx prisma generate # Generate Prisma client
npx prisma db push  # Push schema changes
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help getting started:

1. Check the [Issues](https://github.com/hedi72/hackathon-platform/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainers

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js

---

Made with ❤️ for the developer community. Happy hacking! 🎉