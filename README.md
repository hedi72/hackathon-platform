# 🚀 Hackathon Platform

A modern, full-stack web application built with Next.js for hosting and managing hackathons. Connect with developers, form teams, and participate in exciting coding competitions.

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

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

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