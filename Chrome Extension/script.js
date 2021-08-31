let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const uLEL = document.getElementById("ul-el");
const delEL = document.getElementById("delete-btn");
const saveTabEl = document.getElementById("save-tab");

//const tabs = [{ url: "https://facebook.com" }];

delEL.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

saveTabEl.addEventListener("click", function () {
  //console.log(tabs[0].url);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); //This is to get the leads saved in the local storage as an array
//console.log(leadsFromLocalStorage);
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  //This entire section has to deal with what happens when the button is clicked

  myLeads.push(inputEl.value); //the (inputEl.value) explains pushing the value in the input box to the myLeads array //This entire section has to deal with what happens when the button is clicked

  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("myLeads"));
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href = "${leads[i]}"> 
            ${leads[i]} 
        </a>
      </li>
    `;
  }
  uLEL.innerHTML = listItems;
}
