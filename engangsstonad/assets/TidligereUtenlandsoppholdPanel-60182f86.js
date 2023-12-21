import{i as ie,k as J,h as ge,l as me,j as e,m as he,S as R,F as t,g as y,H as ue,B as K,a as E,d as m,b as P,X}from"./fridagerUtils-39f895c9.js";import{u as A,F as w,E as C,R as G,S as q,b as Z,c as Q,D as L,d as ee}from"./ErrorSummaryHookForm-7d5d77dc.js";import{r as h}from"./index-f1f2c4b1.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import{V as c,e as T,H as Se,l as B,p as j,q as $,r as Ue,s as oe,g as F,t as O,v as ne,w as N,x as v,y as M,z as de,A as V,B as fe}from"./useEsNavigator-195c11a8.js";import{R as I}from"./Radio-98f4230d.js";import{E as x}from"./ExpansionCard-c5fcbceb.js";var ce=globalThis&&globalThis.__rest||function(o,a){var n={};for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&a.indexOf(d)<0&&(n[d]=o[d]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,d=Object.getOwnPropertySymbols(o);r<d.length;r++)a.indexOf(d[r])<0&&Object.prototype.propertyIsEnumerable.call(o,d[r])&&(n[d[r]]=o[d[r]]);return n};const ve=h.forwardRef((o,a)=>{var{title:n,titleId:d}=o,r=ce(o,["title","titleId"]);let p=ie();return p=n?d||"title-"+p:void 0,h.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":p},r),n?h.createElement("title",{id:p},n):null,h.createElement("path",{d:"M12.75 5.5a.75.75 0 0 0-1.5 0v5.75H5.5a.75.75 0 0 0 0 1.5h5.75v5.75a.75.75 0 0 0 1.5 0v-5.75h5.75a.75.75 0 0 0 0-1.5h-5.75V5.5Z",fill:"currentColor"}))}),te=ve,le={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Hvor har du bodd de siste 12 månedene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgi hvor du har bodd de siste 12 månedene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg har bodd i Norge","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg har bodd helt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Hvor skal du bo de neste 12 månedene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgi hvor du skal bo de neste 12 månedene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg skal bo i Norge","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg skal bo helt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte fra NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte fra NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lese mer om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepenger og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.es":"engangsstønad og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspenger og utenlandsopphold.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Hvilket land bodde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velge landet du oppholder deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velge en fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velge en til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legge inn en dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legge inn en dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Hvilket land skal du bo i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velge en fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velge en til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legge inn en dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legge inn en dato som er etter fra-datoen"},ae={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Kvar har du budd dei siste 12 månadene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgje kor du har budd dei siste 12 månadene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Eg har budd i Noreg","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg har budd heilt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Kvar skal du bu dei neste 12 månadene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgje kor du skal bu dei neste 12 månadene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Eg skal berre bu i Noreg","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg skal bu heilt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte frå NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte frå NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lesa meir om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepengar og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.es":"eingongsstønad og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspengar og utanlandsopphald.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Kva land budde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velja landet du oppheld deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velja ein til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Kva land skal du bu i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velja ein til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen"},re={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Where have you lived in the last 12 months?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"You must state where you have lived in the last 12 months","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Only lived in Norway","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Lived abroad in whole or in part","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Where are you going to live for the next 12 months?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"You must enter where you are going to live for the next 12 months","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Only live in Norway.","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Stay abroad in whole or in part","UtenlandsoppholdSteg.StotteFraNav":"Stays abroad and support from NAV","UtenlandsoppholdSteg.Info.Del1":"To be entitled to support from NAV, you must be a member of Norwegian National Insurance Scheme. People who live in Norway are usually members of the Norwegian National Insurance","UtenlandsoppholdSteg.Info.Del2":"Whether you keep your membership in the National Insurance Scheme during your stay abroad depends on where you will be staying and how long you will be there.","UtenlandsoppholdSteg.Info.Del3":"When you will be abroad for more than 12 months, we consider you to be resident abroad according to the Norwegian National Insurance Act's rules. The same applies if you will be abroad for more than 6 months a year for 2 or more consecutive calendar years.","UtenlandsoppholdSteg.Info.Del4":"You are no longer a member of the National Insurance Scheme when you are considered resident abroad.","UtenlandsoppholdSteg.Info.Undertittel":"Holidays and temporary stays abroad","UtenlandsoppholdSteg.Info.Del5":"When you are on holiday abroad, you are considered a tourist and retain your membership in the national insurance, if you have no income from work during your stay and your stay does not last longer than 12 months. As long as you are a member of the National Insurance Scheme, you generally retain the benefit.","UtenlandsoppholdSteg.Info.Del6":"You can read more about ","UtenlandsoppholdSteg.Info.Del7.fp":"parental benefit and stays abroad.","UtenlandsoppholdSteg.Info.Del7.es":"lump-sum grant and stays abroad.","UtenlandsoppholdSteg.Info.Del7.svp":"maternity allowance and stays abroad.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"What country did you live in?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"You must select the countries you are staying in.","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","TidligereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"You must choose an even date","TidligereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Which country should you live in?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"You must choose a country to stay in.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"You must choose an even date","SenereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","SenereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date"},Te=o=>o==="nb"?le:o==="nn"?ae:re,De=me(),ke=(o,a)=>ge({locale:o,messages:a},De),H=()=>{const{locale:o}=J(),a=h.useMemo(()=>{const n=Te(o)||{};return ke(o,n)},[o]);return{i18n:(n,d)=>a.formatMessage({id:n},d)}},ye=o=>o==="nb"?le:o==="nn"?ae:re,b=({children:o})=>{const{locale:a}=J(),n=h.useMemo(()=>ye(a)||{},[a]);return e.jsx(he,{locale:a,messages:n,children:o})};try{b.displayName="UtenlandsoppholdIntlProvider",b.__docgenInfo={description:"",displayName:"UtenlandsoppholdIntlProvider",props:{}}}catch{}const Y=({utenlandsopphold:o,saveOnNext:a,saveOnPrevious:n,cancelApplication:d,onContinueLater:r,goToPreviousStep:p,stepConfig:f,stønadstype:l,supportsTempSaving:s=!0})=>{const{i18n:i}=H(),g=A({defaultValues:o});return e.jsx(b,{children:e.jsx(R,{steps:f,onCancel:d,onContinueLater:r,supportsTempSaving:s,children:e.jsx(w,{formMethods:g,onSubmit:a,children:e.jsxs(c,{gap:"10",children:[e.jsx(C,{}),e.jsxs(G,{name:"harBoddUtenforNorgeSiste12Mnd",label:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål"}),validate:[T(i("UtenlandsoppholdSteg.Siste12Måneder.IsRequired"))],children:[e.jsx(I,{value:!1,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(I,{value:!0,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(G,{name:"skalBoUtenforNorgeNeste12Mnd",label:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12Måneder.Spørsmål"}),validate:[T(i("UtenlandsoppholdSteg.Neste12Måneder.IsRequired"))],children:[e.jsx(I,{value:!1,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(I,{value:!0,children:e.jsx(t,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(x,{size:"small","aria-label":i("UtenlandsoppholdSteg.StotteFraNav"),children:[e.jsx(x.Header,{children:e.jsx(x.Title,{size:"small",children:e.jsx(t,{id:"UtenlandsoppholdSteg.StotteFraNav"})})}),e.jsx(x.Content,{children:e.jsxs(c,{gap:"10",children:[e.jsxs(c,{gap:"5",children:[e.jsx(y,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del1"})}),e.jsx(y,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del2"})}),e.jsx(y,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del3"})}),e.jsx(y,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del4"})})]}),e.jsxs(c,{gap:"5",children:[e.jsx(ue,{size:"small",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Undertittel"})}),e.jsx(y,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del5"})}),e.jsxs(Se,{gap:"1",children:[e.jsx(K,{children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del6"})}),e.jsxs(K,{children:[l==="Engangsstønad"&&e.jsx(E,{href:B.engangsstonadHvem,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.es"})}),l==="Foreldrepenger"&&e.jsx(E,{href:B.foreldrepengerUtland,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.fp"})}),l==="Svangerskapspenger"&&e.jsx(E,{href:B.svangerskapspengerUtland,target:"_blank",children:e.jsx(t,{id:"UtenlandsoppholdSteg.Info.Del7.svp"})})]})]})]})]})})]}),e.jsx(q,{goToPreviousStep:p,saveDataOnPreviousClick:n})]})})})})};try{Y.displayName="UtenlandsoppholdPanel",Y.__docgenInfo={description:"",displayName:"UtenlandsoppholdPanel",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!1,type:{name:"Utenlandsopphold"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: Utenlandsopphold) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: Utenlandsopphold | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},stønadstype:{defaultValue:null,description:"",name:"stønadstype",required:!0,type:{name:"enum",value:[{value:'"Foreldrepenger"'},{value:'"Engangsstønad"'},{value:'"Svangerskapspenger"'}]}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}const be=({index:o,fjernOpphold:a})=>{const{i18n:n}=H(),{watch:d,trigger:r,formState:{isSubmitted:p}}=Z(),f=d("utenlandsoppholdNeste12Mnd").filter((U,D)=>D!==o),l=d(`utenlandsoppholdNeste12Mnd.${o}.fom`),s=d(`utenlandsoppholdNeste12Mnd.${o}.tom`),i=m(j).toDate(),g=s?m(s).subtract(1,"days").toDate():m($).toDate(),u=l&&Ue(l)?m(l).add(1,"days").toDate():m(j).toDate(),S=m($).toDate();return e.jsxs(c,{gap:"5",align:"start",children:[e.jsx(Q,{name:`utenlandsoppholdNeste12Mnd.${o}.landkode`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI"}),validate:[T(n("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved"))],children:oe().map(U=>e.jsx("option",{value:U[0],children:U[1]},U[0]))}),e.jsx(L,{name:`utenlandsoppholdNeste12Mnd.${o}.fom`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:g,validate:[T(n("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),F(n("SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),O(n("SenereUtenlandsoppholdSteg.FomErLikTom"),s),ne(n("SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),s),N(n("SenereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:v(i),max:v(g)}),i,g),M(n("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:s,isStartDate:!1},f)],onChange:()=>p&&r()}),e.jsx(L,{name:`utenlandsoppholdNeste12Mnd.${o}.tom`,label:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:u,maxDate:S,validate:[T(n("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved")),F(n("SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),O(n("SenereUtenlandsoppholdSteg.TomErLikFom"),l),de(n("SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),l),N(n("SenereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:v(u),max:v(S)}),u,S),M(n("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!0},f)],onChange:()=>p&&r(),defaultMonth:l?m(l).toDate():void 0}),o>0&&e.jsx(P,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(X,{"aria-hidden":!0}),onClick:()=>a(o),children:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{SenereUtenlandsoppholdPeriode.displayName="SenereUtenlandsoppholdPeriode",SenereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const se={fom:"",tom:"",landkode:""},Ie={utenlandsoppholdNeste12Mnd:[se]},W=({saveOnNext:o,saveOnPrevious:a,cancelApplication:n,onContinueLater:d,goToPreviousStep:r,senereUtenlandsopphold:p,stepConfig:f,supportsTempSaving:l=!0})=>{const s=h.useMemo(()=>p||Ie,[p]),i=A({defaultValues:s}),{fields:g,append:u,remove:S}=ee({name:"utenlandsoppholdNeste12Mnd",control:i.control}),U=h.useCallback(()=>{u(se)},[u]),D=h.useCallback(k=>{S(k)},[S]);return e.jsx(b,{children:e.jsx(R,{onCancel:n,onContinueLater:d,steps:f,supportsTempSaving:l,children:e.jsx(w,{formMethods:i,onSubmit:o,children:e.jsxs(c,{gap:"10",children:[e.jsx(C,{}),e.jsxs(c,{gap:"10",align:"start",children:[g.map((k,_)=>e.jsxs(h.Fragment,{children:[e.jsx(be,{index:_,fjernOpphold:D}),g.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},k.id)),e.jsx(P,{type:"button",variant:"secondary",size:"small",icon:e.jsx(te,{"aria-hidden":!0}),onClick:U,children:e.jsx(t,{id:"SenereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(q,{goToPreviousStep:r,saveDataOnPreviousClick:a})]})})})})};try{W.displayName="SenereUtenlandsoppholdPanel",W.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPanel",props:{senereUtenlandsopphold:{defaultValue:null,description:"",name:"senereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdSenere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}const xe=({index:o,fjernOpphold:a})=>{const{i18n:n}=H(),{watch:d,trigger:r,formState:{isSubmitted:p}}=Z(),f=d("utenlandsoppholdSiste12Mnd").filter((U,D)=>D!==o),l=d(`utenlandsoppholdSiste12Mnd.${o}.fom`),s=d(`utenlandsoppholdSiste12Mnd.${o}.tom`),i=m(V).toDate(),g=s?m(s).subtract(1,"days").toDate():m(j).toDate(),u=l&&fe(l,V)?m(l).add(1,"days").toDate():m(V).toDate(),S=m(j).toDate();return e.jsxs(c,{gap:"5",align:"start",children:[e.jsx(Q,{name:`utenlandsoppholdSiste12Mnd.${o}.landkode`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[T(n("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"))],children:oe().map(U=>e.jsx("option",{value:U[0],children:U[1]},U[0]))}),e.jsx(L,{name:`utenlandsoppholdSiste12Mnd.${o}.fom`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:i,maxDate:g,validate:[T(n("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),F(n("TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),O(n("TidligereUtenlandsoppholdSteg.FomErLikTom"),s),ne(n("TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),s),N(n("TidligereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:v(i),max:v(g)}),i,g),M(n("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:s,isStartDate:!1},f)],onChange:()=>p&&r(),defaultMonth:s?m(s).toDate():void 0}),e.jsx(L,{name:`utenlandsoppholdSiste12Mnd.${o}.tom`,label:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:u,maxDate:S,validate:[T(n("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved")),F(n("TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),O(n("TidligereUtenlandsoppholdSteg.TomErLikFom"),l),de(n("TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),l),N(n("TidligereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:v(u),max:v(S)}),u,S),M(n("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!0},f)],onChange:()=>p&&r()}),o>0&&e.jsx(P,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(X,{"aria-hidden":!0}),onClick:()=>a(o),children:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{TidligereUtenlandsoppholdPeriode.displayName="TidligereUtenlandsoppholdPeriode",TidligereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const pe={fom:"",tom:"",landkode:""},Le={utenlandsoppholdSiste12Mnd:[pe]},z=({tidligereUtenlandsopphold:o,saveOnNext:a,saveOnPrevious:n,cancelApplication:d,onContinueLater:r,goToPreviousStep:p,stepConfig:f,supportsTempSaving:l=!0})=>{const s=h.useMemo(()=>o||Le,[o]),i=A({defaultValues:s}),{fields:g,append:u,remove:S}=ee({name:"utenlandsoppholdSiste12Mnd",control:i.control}),U=h.useCallback(()=>{u(pe)},[u]),D=h.useCallback(k=>{S(k)},[S]);return e.jsx(b,{children:e.jsx(R,{onCancel:d,onContinueLater:r,steps:f,supportsTempSaving:l,children:e.jsx(w,{formMethods:i,onSubmit:a,children:e.jsxs(c,{gap:"10",children:[e.jsx(C,{}),e.jsxs(c,{gap:"10",align:"start",children:[g.map((k,_)=>e.jsxs(h.Fragment,{children:[e.jsx(xe,{index:_,fjernOpphold:D}),g.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},k.id)),e.jsx(P,{type:"button",variant:"secondary",size:"small",icon:e.jsx(te,{"aria-hidden":!0}),onClick:U,children:e.jsx(t,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(q,{goToPreviousStep:p,saveDataOnPreviousClick:n})]})})})})};try{z.displayName="TidligereUtenlandsoppholdPanel",z.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{defaultValue:null,description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdTidligere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdTidligere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(data: UtenlandsoppholdTidligere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}export{W as S,z as T,Y as U};
