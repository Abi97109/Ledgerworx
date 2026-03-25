function toggleMenu(){
  document.getElementById("dropdownMenu")?.classList.toggle("show");
}

const themeToggle = document.getElementById("themeToggle");
if(themeToggle && localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
  themeToggle.checked=true;
}
if(themeToggle){
  themeToggle.addEventListener("change",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
  });
}

window.onclick = function(e){
  if(!e.target.closest('.admin')){
    document.getElementById('dropdownMenu')?.classList.remove('show');
  }
}
