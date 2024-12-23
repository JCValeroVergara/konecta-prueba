
const API = import.meta.env.VITE_BACKEND_URL;

export const loginFetch = async (user) => {
    try {
        const response = await fetch(`${API}/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error en la petición');
        }
    } catch (error) {
        console.error(error);
    }
}