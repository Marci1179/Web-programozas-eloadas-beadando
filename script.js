//Táblázat menü Funkciói
var selectedIndex = null;
var array = new Array();

var selectedIndex = null;
var array = new Array();
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["nev"] = document.getElementById("nev").value;
    formData["eletkor"] = document.getElementById("eletkor").value;
    formData["tszam"] = document.getElementById("tszam").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

function insertNewRecord(data) {
    array[array.length]= {"nev":data.nev,"eletkor":data.eletkor,"tszam":data.tszam,"email":data.email};
    printArray();
}

function printArray(){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < array.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = array[i].nev;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array[i].eletkor;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array[i].tszam;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = array[i].email;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = '<a class="delmod" onClick="onEdit('+i+')">Módosítás</a>' + '<a class="delmod" onClick="onDelete('+i+')">Törlés</a>';
    }
}

function resetForm() {
    document.getElementById("nev").value = "";
    document.getElementById("eletkor").value = "";
    document.getElementById("tszam").value = "";
    document.getElementById("email").value = "";
    selectedIndex=null;
}
function onEdit(index) {
    document.getElementById("nev").value = array[index].nev;
    document.getElementById("eletkor").value = array[index].eletkor;
    document.getElementById("tszam").value = array[index].tszam;
    document.getElementById("email").value = array[index].email;
    selectedIndex=index;
}
function updateRecord(formData) {
    array[selectedIndex].nev=formData.nev;
    array[selectedIndex].eletkor=formData.eletkor;
    array[selectedIndex].tszam=formData.tszam;
    array[selectedIndex].email=formData.email;
    printArray();
}
function onDelete(index) {
    if (confirm('Biztosan törölni akarod?')) {
        array.splice(index, 1); // Deleting the entry with the specified index
        resetForm();
        printArray();
    }
}
function validate() {
    let isValid = true;

    // Név validálás
    const nevInput = document.getElementById("nev");
    if (nevInput.value.trim() === "") {
        isValid = false;
        document.getElementById("nevValidationError").classList.remove("hide");
    } else {
        document.getElementById("nevValidationError").classList.add("hide");
    }

    // Telefonszám validálás
    const tszamInput = document.getElementById("tszam").value.trim();
    const tszamRegex = /^\d{1,11}$/;
    if (tszamInput !== "" && !tszamRegex.test(tszamInput)) {
        isValid = false;
        document.getElementById("tszamValidationError").classList.remove("hide");
    } else {
        document.getElementById("tszamValidationError").classList.add("hide");
    }
 
    // Életkor validálás
    const eletkorInput = document.getElementById("eletkor").value.trim();
    const eletkorRegex = /^\d+$/;
    if (eletkorInput !== "" && !eletkorRegex.test(eletkorInput)) {
        isValid = false;
        document.getElementById("eletkorValidationError").classList.remove("hide");
    } else {
        document.getElementById("eletkorValidationError").classList.add("hide");
    }

    // E-mail validálás
    const emailInput = document.getElementById("email").value.trim();
    if (
            emailInput !== "" && (
            emailInput.length < 5 ||
            !emailInput.includes("@") ||
            !emailInput.includes(".")
        )   
    ) {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } else {
        document.getElementById("emailValidationError").classList.add("hide");
    }

    return isValid;
}


//WebStorage
document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.hits) {
        sessionStorage.hits = Number(sessionStorage.hits) + 1;
    } else {
        sessionStorage.hits = 1;
    }

    if (localStorage.hits) {
        localStorage.hits = Number(localStorage.hits) + 1;
    } else {
        localStorage.hits = 1;
    }

    document.getElementById("sessionstorage").textContent = sessionStorage.hits;
    document.getElementById("localstorage").textContent = localStorage.hits;
});

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
    location.reload();
    document.getElementById("sessionstorage").textContent = sessionStorage.hits;
    document.getElementById("localstorage").textContent = localStorage.hits;
}

//Web Workers
let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker("worker.js");
        }
        worker.onmessage = function(event) {
            document.getElementById("result").innerText = "Eredmény: " + event.data;
        };
        worker.postMessage("start");
    } else {
        alert("A böngésződ nem támogatja a Web Worker funkciót.");
    }
}


//Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                document.getElementById("location").innerText = `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`;
            },
            err => alert("Hiba: " + err.message)
        );
    } else {
        alert("A böngésző nem támogatja.");
    }
}

//Drag and Drop
function allowDrop(ev) {
    ev.preventDefault(); // Megengedi a drop-ot
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Beállítja az áthúzott adatot
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const dropZone = ev.target.closest("#dropZone");
    const dropText = document.getElementById("dropText");
    if (dropText) {
        dropText.remove();
    }
    dropZone.appendChild(draggedElement);
}


//ChartJS
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#dataTable tbody");
    let tableData = [];

    document.querySelectorAll("#dataTable tr").forEach(tr => {
        let row = Array.from(tr.children).map(td => Number(td.textContent));
        tableData.push(row);
        tr.addEventListener("click", () => updateChart(row));
    });

    const ctx = document.getElementById("chartCanvas").getContext("2d");
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Oszlop 1", "Oszlop 2", "Oszlop 3", "Oszlop 4", "Oszlop 5"],
            datasets: [{
                label: "Kiválasztott sor adatai",
                data: [],
                borderColor: "#00ae49",
                backgroundColor: "#00ae49",
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#005603"
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: "#005603"
                    },
                    ticks: {
                        color: "#005603"
                    }
                },
                y: {
                    grid: {
                        color: "#005603"
                    },
                    ticks: {
                        color: "#005603"
                    }
                }
            }
        }
    });

    function updateChart(rowData) {
        chart.data.datasets[0].data = rowData;
        chart.update();
    }
});


                    
function sortTable(columnIndex, ascending) {
    let table = document.getElementById("employeeList");
    let rows = Array.from(table.rows).slice(1);
    
    rows.sort((rowA, rowB) => {
        let valA = rowA.cells[columnIndex].innerText;
        let valB = rowB.cells[columnIndex].innerText;
        
        if (!isNaN(valA) && !isNaN(valB)) {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }
        return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    
    rows.forEach(row => table.appendChild(row));
}

function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let table = document.getElementById("employeeList");
    let rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let cell of cells) {
            if (cell.innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = "";
    }
}