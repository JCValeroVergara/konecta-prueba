import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../context';
import { UsuariosLayout } from './UsuariosLayout';
import { ListaUsuarios, CrearUsuario } from '../../components';

// Mock de los componentes
vi.mock('../../components', () => ({
    ActionsButton: ({ onClick, label }) => (
        <button onClick={onClick}>{label}</button>
    ),
    ListaUsuarios: () => <div>Lista de Usuarios</div>,
    CrearUsuario: () => <div>Crear Usuario</div>,
}));

describe('UsuariosLayout Component', () => {
    const renderComponent = (user) => {
        return render(
            <AuthContext.Provider value={{ user }}>
                <UsuariosLayout />
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders the component correctly', () => {
        renderComponent({ ROL: 'Admin' });

        // Verifica que los botones se renderizan
        expect(screen.getByText('Lista')).toBeInTheDocument();
        expect(screen.getByText('Crear')).toBeInTheDocument();
    });

    test('shows only the list button for "Empleado" role', () => {
        renderComponent({ ROL: 'Empleado' });

        // Verifica que solo el botón de lista se renderiza
        expect(screen.getByText('Lista')).toBeInTheDocument();
        expect(screen.queryByText('Crear')).not.toBeInTheDocument();
    });

    test('shows the ListaUsuarios component when clicking the list button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de lista
        fireEvent.click(screen.getByText('Lista'));

        // Verifica que el componente ListaUsuarios se muestra
        expect(screen.getByText('Lista de Usuarios')).toBeInTheDocument();
    });

    test('shows the CrearUsuario component when clicking the create button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de crear
        fireEvent.click(screen.getByText('Crear'));

        // Verifica que el componente CrearUsuario se muestra
        expect(screen.getByText('Crear Usuario')).toBeInTheDocument();
    });
});
