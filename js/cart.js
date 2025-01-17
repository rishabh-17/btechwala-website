const populateCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    let totalPrice = 0;
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <div class="d-flex align-items-center justify-content-between border-bottom py-3">
  <div class="d-flex align-items-center">
    <img
      src="${
        item.image || "https://cdn-icons-png.flaticon.com/512/3081/3081840.png"
      }"
      alt="${item.name}"
      width="50"
      height="50"
      class="rounded-circle me-3 cart-item-image"
    />
    <span class="cart-item-name fw-bold">${item.name}</span>
  </div>

  <span class="cart-item-price fw-semibold text-success">
    $${item.price.toFixed(2)}
  </span>

  <div class="cart-item-quantity d-flex align-items-center">
    <button
      class="btn btn-outline-secondary btn-sm me-2"
      onclick="updateQuantity('${item.id}', -1)"
    >
      -
    </button>
    <span class="fw-bold mx-2">${item.quantity}</span>
    <button
      class="btn btn-outline-secondary btn-sm me-3"
      onclick="updateQuantity('${item.id}', 1)"
    >
      +
    </button>
    <button
      class="btn btn-outline-danger btn-sm"
      onclick="removeFromCart('${item.id}')"
    >
      X
    </button>
  </div>
</div>

            `;
      cartList.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });
    document.getElementById("total-price").innerHTML = totalPrice;
    // document.getElementById("buy-now").style.display = "block";
  }
};

const updateQuantity = (id, delta) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const index = cart.findIndex((item) => item.id === id);
    if (index >= 0) {
      const item = cart[index];
      item.quantity += delta;
      if (item.quantity < 1) {
        cart.splice(index, 1);
      } else {
        cart[index] = item;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      populateCart();
    }
  }
};

const removeFromCart = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const index = cart.findIndex((item) => item.id === id);
    if (index >= 0) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      populateCart();
    }
  }
};

populateCart();

const checkout = () => {
  let text = "";
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cart.forEach((item) => {
      text += `${item.name} x ${item.quantity}%0A`;
    });
  }
  const url = `https://api.whatsapp.com/send?phone=+918770739976&text=${text}`;
  window.open(url, "_blank");
};
