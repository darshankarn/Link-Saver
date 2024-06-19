const inputBtn = document.getElementById("input-btn");
const deleteBtn= document.getElementById("delete-btn");
let myLeads=[];

const inputEl=document.getElementById("input-el");

const ulEl=document.getElementById("ul-el");

const tabBtn=document.getElementById("save-btn");


tabBtn.addEventListener("click",function(){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Do something
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})
  
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads){
let listItems = "";
for(let i=0;i<leads.length;i++){
   // listItems += "<li><a href="+ myLeads[i] + " target='_blank'>"+ myLeads[i] + "</a>" + "</li>" ;
   listItems += `
   <li>
     <a href=${leads[i]} target='_blank'>
     ${leads[i]}
     </a>
   </li> `
}

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value);
  inputEl.value="";
  localStorage.setItem("myLeads",JSON.stringify(myLeads));
  render(myLeads);
})


ulEl.innerHTML = listItems;
}
deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear();
  myLeads=[];
  render(myLeads);
})
