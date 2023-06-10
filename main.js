let pName=document.getElementById('productName');
let pPrice=document.getElementById('productPrice');
let pTaxes=document.getElementById('productTaxes');
let pAds=document.getElementById('productAds');
let pDisc=document.getElementById('productDiscount');
let pTotal=document.getElementById('productTotal');
let pCount=document.getElementById('productCount');
let pCat=document.getElementById('productCategory');
let pDesc=document.getElementById('productDescription');
let toty=document.getElementById("toty");
let btnSearch=document.getElementById('btnSearch');
let btnSearch2=document.getElementById('btnSearch2');
let searchInput=document.getElementById('search');


let Index=0;
let productsContainer=[];

function totalPrice() {
    if (pPrice.value!="") {
    let fPrice=Number(pPrice.value)+Number(pAds.value)
    -Number(pDisc.value)
    +(Number(pTaxes.value)*Number(pPrice.value));
    pTotal.innerHTML=fPrice;
    toty.style.background="#040"
} else {
    pTotal.innerHTML='';
    
}

console.log(pTotal.innerHTML)

}




if(localStorage.getItem('CRUDS-data')!=null){
    productsContainer=JSON.parse(localStorage.getItem('CRUDS-data'));
    displayProducts();  
}

function addProducts(){

    if(validateTaxes()==true){
        let product={
            productName:pName.value,
            price:pPrice.value,
            taxes:pTaxes.value,
            ads:pAds.value,
            discount:pDisc.value,
            category:pCat.value,
            description:pDesc.value,
            total:pTotal.innerHTML
        }
    
console.log(pTaxes)    
    
        if (Number(pCount.value)===0) {
            productsContainer.push(product);
        } else {
            for (let i = 0; i < Number(pCount.value); i++) {
                productsContainer.push(product)
                
            }
        }
    
    
        localStorage.setItem('CRUDS-data',JSON.stringify(productsContainer));
        console.log(productsContainer);
        
        displayProducts();
        clearForm();
    }else{
        alert('product taxes must be positive Rational Numbers (.1-.99)')
    }



   
}


function displayProducts(){
    let cartoona=``;
    for (let i = 0; i < productsContainer.length; i++) {
     
        cartoona+=`                    <tr>
        <td> ${i+1} </td>
        <td>${productsContainer[i].productName}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].ads}</td>
        <td>${productsContainer[i].discount}</td>
        <td>${productsContainer[i].total}</td>
        <td>${productsContainer[i].category}</td>
        <td> ${productsContainer[i].description}</td>
        <td><button class="btn btn-outline-warning " onclick='setFormReadyToUpdate(${i}),  totalPrice();' >Update</button></td>
        <td><button class="btn btn-outline-danger " onclick='removeItem(${i});'>Remove</button></td>
    </tr>`;


    }






document.getElementById('tableBody').innerHTML=cartoona;
}



function setFormReadyToUpdate(i){

    Index=i;

document.getElementById('updateProduct').classList.remove('d-none');
document.getElementById('addProduct').classList.add('d-none');

pName.value= productsContainer[i].productName;
pPrice.value= productsContainer[i].price;
pAds.value= productsContainer[i].ads;
pDisc.value= productsContainer[i].discount;
pDisc.value= productsContainer[i].discount;
pCat.value= productsContainer[i].category;
pDesc.value= productsContainer[i].description;
pTaxes.value=productsContainer[i].taxes;


}


function removeItem(index){
productsContainer.splice(index,1);
localStorage.setItem('CRUDS-data',JSON.stringify(productsContainer))
displayProducts();
}


function updateProduct() {


    document.getElementById('updateProduct').classList.add('d-none');
    document.getElementById('addProduct').classList.remove('d-none');
    let product={
        productName:pName.value,
        price:pPrice.value,
        taxes:pTaxes.value,
        ads:pAds.value,
        discount:pDisc.value,
        category:pCat.value,
        description:pDesc.value,
        total:pTotal.innerHTML
    }


    if (Number(pCount.value)===0) {
        productsContainer.splice(Index,1,product);
    } else {
        productsContainer.splice(Index,1);
        for (let i = 0; i < Number(pCount.value); i++) {
            productsContainer.splice(Index,0,product);
            
        }
    }
    localStorage.setItem('CRUDS-data',JSON.stringify(productsContainer));

    displayProducts();
    clearForm();
}



function clearForm(){
    pName.value= '';
pPrice.value= '';
pAds.value= '';
pDisc.value= '';
pDisc.value= '';
pCat.value= '';
pDesc.value= '';
pTotal.innerHTML='';
pCount.value='';
pTaxes.value='';
}




function search(term) {
    let cartoona=``;
    for (let i = 0; i < productsContainer.length; i++) {
   if (searchInput.placeholder==="Search By Name...") {
    if (        productsContainer[i].productName.toLowerCase().includes(term.toLowerCase())==true
    ) {
        cartoona+=`                    <tr>
        <td> ${i+1} </td>
        <td>${productsContainer[i].productName}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].ads}</td>
        <td>${productsContainer[i].discount}</td>
        <td>${productsContainer[i].total}</td>
        <td>${productsContainer[i].category}</td>
        <td> ${productsContainer[i].description}</td>
        <td><button class="btn btn-outline-warning " onclick='setFormReadyToUpdate(${i}),  totalPrice();' >Update</button></td>
        <td><button class="btn btn-outline-danger " onclick='removeItem(${i});'>Remove</button></td>
    </tr>`;

    }
}else if(searchInput.placeholder==="Search By Category..."){
    if(productsContainer[i].category.toLowerCase().includes(term.toLowerCase())==true){
        cartoona+=`                    <tr>
        <td> ${i+1} </td>
        <td>${productsContainer[i].productName}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].ads}</td>
        <td>${productsContainer[i].discount}</td>
        <td>${productsContainer[i].total}</td>
        <td>${productsContainer[i].category}</td>
        <td> ${productsContainer[i].description}</td>
        <td><button class="btn btn-outline-warning " onclick='setFormReadyToUpdate(${i}),  totalPrice();' >Update</button></td>
        <td><button class="btn btn-outline-danger " onclick='removeItem(${i});'>Remove</button></td>
    </tr>`;
    }
}
    }
document.getElementById('tableBody').innerHTML=cartoona;


}


function chooseSearchType() {
    searchInput.focus();
    btnSearch.classList.add('d-none');
    btnSearch2.classList.remove('d-none');
    searchInput.placeholder='Search By Category...';
}

function chooseSearchTypePrimary() {
    searchInput.focus();
    btnSearch.classList.remove('d-none');
    btnSearch2.classList.add('d-none');
    searchInput.placeholder='Search By Name...';
}

function validateTaxes(){

let regex =/^(\.+[0-9]{1,})$/;
if (regex.test(pTaxes.value)==true){
    return true;
}else{
    return false;
}
}