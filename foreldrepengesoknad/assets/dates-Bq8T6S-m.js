import{g as Q}from"./index-DI2V0i71.js";var H={exports:{}},X=H.exports,Z;function ee(){return Z||(Z=1,function(q,ne){(function(R,A){q.exports=A()})(X,function(){var R=1e3,A=6e4,C=36e5,I="millisecond",y="second",b="minute",_="hour",v="day",j="week",c="month",U="quarter",m="year",Y="date",V="Invalid Date",z=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,B=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,K={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var n=["th","st","nd","rd"],e=s%100;return"["+s+(n[(e-20)%10]||n[e]||n[0])+"]"}},W=function(s,n,e){var r=String(s);return!r||r.length>=n?s:""+Array(n+1-r.length).join(e)+s},P={s:W,z:function(s){var n=-s.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),t=e%60;return(n<=0?"+":"-")+W(r,2,"0")+":"+W(t,2,"0")},m:function s(n,e){if(n.date()<e.date())return-s(e,n);var r=12*(e.year()-n.year())+(e.month()-n.month()),t=n.clone().add(r,c),a=e-t<0,o=n.clone().add(r+(a?-1:1),c);return+(-(r+(e-t)/(a?t-o:o-t))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:c,y:m,w:j,d:v,D:Y,h:_,m:b,s:y,ms:I,Q:U}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},S="en",M={};M[S]=K;var G="$isDayjsObject",L=function(s){return s instanceof N||!(!s||!s[G])},F=function s(n,e,r){var t;if(!n)return S;if(typeof n=="string"){var a=n.toLowerCase();M[a]&&(t=a),e&&(M[a]=e,t=a);var o=n.split("-");if(!t&&o.length>1)return s(o[0])}else{var d=n.name;M[d]=n,t=d}return!r&&t&&(S=t),t||!r&&S},f=function(s,n){if(L(s))return s.clone();var e=typeof n=="object"?n:{};return e.date=s,e.args=arguments,new N(e)},i=P;i.l=F,i.i=L,i.w=function(s,n){return f(s,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var N=function(){function s(e){this.$L=F(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[G]=!0}var n=s.prototype;return n.parse=function(e){this.$d=function(r){var t=r.date,a=r.utc;if(t===null)return new Date(NaN);if(i.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var o=t.match(z);if(o){var d=o[2]-1||0,u=(o[7]||"0").substring(0,3);return a?new Date(Date.UTC(o[1],d,o[3]||1,o[4]||0,o[5]||0,o[6]||0,u)):new Date(o[1],d,o[3]||1,o[4]||0,o[5]||0,o[6]||0,u)}}return new Date(t)}(e),this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return i},n.isValid=function(){return this.$d.toString()!==V},n.isSame=function(e,r){var t=f(e);return this.startOf(r)<=t&&t<=this.endOf(r)},n.isAfter=function(e,r){return f(e)<this.startOf(r)},n.isBefore=function(e,r){return this.endOf(r)<f(e)},n.$g=function(e,r,t){return i.u(e)?this[r]:this.set(t,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,r){var t=this,a=!!i.u(r)||r,o=i.p(e),d=function($,p){var k=i.w(t.$u?Date.UTC(t.$y,p,$):new Date(t.$y,p,$),t);return a?k:k.endOf(v)},u=function($,p){return i.w(t.toDate()[$].apply(t.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(p)),t)},l=this.$W,h=this.$M,g=this.$D,O="set"+(this.$u?"UTC":"");switch(o){case m:return a?d(1,0):d(31,11);case c:return a?d(1,h):d(0,h+1);case j:var D=this.$locale().weekStart||0,T=(l<D?l+7:l)-D;return d(a?g-T:g+(6-T),h);case v:case Y:return u(O+"Hours",0);case _:return u(O+"Minutes",1);case b:return u(O+"Seconds",2);case y:return u(O+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,r){var t,a=i.p(e),o="set"+(this.$u?"UTC":""),d=(t={},t[v]=o+"Date",t[Y]=o+"Date",t[c]=o+"Month",t[m]=o+"FullYear",t[_]=o+"Hours",t[b]=o+"Minutes",t[y]=o+"Seconds",t[I]=o+"Milliseconds",t)[a],u=a===v?this.$D+(r-this.$W):r;if(a===c||a===m){var l=this.clone().set(Y,1);l.$d[d](u),l.init(),this.$d=l.set(Y,Math.min(this.$D,l.daysInMonth())).$d}else d&&this.$d[d](u);return this.init(),this},n.set=function(e,r){return this.clone().$set(e,r)},n.get=function(e){return this[i.p(e)]()},n.add=function(e,r){var t,a=this;e=Number(e);var o=i.p(r),d=function(h){var g=f(a);return i.w(g.date(g.date()+Math.round(h*e)),a)};if(o===c)return this.set(c,this.$M+e);if(o===m)return this.set(m,this.$y+e);if(o===v)return d(1);if(o===j)return d(7);var u=(t={},t[b]=A,t[_]=C,t[y]=R,t)[o]||1,l=this.$d.getTime()+e*u;return i.w(l,this)},n.subtract=function(e,r){return this.add(-1*e,r)},n.format=function(e){var r=this,t=this.$locale();if(!this.isValid())return t.invalidDate||V;var a=e||"YYYY-MM-DDTHH:mm:ssZ",o=i.z(this),d=this.$H,u=this.$m,l=this.$M,h=t.weekdays,g=t.months,O=t.meridiem,D=function(p,k,E,x){return p&&(p[k]||p(r,a))||E[k].slice(0,x)},T=function(p){return i.s(d%12||12,p,"0")},$=O||function(p,k,E){var x=p<12?"AM":"PM";return E?x.toLowerCase():x};return a.replace(B,function(p,k){return k||function(E){switch(E){case"YY":return String(r.$y).slice(-2);case"YYYY":return i.s(r.$y,4,"0");case"M":return l+1;case"MM":return i.s(l+1,2,"0");case"MMM":return D(t.monthsShort,l,g,3);case"MMMM":return D(g,l);case"D":return r.$D;case"DD":return i.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return D(t.weekdaysMin,r.$W,h,2);case"ddd":return D(t.weekdaysShort,r.$W,h,3);case"dddd":return h[r.$W];case"H":return String(d);case"HH":return i.s(d,2,"0");case"h":return T(1);case"hh":return T(2);case"a":return $(d,u,!0);case"A":return $(d,u,!1);case"m":return String(u);case"mm":return i.s(u,2,"0");case"s":return String(r.$s);case"ss":return i.s(r.$s,2,"0");case"SSS":return i.s(r.$ms,3,"0");case"Z":return o}return null}(p)||o.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,r,t){var a,o=this,d=i.p(r),u=f(e),l=(u.utcOffset()-this.utcOffset())*A,h=this-u,g=function(){return i.m(o,u)};switch(d){case m:a=g()/12;break;case c:a=g();break;case U:a=g()/3;break;case j:a=(h-l)/6048e5;break;case v:a=(h-l)/864e5;break;case _:a=h/C;break;case b:a=h/A;break;case y:a=h/R;break;default:a=h}return t?a:i.a(a)},n.daysInMonth=function(){return this.endOf(c).$D},n.$locale=function(){return M[this.$L]},n.locale=function(e,r){if(!e)return this.$L;var t=this.clone(),a=F(e,r,!0);return a&&(t.$L=a),t},n.clone=function(){return i.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},s}(),J=N.prototype;return f.prototype=J,[["$ms",I],["$s",y],["$m",b],["$H",_],["$W",v],["$M",c],["$y",m],["$D",Y]].forEach(function(s){J[s[1]]=function(n){return this.$g(n,s[0],s[1])}}),f.extend=function(s,n){return s.$i||(s(n,N,f),s.$i=!0),f},f.locale=F,f.isDayjs=L,f.unix=function(s){return f(1e3*s)},f.en=M[S],f.Ls=M,f.p={},f})}(H)),H.exports}var te=ee();const w=Q(te),se={brukerprofil:"https://tjenester.nav.no/brukerprofil/",brukerstøtte:"https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749",kontaktOss:"https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler",dittNav:"https://tjenester.nav.no/dittnav/oversikt",foreldrepenger:"https://foreldrepenger.nav.no",foreldrepengesoknad:"https://nav.no/foreldrepenger/soknad",foreldrepengerFarOgFar:"https://www.nav.no/foreldrepenger#far-far",foreldrepengerOpptjening:"https://www.nav.no/foreldrepenger#opptjening",nav:"https://www.nav.no",papirsøknad:"https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad",papirsøknadSvp:"https://www.nav.no/start/soknad-svangerskapspenger?stegvalg=1",personvernerklæring:"https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten",plikter:"https://www.nav.no/endringer",søknadsveileder:"https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad",veiviser:"https://familie.nav.no/veiviser",innsyn:"https://foreldrepenger.nav.no",engangsstonad:"https://www.nav.no/engangsstonad",farMedmor:"https://www.nav.no/engangsstonad#far_medmor",barn:"https://www.nav.no/barn",foreldrepengerUtland:"https://www.nav.no/foreldrepenger#utland",engangsstonadHvem:"https://www.nav.no/engangsstonad#hvem",scanneDokument:"https://www.nav.no/brukerstotte#bilde-vedlegg",svangerskapspengerUtland:"https://www.nav.no/no/person/familie/relatert-informasjon/svangerskapspenger-og-utland",søknadsfrister:"https://www.nav.no/foreldrepenger#for-soknad",opphold:"https://www.nav.no/foreldrepenger#opphold",hvorLenge:"https://www.nav.no/foreldrepenger#hvor-lenge",hvorMye:"https://familie.nav.no/hvor-mye",svangerskapspenger:"https://familie.nav.no/om-svangerskapspenger",tilretteleggingsskjema:"https://www.arbeidstilsynet.no/tema/graviditet-og-arbeidsmiljo/skjema-for-tilrettelegging-for-gravide/",rettOgPlikt:"https://www.nav.no/endringer",slikSøkerDuSvp:"https://familie.nav.no/om-svangerskapspenger#slik-soker-du",arbeidstilsynetSkjema:"https://www.arbeidstilsynet.no/tema/graviditet-og-arbeidsmiljo/skjema-for-tilrettelegging-for-gravide/",frilanserInfoBoks:"https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/veiledning/arbeidsforholdet/type-arbeidsforhold/frilanser-oppdragstaker-og-personer-som-mottar-honorarer/",næringsdrivendeInfoBoks:"https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/er-jeg-naringsdrivende/",selvstendigNæringsdrivendeHvorMye:"https://www.nav.no/foreldrepenger#hvor-mye",hvordanSendeInntektsmelding:"https://www.nav.no/no/bedrift/tjenester-og-skjemaer/nav-og-altinn-tjenester/foreldrepenger-og-svangerskapspenger2",omLottOgHyre:"https://www.skatteetaten.no/en/rettskilder/type/handboker/skatte-abc/2021/fiske/F-13.014/F-13.048/",adoptere:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#adoptere",fleksibeltuttak:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#samtidig",viktigeFrister:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#for-soknad",nav_aktivitetskrav:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#hvor-lenge",morsAktivitetskrav:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#hvor-lenge",familie:"https://familie.nav.no/",graderingInfo:"https://www.nav.no/no/person/familie/foreldrepenger/foreldrepenger#arbeid",aktivitetsfriUttakInfo:"https://www.nav.no/foreldrepenger#hvor-lenge",farskapsportal:"https://farskapsportal.nav.no/",barnehageloven:"https://www.regjeringen.no/no/tema/familie-og-barn/barnehager/innsikt/Rett-til-barnehageplass/id2344761/",godkjentAktivitet:"https://www.nav.no/foreldrepenger#hvor-lenge",søknadForeldrepenger:"https://www.nav.no/start/soknad-foreldrepenger",søknadEngangsstønad:"https://www.nav.no/start/soknad-engangsstonad",hvaSkjerNår:"https://familie.nav.no/soke-om-foreldrepenger",grunnbeløpet:"https://www.nav.no/grunnbelopet",folketrygden:"https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden",omForeldrepenger:"https://www.nav.no/foreldrepenger",utbetalingsoversikt:"https://www.nav.no/utbetalingsoversikt/"},ae=/(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/,oe="YYYY-MM-DD",ie="DD.MM.YYYY",de="DD.MM.YY",ue="DD. MMMM YYYY",fe="dddd DD. MMMM YYYY",le="dddd DD.MM.YY",he="D. MMMM YYYY",pe=w("1000-01-01").toDate(),ge=w("9999-31-12").toDate(),ce=w().toDate();w().subtract(6,"month").startOf("day").toDate();const we=w().add(1,"years").toDate(),ve=w().subtract(1,"years").toDate();w().startOf("days").subtract(3,"years").startOf("day");const me=w().subtract(4,"year").startOf("day"),ke=w().subtract(5,"month").startOf("day").toDate(),Me=w().subtract(20,"years").startOf("day").toDate();export{ce as D,oe as I,pe as T,fe as W,Me as a,me as b,ke as c,w as d,ue as e,we as f,ve as g,ae as h,ie as i,ge as j,he as k,se as l,de as m,le as n,ee as r};
