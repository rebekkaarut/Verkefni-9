const APIS_URL = 'https://apis.is/company?name=';

const companies = document.querySelector('.results');

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
document.getElementsByTagName('button')[0].addEventListener('click', function(event) {
  event.preventDefault();
  while (companies.firstChild) {
    companies.removeChild(companies.firstChild);
  }
  let inntaksgildi = document.getElementsByTagName('input')[0].value;
  if(inntaksgildi.trim() == '') {
    emptystring();
  }
  else {
    let APIS_URL = 'https://apis.is/company?name=';
    APIS_URL += inntaksgildi;
    loading();
    fetch(APIS_URL)
        .then(result => {
          if (!result.ok) {
            throw new Error('Non 200 status');
          }
          return result.json();
        })
        .then(data => {
          if(data.results.length == 0) {notfound();}
          for(let i = 0; i < data.results.length; i++){
            const{name, sn, active, address} = data.results[i];
            makeElement(name,sn,active,address);
          }

        })
        .then(() => companies.removeChild(companies.firstChild))
        .catch(error => {
          companies.removeChild(companies.firstChild);
          connectionfail();
          console.error(error);
        })
  }
}, false);


function emptystring() {
  var error = document.createElement("p");
  error.innerHTML = "Fyrirtæki má ekki vera autt";
  companies.appendChild(error);
}
function notfound() {
  let text = document.createElement("p");
  text.innerHTML = "Ekkert fyrirtæki fannst fyrir leitarstreng " + document.getElementsByTagName('input')[0].value;
  companies.appendChild(text);
}
function connectionfail() {
  let text = document.createElement("p");
  text.innerHTML = "error við að sækja gögn";
  companies.appendChild(text);
}

function loading() {
  let gif = document.createElement("img");
  let text = document.createElement("P");
  text.innerHTML = "Loading...";
  text.setAttribute("class", "loading")
  gif.setAttribute("src", "loading.gif");
  gif.setAttribute("class", "loading")
  text.appendChild(gif);
  companies.appendChild(text);
}

function makeElement(name,sn,active,address) {
  var div = document.createElement("div");
  if (active == 1) {div.setAttribute("class", "company company--active");}
  else {div.setAttribute("class", "company company--inactive");}
  var nafn = document.createElement("dt");
  nafn.innerHTML = "Nafn";
  var rettnafn = document.createElement("dd");
  rettnafn.innerHTML = name;
  var kennitala = document.createElement("dt");
  kennitala.innerHTML = "Kennitala";
  var rettkennitala = document.createElement("dd");
  rettkennitala.innerHTML = sn;
  var dl = document.createElement("dl");
  dl.appendChild(nafn);
  dl.appendChild(rettnafn);
  dl.appendChild(kennitala);
  dl.appendChild(rettkennitala);
  if(active == 1) {
    var heimilisfang = document.createElement("dt");
    heimilisfang.innerHTML = "Heimilisfang";
    var realheimilisfang = document.createElement("dd");
    realheimilisfang.innerHTML = address;
    dl.appendChild(heimilisfang);
    dl.appendChild(realheimilisfang);
  }
  div.appendChild(dl);
  companies.appendChild(div);
}
