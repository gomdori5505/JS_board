function write(data) {
    const boardWriteDiv = document.querySelector("#boardWrite"),
    titleInput = boardWriteDiv.querySelector("#titleInput"),
    nickInput = boardWriteDiv.querySelector("#nickInput"),
    contentTextarea = boardWriteDiv.querySelector("#contentTextarea"),
    submit = boardWriteDiv.querySelector("button");
    submit.addEventListener('click', () => {
        writeBoard(titleInput, nickInput, contentTextarea, adjustData(data));
    });
}

function writeBoard(titleInput, nickInput, contentTextarea, newData) {
    const newSeq = Object.keys(newData).length,
    title = titleInput.value,
    nick = nickInput.value,
    content = contentTextarea.value,
    hit = 0,
    dateTime = currentDateTimeFormat();

    postData(newSeq, title, nick, content, hit, dateTime);
}

function currentDateTimeFormat() {
    const now = new Date();
    return `${now.getFullYear()}-${addZero(+now.getMonth() + 1)}-${addZero(now.getDate())} ${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;
}

function postData(seq, title, nick, content, hit, dateTime) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        seq,
        title,
        nick,
        hit,
        regDateTime: dateTime,
        editDateTime: dateTime,
        content
    }));
    
    xhr.onreadystatechange = function (e) {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 200 || xhr.status === 201) { // 201: Created
            console.log(xhr.responseText);
            location.reload();
        } else {
            console.log("Error!");
        }
    };
}