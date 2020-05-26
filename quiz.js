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

function drawRandomIndex() {
    min = Math.ceil(0);
    max = Math.floor(249);
    return Math.floor(Math.random() * (249 - 0 + 1)) + 0;
}
let counter = 0;

const startButton = document.querySelector(".startButton");
const imageAnswerContainer = document.querySelector(".imageAnswerContainer");
const quizInfoContainer = document.querySelector(".quizInfoContainer");

startButton.addEventListener("click", function () {

    let flagIndex = drawRandomIndex();
    let randomFirst = drawRandomIndex();
    let randomSecond = drawRandomIndex();


    if (counter > 0) {
        startButton.innerHTML = "Graj dalej!"
    }
    const drawFunction = () => {

        const createQuestion = () => {
            const quizFlag = document.createElement("img");
            imageAnswerContainer.appendChild(quizFlag);

            quizFlag.classList.add("flagImage");
            const flagSrc = document.querySelector(".flagImage");
            flagSrc.setAttribute("src", `${countryArray[flagIndex].flag}`);
        }
        createQuestion();

        let quizAnswers = [countryArray[flagIndex], countryArray[randomFirst], countryArray[randomSecond]];

        const sortByPopulation = (a, b) => {
            return a.population - b.population;
        }
        quizAnswers.sort(sortByPopulation);


        const propmt = document.createElement("p");
        imageAnswerContainer.appendChild(propmt);
        propmt.classList.add("proptStyle")
        propmt.innerHTML = "Click on your answer";
        startButton.innerHTML = "Draw!";

        quizAnswers.map(element => {
            const answerElement = document.createElement("p")
            imageAnswerContainer.appendChild(answerElement);
            answerElement.classList.add("answerElement")
            answerElement.innerHTML = element.name;

            answerElement.addEventListener("click", function () {
                if (element.name === countryArray[flagIndex].name) {
                    counter++;
                    alert("Correct!");
                    imageAnswerContainer.innerHTML = "";
                    createQuestion();
                    if (counter > 0) {
                        startButton.innerHTML = "Continue playing!";
                    }

                    if (counter === 3) {
                        alert("Congrats You win! You are good in this game!");
                        imageAnswerContainer.innerHTML = "";
                        counter = 0;
                        startButton.innerHTML = "Play once again!";
                    }
                } else {
                    counter = 0;
                    alert("You loose!");
                    startButton.innerHTML = "Play once again!";
                    imageAnswerContainer.innerHTML = "";
                }
            });
        });
    };

    if (imageAnswerContainer.childElementCount === 0) {
        drawFunction();
    } else {
        imageAnswerContainer.innerHTML = "";
        drawFunction();
    }
});