import { createContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";

const AuthContext = createContext({
    token: false,
    userId: false,
    register: (username, password) => { },
    login: (username, password) => { },
    logout: () => { },
});

export function AuthContextProvider(props) {
    //state to store token and userId
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(false)

    //useNavigate to redirect after register/login/logout
    const navigate = useNavigate()

    //function to handle registration of new user
    async function handleRegister(username, password) {
        try {
            const response = await axios({
                method: "post",
                url: "/users/register",
                data: JSON.stringify({
                    username,
                    password
                }),
                headers: { "Content-type": "application/json" }
            });
            setToken(response.data.token)
            setUserId(response.data.userId)
            localStorage.setItem("userData", JSON.stringify({ userId: response.data.userId, token: response.data.token }))
            navigate("/", { replace: true })
        } catch (err) {
            alert(err.response.data)
        }
    }

    //function to login of existing user
    async function handleLogin(username, password) {
        try {
            const response = await axios({
                method: "post",
                url: "/users/login",
                data: JSON.stringify({
                    username,
                    password
                }),
                headers: { "Content-type": "application/json" }
            });
            console.log(response)
            setToken(response.data.token)
            setUserId(response.data.userId)
            localStorage.setItem("userData", JSON.stringify({ userId: response.data.userId, token: response.data.token }))
            navigate("/", { replace: true })
        } catch (err) {
            alert(err.response.data)
        }
    }

    //function to logout
    async function handleLogout() {
        setToken(null)
        setUserId(null)
        localStorage.removeItem("userData")
    }

    //context to be provided to children
    const context = {
        token,
        userId,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}

export default AuthContext