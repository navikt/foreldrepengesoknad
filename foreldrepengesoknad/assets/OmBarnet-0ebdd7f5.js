import{j as a}from"./jsx-runtime-69eee039.js";import{_ as Be,d as f,ay as fe,az as je,C as p,i as o,Z as b,aA as X,aB as ke,aC as xe,aD as Z,u as F,Y as i,B as d,aa as W,b as j,g as ee,G as O,R as te,J as Y,E as ge,aE as ve,aF as Se,aw as he,A as be,H as Ee,X as v,aG as _,L as Fe,$ as Ae,ab as De,j as $}from"./Tidsperioden-bc4aa89e.js";import{i as I,l as ae,m as U,o as ye,p as Ne,b as h,k as Te,d as H,q as Oe,a as Ie,g as Ve,L as Re}from"./useSøknad-26978d9c.js";import"./index-e13aeee6.js";import{r as _e}from"./index-7c191284.js";import{c as Ue,a as w}from"./formUtils-9352967f.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{u as Me,S as z,a as Pe}from"./mapSøkerinfoDTO-23fed2f2.js";import{u as Ge}from"./useOnValidSubmit-1caa3e37.js";import{u as Le}from"./useSøkerinfo-417aa154.js";import{u as qe,a as We,b as Ye,s as we,c as Ce}from"./useSaveLoadedRoute-03fa3834.js";import{A as y}from"./AttachmentType-f6ad37cf.js";import{F as C,S as N}from"./FormikFileUploader-5c0e4e48.js";import{i as Ke,a as Qe}from"./dateUtils-9225f718.js";import{F as x}from"./message-0de53699.js";import{l as $e}from"./links-b36d21ab.js";import{Q as He,a as ze}from"./submitUtils-3b298622.js";import{L as Je,B as Xe}from"./Link-b834ea2b.js";import{R as J}from"./RegistrertePersonalia-ca898edd.js";import{f as Ze,e as et}from"./velkommenUtils-67ca2dfd.js";var n=(e=>(e.erBarnetFødt="erBarnetFødt",e.adopsjonAvEktefellesBarn="adopsjonAvEktefellesBarn",e.antallBarn="antallBarn",e.antallBarnSelect="antallBarnSelect",e.adopsjonsdato="adopsjonsdato",e.søkerAdopsjonAlene="søkerAdopsjonAlene",e.adoptertIUtlandet="adoptertIUtlandet",e.fødselsdatoer="fødselsdatoer",e.termindato="termindato",e.omsorgsovertakelse="omsorgsovertakelse",e.terminbekreftelse="terminbekreftelse",e.terminbekreftelsedato="terminbekreftelsedato",e.ankomstdato="ankomstdato",e))(n||{});const B=Be();f.extend(fe);f.extend(je);const tt=e=>t=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(X(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(f(t).isBefore(f(new Date).subtract(3,"years").subtract(4,"months"),"day"))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake")},re=e=>(t,r)=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat");if(X(t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere");if(Ke(r,t))return o(e,"valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato");if(!ke(t,r))return o(e,"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake")},at=e=>t=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!xe(t))return o(e,"valideringsfeil.omBarnet.termindato.forTidlig");if(!Z(t))return o(e,"valideringsfeil.omBarnet.termindato.duMåVæreIUke22")},ne=(e,t)=>r=>{if(!p(r))return o(t,"valideringsfeil.omBarnet.termindato.duMåOppgi");if(!b(r))return o(t,"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat");if(!f(r).subtract(6,"months").isSameOrBefore(f(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtFremITid");if(!f(r).add(1,"months").isSameOrAfter(f(e),"day"))return o(t,"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid")},oe=e=>t=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat")},rt=e=>(t,r)=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat");if(r!==void 0&&!f(r).isSameOrBefore(t,"day"))return o(e,"valideringsfeil.omBarnet.ankomstDato.førFødselsdato")},nt=e=>t=>{if(!p(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi");if(!b(t))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat");if(f().isBefore(f(t)))return o(e,"valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid")},M=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:l})=>{const s=F();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==i.NO?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.annetBarn"),name:n.adopsjonsdato,validate:oe(s),placeholder:"dd.mm.åååå"})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(d,{padBottom:"xl",visible:t.antallBarn!==void 0&&l&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(W,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((m,u)=>a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.${u}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${u+1}`),minDate:f(t.adopsjonsdato).subtract(15,"years").toDate(),maxDate:j(t.adopsjonsdato),validate:c=>re(s)(c,t.adopsjonsdato),placeholder:"dd.mm.åååå",showYearSelector:!0})},ee()))})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.adoptertIUtlandet),children:a.jsx(B.YesOrNoQuestion,{name:n.adoptertIUtlandet,legend:o(s,"omBarnet.adopteresFraUtlandet")})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.ankomstdato),children:a.jsx(B.DatePicker,{name:n.ankomstdato,label:o(s,"omBarnet.ankomstDato"),minDate:f(t.fødselsdatoer[0]).toDate(),maxDate:f().add(6,"months").toDate(),validate:m=>rt(s)(m,t.fødselsdatoer[0]),placeholder:"dd.mm.åååå"})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:a.jsx(O,{children:a.jsx(x,{id:"omBarnet.veileder.omsorgsovertakelse"})})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:a.jsx(C,{legend:"Dokumentasjon om adopsjon",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:y.OMSORGSOVERTAKELSE,skjemanummer:N.OMSORGSOVERTAKELSESDATO})})]})};try{M.displayName="AdopsjonAnnetBarn",M.__docgenInfo={description:"",displayName:"AdopsjonAnnetBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const P=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:l})=>{const s=F();return e.situasjon==="fødsel"||t.adopsjonAvEktefellesBarn!==i.YES?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsx(B.DatePicker,{label:o(s,"omBarnet.adopsjonsdato.stebarn"),name:n.adopsjonsdato,validate:oe(s),placeholder:"dd.mm.åååå"})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(s,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(s,"omBarnet.radiobutton.toBarn"),value:"2"},{label:o(s,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(s,"omBarnet.antallBarn.adopsjon.født")})}),a.jsx(d,{padBottom:"xl",visible:t.antallBarn!==void 0&&l&&parseInt(t.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(W,{name:n.fødselsdatoer,render:()=>[...Array(parseInt(t.antallBarn,10))].map((m,u)=>a.jsxs(d,{padBottom:"xl",children:[a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.${u}`,label:t.antallBarn==="1"?o(s,"omBarnet.fødselsdato"):o(s,`omBarnet.fødselsdato.adopsjon.${u+1}`),minDate:f().subtract(6,"month").toDate(),maxDate:j(t.adopsjonsdato),validate:c=>re(s)(c,t.adopsjonsdato),placeholder:"dd.mm.åååå"})," "]},ee()))})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:a.jsx(O,{children:a.jsx(x,{id:"omBarnet.veileder.omsorgsovertakelse"})})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.omsorgsovertakelse),children:a.jsx(C,{legend:"Dokumentasjon om adopsjon",label:o(s,"omBarnet.adopsjon.vedlegg"),name:n.omsorgsovertakelse,attachments:t.omsorgsovertakelse||[],attachmentType:y.OMSORGSOVERTAKELSE,skjemanummer:N.OMSORGSOVERTAKELSESDATO})})]})};try{P.displayName="AdopsjonEktefellesBarn",P.__docgenInfo={description:"",displayName:"AdopsjonEktefellesBarn",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}}}}}catch{}const ot=({visibility:e,erFarEllerMedmor:t})=>{const r=F();return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:e.isVisible(n.adopsjonAvEktefellesBarn),children:a.jsx(B.YesOrNoQuestion,{name:n.adopsjonAvEktefellesBarn,legend:o(r,"omBarnet.adopsjonGjelder")})}),a.jsxs(d,{padBottom:"xl",visible:e.isVisible(n.erBarnetFødt),children:[a.jsx(B.YesOrNoQuestion,{name:n.erBarnetFødt,legend:o(r,"omBarnet.erBarnetFødt")}),!t&&a.jsxs(te,{header:o(r,"omBarnet.erBarnetFødt.readMore.header"),children:[a.jsx(d,{padBottom:"m",children:a.jsx(x,{id:"omBarnet.erBarnetFødt.readMore.innhold.del1"})}),a.jsx(x,{id:"omBarnet.erBarnetFødt.readMore.innhold.del2"})]})]})]})};try{BarnFdtEllerAdoptert.displayName="BarnFdtEllerAdoptert",BarnFdtEllerAdoptert.__docgenInfo={description:"",displayName:"BarnFdtEllerAdoptert",props:{visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}}}}}catch{}const st=({søkersituasjon:e,formValues:t,visibility:r,søknadGjelderEtNyttBarn:l,barnSøktOmFørMenIkkeRegistrert:s})=>{const{erBarnetFødt:m,antallBarn:u,fødselsdatoer:c}=t,g=F(),A=u!==void 0&&parseInt(u,10)>1?"omBarnet.fødselsdato.flereBarn":"omBarnet.fødselsdato";return e.situasjon==="adopsjon"||m!==i.YES||!l&&!s?null:a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(g,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(g,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(g,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(g,"omBarnet.antallBarn.født")})}),a.jsx(d,{padBottom:"xl",visible:u!==void 0&&l&&parseInt(u,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"xl",visible:r.isVisible(n.fødselsdatoer),children:a.jsx(W,{name:n.fødselsdatoer,render:()=>[a.jsx(B.DatePicker,{name:`${n.fødselsdatoer}.0`,label:o(g,A),minDate:f().subtract(3,"years").toDate(),maxDate:f().toDate(),validate:tt(g),placeholder:"dd.mm.åååå"},`${n.fødselsdatoer}.0`)]})}),a.jsx(d,{padBottom:"l",visible:r.isVisible(n.termindato),children:a.jsx(B.DatePicker,{name:n.termindato,label:o(g,"omBarnet.termindato.født"),minDate:f(c[0]).subtract(1,"months").toDate(),maxDate:f(c[0]).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:ne(c[0],g)})})]})};try{Fdsel.displayName="Fdsel",Fdsel.__docgenInfo={description:"",displayName:"Fdsel",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},barnSøktOmFørMenIkkeRegistrert:{defaultValue:null,description:"",name:"barnSøktOmFørMenIkkeRegistrert",required:!0,type:{name:"boolean"}}}}}catch{}const lt=e=>{const t=f(e).add(12,"weeks");return f(t).isAfter(new Date,"day")},it=(e,t,r,l)=>{if(l==="adopsjon")return!1;let s;if(r!==void 0&&r.length>0&&(s=Qe(r).fødselsdato),!t&&!s)return!1;const m=s||j(t);return I(e)?Y(m)?!0:lt(m):!0},dt=(e,t,r,l)=>e===i.NO&&t.length===0&&K(r,l),E=(e,t)=>e===i.NO&&t!==""&&!ge(j(t)),mt=(e,t)=>e===i.NO&&E(e,t),K=(e,t)=>I(e)?p(t)?Y(new Date(t)):!1:!0,pt=(e,t)=>e==="fødsel"?t:!1,ut=(e,t,r,l,s,m)=>s?E(t,e)&&r!==i.UNANSWERED||!E(t,e)&&m!==void 0&&p(m[0])||t===i.YES&&m!==void 0&&p(m[0]):t===i.YES&&p(e)||t===i.NO&&p(e)&&!E(t,e)||t===i.NO&&E(t,e)&&r===i.NO||t===i.NO&&E(t,e)&&r===i.YES&&p(l),ct={[n.adopsjonAvEktefellesBarn]:{isIncluded:({situasjon:e})=>e==="adopsjon",isAnswered:({adopsjonAvEktefellesBarn:e})=>e!==i.UNANSWERED,visibilityFilter:({situasjon:e})=>e==="adopsjon"},[n.erBarnetFødt]:{isIncluded:({situasjon:e,søknadGjelderEtNyttBarn:t})=>t&&e==="fødsel",isAnswered:({erBarnetFødt:e})=>e!==i.UNANSWERED,visibilityFilter:({situasjon:e,søknadGjelderEtNyttBarn:t})=>pt(e,t)},[n.antallBarn]:{isIncluded:({søknadGjelderEtNyttBarn:e})=>e,isAnswered:({antallBarn:e})=>p(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r})=>t!==i.UNANSWERED||e!==i.UNANSWERED&&p(r)},[n.antallBarnSelect]:{isIncluded:({antallBarn:e,søknadGjelderEtNyttBarn:t})=>parseInt(e,10)>=3&&t,isAnswered:({antallBarnSelect:e})=>p(e),visibilityFilter:({adopsjonAvEktefellesBarn:e,erBarnetFødt:t,adopsjonsdato:r,antallBarn:l})=>parseInt(l,10)>=3&&(t!==i.UNANSWERED||e!==i.UNANSWERED&&p(r))},[n.adopsjonsdato]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==i.UNANSWERED,isAnswered:({adopsjonsdato:e})=>p(e),visibilityFilter:({adopsjonAvEktefellesBarn:e})=>e!==i.UNANSWERED},[n.fødselsdatoer]:{isIncluded:({erBarnetFødt:e,adopsjonAvEktefellesBarn:t,søknadGjelderEtNyttBarn:r})=>r&&(e===i.YES||t!==i.UNANSWERED),isAnswered:({fødselsdatoer:e})=>e.length>0&&p(e[0]),visibilityFilter:({antallBarn:e})=>p(e)},[n.omsorgsovertakelse]:{isIncluded:({adopsjonAvEktefellesBarn:e})=>e!==i.UNANSWERED,isAnswered:()=>!0,visibilityFilter:({adopsjonsdato:e,adopsjonAvEktefellesBarn:t,ankomstdato:r,adoptertIUtlandet:l,søknadGjelderEtNyttBarn:s,fødselsdatoer:m})=>ut(e,t,l,r,s,m)},[n.termindato]:{isIncluded:({rolle:e,fødselsdatoer:t,erBarnetFødt:r,situasjon:l,valgteRegistrerteBarn:s})=>it(e,t[0],s,l)||r===i.NO,isAnswered:({termindato:e})=>p(e),visibilityFilter:({fødselsdatoer:e,erBarnetFødt:t,antallBarn:r,valgteRegistrerteBarn:l})=>p(e[0])||t===i.NO&&p(r)||l!==void 0&&l.length>0},[n.terminbekreftelse]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:l})=>dt(e,t,r,l),isAnswered:({terminbekreftelse:e})=>p(e),visibilityFilter:({termindato:e})=>p(e)},[n.terminbekreftelsedato]:{isIncluded:({erBarnetFødt:e,arbeidsforhold:t,rolle:r,termindato:l})=>e===i.NO&&t.length===0&&K(r,l),isAnswered:({terminbekreftelsedato:e})=>p(e),visibilityFilter:({termindato:e})=>p(e)},[n.adoptertIUtlandet]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>E(e,t),isAnswered:({adoptertIUtlandet:e})=>e!==i.UNANSWERED,visibilityFilter:({fødselsdatoer:e,søknadGjelderEtNyttBarn:t})=>t&&p(e[0])||!t},[n.ankomstdato]:{isIncluded:({adopsjonAvEktefellesBarn:e,adopsjonsdato:t})=>mt(e,t),isAnswered:({ankomstdato:e})=>p(e),visibilityFilter:({adoptertIUtlandet:e})=>e===i.YES}},Bt=He(ct),G=({søkersituasjon:e,visibility:t,formValues:r,søknadGjelderEtNyttBarn:l,setErForTidligTilÅSøkePåTermin:s})=>{const m=F();if(e.situasjon==="adopsjon"||r.erBarnetFødt!==i.NO||!l)return null;const u=p(r.termindato)&&b(r.termindato)?!Z(r.termindato):!1;s(u);const c=I(e.rolle),g=c&&p(r.termindato),A=c?"omBarnet.antallBarn.termin.far":"omBarnet.antallBarn.termin",V=c?"omBarnet.veileder.terminbekreftelse.far":"omBarnet.veileder.terminbekreftelse";return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.antallBarn),children:a.jsx(B.RadioGroup,{name:n.antallBarn,radios:[{label:o(m,"omBarnet.radiobutton.ettBarn"),value:"1"},{label:o(m,"omBarnet.radiobutton.tvillinger"),value:"2"},{label:o(m,"omBarnet.radiobutton.flere"),value:"3"}],legend:o(m,A)})}),a.jsx(d,{padBottom:"xl",visible:r.antallBarn!==void 0&&parseInt(r.antallBarn,10)>=3,children:a.jsxs(B.Select,{label:"Antall barn",name:n.antallBarnSelect,children:[a.jsx("option",{value:""}),a.jsx("option",{value:"3",children:"3"}),a.jsx("option",{value:"4",children:"4"}),a.jsx("option",{value:"5",children:"5"}),a.jsx("option",{value:"6",children:"6"}),a.jsx("option",{value:"7",children:"7"}),a.jsx("option",{value:"8",children:"8"}),a.jsx("option",{value:"9",children:"9"})]})}),a.jsx(d,{padBottom:"s",visible:t.isVisible(n.termindato),children:a.jsx(B.DatePicker,{name:n.termindato,label:o(m,"omBarnet.termindato.termin"),placeholder:"dd.mm.åååå",minDate:ve,maxDate:Se,validate:at(m)})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.termindato)&&!c,children:a.jsxs(te,{header:o(m,"omBarnet.termindato.åpneLabel"),children:[a.jsx(d,{padBottom:"m",children:a.jsx(x,{id:"omBarnet.termindato.innhold.del1"})}),a.jsx(x,{id:"omBarnet.termindato.innhold.del2"})]})}),g&&!K(e.rolle,r.termindato)&&a.jsx(d,{padBottom:"xl",children:a.jsx(O,{children:a.jsx(x,{id:"omBarnet.veileder.medMorEllerFarTermin",values:{lenke:a.jsx(Je,{href:$e.papirsøknad,children:a.jsx(x,{id:"omBarnet.papirsøknad.lenke"})})}})})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(O,{children:a.jsx(x,{id:V})})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelse),children:a.jsx(C,{legend:"Dokumentasjon om terminbekreftelse",label:o(m,"omBarnet.terminbekreftelse.lastOpp"),name:n.terminbekreftelse,attachments:r.terminbekreftelse||[],attachmentType:y.TERMINBEKREFTELSE,skjemanummer:N.TERMINBEKREFTELSE})}),a.jsx(d,{padBottom:"xl",visible:t.isVisible(n.terminbekreftelsedato),children:a.jsx(B.DatePicker,{name:n.terminbekreftelsedato,label:o(m,"omBarnet.terminbekreftelseDato"),placeholder:"dd.mm.åååå",validate:nt(m),maxDate:he})}),u&&a.jsx(d,{padBottom:"xl",children:a.jsxs(be,{variant:"warning",children:[a.jsx(d,{padBottom:"m",children:a.jsx(Ee,{level:"3",size:"small",children:a.jsx(x,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading"})})}),a.jsx(Xe,{children:a.jsx(x,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold"})})]})})]})};try{G.displayName="Termin",G.__docgenInfo={description:"",displayName:"Termin",props:{søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"Søkersituasjon"}},formValues:{defaultValue:null,description:"",name:"formValues",required:!0,type:{name:"OmBarnetFormData"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}},søknadGjelderEtNyttBarn:{defaultValue:null,description:"",name:"søknadGjelderEtNyttBarn",required:!0,type:{name:"boolean"}},setErForTidligTilÅSøkePåTermin:{defaultValue:null,description:"",name:"setErForTidligTilÅSøkePåTermin",required:!0,type:{name:"(val: boolean) => void"}}}}}catch{}const ft=()=>({[n.erBarnetFødt]:i.UNANSWERED,[n.adopsjonAvEktefellesBarn]:i.UNANSWERED,[n.antallBarn]:"",[n.antallBarnSelect]:"",[n.adopsjonsdato]:"",[n.fødselsdatoer]:[],[n.omsorgsovertakelse]:[],[n.termindato]:"",[n.terminbekreftelse]:[],[n.terminbekreftelsedato]:"",[n.adoptertIUtlandet]:i.UNANSWERED,[n.ankomstdato]:""}),jt=(e,t)=>({erBarnetFødt:t.isVisible(n.erBarnetFødt)?e.erBarnetFødt:i.UNANSWERED,adopsjonAvEktefellesBarn:t.isVisible(n.adopsjonAvEktefellesBarn)?e.adopsjonAvEktefellesBarn:i.UNANSWERED,antallBarn:t.isVisible(n.antallBarn)?e.antallBarn:"",antallBarnSelect:t.isVisible(n.antallBarnSelect)?e.antallBarnSelect:"",adopsjonsdato:t.isVisible(n.adopsjonsdato)?e.adopsjonsdato:"",fødselsdatoer:t.isVisible(n.fødselsdatoer)?e.fødselsdatoer:[],omsorgsovertakelse:t.isVisible(n.omsorgsovertakelse)?e.omsorgsovertakelse:[],termindato:t.isVisible(n.termindato)?e.termindato:"",terminbekreftelse:t.isVisible(n.terminbekreftelse)?e.terminbekreftelse:[],terminbekreftelsedato:t.isVisible(n.terminbekreftelsedato)?e.terminbekreftelsedato:"",adoptertIUtlandet:t.isVisible(n.adoptertIUtlandet)?e.adoptertIUtlandet:i.UNANSWERED,ankomstdato:t.isVisible(n.ankomstdato)?e.ankomstdato:""}),kt=(e,t,r,l)=>{if(e!==void 0&&t==="fødsel")return{...e,type:l?h.UFØDT:h.FØDT,termindato:p(r.termindato)?j(r.termindato):void 0,fødselsdatoer:e.fødselsdatoer,antallBarn:e.antallBarn};const s=_(r.omsorgsovertakelse,y.OMSORGSOVERTAKELSE,N.OMSORGSOVERTAKELSESDATO);return r.adopsjonAvEktefellesBarn===i.YES?{...e,type:h.ADOPTERT_STEBARN,adopsjonsdato:j(r.adopsjonsdato),omsorgsovertakelse:s}:{...e,type:h.ADOPTERT_ANNET_BARN,adopsjonsdato:j(r.adopsjonsdato),adoptertIUtlandet:w(r.adoptertIUtlandet),ankomstdato:r.adoptertIUtlandet===i.YES?j(r.ankomstdato):void 0,omsorgsovertakelse:s}},xt=(e,t,r,l,s)=>{if(r!==void 0)return kt(r,l,e,s);const m=parseInt(e.antallBarn,10)<3?parseInt(e.antallBarn,10):parseInt(e.antallBarnSelect,10);if(e.erBarnetFødt===i.YES)return{type:h.FØDT,fødselsdatoer:e.fødselsdatoer.map(c=>j(c)),antallBarn:m,termindato:p(e.termindato)?j(e.termindato):void 0};if(e.erBarnetFødt===i.NO){const c=_(e.terminbekreftelse,y.TERMINBEKREFTELSE,N.TERMINBEKREFTELSE);return t.length===0?{type:h.UFØDT,terminbekreftelse:c,terminbekreftelsedato:j(e.terminbekreftelsedato),antallBarn:m,termindato:j(e.termindato)}:{type:h.UFØDT,antallBarn:m,termindato:j(e.termindato)}}const u=_(e.omsorgsovertakelse,y.OMSORGSOVERTAKELSE,N.OMSORGSOVERTAKELSESDATO);return e.adopsjonAvEktefellesBarn===i.YES?{type:h.ADOPTERT_STEBARN,adopsjonsdato:j(e.adopsjonsdato),antallBarn:m,fødselsdatoer:e.fødselsdatoer.map(c=>j(c)),omsorgsovertakelse:u}:{type:h.ADOPTERT_ANNET_BARN,fødselsdatoer:e.fødselsdatoer.map(c=>j(c)),adopsjonsdato:j(e.adopsjonsdato),antallBarn:m,adoptertIUtlandet:w(e.adoptertIUtlandet),ankomstdato:e.adoptertIUtlandet===i.YES?j(e.ankomstdato):void 0,omsorgsovertakelse:u}},gt=(e,t)=>{const r=ft();if(!e)return r;const l=e.antallBarn>2;return ae(e)?{...r,erBarnetFødt:i.YES,fødselsdatoer:e.fødselsdatoer.map(s=>v(s)),termindato:v(e.termindato),antallBarn:l?"3":e.antallBarn.toString(),antallBarnSelect:l?e.antallBarn.toString():""}:U(e)?t.length===0?{...r,erBarnetFødt:i.NO,terminbekreftelse:e.terminbekreftelse||[],terminbekreftelsedato:v(e.terminbekreftelsedato),termindato:v(e.termindato),antallBarn:l?"3":e.antallBarn.toString(),antallBarnSelect:l?e.antallBarn.toString():""}:{...r,erBarnetFødt:i.NO,termindato:v(e.termindato),antallBarn:l?"3":e.antallBarn.toString(),antallBarnSelect:l?e.antallBarn.toString():""}:ye(e)?{...r,adopsjonAvEktefellesBarn:i.NO,fødselsdatoer:e.fødselsdatoer.map(s=>v(s)),adopsjonsdato:v(e.adopsjonsdato),antallBarn:l?"3":e.antallBarn.toString(),antallBarnSelect:l?e.antallBarn.toString():"",adoptertIUtlandet:Ue(e.adoptertIUtlandet),omsorgsovertakelse:e.omsorgsovertakelse,ankomstdato:v(e.ankomstdato)}:Ne(e)?{...r,adopsjonAvEktefellesBarn:i.YES,adopsjonsdato:v(e.adopsjonsdato),antallBarn:l?"3":e.antallBarn.toString(),antallBarnSelect:l?e.antallBarn.toString():"",fødselsdatoer:e.fødselsdatoer.map(s=>v(s)),omsorgsovertakelse:e.omsorgsovertakelse}:r},L=({valgteBarn:e,visibility:t})=>{const r=F(),l=e.length,s=e.every(c=>Te(c));e.sort(Ze);const m=e.map(c=>c.fødselsdato),u=e[0].fødselsdato;return a.jsxs(a.Fragment,{children:[a.jsx(d,{padBottom:"xl",children:a.jsxs("div",{children:[a.jsx(d,{padBottom:"s",children:a.jsx(Fe,{children:a.jsx(x,{id:"omBarnet.valgteBarn.tittel",values:{antallBarn:l}})})}),s?e.map(c=>a.jsx(d,{padBottom:"s",children:a.jsx(J,{person:c,fødselsdatoForVisning:H([c.fødselsdato]),visEtternavn:!1})},c.fnr)):a.jsx(d,{padBottom:"s",children:a.jsx(J,{person:e[0],fødselsdatoForVisning:H(m),altTekstHvisUkjentNavn:Oe(void 0,m,e.length,r),visEtternavn:!1})})]})}),a.jsx(d,{padBottom:"l",visible:t.isVisible(n.termindato)&&e.length>0,children:a.jsx(B.DatePicker,{name:n.termindato,label:o(r,"omBarnet.termindato.født"),dayPickerProps:{defaultMonth:u},minDate:f(u).subtract(1,"months").toDate(),maxDate:f(u).add(6,"months").toDate(),placeholder:"dd.mm.åååå",validate:ne(v(u),r)})})]})};try{L.displayName="ValgteRegistrerteBarn",L.__docgenInfo={description:"",displayName:"ValgteRegistrerteBarn",props:{valgteBarn:{defaultValue:null,description:"",name:"valgteBarn",required:!0,type:{name:"RegistrertBarn[]"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<OmBarnetFormField, undefined>"}}}}}catch{}const q=()=>{const e=F(),{søkersituasjon:t,barn:r}=Ie(),{arbeidsforhold:l,registrerteBarn:s}=Le(),{state:m}=Me(),{søknadGjelderEtNyttBarn:u}=m,[c,g]=_e.useState(!1),A=I(t.rolle),V=k=>!U(r)&&r.fnr!==void 0&&r.fnr.length>0?r.fnr.includes(k.fnr):!1,se=r?j(Ve(r)):void 0,le=r&&ae(r)?s.filter(k=>k.fnr===void 0&&et(k.fødselsdato,se)):[],D=!u&&!U(r)?s.filter(k=>V(k)).concat(le):void 0,T=!u&&(D===void 0||D.length===0),ie=k=>{const R=xt(k,l,!u&&!T?r:void 0,t.situasjon,T);return[Pe.setOmBarnet(R)]},{handleSubmit:de,isSubmitting:Q}=Ge(ie,z.ANNEN_FORELDER,k=>ze(k)),me=qe(),pe=We();return Ye(z.OM_BARNET),a.jsx(B.FormikWrapper,{initialValues:gt(r,l),onSubmit:de,renderForm:({values:k})=>{const S=Bt.getVisbility({...k,arbeidsforhold:l,situasjon:t.situasjon,rolle:t.rolle,valgteRegistrerteBarn:D,søknadGjelderEtNyttBarn:T||u}),R=A&&w(k.erBarnetFødt)===!1&&p(k.termindato)&&!Y(j(k.termindato)),ue=S.areAllQuestionsAnswered()&&!R;return a.jsx(Ae,{bannerTitle:o(e,"søknad.pageheading"),activeStepId:"omBarnet",pageTitle:o(e,"søknad.omBarnet"),onCancel:me,onContinueLater:pe,steps:we(e,!1),children:a.jsxs(B.Form,{includeButtons:!1,includeValidationSummary:!0,cleanup:ce=>jt(ce,S),children:[D!==void 0&&D.length>0&&a.jsx(L,{valgteBarn:D,visibility:S}),a.jsx(ot,{visibility:S,erFarEllerMedmor:A}),a.jsx(M,{søkersituasjon:t,formValues:k,visibility:S,søknadGjelderEtNyttBarn:u}),a.jsx(P,{søkersituasjon:t,formValues:k,visibility:S,søknadGjelderEtNyttBarn:u}),a.jsx(G,{søkersituasjon:t,formValues:k,visibility:S,søknadGjelderEtNyttBarn:T||u,setErForTidligTilÅSøkePåTermin:g}),a.jsx(st,{søkersituasjon:t,formValues:k,visibility:S,søknadGjelderEtNyttBarn:u,barnSøktOmFørMenIkkeRegistrert:T}),a.jsx(d,{margin:"l",children:a.jsxs(De,{children:[a.jsx($,{variant:"secondary",as:Re,to:Ce("omBarnet"),children:a.jsx(x,{id:"backlink.label"})}),ue&&a.jsx($,{type:"submit",disabled:Q||c,loading:Q,children:o(e,"søknad.gåVidere")})]})})]})})}})},qt=q;try{q.displayName="OmBarnet",q.__docgenInfo={description:"",displayName:"OmBarnet",props:{}}}catch{}export{qt as O};
//# sourceMappingURL=OmBarnet-0ebdd7f5.js.map