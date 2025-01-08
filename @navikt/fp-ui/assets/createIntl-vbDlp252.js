import{b as Z,T as U,d as m,M as $,e as D,I as G,f as c,g as w,h as T,F as I,E as S,j as _,k as q,l as Y,m as L,_ as K,D as W,n as X,o as B,p as z}from"./index-Big-v_KR.js";import{r as H}from"./index-BX3iQpgp.js";function F(e,o){return Object.keys(e).reduce(function(t,r){return t[r]=m({timeZone:o},e[r]),t},{})}function P(e,o){var t=Object.keys(m(m({},e),o));return t.reduce(function(r,n){return r[n]=m(m({},e[n]||{}),o[n]||{}),r},{})}function R(e,o){if(!o)return e;var t=G.formats;return m(m(m({},t),e),{date:P(F(t.date,o),F(e.date||{},o)),time:P(F(t.time,o),F(e.time||{},o))})}var O=function(e,o,t,r,n){var a=e.locale,i=e.formats,l=e.messages,s=e.defaultLocale,g=e.defaultFormats,f=e.fallbackOnEmptyString,y=e.onError,E=e.timeZone,M=e.defaultRichTextElements;t===void 0&&(t={id:""});var N=t.id,d=t.defaultMessage;Z(!!N,"[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.github.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.github.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.github.io/docs/tooling/linter#enforce-id)\nto autofix this issue");var v=String(N),u=l&&Object.prototype.hasOwnProperty.call(l,v)&&l[v];if(Array.isArray(u)&&u.length===1&&u[0].type===U.literal)return u[0].value;if(!r&&u&&typeof u=="string"&&!M)return u.replace(/'\{(.*?)\}'/gi,"{$1}");if(r=m(m({},M),r||{}),i=R(i,E),g=R(g,E),!u){if(f===!1&&u==="")return u;if((!d||a&&a.toLowerCase()!==s.toLowerCase())&&y(new $(t,a)),d)try{var h=o.getMessageFormat(d,s,g,n);return h.format(r)}catch(b){return y(new D('Error formatting default message for: "'.concat(v,'", rendering default message verbatim'),a,t,b)),typeof d=="string"?d:v}return v}try{var h=o.getMessageFormat(u,a,i,m({formatters:o},n||{}));return h.format(r)}catch(b){y(new D('Error formatting message: "'.concat(v,'", using ').concat(d?"default message":"id"," as fallback."),a,t,b))}if(d)try{var h=o.getMessageFormat(d,s,g,n);return h.format(r)}catch(b){y(new D('Error formatting the default message for: "'.concat(v,'", rendering message verbatim'),a,t,b))}return typeof u=="string"?u:typeof d=="string"?d:v},J=["formatMatcher","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName","hourCycle","dateStyle","timeStyle","calendar","numberingSystem","fractionalSecondDigits"];function p(e,o,t,r){var n=e.locale,a=e.formats,i=e.onError,l=e.timeZone;r===void 0&&(r={});var s=r.format,g=m(m({},l&&{timeZone:l}),s&&w(a,o,s,i)),f=T(r,J,g);return o==="time"&&!f.hour&&!f.minute&&!f.second&&!f.timeStyle&&!f.dateStyle&&(f=m(m({},f),{hour:"numeric",minute:"numeric"})),t(n,f)}function Q(e,o){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var n=t[0],a=t[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return p(e,"date",o,i).format(l)}catch(s){e.onError(new c("Error formatting date.",e.locale,s))}return String(l)}function V(e,o){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var n=t[0],a=t[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return p(e,"time",o,i).format(l)}catch(s){e.onError(new c("Error formatting time.",e.locale,s))}return String(l)}function rr(e,o){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var n=t[0],a=t[1],i=t[2],l=i===void 0?{}:i,s=typeof n=="string"?new Date(n||0):n,g=typeof a=="string"?new Date(a||0):a;try{return p(e,"dateTimeRange",o,l).formatRange(s,g)}catch(f){e.onError(new c("Error formatting date time range.",e.locale,f))}return String(s)}function er(e,o){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var n=t[0],a=t[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return p(e,"date",o,i).formatToParts(l)}catch(s){e.onError(new c("Error formatting date.",e.locale,s))}return[]}function tr(e,o){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var n=t[0],a=t[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return p(e,"time",o,i).formatToParts(l)}catch(s){e.onError(new c("Error formatting time.",e.locale,s))}return[]}var ar=["style","type","fallback","languageDisplay"];function nr(e,o,t,r){var n=e.locale,a=e.onError,i=Intl.DisplayNames;i||a(new I(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`,S.MISSING_INTL_API));var l=T(r,ar);try{return o(n,l).of(t)}catch(s){a(new c("Error formatting display name.",n,s))}}var or=["type","style"],A=Date.now();function ir(e){return"".concat(A,"_").concat(e,"_").concat(A)}function lr(e,o,t,r){r===void 0&&(r={});var n=x(e,o,t,r).reduce(function(a,i){var l=i.value;return typeof l!="string"?a.push(l):typeof a[a.length-1]=="string"?a[a.length-1]+=l:a.push(l),a},[]);return n.length===1?n[0]:n.length===0?"":n}function x(e,o,t,r){var n=e.locale,a=e.onError;r===void 0&&(r={});var i=Intl.ListFormat;i||a(new I(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`,S.MISSING_INTL_API));var l=T(r,or);try{var s={},g=t.map(function(f,y){if(typeof f=="object"){var E=ir(y);return s[E]=f,E}return String(f)});return o(n,l).formatToParts(g).map(function(f){return f.type==="literal"?f:m(m({},f),{value:s[f.value]||f.value})})}catch(f){a(new c("Error formatting list.",n,f))}return t}var sr=["type"];function mr(e,o,t,r){var n=e.locale,a=e.onError;r===void 0&&(r={}),Intl.PluralRules||a(new I(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,S.MISSING_INTL_API));var i=T(r,sr);try{return o(n,i).select(t)}catch(l){a(new c("Error formatting plural.",n,l))}return"other"}var fr=["numeric","style"];function ur(e,o,t){var r=e.locale,n=e.formats,a=e.onError;t===void 0&&(t={});var i=t.format,l=!!i&&w(n,"relative",i,a)||{},s=T(t,fr,l);return o(r,s)}function cr(e,o,t,r,n){n===void 0&&(n={}),r||(r="second");var a=Intl.RelativeTimeFormat;a||e.onError(new I(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`,S.MISSING_INTL_API));try{return ur(e,o,n).format(t,r)}catch(i){e.onError(new c("Error formatting relative time.",e.locale,i))}return String(t)}var gr=["style","currency","unit","unitDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","currencyDisplay","currencySign","notation","signDisplay","unit","unitDisplay","numberingSystem","trailingZeroDisplay","roundingPriority","roundingIncrement","roundingMode"];function k(e,o,t){var r=e.locale,n=e.formats,a=e.onError;t===void 0&&(t={});var i=t.format,l=i&&w(n,"number",i,a)||{},s=T(t,gr,l);return o(r,s)}function dr(e,o,t,r){r===void 0&&(r={});try{return k(e,o,r).format(t)}catch(n){e.onError(new c("Error formatting number.",e.locale,n))}return String(t)}function vr(e,o,t,r){r===void 0&&(r={});try{return k(e,o,r).formatToParts(t)}catch(n){e.onError(new c("Error formatting number.",e.locale,n))}return[]}function yr(e){var o=e[Object.keys(e)[0]];return typeof o=="string"}function Tr(e){e.onWarn&&e.defaultRichTextElements&&yr(e.messages||{})&&e.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.github.io/docs/getting-started/message-distribution`)}function Er(e,o){var t=_(o),r=m(m({},q),e),n=r.locale,a=r.defaultLocale,i=r.onError;return n?!Intl.NumberFormat.supportedLocalesOf(n).length&&i?i(new L('Missing locale data for locale: "'.concat(n,'" in Intl.NumberFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details'))):!Intl.DateTimeFormat.supportedLocalesOf(n).length&&i&&i(new L('Missing locale data for locale: "'.concat(n,'" in Intl.DateTimeFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.github.io/docs/react-intl#runtime-requirements for more details'))):(i&&i(new Y('"locale" was not configured, using "'.concat(a,'" as fallback. See https://formatjs.github.io/docs/react-intl/api#intlshape for more details'))),r.locale=r.defaultLocale||"en"),Tr(r),m(m({},r),{formatters:t,formatNumber:dr.bind(null,r,t.getNumberFormat),formatNumberToParts:vr.bind(null,r,t.getNumberFormat),formatRelativeTime:cr.bind(null,r,t.getRelativeTimeFormat),formatDate:Q.bind(null,r,t.getDateTimeFormat),formatDateToParts:er.bind(null,r,t.getDateTimeFormat),formatTime:V.bind(null,r,t.getDateTimeFormat),formatDateTimeRange:rr.bind(null,r,t.getDateTimeFormat),formatTimeToParts:tr.bind(null,r,t.getDateTimeFormat),formatPlural:mr.bind(null,r,t.getPluralRules),formatMessage:O.bind(null,r,t),$t:O.bind(null,r,t),formatList:lr.bind(null,r,t.getListFormat),formatListToParts:x.bind(null,r,t.getListFormat),formatDisplayName:nr.bind(null,r,t.getDisplayNames)})}function C(e){return e&&Object.keys(e).reduce(function(o,t){var r=e[t];return o[t]=X(r)?B(r):r,o},{})}var j=function(e,o,t,r){for(var n=[],a=4;a<arguments.length;a++)n[a-4]=arguments[a];var i=C(r),l=O.apply(void 0,z([e,o,t,i],n,!1));return Array.isArray(l)?H.Children.toArray(l):l},pr=function(e,o){var t=e.defaultRichTextElements,r=K(e,["defaultRichTextElements"]),n=C(t),a=Er(m(m(m({},W),r),{defaultRichTextElements:n}),o),i={locale:a.locale,timeZone:a.timeZone,fallbackOnEmptyString:a.fallbackOnEmptyString,formats:a.formats,defaultLocale:a.defaultLocale,defaultFormats:a.defaultFormats,messages:a.messages,onError:a.onError,defaultRichTextElements:n};return m(m({},a),{formatMessage:j.bind(null,i,a.formatters),$t:j.bind(null,i,a.formatters)})};export{pr as c};
