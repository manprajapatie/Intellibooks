import { useMemo, useCallback } from "react";
import { useAuth } from "@clerk/react";
import axios from "axios";

const useApi = () => {
    const { getToken } = useAuth();

    const api = useMemo(() => {
        return axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
    }, []);

    const apiRequest = useCallback(
        async (config) => {
            // Get the current user's Clerk session token
            const token = await getToken();

            // Send the token with the API request
            return api({
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        [api, getToken]
    );

    return { apiRequest };
};

export default useApi;