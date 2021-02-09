document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
});

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

// console.log(countryArray);
const mainContainer = document.querySelector(".mainContainer");

const countryList = document.createElement("ul");
countryList.classList.add("countryList");

const countryInfo = document.createElement("div");
countryInfo.classList.add("infoContainer");

const displayButton = document.querySelector(".displayButton");

displayButton.addEventListener("click", function () {

    displayButton.setAttribute("disabled", "true")

    mainContainer.appendChild(countryInfo);
    const infoContainer = document.querySelector(".infoContainer");

    mainContainer.appendChild(countryList);
    const countryUL = document.querySelector(".countryList");

    countryArray.map(element => {

        const newListElement = document.createElement("li");
        countryUL.appendChild(newListElement);
        newListElement.classList.add("newListElement")
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