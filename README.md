# EcoStore - Multi-Location Retail Management Dashboard

A modern dashboard application for managing multiple retail store locations. Track sales, monitor employees, manage inventory, and view activity across all your stores.

## Project Structure

```
EcoStore-Final/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   └── lib/        # Utility functions
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # Backend API (to be implemented)
│   ├── src/          # Backend source code
│   └── package.json  # Backend dependencies
│
└── package.json      # Root workspace configuration
```

## Technologies

### Frontend
- **Vite** - Build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Recharts** - Data visualization

### Backend
- To be implemented

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dawa-sonam/EcoStore-Final.git
cd EcoStore-Final
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install frontend dependencies separately:
```bash
cd frontend
npm install
```

### Development

Start the frontend development server:
```bash
npm run dev
# or
npm run dev:frontend
```

The application will be available at `http://localhost:8080`

### Building

Build the frontend for production:
```bash
npm run build
# or
npm run build:frontend
```

## Features

- **Dashboard Overview**: View sales, locations, employees, and alerts at a glance
- **Location Management**: Track performance across multiple store locations
- **Sales Tracking**: Monitor daily sales and cash variance
- **Activity Feed**: Real-time activity updates from all locations
- **Responsive Design**: Works on desktop and mobile devices

## Project Organization

### Frontend (`/frontend`)
- All React components, pages, and UI logic
- Vite configuration and build setup
- Tailwind CSS styling configuration

### Backend (`/backend`)
- Future API endpoints for:
  - Store location management
  - Sales data and reporting
  - Employee management
  - Inventory tracking
  - Authentication and authorization

## Scripts

### Root Level
- `npm run dev` - Start frontend dev server
- `npm run build` - Build frontend for production
- `npm run lint` - Lint frontend code
- `npm run install:all` - Install all workspace dependencies

### Frontend (`/frontend`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC
