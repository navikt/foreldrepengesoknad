import{j as a}from"./jsx-runtime-d079401a.js";import{af as Se,d as f,aG as Ee,aF as he,x as u,i as o,K as b,aI as ne,aJ as be,aK as Fe,aL as oe,u as A,Y as l,c as d,aM as Y,I as j,g as se,H as w,aa as le,b as S,C as K,A as Ae,aN as ye,aO as De,G as X,aP as Te,z as v,aQ as U,k as Ne,S as Oe,aR as Ie,B as Re}from"./Tidsperioden-c7c469a7.js";import{q as ie,r as M,t as Ve,u as _e,B as h,p as Ue,k as Z,v as Me,e as Pe}from"./barnUtils-0a7beb48.js";import"./index-d741deb4.js";import{r as ee}from"./index-f1f2c4b1.js";import{i as I}from"./isFarEllerMedmor-120238ea.js";import{c as qe,a as C,B as Ge}from"./BackButton-bce098ee.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{S as Le}from"./routes-9effe5a6.js";import{s as We,g as Ye,u as we}from"./stepsConfig-ab908a62.js";import{F as Q,A as D,S as T}from"./FormikFileUploader-2d256b86.js";import{i as Ke,a as Ce}from"./dateUtils-de29fba0.js";import{B as $,L as Qe}from"./Link-13f307fd.js";import{l as $e}from"./links-4d39192e.js";import{Q as ze}from"./index-47edccfa.js";import{A as He}from"./Alert-d624eb67.js";import{R as te}from"./RegistrertePersonalia-876bfeb5.js";import{f as Je,e as Xe}from"./velkommenUtils-858326ea.js";import{u as ae,C as O,a as re}from"./FpDataContext-fc20d236.js";import{n as Ze}from"./validation-631bcf6e.js";import"./dateFormValidation-c51310cf.js";var n=(e=>(e.erBarnetFødt="erBarnetFødt",e.adopsjonAvEktefellesBarn="adopsjonAvEktefellesBarn",e.antallBarn="antallBarn",e.antallBarnSelect="antallBarnSelect",e.adopsjonsdato="adopsjonsdato",e.søkerAdopsjonAlene="søkerAdopsjonAlene",e.adoptertIUtlandet="adoptertIUtlandet",e.fødselsdatoer="fødselsdatoer",e.termindato="termindato",e.omsorgsovertakelse="omsorgsovertakelse",e.terminbekreftelse="terminbekreftelse",e.terminbekreftelsedato="terminbekreftelsedato",e.ankomstdato="ankomstdato",e))(n||{});const B=Se();f.extend(Ee);f.extend(he);const et=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(ne(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(f(t).isBefore(f(new Date).subtract(3,"years").subtract(4,"months"),"day"))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake")},de=e=>(t,r)=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(ne(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(Ke(r,t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato");if(!be(t,r))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake")},tt=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!Fe(t))return o(e,"valideringsfeil.omBarnet.termindato.forTidlig");if(!oe(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåVæreIUke22")},me=(e,t)=>r=>{if(!u(r))return o(t,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!b(r))return o(t,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!f(r).subtract(6,"months").isSameOrBefore(f(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtFremITid");if(!f(r).add(1,"months").isSameOrAfter(f(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid")},ue=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat")},at=e=>(t,r)=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat");if(r!==void 0&&!f(r).isSameOrBefore(t,"day"))return o(e,"valideringsfeil.omBarnet.ankomstDato.førFødselsdato")},rt=e=>t=>{if(!u(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat");if(f().isBefore(f(t)))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid")},P=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i})=>{const s=A();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==l.NO?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.annetBarn"),name:n.adopsjonsdato,validate:ue(s),placeholder:"dd.mm.åååå"})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(d,{padBottom:"xl",visible:t.antallBarn!==void 0&&i&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(Y,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((m,c)=>a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.${c}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${c+1}`),minDate:f(t.adopsjonsdato).subtract(15,"years").toDate(),maxDate:j(t.adopsjonsdato),validate:p=>de(s)(p,t.adopsjonsdato),placeholder:"dd.mm.åååå",showYearSelector:!0})},se()))})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.adoptertIUtlandet),children:a.jsx(B.YesOrNoQuestion,{name:n.adoptertIUtlandet,legend:o(s,"omBarnet.adopteresFraUtlandet")})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.ankomstdato),children:a.jsx(B.DatePicker,{name:n.ankomstdato,label:o(s,"omBarnet.ankomstDato"),minDate:f(t.fødselsdatoer[0]).toDate(),maxDate:f().add(6,"months").toDate(),validate:m=>at(s)(m,t.fødselsdatoer[0]),placeholder:"dd.mm.åååå"})}),a.jsxs(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:[a.jsxs(d,{padBottom:"xl",children:[a.jsx(w,{level:"3",size:"xsmall",children:o(s,"omBarnet.tittel.omsorgsovertakelse")}),a.jsxs($,{children:[" ",o(s,"omBarnet.veileder.omsorgsovertakelse")]})]}),a.jsx(Q,{legend:"",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:D.OMSORGSOVERTAKELSE,skjemanummer:T.OMSORGSOVERTAKELSESDATO})]})]})};try{P.displayName="AdopsjonAnnetBarn",P.__docgenInfo={description:"",displayName:"AdopsjonAnnetBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const q=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i})=>{const s=A();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==l.YES?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.stebarn"),name:n.adopsjonsdato,validate:ue(s),placeholder:"dd.mm.åååå"})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(d,{padBottom:"xl",visible:t.antallBarn!==void 0&&i&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(Y,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((m,c)=>a.jsxs(d,{padBottom:"xl",children:[a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.${c}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${c+1}`),minDate:f().subtract(6,"month").toDate(),maxDate:j(t.adopsjonsdato),validate:p=>de(s)(p,t.adopsjonsdato),placeholder:"dd.mm.åååå"})," "]},se()))})}),a.jsxs(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:[a.jsxs(d,{padBottom:"xl",children:[a.jsx(w,{level:"3",size:"xsmall",children:o(s,"omBarnet.tittel.omsorgsovertakelse")}),a.jsxs($,{children:[" ",o(s,"omBarnet.veileder.omsorgsovertakelse")]})]})," ",a.jsx(Q,{legend:"",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:D.OMSORGSOVERTAKELSE,skjemanummer:T.OMSORGSOVERTAKELSESDATO})]})]})};try{q.displayName="AdopsjonEktefellesBarn",q.__docgenInfo={description:"",displayName:"AdopsjonEktefellesBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const nt=({visibility:e,erFarEllerMedmor:t})=>{const r=A();return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:e.isVisible(n.adopsjonAvEktefellesBarn),children:a.jsx(B.YesOrNoQuestion,{name:n.adopsjonAvEktefellesBarn,legend:o(r,"omBarnet.adopsjonGjelder")})}),a.jsxs(d,{padBottom:"xl",visible:e.isVisible(n.erBarnetFødt),children:[a.jsx(B.YesOrNoQuestion,{name:n.erBarnetFødt,legend:o(r,"omBarnet.erBarnetFødt")}),!t&&a.jsxs(le,{header:o(r,"omBarnet.erBarnetFødt.readMore.header"),children:[a.jsx(d,{padBottom:"m",children:a.jsx(S,{id:"omBarnet.erBarnetFødt.readMore.innhold.del1"})}),a.jsx(S,{id:"omBarnet.erBarnetFødt.readMore.innhold.del2"})]})]})]})};try{BarnFdtEllerAdoptert.displayName="BarnFdtEllerAdoptert",BarnFdtEllerAdoptert.__docgenInfo={description:"",displayName:"BarnFdtEllerAdoptert",props:{visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}}}}}catch{}const ot=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:i,barnSøktOmFørMenIkkeRegistrert:s})=>{const{erBarnetFødt:m,antallBarn:c,fødselsdatoer:p}=t,k=A(),x=c!==void 0&&parseInt(c,10)>1?"omBarnet.fødselsdato.flereBarn":"omBarnet.fødselsdato";return e.situasjon==="adopsjon"||m!==l.YES||!i&&!s?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(k,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(k,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(k,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(k,"omBarnet.antallBarn.født")})}),a.jsx(d,{padBottom:"xl",visible:c!==void 0&&i&&parseInt(c,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(Y,{name:n.fødselsdatoer,render:()=>[a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.0`,label:o(k,x),minDate:f().subtract(3,"years").toDate(),maxDate:f().toDate(),validate:et(k),placeholder:"dd.mm.åååå"},`${n.fødselsdatoer}.0`)]})}),a.jsx(d,{padBottom:"l",visible:r.isVisible(n.termindato),children:a.jsx(B.DatePicker,{name:n.termindato,label:o(k,"omBarnet.termindato.født"),minDate:f(p[0]).subtract(1,"months").toDate(),maxDate:f(p[0]).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:me(p[0],k)})})]})};try{Fdsel.displayName="Fdsel",Fdsel.__docgenInfo={description:"",displayName:"Fdsel",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},barnSøktOmFørMenIkkeRegistrert:{defaultValue:null,description:"",name:"barnSøktOmFørMenIkkeRegistrert",required:!0,type:{name:"boolean"}}}}}catch{}const st=e=>{const t=f(e).add(12,"weeks");return f(t).isAfter(new Date,"day")},lt=(e,t,r,i)=>{if(i==="adopsjon")return!1;let s;if(r!==void 0&&r.length>0&&(s=Ce(r).fødselsdato),!t&&!s)return!1;const m=s||j(t);return I(e)?K(m)?!0:st(m):!0},it=(e,t,r,i)=>e===l.NO&&t.length===0&&z(r,i),F=(e,t)=>e===l.NO&&t!==""&&!Ae(j(t)),dt=(e,t)=>e===l.NO&&F(e,t),z=(e,t)=>I(e)?u(t)?K(new Date(t)):!1:!0,mt=(e,t)=>e==="fødsel"?t:!1,ut=(e,t,r,i,s,m)=>s?F(t,e)&&r!==l.UNANSWERED||!F(t,e)&&m!==void 0&&u(m[0])||t===l.YES&&m!==void 0&&u(m[0]):t===l.YES&&u(e)||t===l.NO&&u(e)&&!F(t,e)||t===l.NO&&F(t,e)&&r===l.NO||t===l.NO&&F(t,e)&&r===l.YES&&u(i),pt={[n.adopsjonAvEktefellesBarn]:{isIncluded:({situasjon:e})=>e==="adopsjon",isAnswered:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,visibilityFilter:({situasjon:e})=>e==="adopsjon"},[n.erBarnetFødt]:{isIncluded:({situasjon:e,søknadGjelderEtNyttBarn:t})=>t&&e==="fødsel",isAnswered:({erBarnetFødt:e})=>e!==l.UNANSWERED,visibilityFilter:({situasjon:e,søknadGjelderEtNyttBarn:t})=>mt(e,t)},[n.antallBarn]:{isIncluded:({søknadGjelderEtNyttBarn:e})=>e,isAnswered:({antallBarn:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r})=>t!==l.UNANSWERED||e!==l.UNANSWERED&&u(r)},[n.antallBarnSelect]:{isIncluded:({antallBarn:e,søknadGjelderEtNyttBarn:t})=>parseInt(e,10)>=3&&t,isAnswered:({antallBarnSelect:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r,antallBarn:i})=>parseInt(i,10)>=3&&(t!==l.UNANSWERED||e!==l.UNANSWERED&&u(r))},[n.adopsjonsdato]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,isAnswered:({adopsjonsdato:e})=>u(e),visibilityFilter:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED},[n.fødselsdatoer]:{isIncluded:({erBarnetFødt:e,adopsjonAvEktefellesBarn:t,søknadGjelderEtNyttBarn:r})=>r&&(e===l.YES||t!==l.UNANSWERED),isAnswered:({fødselsdatoer:e})=>e.length>0&&u(e[0]),visibilityFilter:({antallBarn:e})=>u(e)},[n.omsorgsovertakelse]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==l.UNANSWERED,isAnswered:()=>!0,visibilityFilter:({adopsjonsdato:e,adopsjonAvEktefellesBarn:t,ankomstdato:r,adoptertIUtlandet:i,søknadGjelderEtNyttBarn:s,fødselsdatoer:m})=>ut(e,t,i,r,s,m)},[n.termindato]:{isIncluded:({rolle:e,fødselsdatoer:t,erBarnetFødt:r,situasjon:i,valgteRegistrerteBarn:s})=>lt(e,t[0],s,i)||r===l.NO,isAnswered:({termindato:e})=>u(e),visibilityFilter:({fødselsdatoer:e,erBarnetFødt:t,antallBarn:r,valgteRegistrerteBarn:i})=>u(e[0])||t===l.NO&&u(r)||i!==void 0&&i.length>0},[n.terminbekreftelse]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:i})=>it(e,t,r,i),isAnswered:({terminbekreftelse:e})=>u(e),visibilityFilter:({termindato:e})=>u(e)},[n.terminbekreftelsedato]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:i})=>e===l.NO&&t.length===0&&z(r,i),isAnswered:({terminbekreftelsedato:e})=>u(e),visibilityFilter:({termindato:e})=>u(e)},[n.adoptertIUtlandet]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>F(e,t),isAnswered:({adoptertIUtlandet:e})=>e!==l.UNANSWERED,visibilityFilter:({fødselsdatoer:e,søknadGjelderEtNyttBarn:t})=>t&&u(e[0])||!t},[n.ankomstdato]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>dt(e,t),isAnswered:({ankomstdato:e})=>u(e),visibilityFilter:({adoptertIUtlandet:e})=>e===l.YES}},ct=ze(pt),G=({søkersituasjon:e,visibility:t,formValues:r,søknadGjelderEtNyttBarn:i,setErForTidligTilÅSøkePåTermin:s})=>{const m=A();if(e.situasjon==="adopsjon"||r.erBarnetFødt!==l.NO||!i)return null;const c=u(r.termindato)&&b(r.termindato)?!oe(r.termindato):!1;s(c);const p=I(e.rolle),k=p&&u(r.termindato),x=p?"omBarnet.antallBarn.termin.far":"omBarnet.antallBarn.termin",R=p?"omBarnet.veileder.terminbekreftelse.far":"omBarnet.veileder.terminbekreftelse";return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(m,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(m,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(m,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(m,x)})}),a.jsx(d,{padBottom:"xl",visible:r.antallBarn!==void 0&&parseInt(r.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"s",visible:t.isVisible(n.termindato),children:a.jsx(B.DatePicker,{name:n.termindato,label:o(m,"omBarnet.termindato.termin"),placeholder:"dd.mm.åååå",minDate:ye,maxDate:De,validate:tt(m)})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.termindato)&&!p,children:a.jsxs(le,{header:o(m,"omBarnet.termindato.åpneLabel"),children:[a.jsx(d,{padBottom:"m",children:a.jsx(S,{id:"omBarnet.termindato.innhold.del1"})}),a.jsx(S,{id:"omBarnet.termindato.innhold.del2"})]})}),k&&!z(e.rolle,r.termindato)&&a.jsx(d,{padBottom:"xl",children:a.jsx(X,{children:a.jsx(S,{id:"omBarnet.veileder.medMorEllerFarTermin",values:{lenke:a.jsx(Qe,{href:$e.papirsøknad,children:a.jsx(S,{id:"omBarnet.papirsøknad.lenke"})})}})})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(X,{children:a.jsx(S,{id:R})})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(Q,{legend:"Dokumentasjon om terminbekreftelse",label:o(m,"omBarnet.terminbekreftelse.lastOpp"),name:n.terminbekreftelse,attachments:r.terminbekreftelse||[],attachmentType:D.TERMINBEKREFTELSE,skjemanummer:T.TERMINBEKREFTELSE})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelsedato),children:a.jsx(B.DatePicker,{name:n.terminbekreftelsedato,label:o(m,"omBarnet.terminbekreftelseDato"),placeholder:"dd.mm.åååå",validate:rt(m),maxDate:Te})}),c&&a.jsx(d,{padBottom:"xl",children:a.jsxs(He,{variant:"warning",children:[a.jsx(d,{padBottom:"m",children:a.jsx(w,{level:"3",size:"small",children:a.jsx(S,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading"})})}),a.jsx($,{children:a.jsx(S,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold"})})]})})]})};try{G.displayName="Termin",G.__docgenInfo={description:"",displayName:"Termin",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},setErForTidligTilÅSøkePåTermin:{defaultValue:null,description:"",name:"setErForTidligTilÅSøkePåTermin",required:!0,type:{name:"(val: boolean) => void"}}}}}catch{}const Bt=()=>({[n.erBarnetFødt]:l.UNANSWERED,[n.adopsjonAvEktefellesBarn]:l.UNANSWERED,[n.antallBarn]:"",[n.antallBarnSelect]:"",[n.adopsjonsdato]:"",[n.fødselsdatoer]:[],[n.omsorgsovertakelse]:[],[n.termindato]:"",[n.terminbekreftelse]:[],[n.terminbekreftelsedato]:"",[n.adoptertIUtlandet]:l.UNANSWERED,[n.ankomstdato]:""}),ft=(e,t)=>({erBarnetFødt:t.isVisible(n.erBarnetFødt)?e.erBarnetFødt:l.UNANSWERED,adopsjonAvEktefellesBarn:t.isVisible(n.adopsjonAvEktefellesBarn)?e.adopsjonAvEktefellesBarn:l.UNANSWERED,antallBarn:t.isVisible(n.antallBarn)?e.antallBarn:"",antallBarnSelect:t.isVisible(n.antallBarnSelect)?e.antallBarnSelect:"",adopsjonsdato:t.isVisible(n.adopsjonsdato)?e.adopsjonsdato:"",fødselsdatoer:t.isVisible(n.fødselsdatoer)?e.fødselsdatoer:[],omsorgsovertakelse:t.isVisible(n.omsorgsovertakelse)?e.omsorgsovertakelse:[],termindato:t.isVisible(n.termindato)?e.termindato:"",terminbekreftelse:t.isVisible(n.terminbekreftelse)?e.terminbekreftelse:[],terminbekreftelsedato:t.isVisible(n.terminbekreftelsedato)?e.terminbekreftelsedato:"",adoptertIUtlandet:t.isVisible(n.adoptertIUtlandet)?e.adoptertIUtlandet:l.UNANSWERED,ankomstdato:t.isVisible(n.ankomstdato)?e.ankomstdato:""}),jt=(e,t,r,i)=>{if(e!==void 0&&t==="fødsel")return{...e,type:i?h.UFØDT:h.FØDT,termindato:u(r.termindato)?j(r.termindato):void 0,fødselsdatoer:e.fødselsdatoer,antallBarn:e.antallBarn};const s=U(r.omsorgsovertakelse,D.OMSORGSOVERTAKELSE,T.OMSORGSOVERTAKELSESDATO);return r.adopsjonAvEktefellesBarn===l.YES?{...e,type:h.ADOPTERT_STEBARN,adopsjonsdato:j(r.adopsjonsdato),omsorgsovertakelse:s}:{...e,type:h.ADOPTERT_ANNET_BARN,adopsjonsdato:j(r.adopsjonsdato),adoptertIUtlandet:C(r.adoptertIUtlandet),ankomstdato:r.adoptertIUtlandet===l.YES?j(r.ankomstdato):void 0,omsorgsovertakelse:s}},kt=(e,t,r,i,s)=>{if(r!==void 0)return jt(r,i,e,s);const m=parseInt(e.antallBarn,10)<3?parseInt(e.antallBarn,10):parseInt(e.antallBarnSelect,10);if(e.erBarnetFødt===l.YES)return{type:h.FØDT,fødselsdatoer:e.fødselsdatoer.map(p=>j(p)),antallBarn:m,termindato:u(e.termindato)?j(e.termindato):void 0};if(e.erBarnetFødt===l.NO){const p=U(e.terminbekreftelse,D.TERMINBEKREFTELSE,T.TERMINBEKREFTELSE);return t.length===0?{type:h.UFØDT,terminbekreftelse:p,terminbekreftelsedato:j(e.terminbekreftelsedato),antallBarn:m,termindato:j(e.termindato)}:{type:h.UFØDT,antallBarn:m,termindato:j(e.termindato)}}const c=U(e.omsorgsovertakelse,D.OMSORGSOVERTAKELSE,T.OMSORGSOVERTAKELSESDATO);return e.adopsjonAvEktefellesBarn===l.YES?{type:h.ADOPTERT_STEBARN,adopsjonsdato:j(e.adopsjonsdato),antallBarn:m,fødselsdatoer:e.fødselsdatoer.map(p=>j(p)),omsorgsovertakelse:c}:{type:h.ADOPTERT_ANNET_BARN,fødselsdatoer:e.fødselsdatoer.map(p=>j(p)),adopsjonsdato:j(e.adopsjonsdato),antallBarn:m,adoptertIUtlandet:C(e.adoptertIUtlandet),ankomstdato:e.adoptertIUtlandet===l.YES?j(e.ankomstdato):void 0,omsorgsovertakelse:c}},xt=(e,t)=>{const r=Bt();if(!t)return r;const i=t.antallBarn>2;return ie(t)?{...r,erBarnetFødt:l.YES,fødselsdatoer:t.fødselsdatoer.map(s=>v(s)),termindato:v(t.termindato),antallBarn:i?"3":t.antallBarn.toString(),antallBarnSelect:i?t.antallBarn.toString():""}:M(t)?e.length===0?{...r,erBarnetFødt:l.NO,terminbekreftelse:t.terminbekreftelse||[],terminbekreftelsedato:v(t.terminbekreftelsedato),termindato:v(t.termindato),antallBarn:i?"3":t.antallBarn.toString(),antallBarnSelect:i?t.antallBarn.toString():""}:{...r,erBarnetFødt:l.NO,termindato:v(t.termindato),antallBarn:i?"3":t.antallBarn.toString(),antallBarnSelect:i?t.antallBarn.toString():""}:Ve(t)?{...r,adopsjonAvEktefellesBarn:l.NO,fødselsdatoer:t.fødselsdatoer.map(s=>v(s)),adopsjonsdato:v(t.adopsjonsdato),antallBarn:i?"3":t.antallBarn.toString(),antallBarnSelect:i?t.antallBarn.toString():"",adoptertIUtlandet:qe(t.adoptertIUtlandet),omsorgsovertakelse:t.omsorgsovertakelse,ankomstdato:v(t.ankomstdato)}:_e(t)?{...r,adopsjonAvEktefellesBarn:l.YES,adopsjonsdato:v(t.adopsjonsdato),antallBarn:i?"3":t.antallBarn.toString(),antallBarnSelect:i?t.antallBarn.toString():"",fødselsdatoer:t.fødselsdatoer.map(s=>v(s)),omsorgsovertakelse:t.omsorgsovertakelse}:r},L=({valgteBarn:e,visibility:t})=>{const r=A(),i=e.length,s=e.every(p=>Ue(p));e.sort(Je);const m=e.map(p=>p.fødselsdato),c=e[0].fødselsdato;return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsxs("div",{children:[a.jsx(d,{padBottom:"s",children:a.jsx(Ne,{children:a.jsx(S,{id:"omBarnet.valgteBarn.tittel",values:{antallBarn:i}})})}),s?e.map(p=>a.jsx(d,{padBottom:"s",children:a.jsx(te,{person:p,fødselsdatoForVisning:Z([p.fødselsdato]),visEtternavn:!1})},p.fnr)):a.jsx(d,{padBottom:"s",children:a.jsx(te,{person:e[0],fødselsdatoForVisning:Z(m),altTekstHvisUkjentNavn:Me(void 0,m,e.length,r),visEtternavn:!1})})]})}),a.jsx(d,{padBottom:"l",visible:t.isVisible(n.termindato)&&e.length>0,children:a.jsx(B.DatePicker,{name:n.termindato,label:o(r,"omBarnet.termindato.født"),dayPickerProps:{defaultMonth:c},minDate:f(c).subtract(1,"months").toDate(),maxDate:f(c).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:me(v(c),r)})})]})};try{L.displayName="ValgteRegistrerteBarn",L.__docgenInfo={description:"",displayName:"ValgteRegistrerteBarn",props:{valgteBarn:{defaultValue:null,description:"",name:"valgteBarn",required:!0,type:{name:"RegistrertBarn[]"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}}}}}catch{}const W=({søkerInfo:e,søknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:r,avbrytSøknad:i})=>{const s=A(),m=we(),[c,p]=ee.useState(!1),k=Ze(ae(O.SØKERSITUASJON)),x=ae(O.OM_BARNET),R=re(O.OM_BARNET),pe=re(O.APP_ROUTE),{arbeidsforhold:V,registrerteBarn:H}=e,[ce,Be]=ee.useState(!1),J=I(k.rolle),fe=g=>x&&!M(x)&&x.fnr!==void 0&&x.fnr.length>0?x.fnr.includes(g.fnr):!1,je=x?j(Pe(x)):void 0,ke=x&&ie(x)?H.filter(g=>g.fnr===void 0&&Xe(g.fødselsdato,je)):[],y=!t&&x&&!M(x)?H.filter(g=>fe(g)).concat(ke):void 0,N=!t&&(y===void 0||y.length===0),xe=g=>{p(!0);const _=kt(g,V,!t&&!N?x:void 0,k.situasjon,N);R(_),pe(Le.ANNEN_FORELDER),r()};return a.jsx(B.FormikWrapper,{initialValues:xt(V,x),onSubmit:xe,renderForm:({values:g})=>{const E=ct.getVisbility({...g,arbeidsforhold:V,situasjon:k.situasjon,rolle:k.rolle,valgteRegistrerteBarn:y,søknadGjelderEtNyttBarn:N||t}),_=J&&C(g.erBarnetFødt)===!1&&u(g.termindato)&&!K(j(g.termindato)),ge=E.areAllQuestionsAnswered()&&!_;return a.jsx(Oe,{bannerTitle:o(s,"søknad.pageheading"),activeStepId:"omBarnet",pageTitle:o(s,"søknad.omBarnet"),onCancel:i,onContinueLater:m,steps:We(s,!1),children:a.jsxs(B.Form,{includeButtons:!1,includeValidationSummary:!0,cleanup:ve=>ft(ve,E),children:[y!==void 0&&y.length>0&&a.jsx(L,{valgteBarn:y,visibility:E}),a.jsx(nt,{visibility:E,erFarEllerMedmor:J}),a.jsx(P,{søkersituasjon:k,formValues:g,visibility:E,søknadGjelderEtNyttBarn:t}),a.jsx(q,{søkersituasjon:k,formValues:g,visibility:E,søknadGjelderEtNyttBarn:t}),a.jsx(G,{søkersituasjon:k,formValues:g,visibility:E,søknadGjelderEtNyttBarn:N||t,setErForTidligTilÅSøkePåTermin:Be}),a.jsx(ot,{søkersituasjon:k,formValues:g,visibility:E,søknadGjelderEtNyttBarn:t,barnSøktOmFørMenIkkeRegistrert:N}),a.jsx(d,{margin:"l",children:a.jsxs(Ie,{children:[a.jsx(Ge,{mellomlagreSøknadOgNaviger:r,route:Ye("omBarnet")}),ge&&a.jsx(Re,{type:"submit",disabled:c||ce,loading:c,children:o(s,"søknad.gåVidere")})]})})]})})}})},Lt=W;try{W.displayName="OmBarnet",W.__docgenInfo={description:"",displayName:"OmBarnet",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},søknadGjelderNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderNyttBarn",required:!0,type:{name:"boolean"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{Lt as O};