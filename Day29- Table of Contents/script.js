const divTable = document.querySelector("#table-of-contents");
const h2 = Array.prototype.slice.call(document.querySelectorAll("h2"));


const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);
h2.forEach(item => {
    tbody.innerHTML += `<tr><a href="#${item.id}">${item.textContent}</a></tr>`;
});

divTable.appendChild(table);