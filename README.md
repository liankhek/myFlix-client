# myFlix Client

This is the **myFlix** client-side application, built using **React** and bundled with **Parcel**. It is part of the full-stack **myFlix** web application, which allows users to browse movies, view details, and manage a personal list of favorite films.

## Features

- **View Movies**: Browse a list of movies with details like title, director, genre, and description.
- **User Authentication**: Log in and sign up to access personalized features.
- **Favorite Movies**: Add and remove movies from your list of favorites.
- **Responsive Design**: The application is fully responsive and works on various screen sizes.
  
## Technologies Used

- **React** - UI library
- **Parcel** - Bundler and build tool
- **SCSS** - Styling
- **React Router** - For navigation between views
- **Axios** - For making API requests
- **REST API** - Backend API integration

## Installation

To run this project locally, follow these steps:

1. Navigate to the project directory:
    ```bash
    cd myFlix-client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The app should now be running at `http://localhost:1234`.

## Build for Production

To create a production build, run the following command:

```bash
npm run build

# File Structure
myFlix-client
│   .gitignore
│   package.json
└───src
    │   index.html
    │   index.scss
    │   index.jsx
