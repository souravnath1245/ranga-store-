//=======================Click Handler of search button 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//=======================show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //============== I got a problem here
    const image = product.image;
    const allProducts = document.getElementById("all-products");
    allProducts.classList.add("gap-3");
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product card-design">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class='product-title my-4'>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p class='fs-3 fw-bolder'><span class='icons'><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span> ${product.rating.rate}</p>
      <p class='fs-4 '><span class='title'>Rating Count : </span><span class='fw-bolder'>${product.rating.count} </span></p>
      <h4><span class='title'>Price : </span><span class='fw-bolder'> $ ${product.price}</span></h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick='details(${product.id})' class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  //Update Product Price 
  updatePrice("price", price);
  // Tex Amount Call
  updateTaxAndCharge();
  // Total amount call
  updateTotal("total", price);
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  //---------------- I got a problem
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function   -For tax;
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(Math.round(value));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted >= 200 && priceConverted < 400) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted >= 400 && priceConverted < 500) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted >= 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// grandTotal update function
const updateTotal = (id) => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById(id).innerText = grandTotal.toFixed(2);
};

// Product Detail Information 
const details = (id) => {
  // Using Fatch API
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => detailInformation(data));
};
// Designing Card For Product Details:
const detailInformation = (data) => {
  const details = document.getElementById("details");
  const div = document.createElement("div");
  details.textContent = " ";
  div.innerHTML = `
  <div class="card text-center rounded">
  <img class='w-75 h-50 mx-auto' src="${data.image}" class="card-img-top" alt="...">
  <h5 class="card-header">Product Details</h5>
  <div class="card-body">
    <h3 class="card-title mb-3"> ${data.title}</h3>
    <p class="card-text">${data.description}</p>
    <h5 class='text-danger'><b>Price :</b> $ ${data.price}</h5>

    <a href="#" class="btn btn-primary">Add to Cart</a>
  </div>
</div>
  `;
  details.appendChild(div);
};
