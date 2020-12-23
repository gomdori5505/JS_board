function boardRead(newData, uniqueKey, tdHit) {
    const boardReadDiv = document.querySelector("#boardRead");

    if(boardReadDiv.querySelector(".row")) {
        const rowDiv = boardReadDiv.querySelector(".row");
        boardReadDiv.removeChild(rowDiv);
    }

    const rowDiv = document.createElement("div"),
    table = document.createElement("table"),
    thead = document.createElement("thead"),
    tbody = document.createElement("tbody"),
    tr1 = document.createElement("tr"),
    th = document.createElement("th");

    boardReadDiv.appendChild(rowDiv);
    rowDiv.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(tr1);
    tr1.appendChild(th);

    rowDiv.classList.add("row");
    table.classList.add("table");
    table.classList.add("table-striped");
    th.colSpan = 3;
    th.innerText = "글보기";

    table.appendChild(tbody);
    
    for (const key in newData) {
        const tr2 = document.createElement("tr"),
        td1 = document.createElement("td"),
        td2 = document.createElement("td");
        
        tbody.appendChild(tr2);
        tr2.appendChild(td1);
        tr2.appendChild(td2);
        td2.colSpan = 2;
    }

    const korKeys = {
        seq: "번호",
        title: "제목",
        nick: "작성자",
        hit: "조회수",
        regDateTime: "작성일",
        editDateTime: "수정일",
        content: "내용"
    }
    
    var i = 0;
    for (const key in korKeys) {
        const tr = tbody.querySelectorAll("tr")[i],
        td1 = tr.querySelectorAll("td")[0],
        td2 = tr.querySelectorAll("td")[1];
        td2.classList.add(key);
        td1.innerText = korKeys[key];
        key === "seq" ? td2.innerText = newData[key] + 1 : td2.innerText = newData[key];
        i++;
    }
    updateHit(newData, uniqueKey, tdHit, boardReadDiv);
}

function updateHit(newDataNum, uniqueKey, tdHit, boardReadDiv) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${cutJsonURL}/${uniqueKey}.json`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({ hit: ++newDataNum.hit }));

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if(xhr.status === 200) {
            console.log(xhr.responseText);
            //getData(URL);
            const addHitCtn = () => {
                tdHit.innerText++;
                const hitCtnTd = boardReadDiv.querySelector(".hit");
                hitCtnTd.innerText++;
            }
            addHitCtn();
        } else {
            console.log("Error!");
        }
    };
}