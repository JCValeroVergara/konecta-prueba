import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export const useDelete = (path, token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const deleteItem = async (id) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`${API}/${path}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error en la eliminación');
            }

            setSuccessMessage('Empleado eliminado correctamente');
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false);
        }
    };

    return { deleteItem, loading, error, successMessage };
};
