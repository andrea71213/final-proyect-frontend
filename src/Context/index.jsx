/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';

export const ShoppingCartContext = createContext();

export const InitializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account');
  const signOutInLocalStorage = localStorage.getItem('sign-out');
  let parsedAccount;
  let parsedSignOut;

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false));
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
};

export const ShoppingCartProvider = ({ children }) => {
  // My account
  const [account, setAccount] = useState({});

  // Sign out
  const [signOut, setSignOut] = useState(false);

  // Shopping Cart - counter
  const [count, setCount] = useState(0);

  // Shopping Cart - Add Products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart - Delete Products
  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter(product => product.id !== id);
    setCount(count - 1);
    setCartProducts(filteredProducts);
  };

  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  // Modal Cart - Checkout side menu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Modal Product Details
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Show Products (Product Details)
  const [productToShow, setProductToShow] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  // GET Products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  const modifyProductData = (data) => {
    const productModifications = {
      351: { 
        title: 'Casaca Print Orgánica', 
        price: 40, 
        images: ["https://i.pinimg.com/564x/d3/53/a9/d353a9c81470604c9f3d0201ce1acdcd.jpg"]
      },
      352: { 
        title: 'Benie de Lana Tejido', 
        price: 12, 
        images: ["https://i.pinimg.com/564x/cc/d7/7b/ccd77be27eaf990f9a51ba9101ccf947.jpg"]
      },
      353: { 
        title: 'Medias Algodon Puro', 
        price: 8, 
        images: ["https://i.pinimg.com/564x/70/1f/29/701f297ccd8fa6157a38e47efcff61ac.jpg"]
      },
      355: { 
        title: 'Abrigo de Lana', 
        price: 40, 
        images: ["https://i.pinimg.com/564x/c6/d8/ad/c6d8adaa13a1d2aaba3ed3763b129010.jpg"]
      },
      356: { 
        title: 'Chompa Corte V Algodon Puro', 
        price: 35, 
        images: ["https://i.pinimg.com/564x/99/ec/97/99ec9799e6b32c735d4e4cb84d962df5.jpg"]
      },
      357: { 
        title: 'Abrigo Lana Pura', 
        price: 45, 
        images: ["https://i.pinimg.com/564x/a1/c7/f9/a1c7f99d87fbb5db7972085f26324cd5.jpg"]
      },
      358: { 
        title: 'Pañuelo/Bandana Multiusos de Seda', 
        price: 30, 
        images: ["https://i.pinimg.com/564x/61/98/5d/61985d3ef231aa9dcb181ced9bdc7721.jpg"],
        category: 4
      },
      359: { 
        title: 'Sueter Oversize Organico', 
        price: 30, 
        images: ["https://i.pinimg.com/564x/09/ca/b3/09cab336b65e5796ba598f5278b98fd3.jpg"],
        category: 4
      },
      360: { 
        title: 'Casaca Diesel Vintage', 
        price: 45, 
        images: ["https://i.pinimg.com/736x/d5/ca/ad/d5caadd90bf6cf3052caebdafefb88cf.jpg"],
        category: 4
      },
      361: { 
        title: 'Cardigan de Lana Pura', 
        price: 35, 
        images: ["https://i.pinimg.com/564x/27/32/f9/2732f9e063328e5ec703ba4f2e150d53.jpg"],
        category: 4
      },
      362: { 
        title: 'Cardigan de Lana Pura', 
        price: 35, 
        images: ["https://i.pinimg.com/564x/36/68/06/36680621d040b31539fbd05eaf4eabd6.jpg"],
        category: 4
      },
      363: { 
        title: 'Cardigan Afelpado de Lana Pura', 
        price: 30, 
        images: ["https://i.pinimg.com/564x/bf/dd/0d/bfdd0d5e261fbe0708d87eb7037c31b4.jpg"],
        category: 4
      },
      364: { 
        title: 'Sueter Off Shoulder de Algodon', 
        price: 30, 
        images: ["https://i.pinimg.com/564x/2d/67/56/2d6756fee222b8ded5e999f025b360e0.jpg"],
        category: 4
      },
      365: { 
        title: 'Sueter Afelpado Off Shoulder de Algodon', 
        price: 35, 
        images: ["https://i.pinimg.com/736x/3d/bb/db/3dbbdbc435da4025d5f9fb0b3959aae6.jpg"],
        category: 4
      },
      366: { 
        title: 'Casaca Vintage', 
        price: 40, 
        images: ["https://i.pinimg.com/564x/d1/a2/4b/d1a24b08228b6e016f8c503cc3969f36.jpg"],
        category: 4
      },
      367: { 
        title: 'Top Print Natural', 
        price: 30, 
        images: ["https://i.pinimg.com/564x/87/f9/13/87f913da6e917acde8fa54482096fd0e.jpg"],
        category: 4
      },
      368: { 
        title: 'Polo Vintage', 
        price: 30, 
        images: ["https://i.pinimg.com/736x/12/cd/a7/12cda7c36f3787d125cf4311a2558e10.jpg"],
        category: 4
      },
      369: { 
        title: 'Sueter Cuello V de Algodon', 
        price: 40, 
        images: ["https://i.pinimg.com/474x/8b/cc/6a/8bcc6af5190c7a355953a5a09706839a.jpg"],
        category: 4
      },
      373: { 
        title: 'Polera Organica', 
        price: 40, 
        images: ["https://i.pinimg.com/564x/26/38/ed/2638ed6a8f1efed6d6d52871c8342557.jpg"],
        category: 4
      },
    };

    return data.map(product => {
      if (productModifications[product.id]) {
        return { ...product, ...productModifications[product.id] };
      }
      return product;
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}`)
      .then(response => response.json())
      .then(data => {
        const modifiedData = modifyProductData(data);
        setItems(modifiedData);
      });
  }, []);

  useEffect(() => {
    if (searchByTitle && searchByCategory) {
      setFilteredItems(items.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()) && item.category.id === searchByCategory.id));
    } else if (searchByTitle) {
      setFilteredItems(items.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase())));
    } else if (searchByCategory) {
      setFilteredItems(items.filter(item => item.category.id === searchByCategory.id));
    } else {
      setFilteredItems(items);
    }
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      cartProducts,
      setCartProducts,
      isProductDetailOpen,
      openProductDetail,
      closeProductDetail,
      productToShow,
      setProductToShow,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      setFilteredItems,
      searchByCategory,
      setSearchByCategory,
      order,
      setOrder,
      handleDelete,
      account,
      setAccount,
      signOut,
      setSignOut,
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
