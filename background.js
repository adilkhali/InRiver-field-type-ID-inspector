
function getClickHandler() {
  return function(data, tab) {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", function(clickedEl) {
    });
  };
};

chrome.contextMenus.create({
  "title" : "Copy Field type ID to clipboard",
  "type" : "normal",
  "contexts" : ["selection"],
  "onclick" : getClickHandler()
});