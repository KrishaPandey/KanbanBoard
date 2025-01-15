#Technology Choices and Rationale

React: Chosen as the core JavaScript framework for building the UI due to ease of component-based architecture, and state management features.

React Hooks: Used for state management (useState, useEffect) to make the components functional .

CSS : For simplicity, I've used plain CSS  for styling. 

LocalStorage: Used for persistence of columns and tasks. This way, users' data is saved between page reloads.

#Known Limitations/Trade-offs

No Backend: Data persistence is only local (using localStorage), meaning data is not shared between users, nor can it be accessed from different devices. 

Limited Features: The app currently only allows dragging tasks between columns and basic task management (adding, deleting). More advanced features like task due dates, priority, and collaboration features are not implemented yet.

#Future Improvements

Backend Integration: Add a backend (using Node.js, Express, and MongoDB) to persist tasks across users and devices.

Drag-and-Drop Enhancement: Enhance drag-and-drop functionality with more features, such as drag between multiple boards or columns.


