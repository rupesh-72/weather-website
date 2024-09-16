const search = document.getElementById('search')
const API_KEY = '2reOkMDrpnJ4phfAAKOhJDpyAW8tk4iI'

search.addEventListener('click', function(e){
    e.preventDefault()
    const location = document.getElementById('location')
    if(location.value === '' || !isNaN(location.value)){
        notFound()
    }else{
        getLocationKey(location.value)
    }
})

function getLocationKey(location){
    const locationKey = `http://dataservice.accuweather.com/locations/v1/cities/search/?apikey=${API_KEY}&q=${location}`

    fetch(locationKey)
    .then((response) => {
        if(!response.ok){
            alert(`Network API Error : ${response.status}`)
        }
        return response.json()
    })
    .then((key) => {
        if(key.length == 0){
            notFound()
        }else{
            getWeather(key[0].Key)
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function getWeather(key){
    const currentCondition = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}&details=true`

    fetch(currentCondition)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        updateData(data)
    })
    .catch((error) => {
        console.log(error);
    })
}

function updateData(data) {
    const obj = data[0]

    updateImage(obj.WeatherText, obj.WeatherIcon)
    updateTemperature(obj.Temperature.Metric.Value, obj.WeatherText)
    updateHumidity(obj.RelativeHumidity)
    updateWind(obj.Wind.Speed.Metric.Value)
    showData()
}

function updateImage(text, icon){
    const img = document.getElementById('image')

    if (icon >= 1 && icon <= 3) {
        img.src = './images/sun.png'
    }else if(icon >= 4 && icon <= 6){
        img.src = './images/sunny.png'
    }else if(icon >= 7 && icon <= 11){
        img.src = './images/clouds.png'
    }else if(icon >= 12 && icon <= 14){
        img.src = './images/sun-rain.png'
    }else if(icon >= 15 && icon <= 17){
        img.src = './images/storm.png'
    }else if(icon >= 18 && icon <= 23){
        img.src = './images/rain.png'
    }else if(icon >= 24 && icon <= 29){
        img.src = './images/snow.png'
    }else if(icon >= 38 && icon <= 44){
        img.src = './images/clouds.png'
    }else{
        img.src = './images/weather.png'
    }
}

function updateTemperature(temp, description){
    document.querySelector('.temperature').innerHTML = `${temp}<span>°C</span>`
    document.querySelector('.description').textContent = `${description}`
}

function updateHumidity(humidity){
    document.querySelector('.humidity-info').textContent = `${humidity}%`
}

function updateWind(wind) {
    document.querySelector('.wind-info').textContent = `${wind}Km/h`
}

function showData() {
    document.querySelector('.not-found').style.display = 'none'

    document.querySelector('.weather').style.visibility = 'visible'
    document.querySelector('.weather-details').style.visibility = 'visible'
    addAnimation();
}

function notFound() {
    document.querySelector('.weather').style.visibility = 'hidden'
    document.querySelector('.weather-details').style.visibility = 'hidden'

    document.querySelector('.not-found').style.display = 'flex'
    addAnimation()
}

function addAnimation(){

    const weatherBox = document.querySelector('.weather')
    weatherBox.classList.add('animate__animated', 'animate__fadeInDown')

    const detailsBox = document.querySelector('.weather-details')
    detailsBox.classList.add('animate__animated', 'animate__fadeInDown')

    const notFound = document.querySelector('.not-found')
    notFound.classList.add('animate__animated', 'animate__fadeInDown')
    
    setTimeout(() => {
        weatherBox.classList.remove('animate__animated', 'animate__fadeInDown');
        detailsBox.classList.remove('animate__animated', 'animate__fadeInDown');
        notFound.classList.remove('animate__animated', 'animate__fadeInDown');
    }, 3000);
}



