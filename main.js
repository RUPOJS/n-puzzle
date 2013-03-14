var tbl, rows, cols,moves = 0;

        function Move(d) {
            //Get the td and move the cells.
            var cell = GetCell(d);
            var row = GetRow(cell);
            var ri = row.rowIndex;
            var ci = cell.cellIndex;
            var emptycell;

            if (ri > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri - 1].cells[ci])) { emptycell = tbl.rows[ri - 1].cells[ci]; }
            }
            if (ri < tbl.rows.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri + 1].cells[ci])) { emptycell = tbl.rows[ri + 1].cells[ci]; }
            }
            if (ci > 0 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci - 1])) { emptycell = tbl.rows[ri].cells[ci - 1]; }
            }
            if (ci < row.cells.length - 1 && emptycell == null) {
                if (IsCellEmpty(tbl.rows[ri].cells[ci + 1])) { emptycell = tbl.rows[ri].cells[ci + 1]; }
            }

            if (emptycell == null) {
                d.style.backgroundColor = "red";
                d.style.color = "white";
                setTimeout("RemoveHighlight('" + d.id + "');", 400);
            }
            else {
                ChangeParent(d, emptycell);
                moves++;
                document.getElementById("moves").innerHTML = moves;
                IsInOrder();
            }
        }
        //check the order of cells.
        function IsInOrder() {
            var arrDiv = document.getElementsByTagName("DIV");
            var inorder = true;
            for (var i = 0; i < arrDiv.length - 1; i++) {
                var n = parseInt(trim(arrDiv[i].innerHTML));
                var n1 = parseInt(trim(arrDiv[i + 1].innerHTML));
                if (n + 1 !== n1) {
                    inorder = false;
                    break;
                }
            }
            if (inorder && IsCellEmpty(tbl.rows[tbl.rows.length - 1].cells[cols - 1])) {
                for (var i = 0; i < arrDiv.length; i++) {
                    arrDiv[i].style.backgroundColor = "#FFFFCC";
                }
                alert("Perfect! It took you " + moves + " moves to solve it.");
            }
        }
        //to reset.
        function Reset() {
            moves = 0;
            document.getElementById("moves").innerHTML = moves;

            rows = document.getElementById("rows").value;
            if (isNaN(rows) || rows < 0) { rows = 4; }
            else { rows = Math.round(document.getElementById("rows").value); }
            document.getElementById("rows").value = rows;

            cols = document.getElementById("cols").value;
            if (isNaN(cols) || cols < 0) { cols = 4; }
            else { cols = Math.round(document.getElementById("cols").value); }
            document.getElementById("cols").value = cols;

            tbl = document.getElementById("tbl");
            while (tbl.rows.length > 0) {
                tbl.deleteRow(0);
            }
            var n = (rows * cols) - 1;
            var arrN = new Array();
            for (var i = 1; i <= n; i++) {
                arrN.push(i);
            }
            var inversions = 1;

            while (inversions % 2 == 1) {
                arrN = Shuffle(arrN);
               
                inversions = 0;
                for (var i = 0; i < arrN.length; i++) {
                    for (var j = i; j < arrN.length; j++) {
                        if (arrN[i] > arrN[j])
                            inversions++;
                    }
                }
            }

            n = 0;
            for (var i = 0; i < rows; i++) {
                tbl.insertRow(i);
                var tr = tbl.rows[i];
                for (var j = 0; j < cols; j++) {
                    tr.insertCell(j);
                    var td = tr.cells[j];
                    td.className = "cell";
                    if (i == rows - 1 && j == cols - 1)
                        td.innerHTML = "";
                    else
                        td.innerHTML = "<div id='n" + arrN[n] + "' class='num' onclick='Move(this)'>" + arrN[n] + "</div>";

                    n++;
                }
            }
        }
        //to shuffle the cells.
        function Shuffle(o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        function IsCellEmpty(cell) {
            for (var i = 0; i < cell.childNodes.length; i++) {
                if (cell.childNodes[i].className == "num") {
                    return false;
                }
            }
            return true;
        }

        function RemoveHighlight(did) {
            var d = document.getElementById(did);
            d.style.backgroundColor = "#CCFFFF";
            d.style.color = "#0099FF";
        }

        function GetTable(a) {
            var c = a.parentNode;
            while (c.tagName != 'TABLE') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRow(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c;
        }

        function GetCell(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c;
        }

        function GetRowIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TR') {
                c = c.parentNode;
            }
            return c.rowIndex;
        }

        function GetCellIndex(a) {
            var c = a.parentNode;
            while (c.tagName != 'TD') {
                c = c.parentNode;
            }
            return c.cellIndex;
        }

        function AddRow(tbl, i, NumCells) {
            var r = tbl.insertRow(i);
            for (j = 0; j < NumCells; j++) {
                var c = r.insertCell(j);
                c.className = "col" + (j + 1);
                c.innerHTML = "";
            }
        }

        function trim(str) {
            str = str.replace(/^\s+/, '');
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        }
       //to change the parent of cell.
        function ChangeParent(sourceElement, targetElement) {
            var sourceElementParent = sourceElement.parentNode;
            sourceElementParent.removeChild(sourceElement);
            targetElement.appendChild(sourceElement);
        }


