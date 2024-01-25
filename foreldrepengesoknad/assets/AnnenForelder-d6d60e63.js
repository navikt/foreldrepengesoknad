import{j as r}from"./jsx-runtime-1caa8f64.js";import{r as Fe}from"./index-1cdf6ce0.js";import{ay as fe,Y as s,aJ as ke,w as p,i as d,x as ve,G as he,b as u,u as G,c as i,Q as Oe,d as z,s as Ee,v as $,L as Ie,k as Ne,S as Ae,N as S,j as Se,I as je}from"./Tidsperioden-bf461132.js";import{L as xe}from"./index-0aecae9c.js";import{n as H}from"./dateFormValidation-3a770efe.js";import{i as y,x as Re,o as be,y as Pe,t as _e,s as Ue,z as De}from"./barnUtils-fb28b5ed.js";import{S as X,A as Z,F as Te}from"./FormikFileUploader-9bd10cdc.js";import"./index-753920cd.js";import{i as B}from"./isFarEllerMedmor-120238ea.js";import{c as N,a as F,Q as Ve}from"./index-004a6d92.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{l as ye}from"./links-4d39192e.js";import{A as ee,S as Be}from"./IntlProvider-d9dad12d.js";import"./dates-ba1dca1c.js";import{u as Me,a as Le}from"./useFpNavigator-dc4587e4.js";import{u as x,C as O,a as T}from"./FpDataContext-c0784ba8.js";import{r as V}from"./stringUtils-2c07ad76.js";import{B as re}from"./Link-d47e444a.js";import{v as we}from"./validationUtil-baf525b7.js";import{R as We}from"./RegistrertePersonalia-a025d995.js";var ne=(e=>(e.UOPPGITT="UOPPGITT",e.UGIFT="UGIFT",e.GIFT="GIFT",e.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",e.SKILT="SKILT",e.SEPARERT="SEPARERT",e.REGISTRERT_PARTNER="REGISTRERT_PARTNER",e.SEPARERT_PARTNER="SEPARERT_PARTNER",e.SKILT_PARTNER="SKILT_PARTNER",e.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",e))(ne||{}),n=(e=>(e.kanIkkeOppgis="kanIkkeOppgis",e.harRettPåForeldrepengerINorge="harRettPåForeldrepengerINorge",e.harOppholdtSegIEØS="harOppholdtSegIEØS",e.harRettPåForeldrepengerIEØS="harRettPåForeldrepengerIEØS",e.erInformertOmSøknaden="erInformertOmSøknaden",e.fornavn="fornavn",e.etternavn="etternavn",e.fnr="fnr",e.utenlandskFnr="utenlandskFnr",e.aleneOmOmsorg="aleneOmOmsorg",e.erMorUfør="erMorUfør",e.datoForAleneomsorg="datoForAleneomsorg",e.bostedsland="bostedsland",e.dokumentasjonAvAleneomsorg="dokumentasjonAvAleneomsorg",e))(n||{});const m=fe(),R={[n.kanIkkeOppgis]:!1,[n.harRettPåForeldrepengerINorge]:s.UNANSWERED,[n.harOppholdtSegIEØS]:s.UNANSWERED,[n.harRettPåForeldrepengerIEØS]:s.UNANSWERED,[n.erInformertOmSøknaden]:s.UNANSWERED,[n.fornavn]:"",[n.etternavn]:"",[n.fnr]:"",[n.utenlandskFnr]:!1,[n.aleneOmOmsorg]:s.UNANSWERED,[n.erMorUfør]:s.UNANSWERED,[n.datoForAleneomsorg]:"",[n.bostedsland]:"",[n.dokumentasjonAvAleneomsorg]:[]},Ge=(e,o,l)=>{const t={aleneOmOmsorg:o.isVisible(n.aleneOmOmsorg)?e.aleneOmOmsorg:s.UNANSWERED,bostedsland:o.isVisible(n.bostedsland)?e.bostedsland:"",datoForAleneomsorg:o.isVisible(n.datoForAleneomsorg)?e.datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:o.isVisible(n.dokumentasjonAvAleneomsorg)?ke(e.dokumentasjonAvAleneomsorg,Z.ALENEOMSORG,X.DOK_AV_ALENEOMSORG):[],erInformertOmSøknaden:o.isVisible(n.erInformertOmSøknaden)?e.erInformertOmSøknaden:s.UNANSWERED,erMorUfør:o.isVisible(n.erMorUfør)?e.erMorUfør:s.UNANSWERED,etternavn:o.isVisible(n.etternavn)?e.etternavn:"",fnr:o.isVisible(n.fnr)?e.fnr:"",fornavn:o.isVisible(n.fornavn)?e.fornavn:"",harRettPåForeldrepengerINorge:o.isVisible(n.harRettPåForeldrepengerINorge)?e.harRettPåForeldrepengerINorge:s.UNANSWERED,harOppholdtSegIEØS:o.isVisible(n.harOppholdtSegIEØS)?e.harOppholdtSegIEØS:s.UNANSWERED,harRettPåForeldrepengerIEØS:o.isVisible(n.harRettPåForeldrepengerIEØS)?e.harRettPåForeldrepengerIEØS:s.UNANSWERED,kanIkkeOppgis:o.isVisible(n.kanIkkeOppgis)?e.kanIkkeOppgis:!1,utenlandskFnr:o.isVisible(n.utenlandskFnr)?e.utenlandskFnr:!1};return l!==void 0?{...t,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:t},Ce=e=>{if(e.kanIkkeOppgis===!1){const o=F(e.harOppholdtSegIEØS),l=o?F(e.harRettPåForeldrepengerIEØS):!1;return{etternavn:p(e.etternavn)?V(e.etternavn):void 0,fornavn:p(e.fornavn)?V(e.fornavn):void 0,fnr:p(e.fnr)&&e.fnr!==void 0?V(e.fnr.trim()):void 0,bostedsland:p(e.bostedsland)?e.bostedsland:void 0,utenlandskFnr:p(e.utenlandskFnr)?e.utenlandskFnr:void 0,erUfør:F(e.erMorUfør),kanIkkeOppgis:e.kanIkkeOppgis,harRettPåForeldrepengerINorge:F(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:o,harRettPåForeldrepengerIEØS:l,erInformertOmSøknaden:F(e.erInformertOmSøknaden)}}return{kanIkkeOppgis:!0}},Ye=(e,o,l,t,f)=>y(e)&&p(e.fornavn)?{...R,harRettPåForeldrepengerINorge:N(e.harRettPåForeldrepengerINorge),harOppholdtSegIEØS:N(e.harOppholdtSegIEØS),harRettPåForeldrepengerIEØS:N(e.harRettPåForeldrepengerIEØS),bostedsland:e.bostedsland||"",erInformertOmSøknaden:N(e.erInformertOmSøknaden),erMorUfør:N(e.erUfør),dokumentasjonAvAleneomsorg:o.dokumentasjonAvAleneomsorg||[],etternavn:e.etternavn,fornavn:e.fornavn===d(t,"annen.forelder")?"":e.fornavn,kanIkkeOppgis:e.kanIkkeOppgis,fnr:e.fnr,aleneOmOmsorg:N(f==null?void 0:f.erAleneOmOmsorg),datoForAleneomsorg:ve(o.datoForAleneomsorg)||"",utenlandskFnr:e.utenlandskFnr||!1}:l!==void 0?{...R,fornavn:l.fornavn,etternavn:l.etternavn,fnr:l.fnr}:Re(e)?{...R,kanIkkeOppgis:e.kanIkkeOppgis}:{...R},Qe=(e,o)=>!(o||e==="medmor"),Ke={[n.fornavn]:{isAnswered:({fornavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.etternavn]:{isAnswered:({etternavn:e})=>p(e),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:({kanIkkeOppgis:e})=>e===!0},[n.kanIkkeOppgis]:{isAnswered:({kanIkkeOppgis:e})=>p(e),isOptional:()=>!0,isIncluded:({skalOppgiPersonalia:e,søkerRolle:o,gjelderStebarnsadopsjon:l})=>e&&Qe(o,l)},[n.fnr]:{isAnswered:({fnr:e,utenlandskFnr:o})=>p(e)||o===!0&&p(e),isIncluded:({skalOppgiPersonalia:e,kanIkkeOppgis:o})=>e&&o!==!0,visibilityFilter:({fornavn:e,etternavn:o})=>p(e)&&p(o)},[n.utenlandskFnr]:{isAnswered:({utenlandskFnr:e})=>p(e),visibilityFilter:({kanIkkeOppgis:e,fornavn:o,etternavn:l})=>e!==!0&&p(o)&&p(l),isIncluded:({skalOppgiPersonalia:e})=>e,isOptional:()=>!0},[n.aleneOmOmsorg]:{isAnswered:({aleneOmOmsorg:e})=>e!==s.UNANSWERED,isIncluded:({kanIkkeOppgis:e})=>e===!1,visibilityFilter:({skalOppgiPersonalia:e,fnr:o,utenlandskFnr:l,bostedsland:t})=>!e||e&&p(o)&&l===!1||e&&p(t)&&l===!0},[n.dokumentasjonAvAleneomsorg]:{isAnswered:()=>!0,isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&o!=="mor",visibilityFilter:({aleneOmOmsorg:e,datoForAleneomsorg:o})=>e===s.YES||p(o)},[n.harRettPåForeldrepengerINorge]:{parentQuestion:n.aleneOmOmsorg,isAnswered:({harRettPåForeldrepengerINorge:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO},[n.harOppholdtSegIEØS]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({harOppholdtSegIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harRettPåForeldrepengerINorge:e})=>e===s.NO},[n.harRettPåForeldrepengerIEØS]:{parentQuestion:n.harOppholdtSegIEØS,isAnswered:({harRettPåForeldrepengerIEØS:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e})=>e===s.NO,isIncluded:({harOppholdtSegIEØS:e})=>e===s.YES},[n.erInformertOmSøknaden]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erInformertOmSøknaden:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o})=>e===s.NO&&o===s.YES},[n.erMorUfør]:{parentQuestion:n.harRettPåForeldrepengerINorge,isAnswered:({erMorUfør:e})=>e!==s.UNANSWERED,visibilityFilter:({aleneOmOmsorg:e,harRettPåForeldrepengerINorge:o,harRettPåForeldrepengerIEØS:l,harOppholdtSegIEØS:t,søkerRolle:f})=>e===s.NO&&o===s.NO&&(t===s.NO||l===s.NO)&&B(f)},[n.datoForAleneomsorg]:{isAnswered:({datoForAleneomsorg:e})=>p(e),isIncluded:({aleneOmOmsorg:e,søkerRolle:o})=>e===s.YES&&B(o)},[n.bostedsland]:{isAnswered:({bostedsland:e})=>p(e),isIncluded:({utenlandskFnr:e})=>e===!0,visibilityFilter:({fnr:e})=>p(e)}},qe=Ve(Ke);const M=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(he,{children:r.jsx(u,{id:"annenForelder.veileder.aleneOmsorg.forBarnet",values:{navn:o}})})}):null;try{M.displayName="AvtaleAtFarTarUtForeldrepengerVeileder",M.__docgenInfo={description:"",displayName:"AvtaleAtFarTarUtForeldrepengerVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const L=()=>{const e=G();return r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(i,{children:r.jsxs(re,{children:[" ",d(e,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder")]})})})};try{L.displayName="FarDokumentasjonAleneomsorgVeileder",L.__docgenInfo={description:"",displayName:"FarDokumentasjonAleneomsorgVeileder",props:{}}}catch{}const Je=({visible:e,annenForelderNavn:o})=>e?r.jsx("div",{className:"annenForelderVeileder",children:r.jsx(ee,{variant:"warning",children:r.jsx(u,{id:"annenForelder.erAnnenForelderInformert.veileder",values:{navn:o}})})}):null;try{MOrientereAnnenForelderVeileder.displayName="MOrientereAnnenForelderVeileder",MOrientereAnnenForelderVeileder.__docgenInfo={description:"",displayName:"MOrientereAnnenForelderVeileder",props:{visible:{defaultValue:null,description:"",name:"visible",required:!0,type:{name:"boolean"}},annenForelderNavn:{defaultValue:null,description:"",name:"annenForelderNavn",required:!0,type:{name:"string"}}}}}catch{}const He=(e,o)=>l=>{if(!p(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi");if(!Oe(l))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat");if(z(l).isBefore(o,"day"))return d(e,"valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato",{dato:Ee(o.toDate())})},ze=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.fornavnPåkrevd"):$(t,o,e),$e=(e,o,l)=>t=>!l&&(!p(t)||t.trim()==="")?d(e,"valideringsfeil.annenForelder.etternavnPåkrevd"):$(t,o,e);const w=({fornavn:e,erUtenlandskFnr:o,kanIkkeOppgis:l,visibility:t,gjelderAdopsjon:f,søkersFødselsnummer:A})=>{const g=G(),E=Ne("oppgiPersonalia"),h=d(g,"annenForelder.spørsmål.fornavn"),v=d(g,"annenForelder.spørsmål.etternavn"),k=d(g,"annenForelder.spørsmål.fnr",{navn:e});return r.jsxs("div",{className:E.block,children:[r.jsxs(i,{padBottom:"xl",children:[r.jsx("legend",{children:r.jsx(Ie,{children:d(g,"annenForelder.spørsmål.navn")})}),r.jsx(i,{visible:t.isVisible(n.fornavn),children:r.jsxs("div",{className:E.element("nameInputsWrapper"),children:[r.jsx(m.TextField,{className:E.element("nameInput"),name:n.fornavn,label:h,disabled:l,validate:ze(g,h,l)}),r.jsx(m.TextField,{className:E.element("nameInput"),name:n.etternavn,label:d(g,"annenForelder.spørsmål.etternavn"),disabled:l,validate:$e(g,v,l)})]})}),r.jsx(i,{visible:t.isVisible(n.kanIkkeOppgis),children:r.jsx(m.Checkbox,{name:n.kanIkkeOppgis,label:f?d(g,"annenForelder.spørsmål.adoptererAlene"):d(g,"annenForelder.spørsmål.kanOppgis")})})]}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.fnr),children:r.jsx(m.TextField,{name:n.fnr,label:k,validate:we(g,A,k,o)})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.utenlandskFnr),children:r.jsx(m.Checkbox,{name:n.utenlandskFnr,label:d(g,"annenForelder.spørsmål.utenlandskFnr",{navn:e})})}),r.jsx(i,{padBottom:"l",visible:t.isVisible(n.bostedsland),children:r.jsx(m.CountrySelect,{name:n.bostedsland,label:d(g,"annenForelder.bostedsland",{navn:e}),useAlpha3Code:!1})})]})};try{w.displayName="OppgiPersonalia",w.__docgenInfo={description:"",displayName:"OppgiPersonalia",props:{fornavn:{defaultValue:null,description:"",name:"fornavn",required:!0,type:{name:"string | undefined"}},kanIkkeOppgis:{defaultValue:null,description:"",name:"kanIkkeOppgis",required:!0,type:{name:"boolean | undefined"}},erUtenlandskFnr:{defaultValue:null,description:"",name:"erUtenlandskFnr",required:!0,type:{name:"boolean | undefined"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<AnnenForelderFormField, undefined>"}},gjelderAdopsjon:{defaultValue:null,description:"",name:"gjelderAdopsjon",required:!0,type:{name:"boolean"}},søkersFødselsnummer:{defaultValue:null,description:"",name:"søkersFødselsnummer",required:!0,type:{name:"string"}}}}}catch{}const W=({søkerInfo:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:l})=>{const t=G(),f=Me(),A=Le(o),[g,E]=Fe.useState(!1),{rolle:h}=H(x(O.SØKERSITUASJON)),v=H(x(O.OM_BARNET)),k=x(O.ANNEN_FORELDER)||{kanIkkeOppgis:!1},C=x(O.SØKER),oe=T(O.OM_BARNET),te=T(O.ANNEN_FORELDER),ae=T(O.SØKER),Y=z(be(v)),b=Pe(v,e.registrerteBarn),Q=b===void 0||b.length===0?void 0:b.find(a=>a.annenForelder!==void 0),I=Q!==void 0?Q.annenForelder:void 0,j=I===void 0||k!==void 0&&y(k)&&k.fnr!==I.fnr,K=h==="far",q=h==="mor",se=e.person.sivilstand===void 0||e.person.sivilstand.type!==ne.GIFT,P=_e(v);let _="";K&&P&&(_="annenForelder.tekstOmFarskapsportal.far.del1"),q&&P&&(_="annenForelder.tekstOmFarskapsportal.mor.del1");const le=a=>{E(!0);const c={...C||{},erAleneOmOmsorg:a.kanIkkeOppgis?!0:!!F(a.aleneOmOmsorg)},U={...v,datoForAleneomsorg:p(a.datoForAleneomsorg)?je(a.datoForAleneomsorg):void 0,dokumentasjonAvAleneomsorg:a.dokumentasjonAvAleneomsorg&&a.dokumentasjonAvAleneomsorg.length>0?a.dokumentasjonAvAleneomsorg:void 0};return oe(U),ae(c),te(Ce(a)),A.goToNextDefaultStep()};return r.jsx(m.FormikWrapper,{initialValues:Ye(k,v,I,t,C),onSubmit:le,renderForm:({values:a})=>{const c=qe.getVisbility({...a,skalOppgiPersonalia:j,søkerRolle:h,gjelderStebarnsadopsjon:!!Ue(v)}),U=a.harRettPåForeldrepengerINorge===s.YES,de=y(k)?k.fnr:void 0,ie=a.fnr,J=de||ie,pe=J!==void 0&&De(J)==="M"||a.utenlandskFnr,me=a.harRettPåForeldrepengerINorge!==s.UNANSWERED,ge=F(a.aleneOmOmsorg)||!F(a.harRettPåForeldrepengerINorge)||F(a.harRettPåForeldrepengerINorge)&&F(a.erInformertOmSøknaden),ce=c.areAllQuestionsAnswered()&&ge,ue=(K&&me||q&&pe&&U)&&P&&se;return r.jsx(Ae,{bannerTitle:d(t,"søknad.pageheading"),onCancel:l,onContinueLater:A.fortsettSøknadSenere,steps:f,children:r.jsxs(m.Form,{includeButtons:!1,cleanup:D=>Ge(D,c,I),includeValidationSummary:!0,children:[j&&r.jsx(i,{padBottom:"xl",children:r.jsx(w,{fornavn:a.fornavn,erUtenlandskFnr:a.utenlandskFnr,kanIkkeOppgis:a.kanIkkeOppgis,visibility:c,gjelderAdopsjon:!1,søkersFødselsnummer:e.person.fnr})}),!j&&r.jsx(i,{padBottom:"xl",children:r.jsx(We,{person:I,fødselsnummerForVisning:I.fnr,visEtternavn:!0})}),r.jsxs(i,{visible:c.isVisible(n.aleneOmOmsorg)||!j,padBottom:"xl",children:[r.jsx(m.RadioGroup,{name:n.aleneOmOmsorg,legend:d(t,"annenForelder.aleneOmOmsorg"),radios:[{label:"Ja",value:s.NO},{label:"Nei, jeg har aleneomsorg",value:s.YES}]}),r.jsxs(S,{header:d(t,"annenForelder.aleneOmOmsorg.apneLabel"),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(Se,{children:d(t,"annenForelder.aleneOmOmsorg.del1")})}),r.jsx(re,{children:d(t,"annenForelder.aleneOmOmsorg.del2")})]}),r.jsx(M,{visible:!B(h)&&a.aleneOmOmsorg===s.YES,annenForelderNavn:a.fornavn})]}),!a.kanIkkeOppgis&&r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.datoForAleneomsorg),children:[r.jsx(i,{padBottom:"xl",children:r.jsx(m.DatePicker,{name:n.datoForAleneomsorg,label:d(t,"annenForelder.datoForAleneomsorg"),minDate:Y.toDate(),validate:He(t,Y),placeholder:"dd.mm.åååå"})}),r.jsx(L,{}),r.jsxs(i,{padBottom:"xl",children:[r.jsx(Te,{legend:"Dokumentasjon for aleneomsorg",label:d(t,"annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp"),name:n.dokumentasjonAvAleneomsorg,attachments:a.dokumentasjonAvAleneomsorg||[],attachmentType:Z.ALENEOMSORG,skjemanummer:X.DOK_AV_ALENEOMSORG})," "]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerINorge),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerINorge,legend:d(t,"annenForelder.harRettPåForeldrepengerINorge",{navn:a.fornavn})}),r.jsxs(S,{header:d(t,"annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"m",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder"})}),r.jsxs("ul",{style:{margin:"0",padding:"1rem 2rem 0"},children:[r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2"})}),r.jsx("li",{children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3"})})]})]})]}),r.jsx(i,{padBottom:"l",visible:c.isVisible(n.harRettPåForeldrepengerINorge)&&ue,children:r.jsxs(ee,{variant:"info",children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:_,values:{a:D=>r.jsx("a",{href:ye.farskapsportal,className:"lenke",rel:"noreferrer",target:"_blank",children:D})}})}),r.jsx(i,{children:r.jsx(u,{id:"annenForelder.tekstOmFarskapsportal.mor.far.del2"})})]})}),r.jsxs(i,{padBottom:"l",visible:c.isVisible(n.harOppholdtSegIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harOppholdtSegIEØS,legend:d(t,"annenForelder.harOppholdtSegIEØS",{navn:a.fornavn})}),r.jsx(S,{header:d(t,"annenForelder.harOppholdtSegIEØS.veileder.apneLabel"),children:r.jsx(u,{id:"annenForelder.harOppholdtSegIEØS.veileder",values:{navn:a.fornavn}})})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.harRettPåForeldrepengerIEØS),children:[r.jsx(m.YesOrNoQuestion,{name:n.harRettPåForeldrepengerIEØS,legend:d(t,"annenForelder.harRettPåForeldrepengerIEØS",{navn:a.fornavn})}),r.jsxs(S,{header:d(t,"annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel"),children:[r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del1",values:{navn:a.fornavn}})}),r.jsx(i,{padBottom:"l",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.del2",values:{navn:a.fornavn}})}),r.jsx(i,{children:r.jsx(xe,{to:"https://www.nav.no/foreldrepenger#utland",target:"_blank",children:r.jsx(u,{id:"annenForelder.harRettPåForeldrepengerIEØS.veileder.link",values:{navn:a.fornavn}})})})]})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erInformertOmSøknaden),children:[r.jsx(m.YesOrNoQuestion,{name:n.erInformertOmSøknaden,legend:d(t,"annenForelder.spørsmål.erAnnenForelderInformert",{navn:a.fornavn})}),r.jsx(Je,{visible:a.erInformertOmSøknaden===s.NO,annenForelderNavn:a.fornavn})]}),r.jsxs(i,{padBottom:"xl",visible:c.isVisible(n.erMorUfør),children:[r.jsx(m.YesOrNoQuestion,{name:n.erMorUfør,legend:d(t,"annenForelder.erMorUfør",{navn:a.fornavn})}),r.jsx(S,{header:d(t,"annenForelder.erMorUfør.veileder.apneLabel"),children:r.jsx(i,{children:r.jsx(u,{id:"annenForelder.erMorUfør.veileder",values:{navnAnnenForelder:a.fornavn}})})})]}),r.jsx(i,{margin:"l",children:r.jsx(Be,{isNexButtonVisible:ce,goToPreviousStep:A.goToPreviousDefaultStep,isDisabledAndLoading:g})})]})})}})},hr=W;try{W.displayName="AnnenForelder",W.__docgenInfo={description:"",displayName:"AnnenForelder",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{hr as A};
