function showApproval(){
  document.getElementById("approvalCard").style.display="block";
  document.getElementById("requestCard").style.display="none";
}
function showRequest(){
  document.getElementById("requestCard").style.display="block";
  document.getElementById("approvalCard").style.display="none";
}
function openAssign(){
  document.getElementById("assignModal").style.display="flex";
}
function assign(){
  document.getElementById("assignModal").style.display="none";
  showPopup("Salesperson assigned successfully");
}
function sendEmail(){
  showPopup("Email sent successfully");
}
function showPopup(msg){
  const p=document.getElementById("popup");
  p.innerText=msg;
  p.style.display="block";
  setTimeout(()=>p.style.display="none",3000);
}
document.getElementById("assignModal").onclick=e=>{
  if(e.target.id==="assignModal") e.target.style.display="none";
};
