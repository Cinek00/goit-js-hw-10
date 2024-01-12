// index.js
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

// funkcja aktualizująca UI listą krajów
const updateCountryList = (countries) => {
  const countryListElement = document.querySelector('.country-list');
  countryListElement.innerHTML = '';

  countries.forEach((country) => {
    const listItem = document.createElement('li');
    listItem.style.listStyle = 'none'; // Usunięcie kropek z listy
    listItem.style.marginBottom = '10px'; // Dodanie odstępu między elementami listy

    const flagImage = document.createElement('img');
    flagImage.src = country.flag;
    flagImage.alt = `Flaga ${country.officialName}`;
    flagImage.style.width = '20px'; // Ustawienie szerokości obrazka flagi
    flagImage.style.height = '15px'; // Ustawienie wysokości obrazka flagi
    flagImage.style.marginRight = '10px'; // Dodanie marginesu prawego dla obrazka flagi

    listItem.appendChild(flagImage);
    listItem.appendChild(document.createTextNode(country.officialName));
    countryListElement.appendChild(listItem);
  });
};

// funkcja aktualizująca UI informacjami o kraju
const updateCountryInfo = (country) => {
  const countryInfoElement = document.querySelector('.country-info');
  countryInfoElement.innerHTML = '';

  if (!country) return; // Jeśli nie ma danych kraju, nie aktualizuj interfejsu użytkownika.

  const { officialName, capital, population, flag, languages } = country;

  countryInfoElement.innerHTML = `
    <h2>${officialName}</h2>
    <p>Stolica: ${capital}</p>
    <p>Populacja: ${population.toLocaleString()}</p>
    <img src="${flag}" alt="Flaga ${officialName}" />
    <p>Języki: ${languages}</p>
  `;
};

// główna funkcja wyszukiwania krajów
const searchCountries = debounce(() => {
  const searchBox = document.getElementById('search-box');
  const searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    updateCountryList([]);
    updateCountryInfo(null);
    return;
  }

  fetchCountries(searchTerm)
    .then(countries => {
      updateCountryList(countries);
      updateCountryInfo(countries[0] || null);
    })
    .catch(error => console.error('Error fetching countries:', error));
}, 300);

// nasłuch na zdarzenie 'input' na polu wyszukiwania
document.getElementById('search-box').addEventListener('input', searchCountries);