# Contributor Guidelines for FullStack-HackTech

Thank you for considering contributing to **TechBastic**! This document will help you get started with cloning the repository, setting up the project, and contributing effectively.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Making Contributions](#making-contributions)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code of Conduct](#code-of-conduct)

## Getting Started

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine using the following command:
   
   ```bash
   git clone https://github.com/YOUR_USERNAME/FullStack-HackTech.git
   
4. Navigate to the project directory:
   
   ```bash
   cd FullStack-HackTech/frontend
   
6. Install the dependencies:
   
   ```bash
   npm install
   
8. Start the development server:
   
   ```bash
   npm run dev
   
This should start the Vite development server. You can view the project by navigating to http://localhost:5173 in your browser.

## Project Setup

This project uses the Vite + React framework for development. Here's how you can make your contributions:

- Frontend: React.js
- Backend: Nodejs
- Styling: Tailwind CSS (or any CSS framework used in the project)

## Making Contributions

### 1. Create a new branch

Before starting any work, create a new branch off the main branch:

```bash
git checkout -b feature/your-feature-name
```

### 2. Make your changes

Write clean and modular code following our project structure and coding standards.

### 3. Commit your changes
Once you're satisfied with your changes, commit them:

```bash
git add .
git commit -m "Description of your feature or fix"
```

### 4. Push to your branch
Push the changes to your branch on your forked repository:

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request
Create a Pull Request (PR) to the main repository. Fill out the PR template with relevant details about your changes.

## Pull Request Guidelines

1. Ensure your branch is up to date with the main repository before making a PR:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

3. Once your branch is up to date, resolve any conflicts if they arise.

2. Test your changes before submitting a PR to make sure everything works as expected.

3. PRs should be small and focused. Avoid bundling multiple features or fixes into a single PR.

## Code of Conduct

By contributing to this project, you agree to follow our Code of Conduct.

We appreciate your help in making TechBastic better!
