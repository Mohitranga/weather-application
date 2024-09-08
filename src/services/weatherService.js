//import { urlencoded } from "express";
import { DateTime } from "luxon";

const API_KEY = '3227361269f2b3e1e96df0e02a0c4222';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';


const getWeatherData=(infotype,searchParams) => {
    const url=new URL(BASE_URL+infotype);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY});

    //console.log(url);
    return fetch(url)
        .then((res)=>res.json())
        .then((data)=> data);
}

// // Function to format Unix timestamp to local time using Luxon
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy '| Local time:' hh:mm a") => {
    return DateTime.fromSeconds(secs, { zone: `utc` }).plus({ seconds: offset }).toFormat(format);
};

const iconUrlFromCode=(icon)=>  'http://openweathermap.org/img/wn/01@2x.png'
// // Function to format the weather data
const formatCurrent = (data) => {
    //console.log(data);
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
        dt,
    } = data;

    // Destructure weather details (assuming weather is an array)
    const { main: description, icon } = weather[0];

    // Format the local time based on timezone
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        description,
        icon: iconUrlFromCode(icon),
        local_time: formattedLocalTime,  // Store formatted local time
        dt,
        timezone
    };
};

const formatForecastWeather=(secs,offset,data) =>{
    //hourly
    const hourly=data
    .filter(f=>f.dt >secs)
    .map((f)=>({
        temp:f.main.temp,
        title:formatToLocalTime(f.dt,offset,"hh:mm a"),
        icon:iconUrlFromCode(f.weather[0].icon),
        date:f.dt_txt,
    }))
    .slice(0,5);
    //daily
    const daily=data.
    filter((f)=>f.dt_txt.slice(-8)==="00:00:00")
    .map((f)=>({
        temp:f.main.temp,
        title: formatToLocalTime(f.dt,offset,"ccc"),
        icon:iconUrlFromCode(f.weather[0].icon),
        date:f.dt_txt,
    }));
    return {hourly,daily};
    

}

// Function to get and format weather data
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then((data) => formatCurrent(data));
    //console.log(formattedCurrentWeather)
    const {dt,lat,lon,timezone}=formattedCurrentWeather


    const formattedForecastWeather=await getWeatherData("forecast",{
        lat,
        lon,
        units: searchParams.units,
    }).then((d)=> formatForecastWeather(dt,timezone,d.list))

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};



 //const formatForecastWeather=(secs,offset,data)
export default getFormattedWeatherData;
