# GitHub Repository Search

## About The Project

The GitHub Repository Search application provides a user-friendly interface to search for GitHub repositories by username or organization name. It incorporates advanced filters to refine search results, making it easier for users to find the repositories they are interested in. This application is built using a modern tech stack that includes Yarn, Vite, React + TypeScript, and Zustand for state management.

### Technical Choices

- **Yarn**: Chosen for its fast, reliable, and secure dependency management.
- **Vite**: Utilized for its blazing-fast build times and out-of-the-box support for TypeScript and React, enhancing development experience.
- **React + TypeScript**: Provides a robust framework for building user interfaces with type safety, improving code reliability and maintainability.
- **Zustand**: A minimalistic state management solution that simplifies state management in React applications without the boilerplate.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Yarn or npm
  - Ensure Yarn is installed by running `yarn --version`. If not, install it following [Yarn's official documentation](https://classic.yarnpkg.com/en/docs/install/).
  - Alternatively, you can use npm, which comes with Node.js. If you prefer npm, ensure it's installed by running `npm --version`.

### Installation

1. **Clone the repository**:
  `git clone https://github.com/therealryanskinner/github_search.git`
2. **Install the dependencies**:
  `yarn` or `npm install`
3. **Run the application**:
  `yarn dev` or `npm run dev` and head over to `http://localhost:5173/`

### New feature ideas
1. Mobile responsiveness -> Make the mobile experience better with media queries
2. Account logins -> (requires backend) Allow users to create accounts and log in so they can bookmark repositories
3. Statistics -> Potentially display insights and statistics on the requested repositories (for instance the repo pulse)

### Steps I would do to make it deployable
1. Host using amazon s3 by setting up a public bucket that contains a built version of the app.
2. Add a step in github actions on merge to the master branch that builds the vite project and pushes the built version to that bucket. This all happens after tests and linting checks are run.
3. If I had a domain just update Route 53 for that domain to point to that bucket.
