const addToCart = (product) => {
  //   const product = JSON.parse(productstring || "{}");
  const currentCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
  const existingProduct = currentCart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    currentCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
};

const populateData = async () => {
  const productlist = document.getElementById("product-list");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const type = urlParams.get("type");
  let products = await fetch("./products.json");
  products = await products.json();
  const selectedProduct = products?.find((product) => product.id === type);
  const filteredProducts = selectedProduct?.products?.find(
    (product) => product.id === id
  );

  filteredProducts?.items?.forEach((product) => {
    productlist.innerHTML += `<div class="col-12 col-md-6 col-lg-3">
          <div class="product-card">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="img"
              class="product-image img-fluid"
            />
            <h5 class="mb-3">${product.name}</h5>
            <div class="d-flex align-items-center mb-3">
              <select class="form-select me-2">
                <option>black</option>
                <option>blue</option>
              </select>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="price">₹${product.price}</span>
              <button class="add-btn" onclick='addToCart(${JSON.stringify(
                product
              )})'>ADD</button>
            </div>
          </div>
        </div>`;
  });
};

populateData();
