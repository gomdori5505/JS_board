function deleteBoard(uniqueKey) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${cutJsonURL}/${uniqueKey}.json`);
    xhr.send();

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