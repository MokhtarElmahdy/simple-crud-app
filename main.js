// variables
let form = document.getElementById("form");
let open = document.querySelector(".open");
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCat = document.getElementById('productCat');
let productDesc = document.getElementById('productDesc');
let btnAdd = document.getElementById('btnAdd');
let btnCancel = document.getElementById('btnCancel');
let btnCancelUpdate = document.getElementById('btnCancelUpdate');
let btnOpen = document.getElementById('btnOpen');
let btnUpdate = document.getElementById('btnUpdate');
let btnUpdateProduct = document.getElementById('btnUpdateProduct');
let btnDelete = document.getElementById('btnDelete');
let tableRow = document.getElementById("tableRow");
let productList ;
let maxFormHeight = form.clientHeight;
let maxOpenHeight = open.clientHeight;

// default styles
btnCancelUpdate.style.display = 'none';
btnUpdateProduct.style.display = 'none';
open.style.display = 'none';
form.style.overflow = 'hidden';
form.style.display = 'block';
// Events
btnCancel.addEventListener('click',function(){
    let h = maxFormHeight;
    let slideDown = setInterval(() => {
        form.style.height = `${h--}px`;
        if(h == 0){
            form.style.display = 'none';
            open.style.display = 'block';
            clearInterval(slideDown);
        }
    }, 1);
    
});
btnOpen.addEventListener('click',function(){
    let h = 0;
    form.style.display = 'block';
    open.style.display = 'none';
    let slidup = setInterval(() => {
        form.style.height = `${h++}px`;
        if(h == (maxFormHeight + 30)){           
            clearInterval(slidup);
        }
    }, 1);
});
btnAdd.addEventListener('click',function(){
    addProduct();
});
btnCancelUpdate.onclick = function(){
    btnCancelUpdate.style.display = 'none';
    btnAdd.style.display = 'inline-block';
    btnUpdateProduct.style.display = 'none';
    clear();
}
// check product list
if (localStorage.getItem('productList') == null){
    productList = []
}else{
    productList = JSON.parse(localStorage.getItem('productList'));
}

// CRUD Functions
showItems();
function addProduct(){
        let productObj = {
            pName:productName.value.trim(),
            pPrice:productPrice.value.trim(),
            pCat:productCat.value.trim(),
            pDesc:productDesc.value.trim()
        };
        productList.push(productObj);
        localStorage.setItem('productList', JSON.stringify(productList));
        clear();
        showItems();
}
function delProduct(index){
    productList.splice(index,1);
    localStorage.setItem('productList', JSON.stringify(productList));
    showItems();
}
function changeValues(index){
    productName.value = productList[index].pName;
    productPrice.value = productList[index].pPrice;
    productCat.value = productList[index].pCat;
    productDesc.value = productList[index].pDesc;
}
function updateProduct(index){
    changeValues(index);
    btnCancelUpdate.style.display = 'inline-block';
    btnUpdateProduct.style.display = 'inline-block';
    btnAdd.style.display = 'none';
    update(index);
    
}
function update(index){
    btnUpdateProduct.onclick = function(){
        productList[index].pName = productName.value.trim();
        productList[index].pPrice = productPrice.value.trim();
        productList[index].pCat = productCat.value.trim();
        productList[index].pDesc = productDesc.value.trim();
        localStorage.setItem('productList', JSON.stringify(productList));
        showItems();
        clear();
    }

}
function showItems(){
    let box =  ``;
    for(let i = 0; i < productList.length;i++){
        box+= `
        <tr>
        <td>${i+1}</td>
        <td>${productList[i].pName}</td>
        <td>${productList[i].pPrice}</td>
        <td>${productList[i].pCat}</td>
        <td>${productList[i].pDesc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="delProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
        `;
    }
    tableRow.innerHTML = box;
}
function clear(){
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}
