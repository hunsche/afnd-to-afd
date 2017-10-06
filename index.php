<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <title>AFND to AFD</title>
    <link rel="icon" href="img/favicon.ico" />
    <link rel="stylesheet" href="external/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="js/jquery.min.js"></script>
    <script src="external/tether/dist/js/tether.min.js"></script>
    <script src="external/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>
    <script src="js/mindmup-editabletable.js"></script>
    <script src="js/numeric-input-example.js"></script>
    <script src="js/main.js"></script>
</head>

<body>

    <div class="center margin-in-bottom margin-in-top">
        <h2>Non-deterministic finite automaton converter for deterministic finite automaton</h2>
    </div>

    <div class="jumbotron">
        <form class="container">
            <div class="row">
                <div class="col">
                    <input type="number" class="form-control" id="col" placeholder="Column">
                </div>
                <div class="text-center">
                    <label for="x">x</label>
                </div>
                <div class="col">
                    <input type="number" class="form-control" id="row" placeholder="Row">
                </div>
            </div>
            <div class="row margin-in-top">
                <div class="col center">
                    <button type="button" onclick="generate()" class="btn btn-primary btn-md">Generate</button>
                </div>
            </div>
        </form>
        <div class="margin-in-top">
            <table id="afndTable" class="table table-inverse table-bordered">
                <tbody>
                    <tr>
                        <td>Output</td>
                        <td>φ</td>
                        <td>a</td>
                        <td>b</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>q0</td>
                        <td>q0, q1</td>
                        <td>q0</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>q1</td>
                        <td>-</td>
                        <td>q2</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>q2</td>
                        <td>-</td>
                        <td>q3</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" checked></td>
                        <td>q3</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="center margin-in-bottom">
        <button type="button" onclick="main()" class="btn btn-primary btn-lg">Convert</button>
    </div>

    <div class="jumbotron">
        <table id="afdTable" class="table table-inverse table-bordered">
            <tbody>
                <tr>
                    <td>Output</td>
                    <td>φ</td>
                    <td>a</td>
                    <td>b</td>
                </tr>
                <tr>
                    <td><input type="checkbox" onclick="return false;"></td>
                    <td>q0</td>
                    <td>q0, q1</td>
                    <td>q0</td>
                </tr>
                <tr>
                    <td><input type="checkbox" onclick="return false;"></td>
                    <td>q0, q1</td>
                    <td>q0, q1</td>
                    <td>q0, q2</td>
                </tr>
                <tr>
                    <td><input type="checkbox" onclick="return false;"></td>
                    <td>q0, q2</td>
                    <td>q0, q1</td>
                    <td>q0, q3</td>
                </tr>
                <tr>
                    <td><input type="checkbox" checked onclick="return false;"></td>
                    <td>q0, q3</td>
                    <td>q0, q1</td>
                    <td>q0</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="center margin-in-top">
        <b>Matheus Arendt Hunsche, Eduardo Ferrarezi, Rodrigo Rotava</b>
    </div>

    <script>
        $('#afndTable').editableTableWidget().find('td:first').focus();
        $('#textAreaEditor').editableTableWidget({ editor: $('<textarea>') });
        window.prettyPrint && prettyPrint();
    </script>

</body>

</html>