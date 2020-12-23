const URL = "https://board-af8be-default-rtdb.firebaseio.com/board.json",
cutJsonURL = "https://board-af8be-default-rtdb.firebaseio.com/board";

function getData(URL) {
    fetch(URL)
    .then(res => {
        //console.log("response:", res);
        return res.json();
    })
    .then(data => {
        // json 출력
        //console.log(data);
        paging(data);
        writeSubmit(data);
    })
    .catch(err => console.log("error:", err))
}

getData(URL);