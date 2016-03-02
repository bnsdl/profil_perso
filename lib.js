// raccourci pour getElementById()

function byId(elementId) {
  if (typeof elementId != 'string') {
    console.log('Erreur: elementId doit être une chaîne de caractère!');
    return null;
  } else {
    return document.getElementById(elementId);
  }
}

// raccourci pour getElementsByClassName()

function byClass(className, index) {
  if ((i !== undefined) ||(i !== null)) {
    var elements = document.getElementsByClassName(className);
    return Array.protoype.slice.call(elements);
  } else {
    return document.getElementsByClassName(className)[index];
  }
}

function byTag(el) {
  return document.getElementsByTagName(el);
}

function addClass(el, cl){
  return el.classList.add(cl);
}

// function create(element) {
//   return document.createElement(element);
// }

function _el(tag , textContent) {
    if( ! textContent )
        return document.createElement(tag);

    var el = document.createElement(tag);
    el.appendChild(tNode(textContent));
    return el;
}

function tNode(text) {
    return document.createTextNode(text);
}
