import { baseRequest } from '../axios/axiosConfig';


export const registration = async (userObj) => {
    try {
        const { data: response, status } = await baseRequest.post('/auth/registration', { ...userObj });
        return {
            status,
            message: response
        }
    } catch (err) {
        console.log(err);

        if (err.response?.status === 422) {
            console.log(err.response.data);
            const arrErrors = err.response.data.split(',')[0]
            const firstError = [...arrErrors.split(':')];

            return firstError[firstError.length - 1];
        };
        console.log(err.response);
        return err.response?.data
    }
}


export const login = async (userObj) => {
    
    try {
        const { data: response, status } = await baseRequest.post('/auth/login', {...userObj} );
 
        return {
            status,
            message: response,
        }
    } catch (err) {
        console.log(err);
        if (err.response) {
            console.log(err.response);
            return err.response.data;
        }
    }
}

export const logout = async () => {
    try {
        const { data: response, status } = await baseRequest.get('/auth/logout');
        
        return {
            status,
            message: response
        }
    } catch (err) {
        console.log(err);
        if (err.response) {
            return err.response.data;
        }
    }
}

export const authenticate = async () => {
    try {
        const {data: response} = await baseRequest.get('/auth/authenticate');

        return response;
    } catch (err) {
        console.log(err.response.data);
      
        return null
    }
}