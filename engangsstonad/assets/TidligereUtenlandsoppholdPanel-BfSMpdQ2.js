import{u as K,j as e,c as ie,a as pe}from"./index-DZ_iNobP.js";import{u as E,F as B,E as R,R as H,a as D,S as A,b as G,d as $,D as j,c as W}from"./ErrorSummaryHookForm-BK0p70mm.js";import{J as ge,K as me,S as _,V as v,F as d,e as y,h as b,t as T,H as ue,j as he,B as C,g as w,l as P,d as g,N as I,O as Y,Q as Se,T as z,w as L,U as x,W as J,X as F,Y as k,Z as M,_ as X,k as N,$ as Z,a0 as Q,a1 as q,a2 as Ue}from"./useEsNavigator-CCPepSoW.js";import{r as h}from"./index-Dl6G-zuu.js";var fe=function(n,r){var t={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&r.indexOf(o)<0&&(t[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,o=Object.getOwnPropertySymbols(n);s<o.length;s++)r.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(n,o[s])&&(t[o[s]]=n[o[s]]);return t};const ve=h.forwardRef((n,r)=>{var{title:t,titleId:o}=n,s=fe(n,["title","titleId"]);let i=ge();return i=t?o||"title-"+i:void 0,h.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:r,"aria-labelledby":i},s),t?h.createElement("title",{id:i},t):null,h.createElement("path",{d:"M12.75 5.5a.75.75 0 0 0-1.5 0v5.75H5.5a.75.75 0 0 0 0 1.5h5.75v5.75a.75.75 0 0 0 1.5 0v-5.75h5.75a.75.75 0 0 0 0-1.5h-5.75V5.5Z",fill:"currentColor"}))}),ee=ve,ne={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Hvor har du bodd de siste 12 månedene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgi hvor du har bodd de siste 12 månedene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg har bodd i Norge","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg har bodd helt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Hvor skal du bo de neste 12 månedene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgi hvor du skal bo de neste 12 månedene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Jeg skal bo i Norge","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Jeg skal bo helt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte fra NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte fra NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lese mer om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepenger og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.es":"engangsstønad og utenlandsopphold.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspenger og utenlandsopphold.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Hvilket land bodde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må oppgi landet du oppholder deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må oppgi en fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må oppgi en til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Fra og med dato kan ikke være etter til og med dato","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Til og med dato kan ikke være før fra og med dato","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikke være flere utenlandsopphold i samme periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Hvilket land skal du bo i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må oppgi et land du skal oppholde deg i","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Fra og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må oppgi en fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må oppgi en til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Fra og med dato kan ikke være samme som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikke være samme som fra og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Fra og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må være en gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må være mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Fra og med dato kan ikke være etter til og med dato","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Til og med dato kan ikke være før fra og med dato"},te={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Kvar har du budd dei siste 12 månadene?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"Du må oppgje kor du har budd dei siste 12 månadene","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Eg har budd i Noreg","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg har budd heilt eller delvis i utlandet","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Kvar skal du bu dei neste 12 månadene?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"Du må oppgje kor du skal bu dei neste 12 månadene","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Eg skal berre bu i Noreg","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Eg skal bu heilt eller delvis i utlandet","UtenlandsoppholdSteg.StotteFraNav":"Utenlandsopphold og støtte frå NAV","UtenlandsoppholdSteg.Info.Del1":"For å ha rett til støtte frå NAV må du være medlem av norsk folketrygd. Personer som er bosatt i Norge er vanligvis medlemmer i folketrygden","UtenlandsoppholdSteg.Info.Del2":"Om du beholder medlemskapet ditt i folketrygden under opphold i utlandet, avhenger av hvor du skal oppholde deg og hvor lenge du skal være der.","UtenlandsoppholdSteg.Info.Del3":"Når du skal være i utlandet i mer enn 12 måneder, anser vi deg som bosatt i utlandet etter folketrygdlovens regler. Det samme gjelder hvis du i 2 eller flere kalenderår etter hverandre skal være i utlandet mer enn 6 måneder i året.","UtenlandsoppholdSteg.Info.Del4":"Du er ikke lenger medlem i folketrygden når du regnes som bosatt i utlandet.","UtenlandsoppholdSteg.Info.Undertittel":"Ferie og midlertidig opphold i utlandet","UtenlandsoppholdSteg.Info.Del5":"Når du er på ferie i utlandet regnes du som turist og beholder medlemskapet i folketrygden, dersom du ikke har arbeidsinntekt under oppholdet og oppholdet ikke varer lenger enn 12 måneder. Så lenge du er medlem i folketrygden beholder du som hovedregel ytelsen.","UtenlandsoppholdSteg.Info.Del6":"Du kan lesa meir om ","UtenlandsoppholdSteg.Info.Del7.fp":"foreldrepengar og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.es":"eingongsstønad og utanlandsopphald.","UtenlandsoppholdSteg.Info.Del7.svp":"svangerskapspengar og utanlandsopphald.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"Kva land budde du i?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"Du må velja landet du oppheld deg i","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","TidligereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"Du må velja ein til og med dato","TidligereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Legg til flere opphold i utlandet","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"Det kan ikkje vere fleire utenlandsopphold i same periode","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Kva land skal du bu i?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"Du må velge et land du skal oppholde deg i.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"Frå og med","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"Du må velja ein fra og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"Du må velja ein til og med dato","SenereUtenlandsoppholdSteg.FomErLikTom":"Frå og med dato kan ikkje vera same som til og med dato","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Til og med","SenereUtenlandsoppholdSteg.TomErLikFom":"Til og med dato kan ikkje vera same som frå og med dato","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Slett dette oppholdet","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"Frå og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Til og med dato må vera ein gyldig dato på formatet dd.mm.åååå","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"Fra og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Til og med dato for utenlandsopphold må vera mellom {min} og {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"Du må legga inn ein dato som er før til-datoen","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"Du må legga inn ein dato som er etter fra-datoen"},oe={"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål":"Where have you lived in the last 12 months?","UtenlandsoppholdSteg.Siste12Måneder.IsRequired":"You must state where you have lived in the last 12 months","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge":"Only lived in Norway","UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Lived abroad in whole or in part","UtenlandsoppholdSteg.Neste12Måneder.Spørsmål":"Where are you going to live for the next 12 months?","UtenlandsoppholdSteg.Neste12Måneder.IsRequired":"You must enter where you are going to live for the next 12 months","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge":"Only live in Norway.","UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet":"Stay abroad in whole or in part","UtenlandsoppholdSteg.StotteFraNav":"Stays abroad and support from NAV","UtenlandsoppholdSteg.Info.Del1":"To be entitled to support from NAV, you must be a member of Norwegian National Insurance Scheme. People who live in Norway are usually members of the Norwegian National Insurance","UtenlandsoppholdSteg.Info.Del2":"Whether you keep your membership in the National Insurance Scheme during your stay abroad depends on where you will be staying and how long you will be there.","UtenlandsoppholdSteg.Info.Del3":"When you will be abroad for more than 12 months, we consider you to be resident abroad according to the Norwegian National Insurance Act's rules. The same applies if you will be abroad for more than 6 months a year for 2 or more consecutive calendar years.","UtenlandsoppholdSteg.Info.Del4":"You are no longer a member of the National Insurance Scheme when you are considered resident abroad.","UtenlandsoppholdSteg.Info.Undertittel":"Holidays and temporary stays abroad","UtenlandsoppholdSteg.Info.Del5":"When you are on holiday abroad, you are considered a tourist and retain your membership in the national insurance, if you have no income from work during your stay and your stay does not last longer than 12 months. As long as you are a member of the National Insurance Scheme, you generally retain the benefit.","UtenlandsoppholdSteg.Info.Del6":"You can read more about ","UtenlandsoppholdSteg.Info.Del7.fp":"parental benefit and stays abroad.","UtenlandsoppholdSteg.Info.Del7.es":"lump-sum grant and stays abroad.","UtenlandsoppholdSteg.Info.Del7.svp":"maternity allowance and stays abroad.","TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI":"What country did you live in?","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd":"You must select the countries you are staying in.","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","TidligereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved":"You must choose an even date","TidligereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","TidligereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date","SenereUtenlandsoppholdSteg.Knapp.LeggTilLand":"Add a new stay abroad","SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp":"You can't have several stays abroad during the same period","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI":"Which country should you live in?","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved":"You must choose a country to stay in.","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed":"As of","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved":"You must choose an as of date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved":"You must choose an even date","SenereUtenlandsoppholdSteg.FomErLikTom":"As of date cannot be the same as even date","SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed":"Even","SenereUtenlandsoppholdSteg.TomErLikFom":"Even date cannot be the same as as of date","SenereUtenlandsoppholdSteg.Knapp.SlettOpphold":"Delete stay abroad","SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato":"As of and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato":"Even and including date must be a valid date in the format dd.mm.yyyy","SenereUtenlandsoppholdSteg.DateOutsideRangeFom":"As of and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.DateOutsideRangeTom":"Even and including date of stay abroad must be between {min} and {max}","SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato":"The date has to before the to date","SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato":"The date has to be after the from date"},ce=n=>n==="nb"?ne:n==="nn"?te:oe,O=({children:n})=>{const{locale:r}=K(),t=h.useMemo(()=>ce(r)||{},[r]);return e.jsx(me,{locale:r,messages:t,children:n})};O.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdIntlProvider"};const ke=n=>n==="nb"?ne:n==="nn"?te:oe,ye=pe(),Te=(n,r)=>ie({locale:n,messages:r},ye),V=()=>{const{locale:n}=K(),r=h.useMemo(()=>{const t=ke(n)||{};return Te(n,t)},[n]);return{i18n:(t,o)=>r.formatMessage({id:t},o)}},De=({utenlandsopphold:n,saveOnNext:r,saveOnPrevious:t,cancelApplication:o,onContinueLater:s,goToPreviousStep:i,stepConfig:U,stønadstype:a})=>{const{i18n:l}=V(),p=E({defaultValues:n});return e.jsx(O,{children:e.jsx(_,{steps:U,onCancel:o,onContinueLater:s,children:e.jsx(B,{formMethods:p,onSubmit:r,children:e.jsxs(v,{gap:"10",children:[e.jsx(R,{}),e.jsxs(H,{name:"harBoddUtenforNorgeSiste12Mnd",label:e.jsx(d,{id:"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål"}),validate:[y(l("UtenlandsoppholdSteg.Siste12Måneder.IsRequired"))],children:[e.jsx(D,{value:!1,children:e.jsx(d,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(D,{value:!0,children:e.jsx(d,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(H,{name:"skalBoUtenforNorgeNeste12Mnd",label:e.jsx(d,{id:"UtenlandsoppholdSteg.Neste12Måneder.Spørsmål"}),validate:[y(l("UtenlandsoppholdSteg.Neste12Måneder.IsRequired"))],children:[e.jsx(D,{value:!1,children:e.jsx(d,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge"})}),e.jsx(D,{value:!0,children:e.jsx(d,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),e.jsxs(b,{size:"small","aria-label":l("UtenlandsoppholdSteg.StotteFraNav"),children:[e.jsx(b.Header,{children:e.jsx(b.Title,{size:"small",children:e.jsx(d,{id:"UtenlandsoppholdSteg.StotteFraNav"})})}),e.jsx(b.Content,{children:e.jsxs(v,{gap:"10",children:[e.jsxs(v,{gap:"5",children:[e.jsx(T,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del1"})}),e.jsx(T,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del2"})}),e.jsx(T,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del3"})}),e.jsx(T,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del4"})})]}),e.jsxs(v,{gap:"5",children:[e.jsx(ue,{size:"small",level:"4",children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Undertittel"})}),e.jsx(T,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del5"})}),e.jsxs(he,{gap:"1",children:[e.jsx(C,{children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del6"})}),e.jsxs(C,{children:[a==="Engangsstønad"&&e.jsx(w,{href:P.engangsstonadHvem,target:"_blank",children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del7.es"})}),a==="Foreldrepenger"&&e.jsx(w,{href:P.foreldrepengerUtland,target:"_blank",children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del7.fp"})}),a==="Svangerskapspenger"&&e.jsx(w,{href:P.svangerskapspengerUtland,target:"_blank",children:e.jsx(d,{id:"UtenlandsoppholdSteg.Info.Del7.svp"})})]})]})]})]})})]}),e.jsx(A,{goToPreviousStep:i,saveDataOnPreviousClick:t})]})})})})};De.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdPanel",props:{utenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Utenlandsopphold) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Utenlandsopphold | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"Utenlandsopphold | undefined",elements:[{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:"'Engangsstønad' | 'Foreldrepenger' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""}}};const de=({index:n,fjernOpphold:r})=>{const{i18n:t}=V(),{watch:o,trigger:s,formState:{isSubmitted:i}}=G(),U=o("utenlandsoppholdNeste12Mnd").filter((u,c)=>c!==n),a=o(`utenlandsoppholdNeste12Mnd.${n}.fom`),l=o(`utenlandsoppholdNeste12Mnd.${n}.tom`),p=g(I).toDate(),m=l?g(l).subtract(1,"days").toDate():g(Y).toDate(),S=a&&Se(a)?g(a).add(1,"days").toDate():g(I).toDate(),f=g(Y).toDate();return e.jsxs(v,{gap:"5",align:"start",children:[e.jsx($,{name:`utenlandsoppholdNeste12Mnd.${n}.landkode`,label:e.jsx(d,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Spørsmål.HvilketLandSkalDuBoI"}),validate:[y(t("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuSkalBoIPåkreved"))],children:z().map(u=>e.jsx("option",{value:u[0],children:u[1]},u[0]))}),e.jsx(j,{name:`utenlandsoppholdNeste12Mnd.${n}.fom`,label:e.jsx(d,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:p,maxDate:m,validate:[y(t("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),L(t("SenereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),x(t("SenereUtenlandsoppholdSteg.FomErLikTom"),l),J(t("SenereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),l),F(t("SenereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:k(p),max:k(m)}),p,m),M(t("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!1},U)],onChange:()=>i&&s()}),e.jsx(j,{name:`utenlandsoppholdNeste12Mnd.${n}.tom`,label:e.jsx(d,{id:"SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:S,maxDate:f,validate:[y(t("SenereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuSkalBoIPåkreved")),L(t("SenereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),x(t("SenereUtenlandsoppholdSteg.TomErLikFom"),a),X(t("SenereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),a),F(t("SenereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:k(S),max:k(f)}),S,f),M(t("SenereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:a,isStartDate:!0},U)],onChange:()=>i&&s(),defaultMonth:a?g(a).toDate():void 0}),n>0&&e.jsx(N,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Z,{"aria-hidden":!0}),onClick:()=>r(n),children:e.jsx(d,{id:"SenereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};de.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdPanel"};const ae={fom:"",tom:"",landkode:""},be={utenlandsoppholdNeste12Mnd:[ae]},je=({saveOnNext:n,saveOnPrevious:r,cancelApplication:t,onContinueLater:o,goToPreviousStep:s,senereUtenlandsopphold:i,stepConfig:U})=>{const a=h.useMemo(()=>i||be,[i]),l=E({defaultValues:a}),{fields:p,append:m,remove:S}=W({name:"utenlandsoppholdNeste12Mnd",control:l.control}),f=h.useCallback(()=>{m(ae)},[m]);return e.jsx(O,{children:e.jsx(_,{onCancel:t,onContinueLater:o,steps:U,children:e.jsx(B,{formMethods:l,onSubmit:n,children:e.jsxs(v,{gap:"10",children:[e.jsx(R,{}),e.jsxs(v,{gap:"10",align:"start",children:[p.map((u,c)=>e.jsxs(h.Fragment,{children:[e.jsx(de,{index:c,fjernOpphold:S}),p.length>1&&e.jsx(Q,{})]},u.id)),e.jsx(N,{type:"button",variant:"secondary",size:"small",icon:e.jsx(ee,{"aria-hidden":!0}),onClick:f,children:e.jsx(d,{id:"SenereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(A,{goToPreviousStep:s,saveDataOnPreviousClick:r})]})})})})};je.__docgenInfo={description:"",methods:[],displayName:"SenereUtenlandsoppholdPanel",props:{senereUtenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdNeste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: UtenlandsoppholdSenere) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdNeste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: UtenlandsoppholdSenere | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"UtenlandsoppholdSenere | undefined",elements:[{name:"signature",type:"object",raw:`{
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdNeste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const le=({index:n,fjernOpphold:r})=>{const{i18n:t}=V(),{watch:o,trigger:s,formState:{isSubmitted:i}}=G(),U=o("utenlandsoppholdSiste12Mnd").filter((u,c)=>c!==n),a=o(`utenlandsoppholdSiste12Mnd.${n}.fom`),l=o(`utenlandsoppholdSiste12Mnd.${n}.tom`),p=g(q).toDate(),m=l?g(l).subtract(1,"days").toDate():g(I).toDate(),S=a&&Ue(a,q)?g(a).add(1,"days").toDate():g(q).toDate(),f=g(I).toDate();return e.jsxs(v,{gap:"5",align:"start",children:[e.jsx($,{name:`utenlandsoppholdSiste12Mnd.${n}.landkode`,label:e.jsx(d,{id:"TidligereUtenlandsoppholdSteg.Spørsmål.HvilketLandHarDuBoddI"}),validate:[y(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandDuHarBoddIPåkrevd"))],children:z().map(u=>e.jsx("option",{value:u[0],children:u[1]},u[0]))}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.fom`,label:e.jsx(d,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Fraogmed"}),minDate:p,maxDate:m,validate:[y(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandFomDuSkalBoIPåkreved")),L(t("TidligereUtenlandsoppholdSteg.FraOgMedDato.GyldigDato")),x(t("TidligereUtenlandsoppholdSteg.FomErLikTom"),l),J(t("TidligereUtenlandsoppholdSteg.Utenlandsopphold.FørTilDato"),l),F(t("TidligereUtenlandsoppholdSteg.DateOutsideRangeFom",{min:k(p),max:k(m)}),p,m),M(t("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:l,isStartDate:!1},U)],onChange:()=>i&&s(),defaultMonth:l?g(l).toDate():void 0}),e.jsx(j,{name:`utenlandsoppholdSiste12Mnd.${n}.tom`,label:e.jsx(d,{id:"TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.Tilogmed"}),minDate:S,maxDate:f,validate:[y(t("TidligereUtenlandsoppholdSteg.LeggTilUtenlandsopphold.LandTomDuHarBoddIPåkreved")),L(t("TidligereUtenlandsoppholdSteg.TilOgMedDato.GyldigDato")),x(t("TidligereUtenlandsoppholdSteg.TomErLikFom"),a),X(t("TidligereUtenlandsoppholdSteg.Utenlandsopphold.EtterFraDato"),a),F(t("TidligereUtenlandsoppholdSteg.DateOutsideRangeTom",{min:k(S),max:k(f)}),S,f),M(t("TidligereUtenlandsoppholdSteg.Valideringsfeil.Utenlandsopphold.Overlapp"),{date:a,isStartDate:!0},U)],onChange:()=>i&&s()}),n>0&&e.jsx(N,{type:"button",variant:"tertiary",size:"small",icon:e.jsx(Z,{"aria-hidden":!0}),onClick:()=>r(n),children:e.jsx(d,{id:"TidligereUtenlandsoppholdSteg.Knapp.SlettOpphold"})})]})};le.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel"};const re={fom:"",tom:"",landkode:""},Ie={utenlandsoppholdSiste12Mnd:[re]},Le=({tidligereUtenlandsopphold:n,saveOnNext:r,saveOnPrevious:t,cancelApplication:o,onContinueLater:s,goToPreviousStep:i,stepConfig:U})=>{const a=h.useMemo(()=>n||Ie,[n]),l=E({defaultValues:a}),{fields:p,append:m,remove:S}=W({name:"utenlandsoppholdSiste12Mnd",control:l.control}),f=h.useCallback(()=>{m(re)},[m]),u=h.useCallback(c=>{S(c)},[S]);return e.jsx(O,{children:e.jsx(_,{onCancel:o,onContinueLater:s,steps:U,children:e.jsx(B,{formMethods:l,onSubmit:r,children:e.jsxs(v,{gap:"10",children:[e.jsx(R,{}),e.jsxs(v,{gap:"10",align:"start",children:[p.map((c,se)=>e.jsxs(h.Fragment,{children:[e.jsx(le,{index:se,fjernOpphold:u}),p.length>1&&e.jsx(Q,{})]},c.id)),e.jsx(N,{type:"button",variant:"secondary",size:"small",icon:e.jsx(ee,{"aria-hidden":!0}),onClick:f,children:e.jsx(d,{id:"TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand"})})]}),e.jsx(A,{goToPreviousStep:i,saveDataOnPreviousClick:t})]})})})})};Le.__docgenInfo={description:"",methods:[],displayName:"TidligereUtenlandsoppholdPanel",props:{tidligereUtenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: UtenlandsoppholdTidligere) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(data: UtenlandsoppholdTidligere | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"UtenlandsoppholdTidligere | undefined",elements:[{name:"signature",type:"object",raw:`{
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
}`,signature:{properties:[{key:"utenlandsoppholdSiste12Mnd",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    landkode: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"landkode",value:{name:"string",required:!0}}]}}],raw:"UtenlandsoppholdPeriode[]",required:!0}}]}},{name:"undefined"}]},name:"data"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
    completed?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}},{key:"completed",value:{name:"boolean",required:!1}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};export{je as S,Le as T,De as U};
