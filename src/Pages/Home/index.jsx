import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"

function Home() {
  const { items, setSearchByTitle, searchByTitle, searchByCategory, filteredItems } = useContext(ShoppingCartContext)

  const renderView = () => {
    if (searchByTitle?.length > 0 || searchByCategory?.length > 0) {
      if (filteredItems?.length > 0) {
        return (
          filteredItems?.map(item => (
            <Card key={item.id} data={item} />
          ))
        )
      } else {
        return (
          <div>No tenemos el articulo que buscas :(</div>
        )
      }
    } else {
      return (
        items?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    }
  }

  return (
    <>
      <input 
        type="text" 
        placeholder="Shoes, Keyboard, Mouse" 
        className='mb-4 p-4 rounded-lg border border-black'
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail/>
    </>
  )
}

export default Home
