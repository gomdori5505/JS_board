function writeSubmit(data) {
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
    const now = new Date(),
    newSeq = Object.keys(newData).length,
    title = titleInput.value,
    nick = nickInput.value,
    content = contentTextarea.value,
    hit = 0,
    dateTime = `${now.getFullYear()}-${addZero(now.getMonth())}-${addZero(now.getDate())} ${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;

    postData(newSeq, title, nick, content, hit, dateTime);
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
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if(xhr.status === 200 || xhr.status === 201) { // 201: Created
            console.log(xhr.responseText);
            empty();
            location.reload();
        } else {
            console.log("Error!");
            console.log(xhr.status);
        }
    };
}

function empty() {
    const titleInput = document.querySelector("#titleInput"),
    nickInput = document.querySelector("#nickInput"),
    contentTextarea = document.querySelector("#contentTextarea");
    
    titleInput.value = "";
    nickInput.value = "";
    contentTextarea.value = "";
}