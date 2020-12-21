fetch("https://board-af8be-default-rtdb.firebaseio.com/board.json")
.then(res => {
    console.log("response:", res);
    return res.json();
})
.then(data => {
    // json 출력
    console.log(data);
})
.catch(err => console.log("error:", err))