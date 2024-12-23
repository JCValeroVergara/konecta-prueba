import { useContext, useState } from 'react';
import { ActionsButton, ActualizarUsuario, CrearUsuario, EliminarUsuario, ListaUsuarios } from '../../components';
import { AuthContext } from '../../context';


export const UsuariosLayout = () => {
    const { user } = useContext(AuthContext);
    const [showComponent, setShowComponent] = useState('');

    const components = {
        lista: <ListaUsuarios />,
        crear: <CrearUsuario />,
        actualizar: <ActualizarUsuario />,
        eliminar: <EliminarUsuario />,
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
