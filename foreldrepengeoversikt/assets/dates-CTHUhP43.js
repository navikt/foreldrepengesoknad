import{c as P,g as Q}from"./index-CTjT7uj6.js";var z={exports:{}};(function(V,tt){(function(F,T){V.exports=T()})(P,function(){var F=1e3,T=6e4,N=36e5,C="millisecond",O="second",S="minute",_="hour",m="day",H="week",M="month",R="quarter",y="year",w="date",U="Invalid Date",q=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,B=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,G={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var n=["th","st","nd","rd"],t=s%100;return"["+s+(n[(t-20)%10]||n[t]||n[0])+"]"}},I=function(s,n,t){var r=String(s);return!r||r.length>=n?s:""+Array(n+1-r.length).join(t)+s},K={s:I,z:function(s){var n=-s.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+I(r,2,"0")+":"+I(e,2,"0")},m:function s(n,t){if(n.date()<t.date())return-s(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,M),a=t-e<0,i=n.clone().add(r+(a?-1:1),M);return+(-(r+(t-e)/(a?e-i:i-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M,y,w:H,d:m,D:w,h:_,m:S,s:O,ms:C,Q:R}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},A="en",Y={};Y[A]=G;var J="$isDayjsObject",L=function(s){return s instanceof j||!(!s||!s[J])},W=function s(n,t,r){var e;if(!n)return A;if(typeof n=="string"){var a=n.toLowerCase();Y[a]&&(e=a),t&&(Y[a]=t,e=a);var i=n.split("-");if(!e&&i.length>1)return s(i[0])}else{var o=n.name;Y[o]=n,e=o}return!r&&e&&(A=e),e||!r&&A},f=function(s,n){if(L(s))return s.clone();var t=typeof n=="object"?n:{};return t.date=s,t.args=arguments,new j(t)},u=K;u.l=W,u.i=L,u.w=function(s,n){return f(s,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var j=function(){function s(t){this.$L=W(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[J]=!0}var n=s.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,a=r.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(q);if(i){var o=i[2]-1||0,c=(i[7]||"0").substring(0,3);return a?new Date(Date.UTC(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)):new Date(i[1],o,i[3]||1,i[4]||0,i[5]||0,i[6]||0,c)}}return new Date(e)}(t),this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return u},n.isValid=function(){return this.$d.toString()!==U},n.isSame=function(t,r){var e=f(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return f(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<f(t)},n.$g=function(t,r,e){return u.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,a=!!u.u(r)||r,i=u.p(t),o=function(p,$){var v=u.w(e.$u?Date.UTC(e.$y,$,p):new Date(e.$y,$,p),e);return a?v:v.endOf(m)},c=function(p,$){return u.w(e.toDate()[p].apply(e.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice($)),e)},h=this.$W,d=this.$M,l=this.$D,b="set"+(this.$u?"UTC":"");switch(i){case y:return a?o(1,0):o(31,11);case M:return a?o(1,d):o(0,d+1);case H:var g=this.$locale().weekStart||0,k=(h<g?h+7:h)-g;return o(a?l-k:l+(6-k),d);case m:case w:return c(b+"Hours",0);case _:return c(b+"Minutes",1);case S:return c(b+"Seconds",2);case O:return c(b+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,a=u.p(t),i="set"+(this.$u?"UTC":""),o=(e={},e[m]=i+"Date",e[w]=i+"Date",e[M]=i+"Month",e[y]=i+"FullYear",e[_]=i+"Hours",e[S]=i+"Minutes",e[O]=i+"Seconds",e[C]=i+"Milliseconds",e)[a],c=a===m?this.$D+(r-this.$W):r;if(a===M||a===y){var h=this.clone().set(w,1);h.$d[o](c),h.init(),this.$d=h.set(w,Math.min(this.$D,h.daysInMonth())).$d}else o&&this.$d[o](c);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[u.p(t)]()},n.add=function(t,r){var e,a=this;t=Number(t);var i=u.p(r),o=function(d){var l=f(a);return u.w(l.date(l.date()+Math.round(d*t)),a)};if(i===M)return this.set(M,this.$M+t);if(i===y)return this.set(y,this.$y+t);if(i===m)return o(1);if(i===H)return o(7);var c=(e={},e[S]=T,e[_]=N,e[O]=F,e)[i]||1,h=this.$d.getTime()+t*c;return u.w(h,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||U;var a=t||"YYYY-MM-DDTHH:mm:ssZ",i=u.z(this),o=this.$H,c=this.$m,h=this.$M,d=e.weekdays,l=e.months,b=e.meridiem,g=function($,v,x,E){return $&&($[v]||$(r,a))||x[v].slice(0,E)},k=function($){return u.s(o%12||12,$,"0")},p=b||function($,v,x){var E=$<12?"AM":"PM";return x?E.toLowerCase():E};return a.replace(B,function($,v){return v||function(x){switch(x){case"YY":return String(r.$y).slice(-2);case"YYYY":return u.s(r.$y,4,"0");case"M":return h+1;case"MM":return u.s(h+1,2,"0");case"MMM":return g(e.monthsShort,h,l,3);case"MMMM":return g(l,h);case"D":return r.$D;case"DD":return u.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return g(e.weekdaysMin,r.$W,d,2);case"ddd":return g(e.weekdaysShort,r.$W,d,3);case"dddd":return d[r.$W];case"H":return String(o);case"HH":return u.s(o,2,"0");case"h":return k(1);case"hh":return k(2);case"a":return p(o,c,!0);case"A":return p(o,c,!1);case"m":return String(c);case"mm":return u.s(c,2,"0");case"s":return String(r.$s);case"ss":return u.s(r.$s,2,"0");case"SSS":return u.s(r.$ms,3,"0");case"Z":return i}return null}($)||i.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var a,i=this,o=u.p(r),c=f(t),h=(c.utcOffset()-this.utcOffset())*T,d=this-c,l=function(){return u.m(i,c)};switch(o){case y:a=l()/12;break;case M:a=l();break;case R:a=l()/3;break;case H:a=(d-h)/6048e5;break;case m:a=(d-h)/864e5;break;case _:a=d/N;break;case S:a=d/T;break;case O:a=d/F;break;default:a=d}return e?a:u.a(a)},n.daysInMonth=function(){return this.endOf(M).$D},n.$locale=function(){return Y[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),a=W(t,r,!0);return a&&(e.$L=a),e},n.clone=function(){return u.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},s}(),Z=j.prototype;return f.prototype=Z,[["$ms",C],["$s",O],["$m",S],["$H",_],["$W",m],["$M",M],["$y",y],["$D",w]].forEach(function(s){Z[s[1]]=function(n){return this.$g(n,s[0],s[1])}}),f.extend=function(s,n){return s.$i||(s(n,j,f),s.$i=!0),f},f.locale=W,f.isDayjs=L,f.unix=function(s){return f(1e3*s)},f.en=Y[A],f.Ls=Y,f.p={},f})})(z);var X=z.exports;const D=Q(X),nt="YYYY-MM-DD",rt="DD.MM.YYYY",st="DD. MMMM YYYY",at="HH:mm",it="dddd DD. MMMM YYYY";D("1000-01-01").toDate();D("9999-31-12").toDate();D().toDate();D().subtract(6,"month").startOf("day").toDate();D().add(1,"years").toDate();D().subtract(1,"years").toDate();D().startOf("days").subtract(3,"years").startOf("day");D().subtract(4,"year").startOf("day");D().subtract(5,"month").startOf("day").toDate();D().subtract(20,"years").startOf("day").toDate();export{rt as D,nt as I,at as T,it as W,X as a,st as b,D as d};
