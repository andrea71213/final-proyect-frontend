import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import Banner from "../../Components/Banner/banner";  // Importar el componente de Banner

function Home() {
  const { items, setSearchByTitle, searchByTitle, searchByCategory, filteredItems } = useContext(ShoppingCartContext);

  const renderView = () => {
    if (searchByTitle?.length > 0 || searchByCategory?.length > 0) {
      if (filteredItems?.length > 0) {
        return (
          filteredItems?.map(item => (
            <Card key={item.id} data={item} />
          ))
        );
      } else {
        return (
          <div>No tenemos el articulo que buscas :(</div>
        );
      }
    } else {
      return (
        items?.map(item => (
          <Card key={item.id} data={item} />
        ))
      );
    }
  };

  return (
    <>
        <Banner /> {/* Agregar el componente de Banner */}
      <div className="flex items-center gap-3 pb-3">
          <img src="/search.svg" alt="buscar" className="h-7 mb-4" />
        <input 
          type="text" 
          placeholder="Buscar" 
          className='mb-4 p-2 rounded-lg border border-black mt-0'
          onChange={(event) => setSearchByTitle(event.target.value)} />
        
      </div>
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg ">
          {renderView()}
        </div>
        <div>
         <ProductDetail /> 
        </div>
        
    </>
  );
}

export default Home;
