import{I as r}from"./innsendingsType-DprMYF-V.js";import"./Uttaksdagen-CXktmUXL.js";import{g as i}from"./guid-CsArkN6i.js";var o=(n=>(n.OMSORGSOVERTAKELSE="omsorgsovertakelse",n.ADOPSJONSVEDTAK="adopsjonsvedtak",n.TERMINBEKREFTELSE="terminbekreftelse",n.FØDSELSATTEST="fødselsattest",n.ANNEN_INNTEKT="anneninntektDokumentasjon",n.UTSETTELSE_SYKDOM="utsettelseSykdomUttaksplan",n.MORS_AKTIVITET_DOKUMENTASJON="morsaktivitetdokumentasjon",n.OVERFØRING_KVOTE="dokumentasjonOverføringAvKvote",n.ALENEOMSORG="dokumentasjonAvAleneomsorg",n.HV_ØVELSE="hvØvelse",n.NAV_TILTAK="navTiltak",n.TILBAKEBETALING="tilbakebetaling",n.TILRETTELEGGING="tilrettelegging",n))(o||{});const l=()=>"V".concat(i().replace(/-/g,"")),S=(n,e,s,E,a)=>({id:l(),file:n,filename:n.name,filesize:n.size,uploaded:!1,pending:!1,type:e,skjemanummer:s,innsendingsType:E,dokumenterer:a}),I=({pending:n,uploaded:e,filesize:s})=>n===!1&&e===!1||s===0,g=(n,e,s)=>S({name:"",size:""},n,e,r.SEND_SENERE,s),t=(n,e)=>({...n,dokumenterer:e}),O=(n,e,s,E)=>n.length===0?[g(e,s,E)]:n.length===1&&E?n.map(a=>t(a,E)):n.length===1?n:n.filter(a=>a.innsendingsType!==r.SEND_SENERE);export{o as A,t as a,O as b,I as i,g as l,S as m};
