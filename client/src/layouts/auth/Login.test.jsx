import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../../context/Auth.Context';
import { Login } from './Login';
import { loginFetch } from '../../helpers';

// Mock del loginFetch
vi.mock('../../helpers', () => ({
    loginFetch: vi.fn(),
}));

describe('Login Component', () => {
    const mockLogin = vi.fn();

    const renderComponent = () => {
        return render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <Login />
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders login form', () => {
        renderComponent();
        
        // Verifica que los elementos del formulario se renderizan correctamente
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('submits the form with correct data', async () => {
        loginFetch.mockResolvedValueOnce({ token: 'fakeToken', user: { name: 'Test User' } });
        
        renderComponent();

        // Simula la entrada en los campos del formulario
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        // Simula el envío del formulario
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Espera a que la función loginFetch sea llamada
        await waitFor(() => {
            expect(loginFetch).toHaveBeenCalledWith({ EMAIL: 'test@example.com', PASSWORD: 'password123' });
        });

        // Verifica que la función login fue llamada con los datos correctos
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('fakeToken', { name: 'Test User' });
        });
    });

    test('resets form after submission', async () => {
        loginFetch.mockResolvedValueOnce({ token: 'fakeToken', user: { name: 'Test User' } });
        
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Espera a que los campos del formulario se hayan reseteado
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Email').value).toBe('');
            expect(screen.getByPlaceholderText('Password').value).toBe('');
        });
    });
});
