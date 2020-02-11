import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const message = useMessage();

    useEffect(() => {
        message(error)
        // clearError()
    }, [message, error, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            console.error(e)
        }
    }

    const loginHandler = async () => {
        try {
            const res = await request('/api/auth/login', 'POST', {...form})
            auth.login(res.token, res.userId)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={'row'}>
            <div className={'col s6 offset-s3'}>
                <h1>Сократи ссылку</h1>
                <div className={'card blue darken-1'}>
                    <div className={' card-content white-text'}>
                        <span className={'card-title'}>
                            Авторизация
                        </span>
                        <div>
                            <div className={'input-field'}>
                                <input
                                    placeholder={'Введите email'}
                                    id={'email'}
                                    name={'email'}
                                    type={'text'}
                                    className={'yellow-input'}
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor={'email'}>Email</label>
                            </div>
                            <div className={'input-field'}>
                                <input
                                    placeholder={'Введите пароль'}
                                    id={'password'}
                                    name={'password'}
                                    type={'password'}
                                    className={'yellow-input'}
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor={'password'}>Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className={'card-action'}>
                        <button
                            className={'btn yellow darken-4'}
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className={'btn grey lighten-1 black-text'}
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}