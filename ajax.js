const userCode = "VD5LHDxyz111";
const apiUrl = "http://gamf.nhely.hu/ajax2/";
const httpRequest = new XMLHttpRequest();

function isValidInput(name, height, weight) {
  return (
    name && name.length <= 30 &&
    height && height.length <= 30 &&
    weight && weight.length <= 30
  );
}

function fetchData() {
  document.getElementById("userCode").innerHTML = "Code=" + userCode;
  httpRequest.open("POST", apiUrl, true);
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let params = "code=" + userCode + "&op=read";
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      let response = JSON.parse(httpRequest.responseText);
      let records = response.list;

      // Magasság statisztikák
      let heightSum = 0;
      let maxHeight = 0;
      records.forEach(record => {
        let h = parseFloat(record.height);
        if (!isNaN(h)) {
          heightSum += h;
          if (h > maxHeight) maxHeight = h;
        }
      });
      let heightAvg = records.length > 0 ? (heightSum / records.length).toFixed(2) : 0;

      let output = `<h1>Records</h1><p>Total: ${response.rowCount} | Összeg: ${heightSum} | Átlag: ${heightAvg} | Max: ${maxHeight}</p>`;
      output += "<table><tr><th>ID</th><th>Név</th><th>Magasság</th><th>Testsúly</th></tr>";
      records.forEach(record => {
        output += `<tr><td>${record.id}</td><td>${record.name}</td><td>${record.height}</td><td>${record.weight}</td></tr>`;
      });
      output += "</table>";
      document.getElementById("dataDisplay").innerHTML = output;
    }
  };
  httpRequest.send(params);
}

function addRecord() {
  let name = document.getElementById("inputName").value;
  let height = document.getElementById("inputHeight").value;
  let weight = document.getElementById("inputWeight").value;

  if (isValidInput(name, height, weight)) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=create&name=${name}&height=${height}&weight=${weight}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("addResult").innerHTML = httpRequest.responseText > 0 ? "Sikeres hozzáadás!" : "Sikertelen hozzásadás!";
        fetchData();
      }
    };
    httpRequest.send(params);
  } else {
    document.getElementById("addResult").innerHTML = "Minden mezőt ki kell tölteni, és max. 30 karakter lehet!";
  }
}

function updateRecord() {
  let id = document.getElementById("editId").value;
  let name = document.getElementById("editName").value;
  let height = document.getElementById("editHeight").value;
  let weight = document.getElementById("editWeight").value;

  if (id && isValidInput(name, height, weight)) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("editResult").innerHTML = httpRequest.responseText > 0 ? "Sikeres frissítés!" : "Sikertelen frissítés!";
        fetchData();
      }
    };
    httpRequest.send(params);
  } else {
    document.getElementById("editResult").innerHTML = "Minden mezőt ki kell tölteni, és max. 30 karakter lehet!";
  }
}

function deleteRecord() {
  let id = document.getElementById("removeId").value;
  if (id) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=delete&id=${id}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("removeResult").innerHTML = httpRequest.responseText > 0 ? "Sikeres törlés!" : "Sikertelen törlés!";
        fetchData();
      }
    };
    httpRequest.send(params);
  }
}

function fetchRecord() {
  let id = document.getElementById("editId").value;
  if (id) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = "code=" + userCode + "&op=read";
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        let response = JSON.parse(httpRequest.responseText);
        let records = response.list;
        let found = records.find(record => record.id == id);

        if (found) {
          document.getElementById("editName").value = found.name;
          document.getElementById("editHeight").value = found.height;
          document.getElementById("editWeight").value = found.weight;
        } else {
          document.getElementById("editResult").innerHTML = "A rekord nem található!";
        }
      }
    };
    httpRequest.send(params);
  } else {
    document.getElementById("editResult").innerHTML = "Írj be egy ID-t!";
  }
}

window.onload = fetchData;
