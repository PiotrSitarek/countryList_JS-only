document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")

    fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => response.json())
        .then(response => createCountryList(response))
        .catch(error => console.log(error));

    let countryArray = [];

    const createCountryList = (response) => {
        response.forEach(function (element) {
            countryArray.push(element)
        });
    };


    const mainContainer = document.querySelector(".mainContainer"); // głowny przy którym trzeba stworzyć 2 divy

    const countryList = document.createElement("ul"); // czerwony
    countryList.classList.add("countryList"); // style czerwonego

    const countryInfo = document.createElement("div"); // niebieski
    countryInfo.classList.add("infoContainer"); // style niebieskiego

    const displayButton = document.querySelector(".displayButton"); // złapanie buttonu Display

    displayButton.addEventListener("click", function () {

        mainContainer.appendChild(countryInfo); //utworzenie niebieskiego
        const infoContainer = document.querySelector(".infoContainer"); // złapanie niebieskiego

        mainContainer.appendChild(countryList); // utworzenie czerwonego
        const countryUL = document.querySelector(".countryList"); // złapanie czerwonego

        countryArray.map(element => {

            const newListElement = document.createElement("li");
            countryUL.appendChild(newListElement);
            newListElement.innerHTML = element.name;

            const dataDisplay = () => {

                const flag = document.createElement("img");
                const countryName = document.createElement("h3");
                const capital = document.createElement("p");
                const region = document.createElement("p");
                const population = document.createElement("p");

                infoContainer.appendChild(flag);
                infoContainer.appendChild(countryName);
                infoContainer.appendChild(capital);
                infoContainer.appendChild(region);
                infoContainer.appendChild(population);


                flag.classList.add("flagImage");
                const flagSrc = document.querySelector(".flagImage");
                flagSrc.setAttribute("src", `${element.flag}`);
                countryName.innerHTML = element.name;
                capital.innerHTML = "Capital: " + element.capital;
                region.innerHTML = "Region: " + element.subregion;
                population.innerHTML = "Population: " + element.population;

            }

            newListElement.addEventListener("click", function () {
                if (infoContainer.childElementCount === 0) {
                    dataDisplay();
                } else {
                    infoContainer.innerHTML = "";
                    dataDisplay();
                }
            });
        });
    });
});