console.log("Hello ");

var clickedEl = null;
$("body").contextmenu(function (e) {
    clickedEl = e.target;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request == "getClickedEl") {
        var fieldtypeid = "";
        var fieldEditor = clickedEl.closest(".field-editor-wrap");
        if (fieldEditor != null && fieldEditor.attributes.fieldtypeid != null) {
            fieldtypeid = fieldEditor.attributes.fieldtypeid.value;
        }
        console.log(fieldtypeid);
        copyTextToClipboard(fieldtypeid);
    }
});



function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}