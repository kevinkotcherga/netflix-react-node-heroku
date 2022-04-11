import axios from 'axios'
import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './register.scss'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const history = useHistory();

  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()

  const handleStart = () =>{
    setEmail(emailRef.current.value)
  }

  const handleFinish = async (e) => {
    e.preventDefault()
    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);
    try {
      await axios.post('https://netflix-node-react-kotcherga.herokuapp.com/auth/register', { email, username, password });
      history.push('https://netflix-node-react-kotcherga.herokuapp.com/login');
    } catch (err) {}
  }

  return (
    <div className='register'>
      <div className="top">
        <div className="wrapper">
          <img
            className='logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            />
          <Link to="/login">
            <button className="loginButton">Connexion</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Films, séries TV et bien plus en illimité.</h1>
        <h2>Où que vous soyez. Annulez à tout moment.</h2>
        <p>
          Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.
        </p>{
          !email ? (
            <div className="input">
              <input type="email" placeholder="addresse email" ref={emailRef}/>
              <button className="registerButton" onClick={handleStart}>Commencer</button>
            </div>
          ) : (
            <form className="input">
              <input type="username" placeholder="nom d'utilisateur" ref={usernameRef}/>
              <input type="password" placeholder="mot de passe" ref={passwordRef}/>
              <button className="registerButton" onClick={handleFinish}>Démarrer</button>
            </form>
          )}
      </div>
    </div>
  )
}
