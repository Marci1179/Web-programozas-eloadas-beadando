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
        array.splice(index, 1); // Deleting the entry with the specified index
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
    // SessionStorage növelése
    if (sessionStorage.hits) {
        sessionStorage.hits = Number(sessionStorage.hits) + 1;
    } else {
        sessionStorage.hits = 1;
    }

    // LocalStorage növelése
    if (localStorage.hits) {
        localStorage.hits = Number(localStorage.hits) + 1;
    } else {
        localStorage.hits = 1;
    }

    // Értékek kiírása a táblázatba
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