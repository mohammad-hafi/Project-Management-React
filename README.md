# Project Manager

A React and TypeScript frontend for managing projects through a REST API.

This project was built to practice real-world React concepts including authentication, protected routing, API integration, CRUD operations, pagination, reusable components, form validation, error handling, and responsive design.

## Features

- User login with JWT authentication
- Protected routes for authenticated users
- Session-based token storage using `sessionStorage`
- Automatic JWT attachment using Axios interceptors
- Global handling of `401 Unauthorized` responses
- View paginated projects
- View individual project details
- Create projects
- Edit projects
- Delete projects
- Client-side form validation
- Loading, error, empty, and not-found states
- Responsive dashboard
- Reusable React components
- Custom 404 page

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- REST APIs
- JWT Authentication
- CSS

## Project Structure

```text
src/
├── api/
│   ├── apiClient.ts
│   ├── auth.api.ts
│   └── projects.api.ts
│
├── auth/
│   ├── AuthContext.tsx
│   └── tokenStorage.ts
│
├── components/
│   ├── Pagination.tsx
│   ├── ProjectCard.tsx
│   └── ProjectForm.tsx
│
├── layouts/
│   └── AppLayout.tsx
│
├── pages/
│   ├── LoginPage/
│   ├── ProjectsPage/
│   ├── ProjectDetailsPage/
│   └── NotFoundPage/
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── types/
│   ├── auth.ts
│   └── project.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## Authentication Flow

1. The user enters their email and password.
2. The application sends the credentials to the authentication endpoint.
3. The backend returns a JWT access token.
4. The access token is stored in `sessionStorage`.
5. `AuthContext` updates the application's authentication state.
6. Protected routes prevent unauthenticated users from accessing private pages.
7. An Axios request interceptor automatically attaches the JWT to authenticated requests.
8. If the API returns `401 Unauthorized`, the stored token is removed and the user is redirected to the login page.
9. Logout removes the token and updates the authentication state.

## Project Management

The application integrates with REST API endpoints to support:

- GET — Retrieve paginated projects
- GET by ID — Retrieve project details
- POST — Create a project
- PUT — Update a project
- DELETE — Delete a project

Pagination is controlled using React state. Changing the current page triggers a new API request to retrieve the corresponding projects.

## React Concepts Practiced

This project demonstrates practical use of:

- Functional components
- JSX
- Props
- Callback props
- `useState`
- `useEffect`
- `useContext`
- Context API
- Controlled forms
- Conditional rendering
- List rendering with `map`
- React Router
- `Link`
- `Navigate`
- `useNavigate`
- `useParams`
- `Outlet`
- Protected routes
- Nested layouts
- TypeScript interfaces
- Axios interceptors
- REST API integration
- Client-side validation
- Component extraction and reuse
- Responsive CSS

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-api-url/api
```

Replace the URL with the address of the backend API.

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

A compatible REST API must be running for authentication and project management operations to work.

## Security Notes

The access token is stored in `sessionStorage` for this project.

An Axios interceptor automatically attaches the token to authenticated API requests.

Client-side validation is used to improve user experience but does not replace server-side validation, authentication, or authorization.

## Purpose

The purpose of this project is to practice building a complete React frontend that communicates with a REST API while applying common frontend architecture and development patterns.

It focuses on understanding React state management, component communication, authentication, routing, API communication, reusable components, and application structure.
