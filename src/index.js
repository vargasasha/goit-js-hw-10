import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


input.addEventListener(
  'input',
  debounce(evt => {

    const trimmedValue = input.value.trim();
    cleanHtml();

    if (trimmedValue !== '') {

  
      fetchCountries(trimmedValue).then(result => {

        if (result.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );

                 } else if (result.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');

    
        } else if (result.length >= 2 && result.length <= 10) {

          showCountries(result);
          
        } else if (result.length === 1) {
          showCountry(result); 
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function showCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <p>${country.name.official}</p>
                </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function showCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <p>${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}