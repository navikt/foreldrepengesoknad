import{Y as i,g as d,d as k}from"./fridagerUtils-57eeeb7b.js";import"./Modal-5f6515f6.js";import"./index-f1f2c4b1.js";import{j as t,k as a,h as N,r as s}from"./useFortsettSøknadSenere-e239225e.js";import{a as o}from"./dateUtils-8d85eca7.js";var r=(e=>(e.egenNæringType="egenNæringType",e.egenNæringNavn="egenNæringNavn",e.egenNæringRegistrertINorge="egenNæringRegistrertINorge",e.egenNæringOrgnr="egenNæringOrgnr",e.egenNæringLand="egenNæringLand",e.egenNæringFom="egenNæringFom",e.egenNæringTom="egenNæringTom",e.egenNæringPågående="egenNæringPågående",e.egenNæringYrkesAktivDato="egenNæringYrkesAktivDato",e.egenNæringResultat="egenNæringResultat",e.egenNæringBlittYrkesaktivDe3SisteÅrene="egenNæringBlittYrkesaktivDe3SisteÅrene",e.egenNæringHattVarigEndringDeSiste4Årene="egenNæringHattVarigEndringDeSiste4Årene",e.egenNæringVarigEndringDato="egenNæringVarigEndringDato",e.egenNæringVarigEndringInntektEtterEndring="egenNæringVarigEndringInntektEtterEndring",e.egenNæringVarigEndringBeskrivelse="egenNæringVarigEndringBeskrivelse",e))(r||{});const g={egenNæringType:void 0,egenNæringNavn:"",egenNæringRegistrertINorge:i.UNANSWERED,egenNæringOrgnr:"",egenNæringLand:"",egenNæringTom:"",egenNæringFom:"",egenNæringPågående:i.UNANSWERED,egenNæringResultat:"",egenNæringBlittYrkesaktivDe3SisteÅrene:i.UNANSWERED,egenNæringYrkesAktivDato:"",egenNæringHattVarigEndringDeSiste4Årene:i.UNANSWERED,egenNæringVarigEndringDato:"",egenNæringVarigEndringInntektEtterEndring:"",egenNæringVarigEndringBeskrivelse:""},B=d(),Y=e=>e?k(e).startOf("day").isAfter(o,"day"):!0,I=e=>{const n=a(e.egenNæringHattVarigEndringDeSiste4Årene);return{næringstype:e.egenNæringType,tidsperiode:{fom:e.egenNæringFom,tom:e.egenNæringTom},pågående:a(e.egenNæringPågående),næringsinntekt:N(e.egenNæringResultat)?e.egenNæringResultat:void 0,navnPåNæringen:s(e.egenNæringNavn),organisasjonsnummer:N(e.egenNæringOrgnr.trim())?e.egenNæringOrgnr.trim():void 0,registrertINorge:a(e.egenNæringRegistrertINorge),registrertILand:N(e.egenNæringLand)?e.egenNæringLand:void 0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:a(e.egenNæringBlittYrkesaktivDe3SisteÅrene),oppstartsdato:e.egenNæringYrkesAktivDato,hattVarigEndringAvNæringsinntektSiste4Kalenderår:n,varigEndringBeskrivelse:n&&e.egenNæringVarigEndringBeskrivelse?s(e.egenNæringVarigEndringBeskrivelse):void 0,varigEndringDato:e.egenNæringVarigEndringDato,varigEndringInntektEtterEndring:e.egenNæringVarigEndringInntektEtterEndring}},R=e=>e===void 0?g:{...g,egenNæringType:e.næringstype,egenNæringNavn:e.navnPåNæringen||"",egenNæringRegistrertINorge:t(e.registrertINorge),egenNæringLand:e.registrertILand||"",egenNæringFom:e.tidsperiode.fom,egenNæringTom:e.tidsperiode.tom,egenNæringOrgnr:e.organisasjonsnummer||"",egenNæringPågående:t(e.pågående),egenNæringResultat:e.næringsinntekt||"",egenNæringBlittYrkesaktivDe3SisteÅrene:t(e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene),egenNæringYrkesAktivDato:e.oppstartsdato||"",egenNæringHattVarigEndringDeSiste4Årene:t(e.hattVarigEndringAvNæringsinntektSiste4Kalenderår),egenNæringVarigEndringDato:e.varigEndringDato,egenNæringVarigEndringBeskrivelse:e.varigEndringBeskrivelse,egenNæringVarigEndringInntektEtterEndring:e.varigEndringInntektEtterEndring},T=(e,n)=>({...e,egenNæringOrgnr:n.isVisible(r.egenNæringOrgnr)?e.egenNæringOrgnr:g.egenNæringOrgnr,egenNæringLand:n.isVisible(r.egenNæringLand)?e.egenNæringLand:g.egenNæringLand,egenNæringTom:n.isVisible(r.egenNæringTom)?e.egenNæringTom:g.egenNæringTom,egenNæringResultat:n.isVisible(r.egenNæringResultat)?e.egenNæringResultat:g.egenNæringResultat,egenNæringHattVarigEndringDeSiste4Årene:n.isVisible(r.egenNæringHattVarigEndringDeSiste4Årene)?e.egenNæringHattVarigEndringDeSiste4Årene:g.egenNæringHattVarigEndringDeSiste4Årene,egenNæringVarigEndringDato:n.isVisible(r.egenNæringVarigEndringDato)?e.egenNæringVarigEndringDato:g.egenNæringVarigEndringDato,egenNæringVarigEndringBeskrivelse:n.isVisible(r.egenNæringVarigEndringBeskrivelse)?e.egenNæringVarigEndringBeskrivelse:g.egenNæringVarigEndringBeskrivelse,egenNæringVarigEndringInntektEtterEndring:n.isVisible(r.egenNæringVarigEndringInntektEtterEndring)?e.egenNæringVarigEndringInntektEtterEndring:g.egenNæringVarigEndringInntektEtterEndring,egenNæringBlittYrkesaktivDe3SisteÅrene:n.isVisible(r.egenNæringBlittYrkesaktivDe3SisteÅrene)?e.egenNæringBlittYrkesaktivDe3SisteÅrene:g.egenNæringBlittYrkesaktivDe3SisteÅrene,egenNæringYrkesAktivDato:n.isVisible(r.egenNæringYrkesAktivDato)?e.egenNæringYrkesAktivDato:g.egenNæringYrkesAktivDato});export{r as E,B as a,T as c,Y as e,R as g,I as m};
