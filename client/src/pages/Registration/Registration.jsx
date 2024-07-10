import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { registrationValidationParameters } from '../../utils/constants';
import { registration } from '../../services/authService';

import { LogoIcon } from '../../components/Icons/LogoIcon/LogoIcon';

import './Registration.css';
import { Input } from '../../components/Authenticate/Input';

export const Registration = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        gender: "",
    });
    const [errStack, setErrockStack] = useState([]);
    const [logoColor, setLogoColor] = useState('#fff');

    const navigate = useNavigate();

    useEffect(() => {
        if (logoColor === "green") setErrockStack([]);

    }, [logoColor]);

    console.log(errStack);
    const validateEmailHandler = (value) => {
        if (!registrationValidationParameters.email.regex.test(value)) {
            setErrockStack([...errStack, "Email is not valid!"]);
            return setLogoColor('#cc0000');
        };

        return setLogoColor('green');
    }

    const validatePhoneHandler = (value) => {
        if(!registrationValidationParameters.phone.regex.test(value)) {
            setErrockStack([...errStack, "Phone is not valid"]);
            return setLogoColor('#cc0000');
        }

        return setLogoColor('green');
    }

    const validatePasswordHandler = (name, value) => {
        const isValidLength = value.length >= registrationValidationParameters.password.minLength;
        if (name === "repeatedPassword") {
            if (
                userInfo.password !== value ||
                !isValidLength
            ) {
                setErrockStack([...errStack, !isValidLength ? `Password length must be ${registrationValidationParameters.password.minLength}!` : "Passwords dont match!"]);
                return setLogoColor('#cc0000')
            };
        }

        if (!isValidLength) {
            setErrockStack([...errStack, !isValidLength ? `Password length must be ${registrationValidationParameters[name]?.minLength}!` : "Passwords dont match!"]);
            return setLogoColor('#cc0000')
        };

        return setLogoColor('green');
    }

    const validateFieldsHandler = (name, value) => {
        if (value.length < registrationValidationParameters[name]?.minLength && name !== "repeatedPassword") {
            setErrockStack([...errStack, `${name} length must be at least ${registrationValidationParameters[name]?.minLength}!`]);
            return setLogoColor('#cc0000')

        }
        return setLogoColor('green');
    }

    const validateFormHandler = (targetInput) => {
        const { name, value } = targetInput;
      
        if (name === "email") return validateEmailHandler(value);
        if (name === "phone") return validatePhoneHandler(value);
        if (name === "password" || name === "repeatedPassword") return validatePasswordHandler(name, value);
        if (name !== "password" && name !== "repeatedPassword" && name !== "email") return validateFieldsHandler(name, value);

        return setLogoColor('green');
    }

    const setUserInfoHandleChange = (e) => {
        const { name, value } = e.target;

        validateFormHandler(e.target);
        if (name !== "repeatedPassword") setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registration(userInfo);
            if (response?.status === 201) navigate('/login');

            setErrockStack([...errStack, response]);
            setLogoColor('#cc0000');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="registration-container">
            <form className="registration">
                <div className="registration-header">
                    <LogoIcon className='logo' logoColor={logoColor} />
                </div>
                <div className="registration-fields">

                    <div className='group'>
                        <Input
                            className={'field'}
                            name={'firstName'}
                            text={'First name'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                        />

                        <Input
                            className={'field'}
                            name={'lastName'}
                            text={'Last name'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                        />
                    </div>


                    <Input
                        className={'field'}
                        name={'username'}
                        text={'Username'}
                        setUserInfoHandleChange={setUserInfoHandleChange}
                    />

                    <Input
                        className={'field'}
                        name={'email'}
                        text={'Email'}
                        setUserInfoHandleChange={setUserInfoHandleChange}
                    />

                    <Input
                        className={'field'}
                        name={'phone'}

                        text={'Phone'}
                        setUserInfoHandleChange={setUserInfoHandleChange}
                    />

                    <div className="group">
                        <Input
                            className={'field'}
                            name={'password'}
                            type={'password'}
                            text={'Password'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                        />

                        <Input
                            className={'field'}
                            name={'repeatedPassword'}
                            type={'password'}
                            text={'Repeat password'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                        />
                    </div>

                    <div className='gender-group'>

                        <Input
                            className={'gender-field'}
                            name={'gender'}
                            type={'radio'}
                            text={'Male'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                            value={'Male'}
                        />

                        <Input
                            className={'gender-field'}
                            name={'gender'}
                            type={'radio'}
                            text={'Female'}
                            setUserInfoHandleChange={setUserInfoHandleChange}
                            value={'Female'}
                        />
                    </div>

                </div>

                <div className="registration-submit">
                    <button type='submit' onClick={handleSubmit} disabled={logoColor === 'green' ? false : true}>Submit</button>
                    <span>Already have acccount? <Link style={{ textDecorationColor: '' }} to='/login'>Login</Link></span>
                    <span className='registration-submitt__error'>{errStack.length > 0 && errStack[errStack.length - 1]}</span>
                </div>
            </form>
        </div>
    )
}
