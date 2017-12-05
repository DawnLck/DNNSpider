function switchColor(color) {
    console.log(color);
    $('body').css('background-color', color);
    // chrome.tabs.executeScript(null, {code: 'document.body.style.backgroundColor="' + color + '"'});
}