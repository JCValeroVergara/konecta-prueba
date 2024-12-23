import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../context';
import { EmpleadosLayout } from './EmpleadosLayout';
import { ListaEmpleados, CrearEmpleado } from '../../components';

// Mock de los componentes
vi.mock('../../components', () => ({
    ActionsButton: ({ onClick, label }) => (
        <button onClick={onClick}>{label}</button>
    ),
    ListaEmpleados: () => <div>Lista de Empleados</div>,
    CrearEmpleado: () => <div>Crear Empleado</div>,
}));

describe('EmpleadosLayout Component', () => {
    const renderComponent = (user) => {
        return render(
            <AuthContext.Provider value={{ user }}>
                <EmpleadosLayout />
            </AuthContext.Provider>
        );
    };

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

    test('shows the ListaEmpleados component when clicking the list button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de lista
        fireEvent.click(screen.getByText('Lista'));

        // Verifica que el componente ListaEmpleados se muestra
        expect(screen.getByText('Lista de Empleados')).toBeInTheDocument();
    });

    test('shows the CrearEmpleado component when clicking the create button', () => {
        renderComponent({ ROL: 'Admin' });

        // Simula el clic en el botón de crear
        fireEvent.click(screen.getByText('Crear'));

        // Verifica que el componente CrearEmpleado se muestra
        expect(screen.getByText('Crear Empleado')).toBeInTheDocument();
    });
});
