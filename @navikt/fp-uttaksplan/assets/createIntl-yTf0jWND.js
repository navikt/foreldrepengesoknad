import{a as U,T as $,b as s,M as G,d as O,I as _,e as c,f as T,g as D,F,E as I,h as q,j as Y,k as K,l as L,m as W,D as X,n as B,o as z,p as H}from"./index-yfcSpLVO.js";import{r as J}from"./index-uubelm5h.js";function p(t,o){return Object.keys(t).reduce(function(e,r){return e[r]=s({timeZone:o},t[r]),e},{})}function P(t,o){var e=Object.keys(s(s({},t),o));return e.reduce(function(r,n){return r[n]=s(s({},t[n]||{}),o[n]||{}),r},{})}function R(t,o){if(!o)return t;var e=_.formats;return s(s(s({},e),t),{date:P(p(e.date,o),p(t.date||{},o)),time:P(p(e.time,o),p(t.time||{},o))})}var w=function(t,o,e,r,n){var a=t.locale,i=t.formats,l=t.messages,m=t.defaultLocale,g=t.defaultFormats,f=t.fallbackOnEmptyString,v=t.onError,E=t.timeZone,M=t.defaultRichTextElements;e===void 0&&(e={id:""});var N=e.id,d=e.defaultMessage;U(!!N,"[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");var y=String(N),u=l&&Object.prototype.hasOwnProperty.call(l,y)&&l[y];if(Array.isArray(u)&&u.length===1&&u[0].type===$.literal)return u[0].value;if(!r&&u&&typeof u=="string"&&!M)return u.replace(/'\{(.*?)\}'/gi,"{$1}");if(r=s(s({},M),r||{}),i=R(i,E),g=R(g,E),!u){if(f===!1&&u==="")return u;if((!d||a&&a.toLowerCase()!==m.toLowerCase())&&v(new G(e,a)),d)try{var h=o.getMessageFormat(d,m,g,n);return h.format(r)}catch(b){return v(new O('Error formatting default message for: "'.concat(y,'", rendering default message verbatim'),a,e,b)),typeof d=="string"?d:y}return y}try{var h=o.getMessageFormat(u,a,i,s({formatters:o},n||{}));return h.format(r)}catch(b){v(new O('Error formatting message: "'.concat(y,'", using ').concat(d?"default message":"id"," as fallback."),a,e,b))}if(d)try{var h=o.getMessageFormat(d,m,g,n);return h.format(r)}catch(b){v(new O('Error formatting the default message for: "'.concat(y,'", rendering message verbatim'),a,e,b))}return typeof u=="string"?u:typeof d=="string"?d:y},x=["formatMatcher","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName","hourCycle","dateStyle","timeStyle","calendar","numberingSystem","fractionalSecondDigits"];function S(t,o,e,r){var n=t.locale,a=t.formats,i=t.onError,l=t.timeZone;r===void 0&&(r={});var m=r.format,g=s(s({},l&&{timeZone:l}),m&&D(a,o,m,i)),f=T(r,x,g);return o==="time"&&!f.hour&&!f.minute&&!f.second&&!f.timeStyle&&!f.dateStyle&&(f=s(s({},f),{hour:"numeric",minute:"numeric"})),e(n,f)}function Q(t,o){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];var n=e[0],a=e[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return S(t,"date",o,i).format(l)}catch(m){t.onError(new c("Error formatting date.",t.locale,m))}return String(l)}function V(t,o){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];var n=e[0],a=e[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return S(t,"time",o,i).format(l)}catch(m){t.onError(new c("Error formatting time.",t.locale,m))}return String(l)}function rr(t,o){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];var n=e[0],a=e[1],i=e[2],l=i===void 0?{}:i,m=t.timeZone,g=t.locale,f=t.onError,v=T(l,x,m?{timeZone:m}:{});try{return o(g,v).formatRange(n,a)}catch(E){f(new c("Error formatting date time range.",t.locale,E))}return String(n)}function tr(t,o){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];var n=e[0],a=e[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return S(t,"date",o,i).formatToParts(l)}catch(m){t.onError(new c("Error formatting date.",t.locale,m))}return[]}function er(t,o){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];var n=e[0],a=e[1],i=a===void 0?{}:a,l=typeof n=="string"?new Date(n||0):n;try{return S(t,"time",o,i).formatToParts(l)}catch(m){t.onError(new c("Error formatting time.",t.locale,m))}return[]}var ar=["style","type","fallback","languageDisplay"];function nr(t,o,e,r){var n=t.locale,a=t.onError,i=Intl.DisplayNames;i||a(new F(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`,I.MISSING_INTL_API));var l=T(r,ar);try{return o(n,l).of(e)}catch(m){a(new c("Error formatting display name.",n,m))}}var or=["type","style"],A=Date.now();function ir(t){return"".concat(A,"_").concat(t,"_").concat(A)}function lr(t,o,e,r){r===void 0&&(r={});var n=k(t,o,e,r).reduce(function(a,i){var l=i.value;return typeof l!="string"?a.push(l):typeof a[a.length-1]=="string"?a[a.length-1]+=l:a.push(l),a},[]);return n.length===1?n[0]:n.length===0?"":n}function k(t,o,e,r){var n=t.locale,a=t.onError;r===void 0&&(r={});var i=Intl.ListFormat;i||a(new F(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`,I.MISSING_INTL_API));var l=T(r,or);try{var m={},g=e.map(function(f,v){if(typeof f=="object"){var E=ir(v);return m[E]=f,E}return String(f)});return o(n,l).formatToParts(g).map(function(f){return f.type==="literal"?f:s(s({},f),{value:m[f.value]||f.value})})}catch(f){a(new c("Error formatting list.",n,f))}return e}var mr=["type"];function sr(t,o,e,r){var n=t.locale,a=t.onError;r===void 0&&(r={}),Intl.PluralRules||a(new F(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,I.MISSING_INTL_API));var i=T(r,mr);try{return o(n,i).select(e)}catch(l){a(new c("Error formatting plural.",n,l))}return"other"}var fr=["numeric","style"];function ur(t,o,e){var r=t.locale,n=t.formats,a=t.onError;e===void 0&&(e={});var i=e.format,l=!!i&&D(n,"relative",i,a)||{},m=T(e,fr,l);return o(r,m)}function cr(t,o,e,r,n){n===void 0&&(n={}),r||(r="second");var a=Intl.RelativeTimeFormat;a||t.onError(new F(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`,I.MISSING_INTL_API));try{return ur(t,o,n).format(e,r)}catch(i){t.onError(new c("Error formatting relative time.",t.locale,i))}return String(e)}var gr=["style","currency","unit","unitDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","currencyDisplay","currencySign","notation","signDisplay","unit","unitDisplay","numberingSystem","trailingZeroDisplay","roundingPriority","roundingIncrement","roundingMode"];function C(t,o,e){var r=t.locale,n=t.formats,a=t.onError;e===void 0&&(e={});var i=e.format,l=i&&D(n,"number",i,a)||{},m=T(e,gr,l);return o(r,m)}function dr(t,o,e,r){r===void 0&&(r={});try{return C(t,o,r).format(e)}catch(n){t.onError(new c("Error formatting number.",t.locale,n))}return String(e)}function vr(t,o,e,r){r===void 0&&(r={});try{return C(t,o,r).formatToParts(e)}catch(n){t.onError(new c("Error formatting number.",t.locale,n))}return[]}function yr(t){var o=t?t[Object.keys(t)[0]]:void 0;return typeof o=="string"}function Er(t){t.onWarn&&t.defaultRichTextElements&&yr(t.messages||{})&&t.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`)}function Tr(t,o){var e=q(o),r=s(s({},Y),t),n=r.locale,a=r.defaultLocale,i=r.onError;return n?!Intl.NumberFormat.supportedLocalesOf(n).length&&i?i(new L('Missing locale data for locale: "'.concat(n,'" in Intl.NumberFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):!Intl.DateTimeFormat.supportedLocalesOf(n).length&&i&&i(new L('Missing locale data for locale: "'.concat(n,'" in Intl.DateTimeFormat. Using default locale: "').concat(a,'" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))):(i&&i(new K('"locale" was not configured, using "'.concat(a,'" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))),r.locale=r.defaultLocale||"en"),Er(r),s(s({},r),{formatters:e,formatNumber:dr.bind(null,r,e.getNumberFormat),formatNumberToParts:vr.bind(null,r,e.getNumberFormat),formatRelativeTime:cr.bind(null,r,e.getRelativeTimeFormat),formatDate:Q.bind(null,r,e.getDateTimeFormat),formatDateToParts:tr.bind(null,r,e.getDateTimeFormat),formatTime:V.bind(null,r,e.getDateTimeFormat),formatDateTimeRange:rr.bind(null,r,e.getDateTimeFormat),formatTimeToParts:er.bind(null,r,e.getDateTimeFormat),formatPlural:sr.bind(null,r,e.getPluralRules),formatMessage:w.bind(null,r,e),$t:w.bind(null,r,e),formatList:lr.bind(null,r,e.getListFormat),formatListToParts:k.bind(null,r,e.getListFormat),formatDisplayName:nr.bind(null,r,e.getDisplayNames)})}function Z(t){return t&&Object.keys(t).reduce(function(o,e){var r=t[e];return o[e]=B(r)?z(r):r,o},{})}var j=function(t,o,e,r){for(var n=[],a=4;a<arguments.length;a++)n[a-4]=arguments[a];var i=Z(r),l=w.apply(void 0,H([t,o,e,i],n,!1));return Array.isArray(l)?J.Children.toArray(l):l},pr=function(t,o){var e=t.defaultRichTextElements,r=W(t,["defaultRichTextElements"]),n=Z(e),a=Tr(s(s(s({},X),r),{defaultRichTextElements:n}),o),i={locale:a.locale,timeZone:a.timeZone,fallbackOnEmptyString:a.fallbackOnEmptyString,formats:a.formats,defaultLocale:a.defaultLocale,defaultFormats:a.defaultFormats,messages:a.messages,onError:a.onError,defaultRichTextElements:n};return s(s({},a),{formatMessage:j.bind(null,i,a.formatters),$t:j.bind(null,i,a.formatters)})};export{pr as c};
