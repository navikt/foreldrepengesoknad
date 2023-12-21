import{j as e}from"./jsx-runtime-d079401a.js";import{r as D}from"./index-f1f2c4b1.js";import{u as J,i as k,L as Y,c as s,H as $,G as z,b as B,B as Q,j as W}from"./Tidsperioden-3002fbcf.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{l as w}from"./links-b36d21ab.js";import{g as X,s as Z,V as O,a as ee,v as te,S as T,b as f,B as ne,c as re,d as ae}from"./velkommenUtils-fefe7e6b.js";import{c as U,C as a}from"./FpDataContext-fc20d236.js";import{D as oe}from"./DinePlikter-c6ac6598.js";import{D as se}from"./DinePersonopplysningerModal-73cbabb5.js";import{S as _}from"./routes-9effe5a6.js";import{m as le,o as ie,a as de,b as me}from"./eksisterendeSakUtils-e0da6232.js";import{A as pe}from"./Alert-9862fade.js";import{B as ue}from"./Link-13f307fd.js";const ke=()=>{const r=U();return{oppdaterSøknadIState:(t,c)=>{r(a.SØKERSITUASJON,t.søkersituasjon),r(a.OM_BARNET,t.barn),r(a.ANNEN_FORELDER,t.annenForelder),r(a.SØKER,t.søker),r(a.UTENLANDSOPPHOLD,t.informasjonOmUtenlandsopphold?{iNorgeNeste12Mnd:t.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,iNorgeSiste12Mnd:t.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}:void 0),r(a.UTENLANDSOPPHOLD_TIDLIGERE,t.informasjonOmUtenlandsopphold?{tidligereOpphold:t.informasjonOmUtenlandsopphold.tidligereOpphold}:void 0),r(a.UTENLANDSOPPHOLD_SENERE,t.informasjonOmUtenlandsopphold?{senereOpphold:t.informasjonOmUtenlandsopphold.senereOpphold}:void 0),r(a.UTTAKSPLAN,t.uttaksplan),r(a.UTTAKSPLAN_METADATA,{dekningsgrad:t.dekningsgrad,tilleggsopplysninger:t.tilleggsopplysninger,ønskerJustertUttakVedFødsel:t.ønskerJustertUttakVedFødsel}),c&&r(a.EKSISTERENDE_SAK,c)}}};const x=({locale:r,saker:v,onChangeLocale:t,harGodkjentVilkår:c,søkerInfo:h,setHarGodkjentVilkår:L,setErEndringssøknad:I,setSøknadGjelderNyttBarn:G,mellomlagreSøknadOgNaviger:M})=>{const j=W("velkommen"),l=J(),[y,q]=D.useState(!1),b=U(),{oppdaterSøknadIState:N}=ke(),[K,F]=D.useState(!1),g=X(v,h.registrerteBarn),V=[...g].sort(Z),C=i=>{if(i.harForståttRettigheterOgPlikter!==!0)return;q(!0);const n=i.valgteBarn===T.SØKNAD_GJELDER_NYTT_BARN?void 0:g.find(o=>o.id===i.valgteBarn),d=n!==void 0&&!!n.kanSøkeOmEndring;let p;n!==void 0&&(p=ae(n,V),b(a.BARN_FRA_NESTE_SAK,p));const u=d&&n.sak!==void 0?v.find(o=>{var S;return o.saksnummer===((S=n.sak)==null?void 0:S.saksnummer)}):void 0,E=p!==void 0?p.startdatoFørsteStønadsperiode:void 0,m=d&&u,A=n!==void 0&&n.sak!==void 0&&n.kanSøkeOmEndring===!1,H=!m&&!A&&n!==void 0;let P=_.SØKERSITUASJON,R=!1;if(m){const o=le(u,E);P=_.UTTAKSPLAN;const S=ie(h,o,l,u.annenPart,n);N(S,o)}else if(A){const o=de(n,l,h);N(o)}else if(H){const o=me(n);N(o)}else R=!0;L(i.harForståttRettigheterOgPlikter),I(d),G(R),b(a.APP_ROUTE,P),M()};return e.jsx(O.FormikWrapper,{initialValues:ee(c),onSubmit:C,renderForm:({values:i,setFieldValue:n})=>{const d=te.getVisbility({...i,selectableBarn:g}),p=i.valgteBarn,u=p===T.SØKNAD_GJELDER_NYTT_BARN?void 0:g.find(m=>m.id===p),E=u!==void 0&&u.kanSøkeOmEndring===!0?k(l,"velkommen.endreSøknad"):k(l,"velkommen.begynnMedSøknad");return e.jsxs(O.Form,{includeButtons:!1,children:[e.jsx(Y,{locale:r,availableLocales:["nb","nn"],toggle:t}),e.jsxs("div",{className:j.block,children:[e.jsx(s,{children:e.jsx($,{size:"xlarge",className:`${j.element("tittel")}`,children:k(l,"velkommen.tittel")})}),e.jsx(s,{padBottom:"l",children:e.jsxs(z,{poster:!0,children:[e.jsx(s,{padBottom:"m",children:k(l,"velkommen.guidepanel.del1")})," ",e.jsx(s,{children:e.jsx(B,{id:"velkommen.guidepanel.del2",values:{a:m=>e.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:w.foreldrepenger,target:"_blank",children:m})}})})]})}),e.jsx(s,{padBottom:"l",visible:d.isVisible(f.valgteBarn),children:e.jsx(ne,{selectableBarn:V,visibility:d,formValues:i,setFieldValue:n})}),e.jsx(s,{padBottom:"l",visible:d.isVisible(f.harForståttRettigheterOgPlikter),children:e.jsx(pe,{variant:"info",children:k(l,"velkommen.lagring.info")})}),e.jsx(s,{padBottom:"l",visible:d.isVisible(f.harForståttRettigheterOgPlikter),children:e.jsx(O.ConfirmationCheckbox,{name:f.harForståttRettigheterOgPlikter,label:k(l,"velkommen.samtykke"),validate:re(l),children:e.jsxs(e.Fragment,{children:[e.jsx(s,{padBottom:"l",children:e.jsx(B,{id:"velkommen.samtykkeIntro.del1"})}),e.jsx(s,{padBottom:"m",children:e.jsx(oe,{})})]})})}),e.jsx(s,{padBottom:"l",children:e.jsx("div",{style:{textAlign:"center"},children:e.jsx(Q,{type:"submit",variant:"primary",disabled:y,loading:y,children:E})})}),e.jsx(ue,{className:j.element("personopplysningerLink"),children:e.jsx("a",{className:"lenke",href:"#",onClick:m=>{m.preventDefault(),F(!0)},children:e.jsx(B,{id:"velkommen.lesMerOmPersonopplysninger"})})}),e.jsx(se,{isOpen:K,onRequestClose:()=>F(!1)})]})]})}})},Fe=x;try{x.displayName="Velkommen",x.__docgenInfo={description:"",displayName:"Velkommen",props:{fornavn:{defaultValue:null,description:"",name:"fornavn",required:!0,type:{name:"string"}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},saker:{defaultValue:null,description:"",name:"saker",required:!0,type:{name:"Sak[]"}},fnr:{defaultValue:null,description:"",name:"fnr",required:!0,type:{name:"string"}},harGodkjentVilkår:{defaultValue:null,description:"",name:"harGodkjentVilkår",required:!0,type:{name:"boolean"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},setHarGodkjentVilkår:{defaultValue:null,description:"",name:"setHarGodkjentVilkår",required:!0,type:{name:"(harGodkjentVilkår: boolean) => void"}},setErEndringssøknad:{defaultValue:null,description:"",name:"setErEndringssøknad",required:!0,type:{name:"(erEndringssøknad: boolean) => void"}},setSøknadGjelderNyttBarn:{defaultValue:null,description:"",name:"setSøknadGjelderNyttBarn",required:!0,type:{name:"(søknadGjelderNyttBarn: boolean) => void"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}}}}}catch{}export{Fe as V};
