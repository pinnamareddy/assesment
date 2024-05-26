import { useState } from 'react';
import '../src/App.css';

const Login =() =>{

  const [password, setPassword] = useState('');

    const handleSubmit = (event) =>{
        localStorage.setItem('LoginDetails', password);
    }
return(
    <>  <div className="login-container">
    <h1>Login</h1>
    <form  onSubmit={(event) => handleSubmit(event)}>
      <div className="Username-container">
      <label  >Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="input passw"
        required
      /></div>
      <div className="Password-container">
      <label >Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="input passw"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </div>
      <button style={{height:'36px',width:'296px', marginTop:'30px'}} type="submit">Login</button>
    </form>
  </div></>
)
}
export default Login