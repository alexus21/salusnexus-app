export async function validateAuth() {
    const API_URL = process.env.VUE_APP_API_URL;
    try {
        const response = await fetch(`${API_URL}/api/validate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const data = await response.json();
        if (data.status === 401) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error fetching API:', error);
        return false;
    }
}

