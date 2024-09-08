
import { DateTime } from "luxon";
const TimeAndLocation = (props) => {
  const {dt,timezone,name,country}=props.weather
  const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy '| Local time:' hh:mm a") => {
    return DateTime.fromSeconds(secs, { zone: `utc` }).plus({ seconds: offset }).toFormat(format);
};
const formattedLocalTime = formatToLocalTime(dt, timezone);
// console.log(dt, timezone);
  //console.log(props)
  // console.log(formattedLocalTime)
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">
        {formattedLocalTime}
         
        </p>

      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium">
            {name},
            {country}
  
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocation
