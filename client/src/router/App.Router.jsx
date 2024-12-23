import { Routes, Route } from "react-router-dom";
import { LoginPage } from '../pages';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </>
    );
};
