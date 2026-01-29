# Startup Benefits Platform

A full‑stack web application that allows startups to discover, view, and claim exclusive partner deals (cloud credits, SaaS discounts, financial perks, etc.). The platform includes secure authentication, protected deal access, and a scalable frontend–backend architecture.

---

## 1. End‑to‑End Application Flow

1. **User visits the application (Frontend – Next.js)**

   * Landing / Deals page loads
   * Public users can see deal cards but cannot claim deals

2. **User Registration**

   * User fills in name, email, and password
   * Frontend validates input (React Hook Form + Zod)
   * Request sent to backend: `POST /api/auth/register`
   * Backend hashes password and stores user in MongoDB

3. **User Login**

   * User logs in with email and password
   * Backend verifies credentials and issues a JWT
   * Frontend stores JWT and user data in `localStorage`

4. **Authenticated Experience**

   * User can view deal details
   * User can claim deals
   * Claimed deals are reflected in UI

5. **Deal Claiming**

   * Authenticated request sent to backend
   * Backend validates JWT and updates database
   * Frontend updates local state for immediate feedback

---

## 2. Authentication and Authorization Strategy

### Authentication

* JSON Web Tokens (JWT) are used for authentication
* Passwords are hashed using **bcrypt** before storage
* Token is generated on login and stored on the client

### Authorization

* Protected backend routes use JWT middleware
* Only authenticated users can:

  * View deal details
  * Claim deals

### Client‑Side Protection

* Auth state is managed using React Context (`AuthContext`)
* Routes and actions are conditionally rendered based on auth state

---

## 3. Internal Flow of Claiming a Deal

1. User clicks **Claim / View Deal**
2. Frontend checks authentication status
3. Frontend sends request with JWT token
4. Backend middleware validates JWT
5. Backend:

   * Verifies deal existence
   * Adds deal ID to user’s `claims` array
6. Backend responds with success
7. Frontend updates local user state

---

## 4. Interaction Between Frontend and Backend

### Frontend

* Built with **Next.js (App Router)**
* Uses `fetch` API to communicate with backend
* Manages auth state with React Context
* UI built using Tailwind CSS and Framer Motion

### Backend

* Built with **Node.js + Express**
* REST APIs for:

  * Authentication
  * Deals
  * Claims
* MongoDB used as the database (via Mongoose)

### Communication

* JSON over HTTP
* JWT passed in `Authorization` header

---

## 5. Known Limitations / Weak Points

* JWT stored in `localStorage` (vulnerable to XSS)
* No refresh token mechanism
* No email verification
* No role‑based access control (admin/user)
* No rate limiting on auth endpoints
* No centralized error logging

---

## 6. Improvements Required for Production Readiness

* Move JWT to HTTP‑only cookies
* Add refresh token flow
* Implement email verification
* Add password reset functionality
* Introduce role‑based access (Admin panel)
* Add rate limiting and request validation
* Add environment‑based configs (dev / prod)
* Add CI/CD pipeline

---

## 7. UI and Performance Considerations

### UI

* Responsive design using Tailwind CSS
* Smooth animations using Framer Motion
* Clear loading and error states

### Performance

* Lightweight API responses
* Optimized frontend rendering
* External images handled safely
* Can be improved further with caching and SSR optimizations

---

## Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT, bcrypt

---

## Project Status

✅ Core functionality implemented
✅ Authentication & authorization working
✅ Full frontend–backend integration complete

---

## Author

**Abhishek Singh**

---

This project demonstrates a complete real‑world full‑stack application with secure authentication, database integration, and a scalable architecture.
