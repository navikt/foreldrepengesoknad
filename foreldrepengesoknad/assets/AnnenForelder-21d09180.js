import{j as r}from"./jsx-runtime-d079401a.js";import{r as Fe}from"./index-f1f2c4b1.js";import{ag as ke,Y as s,aR as fe,y as p,i as d,A as he,G as Oe,b as u,u as G,c as i,N as ve,d as H,z as Ee,x as z,l as Ie,j as Ae,S as Ne,ab as N,k as Se,aS as je,B as xe,I as Re}from"./Tidsperioden-3002fbcf.js";import{L as be}from"./index-aa2fc0fb.js";import{n as J}from"./validation-631bcf6e.js";import"./dateFormValidation-d4e4c2de.js";import{i as y,w as Pe,e as _e,x as Ue,r as De,u as Te,y as Ve}from"./barnUtils-8c22398e.js";import{S as $,A as X,F as ye}from"./FormikFileUploader-3e2ae5ac.js";import"./index-2d278ef6.js";import{i as B}from"./isFarEllerMedmor-120238ea.js";import{c as I,a as F,B as Be}from"./BackButton-4d0e617c.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{l as Me}from"./links-b36d21ab.js";import{S as Le}from"./routes-9effe5a6.js";import{s as We,g as we,u as Ge}from"./stepsConfig-b6e898fd.js";import{u as x,C as v,a as R}from"./FpDataContext-fc20d236.js";import{r as V}from"./stringUtils-cd9fb11b.js";import{Q as Ye}from"./index-47edccfa.js";import{B as Z}from"./Link-13f307fd.js";import{A as ee}from"./Alert-9862fade.js";import{v as Ce}from"./validationUtil-37025644.js";import{R as Ke}from"./RegistrertePersonalia-b32fb3b8.js";var re=(e=>(e.UOPPGITT="UOPPGITT",e.UGIFT="UGIFT",e.GIFT="GIFT",e.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",e.SKILT="SKILT",e.SEPARERT="SEPARERT",e.REGISTRERT_PARTNER="REGISTRERT_PARTNER",e.SEPARERT_PARTNER="SEPARERT_PARTNER",e.SKILT_PARTNER="SKILT_PARTNER",e.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",e))(re||{}),n=(e=>(e.kanIkkeOppgis="kanIkkeOppgis",e.harRettPåForeldrepengerINorge="harRettPåForeldrepengerINorge",e.harOppholdtSegIEØS="harOppholdtSegIEØS",e.harRettPåForeldrepengerIEØS="harRettPåForeldrepengerIEØS",e.erInformertOmSøknaden="erInformertOmSøknaden",e.fornavn="fornavn",e.etternavn="etternavn",e.fnr="fnr",e.utenlandskFnr="utenlandskFnr",e.aleneOmOmsorg="aleneOmOmsorg",e.erMorUfør="erMorUfør",e.datoForAleneomsorg="datoForAleneomsorg",e.bostedsland="bostedsland",e.dokumentasjonAvAleneomsorg="dokumentasjonAvAleneomsorg",e))(n||{});const m=ke(),b={[n.kanIkkeOppgis]:!1,[n.harRettPåForeldrepengerINorge]:s.UNANSWERED,[n.harOppholdtSegIEØS]:s.UNANSWERED,[n.harRettPåForeldrepengerIEØS]:s.UNANSWERED,[n.erInformertOmSøknaden]:s.UNANSWERED,[n.fornavn]:"",[n.etternavn]:"",[n.fnr]:"",[n.utenlandskFnr]:!1,[n.aleneOmOmsorg]:s.UNANSWERED,[n.erMorUfør]:s.UNANSWERED,[n.datoForAleneomsorg]:"",[n.bostedsland]:"",[n.dokumentasjonAvAleneomsorg]:[]},Qe=(e,o,l)=>{const t={aleneOmOmsorg:o.isVisible(n.aleneOmOmsorg)?e.aleneOmOmsorg:s.UNANSWERED,bostedsland:o.isVisible(n.bostedsland)?e.bostedsland:"",datoForAleneomsorg:o.isVisible(n.datoForAleneomsorg)?e.datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:o.isVisible(n.dokumentasjonAvAleneomsorg)?fe(e.dokumentasjonAvAleneomsorg,X.ALENEOMSORG,$.DOK_AV_ALENEOMSORG):[],erInformertOmSøknaden:o.isVisible(n.erInformertOmSøknaden)?e.erInformertOmSøknaden:s.UNANSWERED,erMorUfør:o.isVisible(n.erMorUfør)?e.erMorUfør:s.UNANSWERED,etternavn:o.isVisible(n.etternavn)?e.etternavn:"",fnr:o.isVisible(n.fnr)?e.fnr:"",fornavn:o.isVisible(n.fornavn)?e.fornavn:"",harRettPåForeldrepengerINorge:o.isVisible(n.harRettPåForeldrepengerINorge)?e.harRettPåForeldrepengerINorge:s.UNANSWERED,harOppholdtSegIEØS:o.isVisible(n.harOppholdtSegIEØS)?e.harOppholdtSegIEØS:s.UNANSWERED,harRettPåForeldrepengerIEØS:o.isVisible(n.harRettPåForeldrepengerIEØS)?e.harRettPåForeldrepengerIEØS:s.UNANSWERED,kanIkkeOppgis:o.isVisible(n.kanIkkeOppgis)?e.kanIkkeOppgis:!1,utenlandskFnr:o.isVisible(n.utenlandskFnr)?e.utenlandskFnr:!1};return l!==void 0?{...t,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:t},qe=e=>{if(e.kanIkkeOppgis===!1){const o=F(e.harOppholdtSegIEØS),l=o?F(e.harRettPåForeldrepengerIEØS):!1;return{etternavn:p(e.etternavn)?V(e.etternavn):void 0,fornavn:p(e.fornavn)?V(e.fornavn):void 0,fnr:p(e.fnr)&&e.fnr!==void 0?V(e.fnr.trim()):void 0,bostedsland:p(e.bostedsland)?e.bostedsland:void 0,utenlandskFnr:p(e.utenlandskFnr)?e.utenlandskFnr:void 0,erUfør:F(e.erMorUfør),kanIkkeOppgis:e.kanIkkeOppgis,harRettPåForeldrepengerINorge:F(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:o,harRettPåForeldrepengerIEØS:l,erInformertOmSøknaden:F(e.erInformertOmSøknaden)}}return{kanIkkeOppgis:!0}},Je=(e,o,l,t,k)=>y(e)&&p(e.fornavn)?{...b,harRettPåForeldrepengerINorge:I(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:I(e.harOppholdtSegIEØS),harRettPåForeldrepengerIEØS:I(e.harRettPåForeldrepengerIEØS),bostedsland:e.bostedsland||"",erInformertOmSøknaden:I(e.erInformertOmSøknaden),erMorUfør:I(e.erUfør),dokumentasjonAvAleneomsorg:o.dokumentasjonAvAleneomsorg||[],etternavn:e.etternavn,fornavn:e.fornavn===d(t,"annen.forelder")?"":e.fornavn,kanIkkeOppgis:e.kanIkkeOppgis,fnr:e.fnr,aleneOmOmsorg:I(k==null?void 0:k.erAleneOmOmsorg),datoForAleneomsorg:he(o.datoForAleneomsorg)||"",utenlandskFnr:e.utenlandskFnr||!1}:l!==void 0?{...b,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:Pe(e)?{...b,kanIkkeOppgis:e.kanIkkeOppgis}:{...b},He=(e,o)=>!(o||e==="medmor"),ze={[n.fornavn]:{isAnswered:({fornavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.etternavn]:{isAnswered:({etternavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.kanIkkeOppgis]:{isAnswered:({kanIkkeOppgis:e})=>p(e),isOptional:()=>!0,isIncluded:({skalOppgiPersonalia:e,søkerRolle:o,gjelderStebarnsadopsjon:l})=>e&&He(o,l)},[n.fnr]:{isAnswered:({fnr:e,utenlandskFnr:o})=>p(e)||o===!0&&p(e),isIncluded:({skalOppgiPersonalia:e,kanIkkeOppgis:o})=>e&&o!==!0,visibilityFilter:({fornavn:e,etternavn:o})=>p(e)&&p(o)},[n.utenlandskFnr]:{isAnswered:({utenlandskFnr:e})=>p(e),visibilityFilter:({kanIkkeOppgis:e,fornavn:o,etternavn:l})=>e!==!0&&p(o)&&p(l),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:()=>!0},[n.aleneOmOmsorg]:{isAnswered:({aleneOmOmsorg:e})=>e!==s.UNANSWERED,isIncluded:({kanIkkeOppgis:e})=>e===!1,visibilityFilter:({skalOppgiPersonalia:e,fnr:o,utenlandskFnr:l,bostedsland:t})=>!e||e&&p(o)&&l===!1||e&&p(t)&&l===!0},[n.dokumentasjonAvAleneomsorg]:{isAnswered:()=>!0,isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&o!=="mor",visibilityFilter:({aleneOmOmsorg:e,datoForAleneomsorg:o})=>e===s.YES||p(o)},[n.harRettPåForeldrepengerINorge]:{parentQuestion:n.aleneOmOmsorg,isAnswered:({harRettPåForeldrepengerINorge:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO},[n.harOppholdtSegIEØS]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({harOppholdtSegIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harRettPåForeldrepengerINorge:e})=>e===s.NO},[n.harRettPåForeldrepengerIEØS]:{parentQuestion:n.harOppholdtSegIEØS,isAnswered:({harRettPåForeldrepengerIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harOppholdtSegIEØS:e})=>e===s.YES},[n.erInformertOmSøknaden]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erInformertOmSøknaden:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o})=>e===s.NO&&o===s.YES},[n.erMorUfør]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erMorUfør:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o,harRettPåForeldrepengerIEØS:l,harOppholdtSegIEØS:t,søkerRolle:k})=>e===s.NO&&o===s.NO&&(t===s.NO||l===s.NO)&&B(k)},[n.datoForAleneomsorg]:{isAnswered:({datoForAleneomsorg:e})=>p(e),isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&B(o)},[n.bostedsland]:{isAnswered:({bostedsland:e})=>p(e),isIncluded:({utenlandskFnr:e})=>e===!0,visibilityFilter:({fnr:e})=>p(e)}},$e=Ye(ze);const M=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(Oe,{children:r.jsx(u,{id:"annenForelder.veileder.aleneOmsorg.forBarnet",values:{navn:o}})})}):null;try{M.displayName="AvtaleAtFarTarUtForeldrepengerVeileder",M.__docgenInfo={description:"",displayName:"AvtaleAtFarTarUtForeldrepengerVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const L=()=>{const e=G();return r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(i,{children:r.jsxs(Z,{children:[" ",d(e,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder")]})})})};try{L.displayName="FarDokumentasjonAleneomsorgVeileder",L.__docgenInfo={description:"",displayName:"FarDokumentasjonAleneomsorgVeileder",props:{}}}catch{}const Xe=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(ee,{variant:"warning",children:r.jsx(u,{id:"annenForelder.erAnnenForelderInformert.veileder",values:{navn:o}})})}):null;try{MOrientereAnnenForelderVeileder.displayName="MOrientereAnnenForelderVeileder",MOrientereAnnenForelderVeileder.__docgenInfo={description:"",displayName:"MOrientereAnnenForelderVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const Ze=(e,o)=>l=>{if(!p(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi");if(!ve(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat");if(H(l).isBefore(o,"day"))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato",{dato:Ee(o.toDate())})},er=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.fornavnPåkrevd"):z(t,o,e),rr=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.etternavnPåkrevd"):z(t,o,e);const W=({fornavn:e,erUtenlandskFnr:o,kanIkkeOppgis:l,visibility:t,gjelderAdopsjon:k,søkersFødselsnummer:S})=>{const g=G(),f=Ae("oppgiPersonalia"),h=d(g,"annenForelder.spørsmål.fornavn"),O=d(g,"annenForelder.spørsmål.etternavn"),A=d(g,"annenForelder.spørsmål.fnr",{navn:e});return r.jsxs("div",{className:f.block,children:[r.jsxs(i,{padBottom:"xl",children:[r.jsx("legend",{children:r.jsx(Ie,{children:d(g,"annenForelder.spørsmål.navn")})}),r.jsx(i,{visible:t.isVisible(n.fornavn),children:r.jsxs("div",{className:f.element("nameInputsWrapper"),children:[r.jsx(m.TextField,{className:f.element("nameInput"),name:n.fornavn,label:h,disabled:l,validate:er(g,h,l)}),r.jsx(m.TextField,{className:f.element("nameInput"),name:n.etternavn,label:d(g,"annenForelder.spørsmål.etternavn"),disabled:l,validate:rr(g,O,l)})]})}),r.jsx(i,{visible:t.isVisible(n.kanIkkeOppgis),children:r.jsx(m.Checkbox,{name:n.kanIkkeOppgis,label:k?d(g,"annenForelder.spørsmål.adoptererAlene"):d(g,"annenForelder.spørsmål.kanOppgis")})})]}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.fnr),children:r.jsx(m.TextField,{name:n.fnr,label:A,validate:Ce(g,S,A,o)})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.utenlandskFnr),children:r.jsx(m.Checkbox,{name:n.utenlandskFnr,label:d(g,"annenForelder.spørsmål.utenlandskFnr",{navn:e})})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.bostedsland),children:r.jsx(m.CountrySelect,{name:n.bostedsland,label:d(g,"annenForelder.bostedsland",{navn:e}),useAlpha3Code:!1})})]})};try{W.displayName="OppgiPersonalia",W.__docgenInfo={description:"",displayName:"OppgiPersonalia",props:{fornavn:{defaultValue:null,description:"",name:"fornavn",required:!0,type:{name:"string | undefined"}},kanIkkeOppgis:{defaultValue:null,description:"",name:"kanIkkeOppgis",required:!0,type:{name:"boolean | undefined"}},erUtenlandskFnr:{defaultValue:null,description:"",name:"erUtenlandskFnr",required:!0,type:{name:"boolean | undefined"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<AnnenForelderFormField, undefined>"}},gjelderAdopsjon:{defaultValue:null,description:"",name:"gjelderAdopsjon",required:!0,type:{name:"boolean"}},søkersFødselsnummer:{defaultValue:null,description:"",name:"søkersFødselsnummer",required:!0,type:{name:"string"}}}}}catch{}const w=({søkerInfo:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:l})=>{const t=G(),k=Ge(),[S,g]=Fe.useState(!1),{rolle:f}=J(x(v.SØKERSITUASJON)),h=J(x(v.OM_BARNET)),O=x(v.ANNEN_FORELDER)||{kanIkkeOppgis:!1},A=x(v.SØKER),ne=R(v.APP_ROUTE),oe=R(v.OM_BARNET),te=R(v.ANNEN_FORELDER),ae=R(v.SØKER),Y=H(_e(h)),P=Ue(h,e.registrerteBarn),C=P===void 0||P.length===0?void 0:P.find(a=>a.annenForelder!==void 0),E=C!==void 0?C.annenForelder:void 0,j=E===void 0||O!==void 0&&y(O)&&O.fnr!==E.fnr,K=f==="far",Q=f==="mor",se=e.person.sivilstand===void 0||e.person.sivilstand.type!==re.GIFT,_=De(h);let U="";K&&_&&(U="annenForelder.tekstOmFarskapsportal.far.del1"),Q&&_&&(U="annenForelder.tekstOmFarskapsportal.mor.del1");const le=a=>{g(!0);const c={...A||{},erAleneOmOmsorg:a.kanIkkeOppgis?!0:!!F(a.aleneOmOmsorg)},D={...h,datoForAleneomsorg:p(a.datoForAleneomsorg)?Re(a.datoForAleneomsorg):void 0,dokumentasjonAvAleneomsorg:a.dokumentasjonAvAleneomsorg&&a.dokumentasjonAvAleneomsorg.length>0?a.dokumentasjonAvAleneomsorg:void 0};oe(D),ae(c),te(qe(a)),ne(Le.UTTAKSPLAN_INFO),o()};return r.jsx(m.FormikWrapper,{initialValues:Je(O,h,E,t,A),onSubmit:le,renderForm:({values:a})=>{const c=$e.getVisbility({...a,skalOppgiPersonalia:j,søkerRolle:f,gjelderStebarnsadopsjon:!!Te(h)}),D=a.harRettPåForeldrepengerINorge===s.YES,de=y(O)?O.fnr:void 0,ie=a.fnr,q=de||ie,pe=q!==void 0&&Ve(q)==="M"||a.utenlandskFnr,me=a.harRettPåForeldrepengerINorge!==s.UNANSWERED,ge=F(a.aleneOmOmsorg)||!F(a.harRettPåForeldrepengerINorge)||F(a.harRettPåForeldrepengerINorge)&&F(a.erInformertOmSøknaden),ce=c.areAllQuestionsAnswered()&&ge,ue=(K&&me||Q&&pe&&D)&&_&&se;return r.jsx(Ne,{bannerTitle:d(t,"søknad.pageheading"),activeStepId:"annenForelder",pageTitle:d(t,"søknad.annenForelder"),onCancel:l,onContinueLater:k,steps:We(t,!1),children:r.jsxs(m.Form,{includeButtons:!1,cleanup:T=>Qe(T,c,E),includeValidationSummary:!0,children:[j&&r.jsx(i,{padBottom:"xl",children:r.jsx(W,{fornavn:a.fornavn,erUtenlandskFnr:a.utenlandskFnr,kanIkkeOppgis:a.kanIkkeOppgis,visibility:c,gjelderAdopsjon:!1,søkersFødselsnummer:e.person.fnr})}),!j&&r.jsx(i,{padBottom:"xl",children:r.jsx(Ke,{person:E,fødselsnummerForVisning:E.fnr,visEtternavn:!0})}),r.jsxs(i,{visible:c.isVisible(n.aleneOmOmsorg)||!j,padBottom:"xl",children:[r.jsx(m.RadioGroup,{name:n.aleneOmOmsorg,legend:d(t,"annenForelder.aleneOmOmsorg"),radios:[{label:"Ja",value:s.NO},{label:"Nei, jeg har aleneomsorg",value:s.YES}]}),r.jsxs(N,{header:d(t,"annenForelder.aleneOmOmsorg.apneLabel"),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(Se,{children:d(t,"annenForelder.aleneOmOmsorg.del1")})}),r.jsx(Z,{children:d(t,"annenForelder.aleneOmOmsorg.del2")})]}),r.jsx(M,{visible:!B(f)&&a.aleneOmOmsorg===s.YES,annenForelderNavn:a.fornavn})]}),!a.kanIkkeOppgis&&r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.datoForAleneomsorg),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(m.DatePicker,{name:n.datoForAleneomsorg,label:d(t,"annenForelder.datoForAleneomsorg"),minDate:Y.toDate(),validate:Ze(t,Y),placeholder:"dd.mm.åååå"})}),r.jsx(L,{}),r.jsxs(i,{padBottom:"xl",children:[r.jsx(ye,{legend:"Dokumentasjon for aleneomsorg",label:d(t,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp"),name:n.dokumentasjonAvAleneomsorg,attachments:a.dokumentasjonAvAleneomsorg||[],attachmentType:X.ALENEOMSORG,skjemanummer:$.DOK_AV_ALENEOMSORG})," "]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerINorge),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerINorge,legend:d(t,"annenForelder.harRettPåForeldrepengerINorge",{navn:a.fornavn})}),r.jsxs(N,{header:d(t,"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"m",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"})}),r.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),r.jsx(i,{padBottom:"l",visible:c.isVisible(n.harRettPåForeldrepengerINorge)&&ue,children:r.jsxs(ee,{variant:"info",children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:U,values:{a:T=>r.jsx("a",{href:Me.farskapsportal,className:"lenke",rel:"noreferrer",target:"_blank",children:T})}})}),r.jsx(i,{children:r.jsx(u,{id:"annenForelder.tekstOmFarskapsportal.mor.far.del2"})})]})}),r.jsxs(i,{padBottom:"l",visible:c.isVisible(n.harOppholdtSegIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harOppholdtSegIEØS,legend:d(t,"annenForelder.harOppholdtSegIEØS",{navn:a.fornavn})}),r.jsx(N,{header:d(t,"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"),children:r.jsx(u,{id:"annenForelder.harOppholdtSegIEØS.veileder",values:{navn:a.fornavn}})})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerIEØS,legend:d(t,"annenForelder.harRettPåForeldrepengerIEØS",{navn:a.fornavn})}),r.jsxs(N,{header:d(t,"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1",values:{navn:a.fornavn}})}),r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2",values:{navn:a.fornavn}})}),r.jsx(i,{children:r.jsx(be,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link",values:{navn:a.fornavn}})})})]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erInformertOmSøknaden),children:[r.jsx(m.YesOrNoQuestion,{name:n.erInformertOmSøknaden,legend:d(t,"annenForelder.spørsmål.erAnnenForelderInformert",{navn:a.fornavn})}),r.jsx(Xe,{visible:a.erInformertOmSøknaden===s.NO,annenForelderNavn:a.fornavn})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erMorUfør),children:[r.jsx(m.YesOrNoQuestion,{name:n.erMorUfør,legend:d(t,"annenForelder.erMorUfør",{navn:a.fornavn})}),r.jsx(N,{header:d(t,"annenForelder.erMorUfør.veileder.apneLabel"),children:r.jsx(i,{children:r.jsx(u,{id:"annenForelder.erMorUfør.veileder",values:{navnAnnenForelder:a.fornavn}})})})]}),r.jsx(i,{margin:"l",children:r.jsxs(je,{children:[r.jsx(Be,{mellomlagreSøknadOgNaviger:o,route:we("annenForelder")}),ce&&r.jsx(xe,{type:"submit",disabled:S,loading:S,children:d(t,"søknad.gåVidere")})]})})]})})}})},Sr=w;try{w.displayName="AnnenForelder",w.__docgenInfo={description:"",displayName:"AnnenForelder",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{Sr as A};
