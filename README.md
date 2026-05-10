# Programming Principles in SpotifyClone

## 1. Separation of Concerns (SoC)

The project clearly separates frontend and backend logic into different directories:

- `/frontend` — client-side UI and React logic
- `/api` — backend and server-side functionality

This makes the project easier to maintain and scale because presentation logic is isolated from backend processing.

### Example
- Frontend structure:
  https://github.com/VladyslavKuzenko/SpotifyClone/tree/main/frontend

- Backend structure:
  https://github.com/VladyslavKuzenko/SpotifyClone/tree/main/api

---
## 2. Component-Based Architecture

The frontend is divided into reusable React components instead of placing all UI logic in a single file.

### Example
In `App.jsx`, different pages/components are imported and connected through routing:

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/App.jsx#L1-L17

This demonstrates modular architecture and component reuse.

---

## 3. Single Responsibility Principle (SRP)

Each component has a separate responsibility.

### Example
`MessageInputField.jsx` is responsible only for handling message input functionality.

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/components/chat-page/MessageInputField.jsx

`ChatList.jsx` is responsible for rendering chat lists.

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/components/chat-page/ChatList.jsx

This follows SRP because different UI concerns are split into different components.

---

## 4. Routing Isolation

The application centralizes routing configuration inside `App.jsx`.

### Example
Routes are defined in one place:

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/App.jsx#L22-L42

Advantages:
- easier navigation management;
- centralized application flow;
- easier scalability.

---

## 5. Readable Code Principle

The project uses meaningful component and directory names.

### Examples
- `PlayerPage`
- `UserProfile`
- `EditProfile`
- `MessageItem`
- `PrivateChatItem`

Example imports:

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/App.jsx#L1-L16

This improves readability and simplifies onboarding.

---

## 6. DRY (Don't Repeat Yourself)

The project reuses components instead of duplicating UI logic.

### Example
The application imports reusable page components into `App.jsx` instead of duplicating page rendering logic:

https://github.com/VladyslavKuzenko/SpotifyClone/blob/main/frontend/src/App.jsx#L1-L17

This reduces code duplication and simplifies maintenance.

---

## 7. Encapsulation

Each component encapsulates its own logic and UI implementation.

### Example
Chat-related functionality is isolated inside the `chat-page` component directory:

https://github.com/VladyslavKuzenko/SpotifyClone/tree/main/frontend/src/components/chat-page

This reduces coupling between modules.

---

## 8. Scalability Principle

The structure of the project supports future expansion because functionality is already grouped by feature.

### Example
Separate directories exist for:
- profile pages;
- chat pages;
- rating pages;
- player pages.

Component structure:

https://github.com/VladyslavKuzenko/SpotifyClone/tree/main/frontend/src/components

This architecture allows adding new features without major restructuring.
