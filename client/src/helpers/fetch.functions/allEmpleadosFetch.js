
const API = import.meta.env.VITE_BACKEND_URL;

export const allEmpleadosFetch = async (token, page = 0, pageSize =0) => {
    try {
        const response = await fetch(`${API}/empleados/?page=${page}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
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