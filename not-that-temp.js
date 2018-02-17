var countryCode="au";
var temp;
var place;
var arr=[];
for (var i=-55;i<=55;i++){
    arr.push(i);
}
var lat;
var long;
var geoUrl0 = "https://maps.googleapis.com/maps/api/geocode/json?address=";  
var geoUrlAddress = "sydney";
var geoUrlCountry;
var geoUrlKey = "&key=AIzaSyBsypIZxNiVwHxwMOAWg8bEKGQ0WWlJxLQ";
var darkSkyUrl0 = "https://api.darksky.net/forecast/94793929846040309f42120ea5e27d80/";
$(document).ready(function(){
  console.log("start");
  $("#search").on("click", function(){
   geoUrlAddress = document.getElementById("basicSearchTf").value;
   geoUrlCountry = document.getElementById("countrySearchTf").value;
   $.getJSON(makeGeoUrl(geoUrlAddress,geoUrlCountry),function(geo){
      lat=geo.results[0].geometry.location.lat;
      long=geo.results[0].geometry.location.lng;
  place = geo.results[0].address_components[0].long_name;
     if (geo.results[0].address_components.length>1) place+=", " + geo.results[0].address_components[findCountry(geo.results[0].address_components)].long_name;
  countryCode = getCountryCode(geo.results[0].address_components[findCountry(geo.results[0].address_components)].long_name).toLowerCase();
$("#flag").attr('src',"http://www.geonames.org/flags/x/" + countryCode + ".gif");
document.getElementById("flag").style.visibility = "visible";
       darkSky(lat,long);
    });
 });
  $("#newTemp").on("click",function(){
  newTemp();
});
  });

 

function darkSky(lat,long){
  $.ajax(
      {type: "GET",
      url: darkSkyUrl0+lat+","+long,
      dataType: 'jsonp',
      success: function (data){
  temp = (data.currently.temperature-32)/1.8;
  arr=newArr(arr,temp);    
  var index = arr.indexOf(temp);
  arr.splice(index,1);
  arr=shuffleArr(arr);
  newTemp();
  document.getElementById("insert").style.visibility = "visible";
    },
      error: function(){
        console.log("fail darkSky");
      }
   });
};



function celsius(fahrenheit){
  return ((fahrenheit-32)/1.8).toFixed(0)+String.fromCharCode(176)+"C";
};

function makeGeoUrl(geoUrlAddress, geoUrlCountry){
  if (!geoUrlCountry==""){
    return geoUrl0+geoUrlAddress+"&components=country:"+geoUrlCountry;
  }
  else
  return geoUrl0 + geoUrlAddress + geoUrlKey;
};

function shuffleArr(array){
  for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function newArr(arr,temp){
  arr.length=0;
   for (var i=temp-10;i<=temp+10;i++){
    arr.push(i);
       console.log("i:"+i);
}
  return arr;
};

function newTemp(){
  if (arr.length==0){
  $("#insert").text("You just consumed 0.00011% of your mouse's life and burnt 0.0031 calories. Keep hustling. The temperature in " + place + " is "+temp.toFixed(0)+String.fromCharCode(176)+"C.");
  }
  else{
    var s = "The temperature in "+place + " is NOT " + arr[0].toFixed(0)+String.fromCharCode(176)+"C. "+arr.length;
 if (arr.length==1) s+= " attempt remaining.";
    else s+= " attempts remaining.";
arr.shift();
$("#insert").text(s);
  }
};

function findCountry(arr){
  for (var i=0;i<arr.length;i++){
    if (arr[i].types[0]=="country")
      return i;
  }
};
function getCountryCode(countryName){
  switch (countryName){
    case 'Afghanistan':return 'AF';
    case 'Aland Islands': return 'AX';
    case 'Albania': return 'AL';
    case 'Algeria': return 'DZ';
    case 'American Samoa': return 'AS';
    case 'Andorra':return 'AD';
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
    case'Belize': return  'BZ';
    case 'Benin':return 'BJ';
    case 'Bermuda': return 'BM';
    case 'Bhutan': return 'BT';
    case 'Bolivia': return 'BO';
    case 'Bosnia and Herzegovina': return 'BA';
    case 'Botswana':return 'BW';
    case 'Bouvet Island (Bouvetoya)': return 'BV';
    case 'Brazil': return 'BR';
    case 'British Indian Ocean Territory (Chagos Archipelago)': return 'IO';
    case 'British Virgin Islands': return 'VG';
    case 'Brunei Darussalam': 'BN';
    case 'Bulgaria': return 'BG';
    case 'Burkina Faso': return 'BF';
    case 'Burundi': return 'BI';
    case 'Cambodia': return 'KH'; 
    case 'Cameroon': return  'CM';
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
    case 'Mauritania': return  'MR';
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
    case 'Russian': return 'RU';
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

