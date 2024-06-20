const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

let myLeads = [];

// Load leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Event listener for saving input
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

// Event listener for saving the current tab
tabBtn.addEventListener("click", function () {
    if (chrome && chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        });
    } else {
        console.error("chrome.tabs.query is not available.");
    }
});

// Event listener for deleting all leads
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

// Function to render leads
function render(leads) {
    ulEl.innerHTML = "";
    for (let i = 0; i < leads.length; i++) {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = leads[i];
        a.target = "_blank";
        a.textContent = leads[i];

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", function () {
            deleteLead(i);
        });

        li.appendChild(a);
        li.appendChild(deleteButton);
        ulEl.appendChild(li);
    }
}

// Function to delete a lead
function deleteLead(index) {
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}
