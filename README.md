<div align="center">

# ⚛️ Gaba's Portfolio

**Interactive Developer Showcase**

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-000000.svg)
![Three.js](https://img.shields.io/badge/Three.js-0.153.0-black.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC.svg)

</div>

## 🌟 Overview
Personal portfolio website showcasing projects, skills, and experience with interactive elements and professional presentation.

## 🚀 Key Features
- Interactive 3D scene with reactive animations
- Project showcase with gallery and details
- Responsive design for all device types
- Dark/light theme with system preference detection
- Email notification system with rate limiting
- Smooth page transitions and scroll animations

## ⚙️ Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS
- **3D Graphics**: Three.js with React Three Fiber/Drei
- **Motion**: Framer Motion for animations
- **Forms**: React Hook Form + Zod validation
- **Backend**: Nodemailer for contact functionality
- **Deployment**: Vercel with Edge functions

## 📂 Project Structure
- `/app`: Next.js App Router components
  - `/api`: Contact form endpoints
  - `/globals.css`: Tailwind styles
- `/components`: UI components
  - `/layout`: Header, footer
  - `/sections`: Hero, Projects, About/Contact
  - `/three`: 3D scene controller
  - `/ui`: Buttons, icons, animations
  - `/providers`: Theme and scroll context
- `/lib`: Utilities and data
  - `portfolio.ts`: Projects and personal info
  - `email-service.ts`: Contact functionality
- `/public`: Static assets and images

## 🎨 Design Principles
- Clean, minimalist interface
- Focus on content with strategic visual elements
- Performance-optimized animations
- Accessibility-first approach
- Consistent visual language across sections

## 🔄 Development Workflow
- TypeScript for type safety
- ESLint and Prettier for code quality
- Husky for pre-commit hooks
- GitHub Actions for CI/CD
- Incremental Static Regeneration for content updates

## 🌐 Connect
- Website: [gabadev.com](https://gabadev.com)
- Twitter: [@MetaForgeLol](https://twitter.com/MetaForgeLol)
- Discord: [discord.gg/gY5PsymH](https://discord.gg/gY5PsymH)
- Email: contact@gabadev.com
