"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Select UI Elements
const container = document.querySelector('.countries-row'), input = document.getElementById('search'), message = document.getElementById('message'), country = document.querySelector('.country');
/***********************************************************************************/
// fetch all countries when load the page
document.addEventListener('DOMContentLoaded', () => {
    getData().then((res) => {
        let content = '';
        res.forEach((e) => {
            content += `
      <a  class="box">
      <img src="${e.flags.png}" alt="" />
      <div class="content">
        <h4>${e.name.common}</h4>
        <p><span>Population: </span>${e.population}</p>
        <p><span>Region: </span>${e.region}</p>
        <p><span>Capital: </span>${e.capital}</p>
      </div>
    </a>
      `;
        });
        container.innerHTML = content;
    });
});
// Get Data From API
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://restcountries.com/v3.1/all');
        let countries = yield response.json();
        return countries;
    });
}
/***********************************************************************************/
// Search For Country
input.addEventListener('keyup', (e) => {
    if (e.target.value === '') {
        // if input is empty add all countries to the container
        getData().then((res) => {
            // disappear message from UI
            message.style.display = 'none';
            let content = '';
            res.forEach((e) => {
                content += `
        <a class="box">
        <img src="${e.flags.png}" alt="" />
        <div class="content">
          <h4>${e.name.common}</h4>
          <p><span>Population: </span>${e.population}</p>
          <p><span>Region: </span>${e.region}</p>
          <p><span>Capital: </span>${e.capital}</p>
        </div>
      </a>
        `;
            });
            container.innerHTML = content;
        });
    }
    else {
        // There is value in the input field
        getCountry(e.target.value).then((selected) => {
            // Display message if there is no country with entered name
            if (selected.message === 'Not Found') {
                message.style.display = 'block';
            }
            else {
                message.style.display = 'none';
                let content = '';
                selected.forEach((e) => {
                    content += `
          <a class="box">
          <img src="${e.flags.png}" alt="" />
          <div class="content">
            <h4>${e.name.common}</h4>
            <p><span>Population: </span>${e.population}</p>
            <p><span>Region: </span>${e.region}</p>
            <p><span>Capital: </span>${e.capital}</p>
          </div>
        </a>
          `;
                });
                container.innerHTML = content;
            }
        });
    }
});
// Get Countries With The same Name
function getCountry(inp) {
    return __awaiter(this, void 0, void 0, function* () {
        // Every key-down make a request
        let response = yield fetch(`https://restcountries.com/v3.1/name/${inp}
  `);
        let selectedCountries = yield response.json();
        return selectedCountries;
    });
}
/***********************************************************************************/
// Get Countries By Region
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('region')) {
        if (e.target.innerHTML.toLocaleLowerCase() === 'all') {
            getData().then((data) => {
                let content = '';
                data.forEach((e) => {
                    content += `
          <a class="box">
          <img src="${e.flags.png}" alt="" />
          <div class="content">
            <h4>${e.name.common}</h4>
            <p><span>Population: </span>${e.population}</p>
            <p><span>Region: </span>${e.region}</p>
            <p><span>Capital: </span>${e.capital}</p>
          </div>
        </a>
          `;
                });
                container.innerHTML = content;
            });
        }
        else {
            getByRegion(e.target.innerHTML.toLocaleLowerCase()).then((data) => {
                let content = '';
                data.forEach((e) => {
                    content += `
        <a class="box">
        <img src="${e.flags.png}" alt="" />
        <div class="content">
          <h4>${e.name.common}</h4>
          <p><span>Population: </span>${e.population}</p>
          <p><span>Region: </span>${e.region}</p>
          <p><span>Capital: </span>${e.capital}</p>
        </div>
      </a>
        `;
                });
                container.innerHTML = content;
            });
        }
    }
});
// Fetch Country By Selected Region
function getByRegion(region) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://restcountries.com/v3.1/region/${region}`);
        let countries = response.json();
        return countries;
    });
}
/***********************************************************************************/
// Convert Mode To Dark
document.getElementById('mode').addEventListener('click', (e) => {
    // change variables values
    document.body.classList.toggle('dark-mode');
    document.getElementById('moon').classList.toggle('fa-solid');
});
/***********************************************************************************/
// make event on single country to display it's page
document.addEventListener('click', (e) => {
    // Get Country Name From The Box
    let name = '';
    // click on img or content div
    if (e.target.parentElement.classList.contains('box')) {
        // click on content div
        if (e.target.classList.contains('content')) {
            name = e.target.firstElementChild
                .innerHTML;
        }
        else {
            // click on img
            name = e.target.nextElementSibling
                .firstElementChild.innerHTML;
        }
    }
    else if (
    // click on content div elements
    e.target.parentElement
        .parentElement.classList.contains('box')) {
        name = e.target.parentElement
            .firstElementChild.innerHTML;
    }
    else if (e.target.parentElement
        .parentElement.parentElement.classList.contains('box')) {
        name = e.target.parentElement
            .parentElement.firstElementChild.innerHTML;
    }
    // Make request and get country data
    if (name !== '') {
        getCountryByFullName(name).then((data) => {
            data = data[0];
            // loop over borders Array if exsist in Selected Country
            let borders = '';
            if (data.borders !== undefined) {
                data.borders.forEach((e) => {
                    borders += `<span>${e}</span>`;
                });
            }
            // loop over languages object
            let languages = '';
            for (let x in data.languages) {
                languages += `
          <span>${x}</span>
          `;
            }
            // loop over currencies object
            let currencies = '';
            for (let x in data.currencies) {
                currencies += `
        <span>${x}</span>
        `;
            }
            // create html and inject data from API
            let content = `
        <div class="container">
        <button id="back">
          <i class="fa-solid fa-arrow-left me-2"></i> <span>Back</span>
        </button>
        <div class="country-container my-5">
          <div class="image">
            <img src="${data.flags.png}" alt="" />
          </div>
          <div class="content">
            <p>${data.name.common}</p>
            <div class="info">
              <div class="boxe">
                <p>Native Name: <span>${data.name.common}</span></p>
                <p>Population: <span>${data.population}</span></p>
                <p>Region: <span>${data.region}</span></p>
                <p>Sub Region: <span>${data.subregion}</span></p>
                <p>Capital: <span>${data.capital}</span></p>
              </div>
              <div class="boxe">
                <p>Top Level Domain: <span>${data.tld}</span></p>
                <p>Currencies: ${currencies}</p>
                <p>Languages: ${languages}</p>
              </div>
            </div>
            <div class="bord-countries mt-5">
              <p>Border Countries:</p>
              <div>${borders}</div>
            </div>
          </div>
        </div>
      </div>
        `;
            country.innerHTML = content;
            container.style.display = 'none';
            document.querySelector('.search').style.display = 'none';
            country.style.display = 'block';
        });
    }
});
// Get Country Data
function getCountryByFullName(inp) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`https://restcountries.com/v3.1/name/${inp}?fullText=true
  `);
        let selectedCountries = yield response.json();
        return selectedCountries;
    });
}
/***********************************************************************************/
// Listen For Back button
document.addEventListener('click', (e) => {
    if (e.target.parentElement.id === 'back' ||
        e.target.id === 'back') {
        country.style.display = 'none';
        container.style.display = 'grid';
        document.querySelector('.search').style.display = 'block';
    }
});
/***********************************************************************************/
