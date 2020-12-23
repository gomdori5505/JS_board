function renderTable(page, newData, totalListCount, listCountPerPage, data) {
    const boardListDiv = document.querySelector("#boardList"),
    table = boardListDiv.querySelector(".table"),
    tbody = document.createElement("tbody"),
    startNum = (listCountPerPage * (page - 1)),
    endNum = ((listCountPerPage * page) >= totalListCount) ? totalListCount : (listCountPerPage * page);

    if(table.querySelector("tbody")) {
        const tbody = table.querySelector("tbody");
        table.removeChild(tbody);
    }

    for(let num = startNum; num < endNum; num ++) {
        const regDateObj = new Date(newData[num].regDateTime);

        const tr = document.createElement("tr"),
        tdSeq = document.createElement("td"),
        tdTitle = document.createElement("td"),
        aTitle = document.createElement("a"),
        tdNick = document.createElement("td"),
        tdDate = document.createElement("td"),
        tdHit = document.createElement("td"),
        uniqueKey = Object.keys(data)[num];

        table.appendChild(tbody);
        tbody.appendChild(tr);
        tr.appendChild(tdSeq);
        tr.appendChild(tdTitle);
        tdTitle.appendChild(aTitle);
        tr.appendChild(tdNick);
        tr.appendChild(tdDate);
        tr.appendChild(tdHit);

        tdSeq.innerText = Number(num)+1;
        aTitle.innerText = newData[num].title;
        tdNick.innerText = newData[num].nick;
        tdDate.innerText = `${regDateObj.getFullYear()}-${addZero(regDateObj.getMonth() + 1)}-${addZero(regDateObj.getDate())}`;
        tdHit.innerText = newData[num].hit;

        tdSeq.classList.add("seq");
        tdTitle.classList.add("title");
        tdNick.classList.add("nick");
        tdDate.classList.add("regDateTime");
        tdHit.classList.add("hit");
        
        aTitle.addEventListener('click', () => {
            boardRead(newData[num], uniqueKey, tdHit);
        });
    }
}

function renderPagination(page, data, paginationCount, totalPaginationBlock, totalPage) {
    const paging = document.querySelector("#paging");
    if(paging.querySelector(".pagination")) {
        var pagination = paging.querySelector(".pagination");
    } else {
        var pagination = document.createElement("ul");
        paging.appendChild(pagination);
        pagination.classList.add("pagination");
    }
    
    const block = Math.floor((page - 1) / paginationCount) + 1;
    const startPage = ((block - 1) * paginationCount) + 1;
    const endPage = ((startPage + paginationCount - 1) > totalPage) ? totalPage : (startPage + paginationCount - 1);
    let paginationHTML = "";
    
    if (page !== 1) paginationHTML += '<li class="prev first_page"><a href="#"><span>«</span></a></li>';
    if (block !== 1) paginationHTML += '<li class="prev back_page"><a href="#"><span>‹</span></a></li>';

    for (var index = startPage; index <= endPage; index++) {
        paginationHTML += (parseInt(page) === parseInt(index)) ?
            '<li class="active"><a>' + index + "</a></li>" : "<li class='go_page'><a data-value="+ index +">" + index + "</a></li>";
    }

    if (block < totalPaginationBlock) paginationHTML += "<li class='next next_page'><a href='#'><span>›</span></a></li>";
    if (page < totalPage) paginationHTML += "<li class='next last_page'><a href='#'><span>»</span></a></li>";

    pagination.innerHTML = paginationHTML;
    addEventPagination(data, startPage, endPage, totalPage, pagination);
}

function addEventPagination(data, startPage, endPage, totalPage, pagination) {
    if (!!pagination.querySelector(".first_page")) {
        pagination.querySelector(".first_page").addEventListener('click', () => {
            renderTableAndPagination(1, data);
        });
    }

    if (!!pagination.querySelector(".back_page")) {
        pagination.querySelector(".back_page").addEventListener('click', () => {
            renderTableAndPagination(startPage-1, data);
        });
    }

    pagination.querySelectorAll(".go_page").forEach(goPage => {
        goPage.addEventListener('click', e => {
            renderTableAndPagination(parseInt(e.target.getAttribute('data-value')), data);
        });
    });

    if (!!pagination.querySelector(".next_page")) {
        pagination.querySelector(".next_page").addEventListener('click', () => {
            renderTableAndPagination(endPage + 1, data);
        });
    }

    if (!!pagination.querySelector(".last_page")) {
        pagination.querySelector(".last_page").addEventListener('click', () => {
            renderTableAndPagination(totalPage, data);
        });
    }
}

function addZero(date) {
    if(date < 10) {
        return `0${date}`;
    } else {
        return date;
    }
}