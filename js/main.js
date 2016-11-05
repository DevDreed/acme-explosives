"use strict";

$(document).ready(function() {
  console.log("jquery is ready");
  var categories = [];
  var types = [];
  var products = [];
  var categoriesSelect = $("#categories-select");

  function getCategories() {
    return new Promise((resolve, reject) => {
      $.ajax({url: "../json/categories.json"}).done((data) => {
        resolve(data);
      }).fail((xhr, status, error) => {
        reject(error);
      });
    });
  }

  function getTypes() {
    return new Promise((resolve, reject) => {
      $.ajax({url: "../json/types.json"}).done((data) => {
        resolve(data);
      }).fail((xhr, status, error) => {
        reject(error);
      });
    });
  }

  function getProducts() {
    return new Promise((resolve, reject) => {
      $.ajax({url: "../json/products.json"}).done((data) => {
        resolve(data);
      }).fail((xhr, status, error) => {
        reject(error);
      });
    });
  }

  function loadCategories(categories) {
    let finalHTML = categories.map((category)=>{
      return `<option value=${category.id}>${category.name}</option>`;
    }).join("");
    console.log(finalHTML);
    categoriesSelect.html(finalHTML);
  }

  getCategories().then((data) => {
    categories = data.categories;
    loadCategories(categories);
    return getTypes();
  }).then((data) => {
    types = data.types;
    console.log('types',types);
    return getProducts();
  }).then((data) => {
    products = data.products;
    console.log('products',products);
  });


  $('#categories-select').change(function(){
    const selectedCategoryId = $('#categories-select option:selected').val();
    const selectedType = types.find((type) => {
      return type.category === Number(selectedCategoryId);
    });
    const selectedCategory = categories.find((category) => {
      return category.id === Number(selectedCategoryId);
    });
    displayProducts(selectedType, selectedCategory);
  });

  function displayProducts(selectedType, selectedCategory) {

    let selectedProducts = products.filter((product)=>{
      console.log('product', product);
      return product.type === Number(selectedType.id);
    });

    let finalHTML = selectedProducts.map((product)=>{
      return `<div class="col-xs-4 product">
                <div>Type: ${selectedType.name}</div>
                <div>${selectedCategory.name}</div>
                <div>${product.name}</div>
                <div>${product.description}</div>
              </div>`;
    }).join('');
    $('#product-list').html('');
    $('#product-list').append(finalHTML);
  }

});
