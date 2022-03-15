var area = document.querySelector(".table-content");
var addBasketButton = document.querySelector(".add-basket");
var deleteBasketButton = document.querySelector(".delete-basket");
var productid = document.getElementById("productid");
var quantity = document.getElementById("quantity");

var counter = 1;

addBasketButton.addEventListener("click", function () {
  const html = `<div class="table-row">
                    <div class="table-data">${counter}</div>
                    <div class="table-data">${productid.value}</div>
                    <div class="table-data">${quantity.value}</div>
                </div>`;
  area.insertAdjacentHTML("afterbegin", html);
  area.insertAdjacentHTML(
    "afterbegin",
    ` <input type="hidden" name="PartID" id="PartID" value="${productid.value}">
        <input type="hidden" name="Quantity" id="Quantity" value="${quantity.value}">`
  );

  counter++;
  productid.value = "";
  quantity.value = "";
});

deleteBasketButton.addEventListener("click", function () {
  counter = 1;
  area.innerHTML = "";
});
