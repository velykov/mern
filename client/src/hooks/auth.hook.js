import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwt, uid) => {
        setToken(jwt)
        setUserId(uid)

        localStorage.setItem(storageName, JSON.stringify({
            userId: uid,
            token: jwt
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}