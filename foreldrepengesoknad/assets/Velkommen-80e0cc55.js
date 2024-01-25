import{j as t}from"./jsx-runtime-1caa8f64.js";import{r as x}from"./index-1cdf6ce0.js";import{R as ee,u as te,F as ae,C as re}from"./ErrorSummaryHookForm-621e00de.js";import{u as q,b as u,R as V,s as C,t as ne,H as se,G as oe,B as le}from"./Tidsperioden-bf461132.js";import"./index-753920cd.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{l as ie}from"./links-4d39192e.js";import{V as S,C as de,H as h,A as me}from"./IntlProvider-d9dad12d.js";import"./dates-ba1dca1c.js";import{D as ue}from"./DinePlikter-fff3904f.js";import{b as H,C as i}from"./FpDataContext-c0784ba8.js";import{a as pe,S as b}from"./useFpNavigator-dc4587e4.js";import{m as ge,o as ke,a as ce,b as fe}from"./eksisterendeSakUtils-ef462427.js";import{D as ve}from"./DinePersonopplysningerModal-49106517.js";import{i as Se}from"./dateFormValidation-3a770efe.js";import{c as he,d as je,h as Be}from"./barnUtils-fb28b5ed.js";import{V as g,g as Ee,s as Ne,a as ye}from"./velkommenUtils-c6c35a41.js";import{B as K}from"./Link-d47e444a.js";const xe=()=>{const a=H();return{oppdaterSøknadIState:(e,o)=>{a(i.SØKERSITUASJON,e.søkersituasjon),a(i.OM_BARNET,e.barn),a(i.ANNEN_FORELDER,e.annenForelder),a(i.SØKER,e.søker),a(i.UTENLANDSOPPHOLD,e.informasjonOmUtenlandsopphold?{iNorgeNeste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,iNorgeSiste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}:void 0),a(i.UTENLANDSOPPHOLD_TIDLIGERE,e.informasjonOmUtenlandsopphold?{tidligereOpphold:e.informasjonOmUtenlandsopphold.tidligereOpphold}:void 0),a(i.UTENLANDSOPPHOLD_SENERE,e.informasjonOmUtenlandsopphold?{senereOpphold:e.informasjonOmUtenlandsopphold.senereOpphold}:void 0),a(i.PERIODE_MED_FORELDREPENGER,{dekningsgrad:e.dekningsgrad}),a(i.UTTAKSPLAN,e.uttaksplan),a(i.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),o&&a(i.EKSISTERENDE_SAK,o)}}};var _=(a=>(a.SØKNAD_GJELDER_NYTT_BARN="søknad_gjeder_nytt_barn",a))(_||{});const _e=(a,r)=>a.map(e=>{const o=e.sak!==void 0?$(e.sak.åpenBehandling===void 0,r):void 0,n=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return t.jsx(V,{value:e.id,description:e.sak!==void 0?`${n}, ${o}`:n,children:t.jsx(u,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:he(e.antallBarn,r),termin:C(e.termindato),b:d=>t.jsx("b",{children:d})}})},e.id)}),$=(a,r)=>a?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),Te=(a,r)=>a.map(e=>{const o=je(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),n=Be(e.fødselsdatoer),d=e.type===g.FØDT||e.type===g.IKKE_UTFYLT?n:C(e.omsorgsovertagelse),j=e.type===g.FØDT||e.type===g.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),k=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",c=e.sak!==void 0?$(e.sak.åpenBehandling===void 0,r):void 0;return t.jsx(V,{value:e.id,description:c?`${k}, ${c}`:k,children:t.jsx("b",{children:e.alleBarnaLever?`${o} ${j} ${d}`:o})},e.id)}),T=({selectableBarn:a})=>{const r=q();if(a.length===0)return null;const e=a.filter(d=>d.type===g.UFØDT),o=a.filter(d=>d.type!==g.UFØDT);let n=[];return o.length>0&&(n=n.concat(Te(o,r))),e.length>0&&(n=n.concat(_e(e,r))),t.jsx(ee,{name:"valgteBarn",label:t.jsx(u,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[Se(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:n.concat(t.jsx(V,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:t.jsx(u,{id:"omBarnet.gjelderAnnetBarn",values:{b:d=>t.jsx("b",{children:d})}})},"søknad_gjeder_nytt_barn"))})};try{T.displayName="BarnVelger",T.__docgenInfo={description:"",displayName:"BarnVelger",props:{selectableBarn:{defaultValue:null,description:"",name:"selectableBarn",required:!0,type:{name:"ValgtBarn[]"}}}}}catch{}const F=({locale:a,saker:r,onChangeLocale:e,harGodkjentVilkår:o,søkerInfo:n,setHarGodkjentVilkår:d,setErEndringssøknad:j,setSøknadGjelderNyttBarn:k,mellomlagreSøknadOgNaviger:c})=>{const p=q(),J=pe(c),[O,Y]=x.useState(!1),w=H(),{oppdaterSøknadIState:B}=xe(),[z,R]=x.useState(!1),E=x.useMemo(()=>Ee(r,n.registrerteBarn),[r,n.registrerteBarn]),D=[...E].sort(Ne),W=l=>{if(l.harForståttRettigheterOgPlikter!==!0)return;Y(!0);const s=l.valgteBarn===_.SØKNAD_GJELDER_NYTT_BARN?void 0:E.find(m=>m.id===l.valgteBarn),N=s!==void 0&&!!s.kanSøkeOmEndring;let f;s!==void 0&&(f=ye(s,D),w(i.BARN_FRA_NESTE_SAK,f));const y=N&&s.sak!==void 0?r.find(m=>{var v;return m.saksnummer===((v=s.sak)==null?void 0:v.saksnummer)}):void 0,X=f!==void 0?f.startdatoFørsteStønadsperiode:void 0,L=N&&y,U=s!==void 0&&s.sak!==void 0&&s.kanSøkeOmEndring===!1,Z=!L&&!U&&s!==void 0;let G=b.SØKERSITUASJON,I=!1;if(L){const m=ge(y,X);G=b.UTTAKSPLAN;const v=ke(n,m,p,y.annenPart,s);B(v,m)}else if(U){const m=ce(s,p,n);B(m)}else if(Z){const m=fe(s);B(m)}else I=!0;return d(l.harForståttRettigheterOgPlikter),j(N),k(I),J.goToNextStep(G)},A=te({defaultValues:{harForståttRettigheterOgPlikter:o}}),M=A.watch("valgteBarn"),P=M===_.SØKNAD_GJELDER_NYTT_BARN?void 0:E.find(l=>l.id===M),Q=P!==void 0&&P.kanSøkeOmEndring===!0?p.formatMessage({id:"velkommen.endreSøknad"}):p.formatMessage({id:"velkommen.begynnMedSøknad"});return t.jsx(ae,{formMethods:A,onSubmit:W,children:t.jsxs(S,{gap:"10",children:[t.jsx(ne,{locale:a,availableLocales:["nb","nn"],toggle:e}),t.jsx(de,{children:t.jsxs(S,{gap:"8",children:[t.jsx(h,{justify:"center",children:t.jsx(se,{size:"xlarge",children:t.jsx(u,{id:"velkommen.tittel"})})}),t.jsx(oe,{poster:!0,children:t.jsxs(S,{gap:"2",children:[t.jsx(u,{id:"velkommen.guidepanel.del1"}),t.jsx(u,{id:"velkommen.guidepanel.del2",values:{a:l=>t.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:ie.foreldrepenger,children:l})}})]})}),t.jsx(T,{selectableBarn:D}),t.jsx(me,{variant:"info",children:t.jsx(u,{id:"velkommen.lagring.info"})}),t.jsx(re,{name:"harForståttRettigheterOgPlikter",label:p.formatMessage({id:"velkommen.samtykke"}),validate:[l=>l!==!0?p.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:t.jsx(S,{gap:"5",children:t.jsxs(h,{gap:"1",children:[t.jsx(K,{children:t.jsx(u,{id:"velkommen.samtykkeIntro.del1"})}),t.jsx(ue,{})]})})}),t.jsx(h,{justify:"center",children:t.jsx(le,{type:"submit",variant:"primary",disabled:O,loading:O,children:Q})}),t.jsx(h,{justify:"center",children:t.jsx(K,{children:t.jsx("a",{className:"lenke",href:"#",onClick:l=>{l.preventDefault(),R(!0)},children:t.jsx(u,{id:"velkommen.lesMerOmPersonopplysninger"})})})}),t.jsx(ve,{isOpen:z,onRequestClose:()=>R(!1)})]})})]})})},Ye=F;try{F.displayName="Velkommen",F.__docgenInfo={description:"",displayName:"Velkommen",props:{fornavn:{defaultValue:null,description:"",name:"fornavn",required:!0,type:{name:"string"}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},saker:{defaultValue:null,description:"",name:"saker",required:!0,type:{name:"Sak[]"}},fnr:{defaultValue:null,description:"",name:"fnr",required:!0,type:{name:"string"}},harGodkjentVilkår:{defaultValue:null,description:"",name:"harGodkjentVilkår",required:!0,type:{name:"boolean"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},setHarGodkjentVilkår:{defaultValue:null,description:"",name:"setHarGodkjentVilkår",required:!0,type:{name:"(harGodkjentVilkår: boolean) => void"}},setErEndringssøknad:{defaultValue:null,description:"",name:"setErEndringssøknad",required:!0,type:{name:"(erEndringssøknad: boolean) => void"}},setSøknadGjelderNyttBarn:{defaultValue:null,description:"",name:"setSøknadGjelderNyttBarn",required:!0,type:{name:"(søknadGjelderNyttBarn: boolean) => void"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}}}}}catch{}export{Ye as V};
