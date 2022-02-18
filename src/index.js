import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    console.log(e.target.value.trim());
    const inputValue = e.target.value.trim();
    cleanPage()
    if (!inputValue) {
        return;
    }
     fetchCountries(inputValue)
        .then(data => {
            if (data.length > 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name!!!');
            } else if (data.length > 1) {
                console.log(data);
                const cardsMarkup = markup(data);
                return countryList.insertAdjacentHTML('beforeend', cardsMarkup);
            }
            console.log(data);
            return countryInfo.insertAdjacentHTML('beforeend', createCardMarkup(data));
        })
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}
function markup(data) {
    return data.map(({ flags, name }) => {
        return `
                <li class="list_item">
                    <img class="flag"
                        src="${flags.png}"
                        alt="${name.common}"
                        width="40"
                    />
                    <p class="description">${name.common}</p>
                </li>
                `;
    }).join('');
};
function createCardMarkup(data) {
    const { capital, flags, languages, name, population } = data[0]; 
    const capitalCities = capital.join(", "); 
    const languagesList = Object.values(languages).join(", "); 
    return `
                <div class="list_item">
                    <img class="flag"
                        src="${flags.png}"
                        alt="${name.common}"
                        width="70"
                    />
                    <h3 class="name">${name.official}</h3>
                </div>
               <p class="descr"><span class="description">Capital:</span> ${capitalCities}</p>
                <p class="descr"><span class="description">Population:</span> ${population}</p>
                <p class="descr"><span class="description">Languages:</span> ${languagesList}</p>
            `;
};

function cleanPage() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};
