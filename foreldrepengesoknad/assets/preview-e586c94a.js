import{j as i}from"./jsx-runtime-1caa8f64.js";import{Z as u,_ as d,d as p}from"./Tidsperioden-5bf2b704.js";import{c}from"./createIntl-4b54006a.js";import{n as f,a as m,b as M}from"./app-7ec63f6e.js";import"./index-753920cd.js";import{c as l}from"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";const g=n=>(r,e)=>{const s=e.globals.locale||"nb",a=n[s];return i.jsx(u,{value:c({locale:s,messages:a}),children:r()})};var Y={exports:{}};(function(n,_){(function(r,e){n.exports=e(d)})(l,function(r){function e(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var s=e(r),a={name:"nb",weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),ordinal:function(t){return t+"."},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"}};return s.default.locale(a,null,!0),a})})(Y);var L={exports:{}};(function(n,_){(function(r,e){n.exports=e(d)})(l,function(r){function e(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var s=e(r),a={name:"nn",weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_la".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),ordinal:function(t){return t+"."},weekStart:1,relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eitt minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månadar",y:"eitt år",yy:"%d år"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"}};return s.default.locale(a,null,!0),a})})(L);p.locale("nb");const o=document.createElement("script");o.type="text/json";o.id="nav:appSettings";o.innerHTML=JSON.stringify({REST_API_URL:"test",LOGIN_URL:"test",APP_VERSION:"test",FEATURE_VIS_FEILSIDE:"off",FEATURE_VIS_ALERTSTRIPE:"on"});document.head.appendChild(o);const b=g({nb:{...f,...m.nb},nn:{...M,...m.nn}}),D={locale:{description:"Internationalization locale",toolbar:{title:"Språk",icon:"globe",items:[{value:"nb",title:"Bokmål"},{value:"nn",title:"Nynorsk"}],dynamicTitle:!0}}},R={decorators:[b,n=>i.jsx("div",{id:"app",style:{padding:"40px"},children:i.jsx(n,{})})]};export{R as default,D as globalTypes};
