
function getClickHandler() {
  return function(data, tab) {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", function(clickedEl) {
    });
  };
};

chrome.contextMenus.create({
  "title" : "Click To Copy Field type ID",
  "type" : "normal",
  "contexts" : ["selection"],
  "onclick" : getClickHandler()
});