import{d as o,h as W,r as j,ah as V,z as N,C as U,ai as Z}from"./Tidsperioden-Dc48v2NC.js";import{c as G,g as L}from"./index-DVXBtNgz.js";import"./jsx-runtime-_e34SzbC.js";import"./index--IHLcpuH.js";import{v as k,I as _,J as H,K as B,P as I,L as C,M as b,N as Q}from"./useFpNavigator-cX0mi5Ox.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{i as X}from"./index-BI6FGWNT.js";import{c as R}from"./barnUtils-Cse01oDj.js";var F=(e=>(e.test1Juli2024Regler="FEATURE_TEST_1JULI2024_REGLER",e))(F||{});const q=()=>{const e=document.getElementById("nav:appSettings"),t=JSON.parse(e.text);return{APP_VERSION:t.APP_VERSION,INNSYN:t.INNSYN,[F.test1Juli2024Regler]:t[F.test1Juli2024Regler]}},Y=q();var T={exports:{}};(function(e,t){(function(i,n){e.exports=n()})(G,function(){var i={year:0,month:1,day:2,hour:3,minute:4,second:5},n={};return function(g,c,a){var r,S=function(s,h,m){m===void 0&&(m={});var u=new Date(s),p=function(x,v){v===void 0&&(v={});var z=v.timeZoneName||"short",D=x+"|"+z,E=n[D];return E||(E=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:x,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:z}),n[D]=E),E}(h,m);return p.formatToParts(u)},f=function(s,h){for(var m=S(s,h),u=[],p=0;p<m.length;p+=1){var x=m[p],v=x.type,z=x.value,D=i[v];D>=0&&(u[D]=parseInt(z,10))}var E=u[3],A=E===24?0:E,O=u[0]+"-"+u[1]+"-"+u[2]+" "+A+":"+u[4]+":"+u[5]+":000",w=+s;return(a.utc(O).valueOf()-(w-=w%1e3))/6e4},l=c.prototype;l.tz=function(s,h){s===void 0&&(s=r);var m=this.utcOffset(),u=this.toDate(),p=u.toLocaleString("en-US",{timeZone:s}),x=Math.round((u-new Date(p))/1e3/60),v=a(p,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(u.getTimezoneOffset()/15)-x,!0);if(h){var z=v.utcOffset();v=v.add(m-z,"minute")}return v.$x.$timezone=s,v},l.offsetName=function(s){var h=this.$x.$timezone||a.tz.guess(),m=S(this.valueOf(),h,{timeZoneName:s}).find(function(u){return u.type.toLowerCase()==="timezonename"});return m&&m.value};var d=l.startOf;l.startOf=function(s,h){if(!this.$x||!this.$x.$timezone)return d.call(this,s,h);var m=a(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return d.call(m,s,h).tz(this.$x.$timezone,!0)},a.tz=function(s,h,m){var u=m&&h,p=m||h||r,x=f(+a(),p);if(typeof s!="string")return a(s).tz(p);var v=function(A,O,w){var y=A-60*O*1e3,$=f(y,w);if(O===$)return[y,O];var M=f(y-=60*($-O)*1e3,w);return $===M?[y,$]:[A-60*Math.min($,M)*1e3,Math.max($,M)]}(a.utc(s,u).valueOf(),x,p),z=v[0],D=v[1],E=a(z).utcOffset(D);return E.$x.$timezone=p,E},a.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},a.tz.setDefault=function(s){r=s}}})})(T);var K=T.exports;const ee=L(K);var P={exports:{}};(function(e,t){(function(i,n){e.exports=n()})(G,function(){return function(i,n){var g=n.prototype,c=g.format;g.format=function(a){var r=this,S=this.$locale();if(!this.isValid())return c.bind(this)(a);var f=this.$utils(),l=(a||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(d){switch(d){case"Q":return Math.ceil((r.$M+1)/3);case"Do":return S.ordinal(r.$D);case"gggg":return r.weekYear();case"GGGG":return r.isoWeekYear();case"wo":return S.ordinal(r.week(),"W");case"w":case"ww":return f.s(r.week(),d==="w"?1:2,"0");case"W":case"WW":return f.s(r.isoWeek(),d==="W"?1:2,"0");case"k":case"kk":return f.s(String(r.$H===0?24:r.$H),d==="k"?1:2,"0");case"X":return Math.floor(r.$d.getTime()/1e3);case"x":return r.$d.getTime();case"z":return"["+r.offsetName()+"]";case"zzz":return"["+r.offsetName("long")+"]";default:return d}});return c.bind(this)(l)}}})})(P);var te=P.exports;const re=L(te),he=e=>k(e)?e.erAleneOmOmsorg:!0,pe=e=>k(e)?e.datoForAleneomsorg:void 0,Se=(e,t)=>{var g;const i=k(e)&&e.utenlandskFnr!==!0?e.fnr:void 0,n=X(t)&&t.fnr!==void 0&&((g=t.fnr)==null?void 0:g.length)>0?t.fnr[0]:void 0;return{annenPartFødselsnummer:i,barnFødselsnummer:n,familiehendelse:R(t)}},Ee=e=>{const t=k(e)&&e.utenlandskFnr!==!0?e.fnr:void 0;return!(t!==void 0&&t!=="")},se=e=>k(e)?!!e.harRettPåForeldrepengerINorge||!!e.harRettPåForeldrepengerIEØS:!1,oe=e=>!!(Y[e]&&Y[e].toLowerCase()==="on"),ie={isFeatureEnabled:oe};o.extend(W);o.extend(j);o.extend(V);o.extend(ee);o.extend(re);const xe=o().subtract(4,"year").startOf("day").toDate(),J=(e,t)=>!N(e)||!N(t)||!U(e)||!U(t)?!1:!!o(e).isBefore(t,"day"),ze=e=>[...e].sort((t,i)=>J(t.fødselsdato,i.fødselsdato)?1:-1)[e.length-1],De=e=>[...e].map(i=>Z(i)).sort((i,n)=>J(i,n)?-1:1),Oe=(e,t,i)=>{if(i!==void 0)return i;if(t!==void 0)return t;if(e!==void 0)return e;throw new Error("Mangler fødselsdato/termindato/adopsjonsdato for barnet.")},$e=e=>{const t=new Date("2021-10-01");return o(e).isSameOrAfter(t,"day")&&o(new Date).isSameOrAfter(t,"day")},we=e=>{let t="2024-07-01";if(ie.isFeatureEnabled(F.test1Juli2024Regler)&&(t="2024-06-18"),o().isBefore(o(t),"day"))return!1;const i=R(e);return!((_(e)||H(e))&&o(i).isBefore(t,"day"))},ke=(e,t,i)=>{if(!i)return;const n=e===void 0?void 0:e.filter(r=>!B(r)),g=t.filter(r=>!B(r));let c,a;if(n)g.forEach((r,S)=>{if(c)return;const{fom:f}=r.tidsperiode,l=n.find(d=>o(d.tidsperiode.fom).isSame(f,"day"));if(l!==void 0){const d=I(r).erLik(l,!1,!0);(!d||d&&I(r).slutterEtter(l.tidsperiode.tom))&&(c=f)}if(l===void 0&&(c=f),l!==void 0&&g.length-1===S&&(I(r).erLik(l,!0,!0)||(c=f)),c&&C(r)&&o(c).isAfter(n[n.length-1].tidsperiode.tom)){const d=g.find(s=>(b(s)||Q(s))&&o(s.tidsperiode.fom).isAfter(c));c=d!==void 0?d.tidsperiode.fom:c}}),n.forEach(r=>{if(a)return;const{fom:S}=r.tidsperiode,f=g.find(l=>o(l.tidsperiode.fom).isSame(S,"day"));f!==void 0&&!I(r).erLik(f,!1,!0)&&(a=f.tidsperiode.fom),f===void 0&&(a=S)});else if(g.length>0)return g[0].tidsperiode.fom;return ne(c,a)},ne=(e,t)=>{if(!(e===void 0&&t===void 0))return e!==void 0&&t===void 0?e:e===void 0&&t!==void 0?t:o(e).isSameOrBefore(o(t))?e:t},Ae=(e,t)=>{const i=R(e),n=se(t);return o(i).isSameOrAfter(o("2024-07-01"),"d")&&o().isBefore(o("2024-07-01"),"d")&&n&&e.antallBarn===1};export{Y as E,Ae as a,Se as b,ze as c,De as d,xe as e,we as f,Oe as g,he as h,J as i,pe as j,se as k,$e as l,ke as m,Ee as s,ee as t};
