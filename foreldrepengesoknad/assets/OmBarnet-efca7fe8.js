import{j as a}from"./jsx-runtime-1caa8f64.js";import{az as be,d as c,aA as Fe,aB as Ae,C as u,i as o,W as A,aC as de,aD as ye,aE as De,aF as me,u as D,Y as l,c as m,aG as C,I as g,g as ue,H as Q,D as pe,b as h,a6 as $,aH as Te,aI as Ne,aJ as Oe,G as ae,aK as Ie,L as Ve,Q as v,S as Re,aL as re}from"./dates-83aa686a.js";import{b as _e,h as ne,w as Ue,s as ce,v as L,t as Me,u as Pe,B as S,o as Ge}from"./barnUtils-d0e8071c.js";import"./index-753920cd.js";import{r as oe}from"./index-1cdf6ce0.js";import{i as M}from"./isFarEllerMedmor-120238ea.js";import{Q as Le,c as qe,a as z}from"./index-e3f40a0d.js";import{S as b}from"./skjemanummer-4d711b8d.js";import{F as H,A as _}from"./FormikFileUploader-06b70795.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{A as se}from"./AttachmentMetadata-003d83db.js";import{A as Ye,S as We}from"./IntlProvider-39316729.js";import{n as we}from"./dateFormValidation-41a63f4e.js";import{u as Ke,a as Ce}from"./useFpNavigator-58f46fe6.js";import{u as G,C as R,a as le}from"./FpDataContext-9c963fd7.js";import{b as Qe,c as $e}from"./velkommenUtils-4c8f085d.js";import{i as ze,a as He}from"./dateUtils-1599ae8c.js";import{B as J,L as Je}from"./Link-d47e444a.js";import{l as Xe}from"./links-4d39192e.js";import{R as ie}from"./RegistrertePersonalia-8ba97feb.js";var n=(e=>(e.erBarnetFødt="erBarnetFødt",e.adopsjonAvEktefellesBarn="adopsjonAvEktefellesBarn",e.antallBarn="antallBarn",e.antallBarnSelect="antallBarnSelect",e.adopsjonsdato="adopsjonsdato",e.søkerAdopsjonAlene="søkerAdopsjonAlene",e.adoptertIUtlandet="adoptertIUtlandet",e.fødselsdatoer="fødselsdatoer",e.termindato="termindato",e.omsorgsovertakelse="omsorgsovertakelse",e.terminbekreftelse="terminbekreftelse",e.terminbekreftelsedato="terminbekreftelsedato",e.ankomstdato="ankomstdato",e))(n||{});const f=be();c.extend(Fe);c.extend(Ae);const Ze=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(de(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(c(t).isBefore(c(new Date).subtract(3,"years").subtract(4,"months"),"day"))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake")},Be=e=>(t,r)=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(de(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(ze(r,t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato");if(!ye(t,r))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake")},et=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!De(t))return o(e,"valideringsfeil.omBarnet.termindato.forTidlig");if(!me(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåVæreIUke22")},fe=(e,t)=>r=>{if(!u(r))return o(t,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!A(r))return o(t,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!c(r).subtract(6,"months").isSameOrBefore(c(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtFremITid");if(!c(r).add(1,"months").isSameOrAfter(c(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid")},je=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat")},tt=e=>(t,r)=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat");if(r!==void 0&&!c(r).isSameOrBefore(t,"day"))return o(e,"valideringsfeil.omBarnet.ankomstDato.førFødselsdato")},at=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi");if(!A(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat");if(c().isBefore(c(t)))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid")},q=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i})=>{const s=D();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==l.NO?null:a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",children:a.jsx(f.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.annetBarn"),name:n.adopsjonsdato,validate:je(s),placeholder:"dd.mm.åååå"})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(f.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(m,{padBottom:"xl",visible:t.antallBarn!==void 0&&i&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(f.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(C,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((d,p)=>a.jsx(m,{padBottom:"xl",children:a.jsx(f.DatePicker,{name:`${n.fødselsdatoer}.${p}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${p+1}`),minDate:c(t.adopsjonsdato).subtract(15,"years").toDate(),maxDate:g(t.adopsjonsdato),validate:B=>Be(s)(B,t.adopsjonsdato),placeholder:"dd.mm.åååå",showYearSelector:!0})},ue()))})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.adoptertIUtlandet),children:a.jsx(f.YesOrNoQuestion,{name:n.adoptertIUtlandet,legend:o(s,"omBarnet.adopteresFraUtlandet")})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.ankomstdato),children:a.jsx(f.DatePicker,{name:n.ankomstdato,label:o(s,"omBarnet.ankomstDato"),minDate:c(t.fødselsdatoer[0]).toDate(),maxDate:c().add(6,"months").toDate(),validate:d=>tt(s)(d,t.fødselsdatoer[0]),placeholder:"dd.mm.åååå"})}),a.jsxs(m,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:[a.jsxs(m,{padBottom:"xl",children:[a.jsx(Q,{level:"3",size:"xsmall",children:o(s,"omBarnet.tittel.omsorgsovertakelse")}),a.jsxs(J,{children:[" ",o(s,"omBarnet.veileder.omsorgsovertakelse")]})]}),a.jsx(H,{legend:"",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:_.OMSORGSOVERTAKELSE,skjemanummer:b.OMSORGSOVERTAKELSE})]})]})};try{q.displayName="AdopsjonAnnetBarn",q.__docgenInfo={description:"",displayName:"AdopsjonAnnetBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const Y=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i})=>{const s=D();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==l.YES?null:a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",children:a.jsx(f.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.stebarn"),name:n.adopsjonsdato,validate:je(s),placeholder:"dd.mm.åååå"})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(f.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(m,{padBottom:"xl",visible:t.antallBarn!==void 0&&i&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(f.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(C,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((d,p)=>a.jsxs(m,{padBottom:"xl",children:[a.jsx(f.DatePicker,{name:`${n.fødselsdatoer}.${p}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${p+1}`),minDate:c().subtract(6,"month").toDate(),maxDate:g(t.adopsjonsdato),validate:B=>Be(s)(B,t.adopsjonsdato),placeholder:"dd.mm.åååå"})," "]},ue()))})}),a.jsxs(m,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:[a.jsxs(m,{padBottom:"xl",children:[a.jsx(Q,{level:"3",size:"xsmall",children:o(s,"omBarnet.tittel.omsorgsovertakelse")}),a.jsxs(J,{children:[" ",o(s,"omBarnet.veileder.omsorgsovertakelse")]})]})," ",a.jsx(H,{legend:"",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:_.OMSORGSOVERTAKELSE,skjemanummer:b.OMSORGSOVERTAKELSE})]})]})};try{Y.displayName="AdopsjonEktefellesBarn",Y.__docgenInfo={description:"",displayName:"AdopsjonEktefellesBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const rt=({visibility:e,erFarEllerMedmor:t})=>{const r=D();return a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",visible:e.isVisible(n.adopsjonAvEktefellesBarn),children:a.jsx(f.YesOrNoQuestion,{name:n.adopsjonAvEktefellesBarn,legend:o(r,"omBarnet.adopsjonGjelder")})}),a.jsxs(m,{padBottom:"xl",visible:e.isVisible(n.erBarnetFødt),children:[a.jsx(f.YesOrNoQuestion,{name:n.erBarnetFødt,legend:o(r,"omBarnet.erBarnetFødt")}),!t&&a.jsxs(pe,{header:o(r,"omBarnet.erBarnetFødt.readMore.header"),children:[a.jsx(m,{padBottom:"m",children:a.jsx(h,{id:"omBarnet.erBarnetFødt.readMore.innhold.del1"})}),a.jsx(h,{id:"omBarnet.erBarnetFødt.readMore.innhold.del2"})]})]})]})};try{BarnFdtEllerAdoptert.displayName="BarnFdtEllerAdoptert",BarnFdtEllerAdoptert.__docgenInfo={description:"",displayName:"BarnFdtEllerAdoptert",props:{visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}}}}}catch{}const nt=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i,barnSøktOmFørMenIkkeRegistrert:s})=>{const{erBarnetFødt:d,antallBarn:p,fødselsdatoer:B}=t,k=D(),E=p!==void 0&&parseInt(p,10)>1?"omBarnet.fødselsdato.flereBarn":"omBarnet.fødselsdato";return e.situasjon==="adopsjon"||d!==l.YES||!i&&!s?null:a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(f.RadioGroup,{name:n.antallBarn,radios:[{label:o(k,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(k,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(k,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(k,"omBarnet.antallBarn.født")})}),a.jsx(m,{padBottom:"xl",visible:p!==void 0&&i&&parseInt(p,10)>=3,children:a.jsxs(f.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(m,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(C,{name:n.fødselsdatoer,render:()=>[a.jsx(f.DatePicker,{name:`${n.fødselsdatoer}.0`,label:o(k,E),minDate:c().subtract(3,"years").toDate(),maxDate:c().toDate(),validate:Ze(k),placeholder:"dd.mm.åååå"},`${n.fødselsdatoer}.0`)]})}),a.jsx(m,{padBottom:"l",visible:r.isVisible(n.termindato),children:a.jsx(f.DatePicker,{name:n.termindato,label:o(k,"omBarnet.termindato.født"),minDate:c(B[0]).subtract(1,"months").toDate(),maxDate:c(B[0]).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:fe(B[0],k)})})]})};try{Fdsel.displayName="Fdsel",Fdsel.__docgenInfo={description:"",displayName:"Fdsel",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},barnSøktOmFørMenIkkeRegistrert:{defaultValue:null,description:"",name:"barnSøktOmFørMenIkkeRegistrert",required:!0,type:{name:"boolean"}}}}}catch{}const ot=e=>{const t=c(e).add(12,"weeks");return c(t).isAfter(new Date,"day")},st=(e,t,r,i)=>{if(i==="adopsjon")return!1;let s;if(r!==void 0&&r.length>0&&(s=He(r).fødselsdato),!t&&!s)return!1;const d=s||t;return M(e)?$(d)?!0:ot(d):!0},lt=(e,t,r,i)=>e===l.NO&&t.length===0&&X(r,i),y=(e,t)=>e===l.NO&&t!==""&&!Te(g(t)),it=(e,t)=>e===l.NO&&y(e,t),X=(e,t)=>M(e)?u(t)?$(new Date(t)):!1:!0,dt=(e,t)=>e==="fødsel"?t:!1,mt=(e,t,r,i,s,d)=>s?y(t,e)&&r!==l.UNANSWERED||!y(t,e)&&d!==void 0&&u(d[0])||t===l.YES&&d!==void 0&&u(d[0]):t===l.YES&&u(e)||t===l.NO&&u(e)&&!y(t,e)||t===l.NO&&y(t,e)&&r===l.NO||t===l.NO&&y(t,e)&&r===l.YES&&u(i),ut={[n.adopsjonAvEktefellesBarn]:{isIncluded:({situasjon:e})=>e==="adopsjon",isAnswered:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,visibilityFilter:({situasjon:e})=>e==="adopsjon"},[n.erBarnetFødt]:{isIncluded:({situasjon:e,søknadGjelderEtNyttBarn:t})=>t&&e==="fødsel",isAnswered:({erBarnetFødt:e})=>e!==l.UNANSWERED,visibilityFilter:({situasjon:e,søknadGjelderEtNyttBarn:t})=>dt(e,t)},[n.antallBarn]:{isIncluded:({søknadGjelderEtNyttBarn:e})=>e,isAnswered:({antallBarn:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r})=>t!==l.UNANSWERED||e!==l.UNANSWERED&&u(r)},[n.antallBarnSelect]:{isIncluded:({antallBarn:e,søknadGjelderEtNyttBarn:t})=>parseInt(e,10)>=3&&t,isAnswered:({antallBarnSelect:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r,antallBarn:i})=>parseInt(i,10)>=3&&(t!==l.UNANSWERED||e!==l.UNANSWERED&&u(r))},[n.adopsjonsdato]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,isAnswered:({adopsjonsdato:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED},[n.fødselsdatoer]:{isIncluded:({erBarnetFødt:e,adopsjonAvEktefellesBarn:t,søknadGjelderEtNyttBarn:r})=>r&&(e===l.YES||t!==l.UNANSWERED),isAnswered:({fødselsdatoer:e})=>e.length>0&&u(e[0]),visibilityFilter:({antallBarn:e})=>u(e)},[n.omsorgsovertakelse]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,isAnswered:()=>!0,visibilityFilter:({adopsjonsdato:e,adopsjonAvEktefellesBarn:t,ankomstdato:r,adoptertIUtlandet:i,søknadGjelderEtNyttBarn:s,fødselsdatoer:d})=>mt(e,t,i,r,s,d)},[n.termindato]:{isIncluded:({rolle:e,fødselsdatoer:t,erBarnetFødt:r,situasjon:i,valgteRegistrerteBarn:s})=>st(e,t[0],s,i)||r===l.NO,isAnswered:({termindato:e})=>u(e),visibilityFilter:({fødselsdatoer:e,erBarnetFødt:t,antallBarn:r,valgteRegistrerteBarn:i})=>u(e[0])||t===l.NO&&u(r)||i!==void 0&&i.length>0},[n.terminbekreftelse]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:i})=>lt(e,t,r,i),isAnswered:({terminbekreftelse:e})=>u(e),visibilityFilter:({termindato:e})=>u(e)},[n.terminbekreftelsedato]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:i})=>e===l.NO&&t.length===0&&X(r,i),isAnswered:({terminbekreftelsedato:e})=>u(e),visibilityFilter:({termindato:e})=>u(e)},[n.adoptertIUtlandet]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>y(e,t),isAnswered:({adoptertIUtlandet:e})=>e!==l.UNANSWERED,visibilityFilter:({fødselsdatoer:e,søknadGjelderEtNyttBarn:t})=>t&&u(e[0])||!t},[n.ankomstdato]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>it(e,t),isAnswered:({ankomstdato:e})=>u(e),visibilityFilter:({adoptertIUtlandet:e})=>e===l.YES}},pt=Le(ut),W=({søkersituasjon:e,visibility:t,formValues:r,søknadGjelderEtNyttBarn:i,setErForTidligTilÅSøkePåTermin:s})=>{const d=D();if(e.situasjon==="adopsjon"||r.erBarnetFødt!==l.NO||!i)return null;const p=u(r.termindato)&&A(r.termindato)?!me(r.termindato):!1;s(p);const B=M(e.rolle),k=B&&u(r.termindato),E=B?"omBarnet.antallBarn.termin.far":"omBarnet.antallBarn.termin",x=B?"omBarnet.veileder.terminbekreftelse.far":"omBarnet.veileder.terminbekreftelse";return a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",visible:t.isVisible(n.antallBarn),children:a.jsx(f.RadioGroup,{name:n.antallBarn,radios:[{label:o(d,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(d,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(d,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(d,E)})}),a.jsx(m,{padBottom:"xl",visible:r.antallBarn!==void 0&&parseInt(r.antallBarn,10)>=3,children:a.jsxs(f.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(m,{padBottom:"s",visible:t.isVisible(n.termindato),children:a.jsx(f.DatePicker,{name:n.termindato,label:o(d,"omBarnet.termindato.termin"),placeholder:"dd.mm.åååå",minDate:Ne,maxDate:Oe,validate:et(d)})}),a.jsx(m,{padBottom:"xl",visible:t.isVisible(n.termindato)&&!B,children:a.jsxs(pe,{header:o(d,"omBarnet.termindato.åpneLabel"),children:[a.jsx(m,{padBottom:"m",children:a.jsx(h,{id:"omBarnet.termindato.innhold.del1"})}),a.jsx(h,{id:"omBarnet.termindato.innhold.del2"})]})}),k&&!X(e.rolle,r.termindato)&&a.jsx(m,{padBottom:"xl",children:a.jsx(ae,{children:a.jsx(h,{id:"omBarnet.veileder.medMorEllerFarTermin",values:{lenke:a.jsx(Je,{href:Xe.papirsøknad,children:a.jsx(h,{id:"omBarnet.papirsøknad.lenke"})})}})})}),a.jsx(m,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(ae,{children:a.jsx(h,{id:x})})}),a.jsx(m,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(H,{legend:"Dokumentasjon om terminbekreftelse",label:o(d,"omBarnet.terminbekreftelse.lastOpp"),name:n.terminbekreftelse,attachments:r.terminbekreftelse||[],attachmentType:_.TERMINBEKREFTELSE,skjemanummer:b.TERMINBEKREFTELSE})}),a.jsx(m,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelsedato),children:a.jsx(f.DatePicker,{name:n.terminbekreftelsedato,label:o(d,"omBarnet.terminbekreftelseDato"),placeholder:"dd.mm.åååå",validate:at(d),maxDate:Ie})}),p&&a.jsx(m,{padBottom:"xl",children:a.jsxs(Ye,{variant:"warning",children:[a.jsx(m,{padBottom:"m",children:a.jsx(Q,{level:"3",size:"small",children:a.jsx(h,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading"})})}),a.jsx(J,{children:a.jsx(h,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold"})})]})})]})};try{W.displayName="Termin",W.__docgenInfo={description:"",displayName:"Termin",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},setErForTidligTilÅSøkePåTermin:{defaultValue:null,description:"",name:"setErForTidligTilÅSøkePåTermin",required:!0,type:{name:"(val: boolean) => void"}}}}}catch{}const w=({valgteBarn:e,visibility:t})=>{const r=D(),i=e.length,s=e.every(B=>_e(B));e.sort(Qe);const d=e.map(B=>B.fødselsdato),p=e[0].fødselsdato;return a.jsxs(a.Fragment,{children:[a.jsx(m,{padBottom:"xl",children:a.jsxs("div",{children:[a.jsx(m,{padBottom:"s",children:a.jsx(Ve,{children:a.jsx(h,{id:"omBarnet.valgteBarn.tittel",values:{antallBarn:i}})})}),s?e.map(B=>a.jsx(m,{padBottom:"s",children:a.jsx(ie,{person:B,fødselsdatoForVisning:ne([B.fødselsdato]),visEtternavn:!1})},B.fnr)):a.jsx(m,{padBottom:"s",children:a.jsx(ie,{person:e[0],fødselsdatoForVisning:ne(d),altTekstHvisUkjentNavn:Ue(void 0,d,e.length,r),visEtternavn:!1})})]})}),a.jsx(m,{padBottom:"l",visible:t.isVisible(n.termindato)&&e.length>0,children:a.jsx(f.DatePicker,{name:n.termindato,label:o(r,"omBarnet.termindato.født"),dayPickerProps:{defaultMonth:c.utc(p).toDate()},minDate:c.utc(p).subtract(1,"months").toDate(),maxDate:c.utc(p).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:fe(p,r)})})]})};try{w.displayName="ValgteRegistrerteBarn",w.__docgenInfo={description:"",displayName:"ValgteRegistrerteBarn",props:{valgteBarn:{defaultValue:null,description:"",name:"valgteBarn",required:!0,type:{name:"SøkerBarn[]"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}}}}}catch{}const ct=()=>({[n.erBarnetFødt]:l.UNANSWERED,[n.adopsjonAvEktefellesBarn]:l.UNANSWERED,[n.antallBarn]:"",[n.antallBarnSelect]:"",[n.adopsjonsdato]:"",[n.fødselsdatoer]:[],[n.omsorgsovertakelse]:[],[n.termindato]:"",[n.terminbekreftelse]:[],[n.terminbekreftelsedato]:"",[n.adoptertIUtlandet]:l.UNANSWERED,[n.ankomstdato]:""}),Bt=(e,t)=>({erBarnetFødt:t.isVisible(n.erBarnetFødt)?e.erBarnetFødt:l.UNANSWERED,adopsjonAvEktefellesBarn:t.isVisible(n.adopsjonAvEktefellesBarn)?e.adopsjonAvEktefellesBarn:l.UNANSWERED,antallBarn:t.isVisible(n.antallBarn)?e.antallBarn:"",antallBarnSelect:t.isVisible(n.antallBarnSelect)?e.antallBarnSelect:"",adopsjonsdato:t.isVisible(n.adopsjonsdato)?e.adopsjonsdato:"",fødselsdatoer:t.isVisible(n.fødselsdatoer)?e.fødselsdatoer:[],omsorgsovertakelse:t.isVisible(n.omsorgsovertakelse)?e.omsorgsovertakelse:[],termindato:t.isVisible(n.termindato)?e.termindato:"",terminbekreftelse:t.isVisible(n.terminbekreftelse)?e.terminbekreftelse:[],terminbekreftelsedato:t.isVisible(n.terminbekreftelsedato)?e.terminbekreftelsedato:"",adoptertIUtlandet:t.isVisible(n.adoptertIUtlandet)?e.adoptertIUtlandet:l.UNANSWERED,ankomstdato:t.isVisible(n.ankomstdato)?e.ankomstdato:""}),ft=(e,t,r,i)=>e!==void 0&&t==="fødsel"?{...e,type:i?S.UFØDT:S.FØDT,termindato:u(r.termindato)?g(r.termindato):void 0,fødselsdatoer:e.fødselsdatoer,antallBarn:e.antallBarn}:r.adopsjonAvEktefellesBarn===l.YES?{...e,type:S.ADOPTERT_STEBARN,adopsjonsdato:g(r.adopsjonsdato)}:{...e,type:S.ADOPTERT_ANNET_BARN,adopsjonsdato:g(r.adopsjonsdato),adoptertIUtlandet:z(r.adoptertIUtlandet),ankomstdato:r.adoptertIUtlandet===l.YES?g(r.ankomstdato):void 0},jt=(e,t,r,i,s)=>{if(r!==void 0)return ft(r,i,e,s);const d=parseInt(e.antallBarn,10)<3?parseInt(e.antallBarn,10):parseInt(e.antallBarnSelect,10);return e.erBarnetFødt===l.YES?{type:S.FØDT,fødselsdatoer:e.fødselsdatoer.map(p=>g(p)),antallBarn:d,termindato:u(e.termindato)?g(e.termindato):void 0}:e.erBarnetFødt===l.NO?t.length===0?{type:S.UFØDT,terminbekreftelsedato:g(e.terminbekreftelsedato),antallBarn:d,termindato:g(e.termindato)}:{type:S.UFØDT,antallBarn:d,termindato:g(e.termindato)}:e.adopsjonAvEktefellesBarn===l.YES?{type:S.ADOPTERT_STEBARN,adopsjonsdato:g(e.adopsjonsdato),antallBarn:d,fødselsdatoer:e.fødselsdatoer.map(p=>g(p))}:{type:S.ADOPTERT_ANNET_BARN,fødselsdatoer:e.fødselsdatoer.map(p=>g(p)),adopsjonsdato:g(e.adopsjonsdato),antallBarn:d,adoptertIUtlandet:z(e.adoptertIUtlandet),ankomstdato:e.adoptertIUtlandet===l.YES?g(e.ankomstdato):void 0}},gt=(e,t,r)=>{const i=ct();if(!r)return i;const s=r.antallBarn>2;return ce(r)?{...i,erBarnetFødt:l.YES,fødselsdatoer:r.fødselsdatoer.map(d=>v(d)),termindato:v(r.termindato),antallBarn:s?"3":r.antallBarn.toString(),antallBarnSelect:s?r.antallBarn.toString():""}:L(r)?e.length===0?{...i,erBarnetFødt:l.NO,terminbekreftelse:t[b.TERMINBEKREFTELSE]||[],terminbekreftelsedato:v(r.terminbekreftelsedato),termindato:v(r.termindato),antallBarn:s?"3":r.antallBarn.toString(),antallBarnSelect:s?r.antallBarn.toString():""}:{...i,erBarnetFødt:l.NO,termindato:v(r.termindato),antallBarn:s?"3":r.antallBarn.toString(),antallBarnSelect:s?r.antallBarn.toString():""}:Me(r)?{...i,adopsjonAvEktefellesBarn:l.NO,fødselsdatoer:r.fødselsdatoer.map(d=>v(d)),adopsjonsdato:v(r.adopsjonsdato),antallBarn:s?"3":r.antallBarn.toString(),antallBarnSelect:s?r.antallBarn.toString():"",adoptertIUtlandet:qe(r.adoptertIUtlandet),omsorgsovertakelse:t[b.OMSORGSOVERTAKELSE]||[],ankomstdato:v(r.ankomstdato)}:Pe(r)?{...i,adopsjonAvEktefellesBarn:l.YES,adopsjonsdato:v(r.adopsjonsdato),antallBarn:s?"3":r.antallBarn.toString(),antallBarnSelect:s?r.antallBarn.toString():"",fødselsdatoer:r.fødselsdatoer.map(d=>v(d)),omsorgsovertakelse:t[b.OMSORGSOVERTAKELSE]||[]}:i},K=({søkerInfo:e,søknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:r,avbrytSøknad:i})=>{const s=D(),d=Ke(),p=Ce(r),[B,k]=oe.useState(!1),E=we(G(R.SØKERSITUASJON)),x=G(R.OM_BARNET),P=G(R.VEDLEGG)||{},Z=le(R.VEDLEGG)||{},ge=le(R.OM_BARNET),{arbeidsforhold:U,søker:ee}=e,[xe,ke]=oe.useState(!1),te=M(E.rolle),Ee=j=>x&&!L(x)&&x.fnr!==void 0&&x.fnr.length>0?x.fnr.includes(j.fnr):!1,Se=x?g(Ge(x)):void 0,ve=x&&ce(x)?ee.barn.filter(j=>j.fnr===void 0&&$e(j.fødselsdato,Se)):[],T=!t&&x&&!L(x)?ee.barn.filter(j=>Ee(j)).concat(ve):void 0,N=!t&&(T===void 0||T.length===0),he=j=>{k(!0);const O=jt(j,U,!t&&!N?x:void 0,E.situasjon,N);if(j.adopsjonAvEktefellesBarn===l.YES&&O.type===S.ADOPTERT_STEBARN||O.type===S.ADOPTERT_ANNET_BARN){const I=re(j.omsorgsovertakelse,_.OMSORGSOVERTAKELSE,b.OMSORGSOVERTAKELSE,{type:se.BARN}),V={...P,[b.OMSORGSOVERTAKELSE]:I};Z(V)}if(j.erBarnetFødt===l.NO&&U.length===0){const I=re(j.terminbekreftelse,_.TERMINBEKREFTELSE,b.TERMINBEKREFTELSE,{type:se.BARN}),V={...P,[b.TERMINBEKREFTELSE]:I};Z(V)}return ge(O),p.goToNextDefaultStep()};return a.jsx(f.FormikWrapper,{initialValues:gt(U,P,x),onSubmit:he,renderForm:({values:j})=>{const F=pt.getVisbility({...j,arbeidsforhold:U,situasjon:E.situasjon,rolle:E.rolle,valgteRegistrerteBarn:T,søknadGjelderEtNyttBarn:N||t}),O=te&&z(j.erBarnetFødt)===!1&&u(j.termindato)&&!$(g(j.termindato)),I=F.areAllQuestionsAnswered()&&!O;return a.jsx(Re,{bannerTitle:o(s,"søknad.pageheading"),onCancel:i,onContinueLater:p.fortsettSøknadSenere,steps:d,children:a.jsxs(f.Form,{includeButtons:!1,includeValidationSummary:!0,cleanup:V=>Bt(V,F),children:[T!==void 0&&T.length>0&&a.jsx(w,{valgteBarn:T,visibility:F}),a.jsx(rt,{visibility:F,erFarEllerMedmor:te}),a.jsx(q,{søkersituasjon:E,formValues:j,visibility:F,søknadGjelderEtNyttBarn:t}),a.jsx(Y,{søkersituasjon:E,formValues:j,visibility:F,søknadGjelderEtNyttBarn:t}),a.jsx(W,{søkersituasjon:E,formValues:j,visibility:F,søknadGjelderEtNyttBarn:N||t,setErForTidligTilÅSøkePåTermin:ke}),a.jsx(nt,{søkersituasjon:E,formValues:j,visibility:F,søknadGjelderEtNyttBarn:t,barnSøktOmFørMenIkkeRegistrert:N}),a.jsx(m,{margin:"l",children:a.jsx(We,{isNexButtonVisible:I,goToPreviousStep:p.goToPreviousDefaultStep,isDisabled:B||xe,isLoading:B})})]})})}})},Gt=K;try{K.displayName="OmBarnet",K.__docgenInfo={description:"",displayName:"OmBarnet",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},søknadGjelderNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderNyttBarn",required:!0,type:{name:"boolean"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{Gt as O};
