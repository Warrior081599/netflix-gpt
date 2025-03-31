# Netflix Clone

A full-featured Netflix clone built with React, Redux, and Firebase, featuring AI-powered movie recommendations through Google's Gemini AI.

## Live Demo

Check out the live application: [Netflix Clone with Gemini AI](https://azad-net-flix-gemini-ai-tmdb-project.netlify.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

## Features

### Authentication

- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with Firebase
- **Form Validation**: Client-side validation for all form inputs
- **Protected Routes**: Secure routes that require authentication
- **Authentication Persistence**: Stay logged in across sessions

### Browse Experience

- **Dynamic Hero Banner**: Featuring a different movie on each visit
- **AutoPlay Trailers**: Background video trailers for featured content
- **Multi-Category Browsing**: Organized content sections including:
  - Now Playing
  - Popular Movies
  - Top Rated Movies
  - Upcoming Movies
  - TV Shows (Airing Today, Popular, Top Rated)
- **Dedicated Trailer Page**: Full-screen trailer viewing experience

### AI Movie Recommendations

- **AI-Powered Search**: Movie recommendations using Google's Gemini AI
- **Natural Language Queries**: Ask for movies in natural language
- **Multi-Language Support**: Search in multiple languages including:
  - English
  - Hindi
  - Spanish

### Responsive Design

- **Mobile-First Approach**: Optimized for all device sizes
- **Tablet & Desktop Support**: Responsive UI adapts to all screen sizes
- **Custom UI Components**: Hand-crafted components for optimal user experience

## Tech Stack

### Frontend

- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework

### Backend & Services

- **Firebase**: Authentication and user management
- **TMDB API**: Movie and TV show data
- **Google Gemini AI**: AI-powered movie recommendations

### Development Tools

- **Vite**: Fast, modern build tool
- **ESLint**: Code quality and consistency
- **Git**: Version control

## Demo

Visit the live application: [Netflix Clone with Gemini AI](https://azad-net-flix-gemini-ai-tmdb-project.netlify.app/)

## Installation

1. **Clone the repository**

```bash
git clone https://your-repository-url.git
cd netflix-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```
VITE_TMDB_KEY=your_tmdb_api_key
VITE_GEMINI_KEY=your_gemini_ai_key

# Firebase configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

## Project Structure

```
netflix-clone/
├── public/               # Public assets
├── src/
│   ├── components/       # UI components
│   │   ├── Browse.jsx    # Main browse page
│   │   ├── GptSearch.jsx # AI recommendation component
│   │   ├── Header.jsx    # Navigation header
│   │   ├── Login.jsx     # Authentication page
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   ├── useMovieTrailer.js
│   │   ├── useNowPlayingMovies.js
│   │   └── ...
│   ├── store/            # Redux store setup
│   │   ├── appStore.js
│   │   ├── userSlice.js
│   │   ├── movieSlice.js
│   │   └── ...
│   ├── utils/            # Utility functions and constants
│   │   ├── constants.js
│   │   ├── firebase.js
│   │   ├── validate.js
│   │   └── ...
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── ...
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Key Components

### Authentication Flow

The application uses Firebase Authentication for user management:

- **Login.jsx**: Handles user sign-in and registration
- **Header.jsx**: Contains authentication state and logout functionality

```jsx
// Example authentication code from Login.jsx
const handleButtonClick = () => {
  // Form validation
  const errorInForm = validateData(email.current.value, password.current.value);

  // Firebase authentication
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // User signed in
    })
    .catch((error) => {
      setFormError(error.code + "-" + error.message);
    });
};
```

### Browse Experience

The main browsing experience is composed of several components:

- **Browse.jsx**: Container for the browsing experience
- **MainContainer.jsx**: Hero section with featured content
- **SecondaryContainer.jsx**: Multiple movie lists by category

```jsx
// Example from Browse.jsx
return (
  <div>
    <Header />
    {!gptSearchValue && (
      <>
        <MainContainer />
        <SecondaryContainer />
      </>
    )}
    {gptSearchValue && <GptSearch />}
  </div>
);
```

### Movie Data Fetching

Custom hooks handle API interactions for movie data:

- **useNowPlayingMovies.js**: Fetches currently playing movies
- **useTopRatedMovies.js**: Fetches top-rated content
- **useMovieTrailer.js**: Fetches trailer videos

```jsx
// Example from useNowPlayingMovies.js
export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?",
        NOW_PLAYING_OPTIONS
      );
      const data = await result.json();
      dispatch(addNowPlayingMovies(data.results));
    };

    fetchMovies();
  }, []);
};
```

### AI Recommendations

The AI search feature leverages Google's Gemini API:

- **GptSearch.jsx**: Container for the AI search experience
- **GptSearchBar.jsx**: Input field for natural language queries
- **GptMovieSuggestion.jsx**: Displays AI-recommended movies

```jsx
// Example from GptSearchBar.jsx
const handleGptClick = async () => {
  if (inputRef.current?.value) {
    const movieDataFromGemini = await getMovieSuggestionGemini(
      inputRef.current.value
    );
    const movieDataFromGeminiArray = movieDataFromGemini.split(",");

    const tmdbPromise = movieDataFromGeminiArray.map((movie) =>
      SearchTmdbMovie(movie)
    );
    const tmdbResult = await Promise.all(tmdbPromise);

    dispatch(
      setMoviesByGeminiAndTmdbSearch({
        moviesNamesByGemini: movieDataFromGeminiArray,
        moviesNamesByTmdbSearch: tmdbResult,
      })
    );
  }
};
```

## Authentication

The application uses Firebase Authentication to handle user management:

1. **User Registration**:

   - Email and password validation
   - Profile creation with displayName
   - Secure storage in Firebase

2. **User Login**:

   - Email and password authentication
   - Error handling for invalid credentials
   - Automatic redirection to browse page

3. **Authentication State**:
   - Persistent auth state with `onAuthStateChanged`
   - Protected routes requiring authentication
   - Automatic session management

## API Integration

### TMDB API

The application integrates with The Movie Database (TMDB) API to fetch movie and TV show data:

```javascript
// Example API call structure
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

const fetchData = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/endpoint",
    options
  );
  const data = await response.json();
  // Process data
};
```

### Google Gemini AI

For AI-powered movie recommendations, the application integrates with Google's Gemini API:

```javascript
// Example Gemini API integration
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const getRecommendations = async (query) => {
  const prompt = `Act as a movie recommendation system and suggest movies for the query: ${query}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return await response.text();
};
```

## State Management

The application uses Redux Toolkit for state management, organized into multiple slices:

1. **userSlice.js**: Manages authentication state

   - User details
   - Authentication status

2. **movieSlice.js**: Manages movie data

   - Now playing movies
   - Popular movies
   - Trailer videos
   - TV show categories

3. **gptSlice.js**: Manages AI search functionality

   - Search visibility
   - AI recommendations
   - Loading states

4. **configSlice.js**: Manages application configuration
   - Language preferences

## Environment Variables

The application requires the following environment variables:

```
VITE_TMDB_KEY=your_tmdb_api_key
VITE_GEMINI_KEY=your_gemini_ai_key

# Firebase configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Future Enhancements

Potential improvements and additional features:

- **User Profiles**: Multiple profiles per account
- **Watchlist**: Save movies to watch later
- **Improved Recommendations**: Enhanced AI algorithms
- **Content Filtering**: Age-appropriate content filtering
- **Progressive Web App**: Offline capabilities
- **User Ratings**: Allow users to rate movies
- **Social Features**: Share recommendations with friends
