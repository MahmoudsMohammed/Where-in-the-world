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
let data;
// Display list of countries
function displayCountries(res) {
    let content = '';
    res.forEach((e) => {
        content += `
      <a class="box" id="${e.name.common}">
      <img src="${e.flags.png}" alt="" id="${e.name.common}"/>
      <div class="content" id="${e.name.common}">
        <h4 id="${e.name.common}">${e.name.common}</h4>
        <p id="${e.name.common}"><span id="${e.name.common}">Population: </span>${e.population}</p>
        <p id="${e.name.common}"><span id="${e.name.common}">Region: </span>${e.region}</p>
        <p id="${e.name.common}"><span id="${e.name.common}">Capital: </span>${e.capital}</p>
      </div>
    </a>
      `;
    });
    container.innerHTML = content;
}
/***********************************************************************************/
// fetch all countries when load the page
document.addEventListener('DOMContentLoaded', () => {
    getData().then((res) => {
        data = res;
        displayCountries(data);
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
        displayCountries(data);
    }
    else {
        let input = e.target.value, countries = [];
        data.forEach((e) => {
            if (e.name.common.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                countries.push(e);
            }
        });
        if (countries.length === 0) {
            message.style.display = 'block';
        }
        else {
            message.style.display = 'none';
            displayCountries(countries);
        }
    }
});
/***********************************************************************************/
// Get Countries By Region
document.querySelector('.search').addEventListener('click', (e) => {
    if (e.target.classList.contains('region')) {
        if (e.target.innerHTML.toLocaleLowerCase() === 'all') {
            displayCountries(data);
        }
        else {
            let region = e.target.innerHTML.toLocaleLowerCase(), 
            // array contain all countries object have same region
            countries = [];
            data.forEach((e) => {
                if (e.region.toLocaleLowerCase() === region) {
                    countries.push(e);
                }
            });
            displayCountries(countries);
        }
    }
});
/***********************************************************************************/
// Convert Mode To Dark
document.getElementById('mode').addEventListener('click', (e) => {
    // change variables values
    document.body.classList.toggle('dark-mode');
    document.getElementById('moon').classList.toggle('fa-solid');
});
/***********************************************************************************/
// display single country
function displayCountry(name) {
    let singleCountry;
    data.forEach((e) => {
        if (e.name.common === name) {
            singleCountry = e;
        }
    });
    // loop over borders Array if exsist in Selected Country
    let borders = '';
    if (singleCountry.borders !== undefined) {
        singleCountry.borders.forEach((e) => {
            borders += `<span id="border" style="cursor:pointer">${e}</span>`;
        });
    }
    // loop over languages object
    let languages = '';
    for (let x in singleCountry.languages) {
        languages += `
            <span>${x}</span>
            `;
    }
    // loop over currencies object
    let currencies = '';
    for (let x in singleCountry.currencies) {
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
              <img src="${singleCountry.flags.png}" alt="" />
            </div>
            <div class="content">
              <p>${singleCountry.name.common}</p>
              <div class="info">
                <div class="boxe">
                  <p>Native Name: <span>${singleCountry.name.common}</span></p>
                  <p>Population: <span>${singleCountry.population}</span></p>
                  <p>Region: <span>${singleCountry.region}</span></p>
                  <p>Sub Region: <span>${singleCountry.subregion}</span></p>
                  <p>Capital: <span>${singleCountry.capital}</span></p>
                </div>
                <div class="boxe">
                  <p>Top Level Domain: <span>${singleCountry.tld}</span></p>
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
}
// make event on single country to display it's page
document.querySelector('.countries-row').addEventListener('click', (e) => {
    // Get Country Name From The Box
    let name = '';
    if (e.target.id !== '') {
        name = e.target.id;
    }
    // Make request and get country data
    if (name !== '') {
        displayCountry(name);
    }
});
/***********************************************************************************/
// go to country from border countries
country.addEventListener('click', (e) => {
    if (e.target.id === 'border') {
        console.log(data[0].cca3);
    }
});
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
