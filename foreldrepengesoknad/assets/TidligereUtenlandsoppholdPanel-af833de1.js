import{j as e}from"./jsx-runtime-1caa8f64.js";import{u as V,F as R,E as A,R as H,S as w,b as z,c as J,D as x,d as Q}from"./ErrorSummaryHookForm-d98d31a9.js";import{ac as pe,u as X,aM as ie,S as C,b as t,R as b,k as D,H as ge,d as g,aN as L,aO as K,B as M,aP as Z,aQ as _}from"./dates-83aa686a.js";import"./index-753920cd.js";import{r as m}from"./index-1cdf6ce0.js";import{P as me,V as v,H as he,a as E}from"./IntlProvider-39316729.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as k,f as ue,g as ee,h as j,j as F,k as oe,l as O,m as T,o as N,p as de,q as Se}from"./dateFormValidation-41a63f4e.js";import{E as I}from"./ExpansionCard-c7a58e83.js";import{B as G,L as B}from"./Link-d47e444a.js";import{c as Ue}from"./createIntl-27737e4e.js";var fe=globalThis&&globalThis.__rest||function(o,r){var d={};for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&r.indexOf(n)<0&&(d[n]=o[n]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(o);s<n.length;s++)r.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(o,n[s])&&(d[n[s]]=o[n[s]]);return d};const ce=m.forwardRef((o,r)=>{var{title:d,titleId:n}=o,s=fe(o,["title","titleId"]);let p=pe();return p=d?n||"title-"+p:void 0,m.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:r,"aria-labelledby":p},s),d?m.createElement("title",{id:p},d):null,m.createElement("path",{d:"M12.75 5.5a.75.75 0 0 0-1.5 0v5.75H5.5a.75.75 0 0 0 0 1.5h5.75v5.75a.75.75 0 0 0 1.5 0v-5.75h5.75a.75.75 0 0 0 0-1.5h-5.75V5.5Z",fill:"currentColor"}))}),ne=ce,te={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Hvor har du bodd de siste 12 månedene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgi hvor du har bodd de siste 12 månedene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg har bodd i Norge","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg har bodd helt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Hvor skal du bo de neste 12 månedene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgi hvor du skal bo de neste 12 månedene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg skal bo i Norge","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg skal bo helt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte fra NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte fra NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lese mer om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepenger og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.es":"engangsstønad og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspenger og utenlandsopphold.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Hvilket land bodde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må oppgi landet du oppholder deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må oppgi en fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må oppgi en til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Fra og med dato kan ikke være etter til og med dato","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Til og med dato kan ikke være før fra og med dato","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Hvilket land skal du bo i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må oppgi et land du skal oppholde deg i","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må oppgi en fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må oppgi en til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Fra og med dato kan ikke være etter til og med dato","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Til og med dato kan ikke være før fra og med dato"},le={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Kvar har du budd dei siste 12 månadene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgje kor du har budd dei siste 12 månadene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Eg har budd i Noreg","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg har budd heilt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Kvar skal du bu dei neste 12 månadene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgje kor du skal bu dei neste 12 månadene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Eg skal berre bu i Noreg","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg skal bu heilt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte frå NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte frå NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lesa meir om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepengar og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.es":"eingongsstønad og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspengar og utanlandsopphald.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Kva land budde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velja landet du oppheld deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velja ein til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Kva land skal du bu i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velja ein til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen"},ae={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Where have you lived in the last 12 months?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"You must state where you have lived in the last 12 months","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Only lived in Norway","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Lived abroad in whole or in part","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Where are you going to live for the next 12 months?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"You must enter where you are going to live for the next 12 months","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Only live in Norway.","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Stay abroad in whole or in part","UtenlandsoppholdSteg.StotteFraNav":"Stays abroad and support from NAV","UtenlandsoppholdSteg.Info.Del1":"To be entitled to support from NAV, you must be a member of Norwegian National Insurance Scheme. People who live in Norway are usually members of the Norwegian National Insurance","UtenlandsoppholdSteg.Info.Del2":"Whether you keep your membership in the National Insurance Scheme during your stay abroad depends on where you will be staying and how long you will be there.","UtenlandsoppholdSteg.Info.Del3":"When you will be abroad for more than 12 months, we consider you to be resident abroad according to the Norwegian National Insurance Act's rules. The same applies if you will be abroad for more than 6 months a year for 2 or more consecutive calendar years.","UtenlandsoppholdSteg.Info.Del4":"You are no longer a member of the National Insurance Scheme when you are considered resident abroad.","UtenlandsoppholdSteg.Info.Undertittel":"Holidays and temporary stays abroad","UtenlandsoppholdSteg.Info.Del5":"When you are on holiday abroad, you are considered a tourist and retain your membership in the national insurance, if you have no income from work during your stay and your stay does not last longer than 12 months. As long as you are a member of the National Insurance Scheme, you generally retain the benefit.","UtenlandsoppholdSteg.Info.Del6":"You can read more about ","UtenlandsoppholdSteg.Info.Del7.fp":"parental benefit and stays abroad.","UtenlandsoppholdSteg.Info.Del7.es":"lump-sum grant and stays abroad.","UtenlandsoppholdSteg.Info.Del7.svp":"maternity allowance and stays abroad.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"What country did you live in?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"You must select the countries you are staying in.","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","TidligereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"You must choose an even date","TidligereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Which country should you live in?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"You must choose a country to stay in.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"You must choose an even date","SenereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","SenereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date"},ve=o=>o==="nb"?te:o==="nn"?le:ae,Te=ie(),ke=(o,r)=>Ue({locale:o,messages:r},Te),q=()=>{const{locale:o}=X(),r=m.useMemo(()=>{const d=ve(o)||{};return ke(o,d)},[o]);return{i18n:(d,n)=>r.formatMessage({id:d},n)}},De=o=>o==="nb"?te:o==="nn"?le:ae,y=({children:o})=>{const{locale:r}=X(),d=m.useMemo(()=>De(r)||{},[r]);return e.jsx(me,{locale:r,messages:d,children:o})};try{y.displayName="UtenlandsoppholdIntlProvider",y.__docgenInfo={description:"",displayName:"UtenlandsoppholdIntlProvider",props:{}}}catch{}const $=({utenlandsopphold:o,saveOnNext:r,saveOnPrevious:d,cancelApplication:n,onContinueLater:s,goToPreviousStep:p,stepConfig:U,stønadstype:l})=>{const{i18n:a}=q(),i=V({defaultValues:o});return e.jsx(y,{children:e.jsx(C,{steps:U,onCancel:n,onContinueLater:s,children:e.jsx(R,{formMethods:i,onSubmit:r,children:e.jsxs(v,{gap:"10",children:[e.jsx(A,{}),e.jsxs(H,{name:"harBoddUtenforNorgeSiste12Mnd",label:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål"}),validate:[k(a("UtenlandsoppholdSteg.Siste12Måneder.IsRequired"))],children:[e.jsx(b,{value:!1,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(b,{value:!0,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(H,{name:"skalBoUtenforNorgeNeste12Mnd",label:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12Måneder.Spørsmål"}),validate:[k(a("UtenlandsoppholdSteg.Neste12Måneder.IsRequired"))],children:[e.jsx(b,{value:!1,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(b,{value:!0,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(I,{size:"small","aria-label":a("UtenlandsoppholdSteg.StotteFraNav"),children:[e.jsx(I.Header,{children:e.jsx(I.Title,{size:"small",children:e.jsx(t,{id:"UtenlandsoppholdSteg.StotteFraNav"})})}),e.jsx(I.Content,{children:e.jsxs(v,{gap:"10",children:[e.jsxs(v,{gap:"5",children:[e.jsx(D,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del1"})}),e.jsx(D,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del2"})}),e.jsx(D,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del3"})}),e.jsx(D,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del4"})})]}),e.jsxs(v,{gap:"5",children:[e.jsx(ge,{size:"small",level:"4",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Undertittel"})}),e.jsx(D,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del5"})}),e.jsxs(he,{gap:"1",children:[e.jsx(G,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del6"})}),e.jsxs(G,{children:[l==="Engangsstønad"&&e.jsx(B,{href:E.engangsstonadHvem,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.es"})}),l==="Foreldrepenger"&&e.jsx(B,{href:E.foreldrepengerUtland,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.fp"})}),l==="Svangerskapspenger"&&e.jsx(B,{href:E.svangerskapspengerUtland,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.svp"})})]})]})]})]})})]}),e.jsx(w,{goToPreviousStep:p,saveDataOnPreviousClick:d})]})})})})};try{$.displayName="UtenlandsoppholdPanel",$.__docgenInfo={description:"",displayName:"UtenlandsoppholdPanel",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!1,type:{name:"Utenlandsopphold"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: Utenlandsopphold) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: Utenlandsopphold | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},stønadstype:{defaultValue:null,description:"",name:"stønadstype",required:!0,type:{name:"enum",value:[{value:'"Foreldrepenger"'},{value:'"Engangsstønad"'},{value:'"Svangerskapspenger"'}]}}}}}catch{}const ye=({index:o,fjernOpphold:r})=>{const{i18n:d}=q(),{watch:n,trigger:s,formState:{isSubmitted:p}}=z(),U=n("utenlandsoppholdNeste12Mnd").filter((S,c)=>c!==o),l=n(`utenlandsoppholdNeste12Mnd.${o}.fom`),a=n(`utenlandsoppholdNeste12Mnd.${o}.tom`),i=g(L).toDate(),h=a?g(a).subtract(1,"days").toDate():g(K).toDate(),u=l&&ue(l)?g(l).add(1,"days").toDate():g(L).toDate(),f=g(K).toDate();return e.jsxs(v,{gap:"5",align:"start",children:[e.jsx(J,{name:`utenlandsoppholdNeste12Mnd.${o}.landkode`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI"}),validate:[k(d("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved"))],children:ee().map(S=>e.jsx("option",{value:S[0],children:S[1]},S[0]))}),e.jsx(x,{name:`utenlandsoppholdNeste12Mnd.${o}.fom`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:h,validate:[k(d("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),j(d("SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),F(d("SenereUtenlandsoppholdSteg.FomErLikTom"),a),oe(d("SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),a),O(d("SenereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:T(i),max:T(h)}),i,h),N(d("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:a,isStartDate:!1},U)],onChange:()=>p&&s()}),e.jsx(x,{name:`utenlandsoppholdNeste12Mnd.${o}.tom`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:u,maxDate:f,validate:[k(d("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved")),j(d("SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),F(d("SenereUtenlandsoppholdSteg.TomErLikFom"),l),de(d("SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),l),O(d("SenereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:T(u),max:T(f)}),u,f),N(d("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!0},U)],onChange:()=>p&&s(),defaultMonth:l?g(l).toDate():void 0}),o>0&&e.jsx(M,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Z,{"aria-hidden":!0}),onClick:()=>r(o),children:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{SenereUtenlandsoppholdPeriode.displayName="SenereUtenlandsoppholdPeriode",SenereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const re={fom:"",tom:"",landkode:""},be={utenlandsoppholdNeste12Mnd:[re]},Y=({saveOnNext:o,saveOnPrevious:r,cancelApplication:d,onContinueLater:n,goToPreviousStep:s,senereUtenlandsopphold:p,stepConfig:U})=>{const l=m.useMemo(()=>p||be,[p]),a=V({defaultValues:l}),{fields:i,append:h,remove:u}=Q({name:"utenlandsoppholdNeste12Mnd",control:a.control}),f=m.useCallback(()=>{h(re)},[h]),S=m.useCallback(c=>{u(c)},[u]);return e.jsx(y,{children:e.jsx(C,{onCancel:d,onContinueLater:n,steps:U,children:e.jsx(R,{formMethods:a,onSubmit:o,children:e.jsxs(v,{gap:"10",children:[e.jsx(A,{}),e.jsxs(v,{gap:"10",align:"start",children:[i.map((c,P)=>e.jsxs(m.Fragment,{children:[e.jsx(ye,{index:P,fjernOpphold:S}),i.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},c.id)),e.jsx(M,{type:"button",variant:"secondary",size:"small",icon:e.jsx(ne,{"aria-hidden":!0}),onClick:f,children:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(w,{goToPreviousStep:s,saveDataOnPreviousClick:r})]})})})})};try{Y.displayName="SenereUtenlandsoppholdPanel",Y.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPanel",props:{senereUtenlandsopphold:{defaultValue:null,description:"",name:"senereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdSenere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}}}}}catch{}const Ie=({index:o,fjernOpphold:r})=>{const{i18n:d}=q(),{watch:n,trigger:s,formState:{isSubmitted:p}}=z(),U=n("utenlandsoppholdSiste12Mnd").filter((S,c)=>c!==o),l=n(`utenlandsoppholdSiste12Mnd.${o}.fom`),a=n(`utenlandsoppholdSiste12Mnd.${o}.tom`),i=g(_).toDate(),h=a?g(a).subtract(1,"days").toDate():g(L).toDate(),u=l&&Se(l,_)?g(l).add(1,"days").toDate():g(_).toDate(),f=g(L).toDate();return e.jsxs(v,{gap:"5",align:"start",children:[e.jsx(J,{name:`utenlandsoppholdSiste12Mnd.${o}.landkode`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[k(d("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"))],children:ee().map(S=>e.jsx("option",{value:S[0],children:S[1]},S[0]))}),e.jsx(x,{name:`utenlandsoppholdSiste12Mnd.${o}.fom`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:h,validate:[k(d("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),j(d("TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),F(d("TidligereUtenlandsoppholdSteg.FomErLikTom"),a),oe(d("TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),a),O(d("TidligereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:T(i),max:T(h)}),i,h),N(d("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:a,isStartDate:!1},U)],onChange:()=>p&&s(),defaultMonth:a?g(a).toDate():void 0}),e.jsx(x,{name:`utenlandsoppholdSiste12Mnd.${o}.tom`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:u,maxDate:f,validate:[k(d("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved")),j(d("TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),F(d("TidligereUtenlandsoppholdSteg.TomErLikFom"),l),de(d("TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),l),O(d("TidligereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:T(u),max:T(f)}),u,f),N(d("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!0},U)],onChange:()=>p&&s()}),o>0&&e.jsx(M,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Z,{"aria-hidden":!0}),onClick:()=>r(o),children:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{TidligereUtenlandsoppholdPeriode.displayName="TidligereUtenlandsoppholdPeriode",TidligereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const se={fom:"",tom:"",landkode:""},xe={utenlandsoppholdSiste12Mnd:[se]},W=({tidligereUtenlandsopphold:o,saveOnNext:r,saveOnPrevious:d,cancelApplication:n,onContinueLater:s,goToPreviousStep:p,stepConfig:U})=>{const l=m.useMemo(()=>o||xe,[o]),a=V({defaultValues:l}),{fields:i,append:h,remove:u}=Q({name:"utenlandsoppholdSiste12Mnd",control:a.control}),f=m.useCallback(()=>{h(se)},[h]),S=m.useCallback(c=>{u(c)},[u]);return e.jsx(y,{children:e.jsx(C,{onCancel:n,onContinueLater:s,steps:U,children:e.jsx(R,{formMethods:a,onSubmit:r,children:e.jsxs(v,{gap:"10",children:[e.jsx(A,{}),e.jsxs(v,{gap:"10",align:"start",children:[i.map((c,P)=>e.jsxs(m.Fragment,{children:[e.jsx(Ie,{index:P,fjernOpphold:S}),i.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},c.id)),e.jsx(M,{type:"button",variant:"secondary",size:"small",icon:e.jsx(ne,{"aria-hidden":!0}),onClick:f,children:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(w,{goToPreviousStep:p,saveDataOnPreviousClick:d})]})})})})};try{W.displayName="TidligereUtenlandsoppholdPanel",W.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{defaultValue:null,description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdTidligere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdTidligere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(data: UtenlandsoppholdTidligere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}}}}}catch{}export{Y as S,W as T,$ as U};
