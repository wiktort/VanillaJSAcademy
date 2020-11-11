const divTable = document.querySelector("#table-of-contents");
const h2 = Array.prototype.slice.call(document.querySelectorAll("h2"));


const table = document.createElement("table");
const tbody = document.createElement("tbody");
tbody.innerHTML += `<thead>
                        <tr>
                            <th>List of anchor links</th>
                        </tr>
                    </thead>`;

h2.forEach((item, index )=> {
    item.id = `section${index}`
    tbody.innerHTML += `<tr><a href="#${item.id}">${item.textContent}</a></tr>`;
});

table.appendChild(tbody);
divTable.appendChild(table);