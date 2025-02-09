let allCountries = [];

const apiURL = 'https://restcountries.com/v3.1/all';

async function getCountries() {
    try {
        const response = await fetch(apiURL);
        const countries = await response.json();
        allCountries = countries;
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function displayCountries(countries) {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');

        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : 'No capital';
        const flag = country.flags.svg;

        countryDiv.innerHTML = `
            <img src="${flag}" alt="Flag of ${countryName}">
            <h2>${countryName}</h2>
            <p>Capital: ${capital}</p>
        `;

        countryList.appendChild(countryDiv);
    });
}

function searchCountries() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchInput)
    );

    displayCountries(filteredCountries);
}

getCountries();
