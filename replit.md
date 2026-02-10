# Web Developer Portfolio

## Overview
A modern, responsive web developer portfolio built with React, TypeScript, and TailwindCSS. Features live code demos, tech stack badges with proficiency indicators, GitHub integration for displaying repositories, and a dark/light theme toggle.

## Architecture
- **Frontend**: React SPA with Vite, TailwindCSS, Shadcn UI components, Framer Motion animations
- **Backend**: Express.js API server proxying GitHub API requests
- **Styling**: Custom design tokens in index.css with purple/indigo primary color scheme
- **State**: TanStack React Query for data fetching

## Key Features
- Hero section with typing animation effect
- Projects showcase with live code demo toggles and filtering
- Interactive code demos with syntax display and copy functionality
- Tech stack badges with proficiency progress bars
- GitHub integration showing repos, stats (stars, forks, language)
- Contact section with professional links
- Dark/light theme toggle with system preference detection
- Fully responsive navigation with mobile menu

## Project Structure
- `client/src/components/` - All UI components (navigation, hero, projects, skills, github, code-demo, contact, footer, theme)
- `client/src/pages/home.tsx` - Main portfolio page composing all sections
- `server/routes.ts` - GitHub API proxy with fallback demo data
- `shared/schema.ts` - TypeScript interfaces for GitHubRepo, GitHubProfile, Project, TechSkill

## Configuration
- Optional `GITHUB_TOKEN` environment variable for live GitHub data
- Without token, displays realistic demo/fallback data
- Theme preference stored in localStorage

## Recent Changes
- 2026-02-09: Initial build of portfolio with all sections
