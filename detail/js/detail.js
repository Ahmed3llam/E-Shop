/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
document.getElementById("count").innerHTML = myCard.length;
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get('id');
let src=document.getElementById("image");
let title=document.getElementById("title");
let price=document.getElementById("price");
let description=document.getElementById("about");
let category=document.getElementById("category");
let cardbtn = document.getElementById('addToCart');

/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- product - category */
async function getcategory(productId) {
    let response = await fetch(`https://json-blush-psi.vercel.app/Categories/?id=${productId}`)
    let data = await response.json();
    category.innerHTML= data[0].title;
}
async function getproduct(productId) {
    let response = await fetch(`https://json-blush-psi.vercel.app/products/?id=${productId}`)
    let data = await response.json();
    src.setAttribute("src",data[0].image);
    title.innerHTML=data[0].title;
    price.innerHTML=`${data[0].price} $`;
    description.innerHTML=data[0].description;
    getcategory(data[0].category);
}
getproduct(productId);

/*** 4- card btn */
function updateCardCounter(counter){
    document.getElementById("count").innerHTML = counter;
}
cardbtn.addEventListener('click',
    function(){
        myCard.push({
            id:productId,
            title:title.innerHTML,
            image:src.getAttribute("src"),
            price:price.innerHTML.slice(0,price.innerHTML.length-1),
            category:category.innerHTML,
            description:description.innerHTML,
            quantity:1
        });
        localStorage.setItem('product',JSON.stringify(myCard));
        updateCardCounter(myCard.length);
    }
);

/*** 5- back to top btn */
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.style.display = "block";
            btn.style.scrollBehavior = "smooth";
        } else {
            btn.style.display = "none";
        }
    });
    btn.addEventListener("click", function () {
        document.documentElement.scrollTop = 0;
    });
});

