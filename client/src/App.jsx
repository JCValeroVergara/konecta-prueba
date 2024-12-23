import { AuthProvider } from './context/Auth.Context';
import { AppRouter } from './router';


export function App() {
    
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}
