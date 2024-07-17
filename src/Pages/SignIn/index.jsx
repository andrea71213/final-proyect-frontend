import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import './signin.css';

function SignIn() {
  const { account, setSignOut, setAccount } = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const form = useRef(null);
  const navigate = useNavigate();

  // Acc
  const acc = localStorage.getItem('account');
  const parsedAcc = JSON.parse(acc);
  // Has an Acc
  const noAccountInLocalStorage = parsedAcc ? Object.keys(parsedAcc).length === 0 : true;
  const noAccInLocalState = account ? Object.keys(account).length === 0 : true;
  const hasUserAnAccount = !noAccInLocalState || !noAccountInLocalStorage;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    setSignOut(false);
    navigate('/');
  };

  const createAccount = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    setAccount(data);
    handleSignIn();
  };

  const renderLogIn = () => (
    <div className='flex flex-col w-80'>
      <p>
        <span className='font-light text-sm'>Tu correo: </span>
        <span>{parsedAcc?.email}</span>
      </p>
      <p>
        <span className='font-light text-sm'>Contraseña: </span>
        <span>{parsedAcc?.password}</span>
      </p>
      <button className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2" disabled={!hasUserAnAccount} onClick={handleSignIn}>
        Ingreso
      </button>
      <div className='text-center'>
        <a className='font-light text-xs underline underline-offset-4' href='/'>Olvidé mi contraseña</a>
      </div>
      <button className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3' disabled={hasUserAnAccount} onClick={() => setView('create-user-info')}>
        Regístrate
      </button>
    </div>
  );

  const renderCreateUserInfo = () => (
    <form ref={form} className='flex flex-col gap-4 w-80' onSubmit={createAccount}>
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className='font-light text-sm'>Tu nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={parsedAcc?.name}
          placeholder="Raul"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-light text-sm">Tu correo:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={parsedAcc?.email}
          placeholder="raul@example.com"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-light text-sm">Tu contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={parsedAcc?.password}
          placeholder="********"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <button type="submit" className="bg-black text-white w-full rounded-lg py-3">
        Crear Usuario
      </button>
    </form>
  );

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn();

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1 className='font-medium text-xl text-center mb-6 w-80'>Bienvenido</h1>
        {renderView()}
      </div>
    </div>
  );
}

export default SignIn;
