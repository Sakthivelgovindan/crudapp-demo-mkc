function Home() {

  this.sendAjaxRequest = function (reqData) {
    let resData;

    ajaxCallObj.sendAjaxRequest(reqData, function (data) {
      resData = data;
    });

    return resData;
  };

  this.generateReadTable = function (response) {
    const { productList } = response;

    let tableContent;

    for (let x = 0; x < productList.length; x++) {
      tableContent += `
             <tr>
              <td>${x + 1}</td>
              <td>${productList[x].productName}</td>
              <td>${productList[x].productQuantity}</td>
              <td>${productList[x].productPrice}</td>
            </tr>`;
    }

    $("#readTable").html(tableContent);
  }

  this.generateUpdateTable = function (response) {
    const { productList } = response;
    let tableContent;

    for (let x = 0; x < productList.length; x++) {
      tableContent += `
             <tr>
              <td>${x + 1}</td>
              <td>${productList[x].productName}</td>
              <td>${productList[x].productQuantity}</td>
              <td>${productList[x].productPrice}</td>
              <td data-id=${productList[x].productId} class="editProduct">Edit</td>
            </tr>`;
    }

    $("#updateTable").html(tableContent);

  }

  this.generateDeleteTable = function (response) {
    const { productList } = response;

    let tableContent;

    for (let x = 0; x < productList.length; x++) {
      tableContent += `
             <tr>
              <td>${x + 1}</td>
              <td>${productList[x].productName}</td>
              <td>${productList[x].productQuantity}</td>
              <td>${productList[x].productPrice}</td>
               <td data-id=${productList[x].productId} class="deleteProduct">Delete</td>
            </tr>`;
    }

    $("#deleteTable").html(tableContent);
  }

  this.onload = function (dataObject) {

    const data = {
      url: "http://localhost:8000/get-product",
      type: "GET",
      dataObject: dataObject
    };

    const response = this.sendAjaxRequest(data);
    const { getStatus } = response;
    if (getStatus) {
      this.generateReadTable(response);
      this.generateUpdateTable(response);
      this.generateDeleteTable(response);
      $("#readResponse").html(JSON.stringify(response, null, 4));
    }
  }


  this.addProduct = function (dataObject) {
    const data = {
      url: "http://localhost:8000/add-product",
      type: "POST",
      dataObject: dataObject
    };

    const response = this.sendAjaxRequest(data);
    const { addStatus } = response;
    if (addStatus) {
      $("#productName").val('');
      $("#productQuantity").val('');
      $("#productPrice").val('');
      this.generateReadTable(response);
      this.generateUpdateTable(response);
      this.generateDeleteTable(response);
      $("#addResponse").html(JSON.stringify(response, null, 4));
    }
  }



  this.deleteProduct = function (dataObject) {
    const data = {
      url: "http://localhost:8000/delete-product",
      type: "DELETE",
      dataObject: dataObject
    };

    const response = this.sendAjaxRequest(data);
    const { deleteStatus } = response;
    if (deleteStatus) {
      this.generateReadTable(response);
      this.generateUpdateTable(response);
      this.generateDeleteTable(response);
      $("#deleteResponse").html(JSON.stringify(response, null, 4));
    }
  }
}

$(document).ready(function () {
  var home = new Home();
  home.onload({});

  $(document).on('click', '.editProduct', function () {
    const editId = $(this).data("id");
    $('#myModal').addClass('openModal');
    $('#myModal').removeClass('closeModal');
  });


  $(document).on('click', '.deleteProduct', function () {

    const productId = $(this).data("id");
    const data = {
      productId
    }
    $('#deleteRequestData').html(JSON.stringify(data, null, 4));
    home.deleteProduct(data);
  });


  $(document).on('click', '.close', function () {
    $('#myModal').addClass('closeModal');
    $('#myModal').removeClass('openModal');
  });

  $(document).on('click', '#addProduct', function () {
    const productName = $("#productName").val();
    const productQuantity = $("#productQuantity").val();
    const productPrice = $("#productPrice").val();

    if (productName) {
      const data = {
        productName, productQuantity, productPrice, addedBy: "user_2"
      }

      $('#addRequestData').html(JSON.stringify(data, null, 4));
      home.addProduct(data);
    }

  });
});


