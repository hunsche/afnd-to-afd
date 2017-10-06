function main() {
  // let input = getInput();

  let input = {
    q0: { output: false, a: "q1, q2", b: "-" },
    q1: { output: false, a: "q2", b: "q0, q2" },
    q2: { output: true, a: "q2", b: "q0" }
  };

  let cartesian = cartesianProduct(input);
  let output = createAFD(input, cartesian);
  removeNotQuoted(output);
  console.log(output);
  // removeInacessible(output);

  populateAFD(output);
}

function generate() {
  $("#afndTable tr").remove();
  $("#afndTable td").remove();
  let $table = $("#afndTable");

  rowCount = document.getElementById("row").value;
  colCount = document.getElementById("col").value;
  console.log(colCount);
  let $row = $("<tr>");
  $table.append($row);
  $row.append($("<td>").text("Output"));
  $row.append($("<td>").text("φ"));
  for (let index = 0; index < colCount; index++) {
    $row.append($("<td>").text("-"));
  }

  for (let y = 0; y < rowCount; y++) {
    let $row = $("<tr>");
    $row.append($("<td>").html('<input type="checkbox">'));
    $row.append($("<td>").text("q" + y));
    $table.append($row);
    for (var x = 0; x < colCount; x++) {
      $row.append($("<td>").text("-"));
    }
  }

  $("#afndTable")
    .editableTableWidget()
    .find("td:first")
    .focus();
  $("#textAreaEditor").editableTableWidget({ editor: $("<textarea>") });
  window.prettyPrint && prettyPrint();
}

function populateAFD(output) {
  $("html,body").animate({ scrollTop: 9999 }, "slow");

  $("#afdTable tr").remove();
  $("#afdTable td").remove();
  let $table = $("#afdTable");

  let $rows = document
    .getElementById("afndTable")
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  let $line = $("<tr>");
  for (
    let index = 0;
    index < $rows[0].getElementsByTagName("td").length;
    index++
  ) {
    $line.append(
      $("<td>").text($rows[0].getElementsByTagName("td")[index].innerText)
    );
  }
  $table.append($line);

  for (let row in output) {
    $line = $("<tr>");
    $table.append($line);
    $line.append($("<td>").text(row));
    for (let col in output[row]) {
      $line.append($("<td>").text(output[row][col]));
    }
  }
}

function getInput() {
  let $rows = document
    .getElementById("afndTable")
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  let input = {};

  for (let indexRow = 1; indexRow < $rows.length; indexRow++) {
    let $row = $rows[indexRow];
    let $col = $rows[indexRow].getElementsByTagName("td");
    let item = {};
    for (let indexCol = 1; indexCol < $col.length; indexCol++) {
      let value = $col[indexCol].innerText;
      item[$rows[0].getElementsByTagName("td")[indexCol].innerText] = value;
    }
    input[$col[0].innerText] = item;
  }

  return input;
}

function createAFD(input, cartesian) {
  let output = {};
  let productForVoid = {};
  for (let item in cartesian) {
    output[cartesian[item]] = cartesian[item];
    let hash = getHash(cartesian[item]);
    let product = {};
    for (let itemHash in hash) {
      for (let collumn in input[hash[itemHash]]) {
        if(String(collumn) == 'output') continue;

        if (!product[collumn]) product[collumn] = "";
        else product[collumn] += ", ";

        if (input[hash[itemHash]]) {
          product[collumn] += input[hash[itemHash]][collumn];
        } else {
          product[collumn] += "-";
        }
        product[collumn] = concatDefault(getHash(product[collumn]));
        console.log(product);
        output[cartesian[item]] = product;
        productForVoid[collumn] = "-";
      }
    }
    if (cartesian[item] == "-") output[cartesian[item]] = productForVoid;
  }

  return output;
}

function concatDefault(array) {
  let result;
  for (let item in array) {
    if (array.length > 1 && array[item] == "-") continue;

    if (result) result += ", " + array[item];
    else result = array[item];
  }
  return result;
}

function isQuoted(hashList, element) {
  for (let itemLine in hashList) {
    for (let itemColumn in hashList[itemLine]) {
      if (String(getHash(hashList[itemLine][itemColumn])) == String(element)) {
        return true;
      }
    }
  }
  return false;
}

function removeNotQuoted(output) {
  for (let item in output) {
    if (!isQuoted(output, getHash(item))) delete output[item];
  }
}

function removeInacessible(output) {}

function cartesianProduct(input) {
  let size = getSize(input);
  let output = {};
  let result = "";

  for (let ammount = 1; ammount <= size; ammount++) {
    for (let index = 0; index < size; index++) {
      for (let start = 0; start < size; start++) {
        result = getElement(input, index);
        let count = ammount - 1;
        for (let element = start + 1; count != 0; element++) {
          if (element == size && count != 0) element = 0;
          result += ", " + getElement(input, element);
          count--;
        }
        uniquePush(output, result);
      }
    }
  }
  output["-"] = "-";

  return output;
}

function uniquePush(array, element) {
  let key = getHash(element);

  if (!array[key]) array[key] = element;
}

function getHash(element) {
  return Array.from(
    new Set(
      element
        .replace(/ /g, "")
        .split(",")
        .sort()
    )
  );
}

function getElement(array, index) {
  let size = 0;

  for (let key in array) {
    if (size == index) return key;
    size++;
  }
}

function getSize(array) {
  let size = 0;

  for (let key in array) size++;

  return size;
}
