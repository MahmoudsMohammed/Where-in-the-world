// Select UI Elements
const container = document.querySelector('.countries-row') as HTMLElement,
  input = document.getElementById('search') as HTMLInputElement;

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
