/*** 1- initalization */
let myCard = JSON.parse(localStorage.product || '[]');
let contactUs=document.getElementById("contactUs");
let contacts=document.getElementById("contacts");
document.getElementById("myForm").addEventListener("submit", submitForm);
document.getElementById("count").innerHTML = myCard.length;

/*** 2- nav */
function nav() {
    var navElement = document.getElementById("nav");
    navElement.classList.toggle("responsive");
}

/*** 3- make cookie*/
function saveCookie(key, value) {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    document.cookie = key + "=" + value + ";expires=" + myDate;
}
function getCookie(key){
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/*** 4- validate inp */
function reset(){
    document.getElementById("valid").style.display="none";
    document.getElementById("messageValid").style.display="none";
}
function check(){
    reset();
    let fullName=document.getElementById("fullName").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let msg=document.getElementById("message").value;
    let password=document.getElementById("password").value;
    let address=document.getElementById("address").value;
    let validState=document.getElementById("valid");
    function checkName(fullName){
        if(fullName==""||Number(fullName)){
            validState.innerHTML=`${fullName} is not valid`;
            validState.style.display="block";
            return false;
        }
        return true;
    }
    function checkEmail(email){
        if(! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            validState.innerHTML=`${email} is not valid`;
            validState.style.display="block";
            return false;
        }
        return true;
    }
    function checkPassword(password){
        if(! /^(?=.*[a-zA-Z]).{8,}$/.test(password)){
            validState.innerHTML=`Password value is not valid`;
            validState.style.display="block";
            return false;
        }
        return true;
    }
    function checkAddresses(address) {
        if(address=="") {
            validState.innerHTML=`address value is not valid`;
            validState.style.display="block";
            return false;
        }
        return true;
    }
    function checkPhone(phone){
        if(!/^(010|011|012)\d{8}$/.test(phone)){
            validState.innerHTML=`${phone} is not valid`;
            validState.style.display="block";
            return false;
        }
        return true;
    }
    function checkMsg(msg){
        if(msg==""){
            document.getElementById("messageValid").style.display="block";
            return false;
        }
        return true;
    }
    function putCookie(){
        saveCookie("fullName",fullName);
        saveCookie("email",email);
        saveCookie("password",password);
        saveCookie("Address",address);
        saveCookie("phone",phone);
    }
    if(checkName(fullName)&&checkEmail(email)&&checkPhone(phone)&&
    checkPassword(password)&&checkAddresses(address)&&checkMsg(msg))
    {
        putCookie();
        reset();
        return true;
    }else{
        return false;
    }
}

/*** 5- submit form */
function submitForm(event) {
    event.preventDefault();
    if(check()){
        console.log("Done");
        contactUs.innerHTML = `
            <p>${getCookie("fullName")} , Thank you for contacting us! </p>
        `;
        contacts.innerHTML = `
            <p>We will get back to you soon! In Your Email ${getCookie("email")} Or In Your Phone ${getCookie("phone")}</p>
        `;
    }
    
}

/*** 6- back to top btn */
document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("backToTopBtn");
    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
        } else {
        btn.style.display = "none";
        }
    });
    btn.addEventListener("click", function() {
        document.documentElement.scrollTop = 0; 
    });
});
