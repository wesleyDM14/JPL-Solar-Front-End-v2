import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { BASE_URL } from './baseurl';

export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    axios.post(BASE_URL+'api/auth/login', credentials,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        const { data } = response;
        if (data.status === 'FAILED') {
            const { message } = data;
            if (message.includes('Incorrect') || message.includes('Please')) {
                setFieldError('login', message);
                setFieldError('password', message);
                setSubmitting(false);
            }
        }else if(data.status === 'SUCESS') {
            const userData = data.data;
            const token = userData.id;

            sessionService.saveSession(token).then(()=>{
                sessionService.saveUser(userData).then(()=>{
                    navigate('/dashboard');
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }
    }).catch(err => console.error(err));
}

export const logoutUser = (navigate) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        navigate('/');
    }
}