import{f as n,U as B,t as he,W as j,u as z,j as r,M as c,d as J,V as ae,e as G,c as ue,r as be}from"./VeiviserPage-C75wD2__.js";import{u as U,C as R,b as ie,a as H}from"./routes-BUvKtCoD.js";import{c as Se,T as S,d as y,A as T,D as E,u as Pe,a as Ee}from"./useSvpNavigator-BZZPUZdx.js";import{l as oe,a as O,i as x,b as I,q as Ie,c as A,d as _,n as V,u as ye,R as xe,E as De,v as re,s as te,S as Re,j as se}from"./minMax-DetDAlbJ.js";import{g as X,a as W,b as L}from"./dateUtils-DSgpPuow.js";import"./index-CTjT7uj6.js";import{B as je}from"./Bedriftsbanner-Brr_EDAK.js";import{g as le}from"./numberUtils-DCxWcr3S.js";import{h as M,T as de,a as ge,b as w}from"./validationUtils-D4RPoczx.js";import{R as K}from"./ReadMore-DXqh3bRO.js";import{E as N}from"./ExpansionCard-DZnUEyB1.js";const Ae=(e,i)=>{if(!M(i)||i.trim()==="")return e.formatMessage({id:"valideringsfeil.stillingsprosent.required"});if(le(i)===void 0)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreEtTall"})},_e=(e,i,t)=>s=>{const l=Ae(e,s);if(l)return l;const o=le(s);if(o<=0)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreStørreEnn0"});const a=Se(t,i);if(a===0&&o>=100)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEnn100Prosent"},{prosent:a});if(a>0&&o>=a)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEnnOpprinneligStillingsprosent"},{prosent:a})},Le=e=>i=>!M(i)||i.trim()===""?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.påkrevd"}):i.length>de?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.forLang"}):i.length<ge?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.forKort"}):null,me=(e,i,t,s,l,o,a)=>f=>{const d=s===S.DELVIS;if(M(f)&&M(i)&&n(f).isBefore(n(i),"d"))return d?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.ingen"});if(M(f)&&n(f).isAfter(n(t),"d"))return a?d?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.ingen"}):d?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.ingen"});if(o&&M(i)&&n(i).isSameOrBefore(n(o),"d")&&n(f).isAfter(n(o),"d")){const g=w(o,e);return d?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.delvis"},{dato:j(o),navn:l,slutteTekst:g}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.ingen"},{dato:j(o),navn:l,slutteTekst:g})}},fe=(e,i,t,s,l,o,a,f)=>d=>{const g=l===S.DELVIS;if(M(d)&&M(i)&&n(d).isBefore(n(i),"d"))return e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førBehovForTilretteleggingFom"});if(M(s)&&n(d).isBefore(n(s),"d"))return g?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.ingen"});if(M(s)&&n(d).isSame(n(s),"d"))return g?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.ingen"});if(M(d)&&n(d).isAfter(n(t),"d"))return f?g?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.ingen"}):g?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.ingen"});if(a&&M(i)&&n(i).isSameOrBefore(n(a),"d")&&n(d).isAfter(n(a),"d")){const F=w(a,e);return e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterSluttDatoArbeid"},{dato:j(a),navn:o,slutteTekst:F})}},Ve=(e,i,t,s,l,o,a,f)=>d=>{if(n(d).isBefore(B(t),"d"))return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin"});if(n(d).isAfter(he(i),"d"))return a?e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin"}):e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.måVæreFørFødsel"});if(n(d).isBefore(n(l),"d")){const g=f?e.formatMessage({id:"somFrilanser"}):`i ${s}`;return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.førStartDatoArbeid"},{dato:j(l),navnTekst:g})}if(o&&n(d).isAfter(n(o),"d")){const g=w(o,e);return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.etterSluttDatoArbeid"},{dato:j(o),navn:s,slutteTekst:g})}},Te=(e,i,t,s,l,o,a)=>f=>{const d=i===S.DELVIS;if(!M(f))return d?a?e.formatMessage({id:"valideringsfeil.tomType.påkrevd.delvis.tilTermin"}):e.formatMessage({id:"valideringsfeil.tomType.påkrevd.delvis.tilFødsel"}):a?e.formatMessage({id:"valideringsfeil.tomType.påkrevd.ingen.tilTermin"}):e.formatMessage({id:"valideringsfeil.tomType.påkrevd.ingen.tilFødsel"});if(o&&M(t)&&f===y.SISTE_DAG_MED_SVP&&n(t).isSameOrBefore(n(o),"d")&&n(s).isAfter(n(o),"d")){const g=w(o,e);return d?e.formatMessage({id:"valideringsfeil.tomType.etterSluttDatoArbeid.delvis"},{slutteTekst:g,navn:l}):e.formatMessage({id:"valideringsfeil.tomType.etterSluttDatoArbeid.ingen"},{slutteTekst:g,navn:l})}},Ne=(e,i)=>{if(i===T.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.påkrevd"});if(i===T.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.påkrevd"});if(i===T.VIRKSOMHET)return e.formatMessage({id:"valideringsfeil.risikofaktorer.virksomhet.påkrevd"});throw Error("Ingen påkrevd-tekst for type: "+i)},Ge=(e,i)=>{if(i===T.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.forLang"});if(i===T.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.forLang"});throw Error("Ingen makslengde-tekst for type: "+i)},Oe=(e,i)=>{if(i===T.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.forKort"});if(i===T.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.forKort"});throw Error("Ingen tekst for type: "+i)},Be=(e,i)=>t=>!M(t)||t.trim()===""?Ne(e,i):t.length>de?Ge(e,i):t.length<ge?Oe(e,i):null,pe=({barnet:e,valgtTilrettelegging:i})=>{const t=z(),s=X(e),l=i.arbeidsforhold.type,o=l===T.VIRKSOMHET||l===T.PRIVAT,a=i.arbeidsforhold.sluttdato,f=i.arbeidsforhold.startdato,d=n.max(n(B(e.termindato)),n(f))||void 0,g=a?n.min(n(s),n(a)).toDate():s,F=W(e),m=oe(),h=m.watch("type"),p=m.watch("behovForTilretteleggingFom"),k=m.watch("enPeriodeMedTilretteleggingFom"),v=m.watch("delvisTilretteleggingPeriodeType"),P=m.watch("enPeriodeMedTilretteleggingTomType"),b=p||d,D=k?n(k).add(1,"day"):p;return r.jsxs(r.Fragment,{children:[r.jsxs(O,{name:"delvisTilretteleggingPeriodeType",label:t.formatMessage({id:"tilrettelegging.tilretteleggingPeriodetype.label"}),description:o?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[x(t.formatMessage({id:"valideringsfeil.tilretteleggingPeriodeType.mangler"}))],children:[r.jsx(I,{value:E.SAMMME_PERIODE_FREM_TIL_TERMIN,children:r.jsx(c,{id:"tilrettelegging.tilretteleggingPeriodetype.en"})}),r.jsx(I,{value:E.VARIERTE_PERIODER,children:r.jsx(c,{id:"tilrettelegging.tilretteleggingPeriodetype.variert"})})]}),v===E.SAMMME_PERIODE_FREM_TIL_TERMIN&&r.jsxs("div",{children:[r.jsx(Ie,{name:"enPeriodeMedTilretteleggingStillingsprosent",label:t.formatMessage({id:"tilrettelegging.stillingsprosent.label"}),description:o?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[_e(t,k,i.arbeidsforhold.stillinger)]}),r.jsx(K,{onOpenChange:J("Svangerskapspenger","Ikke_har_100%_stilling"),header:t.formatMessage({id:"tilrettelegging.varierendePerioderStillingsprosent.info.tittel"}),children:r.jsxs(ae,{gap:"2",children:[r.jsx(G,{children:r.jsx(c,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"})}),r.jsx(G,{children:r.jsx(c,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"})})]})})]}),v===E.SAMMME_PERIODE_FREM_TIL_TERMIN&&r.jsx(A,{name:"enPeriodeMedTilretteleggingFom",label:t.formatMessage({id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"}),description:o?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",minDate:b,maxDate:g,validate:[x(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis"})),_(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.delvis"})),me(t,p,s,h,i.arbeidsforhold.navn||"",a,F)],defaultMonth:b?L(b,g):void 0}),v===E.SAMMME_PERIODE_FREM_TIL_TERMIN&&r.jsxs(O,{name:"enPeriodeMedTilretteleggingTomType",label:t.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis"}),validate:[Te(t,h,p,s,i.arbeidsforhold.navn||"",a,F)],children:[r.jsx(I,{value:y.VALGFRI_DATO,children:r.jsx(c,{id:"perioder.varierende.tomType.valgfriDato"})}),r.jsx(I,{value:y.SISTE_DAG_MED_SVP,children:F?r.jsx(c,{id:"perioder.varierende.tomType.treUkerFørTermin"}):r.jsx(c,{id:"perioder.varierende.tomType.dagenFørFødsel"})})]}),v===E.SAMMME_PERIODE_FREM_TIL_TERMIN&&P===y.VALGFRI_DATO&&r.jsx(A,{name:"enPeriodeMedTilretteleggingTilbakeIJobbDato",label:t.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis"}),minDate:D,maxDate:g,validate:[x(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.delvis"})),_(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.delvis"})),fe(t,p,s,k,h,i.arbeidsforhold.navn||"",a,F)],defaultMonth:L(D,g)})]})};pe.__docgenInfo={description:"",methods:[],displayName:"DelvisTilretteleggingPanel",props:{barnet:{required:!0,tsType:{name:"Barn"},description:""},valgtTilrettelegging:{required:!0,tsType:{name:"Tilrettelegging"},description:""}}};const ve=({barnet:e,valgtTilrettelegging:i})=>{const t=z(),s=X(e),l=i.arbeidsforhold.type,o=l===T.VIRKSOMHET||l===T.PRIVAT,a=i.arbeidsforhold.sluttdato,f=i.arbeidsforhold.startdato,d=n.max(n(B(e.termindato)),n(f))||void 0,g=a?n.min(n(s),n(a)).toDate():s,F=W(e),m=oe(),h=m.watch("type"),p=m.watch("behovForTilretteleggingFom"),k=m.watch("enPeriodeMedTilretteleggingFom"),v=m.watch("enPeriodeMedTilretteleggingTomType"),P=p||d,b=k?n(k).add(1,"day"):p;return r.jsxs(r.Fragment,{children:[r.jsx(A,{name:"enPeriodeMedTilretteleggingFom",label:t.formatMessage({id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),description:o?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",minDate:P,maxDate:g,validate:[x(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.ingen"})),_(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.ingen"})),me(t,p,s,h,i.arbeidsforhold.navn||"",a,F)],defaultMonth:P?L(P,g):void 0}),r.jsxs(O,{name:"enPeriodeMedTilretteleggingTomType",label:t.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen"}),validate:[Te(t,h,p,s,i.arbeidsforhold.navn||"",a,F)],children:[r.jsx(I,{value:y.VALGFRI_DATO,children:r.jsx(c,{id:"perioder.varierende.tomType.valgfriDato"})}),r.jsx(I,{value:y.SISTE_DAG_MED_SVP,children:F?r.jsx(c,{id:"perioder.varierende.tomType.treUkerFørTermin"}):r.jsx(c,{id:"perioder.varierende.tomType.dagenFørFødsel"})})]}),v===y.VALGFRI_DATO&&r.jsx(A,{name:"enPeriodeMedTilretteleggingTilbakeIJobbDato",label:t.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.ingen"}),minDate:b,maxDate:g,validate:[x(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.ingen"})),_(t.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.ingen"})),fe(t,p,s,k,h,i.arbeidsforhold.navn||"",a,F)],defaultMonth:L(b,g)})]})};ve.__docgenInfo={description:"",methods:[],displayName:"IngenTilretteleggingPanel",props:{barnet:{required:!0,tsType:{name:"Barn"},description:""},valgtTilrettelegging:{required:!0,tsType:{name:"Tilrettelegging"},description:""}}};const we=(e,i,t,s)=>{const l=i.type===S.DELVIS&&i.delvisTilretteleggingPeriodeType===E.VARIERTE_PERIODER,o=l?s==null?void 0:s.varierendePerioder:[],a={...s,varierendePerioder:o,behovForTilretteleggingFom:i.behovForTilretteleggingFom,arbeidsforhold:{...s.arbeidsforhold},type:i.type,enPeriodeMedTilretteleggingFom:l?void 0:i.enPeriodeMedTilretteleggingFom,enPeriodeMedTilretteleggingStillingsprosent:l?void 0:i.enPeriodeMedTilretteleggingStillingsprosent,enPeriodeMedTilretteleggingTomType:l?void 0:i.enPeriodeMedTilretteleggingTomType,enPeriodeMedTilretteleggingTilbakeIJobbDato:l?void 0:i.enPeriodeMedTilretteleggingTilbakeIJobbDato,delvisTilretteleggingPeriodeType:i.delvisTilretteleggingPeriodeType,risikofaktorer:i.risikofaktorer,tilretteleggingstiltak:i.tilretteleggingstiltak};return t.map(d=>d.id===e?a:d)},Ce=(e,i)=>{if(i===void 0&&e.length>0)return e[0].id;const t=e.findIndex(s=>s.id===i)+1;if(t!==e.length)return e[t].id},qe=(e,i,t)=>{if(e.type===S.DELVIS&&e.delvisTilretteleggingPeriodeType===E.VARIERTE_PERIODER)return{nextRoute:H.PERIODER,nextTilretteleggingId:t};const s=Ce(i,t);return s?{nextRoute:H.SKJEMA,nextTilretteleggingId:s}:{nextRoute:H.OPPSUMMERING}},Ue=(e,i)=>i===T.FRILANSER?e.formatMessage({id:"skjema.risikofaktorer.frilanser"}):e.formatMessage({id:"skjema.risikofaktorer.selvstendig"}),ne=(e,i,t,s,l)=>e&&i!==T.FRILANSER?s?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.flere"},{navnArbeidsgiver:se(l)}):t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.flere"},{navnArbeidsgiver:se(l)}):i===T.FRILANSER?s?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"}):t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.frilanser"}):s?t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.en"}):t.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.en"}),He=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:i,arbeidsforhold:t})=>{const s=z(),l=Pe(t),o=Ee(e,t),a=V(U(R.TILRETTELEGGINGER)),f=V(U(R.OM_BARNET)),d=V(U(R.VALGT_TILRETTELEGGING_ID)),g=ie(R.TILRETTELEGGINGER),F=ie(R.VALGT_TILRETTELEGGING_ID),m=V(a.find(u=>u.id===d)),h=X(f),p=m.arbeidsforhold.type===T.SELVSTENDIG&&m.arbeidsforhold.navn&&m.arbeidsforhold.navn.trim().length===0?s.formatMessage({id:"egenNæring"}).toLowerCase():m.arbeidsforhold.navn,k=a.length>1,v=m.arbeidsforhold.type,P=Ue(s,v),b=s.formatMessage({id:"tilrettelegging.tilretteleggingstiltak.label"}),D=v===T.VIRKSOMHET||v===T.PRIVAT,C=m.arbeidsforhold.sluttdato,$=m.arbeidsforhold.startdato,q=n.max(n(B(f.termindato)),n($))||void 0,Q=C?n.min(n(h),n(C)).toDate():h,ce=W(f),Me=u=>{const Fe=we(d,u,a,m);g(Fe);const{nextRoute:ke,nextTilretteleggingId:ee}=qe(u,a,m.id);return ee&&F(ee),o.goToNextStep(ke)},Y=ye({shouldUnregister:!0,defaultValues:m}),Z=Y.watch("type");return r.jsx(ue,{bannerTitle:s.formatMessage({id:"søknad.pageheading"}),onCancel:i,steps:l,onContinueLater:o.fortsettSøknadSenere,onStepChange:o.goToNextStep,children:r.jsx(xe,{formMethods:Y,onSubmit:Me,children:r.jsxs(ae,{gap:"10",children:[r.jsx(De,{}),k&&r.jsx(je,{arbeid:m.arbeidsforhold}),r.jsx(A,{name:"behovForTilretteleggingFom",label:ne(k,v,s,!0,p),description:D?s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.description"}):"",minDate:q,maxDate:Q,validate:[x(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.mangler"})),_(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.gyldigDato"})),Ve(s,h,f.termindato,m.arbeidsforhold.navn||"",$,C,ce,v===T.FRILANSER)],defaultMonth:q?L(q,Q):void 0}),(v===T.FRILANSER||v===T.SELVSTENDIG)&&r.jsxs(r.Fragment,{children:[r.jsx(re,{name:"risikofaktorer",label:P,validate:[Be(s,v),te(u=>s.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:P,ugyldigeTegn:u}))],description:s.formatMessage({id:"skjema.risikofaktorer.description"})}),r.jsxs("div",{children:[r.jsx(re,{name:"tilretteleggingstiltak",label:b,validate:[Le(s),te(u=>s.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:b,ugyldigeTegn:u}))]}),r.jsx(K,{size:"small",header:s.formatMessage({id:"tilrettelegging.tiltak.info.title"}),onOpenChange:J("Svangerskapspenger","Tiltak"),children:r.jsx(G,{children:r.jsx(c,{id:"tilrettelegging.tiltak.info.description"})})})]})]}),r.jsxs("div",{children:[r.jsxs(O,{name:"type",label:ne(k,v,s,!1,p),description:D?s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[x(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidType.mangler"}))],children:[r.jsx(I,{value:S.DELVIS,children:r.jsx(c,{id:"tilrettelegging.tilrettelagtArbeidType.delvis"})}),r.jsx(I,{value:S.INGEN,children:r.jsx(c,{id:"tilrettelegging.tilrettelagtArbeidType.ingen"})})]}),r.jsx(K,{header:s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.info.tittel"}),onOpenChange:J("Svangerskapspenger","Bytte_på_stillingsprosent"),children:r.jsx(G,{children:r.jsx(c,{id:"tilrettelegging.tilrettelagtArbeidType.info.tekst"})})})]}),Z===S.INGEN&&r.jsx(ve,{barnet:f,valgtTilrettelegging:m}),Z===S.DELVIS&&r.jsx(pe,{barnet:f,valgtTilrettelegging:m}),r.jsxs(N,{size:"small","aria-label":"",children:[r.jsx(N.Header,{children:r.jsx(N.Title,{size:"small",as:"h3",children:r.jsx(c,{id:"tilrettelegging.expansion.tittel"})})}),r.jsx(N.Content,{children:r.jsx(be,{children:r.jsx(c,{id:"tilrettelegging.expansion.tekst",values:{em:u=>r.jsx("em",{children:u})}})})})]}),r.jsx(Re,{goToPreviousStep:o.goToPreviousDefaultStep})]})})})};He.__docgenInfo={description:"",methods:[],displayName:"TilretteleggingStep",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{He as T};
