import { useContext, useState } from 'react';
import { ActionsButton, ActualizarEmpleado, CrearEmpleado, EliminarEmpleado, ListaEmpleados } from '../../components';
import { AuthContext } from '../../context';


export const EmpleadosLayout = () => {
    const { user } = useContext(AuthContext);
    const [showComponent, setShowComponent] = useState('');

    const components = {
        lista: <ListaEmpleados />,
        crear: <CrearEmpleado />,
        actualizar: <ActualizarEmpleado />,
        eliminar: <EliminarEmpleado />,
    };

    const buttonsToShow = user?.ROL === 'Empleado' ? ['lista'] : Object.keys(components);

    const handleClick = (component) => {
        setShowComponent(component);
    }

    return (
        <div>
            <div>
                {buttonsToShow.map((key) => (
                    <ActionsButton
                        key={key}
                        onClick={() => handleClick(key)}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                ))}
            </div>
            <div>
                {showComponent && components[showComponent]}
            </div>
        </div>
    );
};
