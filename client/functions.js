function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function convertTemp (temp) {
    const celcius = (+temp-273.15).toFixed(1)
    return `${celcius}°C`
}

function source(description) {
    description = description.toLowerCase()
    let source
    console.log(description)
    switch (description) {
        case "thunderstorm":
            source = "https://www.flaticon.com/svg/static/icons/svg/222/222506.svg"
            break;
        case "mist":
            source = "https://www.flaticon.com/svg/static/icons/svg/414/414927.svg"
            break;
        case "clouds":
            source = "https://www.flaticon.com/svg/static/icons/svg/414/414927.svg"
            break;
        case "sunny":
            source = "https://www.flaticon.com/svg/static/icons/svg/2917/2917242.svg"
            break;
        case "windy":
            source = "https://www.flaticon.com/svg/static/icons/svg/2917/2917242.svg"
            break;
        case "rain" :
            source = "https://www.flaticon.com/svg/static/icons/svg/414/414974.svg"
            break;
    }
    return source
}