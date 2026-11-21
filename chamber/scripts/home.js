const menuBtn =document.querySelector("#menu-button");
const primaryNav =document.querySelector("#primary-nav");

menuBtn.addEventListener("click",() => {
    primaryNav.classList.toggle("open");
});

const apiKey ="b8e98d4003c83ee5d1b4e6bb39f1731a ";
const lat = -178252;
const lon = 31.0335;

async function api(fetch) {

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey};`
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey};`

        try {
            const response = await fetch(currentWeatherUrl);
            if (response.ok) {
                const data = await response.json();
                displayCurrentWeather(data);
            } else {
                throw Error(await response.text());
            }

            const forecastResponse = await fetch(forecastUrl);
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData);
            } else {
                throw Error(await forecastResponse.text());
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    
}
function displayCurrentWeather(data) {
    const currentTemp = document.querySelector("#current-temp");
    const weatherDesc = document.querySelector("#weather-desc");
    const weatherIcon = document.querySelector("#weather-icon");

    currentTemp.innerHTML + Math.round5(data.main.temp);
    const desc = data.weather[0].description;
    weatherDesc.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
    const iconCode = data.weather[0].icon;
    weatherIcon.setAttribute("src", ``)
    weatherIcon.setAttribute("alt", desc);
}
function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast-container");
    forecastContainer.innerHTML = " ";

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,3);
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US' , {weekday: 'short'});

        const dayEl =  document.createElement("p");
        dayEl.innerHTML = `<strong>${dayName}:</strong> ${Math.round(day.main.temp)}&deg;C`;
        forecastContainer.appendChild(dayEl);
    });
}
async function getSpotlightMember() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to load members JSON");
        const data = await response.json();

        const qualifiedMembers = data.members.filter(m => m.membershipLevel >= 2);

        const selectedMembers = getRandomMembers(qualifiedMembers, 3);
        displaySpotlights(selectedMembers);
     } catch (error) {
        console.error("Error loading spotlight members:", error);

     }
}
function getRandomMembers(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
function displaySpotlights(members){
    const spotlightContainer = document.querySelector("#spotlight-container");
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
        <img src = "images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h4>${member.name}</h4>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a>
        `;
        spotlightContainer.appendChild(card);
    });
}
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;



getSpotlightMember();
apiFetch();

