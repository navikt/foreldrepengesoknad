import{c as Q,g as K}from"./index-CTjT7uj6.js";var z={exports:{}};(function(V,tt){(function(I,T){V.exports=T()})(Q,function(){var I=1e3,T=6e4,N=36e5,L="millisecond",S="second",Y="minute",w="hour",m="day",H="week",M="month",U="quarter",y="year",_="date",J="Invalid Date",q=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,B=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,G={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},W=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},P={s:W,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+W(n,2,"0")+":"+W(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,M),a=t-e<0,i=r.clone().add(n+(a?-1:1),M);return+(-(n+(t-e)/(a?e-i:i-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M,y,w:H,d:m,D:_,h:w,m:Y,s:S,ms:L,Q:U}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},k="en",g={};g[k]=G;var R="$isDayjsObject",E=function(s){return s instanceof C||!(!s||!s[R])},j=function s(r,t,n){var e;if(!r)return k;if(typeof r=="string"){var a=r.toLowerCase();g[a]&&(e=a),t&&(g[a]=t,e=a);var i=r.split("-");if(!e&&i.length>1)return s(i[0])}else{var o=r.name;g[o]=r,e=o}return!n&&e&&(k=e),e||!n&&k},f=function(s,r){if(E(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new C(t)},u=P;u.l=j,u.i=E,u.w=function(s,r){return f(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var C=function(){function s(t){this.$L=j(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[R]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,a=n.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(q);if(i){var o=i[2]-1||0,c=(i[7]||"0").substring(0,3);return a?new Date(Date.UTC(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)):new Date(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return u},r.isValid=function(){return this.$d.toString()!==J},r.isSame=function(t,n){var e=f(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return f(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<f(t)},r.$g=function(t,n,e){return u.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,a=!!u.u(n)||n,i=u.p(t),o=function(O,$){var v=u.w(e.$u?Date.UTC(e.$y,$,O):new Date(e.$y,$,O),e);return a?v:v.endOf(m)},c=function(O,$){return u.w(e.toDate()[O].apply(e.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice($)),e)},h=this.$W,d=this.$M,l=this.$D,b="set"+(this.$u?"UTC":"");switch(i){case y:return a?o(1,0):o(31,11);case M:return a?o(1,d):o(0,d+1);case H:var p=this.$locale().weekStart||0,x=(h<p?h+7:h)-p;return o(a?l-x:l+(6-x),d);case m:case _:return c(b+"Hours",0);case w:return c(b+"Minutes",1);case Y:return c(b+"Seconds",2);case S:return c(b+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,a=u.p(t),i="set"+(this.$u?"UTC":""),o=(e={},e[m]=i+"Date",e[_]=i+"Date",e[M]=i+"Month",e[y]=i+"FullYear",e[w]=i+"Hours",e[Y]=i+"Minutes",e[S]=i+"Seconds",e[L]=i+"Milliseconds",e)[a],c=a===m?this.$D+(n-this.$W):n;if(a===M||a===y){var h=this.clone().set(_,1);h.$d[o](c),h.init(),this.$d=h.set(_,Math.min(this.$D,h.daysInMonth())).$d}else o&&this.$d[o](c);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[u.p(t)]()},r.add=function(t,n){var e,a=this;t=Number(t);var i=u.p(n),o=function(d){var l=f(a);return u.w(l.date(l.date()+Math.round(d*t)),a)};if(i===M)return this.set(M,this.$M+t);if(i===y)return this.set(y,this.$y+t);if(i===m)return o(1);if(i===H)return o(7);var c=(e={},e[Y]=T,e[w]=N,e[S]=I,e)[i]||1,h=this.$d.getTime()+t*c;return u.w(h,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||J;var a=t||"YYYY-MM-DDTHH:mm:ssZ",i=u.z(this),o=this.$H,c=this.$m,h=this.$M,d=e.weekdays,l=e.months,b=e.meridiem,p=function($,v,A,F){return $&&($[v]||$(n,a))||A[v].slice(0,F)},x=function($){return u.s(o%12||12,$,"0")},O=b||function($,v,A){var F=$<12?"AM":"PM";return A?F.toLowerCase():F};return a.replace(B,function($,v){return v||function(A){switch(A){case"YY":return String(n.$y).slice(-2);case"YYYY":return u.s(n.$y,4,"0");case"M":return h+1;case"MM":return u.s(h+1,2,"0");case"MMM":return p(e.monthsShort,h,l,3);case"MMMM":return p(l,h);case"D":return n.$D;case"DD":return u.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return p(e.weekdaysMin,n.$W,d,2);case"ddd":return p(e.weekdaysShort,n.$W,d,3);case"dddd":return d[n.$W];case"H":return String(o);case"HH":return u.s(o,2,"0");case"h":return x(1);case"hh":return x(2);case"a":return O(o,c,!0);case"A":return O(o,c,!1);case"m":return String(c);case"mm":return u.s(c,2,"0");case"s":return String(n.$s);case"ss":return u.s(n.$s,2,"0");case"SSS":return u.s(n.$ms,3,"0");case"Z":return i}return null}($)||i.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var a,i=this,o=u.p(n),c=f(t),h=(c.utcOffset()-this.utcOffset())*T,d=this-c,l=function(){return u.m(i,c)};switch(o){case y:a=l()/12;break;case M:a=l();break;case U:a=l()/3;break;case H:a=(d-h)/6048e5;break;case m:a=(d-h)/864e5;break;case w:a=d/N;break;case Y:a=d/T;break;case S:a=d/I;break;default:a=d}return e?a:u.a(a)},r.daysInMonth=function(){return this.endOf(M).$D},r.$locale=function(){return g[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),a=j(t,n,!0);return a&&(e.$L=a),e},r.clone=function(){return u.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),Z=C.prototype;return f.prototype=Z,[["$ms",L],["$s",S],["$m",Y],["$H",w],["$W",m],["$M",M],["$y",y],["$D",_]].forEach(function(s){Z[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),f.extend=function(s,r){return s.$i||(s(r,C,f),s.$i=!0),f},f.locale=j,f.isDayjs=E,f.unix=function(s){return f(1e3*s)},f.en=g[k],f.Ls=g,f.p={},f})})(z);var X=z.exports;const D=K(X),rt="YYYY-MM-DD",nt="DD.MM.YYYY",st="DD. MMMM YYYY",at="HH:mm";D("1000-01-01").toDate();D("9999-31-12").toDate();D().toDate();D().subtract(6,"month").startOf("day").toDate();D().add(1,"years").toDate();D().subtract(1,"years").toDate();D().startOf("days").subtract(3,"years").startOf("day");D().subtract(4,"year").startOf("day");D().subtract(5,"month").startOf("day").toDate();D().subtract(20,"years").startOf("day").toDate();export{nt as D,rt as I,at as T,st as a,D as d};
