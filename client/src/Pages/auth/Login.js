import React, { useRef, useContext } from "react"
import AuthContext from "../../store/auth-context"
import "./Login.css"

export default function Login() {
    //apply ref to username and password
    const usernameRef = useRef()
    const passwordRef = useRef()

    //consume auth context
    const authCtx = useContext(AuthContext)

    //function to login an existing user
    async function login(evt) {
        evt.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        authCtx.login(username, password)
        usernameRef.current.value = ""
        passwordRef.current.value = ""
    }

    return (
        <div className="row justify-content-center Login">
            <div className="col-10 col-lg-6">
                <form onSubmit={login}>
                    <h3 className="text-center">Login</h3>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input ref={usernameRef} type="text" className="form-control" id="username" aria-describedby="emailHelp" autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary px-4">Login</button>
                </form>
            </div>
        </div>
    )
}