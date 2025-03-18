//Táblázat menü Funkciói
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
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
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
    if (confirm('Biztosan törölni szeretnéd ezt a rekordot?')) {
        array.splice(index, 1);
        resetForm();
        printArray();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("nev").value == "") {
        isValid = false;
        document.getElementById("nevellenorzes").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nevellenorzes").classList.contains("hide"))
            document.getElementById("nevellenorzes").classList.add("hide");
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
