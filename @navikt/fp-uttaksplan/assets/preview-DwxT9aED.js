import{d as l,a as i}from"./dayjs.min-jH2-tx3w.js";import{c as d}from"./index-uubelm5h.js";import{j as m}from"./jsx-runtime-QvZ8i92b.js";import{P as _}from"./index-BS-NCt3p.js";import{c as u}from"./createIntl-BAX4pHMK.js";var p={exports:{}};(function(o,s){(function(e,a){o.exports=a(l)})(d,function(e){function a(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var r=a(e),n={name:"nb",weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),ordinal:function(t){return t+"."},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"}};return r.default.locale(n,null,!0),n})})(p);var f={exports:{}};(function(o,s){(function(e,a){o.exports=a(l)})(d,function(e){function a(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var r=a(e),n={name:"nn",weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_la".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),ordinal:function(t){return t+"."},weekStart:1,relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eitt minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månadar",y:"eitt år",yy:"%d år"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"}};return r.default.locale(n,null,!0),n})})(f);const c=o=>(e,a)=>{const r=a.globals.locale||"nb",n=o[r];return m.jsx(_,{value:u({locale:r,messages:n}),children:e()})},M={"uttaksplan.familiehendelsesdato.født":"{antallBarn, plural, one{Barnet} other {Barna}} er født {dato}","uttaksplan.familiehendelsesdato.termin":"Termin {dato}","uttaksplan.familiehendelsesdato.adopsjon":"{antallBarn, plural, one{Barnet} other {Barna}} er adoptert {dato}"},h={"uttaksplan.familiehendelsesdato.født":"{antallBarn, plural, one{Barnet} other {Barna}} er født {dato}","uttaksplan.familiehendelsesdato.termin":"Termin {dato}","uttaksplan.familiehendelsesdato.adopsjon":"{antallBarn, plural, one{Barnet} other {Barna}} er adoptert {dato}"},g={"uttaksplan.familiehendelsesdato.født":"{antallBarn, plural, one{Barnet} other {Barna}} er født {dato}","uttaksplan.familiehendelsesdato.termin":"Termin {dato}","uttaksplan.familiehendelsesdato.adopsjon":"{antallBarn, plural, one{Barnet} other {Barna}} er adoptert {dato}"};i.locale("nb");const k=c({nb:h,nn:g,en:M}),v={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},B={locale:{description:"Internationalization locale",toolbar:{title:"Språk",icon:"globe",items:[{value:"nb",title:"Bokmål"},{value:"nn",title:"Nynorsk"},{value:"en",title:"English"}],dynamicTitle:!0}}},H={decorators:[k]};export{H as default,B as globalTypes,v as parameters};
