# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Initialized project with Next.js, Firebase, and ShadCN UI.
- Implemented basic email/password authentication UI and logic.
- Secured Firebase credentials using `.env.local` file.
- Implemented robust user creation in Firestore on first login to prevent race conditions.
- Added Firestore security rules to protect user data.
- Made the homepage dynamic to show different content for guests vs. logged-in users.

### Changed
- **Enhanced User Creation Logic to Prevent Race Conditions**:
  - **Problem**: When a user signs up (especially with a social provider like Google), a race condition can occur where the Firebase Authentication process completes before the corresponding user document is created in Firestore. This would leave the app in a state with an authenticated user who has no database record.
  - **Solution**: We implemented a robust pattern within `src/context/AuthContext.tsx` to solve this.
    1.  **Single Point of Truth**: The `onAuthStateChanged` listener is used as the sole entry point for handling user state changes, regardless of the sign-in method (email/password, Google, etc.).
    2.  **Extended Loading State**: The context's `loading` state is now tied to both the authentication check AND the Firestore document creation. It remains `true` until the entire process is complete.
    3.  **Synchronous Flow**: When a user signs in, the logic flow is:
        - `onAuthStateChanged` fires with a `user` object.
        - The `loading` state **remains `true`**.
        - An async function is called to create the user's document in Firestore using `setDoc(userDocRef, data, { merge: true })`. This operation is idempotent—it safely creates the document on the first login and does nothing on subsequent logins.
        - **Only after** the Firestore write is successful, the `user` state is set and the `loading` state is set to `false`.
    - **Result**: This guarantees that no other part of the app can access user information or render a logged-in state until the user's database record is confirmed to exist, completely eliminating the race condition.
