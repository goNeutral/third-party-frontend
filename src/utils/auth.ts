import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
    async verifyGoogleToken(token: string) {
        const response = await axios.post(`${API_URL}/auth/verifyGoogleToken`, { token });
        return response.data;
    },

    async getCurrentUser() {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        return response.data;
    }
}