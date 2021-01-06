import React, { useState } from "react"
import { Link } from "react-router-dom"
// import "./Auth.css"

export const Register = (props) => {
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const bio = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()
    // const profile_photo = React.createRef()
    const birthday = React.createRef()

    // State for image upload
    const [base64, setBase64] = useState(null)

    const getBase64 = (file, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(file)
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            // console.log("Base64 of file is", base64ImageString)
            setBase64(base64ImageString)
        })
    }


    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_photo": base64,
                "birthday": birthday.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("dreamcatcher_user_id", res.token)
                       
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="container my-3" style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal my-3">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Short Bio: </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let other users know a little bit about you..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="image">Profile Photo</label>
                        <input onChange={createImageString} type="file" name="image" className="form-control" />
                </fieldset>
                <fieldset>
                    <label htmlFor="birthday"> Birthday </label>
                    <textarea ref={birthday} name="birthday" className="form-control" placeholder="YYYY-MM-DD" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-primary icon-send my-3" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register mb-5">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
