import React from 'react'

const Forecast = ({title,data}) => {
//   //const data=[1,2,3,4,5];
//   const formatForecastWeather=(secs,offset,data) =>{
//     //hourly
//     const hourly=data
//     .filter(f=>f.dt >secs)
//     .map((f)=>({
//         temp:f.main.temp,
//         title:formatToLocalTime(f.dt,offset,"hh:mm a"),
//         icon:iconUrlFromCode(f.weather[0].icon),
//         date:f.dt_txt,
//     }))
//     .slice(0,5);
//     //daily
//     const daily=data.
//     filter((f)=>f.dt_txt.slice(-8)==="00:00:00")
//     .map((f)=>({
//         temp:f.main.temp,
//         title: formatToLocalTime(f.dt,offset,"ccc"),
//         icon:iconUrlFromCode(f.weather[0].icon),
//         date:f.dt_txt,
//     }));
//     return {hourly,daily};
    

// }
//   const hourly=(data)
//   const daily=(data)
  return (
    
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-1'/>
      <div className='flex item-center justify-between'>
        {data.map((d,index)=>{
        return(
          <div 
          key={index}
          className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>{d.title}</p>
            <img 
            src={d.icon}alt="weather icon"
            className="w-12 my-1"
            />
            <p className='font-medium'>{d.temp.toFixed()}°</p>

          </div>
        );
        })}
      </div>

    </div>
  )
}

export default Forecast
