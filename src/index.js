// import funkcji fetchCountries z osobnego pliku
import { fetchCountries } from './fetchCountries.js';

// funkcja aktualizująca UI listą krajów
const updateCountryList = (countries) => {
  const countryListElement = document.querySelector('.country-list');
  countryListElement.innerHTML = ''; // czyszczenie listy przed dodaniem nowych elementów

  // tworzenie elementów listy dla każdego kraju
  countries.forEach((country) => {
    const listItem = document.createElement('li');
    listItem.textContent = country;
    countryListElement.appendChild(listItem);
  });
};

// funkcja wyszukiwania krajów
const searchCountries = () => {
  const searchBox = document.getElementById('search-box');
  const searchTerm = searchBox.value.trim();

  if (searchTerm) {
    fetchCountries(searchTerm)
      .then(countries => {
        updateCountryList(countries);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  } else {
    // jeśli pole wyszukiwania jest puste, czyści listę krajów
    updateCountryList([]);
  }
};

// nasłuch na zdarzenie 'input' na polu wyszukiwania
document.getElementById('search-box').addEventListener('input', searchCountries);