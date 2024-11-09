async function selectCategory(id) {
  //   const products = document.getElementById("products");
  let products = await fetch("./products.json");
  products = await products.json();
  console.log(id);
  const filteredProducts = products.find((product) => product.id === id);
  const categories = document.getElementsByClassName("category");
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id !== id) {
      categories[i].classList.remove("selected-category");
    }
  }
  const category = document.getElementById(id);
  category.classList.add("selected-category");

  const searchResultsBox = document.getElementById("search-results-box");
  searchResultsBox.classList.remove("d-none");
  const title = document.getElementById("searched-titles");
  console.log(filteredProducts);
  title.innerHTML = filteredProducts.name;

  const searchProductsBox = document.getElementById("searched-products");

  filteredProducts?.products.forEach((product) => {
    searchProductsBox.innerHTML += `<div class="swiper-slide mt-0">
                <div class="product-card position-relative">
                  <div class="image-holder">
                    <img
                      src="${product.img}"
                      alt="product-item"
                      class="img-fluid"
                      style="height: 400px; width: 400px"
                    />
                  </div>
                  <div class="cart-concern position-absolute">
                    <div class="cart-button d-flex">
                      <a href="#" class="btn btn-medium btn-black"
                        >Add to Cart<svg class="cart-outline">
                          <use xlink:href="#cart-outline"></use></svg
                      ></a>
                    </div>
                  </div>
                  <div
                    class="card-detail d-flex justify-content-between align-items-baseline pt-3"
                  >
                    <h3 class="card-title text-uppercase">
                      <a href="#">${product.name}</a>
                    </h3>
                    <span class="item-price text-primary">Rs. ${product.price} only.</span>
                  </div>
                </div>
              </div>`;
  });
}
