const bmiForm = document.querySelector(".users-info");
const resultSummaryContainerEl = document.querySelector(".result-summary__container");
const usersHeightCMEl = document.querySelector("#heightInCM");
const usersWeightKGEl = document.querySelector("#weightInKG");
const numberInputList = document.querySelectorAll("input[type='number']");
const radioInputList = document.querySelectorAll("input[type='radio']");
const usersBMIScoreEl = document.querySelector("#bmi-score");
const usersBMISummary = document.querySelector("#bmi-summary");
const minBMI = 18.5;
const maxBMI = 24.9;

const usersInfo = {
    heightInCM: null,
    weightInKG: null,
    calculateMetricBMI: function () {
        const heightToMeter = this.heightInCM / 100;
        return (this.weightInKG / Math.pow(heightToMeter, 2)).toFixed(1); // return: str
    },
    idealWeightinKG: function () {
        const minWeight = (Math.pow(this.heightInCM / 100, 2) * minBMI).toFixed(1);
        const maxWeight = (Math.pow(this.heightInCM / 100, 2) * maxBMI).toFixed(1);
        return [minWeight, maxWeight]; // return: [str, ...]
    }
};

function bmiDescription(bmi) {
    let bmiStatus;
    if (bmi < minBMI) bmiStatus = "under weight";
    else if (bmi <= maxBMI) bmiStatus = "healthy weight";
    else if (bmi <= 29.9) bmiStatus = "over weight";
    else if (bmi <= 34.9) bmiStatus = "obese";
    else bmiStatus = "extremely obese";
    return `Your BMI suggests you're a <strong>${bmiStatus}</strong>. Your ideal weight is between <strong>${usersInfo.idealWeightinKG()[0]}kgs - ${usersInfo.idealWeightinKG()[1]}kgs.</strong>`;
}

for (const element of numberInputList) {
    element.addEventListener("focusout",
        function (e) {
            const whatInfo = e.target.id;
            const infoId = `#${e.target.id}`;
            usersInfo[whatInfo] = document.querySelector(infoId).valueAsNumber;
            if (usersInfo.heightInCM && usersInfo.weightInKG) {
                resultSummaryContainerEl.classList.add("activated");
                const bmiScore = usersInfo.calculateMetricBMI();
                document.querySelector("#greeting").innerHTML = "Your BMI is ...";
                usersBMIScoreEl.innerHTML = bmiScore;
                usersBMISummary.innerHTML = bmiDescription(Number(bmiScore));
            };
        }
    );
};

for (const radio of radioInputList) {
    radio.addEventListener("click",
        function (e) {
            const lastClass = bmiForm.classList[1];
            const chosenRadio = e.target.id;
            bmiForm.classList.remove(lastClass);
            bmiForm.classList.add(chosenRadio);
        })
}








