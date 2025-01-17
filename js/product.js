const handleProduct = (id, type) => {
  console.log(id, type);
  window.location.href = `productList.html?type=${type}&id=${encodeURIComponent(
    id
  )}`;
};

async function selectCategory(id) {
  //   const products = document.getElementById("products");
  let products = await fetch("./products.json");
  products = await products.json();
  const filteredProducts = products.find((product) => product.id === id);
  const categories = document.getElementsByClassName("category");
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id !== id) {
      categories[i].classList.remove("selected-category");
    }
  }
  const category = document.getElementById(id);
  category?.classList?.add("selected-category");

  const searchResultsBox = document.getElementById("search-results-box");
  searchResultsBox.classList.remove("d-none");
  const title = document.getElementById("searched-titles");
  console.log(filteredProducts);
  title.innerHTML = filteredProducts.name;

  const searchProductsBox = document.getElementById("searched-products");

  filteredProducts?.products.forEach((product) => {
    console.log(product.id);
    searchProductsBox.innerHTML += `<div class="swiper-slide mt-0" onclick="handleProduct('${encodeURIComponent(
      product.id
    )}', '${encodeURIComponent(filteredProducts.id)}')">
                <div class="product-card position-relative">
                  <div class="image-holder">
                    <img
                      src="${product.img}"
                      alt="product-item"
                      class="img-fluid"
                      style="height: 400px; width: 400px"
                    />
                  </div>
                  
                  <div
                    class="card-detail d-flex justify-content-between align-items-baseline pt-3"
                  >
                    <h3 class="card-title text-uppercase">
                      <a href="#">${product.name}</a>
                    </h3>
    
                  </div>
                </div>
              </div>`;
  });
}

const populateCategories = async () => {
  let products = await fetch("./products.json");
  products = await products.json();
  const categories = document.getElementById("category-container");
  products.forEach((product) => {
    categories.innerHTML += `<div class="me-4">
              <img
                src="https://www.reliancedigital.in/wp-content/uploads/2017/04/laptop_cover_banner.jpg"
                alt=""
                class="img-fluid rounded-circle category"
                style="min-width: 150px; height: 150px"
                onclick="selectCategory('${product.id}')"
                id="laptopAccessories"
              />
              <h5 class="text-center">${product.name}</h5>
            </div>`;
  });
};

populateCategories();
