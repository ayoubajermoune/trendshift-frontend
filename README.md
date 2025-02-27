# TrendShift Frontend

React-based frontend for TrendShift social platform.

## Features

- Modern UI with Material-UI
- Responsive Design
- User Authentication
- Admin Dashboard
- Post & Comment Management
- Real-time Interactions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create .env file:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PRODUCTION_API_URL=your_production_api_url
```

3. Run the application:
```bash
# Development
npm start

# Build for production
npm run build
```

## Pages

- Home (/) - Public feed
- Login (/login)
- Register (/register)
- Dashboard (/dashboard) - Admin only

## Technologies

- React.js
- Material-UI
- React Router
- Axios
- Context API for state management
