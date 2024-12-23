import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export const useCreate = (path, token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const createItem = async (data) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch(`${API}/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }

            const result = await response.json(); 
            setSuccessMessage('Registro creado correctamente');
            return result; 
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false);
        }
    };

    return { createItem, loading, error, successMessage };
};
