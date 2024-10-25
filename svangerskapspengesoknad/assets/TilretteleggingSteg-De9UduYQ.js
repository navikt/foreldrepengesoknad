import{j as i}from"./jsx-runtime-Cw0GR0a5.js";import{u as _,C as j,b as Se,c as re,a as H}from"./routes-Cd7jN6RC.js";import{f as Ee,T as F,c as b,A as f,D as x,u as he,a as Ie,h as Pe,i as ye,j as xe,k as be,l as De,m as Re}from"./useSvpNavigator-CUscQPym.js";import{f as t,Q as w,x as je,R as N,u as z,M as p,d as K,V as le,e as B,c as Ae,r as _e}from"./VeiviserPage-DPeYfbGG.js";import{d as ge,a as q,b as y,g as Ne,c as L,u as Le,R as Ve,E as Oe,i as te,S as Ge}from"./ErrorSummaryHookForm-C03QHvL8.js";import{g as X,a as Q,b as V}from"./dateUtils-DnafmBGO.js";import"./index-CTjT7uj6.js";import{i as D,a as O,n as se,f as ne,j as ae}from"./minMax-CbBRSovR.js";import{B as Be}from"./Bedriftsbanner-DLTvnzi8.js";import{g as de}from"./numberUtils-DCxWcr3S.js";import{h as c,T as me,a as fe,b as C}from"./validationUtils-DBpovSOd.js";import{R as J}from"./ReadMore-CJAWNmD8.js";import{E as G}from"./ExpansionCard-B7xf9_hO.js";const qe=(e,r)=>{if(!c(r)||r.trim()==="")return e.formatMessage({id:"valideringsfeil.stillingsprosent.required"});if(de(r)===void 0)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreEtTall"})},we=(e,r,o)=>s=>{const d=qe(e,s);if(d)return d;const a=de(s);if(a<=0)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreStørreEnn0"});const n=Ee(o,r);if(n===0&&a>=100)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEnn100Prosent"},{prosent:n});if(n>0&&a>=n)return e.formatMessage({id:"valideringsfeil.stillingsprosent.måVæreMindreEnnOpprinneligStillingsprosent"},{prosent:n})},Ce=e=>r=>!c(r)||r.trim()===""?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.påkrevd"}):r.length>me?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.forLang"}):r.length<fe?e.formatMessage({id:"valideringsfeil.tilretteleggingstiltak.forKort"}):null,Te=(e,r,o,s,d,a,n)=>g=>{const l=s===F.DELVIS;if(c(g)&&c(r)&&t(g).isBefore(t(r),"d"))return l?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.førBehovForTilretteleggingFom.ingen"});if(c(g)&&t(g).isAfter(t(o),"d"))return n?l?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterTreUkerFørTermin.ingen"}):l?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterFødsel.ingen"});if(a&&c(r)&&t(r).isSameOrBefore(t(a),"d")&&t(g).isAfter(t(a),"d")){const m=C(a,e);return l?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.delvis"},{dato:N(a),navn:d,slutteTekst:m}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.etterSluttDatoArbeid.ingen"},{dato:N(a),navn:d,slutteTekst:m})}},pe=(e,r,o,s,d,a,n,g)=>l=>{const m=d===F.DELVIS;if(c(l)&&c(r)&&t(l).isBefore(t(r),"d"))return e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førBehovForTilretteleggingFom"});if(c(s)&&t(l).isBefore(t(s),"d"))return m?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.førFomDato.ingen"});if(c(s)&&t(l).isSame(t(s),"d"))return m?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.sammeSomFomDato.ingen"});if(c(l)&&t(l).isAfter(t(o),"d"))return g?m?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterTreUkerFørTermin.ingen"}):m?e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.delvis"}):e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterFødsel.ingen"});if(n&&c(r)&&t(r).isSameOrBefore(t(n),"d")&&t(l).isAfter(t(n),"d")){const M=C(n,e);return e.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.etterSluttDatoArbeid"},{dato:N(n),navn:a,slutteTekst:M})}},Ue=(e,r,o,s,d,a,n,g)=>l=>{if(t(l).isBefore(w(o),"d"))return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin"});if(t(l).isAfter(je(r),"d"))return n?e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin"}):e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.måVæreFørFødsel"});if(t(l).isBefore(t(d),"d")){const m=g?e.formatMessage({id:"somFrilanser"}):`i ${s}`;return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.førStartDatoArbeid"},{dato:N(d),navnTekst:m})}if(a&&t(l).isAfter(t(a),"d")){const m=C(a,e);return e.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.etterSluttDatoArbeid"},{dato:N(a),navn:s,slutteTekst:m})}},ve=(e,r,o,s,d,a,n)=>g=>{const l=r===F.DELVIS;if(!c(g))return l?n?e.formatMessage({id:"valideringsfeil.tomType.påkrevd.delvis.tilTermin"}):e.formatMessage({id:"valideringsfeil.tomType.påkrevd.delvis.tilFødsel"}):n?e.formatMessage({id:"valideringsfeil.tomType.påkrevd.ingen.tilTermin"}):e.formatMessage({id:"valideringsfeil.tomType.påkrevd.ingen.tilFødsel"});if(a&&c(o)&&g===b.SISTE_DAG_MED_SVP&&t(o).isSameOrBefore(t(a),"d")&&t(s).isAfter(t(a),"d")){const m=C(a,e);return l?e.formatMessage({id:"valideringsfeil.tomType.etterSluttDatoArbeid.delvis"},{slutteTekst:m,navn:d}):e.formatMessage({id:"valideringsfeil.tomType.etterSluttDatoArbeid.ingen"},{slutteTekst:m,navn:d})}},He=(e,r)=>{if(r===f.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.påkrevd"});if(r===f.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.påkrevd"});if(r===f.VIRKSOMHET)return e.formatMessage({id:"valideringsfeil.risikofaktorer.virksomhet.påkrevd"});throw Error("Ingen påkrevd-tekst for type: "+r)},Ke=(e,r)=>{if(r===f.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.forLang"});if(r===f.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.forLang"});throw Error("Ingen makslengde-tekst for type: "+r)},Je=(e,r)=>{if(r===f.FRILANSER)return e.formatMessage({id:"valideringsfeil.risikofaktorer.frilanser.forKort"});if(r===f.SELVSTENDIG)return e.formatMessage({id:"valideringsfeil.risikofaktorer.selvstendig.forKort"});throw Error("Ingen tekst for type: "+r)},ze=(e,r)=>o=>!c(o)||o.trim()===""?He(e,r):o.length>me?Ke(e,r):o.length<fe?Je(e,r):null,ce=({barnet:e,arbeidsforholdType:r,sluttdatoArbeid:o,startdatoArbeid:s,arbeidsforholdNavn:d,stillinger:a})=>{const n=z(),g=X(e),l=r===f.VIRKSOMHET||r===f.PRIVAT,m=t.max(t(w(e.termindato)),t(s))||void 0,M=o?t.min(t(g),t(o)).toDate():g,T=Q(e),v=ge(),u=v.watch("behovForTilretteleggingFom"),I=v.watch("enPeriodeMedTilretteleggingFom"),k=v.watch("delvisTilretteleggingPeriodeType"),E=v.watch("enPeriodeMedTilretteleggingTomType"),A=u||m,R=I?t(I).add(1,"day"):u;return i.jsxs(i.Fragment,{children:[i.jsxs(q,{name:"delvisTilretteleggingPeriodeType",label:n.formatMessage({id:"tilrettelegging.tilretteleggingPeriodetype.label"}),description:l?n.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[D(n.formatMessage({id:"valideringsfeil.tilretteleggingPeriodeType.mangler"}))],children:[i.jsx(y,{value:x.SAMMME_PERIODE_FREM_TIL_TERMIN,children:i.jsx(p,{id:"tilrettelegging.tilretteleggingPeriodetype.en"})}),i.jsx(y,{value:x.VARIERTE_PERIODER,children:i.jsx(p,{id:"tilrettelegging.tilretteleggingPeriodetype.variert"})})]}),k===x.SAMMME_PERIODE_FREM_TIL_TERMIN&&i.jsxs("div",{children:[i.jsx(Ne,{name:"enPeriodeMedTilretteleggingStillingsprosent",label:n.formatMessage({id:"tilrettelegging.stillingsprosent.label"}),description:l?n.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[we(n,I,a)]}),i.jsx(J,{onOpenChange:K("Svangerskapspenger","Ikke_har_100%_stilling"),header:n.formatMessage({id:"tilrettelegging.varierendePerioderStillingsprosent.info.tittel"}),children:i.jsxs(le,{gap:"2",children:[i.jsx(B,{children:i.jsx(p,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"})}),i.jsx(B,{children:i.jsx(p,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"})})]})})]}),k===x.SAMMME_PERIODE_FREM_TIL_TERMIN&&i.jsx(L,{name:"enPeriodeMedTilretteleggingFom",label:n.formatMessage({id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis"}),description:l?n.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",minDate:A,maxDate:M,validate:[D(n.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis"})),O(n.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.delvis"})),Te(n,u,g,F.DELVIS,d||"",o,T)],defaultMonth:A?V(A,M):void 0}),k===x.SAMMME_PERIODE_FREM_TIL_TERMIN&&i.jsxs(q,{name:"enPeriodeMedTilretteleggingTomType",label:n.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis"}),validate:[ve(n,F.DELVIS,u,g,d||"",o,T)],children:[i.jsx(y,{value:b.VALGFRI_DATO,children:i.jsx(p,{id:"perioder.varierende.tomType.valgfriDato"})}),i.jsx(y,{value:b.SISTE_DAG_MED_SVP,children:T?i.jsx(p,{id:"perioder.varierende.tomType.treUkerFørTermin"}):i.jsx(p,{id:"perioder.varierende.tomType.dagenFørFødsel"})})]}),k===x.SAMMME_PERIODE_FREM_TIL_TERMIN&&E===b.VALGFRI_DATO&&i.jsx(L,{name:"enPeriodeMedTilretteleggingTilbakeIJobbDato",label:n.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis"}),minDate:R,maxDate:M,validate:[D(n.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.delvis"})),O(n.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.delvis"})),pe(n,u,g,I,F.DELVIS,d||"",o,T)],defaultMonth:V(R,M)})]})};ce.__docgenInfo={description:"",methods:[],displayName:"DelvisTilretteleggingPanel",props:{barnet:{required:!0,tsType:{name:"Barn"},description:""},arbeidsforholdType:{required:!0,tsType:{name:"Arbeidsforholdstype"},description:""},sluttdatoArbeid:{required:!1,tsType:{name:"string"},description:""},startdatoArbeid:{required:!0,tsType:{name:"string"},description:""},arbeidsforholdNavn:{required:!1,tsType:{name:"string"},description:""},stillinger:{required:!0,tsType:{name:"Array",elements:[{name:"Stilling"}],raw:"Stilling[]"},description:""}}};const Me=({barnet:e,sluttdatoArbeid:r,startdatoArbeid:o,arbeidsforholdType:s,arbeidsforholdNavn:d})=>{const a=z(),n=X(e),g=s===f.VIRKSOMHET||s===f.PRIVAT,l=t.max(t(w(e.termindato)),t(o))||void 0,m=r?t.min(t(n),t(r)).toDate():n,M=Q(e),T=ge(),v=T.watch("behovForTilretteleggingFom"),u=T.watch("enPeriodeMedTilretteleggingFom"),I=T.watch("enPeriodeMedTilretteleggingTomType"),k=v||l,E=u?t(u).add(1,"day"):v;return i.jsxs(i.Fragment,{children:[i.jsx(L,{name:"enPeriodeMedTilretteleggingFom",label:a.formatMessage({id:"tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen"}),description:g?a.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",minDate:k,maxDate:m,validate:[D(a.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.ingen"})),O(a.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.ingen"})),Te(a,v,n,F.INGEN,d||"",r,M)],defaultMonth:k?V(k,m):void 0}),i.jsxs(q,{name:"enPeriodeMedTilretteleggingTomType",label:a.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTomType.label.ingen"}),validate:[ve(a,F.INGEN,v,n,d||"",r,M)],children:[i.jsx(y,{value:b.VALGFRI_DATO,children:i.jsx(p,{id:"perioder.varierende.tomType.valgfriDato"})}),i.jsx(y,{value:b.SISTE_DAG_MED_SVP,children:M?i.jsx(p,{id:"perioder.varierende.tomType.treUkerFørTermin"}):i.jsx(p,{id:"perioder.varierende.tomType.dagenFørFødsel"})})]}),I===b.VALGFRI_DATO&&i.jsx(L,{name:"enPeriodeMedTilretteleggingTilbakeIJobbDato",label:a.formatMessage({id:"tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.ingen"}),minDate:E,maxDate:m,validate:[D(a.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.påkrevd.ingen"})),O(a.formatMessage({id:"valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.ingen"})),pe(a,v,n,u,F.INGEN,d||"",r,M)],defaultMonth:V(E,m)})]})};Me.__docgenInfo={description:"",methods:[],displayName:"IngenTilretteleggingPanel",props:{barnet:{required:!0,tsType:{name:"Barn"},description:""},arbeidsforholdType:{required:!0,tsType:{name:"Arbeidsforholdstype"},description:""},sluttdatoArbeid:{required:!1,tsType:{name:"string"},description:""},startdatoArbeid:{required:!0,tsType:{name:"string"},description:""},arbeidsforholdNavn:{required:!1,tsType:{name:"string"},description:""}}};const Xe=(e,r,o)=>{if(e.type===F.DELVIS&&e.delvisTilretteleggingPeriodeType===x.VARIERTE_PERIODER)return re(H.PERIODER,r);const s=Re(r,o);return s?re(H.SKJEMA,s):H.OPPSUMMERING},Qe=(e,r)=>r===f.FRILANSER?e.formatMessage({id:"skjema.risikofaktorer.frilanser"}):e.formatMessage({id:"skjema.risikofaktorer.selvstendig"}),oe=(e,r,o,s,d)=>e&&r!==f.FRILANSER?s?o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.flere"},{navnArbeidsgiver:ae(d)}):o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.flere"},{navnArbeidsgiver:ae(d)}):r===f.FRILANSER?s?o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.frilanser"}):o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.frilanser"}):s?o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.label.en"}):o.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.label.en"}),We=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:r,arbeidsforhold:o})=>{const s=z(),d=he(o),a=Ie(e,o),n=Pe(),g=se(n.tilretteleggingId),l=_(j.TILRETTELEGGINGER),m=_(j.EGEN_NÆRING),M=_(j.FRILANS),T=se(_(j.OM_BARNET)),v=_(j.VALGTE_ARBEIDSFORHOLD),u=Se(j.TILRETTELEGGINGER),I=l==null?void 0:l[g],k=X(T),E=ye(s,g,o),A=xe(T.termindato,g,o,m,M),R=!!v&&v.length>1,S=be(g,o),W=Qe(s,S),$=s.formatMessage({id:"tilrettelegging.tilretteleggingstiltak.label"}),Y=S===f.VIRKSOMHET||S===f.PRIVAT,h=De(T.termindato,g,o,m,M),U=t.max(t(w(T.termindato)),t(h.fom))||void 0,Z=h.tom?t.min(t(k),t(h.tom)).toDate():k,Fe=Q(T),ue=P=>{u({...l,[g]:P});const ke=Xe(P,g,v);return a.goToStep(ke)},ee=Le({shouldUnregister:!0,defaultValues:I}),ie=ee.watch("type");return i.jsx(Ae,{bannerTitle:s.formatMessage({id:"søknad.pageheading"}),onCancel:r,steps:d,onContinueLater:a.fortsettSøknadSenere,onStepChange:a.goToStep,children:i.jsx(Ve,{formMethods:ee,onSubmit:ue,children:i.jsxs(le,{gap:"10",children:[i.jsx(Oe,{}),R&&i.jsx(Be,{arbeidsforholdType:S,arbeidsforholdNavn:E}),i.jsx(L,{name:"behovForTilretteleggingFom",label:oe(R,S,s,!0,E),description:Y?s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidFom.description"}):"",minDate:U,maxDate:Z,validate:[D(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.mangler"})),O(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidFom.gyldigDato"})),Ue(s,k,T.termindato,E||"",h.fom,h.tom,Fe,S===f.FRILANSER)],defaultMonth:U?V(U,Z):void 0}),(S===f.FRILANSER||S===f.SELVSTENDIG)&&i.jsxs(i.Fragment,{children:[i.jsx(te,{name:"risikofaktorer",label:W,validate:[ze(s,S),ne(P=>s.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:W,ugyldigeTegn:P}))],description:s.formatMessage({id:"skjema.risikofaktorer.description"})}),i.jsxs("div",{children:[i.jsx(te,{name:"tilretteleggingstiltak",label:$,validate:[Ce(s),ne(P=>s.formatMessage({id:"valideringsfeil.fritekst.kanIkkeInneholdeTegn"},{feltNavn:$,ugyldigeTegn:P}))]}),i.jsx(J,{size:"small",header:s.formatMessage({id:"tilrettelegging.tiltak.info.title"}),onOpenChange:K("Svangerskapspenger","Tiltak"),children:i.jsx(B,{children:i.jsx(p,{id:"tilrettelegging.tiltak.info.description"})})})]})]}),i.jsxs("div",{children:[i.jsxs(q,{name:"type",label:oe(R,S,s,!1,E),description:Y?s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.description"}):"",validate:[D(s.formatMessage({id:"valideringsfeil.tilrettelagtArbeidType.mangler"}))],children:[i.jsx(y,{value:F.DELVIS,children:i.jsx(p,{id:"tilrettelegging.tilrettelagtArbeidType.delvis"})}),i.jsx(y,{value:F.INGEN,children:i.jsx(p,{id:"tilrettelegging.tilrettelagtArbeidType.ingen"})})]}),i.jsx(J,{header:s.formatMessage({id:"tilrettelegging.tilrettelagtArbeidType.info.tittel"}),onOpenChange:K("Svangerskapspenger","Bytte_på_stillingsprosent"),children:i.jsx(B,{children:i.jsx(p,{id:"tilrettelegging.tilrettelagtArbeidType.info.tekst"})})})]}),ie===F.INGEN&&i.jsx(Me,{barnet:T,arbeidsforholdType:S,startdatoArbeid:h.fom,sluttdatoArbeid:h.tom,arbeidsforholdNavn:E}),ie===F.DELVIS&&i.jsx(ce,{barnet:T,arbeidsforholdType:S,startdatoArbeid:h.fom,sluttdatoArbeid:h.tom,stillinger:A,arbeidsforholdNavn:E}),i.jsxs(G,{size:"small","aria-label":"",children:[i.jsx(G.Header,{children:i.jsx(G.Title,{size:"small",as:"h3",children:i.jsx(p,{id:"tilrettelegging.expansion.tittel"})})}),i.jsx(G.Content,{children:i.jsx(_e,{children:i.jsx(p,{id:"tilrettelegging.expansion.tekst",values:{em:P=>i.jsx("em",{children:P})}})})})]}),i.jsx(Ge,{goToPreviousStep:a.goToPreviousDefaultStep})]})})})};We.__docgenInfo={description:"",methods:[],displayName:"TilretteleggingSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{We as T};
