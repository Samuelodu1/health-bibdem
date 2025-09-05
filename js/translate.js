function googleTranslateElementInit(){
    new google.translate.TranslateElement(
    {pageLanguage:"en",includedLanguages:"en,pcm,yo,ig,ha",autoDisplay:false},
    "google_translate_element"
    );
}

function setLang(code,name,flag){
    let s=document.querySelector("select.goog-te-combo");
    if(s){s.value=code;s.dispatchEvent(new Event("change"));}
    // Only update the flag in the button
    document.getElementById("currentFlag").src = flag;
    document.getElementById("langDropdown").classList.remove("show");
}

document.querySelector(".dropdown-btn").onclick=()=>document.getElementById("langDropdown").classList.toggle("show");
window.onclick=e=>{
    if(!e.target.closest(".dropdown")) document.getElementById("langDropdown").classList.remove("show");
}