# EcoStore Project Structure

This document outlines the refactored project structure with clear separation between frontend and backend.

## Directory Structure

```
EcoStore-Final/
│
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── dashboard/      # Dashboard-specific components
│   │   │   └── ui/             # shadcn-ui components
│   │   ├── pages/              # Page components/routes
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   ├── tsconfig.app.json        # TypeScript config for app
│   └── tsconfig.node.json      # TypeScript config for Node
│
├── backend/                     # Backend API (To be implemented)
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Custom middleware
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration files
│   │   └── index.ts            # Entry point
│   ├── tests/                  # Test files
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend documentation
│
├── package.json                 # Root workspace configuration
├── tsconfig.json                # Root TypeScript config
├── README.md                    # Main project documentation
└── .gitignore                   # Git ignore rules
```

## Key Changes

1. **Frontend Separation**: All React/Vite code moved to `frontend/` directory
2. **Backend Structure**: Created `backend/` directory with organized subdirectories
3. **Workspace Setup**: Root `package.json` configured as npm workspace
4. **Config Updates**: All configuration files updated to reflect new paths

## Next Steps

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development:
   ```bash
   npm run dev
   ```

3. Backend development can begin in the `backend/` directory when ready.

