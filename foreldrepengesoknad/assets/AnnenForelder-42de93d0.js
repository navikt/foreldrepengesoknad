import{j as r}from"./jsx-runtime-1caa8f64.js";import{az as Oe,Y as s,aL as ee,C as p,i as d,Q as Ee,G as he,b as u,u as Q,c as i,W as ve,d as re,q as Ae,E as ne,L as Ne,l as Ie,S as Se,D as S,k as je,I as Re}from"./dates-c7d75be6.js";import{r as xe}from"./index-1cdf6ce0.js";import{L as be}from"./index-49077f34.js";import{k as L,x as Pe,o as _e,y as Ue,v as De,u as Ve,z as Te}from"./barnUtils-397fbc9c.js";import"./index-753920cd.js";import{i as G}from"./isFarEllerMedmor-120238ea.js";import{c as N,a as F,Q as ye}from"./index-0bc8900a.js";import{S as P}from"./skjemanummer-4d711b8d.js";import{A as W,F as Me}from"./FormikFileUploader-6e7689e8.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{l as Be}from"./links-4d39192e.js";import{A as Le}from"./AttachmentMetadata-003d83db.js";import{A as oe,S as Ge}from"./IntlProvider-1d845c21.js";import{n as Z}from"./dateFormValidation-996d41a1.js";import{u as We,a as we}from"./useFpNavigator-d887b885.js";import{u as j,C as O,a as x}from"./FpDataContext-9c963fd7.js";import{R as Ce}from"./RegistrertePersonalia-f8c4c654.js";import{r as B}from"./stringUtils-17aed94c.js";import{B as te}from"./Link-d47e444a.js";import{v as Ke}from"./validationUtil-21b57974.js";var ae=(e=>(e.UOPPGITT="UOPPGITT",e.UGIFT="UGIFT",e.GIFT="GIFT",e.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",e.SKILT="SKILT",e.SEPARERT="SEPARERT",e.REGISTRERT_PARTNER="REGISTRERT_PARTNER",e.SEPARERT_PARTNER="SEPARERT_PARTNER",e.SKILT_PARTNER="SKILT_PARTNER",e.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",e))(ae||{}),n=(e=>(e.kanIkkeOppgis="kanIkkeOppgis",e.harRettPåForeldrepengerINorge="harRettPåForeldrepengerINorge",e.harOppholdtSegIEØS="harOppholdtSegIEØS",e.harRettPåForeldrepengerIEØS="harRettPåForeldrepengerIEØS",e.erInformertOmSøknaden="erInformertOmSøknaden",e.fornavn="fornavn",e.etternavn="etternavn",e.fnr="fnr",e.utenlandskFnr="utenlandskFnr",e.aleneOmOmsorg="aleneOmOmsorg",e.erMorUfør="erMorUfør",e.datoForAleneomsorg="datoForAleneomsorg",e.bostedsland="bostedsland",e.dokumentasjonAvAleneomsorg="dokumentasjonAvAleneomsorg",e))(n||{});const m=Oe(),b={[n.kanIkkeOppgis]:!1,[n.harRettPåForeldrepengerINorge]:s.UNANSWERED,[n.harOppholdtSegIEØS]:s.UNANSWERED,[n.harRettPåForeldrepengerIEØS]:s.UNANSWERED,[n.erInformertOmSøknaden]:s.UNANSWERED,[n.fornavn]:"",[n.etternavn]:"",[n.fnr]:"",[n.utenlandskFnr]:!1,[n.aleneOmOmsorg]:s.UNANSWERED,[n.erMorUfør]:s.UNANSWERED,[n.datoForAleneomsorg]:"",[n.bostedsland]:"",[n.dokumentasjonAvAleneomsorg]:[]},Ye=(e,o,l)=>{const t={aleneOmOmsorg:o.isVisible(n.aleneOmOmsorg)?e.aleneOmOmsorg:s.UNANSWERED,bostedsland:o.isVisible(n.bostedsland)?e.bostedsland:"",datoForAleneomsorg:o.isVisible(n.datoForAleneomsorg)?e.datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:o.isVisible(n.dokumentasjonAvAleneomsorg)?ee(e.dokumentasjonAvAleneomsorg,W.ALENEOMSORG,P.DOK_AV_ALENEOMSORG):[],erInformertOmSøknaden:o.isVisible(n.erInformertOmSøknaden)?e.erInformertOmSøknaden:s.UNANSWERED,erMorUfør:o.isVisible(n.erMorUfør)?e.erMorUfør:s.UNANSWERED,etternavn:o.isVisible(n.etternavn)?e.etternavn:"",fnr:o.isVisible(n.fnr)?e.fnr:"",fornavn:o.isVisible(n.fornavn)?e.fornavn:"",harRettPåForeldrepengerINorge:o.isVisible(n.harRettPåForeldrepengerINorge)?e.harRettPåForeldrepengerINorge:s.UNANSWERED,harOppholdtSegIEØS:o.isVisible(n.harOppholdtSegIEØS)?e.harOppholdtSegIEØS:s.UNANSWERED,harRettPåForeldrepengerIEØS:o.isVisible(n.harRettPåForeldrepengerIEØS)?e.harRettPåForeldrepengerIEØS:s.UNANSWERED,kanIkkeOppgis:o.isVisible(n.kanIkkeOppgis)?e.kanIkkeOppgis:!1,utenlandskFnr:o.isVisible(n.utenlandskFnr)?e.utenlandskFnr:!1};return l!==void 0?{...t,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:t},Qe=e=>{if(e.kanIkkeOppgis===!1){const o=F(e.harOppholdtSegIEØS),l=o?F(e.harRettPåForeldrepengerIEØS):!1;return{etternavn:p(e.etternavn)?B(e.etternavn):void 0,fornavn:p(e.fornavn)?B(e.fornavn):void 0,fnr:p(e.fnr)&&e.fnr!==void 0?B(e.fnr.trim()):void 0,bostedsland:p(e.bostedsland)?e.bostedsland:void 0,utenlandskFnr:p(e.utenlandskFnr)?e.utenlandskFnr:void 0,erUfør:F(e.erMorUfør),kanIkkeOppgis:e.kanIkkeOppgis,harRettPåForeldrepengerINorge:F(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:o,harRettPåForeldrepengerIEØS:l,erInformertOmSøknaden:F(e.erInformertOmSøknaden)}}return{kanIkkeOppgis:!0}},qe=(e,o,l,t,f)=>L(e)&&p(e.fornavn)?{...b,harRettPåForeldrepengerINorge:N(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:N(e.harOppholdtSegIEØS),harRettPåForeldrepengerIEØS:N(e.harRettPåForeldrepengerIEØS),bostedsland:e.bostedsland||"",erInformertOmSøknaden:N(e.erInformertOmSøknaden),erMorUfør:N(e.erUfør),etternavn:e.etternavn,fornavn:e.fornavn===d(t,"annen.forelder")?"":e.fornavn,kanIkkeOppgis:e.kanIkkeOppgis,fnr:e.fnr,aleneOmOmsorg:N(f==null?void 0:f.erAleneOmOmsorg),datoForAleneomsorg:Ee(o.datoForAleneomsorg)||"",utenlandskFnr:e.utenlandskFnr||!1}:l!==void 0?{...b,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:Pe(e)?{...b,kanIkkeOppgis:e.kanIkkeOppgis}:{...b},Je=(e,o)=>!(o||e==="medmor"),ze={[n.fornavn]:{isAnswered:({fornavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.etternavn]:{isAnswered:({etternavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.kanIkkeOppgis]:{isAnswered:({kanIkkeOppgis:e})=>p(e),isOptional:()=>!0,isIncluded:({skalOppgiPersonalia:e,søkerRolle:o,gjelderStebarnsadopsjon:l})=>e&&Je(o,l)},[n.fnr]:{isAnswered:({fnr:e,utenlandskFnr:o})=>p(e)||o===!0&&p(e),isIncluded:({skalOppgiPersonalia:e,kanIkkeOppgis:o})=>e&&o!==!0,visibilityFilter:({fornavn:e,etternavn:o})=>p(e)&&p(o)},[n.utenlandskFnr]:{isAnswered:({utenlandskFnr:e})=>p(e),visibilityFilter:({kanIkkeOppgis:e,fornavn:o,etternavn:l})=>e!==!0&&p(o)&&p(l),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:()=>!0},[n.aleneOmOmsorg]:{isAnswered:({aleneOmOmsorg:e})=>e!==s.UNANSWERED,isIncluded:({kanIkkeOppgis:e})=>e===!1,visibilityFilter:({skalOppgiPersonalia:e,fnr:o,utenlandskFnr:l,bostedsland:t})=>!e||e&&p(o)&&l===!1||e&&p(t)&&l===!0},[n.dokumentasjonAvAleneomsorg]:{isAnswered:()=>!0,isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&o!=="mor",visibilityFilter:({aleneOmOmsorg:e,datoForAleneomsorg:o})=>e===s.YES||p(o)},[n.harRettPåForeldrepengerINorge]:{parentQuestion:n.aleneOmOmsorg,isAnswered:({harRettPåForeldrepengerINorge:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO},[n.harOppholdtSegIEØS]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({harOppholdtSegIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harRettPåForeldrepengerINorge:e})=>e===s.NO},[n.harRettPåForeldrepengerIEØS]:{parentQuestion:n.harOppholdtSegIEØS,isAnswered:({harRettPåForeldrepengerIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harOppholdtSegIEØS:e})=>e===s.YES},[n.erInformertOmSøknaden]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erInformertOmSøknaden:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o})=>e===s.NO&&o===s.YES},[n.erMorUfør]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erMorUfør:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o,harRettPåForeldrepengerIEØS:l,harOppholdtSegIEØS:t,søkerRolle:f})=>e===s.NO&&o===s.NO&&(t===s.NO||l===s.NO)&&G(f)},[n.datoForAleneomsorg]:{isAnswered:({datoForAleneomsorg:e})=>p(e),isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&G(o)},[n.bostedsland]:{isAnswered:({bostedsland:e})=>p(e),isIncluded:({utenlandskFnr:e})=>e===!0,visibilityFilter:({fnr:e})=>p(e)}},He=ye(ze);const w=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(he,{children:r.jsx(u,{id:"annenForelder.veileder.aleneOmsorg.forBarnet",values:{navn:o}})})}):null;try{w.displayName="AvtaleAtFarTarUtForeldrepengerVeileder",w.__docgenInfo={description:"",displayName:"AvtaleAtFarTarUtForeldrepengerVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const C=()=>{const e=Q();return r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(i,{children:r.jsxs(te,{children:[" ",d(e,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder")]})})})};try{C.displayName="FarDokumentasjonAleneomsorgVeileder",C.__docgenInfo={description:"",displayName:"FarDokumentasjonAleneomsorgVeileder",props:{}}}catch{}const $e=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(oe,{variant:"warning",children:r.jsx(u,{id:"annenForelder.erAnnenForelderInformert.veileder",values:{navn:o}})})}):null;try{MOrientereAnnenForelderVeileder.displayName="MOrientereAnnenForelderVeileder",MOrientereAnnenForelderVeileder.__docgenInfo={description:"",displayName:"MOrientereAnnenForelderVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const Xe=(e,o)=>l=>{if(!p(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi");if(!ve(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat");if(re(l).isBefore(o,"day"))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato",{dato:Ae(o.toDate())})},Ze=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.fornavnPåkrevd"):ne(t,o,e),er=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.etternavnPåkrevd"):ne(t,o,e);const K=({fornavn:e,erUtenlandskFnr:o,kanIkkeOppgis:l,visibility:t,gjelderAdopsjon:f,søkersFødselsnummer:I})=>{const g=Q(),v=Ie("oppgiPersonalia"),h=d(g,"annenForelder.spørsmål.fornavn"),E=d(g,"annenForelder.spørsmål.etternavn"),k=d(g,"annenForelder.spørsmål.fnr",{navn:e});return r.jsxs("div",{className:v.block,children:[r.jsxs(i,{padBottom:"xl",children:[r.jsx("legend",{children:r.jsx(Ne,{children:d(g,"annenForelder.spørsmål.navn")})}),r.jsx(i,{visible:t.isVisible(n.fornavn),children:r.jsxs("div",{className:v.element("nameInputsWrapper"),children:[r.jsx(m.TextField,{className:v.element("nameInput"),name:n.fornavn,label:h,disabled:l,validate:Ze(g,h,l)}),r.jsx(m.TextField,{className:v.element("nameInput"),name:n.etternavn,label:d(g,"annenForelder.spørsmål.etternavn"),disabled:l,validate:er(g,E,l)})]})}),r.jsx(i,{visible:t.isVisible(n.kanIkkeOppgis),children:r.jsx(m.Checkbox,{name:n.kanIkkeOppgis,label:f?d(g,"annenForelder.spørsmål.adoptererAlene"):d(g,"annenForelder.spørsmål.kanOppgis")})})]}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.fnr),children:r.jsx(m.TextField,{name:n.fnr,label:k,validate:Ke(g,I,k,o)})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.utenlandskFnr),children:r.jsx(m.Checkbox,{name:n.utenlandskFnr,label:d(g,"annenForelder.spørsmål.utenlandskFnr",{navn:e})})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.bostedsland),children:r.jsx(m.CountrySelect,{name:n.bostedsland,label:d(g,"annenForelder.bostedsland",{navn:e}),useAlpha3Code:!1})})]})};try{K.displayName="OppgiPersonalia",K.__docgenInfo={description:"",displayName:"OppgiPersonalia",props:{fornavn:{defaultValue:null,description:"",name:"fornavn",required:!0,type:{name:"string | undefined"}},kanIkkeOppgis:{defaultValue:null,description:"",name:"kanIkkeOppgis",required:!0,type:{name:"boolean | undefined"}},erUtenlandskFnr:{defaultValue:null,description:"",name:"erUtenlandskFnr",required:!0,type:{name:"boolean | undefined"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<AnnenForelderFormField, undefined>"}},gjelderAdopsjon:{defaultValue:null,description:"",name:"gjelderAdopsjon",required:!0,type:{name:"boolean"}},søkersFødselsnummer:{defaultValue:null,description:"",name:"søkersFødselsnummer",required:!0,type:{name:"string"}}}}}catch{}const Y=({søker:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:l})=>{const t=Q(),f=We(),I=we(o),[g,v]=xe.useState(!1),{rolle:h}=Z(j(O.SØKERSITUASJON)),E=Z(j(O.OM_BARNET)),k=j(O.ANNEN_FORELDER)||{kanIkkeOppgis:!1},se=j(O.VEDLEGG)||{},le=x(O.OM_BARNET),de=x(O.ANNEN_FORELDER),ie=x(O.VEDLEGG),pe=x(O.SØKER_DATA),q=j(O.SØKER_DATA),J=re(_e(E)),_=Ue(E,e.barn),z=_===void 0||_.length===0?void 0:_.find(a=>a.annenForelder!==void 0),A=z!==void 0?z.annenForelder:void 0,R=A===void 0||k!==void 0&&L(k)&&k.fnr!==A.fnr,H=h==="far",$=h==="mor",me=e.sivilstand===void 0||e.sivilstand.type!==ae.GIFT,U=De(E);let D="";H&&U&&(D="annenForelder.tekstOmFarskapsportal.far.del1"),$&&U&&(D="annenForelder.tekstOmFarskapsportal.mor.del1");const ge=a=>{v(!0);const c={...q||{},erAleneOmOmsorg:a.kanIkkeOppgis?!0:!!F(a.aleneOmOmsorg)},V={...E,datoForAleneomsorg:p(a.datoForAleneomsorg)?Re(a.datoForAleneomsorg):void 0},T=a.dokumentasjonAvAleneomsorg&&a.dokumentasjonAvAleneomsorg.length>0?ee(a.dokumentasjonAvAleneomsorg,W.ALENEOMSORG,P.DOK_AV_ALENEOMSORG,{type:Le.BARN}):[],y={...se,[P.DOK_AV_ALENEOMSORG]:T};return le(V),de(Qe(a)),ie(y),pe(c),I.goToNextDefaultStep()};return r.jsx(m.FormikWrapper,{initialValues:qe(k,E,A,t,q),onSubmit:ge,renderForm:({values:a})=>{const c=He.getVisbility({...a,skalOppgiPersonalia:R,søkerRolle:h,gjelderStebarnsadopsjon:!!Ve(E)}),V=a.harRettPåForeldrepengerINorge===s.YES,T=L(k)?k.fnr:void 0,y=a.fnr,X=T||y,ce=X!==void 0&&Te(X)==="M"||a.utenlandskFnr,ue=a.harRettPåForeldrepengerINorge!==s.UNANSWERED,Fe=F(a.aleneOmOmsorg)||!F(a.harRettPåForeldrepengerINorge)||F(a.harRettPåForeldrepengerINorge)&&F(a.erInformertOmSøknaden),fe=c.areAllQuestionsAnswered()&&Fe,ke=(H&&ue||$&&ce&&V)&&U&&me;return r.jsx(Se,{bannerTitle:d(t,"søknad.pageheading"),onCancel:l,onContinueLater:I.fortsettSøknadSenere,steps:f,children:r.jsxs(m.Form,{includeButtons:!1,cleanup:M=>Ye(M,c,A),includeValidationSummary:!0,children:[R&&r.jsx(i,{padBottom:"xl",children:r.jsx(K,{fornavn:a.fornavn,erUtenlandskFnr:a.utenlandskFnr,kanIkkeOppgis:a.kanIkkeOppgis,visibility:c,gjelderAdopsjon:!1,søkersFødselsnummer:e.fnr})}),!R&&r.jsx(i,{padBottom:"xl",children:r.jsx(Ce,{person:A,fødselsnummerForVisning:A.fnr,visEtternavn:!0})}),r.jsxs(i,{visible:c.isVisible(n.aleneOmOmsorg)||!R,padBottom:"xl",children:[r.jsx(m.RadioGroup,{name:n.aleneOmOmsorg,legend:d(t,"annenForelder.aleneOmOmsorg"),radios:[{label:"Ja",value:s.NO},{label:"Nei, jeg har aleneomsorg",value:s.YES}]}),r.jsxs(S,{header:d(t,"annenForelder.aleneOmOmsorg.apneLabel"),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(je,{children:d(t,"annenForelder.aleneOmOmsorg.del1")})}),r.jsx(te,{children:d(t,"annenForelder.aleneOmOmsorg.del2")})]}),r.jsx(w,{visible:!G(h)&&a.aleneOmOmsorg===s.YES,annenForelderNavn:a.fornavn})]}),!a.kanIkkeOppgis&&r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.datoForAleneomsorg),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(m.DatePicker,{name:n.datoForAleneomsorg,label:d(t,"annenForelder.datoForAleneomsorg"),minDate:J.toDate(),validate:Xe(t,J),placeholder:"dd.mm.åååå"})}),r.jsx(C,{}),r.jsxs(i,{padBottom:"xl",children:[r.jsx(Me,{legend:"Dokumentasjon for aleneomsorg",label:d(t,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp"),name:n.dokumentasjonAvAleneomsorg,attachments:a.dokumentasjonAvAleneomsorg||[],attachmentType:W.ALENEOMSORG,skjemanummer:P.DOK_AV_ALENEOMSORG})," "]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerINorge),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerINorge,legend:d(t,"annenForelder.harRettPåForeldrepengerINorge",{navn:a.fornavn})}),r.jsxs(S,{header:d(t,"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"m",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"})}),r.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),r.jsx(i,{padBottom:"l",visible:c.isVisible(n.harRettPåForeldrepengerINorge)&&ke,children:r.jsxs(oe,{variant:"info",children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:D,values:{a:M=>r.jsx("a",{href:Be.farskapsportal,className:"lenke",rel:"noreferrer",target:"_blank",children:M})}})}),r.jsx(i,{children:r.jsx(u,{id:"annenForelder.tekstOmFarskapsportal.mor.far.del2"})})]})}),r.jsxs(i,{padBottom:"l",visible:c.isVisible(n.harOppholdtSegIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harOppholdtSegIEØS,legend:d(t,"annenForelder.harOppholdtSegIEØS",{navn:a.fornavn})}),r.jsx(S,{header:d(t,"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"),children:r.jsx(u,{id:"annenForelder.harOppholdtSegIEØS.veileder",values:{navn:a.fornavn}})})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerIEØS,legend:d(t,"annenForelder.harRettPåForeldrepengerIEØS",{navn:a.fornavn})}),r.jsxs(S,{header:d(t,"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1",values:{navn:a.fornavn}})}),r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2",values:{navn:a.fornavn}})}),r.jsx(i,{children:r.jsx(be,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link",values:{navn:a.fornavn}})})})]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erInformertOmSøknaden),children:[r.jsx(m.YesOrNoQuestion,{name:n.erInformertOmSøknaden,legend:d(t,"annenForelder.spørsmål.erAnnenForelderInformert",{navn:a.fornavn})}),r.jsx($e,{visible:a.erInformertOmSøknaden===s.NO,annenForelderNavn:a.fornavn})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erMorUfør),children:[r.jsx(m.YesOrNoQuestion,{name:n.erMorUfør,legend:d(t,"annenForelder.erMorUfør",{navn:a.fornavn})}),r.jsx(S,{header:d(t,"annenForelder.erMorUfør.veileder.apneLabel"),children:r.jsx(i,{children:r.jsx(u,{id:"annenForelder.erMorUfør.veileder",values:{navnAnnenForelder:a.fornavn}})})})]}),r.jsx(i,{margin:"l",children:r.jsx(Ge,{isNexButtonVisible:fe,goToPreviousStep:I.goToPreviousDefaultStep,isDisabledAndLoading:g})})]})})}})},Nr=Y;try{Y.displayName="AnnenForelder",Y.__docgenInfo={description:"",displayName:"AnnenForelder",props:{søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{Nr as A};
