import{k as J,e as ie,l as ge,j as e,m as me,S as B,V as c,F as n,R as L,E as x,g as y,H as he,b as ue,B as H,a as w,d as i,c as P,T as Q,n as X}from"./fridagerUtils-f3aec6f3.js";import{u as V,F as R,E as A,R as K,S as C,a as Z,b as ee,D as I,c as de}from"./ErrorSummaryHookForm-9e431d55.js";import{r as f}from"./_baseToString-53b0dbb2.js";import"./_createSet-a1fd5098.js";import{f as T,l as G,D as j,s as $,t as Se,v as oe,g as F,w as N,x as ne,y as O,p as v,z as M,B as te,G as E,H as Ue}from"./useEsNavigator-49099871.js";const le={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Hvor har du bodd de siste 12 månedene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgi hvor du har bodd de siste 12 månedene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg har bodd i Norge","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg har bodd helt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Hvor skal du bo de neste 12 månedene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgi hvor du skal bo de neste 12 månedene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg skal bo i Norge","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg skal bo helt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte fra NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte fra NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lese mer om utenlandsopphold på","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Hvilket land bodde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velge landet du oppholder deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velge en fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velge en til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legge inn en dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legge inn en dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Hvilket land skal du bo i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velge en fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velge en til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legge inn en dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legge inn en dato som er etter fra-datoen"},ae={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Kvar har du budd dei siste 12 månadene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgje kor du har budd dei siste 12 månadene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Eg har budd i Noreg","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg har budd heilt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Kvar skal du bu dei neste 12 månadene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgje kor du skal bu dei neste 12 månadene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Eg skal berre bu i Noreg","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg skal bu heilt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte frå NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte frå NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lese mer om utenlandsopphold på","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Kva land budde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velja landet du oppheld deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velja ein til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Kva land skal du bu i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velja ein til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen"},re={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Where have you lived in the last 12 months?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"You must state where you have lived in the last 12 months","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Only lived in Norway","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Lived abroad in whole or in part","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Where are you going to live for the next 12 months?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"You must enter where you are going to live for the next 12 months","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Only live in Norway.","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Stay abroad in whole or in part","UtenlandsoppholdSteg.StotteFraNav":"Stays abroad and support from NAV","UtenlandsoppholdSteg.Info.Del1":"To be entitled to support from NAV, you must be a member of Norwegian National Insurance Scheme. People who live in Norway are usually members of the Norwegian National Insurance","UtenlandsoppholdSteg.Info.Del2":"Whether you keep your membership in the National Insurance Scheme during your stay abroad depends on where you will be staying and how long you will be there.","UtenlandsoppholdSteg.Info.Del3":"When you will be abroad for more than 12 months, we consider you to be resident abroad according to the Norwegian National Insurance Act's rules. The same applies if you will be abroad for more than 6 months a year for 2 or more consecutive calendar years.","UtenlandsoppholdSteg.Info.Del4":"You are no longer a member of the National Insurance Scheme when you are considered resident abroad.","UtenlandsoppholdSteg.Info.Undertittel":"Holidays and temporary stays abroad","UtenlandsoppholdSteg.Info.Del5":"When you are on holiday abroad, you are considered a tourist and retain your membership in the national insurance, if you have no income from work during your stay and your stay does not last longer than 12 months. As long as you are a member of the National Insurance Scheme, you generally retain the benefit.","UtenlandsoppholdSteg.Info.Del6":"You can read more about stays abroad at","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"What country did you live in?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"You must select the countries you are staying in.","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","TidligereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"You must choose an even date","TidligereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Which country should you live in?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"You must choose a country to stay in.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"You must choose an even date","SenereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","SenereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date"},ce=d=>d==="nb"?le:d==="nn"?ae:re,fe=ge(),ve=(d,a)=>ie({locale:d,messages:a},fe),q=()=>{const{locale:d}=J(),a=f.useMemo(()=>{const o=ce(d)||{};return ve(d,o)},[d]);return{i18n:(o,s)=>a.formatMessage({id:o},s)}},Te=d=>d==="nb"?le:d==="nn"?ae:re,b=({children:d})=>{const{locale:a}=J(),o=f.useMemo(()=>Te(a)||{},[a]);return e.jsx(me,{locale:a,messages:o,children:d})};try{b.displayName="UtenlandsoppholdIntlProvider",b.__docgenInfo={description:"",displayName:"UtenlandsoppholdIntlProvider",props:{}}}catch{}const Y=({utenlandsopphold:d,saveOnNext:a,saveOnPrevious:o,cancelApplication:s,onContinueLater:S,goToPreviousStep:u,stepConfig:U,stønadstype:t,supportsTempSaving:l=!0})=>{const{i18n:r}=q(),p=V({defaultValues:d});return e.jsx(b,{children:e.jsx(B,{steps:U,onCancel:s,onContinueLater:S,useNoTempSavingText:l,children:e.jsx(R,{formMethods:p,onSubmit:a,children:e.jsxs(c,{gap:"10",children:[e.jsx(A,{}),e.jsxs(K,{name:"harBoddUtenforNorgeSiste12Mnd",label:e.jsx(n,{id:"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål"}),validate:[T(r("UtenlandsoppholdSteg.Siste12Måneder.IsRequired"))],children:[e.jsx(L,{value:!1,children:e.jsx(n,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(L,{value:!0,children:e.jsx(n,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(K,{name:"skalBoUtenforNorgeNeste12Mnd",label:e.jsx(n,{id:"UtenlandsoppholdSteg.Neste12Måneder.Spørsmål"}),validate:[T(r("UtenlandsoppholdSteg.Neste12Måneder.IsRequired"))],children:[e.jsx(L,{value:!1,children:e.jsx(n,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(L,{value:!0,children:e.jsx(n,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(x,{size:"small","aria-label":r("UtenlandsoppholdSteg.StotteFraNav"),children:[e.jsx(x.Header,{children:e.jsx(x.Title,{size:"small",children:e.jsx(n,{id:"UtenlandsoppholdSteg.StotteFraNav"})})}),e.jsx(x.Content,{children:e.jsxs(c,{gap:"10",children:[e.jsxs(c,{gap:"5",children:[e.jsx(y,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del1"})}),e.jsx(y,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del2"})}),e.jsx(y,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del3"})}),e.jsx(y,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del4"})})]}),e.jsxs(c,{gap:"5",children:[e.jsx(he,{size:"small",children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Undertittel"})}),e.jsx(y,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del5"})}),e.jsxs(ue,{gap:"1",children:[e.jsx(H,{children:e.jsx(n,{id:"UtenlandsoppholdSteg.Info.Del6"})}),e.jsxs(H,{children:[t==="Engangsstønad"&&e.jsx(w,{href:G.engangsstonadHvem,children:"nav.no/engangsstonad#hvem"}),t==="Foreldrepenger"&&e.jsx(w,{href:G.foreldrepengerUtland,children:"nav.no/foreldrepenger#utland"})]})]})]})]})})]}),e.jsx(C,{goToPreviousStep:u,saveDataOnPreviousClick:o})]})})})})};try{Y.displayName="UtenlandsoppholdPanel",Y.__docgenInfo={description:"",displayName:"UtenlandsoppholdPanel",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!1,type:{name:"Utenlandsopphold"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: Utenlandsopphold) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: Utenlandsopphold | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},stønadstype:{defaultValue:null,description:"",name:"stønadstype",required:!0,type:{name:"enum",value:[{value:'"Foreldrepenger"'},{value:'"Engangsstønad"'},{value:'"Svangerskapspenger"'}]}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}const De=({index:d,fjernOpphold:a})=>{const{i18n:o}=q(),{watch:s,trigger:S,formState:{isSubmitted:u}}=Z(),U=s("utenlandsoppholdNeste12Mnd").filter((h,D)=>D!==d),t=s(`utenlandsoppholdNeste12Mnd.${d}.fom`),l=s(`utenlandsoppholdNeste12Mnd.${d}.tom`),r=i(j).toDate(),p=l?i(l).subtract(1,"days").toDate():i($).toDate(),g=t&&Se(t)?i(t).add(1,"days").toDate():i(j).toDate(),m=i($).toDate();return e.jsxs(c,{gap:"5",align:"start",children:[e.jsx(ee,{name:`utenlandsoppholdNeste12Mnd.${d}.landkode`,label:e.jsx(n,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI"}),validate:[T(o("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved"))],children:oe().map(h=>e.jsx("option",{value:h[0],children:h[1]},h[0]))}),e.jsx(I,{name:`utenlandsoppholdNeste12Mnd.${d}.fom`,label:e.jsx(n,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:r,maxDate:p,validate:[T(o("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),F(o("SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),N(o("SenereUtenlandsoppholdSteg.FomErLikTom"),l),ne(o("SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),l),O(o("SenereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:v(r),max:v(p)}),r,p),M(o("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!1},U)],onChange:()=>u&&S()}),e.jsx(I,{name:`utenlandsoppholdNeste12Mnd.${d}.tom`,label:e.jsx(n,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:g,maxDate:m,validate:[T(o("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved")),F(o("SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),N(o("SenereUtenlandsoppholdSteg.TomErLikFom"),t),te(o("SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),t),O(o("SenereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:v(g),max:v(m)}),g,m),M(o("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:t,isStartDate:!0},U)],onChange:()=>u&&S(),defaultMonth:t?i(t).toDate():void 0}),d>0&&e.jsx(P,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Q,{"aria-hidden":!0}),onClick:()=>a(d),children:e.jsx(n,{id:"SenereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{SenereUtenlandsoppholdPeriode.displayName="SenereUtenlandsoppholdPeriode",SenereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const se={fom:"",tom:"",landkode:""},ke={utenlandsoppholdNeste12Mnd:[se]},W=({saveOnNext:d,saveOnPrevious:a,cancelApplication:o,onContinueLater:s,goToPreviousStep:S,senereUtenlandsopphold:u,stepConfig:U,supportsTempSaving:t=!0})=>{const l=f.useMemo(()=>u||ke,[u]),r=V({defaultValues:l}),{fields:p,append:g,remove:m}=de({name:"utenlandsoppholdNeste12Mnd",control:r.control}),h=f.useCallback(()=>{g(se)},[g]),D=f.useCallback(k=>{m(k)},[m]);return e.jsx(b,{children:e.jsx(B,{onCancel:o,onContinueLater:s,steps:U,useNoTempSavingText:!t,children:e.jsx(R,{formMethods:r,onSubmit:d,children:e.jsxs(c,{gap:"10",children:[e.jsx(A,{}),e.jsxs(c,{gap:"10",align:"start",children:[p.map((k,_)=>e.jsxs(f.Fragment,{children:[e.jsx(De,{index:_,fjernOpphold:D}),p.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},k.id)),e.jsx(P,{type:"button",variant:"secondary",size:"small",icon:e.jsx(X,{"aria-hidden":!0}),onClick:h,children:e.jsx(n,{id:"SenereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(C,{goToPreviousStep:S,saveDataOnPreviousClick:a})]})})})})};try{W.displayName="SenereUtenlandsoppholdPanel",W.__docgenInfo={description:"",displayName:"SenereUtenlandsoppholdPanel",props:{senereUtenlandsopphold:{defaultValue:null,description:"",name:"senereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdSenere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(formValues: UtenlandsoppholdSenere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}const ye=({index:d,fjernOpphold:a})=>{const{i18n:o}=q(),{watch:s,trigger:S,formState:{isSubmitted:u}}=Z(),U=s("utenlandsoppholdSiste12Mnd").filter((h,D)=>D!==d),t=s(`utenlandsoppholdSiste12Mnd.${d}.fom`),l=s(`utenlandsoppholdSiste12Mnd.${d}.tom`),r=i(E).toDate(),p=l?i(l).subtract(1,"days").toDate():i(j).toDate(),g=t&&Ue(t,E)?i(t).add(1,"days").toDate():i(E).toDate(),m=i(j).toDate();return e.jsxs(c,{gap:"5",align:"start",children:[e.jsx(ee,{name:`utenlandsoppholdSiste12Mnd.${d}.landkode`,label:e.jsx(n,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[T(o("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"))],children:oe().map(h=>e.jsx("option",{value:h[0],children:h[1]},h[0]))}),e.jsx(I,{name:`utenlandsoppholdSiste12Mnd.${d}.fom`,label:e.jsx(n,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:r,maxDate:p,validate:[T(o("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),F(o("TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),N(o("TidligereUtenlandsoppholdSteg.FomErLikTom"),l),ne(o("TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),l),O(o("TidligereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:v(r),max:v(p)}),r,p),M(o("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!1},U)],onChange:()=>u&&S(),defaultMonth:l?i(l).toDate():void 0}),e.jsx(I,{name:`utenlandsoppholdSiste12Mnd.${d}.tom`,label:e.jsx(n,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:g,maxDate:m,validate:[T(o("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved")),F(o("TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),N(o("TidligereUtenlandsoppholdSteg.TomErLikFom"),t),te(o("TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),t),O(o("TidligereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:v(g),max:v(m)}),g,m),M(o("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:t,isStartDate:!0},U)],onChange:()=>u&&S()}),d>0&&e.jsx(P,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Q,{"aria-hidden":!0}),onClick:()=>a(d),children:e.jsx(n,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};try{TidligereUtenlandsoppholdPeriode.displayName="TidligereUtenlandsoppholdPeriode",TidligereUtenlandsoppholdPeriode.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPeriode",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},fjernOpphold:{defaultValue:null,description:"",name:"fjernOpphold",required:!0,type:{name:"(index: number) => void"}}}}}catch{}const pe={fom:"",tom:"",landkode:""},be={utenlandsoppholdSiste12Mnd:[pe]},z=({tidligereUtenlandsopphold:d,saveOnNext:a,saveOnPrevious:o,cancelApplication:s,onContinueLater:S,goToPreviousStep:u,stepConfig:U,supportsTempSaving:t=!0})=>{const l=f.useMemo(()=>d||be,[d]),r=V({defaultValues:l}),{fields:p,append:g,remove:m}=de({name:"utenlandsoppholdSiste12Mnd",control:r.control}),h=f.useCallback(()=>{g(pe)},[g]),D=f.useCallback(k=>{m(k)},[m]);return e.jsx(b,{children:e.jsx(B,{onCancel:s,onContinueLater:S,steps:U,useNoTempSavingText:!t,children:e.jsx(R,{formMethods:r,onSubmit:a,children:e.jsxs(c,{gap:"10",children:[e.jsx(A,{}),e.jsxs(c,{gap:"10",align:"start",children:[p.map((k,_)=>e.jsxs(f.Fragment,{children:[e.jsx(ye,{index:_,fjernOpphold:D}),p.length>1&&e.jsx("hr",{style:{width:"100%"},color:"#99C4DD"})]},k.id)),e.jsx(P,{type:"button",variant:"secondary",size:"small",icon:e.jsx(X,{"aria-hidden":!0}),onClick:h,children:e.jsx(n,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(C,{goToPreviousStep:u,saveDataOnPreviousClick:o})]})})})})};try{z.displayName="TidligereUtenlandsoppholdPanel",z.__docgenInfo={description:"",displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{defaultValue:null,description:"",name:"tidligereUtenlandsopphold",required:!1,type:{name:"UtenlandsoppholdTidligere"}},saveOnNext:{defaultValue:null,description:"",name:"saveOnNext",required:!0,type:{name:"(formValues: UtenlandsoppholdTidligere) => void"}},saveOnPrevious:{defaultValue:null,description:"",name:"saveOnPrevious",required:!0,type:{name:"(data: UtenlandsoppholdTidligere | undefined) => void"}},cancelApplication:{defaultValue:null,description:"",name:"cancelApplication",required:!0,type:{name:"() => void"}},onContinueLater:{defaultValue:null,description:"",name:"onContinueLater",required:!1,type:{name:"(() => void)"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}},stepConfig:{defaultValue:null,description:"",name:"stepConfig",required:!0,type:{name:"StepConfig[]"}},supportsTempSaving:{defaultValue:{value:"true"},description:"",name:"supportsTempSaving",required:!1,type:{name:"boolean"}}}}}catch{}export{W as S,z as T,Y as U};
//# sourceMappingURL=TidligereUtenlandsoppholdPanel-f7ad2de3.js.map