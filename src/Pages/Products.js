import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:9000/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data));
  };

  const deleteProduct = (product) => {
    Swal.fire({
      title: `Are You Sure To Delete : ${product.title} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`http://localhost:9000/products/${product.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => getAllProducts());
      }
    });
  };

  return (
    <>
      <h1>Products Page</h1>

      <Link to={"/products/add"} className="btn btn-success mt-3">
        Add New Product
      </Link>

      <table className="table table-striped mt-5 products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description.slice(0, 20)}...</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteProduct(product);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-info btn-sm"
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/products/edit/${product.id}`}
                    
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Products;
