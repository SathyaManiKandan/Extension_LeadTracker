const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById('ul-el')
const inputEl = document.getElementById('input-el')
const deletebtn = document.getElementById('delete-btn')
const tabbtn = document.getElementById('tab-btn')
let myLeads = [];

deletebtn.addEventListener('dblclick' ,function(){
       localStorage.clear();
       myLeads = [];
       renderLeads(myLeads);     
})


tabbtn.addEventListener('click', function(){
        chrome.tabs.query({active :true, currentWindow : true}, function(tabs){
            console.log(tabs[0].url)
            myLeads.push(tabs[0].url);
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            renderLeads(myLeads)
        })   
})

let leadsFromLocalStorage = JSON.parse( localStorage.getItem('myLeads'))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}
console.log(leadsFromLocalStorage)
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem('myLeads', JSON.stringify(myLeads))    
    renderLeads(myLeads);
    
})
function renderLeads(leads){
    let listItems = "";
    let c = 1;
    for(let i = 0; i<leads.length;i++){
      listItems  += `  <li> ${c}  <a  href = "${leads[i]}" > ${leads[i]}   </a>`
      c++;
    }
    ulEl.innerHTML = listItems;
}





