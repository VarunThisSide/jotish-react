# Jotish React App

A modern, highly interactive internal **Employee Management & Analytics** Dashboard built with **React 19, TypeScript, and Vite**. This application features advanced data visualization, holographic UI components, and a built-in ID photo capture system.

## Key Features
- **Secure Dark-Themed Login:** A sleek, glassmorphic login portal featuring Aceternity UI's background boxes and text-generation effects.
- **Interactive Analytics (Visuals):** Comprehensive data insights using Recharts and React Simple Maps.
- **Modern Employee Directory:** A responsive list view using Comet Cards with 3D hover effects to browse personnel.
- **Dynamic ID Capture:** An integrated camera module using react-webcam to snap and preview employee profile photos directly in the browser.
- **Premium UI/UX:** Powered by Aceternity UI, Framer Motion, and Tailwind CSS 4 for smooth animations, spotlight effects, and glowing interfaces.

## Technical Stack

- **Framework:** React 19 (Functional Components + Hooks).

- **Build Tool:** Vite.

- **Language:** TypeScript.

- **Styling:** Tailwind CSS 4, Framer Motion, Aceternity UI.

- **3D/Visuals:** Three.js, @react-three/fiber.

- **Routing:** React Router 7.

- **Data Fetching:** Axios.

## Installation & Setup

**1.Clone the repository:**

```bash
git clone [repository-url]
cd jotish-react-app
```

**2.Install dependencies:**

Due to the use of React 19, the project utilizes a specific .npmrc configuration to handle peer dependency legacy issues.

```bash
npm install
```

**3.Run the development server:**

```bash
npm run dev
```

**4.Build for production:**

```bash
npm run build
```
## Project Structure

- ``src/pages/``: Main application views (Login, List, Visuals, Details, PhotoResult).
- ``src/components/ui/``: Reusable high-end UI components like CardSpotlight, Meteors, and GlareCard.
- ``src/lib/``: Utility functions like cn for Tailwind class merging.

## Credentials

To access the dashboard, use the following test credentials on the login page:

- **Username:** testuser

- **Password:** Test123