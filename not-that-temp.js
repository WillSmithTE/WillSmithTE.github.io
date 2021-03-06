var countryCode = 'au';
var actualTemp;
var place;
var wrongTemps = [];
var lat;
var long;
var geoUrl0 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var geoUrlAddress = 'sydney';
var geoUrlCountry;
var geoUrlKey;
var DARK_SKY_PATH;
var WILL_SMITH_IMG_PATH = 'https://d2nzqyyfd6k6c7.cloudfront.net/styles/nova_hero/s3/article/thumbnail/fresh-prince.jpeg?itok=7w5MJwV9';
var DOGE_IMG_PATH = 'http://i.imgur.com/L2xK8JO.jpg';
var WILL_SMITH_KEYWORD = 'willsmith';
var DOGE_KEYWORD = 'doge';
var eggs = [{ keyword: WILL_SMITH_KEYWORD, path: WILL_SMITH_IMG_PATH }, { keyword: DOGE_KEYWORD, path: DOGE_IMG_PATH }];
var KEYS_PATH = 'https://9wtfxgyexd.execute-api.ap-southeast-2.amazonaws.com/beta';
var MR_SPONGE_PATH = 'https://ih1.redbubble.net/image.490996881.2348/flat,800x800,070,f.u2.jpg';

$(document).ready(function () {
  $('#search').on('click', function () {
    geoUrlAddress = document.getElementById('basicSearchTf').value;
    geoUrlCountry = document.getElementById('countrySearchTf').value;
    var maybeEgg = findEgg([geoUrlAddress, geoUrlCountry]);
    if (maybeEgg !== undefined) {
      setFlagSrc(maybeEgg.path);
      setFeedbackText(`spooky`)
    } else {
      $.getJSON(KEYS_PATH, (keys) => {
        DARK_SKY_PATH = keys.darkSkyPath;
        geoUrlKey = keys.googleGeoKey;
      }).then(() => {
        $.getJSON(makeGeoUrl(geoUrlAddress, geoUrlCountry), (weatherData) => {
          if (weatherData.results.length == 0) {
            setFeedbackText(`${geoUrlAddress} doesn't exist you absolute dummy keep trying`);
            setFlagSrc(MR_SPONGE_PATH);
            makeFeedbackVisible();
          } else {
            lat = weatherData.results[0].geometry.location.lat;
            long = weatherData.results[0].geometry.location.lng;
            place = weatherData.results[0].address_components[0].long_name;
            var countryName = getCountryName(weatherData.results[0].address_components);
            if (weatherData.results[0].address_components.length > 1) {
              place += ", " + countryName;
            }
            var countryCode = getCountryCode(countryName);
            var flagImgAddress;
            if (countryCode !== undefined) {
              countryCode = countryCode.toLowerCase();
              flagImgAddress = "http://www.geonames.org/flags/x/" + countryCode + ".gif";
            } else {
              flagImgAddress = MR_SPONGE_PATH;
              console.warn('Country Code for flag of country name ', countryName, ' not found');
            }
            setFlagSrc(flagImgAddress);
            document.getElementById("flag").style.visibility = "visible";

            darkSky(lat, long);
          }
        },
          (error) => console.warn(`Failed to get GEO weather info: ${error}`));
      },
        (error) => console.warn(`Failed to get api keys: ${error}`));
    }
  });
  $("#newTemp").on("click", function () {
    newTemp();
  });
});

function setFlagSrc(path) {
  $("#flag").attr('src', path);
}

function darkSky(lat, long) {
  $.ajax(
    {
      type: "GET",
      url: DARK_SKY_PATH + lat + "," + long,
      dataType: 'jsonp',
      success: (data) => handleWeatherUpdate(data),
      error: (error) => console.warn(`Failed to fetch weather: ${error}`)
    }
  );
};

function handleWeatherUpdate(data) {
  actualTemp = (data.currently.temperature - 32) / 1.8;
  wrongTemps = newArr(wrongTemps, actualTemp);
  var index = wrongTemps.indexOf(actualTemp);
  wrongTemps.splice(index, 1);
  wrongTemps = shuffleArr(wrongTemps);
  newTemp();
  makeFeedbackVisible();
}

function makeGeoUrl(geoUrlAddress, geoUrlCountry) {
  if (geoUrlCountry === "") {
    return geoUrl0 + geoUrlAddress + geoUrlKey;
  } else {
    return geoUrl0 + geoUrlAddress + "&components=country:" + geoUrlCountry;
  }
};

function shuffleArr(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function newArr(arr, temp) {
  arr.length = 0;
  for (var i = temp - 10; i <= temp + 10; i++) {
    arr.push(i);
  }
  arr.splice(9, 1);
  return arr;
};

function makeFeedbackVisible() {
  document.getElementById("feedback").style.visibility = "visible";
}

function newTemp() {
  var s;
  if (wrongTemps.length == 0) {
    s = "You just consumed 0.00011% of your mouse's life and burnt 0.0031 calories. Keep hustling. The temperature in " + place + " is " + actualTemp.toFixed(0) + String.fromCharCode(176) + "C.";
  }
  else {
    s = "The temperature in " + place + " is NOT " + wrongTemps[0].toFixed(0) + String.fromCharCode(176) + "C. " + wrongTemps.length;
    if (wrongTemps.length == 1) {
      s += " attempt remaining.";
    } else {
      s += " attempts remaining.";
    }
    wrongTemps.shift();
  }
  setFeedbackText(s);
};

function setFeedbackText(text) {
  $("#feedback").text(text);
}

function getCountryName(arr) {
  var country = arr.find((addressComponents) => addressComponents.types[0] === 'country');
  if (country === undefined) {
    console.warn(`Unable to find country name for flag from address components ${arr}`);
  } else {
    return country.long_name;
  }
};

function findEgg(queryParams) {
  return eggs.find((egg) => {
    return queryParams.map((queryParam) => {
      var modifiedQueryParam = queryParam.toLowerCase();
      modifiedQueryParam = modifiedQueryParam.split(' ').join('');
      return modifiedQueryParam;
    }).some((queryParam) => queryParam.includes(egg.keyword));
  });
}

function getCountryCode(countryName) {
  switch (countryName) {
    case 'Afghanistan': return 'AF';
    case 'Aland Islands': return 'AX';
    case 'Albania': return 'AL';
    case 'Algeria': return 'DZ';
    case 'American Samoa': return 'AS';
    case 'Andorra': return 'AD';
    case 'Angola': return 'AO';
    case 'Anguilla': return 'AI';
    case 'Antarctica': return 'AQ';
    case 'Antigua and Barbuda': return 'AG';
    case 'Argentina': return 'AR';
    case 'Armenia': return 'AM';
    case 'Aruba': return 'AW';
    case 'Australia': return 'AU';
    case 'Austria': return 'AT';
    case 'Azerbaijan': return 'AZ';
    case 'Bahamas the': return 'BS';
    case 'Bahrain': return 'BH';
    case 'Bangladesh': return 'BD';
    case 'Barbados': return 'BB';
    case 'Belarus': return 'BY';
    case 'Belgium': return 'BE';
    case 'Belize': return 'BZ';
    case 'Benin': return 'BJ';
    case 'Bermuda': return 'BM';
    case 'Bhutan': return 'BT';
    case 'Bolivia': return 'BO';
    case 'Bosnia and Herzegovina': return 'BA';
    case 'Botswana': return 'BW';
    case 'Bouvet Island (Bouvetoya)': return 'BV';
    case 'Brazil': return 'BR';
    case 'British Indian Ocean Territory (Chagos Archipelago)': return 'IO';
    case 'British Virgin Islands': return 'VG';
    case 'Brunei Darussalam': 'BN';
    case 'Bulgaria': return 'BG';
    case 'Burkina Faso': return 'BF';
    case 'Burundi': return 'BI';
    case 'Cambodia': return 'KH';
    case 'Cameroon': return 'CM';
    case 'Canada': return 'CA';
    case 'Cape Verde': return 'CV';
    case 'Cayman Islands': return 'KY';
    case 'Central African Republic': return 'CF';
    case 'Chad': return 'TD';
    case 'Chile': return 'CL';
    case 'China': return 'CN';
    case 'Christmas Island': return 'CX';
    case 'Cocos (Keeling) Islands': return 'CC';
    case 'Colombia': return 'CO';
    case 'Comoros the': return 'KM';
    case 'Congo': return 'CD';
    case 'Congo the': return 'CG';
    case 'Cook Islands': return 'CK';
    case 'Costa Rica': return 'CR';
    case 'Cote d\'Ivoire': return 'CI';
    case 'Croatia': return 'HR';
    case 'Cuba': return 'CU';
    case 'Cyprus': return 'CY';
    case 'Czech Republic': return 'CZ';
    case 'Denmark': return 'DK';
    case 'Djibouti': return 'DJ';
    case 'Dominica': return 'DM';
    case 'Dominican Republic': return 'DO';
    case 'Ecuador': return 'EC';
    case 'Egypt': return 'EG';
    case 'El Salvador': return 'SV';
    case 'Equatorial Guinea': return 'GQ';
    case 'Eritrea': return 'ER';
    case 'Estonia': return 'EE';
    case 'Ethiopia': return 'ET';
    case 'Faroe Islands': return 'FO';
    case 'Falkland Islands (Malvinas)': return 'FK';
    case 'Fiji the Fiji Islands': return 'FJ';
    case 'Finland': return 'FI';
    case 'France, French Republic': return 'FR';
    case 'French Guiana': return 'GF';
    case 'French Polynesia': return 'PF';
    case 'French Southern Territories': return 'TF';
    case 'Gabon': return 'GA';
    case 'Gambia the': return 'GM';
    case 'Georgia': return 'GE';
    case 'Germany': return 'DE';
    case 'Ghana': return 'GH';
    case 'Gibraltar': return 'GI';
    case 'Greece': return 'GR';
    case 'Greenland': return 'GL';
    case 'Grenada': return 'GD';
    case 'Guadeloupe': return 'GP';
    case 'GU': return 'Guam';
    case 'Guatemala': return 'GT';
    case 'Guernsey': return 'GG';
    case 'Guinea': return 'GN';
    case 'Guinea-Bissau': 'GW';
    case 'Guyana': return 'GY';
    case 'Haiti': return 'HT';
    case 'Heard Island and McDonald Islands': return 'HM';
    case 'Holy See (Vatican City State)': return 'VA';
    case 'Honduras': return 'HN';
    case 'Hong Kong': return 'HK';
    case 'Hungary': return 'HU';
    case 'Iceland': return 'IS';
    case 'India': 'IN';
    case 'Indonesia': return 'ID';
    case 'Iran': return 'IR';
    case 'Iraq': return 'IQ';
    case 'Ireland': return 'IE';
    case 'Isle of Man': return 'IM';
    case 'Israel': return 'IL';
    case 'Italy': return 'IT';
    case 'Jamaica': return 'JM';
    case 'Japan': return 'JP';
    case 'Jersey': return 'JE';
    case 'Jordan': return 'JO';
    case 'Kazakhstan': return 'KZ';
    case 'Kenya': return 'KE';
    case 'Kiribati': return 'KI';
    case 'Korea': return 'KP';
    case 'Korea': return 'KR';
    case 'Kuwait': return 'KW';
    case 'Kyrgyz Republic': return 'KG';
    case 'Lao': return 'LA';
    case 'Latvia': return 'LV';
    case 'Lebanon': return 'LB';
    case 'Lesotho': return 'LS';
    case 'Liberia': return 'LR';
    case 'Libyan Arab Jamahiriya': return 'LY';
    case 'Liechtenstein': return 'LI';
    case 'Lithuania': return 'LT';
    case 'Luxembourg': return 'LU';
    case 'Macao': return 'MO';
    case 'Macedonia': return 'MK';
    case 'Madagascar': return 'MG';
    case 'Malawi': return 'MW';
    case 'Malaysia': return 'MY';
    case 'Maldives': return 'MV';
    case 'Mali': return 'ML';
    case 'Malta': return 'MT';
    case 'Marshall Islands': return 'MH';
    case 'Martinique': return 'MQ';
    case 'Mauritania': return 'MR';
    case 'Mauritius': return 'MU';
    case 'Mayotte': return 'YT';
    case 'Mexico': return 'MX';
    case 'Micronesia': return 'FM';
    case 'Moldova': return 'MD';
    case 'Monaco': return 'MC';
    case 'Mongolia': return 'MN';
    case 'Montenegro': return 'ME';
    case 'Montserrat': return 'MS';
    case 'Morocco': return 'MA';
    case 'Mozambique': return 'MZ';
    case 'Myanmar': return 'MM';
    case 'Namibia': return 'NA';
    case 'Nauru': return 'NR';
    case 'Nepal': return 'NP';
    case 'Netherlands Antilles': return 'AN';
    case 'Netherlands the': return 'NL';
    case 'New Caledonia': return 'NC';
    case 'New Zealand': return 'NZ';
    case 'Nicaragua': return 'NI';
    case 'Niger': return 'NE';
    case 'Nigeria': return 'NG';
    case 'Niue': return 'NU';
    case 'Norfolk Island': return 'NF';
    case 'Northern Mariana Islands': return 'MP';
    case 'Norway': return 'NO';
    case 'Oman': return 'OM';
    case 'Pakistan': return 'PK';
    case 'Palau': return 'PW';
    case 'Palestinian Territory': return 'PS';
    case 'Panama': return 'PA';
    case 'Papua New Guinea': return 'PG';
    case 'Paraguay': return 'PY';
    case 'Peru': return 'PE';
    case 'Philippines': return 'PH';
    case 'Pitcairn Islands': return 'PN';
    case 'Poland': return 'PL';
    case 'Portugal, Portuguese Republic': return 'PT';
    case 'Puerto Rico': return 'PR';
    case 'Qatar': return 'QA';
    case 'Reunion': return 'RE';
    case 'Romania': return 'RO';
    case 'Russia': return 'RU';
    case 'Rwanda': return 'RW';
    case 'Saint Barthelemy': return 'BL';
    case 'Saint Helena': return 'SH';
    case 'Saint Kitts and Nevis': return 'KN';
    case 'Saint Lucia': return 'LC';
    case 'Saint Martin': return 'MF';
    case 'Saint Pierre and Miquelon': return 'PM';
    case 'Saint Vincent and the Grenadines': return 'VC';
    case 'Samoa': return 'WS';
    case 'San Marino': return 'SM';
    case 'Sao Tome and Principe': return 'ST';
    case 'Saudi Arabia': return 'SA';
    case 'Senegal': return 'SN';
    case 'Serbia': return 'RS';
    case 'Seychelles': return 'SC';
    case 'Sierra Leone': return 'SL';
    case 'Singapore': return 'SG';
    case 'Slovakia (Slovak Republic)': return 'SK';
    case 'Slovenia': return 'SI';
    case 'Solomon Islands': return 'SB';
    case 'Somalia, Somali Republic': return 'SO';
    case 'South Africa': return 'ZA';
    case 'South Georgia and the South Sandwich Islands': return 'GS';
    case 'Spain': return 'ES';
    case 'Sri Lanka': return 'LK';
    case 'Sudan': return 'SD';
    case 'Suriname': return 'SR';
    case 'Svalbard & Jan Mayen Islands': return 'SJ';
    case 'Swaziland': return 'SZ';
    case 'Sweden': return 'SE';
    case 'Switzerland, Swiss Confederation': return 'CH';
    case 'Syrian Arab Republic': return 'SY';
    case 'Taiwan': return 'TW';
    case 'Tajikistan': return 'TJ';
    case 'Tanzania': return 'TZ';
    case 'Thailand': return 'TH';
    case 'Timor-Leste': return 'TL';
    case 'Togo': return 'TG';
    case 'Tokelau': return 'TK';
    case 'Tonga': return 'TO';
    case 'Trinidad and Tobago': return 'TT';
    case 'Tunisia': return 'TN';
    case 'Turkey': return 'TR';
    case 'Turkmenistan': return 'TM';
    case 'Turks and Caicos Islands': return 'TC';
    case 'Tuvalu': return 'TV';
    case 'Uganda': return 'UG';
    case 'Ukraine': return 'UA';
    case 'United Arab Emirates': return 'AE';
    case 'United Kingdom': return 'GB';
    case 'United States of America': return 'US';
    case 'United States Minor Outlying Islands': return 'UM';
    case 'United States Virgin Islands': return 'VI';
    case 'Uruguay, Eastern Republic of': return 'UY';
    case 'Uzbekistan': return 'UZ';
    case 'Vanuatu': return 'VU';
    case 'Venezuela': return 'VE';
    case 'Vietnam': return 'VN';
    case 'Wallis and Futuna': return 'WF';
    case 'Western Sahara': return 'EH';
    case 'Yemen': return 'YE';
    case 'Zambia': return 'ZM';
    case 'Zimbabwe': return 'ZW';
  };
};

