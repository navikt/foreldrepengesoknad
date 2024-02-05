import{a0 as m,T as d,d as u,U as E,a1 as P}from"./Tidsperioden-0ce27701.js";var s=(t=>(t.avslåttPeriode="avslåttPeriode",t.uttakAnnenPart="uttakAnnenPart",t.utsettelseAnnenPart="utsettelseAnnenPart",t))(s||{}),c=(t=>(t.Mødrekvote="MØDREKVOTE",t.Fedrekvote="FEDREKVOTE",t.Fellesperiode="FELLESPERIODE",t.Foreldrepenger="FORELDREPENGER",t.ForeldrepengerFørFødsel="FORELDREPENGER_FØR_FØDSEL",t.Flerbarnsdager="FLERBARNSDAGER",t.AktivitetsfriKvote="AKTIVITETSFRI_KVOTE",t))(c||{}),k=(t=>(t.Ferie="LOVBESTEMT_FERIE",t.Arbeid="ARBEID",t.Sykdom="SYKDOM",t.InstitusjonSøker="INSTITUSJONSOPPHOLD_SØKER",t.InstitusjonBarnet="INSTITUSJONSOPPHOLD_BARNET",t.HvØvelse="HV_OVELSE",t.NavTiltak="NAV_TILTAK",t.Fri="FRI",t))(k||{}),l=(t=>(t.Uttak="uttak",t.Utsettelse="utsettelse",t.Opphold="opphold",t.Overføring="overføring",t.Hull="ubegrunnetOpphold",t.Info="info",t.PeriodeUtenUttak="periodeUtenUttak",t))(l||{});function H(t){return t.type==="uttak"}const g=t=>t.type==="uttak"&&t.konto===c.ForeldrepengerFørFødsel,U=t=>t.type==="uttak"&&t.konto===c.ForeldrepengerFørFødsel,L=t=>U(t)&&t.skalIkkeHaUttakFørTermin===!0,A=t=>t.type==="utsettelse",N=t=>A(t)&&t.årsak===k.Ferie,b=t=>A(t)&&t.årsak===k.Arbeid,K=t=>t.type==="overføring",V=t=>t.type==="opphold",_=t=>t.type==="info"&&t.overskrives===!0,B=t=>t.type==="info"&&(t.infotype===s.uttakAnnenPart||t.infotype===s.utsettelseAnnenPart),T=t=>t.type==="ubegrunnetOpphold",j=t=>t.type==="info"&&t.infotype===s.utsettelseAnnenPart,v=t=>t.type==="info"&&t.infotype===s.avslåttPeriode,M=t=>v(t)&&t.kanSlettes,G=t=>t.type==="info"&&t.infotype===s.uttakAnnenPart,O=t=>t.type==="utsettelse"&&t.årsak===k.Fri,I=t=>t.type==="periodeUtenUttak",J=t=>t.type==="info"&&t.overskrives===!0||t.type==="ubegrunnetOpphold"||I(t)||O(t),S=t=>t.infotype===s.uttakAnnenPart,p=t=>t.infotype===s.utsettelseAnnenPart,q=t=>t.type==="info"&&(S(t)||p(t)),x=t=>({setStartdato:e=>h(t,e),setUttaksdager:e=>t.tidsperiode=m(t.tidsperiode.fom,e),getAntallUttaksdager:()=>d(t.tidsperiode).getAntallUttaksdager(),getAntallFridager:()=>d(t.tidsperiode).getAntallFridager(),erLik:(e,r=!1,a=!1)=>y(t,e,r,a),erSammenhengende:e=>R(t,e),inneholderFridager:()=>d(t.tidsperiode).getAntallFridager()>0,starterFør:e=>u(t.tidsperiode.fom).isBefore(e,"day"),slutterEtter:e=>u(t.tidsperiode.tom).isAfter(e,"day"),slutterSammeDagEllerEtter:e=>u(t.tidsperiode.tom).isSameOrAfter(e,"day")});function R(t,e){const r=E(u(t.tidsperiode.tom).toDate()).neste(),a=e.tidsperiode.fom;return u(r).isSame(a,"day")}function y(t,e,r=!1,a=!1){if(t.type!==e.type||a===!1&&(t.type===l.Utsettelse||e.type===l.Utsettelse))return!1;if(t.type===l.Hull&&e.type===l.Hull)return!0;if(g(t)&&g(e)){const n=f({...t,skalIkkeHaUttakFørTermin:t.skalIkkeHaUttakFørTermin||!1},r),F=f({...e,skalIkkeHaUttakFørTermin:e.skalIkkeHaUttakFørTermin||!1},r);return n===F}const o=f(t,r),i=f(e,r);return o===i}function f(t,e=!1){const{tidsperiode:r,id:a,...o}=t,i={};return Object.keys(o).sort((n,F)=>n.localeCompare(F)).filter(n=>o[n]!==void 0).forEach(n=>{i[n]=o[n]}),e&&r&&(i.tidsperiode={fom:r.fom?P(r.fom):void 0,tom:r.tom?P(r.tom):void 0}),JSON.stringify({...i})}function h(t,e){const{tidsperiode:r}=t;return{...t,tidsperiode:d({fom:r.fom,tom:r.tom}).setStartdato(e)}}export{l as P,c as S,k as U,_ as a,H as b,A as c,K as d,T as e,I as f,V as g,x as h,g as i,O as j,N as k,j as l,J as m,G as n,s as o,v as p,U as q,L as r,b as s,M as t,B as u,q as v};
