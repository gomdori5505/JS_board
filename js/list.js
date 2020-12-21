function list(data) {
    const table = document.querySelector(".table"),
    tbody = document.createElement("tbody");
    
    Object.keys(data).forEach(key => {
        const regDateObj = new Date(data[key].regDateTime);

        const tr = document.createElement("tr"),
        tdSeq = document.createElement("td"),
        tdTitle = document.createElement("td"),
        tdNick = document.createElement("td"),
        tdDate = document.createElement("td"),
        tdHit = document.createElement("td");

        table.appendChild(tbody);
        tbody.appendChild(tr);
        tr.appendChild(tdSeq);
        tr.appendChild(tdTitle);
        tr.appendChild(tdNick);
        tr.appendChild(tdDate);
        tr.appendChild(tdHit);

        tdSeq.innerText = Number(key)+1;
        tdTitle.innerText = data[key].title;
        tdNick.innerText = data[key].nick;
        tdDate.innerText = `${regDateObj.getFullYear()}-${addZero(regDateObj.getMonth())}-${addZero(regDateObj.getDay())}`;
        tdHit.innerText = data[key].hit;
    });
}

function addZero(date) {
    if(date < 10) {
        return `0${date}`;
    } else {
        return date;
    }
}