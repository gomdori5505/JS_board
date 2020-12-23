function update(newData, uniqueKey) {
    const boardWriteDiv = document.querySelector("#boardWrite"),
    boardUpdateDiv = document.querySelector("#boardUpdate"),
    boardUpdateDivH4 = boardUpdateDiv.querySelector("h4"),
    titleInput = boardUpdateDiv.querySelector("#editTitleInput"),
    nickInput = boardUpdateDiv.querySelector("#editNickInput"),
    contentTextarea = boardUpdateDiv.querySelector("#editContentTextarea"),
    submit = boardUpdateDiv.querySelector("button");

    boardWriteDiv.style.display = "none";
    boardUpdateDiv.style.display = "block";
    
    titleInput.value = newData.title;
    nickInput.value = newData.nick;
    contentTextarea.value = newData.content;
    
    submit.addEventListener('click', () => {
        updateBoard(uniqueKey, titleInput, nickInput, contentTextarea);
    });
}

function updateBoard(uniqueKey, titleInput, nickInput, contentTextarea) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${cutJsonURL}/${uniqueKey}.json`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        title: titleInput.value,
        nick: nickInput.value,
        content: contentTextarea.value,
        editDateTime: currentDateTimeFormat()
    }));

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 200) {
            console.log(xhr.responseText);
            location.reload();
        } else {
            console.log("Error!");
        }
    };
}