import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function AddProduct() {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate()

  const formSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:9000/products", {
      title,
      price,
      description
    })
    .then((data) => {
      console.log(data);
      navigate('/products');
    });

    // fetch version
    // fetch("http://localhost:9000/products", {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "Application/json",
    //   },
    //   body: JSON.stringify({
    //     // title: title,
    //     // price: price
    //     // same as
    //     title,
    //     price,
    //     description
    //   })
    // })
    // .then((res) => res.json())
    // .then((data) => {console.log(data);
    // })
  }

  return (
    <>
      <h1>Add Product</h1>

      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="productTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
            placeholder="Product Title"
            aria-describedby="Product title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description
          </label>
          <input
            type="textarea"
            className="form-control"
            id="productDescription"
            placeholder="Product Description"
            aria-describedby="Product Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="Product Price"
            aria-describedby="Product Price"
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddProduct;
