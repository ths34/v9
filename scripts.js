
const API_URL = 'https://apis.is/isnic?domain=';


const program = (() => {
  let input;
  let results;
  let domains;

  function fetchResults(site) {
    input=site;
    fetch(`${API_URL}${site}`)
      .then((data) => {
        if (data.ok) {
          return data.json();
          debugger;
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        showResults(data.results);
      })
      .catch((error) => {
    showMessage('Villa!');

  })


  }
  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');


    fetchResults(input.value);
    showLoading(); 

  }

  function init(_domains) {
    domains=_domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);

    input = form.querySelector('form');
    results = domains.querySelector('.results');


  }


  function showLoading() {
    const img = el('img');
    img.setAttribute('alt', 'loading gif');
    img.setAttribute('scr', 'loading.gif');

    const imageDiv = el('div');
    imageDiv.classList.add('loading');
    imageDiv.appendChild(img);
    results.appendChild(imageDiv);
  }

  function showMessage(error) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));

  }

  function showResults(sites) {
    if (sites.length ===0) {
      showMessage('Villa við að sækja gögn');
      return;
    }
     
    const [{domain, registered, expires, registrantname, address, country , email, lastChange }] = sites;

    const dl = document.createElement('dl');

    const netdomain = document.createElement('dt');
    netdomain.appendChild(document.createTextNode('Lén'));
    dl.appendChild(netdomain);

    const netvaluedomain = document.createElement('dd');
    netvaluedomain.appendChild(document.createTextNode(domain));
    dl.appendChild(netvaluedomain);
    
    const registerednet = document.createElement('dt');
    registerednet.appendChild(document.createTextNode('Skráð'));
    dl.appendChild(registerednet);

    const registeredValue = document.createElement('dd');
    registeredValue.appendChild(document.createTextNode(registered));
    dl.appendChild(registeredValue);
    
    const lastChangenet = document.createElement('dt');
    lastChangenet.appendChild(document.createTextNode('Seinast breytt'));
    dl.appendChild(lastChangenet);

    const lastChangeValuenet = document.createElement('dd');
    lastChangeValuenet.appendChild(document.createTextNode(lastChange));
    dl.appendChild(lastChangeValuenet);

    const netexpires = document.createElement('dt');
    netexpires.appendChild(document.createTextNode('Rennur út'));
    dl.appendChild(netexpires);

    const expiresValue = document.createElement('dd');
    expiresValue.appendChild(document.createTextNode(expires));
    dl.appendChild(expiresValue);


    const netregistrantname = document.createElement('dt');
    netregistrantname.appendChild(document.createTextNode('Skráningaraðili'));
    dl.appendChild(netregistrantname);

    const netregistrantnameValue = document.createElement('dd');
    netregistrantnameValue.appendChild(document.createTextNode(registrantname));
    dl.appendChild(netregistrantnameValue);

    const netemail = document.createElement('dt');
    netemail.appendChild(document.createTextNode('Netfang'));
    dl.appendChild(netemail);

    const netemailValue = document.createElement('dd');
    netemailValue.appendChild(document.createTextNode(email));
    dl.appendChild(netemailValue);

    const netAddress = document.createElement('dt');
    netAddress.appendChild(document.createTextNode('Heimilisfang'));
    dl.appendChild(netAddress);

    const addressValue = document.createElement('dd');
    addressValue.appendChild(document.createTextNode(address));
    dl.appendChild(addressValue);

    
    const netCountry = document.createElement('dt');
    netCountry.appendChild(document.createTextNode('Land'));
    dl.appendChild(netCountry);

    const countryValue = document.createElement('dd');
    countryValue.appendChild(document.createTextNode(country));
    dl.appendChild(countryValue);


    const container = domains.querySelector('.results');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(dl);

}
   

return {
  init,
};
}) ();

document.addEventListener('DOMContentLoaded', () => {
  domains = document.querySelector('.domains');
  program.init(domains);
});
