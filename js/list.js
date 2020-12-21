function renderTable(page, data, totalListCount, listCountPerPage) {
    const table = document.querySelector(".table");
    const tbody = document.createElement("tbody");
    const startNum = (listCountPerPage * (page - 1));
    const endNum = ((listCountPerPage * page) >= totalListCount) ? totalListCount : (listCountPerPage * page);

    if(document.querySelector("tbody")) {
        const tbody = document.querySelector("tbody")
        table.removeChild(tbody);
    }

    for(let key = startNum; key < endNum; key ++) {
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
        tdDate.innerText = `${regDateObj.getFullYear()}-${addZero(regDateObj.getMonth() + 1)}-${addZero(regDateObj.getDate())}`;
        tdHit.innerText = data[key].hit;
    }
}

function renderPagination(page, data, paginationCount, totalPaginationBlock, totalPage) {
    const paging = document.querySelector(".paging");
    if(document.querySelector(".pagination")) {
        var pagination = document.querySelector(".pagination");
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
            '<li class="active"><a href="#">' + index + "</a></li>" : "<li class='go_page'><a href='#' data-value="+ index +">" + index + "</a></li>";
    }

    if (block < totalPaginationBlock) paginationHTML += "<li class='next next_page'><a href='#'><span>»›</span></a></li>";
    if (page < totalPage) paginationHTML += "<li class='next last_page'><a href='#'><span>»</span></a></li>";

    pagination.innerHTML = paginationHTML;
    addEventPagination(data, startPage, endPage, totalPage);
}

function addEventPagination(data, startPage, endPage, totalPage) {
    if (!!document.querySelector(".first_page")) {
        document.querySelector(".first_page").addEventListener('click', () => {
            renderTableAndPagination(1, data);
        });
    }

    if (!!document.querySelector(".back_page")) {
        document.querySelector(".back_page").addEventListener('click', () => {
            renderTableAndPagination(startPage-1, data);
        });
    }

    document.querySelectorAll(".go_page").forEach(goPage => {
        goPage.addEventListener('click', e => {
            renderTableAndPagination(parseInt(e.target.getAttribute('data-value')), data);
        });
    });

    if (!!document.querySelector(".next_page")) {
        document.querySelector(".next_page").addEventListener('click', () => {
            renderTableAndPagination(endPage + 1, data);
        });
    }

    if (!!document.querySelector(".last_page")) {
        document.querySelector(".last_page").addEventListener('click', () => {
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