// Select UI Elements
const container = document.querySelector('.countries-row') as HTMLElement,
  input = document.getElementById('search') as HTMLInputElement,
  message = document.getElementById('message') as HTMLInputElement;

// fetch all countries when load the page
document.addEventListener('DOMContentLoaded', () => {
  getData().then((res) => {
    let content = '';
    res.forEach((e) => {
      content += `
      <div class="box">
      <img src="${e.flags.png}" alt="" />
      <div class="content">
        <h4>${e.name.common}</h4>
        <p><span>Population: </span>${e.population}</p>
        <p><span>Region: </span>${e.region}</p>
        <p><span>Capital: </span>${e.capital}</p>
      </div>
    </div>
      `;
    });
    container.innerHTML = content;
  });
});

// Get Data From API
async function getData() {
  let response = await fetch('https://restcountries.com/v3.1/all');
  let countries = await response.json();
  return countries;
}

// Search For Country
input.addEventListener('keyup', (e) => {
  if ((e.target as HTMLInputElement).value === '') {
    // if input is empty add all countries to the container
    getData().then((res) => {
      // disappear message from UI
      message.style.display = 'none';
      let content = '';
      res.forEach((e) => {
        content += `
        <div class="box">
        <img src="${e.flags.png}" alt="" />
        <div class="content">
          <h4>${e.name.common}</h4>
          <p><span>Population: </span>${e.population}</p>
          <p><span>Region: </span>${e.region}</p>
          <p><span>Capital: </span>${e.capital}</p>
        </div>
      </div>
        `;
      });
      container.innerHTML = content;
    });
  } else {
    // There is value in the input field
    getCountry((e.target as HTMLInputElement).value).then((selected) => {
      // Display message if there is no country with entered name
      if (selected.message === 'Not Found') {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
        let content = '';
        selected.forEach((e) => {
          content += `
          <div class="box">
          <img src="${e.flags.png}" alt="" />
          <div class="content">
            <h4>${e.name.common}</h4>
            <p><span>Population: </span>${e.population}</p>
            <p><span>Region: </span>${e.region}</p>
            <p><span>Capital: </span>${e.capital}</p>
          </div>
        </div>
          `;
        });
        container.innerHTML = content;
      }
    });
  }
});

// Get Countries With The same Name
async function getCountry(inp: string) {
  // Every key-down make a request
  let response = await fetch(`https://restcountries.com/v3.1/name/${inp}
  `);
  let selectedCountries = await response.json();
  return selectedCountries;
}

// Get Countries By Region
document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).classList.contains('region')) {
    if ((e.target as HTMLElement).innerHTML.toLocaleLowerCase() === 'all') {
      getData().then((data) => {
        let content = '';
        data.forEach((e) => {
          content += `
          <div class="box">
          <img src="${e.flags.png}" alt="" />
          <div class="content">
            <h4>${e.name.common}</h4>
            <p><span>Population: </span>${e.population}</p>
            <p><span>Region: </span>${e.region}</p>
            <p><span>Capital: </span>${e.capital}</p>
          </div>
        </div>
          `;
        });
        container.innerHTML = content;
      });
    } else {
      getByRegion((e.target as HTMLElement).innerHTML.toLocaleLowerCase()).then(
        (data) => {
          let content = '';
          data.forEach((e) => {
            content += `
        <div class="box">
        <img src="${e.flags.png}" alt="" />
        <div class="content">
          <h4>${e.name.common}</h4>
          <p><span>Population: </span>${e.population}</p>
          <p><span>Region: </span>${e.region}</p>
          <p><span>Capital: </span>${e.capital}</p>
        </div>
      </div>
        `;
          });
          container.innerHTML = content;
        }
      );
    }
  }
});

// Fetch Country By Selected Region
async function getByRegion(region: string) {
  let response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  let countries = response.json();
  return countries;
}

// Convert Mode To Dark
(document.getElementById('mode') as HTMLElement).addEventListener(
  'click',
  (e) => {
    document.body.classList.toggle('dark-mode');
    (document.getElementById('moon') as HTMLElement).classList.toggle(
      'fa-solid'
    );
  }
);
