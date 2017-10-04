function generate() {
    $("#afndTable tr").remove();
    let $table = $('#afndTable');

    let mydata = [
        {
            "nome": 'lala',
            "idade": 12
        },
        {
            "nome": 'lolo',
            "idade": 23
        }
    ]

    $table.append('<thead><tr><th data-field="nome">Nome</th><th data-field="idade">Pontuação</th></tr></thead>');

    $(function () {
        $('#afndTable').bootstrapTable({
            data: mydata
        });
    });

    // rowCount = document.getElementById("row").value;
    // colCount = document.getElementById("col").value;
    // console.log(colCount);
    // let $row = $('<tr>');
    // $table.append($row);
    // $row.append($('<td>').text('φ'));
    // for (let index = 0; index < colCount; index++) {
    //     $row.append($('<td>').text('-'));        
    // }


    // for (let y = 0; y < rowCount; y++) {
    //     let $row = $('<tr>');
    //     $row.append($('<td>').text('q' + y));
    //     $table.append($row);
    //     for (var x = 0; x < colCount; x++) {
    //         $row.append($('<td>').text('-'));
    //     }
    // }

    $('#afndTable').editableTableWidget().find('td:first').focus();
    $('#textAreaEditor').editableTableWidget({ editor: $('<textarea>') });
    window.prettyPrint && prettyPrint();
}

function main() {

    let $table = $('#afndTable');
    console.log($('#afndTable').bootstrapTable('getData'));

    // let input = {
    //     q0: { a: 'q1, q2', b: '-' },
    //     q1: { a: 'q2', b: 'q0, q2' },
    //     q2: { a: 'q2', b: 'q0' },
    // };

    // let cartesian = cartesianProduct(input);
    // let output = createAFD(input, cartesian);
    // removeNotQuoted(output);
    // removeInacessible(output);

    // console.log(output)
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
                if (!product[collumn])
                    product[collumn] = '';
                else
                    product[collumn] += ', ';

                if (input[hash[itemHash]]) {
                    product[collumn] += input[hash[itemHash]][collumn]
                } else {
                    product[collumn] += '-';
                }
                product[collumn] = concatDefault(getHash(product[collumn]));
                output[cartesian[item]] = product;
                productForVoid[collumn] = '-';
            }
        }
        if (cartesian[item] == '-')
            output[cartesian[item]] = productForVoid;
    }

    return output;
}

function concatDefault(array) {
    let result;
    for (let item in array) {
        if (array.length > 1 && array[item] == '-')
            continue;

        if (result)
            result += ', ' + array[item];
        else
            result = array[item];
    }
    return result;
}

function isQuoted(hashList, element) {
    for (let itemLine in hashList) {
        for (let itemColumn in hashList[itemLine]) {
            console.log(getHash(hashList[itemLine][itemColumn]) + ' = ' + element);
            if (getHash(hashList[itemLine][itemColumn]) == element) {
                return true;
            }
        }
    }
    return false;
}

function removeNotQuoted(output) {
    for (let item in output) {
        // console.log(item);
        !isQuoted(output, getHash(item));
        // delete output[item];
    }
}

function removeInacessible(output) {

}

function cartesianProduct(input) {
    let size = getSize(input);
    let output = {};
    let result = '';

    for (let ammount = 1; ammount <= size; ammount++) {
        for (let index = 0; index < size; index++) {
            for (let start = 0; start < size; start++) {
                result = getElement(input, index);
                let count = ammount - 1;
                for (let element = start + 1; count != 0; element++) {
                    if (element == size && count != 0)
                        element = 0;
                    result += ', ' + getElement(input, element);
                    count--;
                }
                uniquePush(output, result);
            }
        }
    }
    output['-'] = '-';

    return output;
}

function uniquePush(array, element) {
    let key = getHash(element);

    if (!array[key])
        array[key] = element;
}

function getHash(element) {
    return Array.from(new Set(element.replace(/ /g, '').split(',').sort()));
}

function getElement(array, index) {
    let size = 0;

    for (let key in array) {
        if (size == index)
            return key;
        size++;
    }
}

function getSize(array) {
    let size = 0;

    for (let key in array)
        size++;

    return size;
}