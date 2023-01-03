export function isInList(list = [], entityId = 0) {
  if (!list.length) {
    list = JSON.parse(localStorage.getItem("entityList")) || [];
  }
  if (list.length > 0) {
    if (!entityId) {
      entityId = list[0].id;
    }
    for (var item of list) {
      if (item.id == entityId) {
        return { id: item.id, name: item.entityName };
      }
    }
    return false;
  } else {
    return false;
  }
}

export function setDocumentTitle(title) {
  document.title = title;
  var i = document.createElement("iframe");
  i.style.display = "none";
  i.onload = function() {
    setTimeout(function() {
      i.remove();
    }, 10);
  };
  document.body.appendChild(i);
}
