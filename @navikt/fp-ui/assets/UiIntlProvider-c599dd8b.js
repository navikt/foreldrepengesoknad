import{c as ge,g as fe}from"./_commonjsHelpers-de833af9.js";import{r as D,R as V}from"./index-76fb7be0.js";import{b as q,s as Q,u as re}from"./index-886ea976.js";import{j as pe}from"./jsx-runtime-ffb262ed.js";import{I as me}from"./provider-7c0ce87c.js";var ae={exports:{}};(function(e,o){(function(i,t){e.exports=t()})(ge,function(){var i=1e3,t=6e4,l=36e5,f="millisecond",h="second",y="minute",k="hour",v="day",I="week",S="month",N="quarter",P="year",O="date",G="Invalid Date",le=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,ue=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,de={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(u){var a=["th","st","nd","rd"],n=u%100;return"["+u+(a[(n-20)%10]||a[n]||a[0])+"]"}},K=function(u,a,n){var s=String(u);return!s||s.length>=a?u:""+Array(a+1-s.length).join(n)+u},ce={s:K,z:function(u){var a=-u.utcOffset(),n=Math.abs(a),s=Math.floor(n/60),r=n%60;return(a<=0?"+":"-")+K(s,2,"0")+":"+K(r,2,"0")},m:function u(a,n){if(a.date()<n.date())return-u(n,a);var s=12*(n.year()-a.year())+(n.month()-a.month()),r=a.clone().add(s,S),d=n-r<0,c=a.clone().add(s+(d?-1:1),S);return+(-(s+(n-r)/(d?r-c:c-r))||0)},a:function(u){return u<0?Math.ceil(u)||0:Math.floor(u)},p:function(u){return{M:S,y:P,w:I,d:v,D:O,h:k,m:y,s:h,ms:f,Q:N}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(u){return u===void 0}},A="en",E={};E[A]=de;var Z="$isDayjsObject",W=function(u){return u instanceof B||!(!u||!u[Z])},H=function u(a,n,s){var r;if(!a)return A;if(typeof a=="string"){var d=a.toLowerCase();E[d]&&(r=d),n&&(E[d]=n,r=d);var c=a.split("-");if(!r&&c.length>1)return u(c[0])}else{var p=a.name;E[p]=a,r=p}return!s&&r&&(A=r),r||!s&&A},b=function(u,a){if(W(u))return u.clone();var n=typeof a=="object"?a:{};return n.date=u,n.args=arguments,new B(n)},g=ce;g.l=H,g.i=W,g.w=function(u,a){return b(u,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var B=function(){function u(n){this.$L=H(n.locale,null,!0),this.parse(n),this.$x=this.$x||n.x||{},this[Z]=!0}var a=u.prototype;return a.parse=function(n){this.$d=function(s){var r=s.date,d=s.utc;if(r===null)return new Date(NaN);if(g.u(r))return new Date;if(r instanceof Date)return new Date(r);if(typeof r=="string"&&!/Z$/i.test(r)){var c=r.match(le);if(c){var p=c[2]-1||0,m=(c[7]||"0").substring(0,3);return d?new Date(Date.UTC(c[1],p,c[3]||1,c[4]||0,c[5]||0,c[6]||0,m)):new Date(c[1],p,c[3]||1,c[4]||0,c[5]||0,c[6]||0,m)}}return new Date(r)}(n),this.init()},a.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},a.$utils=function(){return g},a.isValid=function(){return this.$d.toString()!==G},a.isSame=function(n,s){var r=b(n);return this.startOf(s)<=r&&r<=this.endOf(s)},a.isAfter=function(n,s){return b(n)<this.startOf(s)},a.isBefore=function(n,s){return this.endOf(s)<b(n)},a.$g=function(n,s,r){return g.u(n)?this[s]:this.set(r,n)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(n,s){var r=this,d=!!g.u(s)||s,c=g.p(n),p=function(T,M){var j=g.w(r.$u?Date.UTC(r.$y,M,T):new Date(r.$y,M,T),r);return d?j:j.endOf(v)},m=function(T,M){return g.w(r.toDate()[T].apply(r.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(M)),r)},$=this.$W,w=this.$M,F=this.$D,L="set"+(this.$u?"UTC":"");switch(c){case P:return d?p(1,0):p(31,11);case S:return d?p(1,w):p(0,w+1);case I:var _=this.$locale().weekStart||0,U=($<_?$+7:$)-_;return p(d?F-U:F+(6-U),w);case v:case O:return m(L+"Hours",0);case k:return m(L+"Minutes",1);case y:return m(L+"Seconds",2);case h:return m(L+"Milliseconds",3);default:return this.clone()}},a.endOf=function(n){return this.startOf(n,!1)},a.$set=function(n,s){var r,d=g.p(n),c="set"+(this.$u?"UTC":""),p=(r={},r[v]=c+"Date",r[O]=c+"Date",r[S]=c+"Month",r[P]=c+"FullYear",r[k]=c+"Hours",r[y]=c+"Minutes",r[h]=c+"Seconds",r[f]=c+"Milliseconds",r)[d],m=d===v?this.$D+(s-this.$W):s;if(d===S||d===P){var $=this.clone().set(O,1);$.$d[p](m),$.init(),this.$d=$.set(O,Math.min(this.$D,$.daysInMonth())).$d}else p&&this.$d[p](m);return this.init(),this},a.set=function(n,s){return this.clone().$set(n,s)},a.get=function(n){return this[g.p(n)]()},a.add=function(n,s){var r,d=this;n=Number(n);var c=g.p(s),p=function(w){var F=b(d);return g.w(F.date(F.date()+Math.round(w*n)),d)};if(c===S)return this.set(S,this.$M+n);if(c===P)return this.set(P,this.$y+n);if(c===v)return p(1);if(c===I)return p(7);var m=(r={},r[y]=t,r[k]=l,r[h]=i,r)[c]||1,$=this.$d.getTime()+n*m;return g.w($,this)},a.subtract=function(n,s){return this.add(-1*n,s)},a.format=function(n){var s=this,r=this.$locale();if(!this.isValid())return r.invalidDate||G;var d=n||"YYYY-MM-DDTHH:mm:ssZ",c=g.z(this),p=this.$H,m=this.$m,$=this.$M,w=r.weekdays,F=r.months,L=r.meridiem,_=function(M,j,C,Y){return M&&(M[j]||M(s,d))||C[j].slice(0,Y)},U=function(M){return g.s(p%12||12,M,"0")},T=L||function(M,j,C){var Y=M<12?"AM":"PM";return C?Y.toLowerCase():Y};return d.replace(ue,function(M,j){return j||function(C){switch(C){case"YY":return String(s.$y).slice(-2);case"YYYY":return g.s(s.$y,4,"0");case"M":return $+1;case"MM":return g.s($+1,2,"0");case"MMM":return _(r.monthsShort,$,F,3);case"MMMM":return _(F,$);case"D":return s.$D;case"DD":return g.s(s.$D,2,"0");case"d":return String(s.$W);case"dd":return _(r.weekdaysMin,s.$W,w,2);case"ddd":return _(r.weekdaysShort,s.$W,w,3);case"dddd":return w[s.$W];case"H":return String(p);case"HH":return g.s(p,2,"0");case"h":return U(1);case"hh":return U(2);case"a":return T(p,m,!0);case"A":return T(p,m,!1);case"m":return String(m);case"mm":return g.s(m,2,"0");case"s":return String(s.$s);case"ss":return g.s(s.$s,2,"0");case"SSS":return g.s(s.$ms,3,"0");case"Z":return c}return null}(M)||c.replace(":","")})},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(n,s,r){var d,c=this,p=g.p(s),m=b(n),$=(m.utcOffset()-this.utcOffset())*t,w=this-m,F=function(){return g.m(c,m)};switch(p){case P:d=F()/12;break;case S:d=F();break;case N:d=F()/3;break;case I:d=(w-$)/6048e5;break;case v:d=(w-$)/864e5;break;case k:d=w/l;break;case y:d=w/t;break;case h:d=w/i;break;default:d=w}return r?d:g.a(d)},a.daysInMonth=function(){return this.endOf(S).$D},a.$locale=function(){return E[this.$L]},a.locale=function(n,s){if(!n)return this.$L;var r=this.clone(),d=H(n,s,!0);return d&&(r.$L=d),r},a.clone=function(){return g.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},u}(),J=B.prototype;return b.prototype=J,[["$ms",f],["$s",h],["$m",y],["$H",k],["$W",v],["$M",S],["$y",P],["$D",O]].forEach(function(u){J[u[1]]=function(a){return this.$g(a,u[0],u[1])}}),b.extend=function(u,a){return u.$i||(u(a,B,b),u.$i=!0),b},b.locale=H,b.isDayjs=W,b.unix=function(u){return b(1e3*u)},b.en=E[A],b.Ls=E,b.p={},b})})(ae);var he=ae.exports;const x=fe(he);x("1000-01-01").toDate();x("9999-31-12").toDate();x().toDate();x().subtract(6,"month").startOf("day").toDate();x().add(1,"years").toDate();x().subtract(1,"years").toDate();function oe(e){var o,i,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e))for(o=0;o<e.length;o++)e[o]&&(i=oe(e[o]))&&(t&&(t+=" "),t+=i);else for(o in e)e[o]&&(t&&(t+=" "),t+=o);return t}function R(){for(var e,o,i=0,t="";i<arguments.length;)(e=arguments[i++])&&(o=oe(e))&&(t&&(t+=" "),t+=o);return t}const ye=e=>R({"navds-typo--spacing":e.spacing,"navds-typo--truncate":e.truncate,"navds-typo--semibold":e.weight==="semibold",[`navds-typo--align-${e.align}`]:e.align,[`navds-typo--color-${e.textColor}`]:e.textColor,"navds-typo--visually-hidden":e.visuallyHidden,"navds-typo--uppercase":e.uppercase});var ke=globalThis&&globalThis.__rest||function(e,o){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)o.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(i[t[l]]=e[t[l]]);return i};const ve=D.forwardRef((e,o)=>{var{className:i,size:t="medium",as:l="p",spacing:f,truncate:h,weight:y="regular",align:k,visuallyHidden:v,textColor:I}=e,S=ke(e,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);return V.createElement(l,Object.assign({},S,{ref:o,className:R(i,"navds-body-long",`navds-body-long--${t}`,ye({spacing:f,truncate:h,weight:y,align:k,visuallyHidden:v,textColor:I}))}))}),Ne=ve;let X=0;function Se(e){const[o,i]=D.useState(e),t=e||o;return D.useEffect(()=>{o==null&&(X+=1,i(`aksel-icon-${X}`))},[o]),t}const ee=V["useId"];function be(e){var o;if(ee!==void 0){const i=ee();return e??i.replace(/(:)/g,"")}return(o=Se(e))!==null&&o!==void 0?o:""}var $e=globalThis&&globalThis.__rest||function(e,o){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)o.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(i[t[l]]=e[t[l]]);return i};const De=D.forwardRef((e,o)=>{var{title:i,titleId:t}=e,l=$e(e,["title","titleId"]);let f=be();return f=i?t||"title-"+f:void 0,D.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":f},l),i?D.createElement("title",{id:f},i):null,D.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06Z",fill:"currentColor"}))}),He=De;var we=globalThis&&globalThis.__rest||function(e,o){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)o.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(i[t[l]]=e[t[l]]);return i};const Me=D.forwardRef((e,o)=>{var{as:i="a",className:t,underline:l=!0,variant:f="action",inlineText:h=!1}=e,y=we(e,["as","className","underline","variant","inlineText"]);return V.createElement(i,Object.assign({},y,{ref:o,className:R("navds-link",t,`navds-link--${f}`,{"navds-link--remove-underline":!l,"navds-link--inline-text":h})}))}),Be=Me;function z(e,o,i){return i?typeof i=="string"?{[`--__ac-${e}-${o}-xs`]:i}:Object.fromEntries(Object.entries(i).map(([t,l])=>[`--__ac-${e}-${o}-${t}`,l])):{}}const Oe=e=>{switch(e){case"px":return"1px"}return e},te=(e,o,i,t,l)=>o.split(" ").map((f,h,y)=>{if(e==="margin-inline"&&f==="full")return`calc((100vw - ${100/y.length}%)/-2)`;let k=`var(--a-${i}-${f})`;return t.includes(f)&&(k=Oe(f)),l?f==="0"?"0":`calc(-1 * ${k})`:k}).join(" ");function Fe(e,o,i,t,l=!1,f=[]){if(!t)return{};if(typeof t=="string")return{[`--__ac-${e}-${o}-xs`]:te(o,t,i,f,l)};const h={};return Object.entries(t).forEach(([y,k])=>{h[`--__ac-${e}-${o}-${y}`]=te(o,k,i,f,l)}),h}var Ie=globalThis&&globalThis.__rest||function(e,o){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)o.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(i[t[l]]=e[t[l]]);return i};const Pe=D.forwardRef((e,o)=>{var{as:i="div",className:t,align:l,justify:f,wrap:h=!0,gap:y,style:k,direction:v="row"}=e,I=Ie(e,["as","className","align","justify","wrap","gap","style","direction"]);const S=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},k),{"--__ac-stack-wrap":h?"wrap":"nowrap"}),Fe("stack","gap","spacing",y)),z("stack","direction",v)),z("stack","align",l)),z("stack","justify",f));return V.createElement(i,Object.assign({},I,{ref:o,style:S,className:R("navds-stack",t,{"navds-vstack":v==="column","navds-hstack":v==="row"})}))}),Ye=D.forwardRef((e,o)=>V.createElement(Pe,Object.assign({},e,{ref:o,direction:"column",wrap:!1})));function je(e,o){var i=e.values,t=q(e,["values"]),l=o.values,f=q(o,["values"]);return Q(l,i)&&Q(t,f)}function ie(e){var o=re(),i=o.formatMessage,t=o.textComponent,l=t===void 0?D.Fragment:t,f=e.id,h=e.description,y=e.defaultMessage,k=e.values,v=e.children,I=e.tagName,S=I===void 0?l:I,N=e.ignoreTag,P={id:f,description:h,defaultMessage:y},O=i(P,k,{ignoreTag:N});return typeof v=="function"?v(Array.isArray(O)?O:[O]):S?D.createElement(S,null,D.Children.toArray(O)):D.createElement(D.Fragment,null,O)}ie.displayName="FormattedMessage";var se=D.memo(ie,je);se.displayName="MemoizedFormattedMessage";const Re=se,Ee={"Umyndig.Pageheading.Engangsstonad":"Søknad om engangsstønad","Umyndig.Pageheading.Foreldrepenger":"Søknad om foreldrepenger","Umyndig.Pageheading.Svangerskapspenger":"Søknad om svangerskapspenger","Umyndig.Tittel":"Fordi du er under 18 år, må du sende papirsøknad","Umyndig.Tekst":"Fordi du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden din sammen med deg. Derfor må du fylle ut søknaden på papir og sende den i posten til NAV.","Umyndig.Knapp.Papirsøknad":"Gå til papirsøknaden","ErrorSummaryFp.Tittel":"Du må rette opp i følgende feil:","FileInput.Vedlegg.Lastoppknapp":"Last opp fil","FileInput.Vedlegg.Lastoppknapp.Flere":"Last opp flere filer","Attachment.Vedlegg.Slett":"Fjern vedlegg {navn}","FailedAttachment.Vedlegg.Feilmelding.Opplasting.Feilet":"{filename} - Ops noe gikk galt prøv igjen","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Størrelse":"{filename} - er for stor. Maksimal tillat filstørrelse er {maxStørrelse}KB.","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Type":"{filename} - Vedlegg er ikke av gyldig type","FailedAttachment.Vedlegg.Feilmelding.Timeout":"{filename} - Det tok for lang tid å laste opp dokumentet ditt. Sjekk nettverket ditt eller prøv å laste opp færre dokumenter på en gang","StepButtons.Forrige":"Forrige steg","StepButtons.Neste":"Neste steg","StepButtons.Send":"Send søknaden","ErrorPage.Engangsstønad":"Engangsstønad","ErrorPage.Foreldrepenger":"Foreldrepenger","ErrorPage.Svangerskapspenger":"Svangerskapspenger","ErrorPage.Heading":"Beklager, noe har gått galt med søknaden din på grunn av en teknisk feil hos oss","ErrorPage.Message":"Du kan vente litt og deretter prøve å søke på nytt.  Dersom det fortsatt er problemer kan du kontakte brukerstøtte for å få hjelp.","ErrorPage.Contact":"Kontakt brukerstøtte","ErrorPage.TryAgain":"Søk på nytt","ErrorPage.ErrorMessage":"Feilmelding","ScanDocumentInfo.Tittel":"Hvordan ta bilde av et dokument med mobilen","ScanDocumentInfo.Del1":"Har du et dokument på papir, kan du ta et bilde av dokumentet for å sende det til oss.","ScanDocumentInfo.Liste.Punkt1":"Ta bilde av dokumentet med smarttelefonen eller nettbrettet.","ScanDocumentInfo.Liste.Punkt2":"Sjekk at dokumentet er lett å lese.","ScanDocumentInfo.Liste.Punkt3":"Logg inn på nav.no via mobilen – last opp og legg bildene ved den elektroniske søknaden.","ScanDocumentInfo.Liste.Punkt4":"Ønsker du å bruke PC eller Mac, kan du sende bildene til din private e-postkonto og lagre bildene på enheten din.","ScanDocumentInfo.Liste.Punkt5":"Last opp og legg bildene ved den elektroniske søknaden din.","ScanDocumentInfo.Del2":"Har du skanner, kan du skanne dokumenter.","ScanDocumentInfo.Link":"Mer informasjon om å sende vedlegg på nav.no."},_e={"Umyndig.Pageheading.Engangsstonad":"Søknad om eingongsstønad","Umyndig.Pageheading.Foreldrepenger":"Søknad om foreldrepenger","Umyndig.Pageheading.Svangerskapspenger":"Søknad om svangerskapspenger","Umyndig.Tittel":"Fordi du er under 18 år, må du senda papirsøknad","Umyndig.Tekst":"Fordi du er under 18 år, må ein av foreldrene dine eller ein føresatt skrive under på søknaden din samen med deg. Derfor må du fylle ut søknaden på papir og sende den i posten til NAV.","Umyndig.Knapp.Papirsøknad":"Gå til papirsøknaden","ErrorSummaryFp.Tittel":"Du må rette opp i følgende feil:","FileInput.Vedlegg.Lastoppknapp":"Last opp fil","FileInput.Vedlegg.Lastoppknapp.Flere":"Last opp flere filer","Attachment.Vedlegg.Slett":"Fjern vedlegg {navn}","FailedAttachment.Vedlegg.Feilmelding.Opplasting.Feilet":"{filename} - Ops noko gjekk gale prøv igjen","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Størrelse":"{filename} - er for stor. Maksimal tillat filstørrelse er {maxStørrelse}KB.","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Type":"{filename} - Vedlegg er ikkje av gyldig type","FailedAttachment.Vedlegg.Feilmelding.Timeout":"{filename} - Det tok for lang tid å lasta opp dokumentet ditt. Sjekk nettverket ditt eller prøv å last opp færre dokument på ein gong","StepButtons.Forrige":"Forrige steg","StepButtons.Neste":"Neste steg","StepButtons.Send":"Send søknaden","ErrorPage.Engangsstønad":"Eingongsstønad","ErrorPage.Foreldrepenger":"Foreldrepenger","ErrorPage.Svangerskapspenger":"Svangerskapspenger","ErrorPage.Heading":"Beklager, noko har gått feil med søknaden din på grunn av ein teknisk feil hjå oss","ErrorPage.Message":"Du kan venta litt og deretter prøva å søka på nytt. Dersom det fortsatt er problem kan du kontakta brukarstøtte for å få hjelp.","ErrorPage.Contact":"Kontakt brukerstøtte","ErrorPage.TryAgain":"Søk på nytt","ErrorPage.ErrorMessage":"Feilmelding","ScanDocumentInfo.Tittel":"Korleis ta bilde av eit dokument med mobilen","ScanDocumentInfo.Del1":"Har du eit dokument på papir, kan du ta eit bilde av dokumentet for å sende det til oss.","ScanDocumentInfo.Liste.Punkt1":"Ta bilde av dokumentet med smarttelefonen eller nettbrettet.","ScanDocumentInfo.Liste.Punkt2":"Sjekk at dokumentet er lett å lese.","ScanDocumentInfo.Liste.Punkt3":"Logg inn på nav.no via mobilen – last opp og legg bileta ved den elektroniske søknaden.","ScanDocumentInfo.Liste.Punkt4":"Ønskjer du å bruka PC eller Mac, kan du senda bileta til den private e-postkontoen din og lagra bileta på eininga di.","ScanDocumentInfo.Liste.Punkt5":"Last opp og legg bileta ved den elektroniske søknaden din.","ScanDocumentInfo.Del2":"Har du skannar, kan du skanne dokument.","ScanDocumentInfo.Link":"Meir informasjon om å senda vedlegg på nav.no."},Te={"Umyndig.Pageheading.Engangsstonad":"Application for lump-sum grant","Umyndig.Pageheading.Foreldrepenger":"Application for parental benefit","Umyndig.Pageheading.Svangerskapspenger":"Application for pregnancy allowance","Umyndig.Tittel":"Because you are under 18 years of age, you must send a paper application","Umyndig.Tekst":"Because you are under 18, one of your parents or a guardian must sign your application with you. You must therefore complete the application on paper and send it by post to NAV.","Umyndig.Knapp.Papirsøknad":"Go to the paper application","ErrorSummaryFp.Tittel":"You have to correct the following errors:","FileInput.Vedlegg.Lastoppknapp":"Upload file","FileInput.Vedlegg.Lastoppknapp.Flere":"Upload more files","Attachment.Vedlegg.Slett":"Remove attachment {navn}","FailedAttachment.Vedlegg.Feilmelding.Opplasting.Feilet":"{filename} - Something went wrong. Try again.","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Størrelse":"{filename} - Attachment type is not valid","FailedAttachment.Vedlegg.Feilmelding.Ugyldig.Type":"{filename} - The attachment must be less than {maxStørrelse} KB.","FailedAttachment.Vedlegg.Feilmelding.Timeout":"{filename} - Your document took too long to upload. Check your network or try uploading fewer documents at once","StepButtons.Forrige":"Previous step","StepButtons.Neste":"Next step","StepButtons.Send":"Send application","ErrorPage.Engangsstønad":"Lump-sum grant","ErrorPage.Foreldrepenger":"Parental benefit","ErrorPage.Svangerskapspenger":"Pregnancy allowance","ErrorPage.Heading":"Sorry, something has gone wrong with your application due to a technical error on our part","ErrorPage.Message":"You can wait a while and then try to search again. If there are still problems, you can contact user support for help.","ErrorPage.Contact":"Contact user support","ErrorPage.TryAgain":"Search again","ErrorPage.ErrorMessage":"Error message","ScanDocumentInfo.Tittel":"How to take a picture of a document with your mobile phone","ScanDocumentInfo.Del1":"If you have a document on paper, you can take a photo of the document and send it to us.","ScanDocumentInfo.Liste.Punkt1":"Take a picture of the document with your smartphone or tablet.","ScanDocumentInfo.Liste.Punkt2":"Check that the document is easy to read.","ScanDocumentInfo.Liste.Punkt3":"Log in to nav.no on your phone and upload your images to your application.","ScanDocumentInfo.Liste.Punkt4":"If you use a PC or Mac, you can send the images to your private email account and save the images on your device.","ScanDocumentInfo.Liste.Punkt5":"Upload and add the images to your electronic application.","ScanDocumentInfo.Del2":"If you have a scanner, you can scan documents.","ScanDocumentInfo.Link":"More information about sending attachments at nav.no."},Le=e=>e==="nb"?Ee:e==="nn"?_e:Te,ne=({children:e})=>{const{locale:o}=re(),i=D.useMemo(()=>Le(o)||{},[o]);return pe.jsx(me,{locale:o,messages:i,children:e})};try{ne.displayName="UiIntlProvider",ne.__docgenInfo={description:"",displayName:"UiIntlProvider",props:{}}}catch{}export{Ne as B,He as C,Re as F,Be as L,Pe as S,ne as U,Ye as V,_e as a,R as c,x as d,Te as e,Ee as n,ye as t,be as u};
