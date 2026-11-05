# Concentrix Game-Changers Portal

Welcome to the **Concentrix Game-Changers Portal**! This application is designed to celebrate and recognize top performers who drive personal connection, digital transformation, and AI intelligence across the organization.

## Features

- **Hall of Fame**: A gallery celebrating top performers categorized by core pillars:
  - Human-Centered
  - Tech-Powered
  - Intelligence-Fueled
- **Spotlight Showcase**: In-depth features on inspiring Game-Changers.
- **Recognition Feed**: Live appreciation and notes from across the organization.
- **HR Administration Console**: A management dashboard to add, edit, and manage the roster of awardees.
- **Recognition Wall**: An interactive wall where peers can leave notes and messages for awardees.

## Technologies Used

- HTML5
- CSS3 (Custom styling with Inter font)
- JavaScript (Vanilla)

## Getting Started

This project now includes a shared server-side data layer so awardees can be viewed by multiple users from different browsers/devices when the app is served from the same local or hosted environment.

### Run the app

```bash
npm install
npm start
```

If port 3000 is already occupied, the app will automatically retry on the next available port and print the new URL in the terminal.

Then open the URL shown in the terminal, usually:

```text
http://localhost:3000
```

If 3000 is busy, it may switch to:

```text
http://localhost:3001
```

### Alternative quick local launch

```bash
start index.html
```

This still works for a quick demo, but the shared data and admin login flow are powered by the backend server.

## Administration

The HR Administration Console is protected by a passcode.
- **Default Passcode**: `6100`

Once logged in, administrators can manage the roster, update entries, and reset portal data.

## Structure

- `index.html`: Main application markup and views.
- `styles.css`: Styling for the portal including layouts, components, modals, and responsive design.
- `app.js`: Application logic handling dynamic rendering, filtering, state management, and user interactions.
