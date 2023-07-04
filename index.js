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
    heightInCM: 0,
    weightInKG: 0,
    heightInFeet: 0,
    heightInInch: 0,
    weightInSt: 0,
    weightInLbs: 0,
    isMetric: true,
    calculateMetricBMI: function () {
        const heightToMeter = this.heightInCM / 100;
        return (this.weightInKG / Math.pow(heightToMeter, 2)).toFixed(1); // return: str
    },
    calculateImperialBMI: function () {
        const totalInches = (this.heightInFeet * 12) + this.heightInInch;
        const totalLbs = (this.weightInSt * 14) + this.weightInLbs;
        return (totalLbs / Math.pow(totalInches, 2) * 703).toFixed(1); // return str
    },
    idealWeightinKG: function () {
        const minWeight = (Math.pow(this.heightInCM / 100, 2) * minBMI).toFixed(1);
        const maxWeight = (Math.pow(this.heightInCM / 100, 2) * maxBMI).toFixed(1);
        return [minWeight, maxWeight]; // return: [str, ...]
    },
    idealWeightImperial: function () {
        const totalMinWeight = (Math.pow(((this.heightInFeet * 12) + this.heightInInch), 2) * minBMI / 703);
        const totalMaxWeight = (Math.pow(((this.heightInFeet * 12) + this.heightInInch), 2) * maxBMI / 703);
        const minWeightSt = Math.floor((totalMinWeight / 14));
        const minWeightLbs = Math.floor((totalMinWeight % 14));
        const maxWeightSt = Math.floor((totalMaxWeight / 14));
        const maxWeightLbs = Math.floor((totalMaxWeight % 14));
        return [minWeightSt, minWeightLbs, maxWeightSt, maxWeightLbs];
    },
    resetInput: function () {
        for (const el of numberInputList) {
            el.value = "";
            usersInfo[el.id] = 0;
        }
        document.querySelector("#greeting").innerHTML = "Welcome!";
        resultSummaryContainerEl.classList.remove("activated");
    }
};

function bmiDescription(bmi) {
    let bmiStatus;
    if (bmi < minBMI) bmiStatus = "under weight";
    else if (bmi <= maxBMI) bmiStatus = "healthy weight";
    else if (bmi <= 29.9) bmiStatus = "over weight";
    else if (bmi <= 34.9) bmiStatus = "obese";
    else bmiStatus = "extremely obese";

    if (usersInfo.isMetric)
        return `Your BMI suggests you're a <strong>${bmiStatus}</strong>. Your ideal weight is between <strong>${usersInfo.idealWeightinKG()[0]}kgs - ${usersInfo.idealWeightinKG()[1]}kgs.</strong>`;
    else
        return `Your BMI suggests you're a <strong>${bmiStatus}</strong>. Your ideal weight is between <strong>${usersInfo.idealWeightImperial()[0]}st ${usersInfo.idealWeightImperial()[1]}lbs - ${usersInfo.idealWeightImperial()[2]}st ${usersInfo.idealWeightImperial()[3]}lbs.</strong>`;

}

for (const element of numberInputList) {
    element.addEventListener("focusout",
        function (e) {
            const whatInfo = e.target.id;
            const infoId = `#${e.target.id}`;
            usersInfo[whatInfo] = document.querySelector(infoId).valueAsNumber;
            // Metric Scale
            if (usersInfo.heightInCM && usersInfo.weightInKG) {
                resultSummaryContainerEl.classList.add("activated");
                const bmiScore = usersInfo.calculateMetricBMI();
                document.querySelector("#greeting").innerHTML = "Your BMI is ...";
                usersBMIScoreEl.innerHTML = bmiScore;
                usersBMISummary.innerHTML = bmiDescription(Number(bmiScore));
            };
            // Imperial Scale
            if (usersInfo.heightInInch && usersInfo.weightInLbs) {
                resultSummaryContainerEl.classList.add("activated");
                const bmiScore = usersInfo.calculateImperialBMI();
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
            chosenRadio === "metric" ? usersInfo.isMetric = true : usersInfo.isMetric = false;
            if (chosenRadio !== lastClass) {
                bmiForm.classList.remove(lastClass);
                bmiForm.classList.add(chosenRadio);
                usersInfo.resetInput();
            }
        })
}








