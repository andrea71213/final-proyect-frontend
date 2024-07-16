import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import ShoppingCartNav from "../ShoppingCartNav";

const Navbar = () => {
  const { setSearchByCategory, setSignOut, setCartProducts, setCount, signOut, account } = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Sign Out
  const getSignOutLocalStorage = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(getSignOutLocalStorage);
  const isUserSignOut = signOut || parsedSignOut;

  // Account
  const acc = localStorage.getItem('account');
  const parsedAcc = JSON.parse(acc);

  // Has an Account
  const noAccountInLocalStorage = parsedAcc ? Object.keys(parsedAcc).length === 0 : true;
  const noAccInLocalState = account ? Object.keys(account).length === 0 : true;
  const hasUserAnAccount = !noAccInLocalState || !noAccountInLocalStorage;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringifiedSignOut);
    setSignOut(true);
    setCartProducts([]);
    setCount(0);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <div className="relative">
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" onClick={toggleDropdown} className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isDropdownVisible} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <img className="w-9 h-9 rounded-full" src="/user-circle.png" alt="user photo" />
            </button>
        
            {isDropdownVisible && (
              <div className="absolute right-0 mt-48 w-48 p-3 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div className="px-2 py-2">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    <div>
                      {account.name ? <span>{account.name}</span> : <span>{parsedAcc?.name}</span>}
                    </div>
                  </span>
                  <span className="block text- text-gray-600 dark:text-gray-300">{parsedAcc?.email}</span>
                </div>

                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      to='/my-orders'
                      className={({ isActive }) => isActive ? activeStyle : undefined }>
                      Mis Órdenes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/my-account'
                      className={({ isActive }) => isActive ? activeStyle : undefined }>
                      Mi Cuenta
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/sign-in'
                      className={({ isActive }) => isActive ? activeStyle : undefined }
                      onClick={handleSignOut}
                    >
                      Salir
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) => isActive ? activeStyle : undefined }>
            Ingresar
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed gap-2 z-10 w-full py-4 px-8 text-sm font-light top-0 bg-white border-b border-gray-200 dark:bg-gray-900">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="font-bold text-lg">
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
            <img src="/logo.png" className="h-14" alt="Logo" />
          </NavLink>
        </div>
        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <button data-collapse-toggle="navbar-user" type="button" onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuVisible}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${isMenuVisible ? 'block' : 'hidden'}`}>
            <li>
              <NavLink
                to='/'
                onClick={() => setSearchByCategory()}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Todos los Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/clothes'
                onClick={() => setSearchByCategory('clothes')}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Prendas
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/electronics'
                onClick={() => setSearchByCategory('electronics')}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Tecnología
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/furnitures'
                onClick={() => setSearchByCategory('furniture')}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Hogar/Oficina
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/shoes'
                onClick={() => setSearchByCategory('shoes')}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Zapatos
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/others'
                onClick={() => setSearchByCategory('others')}
                className={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Otros
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Right */}
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex gap-1 items-center">
          <ShoppingCartNav />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;