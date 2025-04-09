# **🌟 GrowLink - The social media app for entrepreneurs**

![Project Image](https://github.com/enzomachado/next-academic-outreach-project/blob/main/public/thumbnail.png)

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. ♿ [Design Principles](#-design-principles)
5. 🌍 [SDG 8 - Decent Work and Economic Growth](#sdg)
6. 🚀 [Getting Started](#getting-started)
7. 👋 [Let’s Connect!](#lets-connect)

## <a name="introduction">🤖 Introduction</a>

**GrowLink** is a social platform designed to empower small-scale entrepreneurs in vulnerable situations by fostering collaboration, knowledge sharing, and mutual growth. Developed as part of an academic outreach program, this project combines cutting-edge web technologies with a strong social mission, aligning with the United Nations' **Sustainable Development Goals (SDG 8 - Decent Work and Economic Growth)**. The platform adheres to the **7 Principles of Universal Design**, ensuring accessibility and inclusivity for all users, regardless of ability or background.

This project showcases a modern, scalable full-stack application built with performance, usability, and maintainability in mind—qualities I’ve honed through years of experience in high-impact software development.

## <a name="tech-stack">🛠 Tech Stack</a>

**Frontend**: React 19, Next.js 15 (Server Actions), Tailwind CSS, Shadcn UI
**Backend**: Prisma (ORM), PostgreSQL, Better Auth (Authentication)
**State Management**: TanStack React Query
**Form Handling**: React Hook Form, Zod (Schema Validation)
**File Uploads**: UploadThing
**Rich Text**: TipTap Editor
**Language**: TypeScript (strict typing for robustness)
**Tools**: Docker, Git

## <a name="features">✨ Features</a>

**Community Hub**: Entrepreneurs can share experiences, post updates, and seek advice in a secure, moderated environment.

**Next.js Server Actions**: Optimized server-side logic for fast, secure interactions.

**Authentication**: Supports both Credentials-based Login (email/password) and OAuth (GitHub) for seamless onboarding.

**Content Creation**: Rich text editor (TipTap) for professional posts and resource sharing.

**Media Uploads**: Integrated file uploads via UploadThing for showcasing products/services.

and many more, including features alongside code architecture and
reusability

## <a name="sdg">♿ Design Principles</a>

This project adheres to the **7 Principles of Universal Design**:

- **Equitable Use**: Inclusive features for diverse socioeconomic backgrounds.
- **Flexibility in Use**: Multiple authentication methods and customizable profiles.
- **Simple and Intuitive**: Clean UX for users with varying tech literacy.
- **Perceptible Information**: High-contrast UI and alt-text for media.
- **Tolerance for Error**: Form validation with clear feedback.
- **Low Physical Effort**: Keyboard shortcuts and minimal clicks.
- **Size and Space for Approach**: Responsive layouts for all devices.

## <a name="sdg">🌍 Sustainable Development Goals (SDG)</a>

GrowLink directly supports **SDG 8 - Decent Work and Economic Growth** by:

- Providing a platform for vulnerable entrepreneurs to network and grow their businesses.
- Encouraging knowledge exchange to improve economic resilience.
- Promoting inclusive opportunities for underrepresented communities.

## <a name="quick-start">🚀 Getting Started</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/) (optional for PostgreSQL)

**Cloning the Repository**

```bash
git clone https://github.com/enzomachadodev/next-academic-outreach-project.git

cd next-academic-outreach-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Database with Docker Compose**

At the root of the project, there is a `docker-compose.yml` file with the configuration for a PostgreSQL database.

If you don't have Docker installed, you can find it here: [Get Docker](https://docs.docker.com/get-started/get-docker/).

To start the container:

```bash
docker compose up -d
```

To end the service:

```bash
docker compose down postgres
```

**Set Up Environment Variables**

Copy `.env.example` to `.env` and fill in your credentials:

- GitHub OAuth (from GitHub Developer Settings)
- UploadThing API Key (from [UploadThing](https://uploadthing.com/))
- Database URL (e.g., postgresql://user:password@localhost:5432/growlink)

**Database Tables**

To create database tables, you can run Prisma commands.

```bash
npx prisma db push
```

**Running the App**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## <a name="lets-connect">👋 Let’s Connect!</a>

- [enzomachado.dev](https://enzomachado.dev)
- [LinkedIn](https://linkedin.com/in/enzomachadodev)
- [GitHub](https://github.com/enzomachadodev)
- [Twitter](https://x.com/enzofmachado)
