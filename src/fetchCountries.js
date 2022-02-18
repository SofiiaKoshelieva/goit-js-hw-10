export { fetchCountries };

 const param = new URLSearchParams({
        fields: "capital,flags,languages,name,population",
    });

 function fetchCountries(name){
     return fetch(`https://restcountries.com/v3.1/name/${name}?${param}`)
         .then(response => {
             if (!response.ok) {
                  throw new Error(response.status);
             }
              return response.json();
         }
        )
 }

