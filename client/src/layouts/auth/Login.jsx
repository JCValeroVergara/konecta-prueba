import { useContext } from 'react';
import { loginFetch } from '../../helpers';
import { useForm } from '../../hooks';
import { AuthContext } from '../../context/Auth.Context';

export const Login = () => {
    const { login } = useContext( AuthContext );

    const { formState, onInputChange, onResetForm } = useForm({
        EMAIL: '',
        PASSWORD: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await loginFetch(formState);
        
        if (data) {
            login(data.token, data.user);
            sessionStorage.setItem('token', data.token);
        }

        onResetForm();
    }


    return (
        <div className='w-1/2 mx-auto mt-10 flex flex-col items-center'>
            <h1 className='text-5xl text-blue-700'>Login</h1>
            <hr />
            <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='EMAIL'
                    placeholder='Email'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.EMAIL}
                    onChange={onInputChange}
                />
                <input
                    type='password'
                    name='PASSWORD'
                    placeholder='Password'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.PASSWORD}
                    onChange={onInputChange}
                />
                <button
                    type='submit'
                    className='bg-blue-700 text-white rounded-md p-2 mt-2'
                >
                    Login
                </button>
            </form>
        </div>
    );
};
