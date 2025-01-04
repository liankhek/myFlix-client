
const API_URL = 'https://da-flix-1a4fa4a29dcc.herokuapp.com';

// Fetch all movies
export const fetchMovies = async (token) => {
    const response = await fetch(`${API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
};

// Fetch specific movie details
export const fetchMovieDetails = async (movieId, token) => {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return response.json();
};

// Fetch favorite movies for a user
export const fetchFavoriteMovies = async (username, token) => {
    const response = await fetch(`${API_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch favorite movies');
    return response.json();
};

// Toggle favorite status of a movie
export const updateFavoriteMovie = async (username, movieId, token, add) => {
    const method = add ? 'POST' : 'DELETE';
    const response = await fetch(`${API_URL}/users/${username}/movies/${movieId}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error('Failed to update favorite status');
    return response.ok;
};

// Update user details
export const updateUserProfile = async (username, token, updateData) => {
    const response = await fetch(`${API_URL}/users/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile.');
    }
    return response.json();
};

// Delete a user account
export const deleteUser = async (username, token) => {
    const response = await fetch(`${API_URL}/users/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account.');
    }
    return true; // Indicate successful deletion
};
