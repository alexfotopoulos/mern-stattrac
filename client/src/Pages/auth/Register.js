import React, { useRef, useContext } from "react"
import AuthContext from "../../store/auth-context"
import "./Register.css"

export default function Register() {
    //apply ref to username and password
    const usernameRef = useRef()
    const passwordRef = useRef()

    //consume auth context
    const authCtx = useContext(AuthContext)

    //function to register a new user
    async function register(evt) {
        evt.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        authCtx.register(username, password)
        usernameRef.current.value = ""
        passwordRef.current.value = ""
    }

    return (
        <div className="row justify-content-center Register">
            <div className="col-10 col-lg-6">
                <form onSubmit={register}>
                    <h3 className="text-center">Register</h3>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input ref={usernameRef} type="text" className="form-control" id="username" aria-describedby="emailHelp" autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    )
}