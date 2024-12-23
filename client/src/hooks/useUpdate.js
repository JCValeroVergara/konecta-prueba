import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export const useUpdate = (path, token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const updateItem = async (id, data) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const updatedData = { ...data };

            if (updatedData.PASSWORD === '') {
                delete updatedData.PASSWORD;
            }

            const response = await fetch(`${API}/${path}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error en la actualización');
            }

            const result = await response.json();
            setSuccessMessage('Registro actualizado correctamente');
            return result;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateItem, loading, error, successMessage };
};
