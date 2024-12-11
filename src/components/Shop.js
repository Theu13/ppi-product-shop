import { useContext, useEffect, useRef, useState } from "react";
import Product from "./Product";
import { CircularProgress } from "@mui/material";
import { CartContext } from "../context/CartContext";
import Modal from "./Modal.js";

import styles from "./Shop.module.css"
import Cart from "./Cart";
import ProductModal from "./ProductModal";

export default function Shop() {

    const { products, loading, error } = useContext(CartContext);

    const searchInput = useRef("");
    const [filteredItems, setFilteredItems] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null);

    const modalRef = useRef();
    
    const openModal = (product) => { 
        setSelectedProduct(product); 
        modalRef.current.open();

    }

    useEffect(() => {
        if (products) {
            setFilteredItems(products)
        }
    }, [products]);

    function handleSearch() {
        const term = searchInput.current.value.toLowerCase();
        setFilteredItems(
            products.filter((item) => item.title.toLowerCase().includes(term))
        );
    }

    function clearSearch() {
        searchInput.current.value = "";
        setFilteredItems(products);
    }




    return (
        <section id="shop">

            <Modal ref={modalRef}>
                {selectedProduct && (
                    <ProductModal
                        id={selectedProduct.id}
                        thumbnail={selectedProduct.thumbnail}
                        title={selectedProduct.title}
                        price={selectedProduct.price}
                        description={selectedProduct.description}
                    />
                )}
            </Modal>
            <h2>Melhor Mercadinho Delivery da Região!</h2>

            <div className="search-container">
                <div className="search-box">
                    <input
                        ref={searchInput}
                        className="search-input"
                        type="text"
                        placeholder="Type to search..."
                        onChange={handleSearch}
                    />
                    <button className="clear-button " onClick={clearSearch}>CLEAR</button>
                </div>
            </div>

            <ul id="products">
                {error && <p>{error}</p>}
                {loading &&
                    <div id="loading">
                        <CircularProgress size="10rem" color="inherit" />
                        <p>Loading products.........</p>
                    </div>}
                {!loading && !error && filteredItems.length > 0 ? (
                    filteredItems.map((product) => (<li key={product.id}>
                        <Product {...product} openModal={openModal} />
                    </li>))

                ) : (

                    <p>Not found!</p>


                )}


            </ul>

        </section>
    );
}