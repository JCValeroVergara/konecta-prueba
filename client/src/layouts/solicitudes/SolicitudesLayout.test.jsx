import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../../context';
import { SolicitudesLayout } from './SolicitudesLayout';
import { ListaSolicitudes, CrearSolicitud } from '../../components';

// Mock de los componentes
vi.mock('../../components', () => ({
    ActionsButton: ({ onClick, label }) => (
        <button onClick={onClick}>{label}</button>
    ),
    ListaSolicitudes: () => <div>Lista de Solicitudes</div>,
    CrearSolicitud: () => <div>Crear Solicitud</div>,
}));

describe('SolicitudesLayout Component', () => {
    const renderComponent = (user) => {
        return render(
            <AuthContext.Provider value={{ user }}>
                <SolicitudesLayout />
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

    test('shows the ListaSolicitudes component when clicking the list button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de lista
        fireEvent.click(screen.getByText('Lista'));

        // Verifica que el componente ListaSolicitudes se muestra
        expect(screen.getByText('Lista de Solicitudes')).toBeInTheDocument();
    });

    test('shows the CrearSolicitud component when clicking the create button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de crear
        fireEvent.click(screen.getByText('Crear'));

        // Verifica que el componente CrearSolicitud se muestra
        expect(screen.getByText('Crear Solicitud')).toBeInTheDocument();
    });
});
