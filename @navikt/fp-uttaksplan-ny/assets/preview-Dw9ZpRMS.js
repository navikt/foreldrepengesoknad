import{i as G,T as C,_ as m,M as Z,a as F,I as $,b as f,f as v,g as M,F as T,E as _,c as B,D as U,d as X,e as P,h as q,j as W,k as z,l as J,m as Q,n as A,o as ee,P as te,p as re}from"./index-jBo6h7uD.js";import{r as ae,c as j}from"./index-DJO9vBfz.js";const ne="From {fom} until {tom}",oe={"valideringsfeil.fritekst.kanIkkeInneholdeTegn":'{ugyldigeTegn} are illegal characters in field "{feltNavn}".',"varighet.uker":"{uker, plural, one {# week} other {# weeks}}","varighet.dager":"{dager, plural, one {# day} other {# days}}","tidsperiode.kort":"{fom} - {tom}",tidsperiode:ne},ie="Fra {fom} til {tom}",se={"valideringsfeil.fritekst.kanIkkeInneholdeTegn":'{ugyldigeTegn} er ugyldige tegn i feltet "{feltNavn}".',"varighet.uker":"{uker, plural, one {# uke} other {# uker}}","varighet.dager":"{dager, plural, one {# dag} other {# dager}}","tidsperiode.kort":"{fom} - {tom}",tidsperiode:ie},le="Frå {fom} til {tom}",me={"valideringsfeil.fritekst.kanIkkeInneholdeTegn":'{ugyldigeTegn} er ugyldige teikn i feltet "{feltNavn}".',"varighet.uker":"{uker, plural, one {# veke} other {# veker}}","varighet.dager":"{dager, plural, one {# dag} other {# dagar}}","tidsperiode.kort":"{fom} - {tom}",tidsperiode:le},L={nb:se,nn:me,en:oe};function b(t,o){return Object.keys(t).reduce(function(r,e){return r[e]=m({timeZone:o},t[e]),r},{})}function S(t,o){var r=Object.keys(m(m({},t),o));return r.reduce(function(e,n){return e[n]=m(m({},t[n]||{}),o[n]||{}),e},{})}function D(t,o){if(!o)return t;var r=$.formats;return m(m(m({},r),t),{date:S(b(r.date,o),b(t.date||{},o)),time:S(b(r.time,o),b(t.time||{},o))})}var I=function(t,o,r,e,n){var a=t.locale,i=t.formats,s=t.messages,l=t.defaultLocale,p=t.defaultFormats,d=t.fallbackOnEmptyString,h=t.onError,y=t.timeZone,R=t.defaultRichTextElements;r===void 0&&(r={id:""});var w=r.id,g=r.defaultMessage;G(!!w,"[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");var c=String(w),u=s&&Object.prototype.hasOwnProperty.call(s,c)&&s[c];if(Array.isArray(u)&&u.length===1&&u[0].type===C.literal)return u[0].value;if(!e&&u&&typeof u=="string"&&!R)return u.replace(/'\{(.*?)\}'/gi,"{$1}");if(e=m(m({},R),e||{}),i=D(i,y),p=D(p,y),!u){if(d===!1&&u==="")return u;if((!g||a&&a.toLowerCase()!==l.toLowerCase())&&h(new Z(r,a)),g)try{var E=o.getMessageFormat(g,l,p,n);return E.format(e)}catch(k){return h(new F('Error formatting default message for: "'.concat(c,'", rendering default message verbatim'),a,r,k)),typeof g=="string"?g:c}return c}try{var E=o.getMessageFormat(u,a,i,m({formatters:o},n||{}));return E.format(e)}catch(k){h(new F('Error formatting message: "'.concat(c,'", using ').concat(g?"default message":"id"," as fallback."),a,r,k))}if(g)try{var E=o.getMessageFormat(g,l,p,n);return E.format(e)}catch(k){h(new F('Error formatting the default message for: "'.concat(c,'", rendering message verbatim'),a,r,k))}return typeof u=="string"?u:typeof g=="string"?g:c},Y=["formatMatcher","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName","hourCycle","dateStyle","timeStyle","calendar","numberingSystem","fractionalSecondDigits"];function x(t,o,r,e){var n=t.locale,a=t.formats,i=t.onError,s=t.timeZone;e===void 0&&(e={});var l=e.format,p=m(m({},s&&{timeZone:s}),l&&M(a,o,l,i)),d=v(e,Y,p);return o==="time"&&!d.hour&&!d.minute&&!d.second&&!d.timeStyle&&!d.dateStyle&&(d=m(m({},d),{hour:"numeric",minute:"numeric"})),r(n,d)}function de(t,o){for(var r=[],e=2;e<arguments.length;e++)r[e-2]=arguments[e];var n=r[0],a=r[1],i=a===void 0?{}:a,s=typeof n=="string"?new Date(n||0):n;try{return x(t,"date",o,i).format(s)}catch(l){t.onError(new f("Error formatting date.",t.locale,l))}return String(s)}function ue(t,o){for(var r=[],e=2;e<arguments.length;e++)r[e-2]=arguments[e];var n=r[0],a=r[1],i=a===void 0?{}:a,s=typeof n=="string"?new Date(n||0):n;try{return x(t,"time",o,i).format(s)}catch(l){t.onError(new f("Error formatting time.",t.locale,l))}return String(s)}function fe(t,o){for(var r=[],e=2;e<arguments.length;e++)r[e-2]=arguments[e];var n=r[0],a=r[1],i=r[2],s=i===void 0?{}:i,l=t.timeZone,p=t.locale,d=t.onError,h=v(s,Y,l?{timeZone:l}:{});try{return o(p,h).formatRange(n,a)}catch(y){d(new f("Error formatting date time range.",t.locale,y))}return String(n)}function pe(t,o){for(var r=[],e=2;e<arguments.length;e++)r[e-2]=arguments[e];var n=r[0],a=r[1],i=a===void 0?{}:a,s=typeof n=="string"?new Date(n||0):n;try{return x(t,"date",o,i).formatToParts(s)}catch(l){t.onError(new f("Error formatting date.",t.locale,l))}return[]}function ge(t,o){for(var r=[],e=2;e<arguments.length;e++)r[e-2]=arguments[e];var n=r[0],a=r[1],i=a===void 0?{}:a,s=typeof n=="string"?new Date(n||0):n;try{return x(t,"time",o,i).formatToParts(s)}catch(l){t.onError(new f("Error formatting time.",t.locale,l))}return[]}var he=["style","type","fallback","languageDisplay"];function ce(t,o,r,e){var n=t.locale,a=t.onError,i=Intl.DisplayNames;i||a(new T(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`,_.MISSING_INTL_API));var s=v(e,he);try{return o(n,s).of(r)}catch(l){a(new f("Error formatting display name.",n,l))}}var ye=["type","style"],O=Date.now();function ve(t){return"".concat(O,"_").concat(t,"_").concat(O)}function Ee(t,o,r,e){e===void 0&&(e={});var n=K(t,o,r,e).reduce(function(a,i){var s=i.value;return typeof s!="string"?a.push(s):typeof a[a.length-1]=="string"?a[a.length-1]+=s:a.push(s),a},[]);return n.length===1?n[0]:n.length===0?"":n}function K(t,o,r,e){var n=t.locale,a=t.onError;e===void 0&&(e={});var i=Intl.ListFormat;i||a(new T(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`,_.MISSING_INTL_API));var s=v(e,ye);try{var l={},p=r.map(function(d,h){if(typeof d=="object"){var y=ve(h);return l[y]=d,y}return String(d)});return o(n,s).formatToParts(p).map(function(d){return d.type==="literal"?d:m(m({},d),{value:l[d.value]||d.value})})}catch(d){a(new f("Error formatting list.",n,d))}return r}var ke=["type"];function be(t,o,r,e){var n=t.locale,a=t.onError;e===void 0&&(e={}),Intl.PluralRules||a(new T(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,_.MISSING_INTL_API));var i=v(e,ke);try{return o(n,i).select(r)}catch(s){a(new f("Error formatting plural.",n,s))}return"other"}var Te=["numeric","style"];function _e(t,o,r){var e=t.locale,n=t.formats,a=t.onError;r===void 0&&(r={});var i=r.format,s=!!i&&M(n,"relative",i,a)||{},l=v(r,Te,s);return o(e,l)}function xe(t,o,r,e,n){n===void 0&&(n={}),e||(e="second");var a=Intl.RelativeTimeFormat;a||t.onError(new T(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`,_.MISSING_INTL_API));try{return _e(t,o,n).format(r,e)}catch(i){t.onError(new f("Error formatting relative time.",t.locale,i))}return String(r)}var Fe=["style","currency","unit","unitDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","currencyDisplay","currencySign","notation","signDisplay","unit","unitDisplay","numberingSystem","trailingZeroDisplay","roundingPriority","roundingIncrement","roundingMode"];function V(t,o,r){var e=t.locale,n=t.formats,a=t.onError;r===void 0&&(r={});var i=r.format,s=i&&M(n,"number",i,a)||{},l=v(r,Fe,s);return o(e,l)}function Ie(t,o,r,e){e===void 0&&(e={});try{return V(t,o,e).format(r)}catch(n){t.onError(new f("Error formatting number.",t.locale,n))}return String(r)}function Me(t,o,r,e){e===void 0&&(e={});try{return V(t,o,e).formatToParts(r)}catch(n){t.onError(new f("Error formatting number.",t.locale,n))}return[]}function Re(t){var o=t?t[Object.keys(t)[0]]:void 0;return typeof o=="string"}function we(t){t.onWarn&&t.defaultRichTextElements&&Re(t.messages||{})&&t.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`)}function Pe(t,o){var r=B(o),e=m(m({},U),t),n=e.locale,a=e.defaultLocale,i=e.onError;return n?!Intl.NumberFormat.supportedLocalesOf(n).length&&i?i(new P('Missing locale data for locale: "'.concat(n,'" in Intl.NumberFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):!Intl.DateTimeFormat.supportedLocalesOf(n).length&&i&&i(new P('Missing locale data for locale: "'.concat(n,'" in Intl.DateTimeFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):(i&&i(new X('"locale" was not configured, using "'.concat(a,'" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))),e.locale=e.defaultLocale||"en"),we(e),m(m({},e),{formatters:r,formatNumber:Ie.bind(null,e,r.getNumberFormat),formatNumberToParts:Me.bind(null,e,r.getNumberFormat),formatRelativeTime:xe.bind(null,e,r.getRelativeTimeFormat),formatDate:de.bind(null,e,r.getDateTimeFormat),formatDateToParts:pe.bind(null,e,r.getDateTimeFormat),formatTime:ue.bind(null,e,r.getDateTimeFormat),formatDateTimeRange:fe.bind(null,e,r.getDateTimeFormat),formatTimeToParts:ge.bind(null,e,r.getDateTimeFormat),formatPlural:be.bind(null,e,r.getPluralRules),formatMessage:I.bind(null,e,r),$t:I.bind(null,e,r),formatList:Ee.bind(null,e,r.getListFormat),formatListToParts:K.bind(null,e,r.getListFormat),formatDisplayName:ce.bind(null,e,r.getDisplayNames)})}function H(t){return t&&Object.keys(t).reduce(function(o,r){var e=t[r];return o[r]=z(e)?J(e):e,o},{})}var N=function(t,o,r,e){for(var n=[],a=4;a<arguments.length;a++)n[a-4]=arguments[a];var i=H(e),s=I.apply(void 0,Q([t,o,r,i],n,!1));return Array.isArray(s)?ae.Children.toArray(s):s},Le=function(t,o){var r=t.defaultRichTextElements,e=q(t,["defaultRichTextElements"]),n=H(r),a=Pe(m(m(m({},W),e),{defaultRichTextElements:n}),o),i={locale:a.locale,timeZone:a.timeZone,fallbackOnEmptyString:a.fallbackOnEmptyString,formats:a.formats,defaultLocale:a.defaultLocale,defaultFormats:a.defaultFormats,messages:a.messages,onError:a.onError,defaultRichTextElements:n};return m(m({},a),{formatMessage:N.bind(null,i,a.formatters),$t:N.bind(null,i,a.formatters)})},Se={iphone5:{name:"iPhone 5",styles:{height:"568px",width:"320px"},type:"mobile"},iphone6:{name:"iPhone 6",styles:{height:"667px",width:"375px"},type:"mobile"},iphone6p:{name:"iPhone 6 Plus",styles:{height:"736px",width:"414px"},type:"mobile"},iphone8p:{name:"iPhone 8 Plus",styles:{height:"736px",width:"414px"},type:"mobile"},iphonex:{name:"iPhone X",styles:{height:"812px",width:"375px"},type:"mobile"},iphonexr:{name:"iPhone XR",styles:{height:"896px",width:"414px"},type:"mobile"},iphonexsmax:{name:"iPhone XS Max",styles:{height:"896px",width:"414px"},type:"mobile"},iphonese2:{name:"iPhone SE (2nd generation)",styles:{height:"667px",width:"375px"},type:"mobile"},iphone12mini:{name:"iPhone 12 mini",styles:{height:"812px",width:"375px"},type:"mobile"},iphone12:{name:"iPhone 12",styles:{height:"844px",width:"390px"},type:"mobile"},iphone12promax:{name:"iPhone 12 Pro Max",styles:{height:"926px",width:"428px"},type:"mobile"},iphoneSE3:{name:"iPhone SE 3rd generation",styles:{height:"667px",width:"375px"},type:"mobile"},iphone13:{name:"iPhone 13",styles:{height:"844px",width:"390px"},type:"mobile"},iphone13pro:{name:"iPhone 13 Pro",styles:{height:"844px",width:"390px"},type:"mobile"},iphone13promax:{name:"iPhone 13 Pro Max",styles:{height:"926px",width:"428px"},type:"mobile"},iphone14:{name:"iPhone 14",styles:{height:"844px",width:"390px"},type:"mobile"},iphone14pro:{name:"iPhone 14 Pro",styles:{height:"852px",width:"393px"},type:"mobile"},iphone14promax:{name:"iPhone 14 Pro Max",styles:{height:"932px",width:"430px"},type:"mobile"},ipad:{name:"iPad",styles:{height:"1024px",width:"768px"},type:"tablet"},ipad10p:{name:"iPad Pro 10.5-in",styles:{height:"1112px",width:"834px"},type:"tablet"},ipad11p:{name:"iPad Pro 11-in",styles:{height:"1194px",width:"834px"},type:"tablet"},ipad12p:{name:"iPad Pro 12.9-in",styles:{height:"1366px",width:"1024px"},type:"tablet"},galaxys5:{name:"Galaxy S5",styles:{height:"640px",width:"360px"},type:"mobile"},galaxys9:{name:"Galaxy S9",styles:{height:"740px",width:"360px"},type:"mobile"},nexus5x:{name:"Nexus 5X",styles:{height:"660px",width:"412px"},type:"mobile"},nexus6p:{name:"Nexus 6P",styles:{height:"732px",width:"412px"},type:"mobile"},pixel:{name:"Pixel",styles:{height:"960px",width:"540px"},type:"mobile"},pixelxl:{name:"Pixel XL",styles:{height:"1280px",width:"720px"},type:"mobile"}},De={mobile1:{name:"Small mobile",styles:{height:"568px",width:"320px"},type:"mobile"},mobile2:{name:"Large mobile",styles:{height:"896px",width:"414px"},type:"mobile"},tablet:{name:"Tablet",styles:{height:"1112px",width:"834px"},type:"tablet"}},Oe={exports:{}};(function(t,o){(function(r,e){t.exports=e(A)})(j,function(r){function e(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}var n=e(r),a={name:"nb",weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),ordinal:function(i){return i+"."},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"}};return n.default.locale(a,null,!0),a})})(Oe);var Ne={exports:{}};(function(t,o){(function(r,e){t.exports=e(A)})(j,function(r){function e(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}var n=e(r),a={name:"nn",weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_la".split("_"),months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),ordinal:function(i){return i+"."},weekStart:1,relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eitt minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månadar",y:"eitt år",yy:"%d år"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"}};return n.default.locale(a,null,!0),a})})(Ne);const Ae=t=>(r,e)=>{const n=e.globals.locale||"nb",a=t[n];return ee.jsx(te,{value:Le({locale:n,messages:a}),children:r()})},je={"uttaksplan.stønadskontotype.AKTIVITETSFRI_FLERBARNSDAGER":"Flerbarnsdager uten aktivitetskrav","uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE":"Foreldrepenger uten aktivitetskrav","uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR":"Foreldrepenger","uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR":"Foreldrepenger med aktivitetskrav","uttaksplan.stønadskontotype.FEDREKVOTE":"Fars kvote","uttaksplan.stønadskontotype.FELLESPERIODE":"Fellesperiode","uttaksplan.stønadskontotype.FLERBARNSDAGER":"Flerbarnsdager","uttaksplan.stønadskontotype.FLERBARNSUKER":"Flerbarnsdager","uttaksplan.stønadskontotype.FORELDREPENGER":"Foreldrepenger","uttaksplan.stønadskontotype.FORELDREPENGER_FØR_FØDSEL":"Foreldrepenger før fødsel","uttaksplan.stønadskontotype.MØDREKVOTE":"Mors kvote","uttaksplan.stønadskontotype.foreldernavn.kvote":"{navn} kvote","uttaksplan.stønadskontotype.dinKvote":"Din kvote","uttaksplan.stønadskontotype.undefined":"Ny periode uten kvote"},Ye={"uttaksplan.stønadskontotype.AKTIVITETSFRI_FLERBARNSDAGER":"Flerbarnsdagar utan aktivitetskrav","uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE":"Foreldrepengar utan aktivitetskrav","uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR":"Foreldrepengar","uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR":"Foreldrepengar med aktivitetskrav","uttaksplan.stønadskontotype.FEDREKVOTE":"Fars kvote","uttaksplan.stønadskontotype.FELLESPERIODE":"Fellesperiode","uttaksplan.stønadskontotype.FLERBARNSDAGER":"Flerbarnsdagar","uttaksplan.stønadskontotype.FLERBARNSUKER":"Flerbarnsdagar","uttaksplan.stønadskontotype.FORELDREPENGER":"Foreldrepengar","uttaksplan.stønadskontotype.FORELDREPENGER_FØR_FØDSEL":"Foreldrepengar før fødsel","uttaksplan.stønadskontotype.MØDREKVOTE":"Mors kvote","uttaksplan.stønadskontotype.foreldernavn.kvote":"{navn} kvote","uttaksplan.stønadskontotype.dinKvote":"Din kvote","uttaksplan.stønadskontotype.undefined":"Ny periode utan kvote"};re.locale("nb");const Ke=Ae({nb:{...je,...L.nb},nn:{...Ye,...L.nb}}),Ge={decorators:[Ke],parameters:{viewport:{viewports:{...Se,...De}}}};export{Ge as default};
