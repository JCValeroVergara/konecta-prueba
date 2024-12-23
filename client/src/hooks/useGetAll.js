import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;


export const useGetAll = (path, page, pageSize, searchParams, token) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    page,
                    pageSize,
                    ...searchParams
                }).toString();

                const response = await fetch(`${API}/${path}?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [path, page, pageSize, searchParams, token]);

    return { data, loading, error };
}