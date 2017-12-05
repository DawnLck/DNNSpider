function switchColor(color) {
    chrome.tabs.executeScript(null, {code: 'document.body.style.backgroundColor="' + color + '"'});
}