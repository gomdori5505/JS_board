function paging(data) {
    renderTableAndPagination(page = 1, data);
}

function renderTableAndPagination(page, data) {
    const newData = adjustData(data),
    totalListCount = Object.keys(newData).length, // 총 게시물 갯수
    listCountPerPage = 5, // 한 페이지당 게시물 갯수
    totalPage = Math.ceil(totalListCount / listCountPerPage), // 총 페이지네이션 갯수
    paginationCount = 5, // 보여줄 하단 페이지네이션 갯수
    totalPaginationBlock = Math.ceil(totalPage / paginationCount);

    renderTable(page, newData, totalListCount, listCountPerPage, data);
    renderPagination(page, data, paginationCount, totalPaginationBlock, totalPage);
}

function adjustData(data) {
    var newData = {},
    i = 0;
    
    for (const key in data) {
        let tempData = {};
        tempData = data[key];
        newData[i++] = tempData;
    }
    return newData;
}