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
    tomurStrengur();
  }
  else {
    let APIS_URL = 'https://apis.is/company?name=';
    APIS_URL += inntaksgildi;
    vinna();
    fetch(APIS_URL)
        .then(result => {
          if (!result.ok) {
            throw new Error('Non 200 status');
          }
          return result.json();
        })
        .then(data => {
          if(data.results.length == 0) {fannstEkki();}
          for(let i = 0; i < data.results.length; i++){
            const{name, sn, active, address} = data.results[i];
            elementMaking(name,sn,active,address);
          }

        })
        .then(() => companies.removeChild(companies.firstChild))
        .catch(error => {
          companies.removeChild(companies.firstChild);
          tengingMistokst();
          console.error(error);
        })
  }
}, false);

function elementMaking(name,sn,active,address) {
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

function vinna() {
  let gif = document.createElement("img");
  let text = document.createElement("P");
  text.innerHTML = "vinna...";
  text.setAttribute("class", "vinna")
  gif.setAttribute("src", "vinna.gif");
  gif.setAttribute("class", "vinna")
  text.appendChild(gif);
  companies.appendChild(text);
}

function tomurStrengur() {
  var error = document.createElement("p");
  error.innerHTML = "Fyrirtæki má ekki vera autt";
  companies.appendChild(error);
}

function tengingMistokst() {
  let text = document.createElement("p");
  text.innerHTML = "error við að sækja gögn";
  companies.appendChild(text);
}

function fannstEkki() {
  let text = document.createElement("p");
  text.innerHTML = "Ekkert fyrirtæki fannst fyrir leitarstreng " + document.getElementsByTagName('input')[0].value;
  companies.appendChild(text);
}


