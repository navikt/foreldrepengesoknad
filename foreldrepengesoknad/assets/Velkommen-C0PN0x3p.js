import{j as a}from"./jsx-runtime-_e34SzbC.js";import{r as T}from"./index-DVXBtNgz.js";import{R as ae,u as te,F as re,C as ne}from"./ErrorSummaryHookForm-CQIAe3xw.js";import{u as K,R as N,d as I,D as C,q as se,G as oe,B as le}from"./Tidsperioden-JQeTBW8H.js";import"./index--IHLcpuH.js";import{l as ie}from"./links-BFd19Kxc.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{C as de,A as me}from"./infobox.module-CVZyvidf.js";import{r as ke,S as b}from"./useFpNavigator-CnR-1yS3.js";import{D as ge}from"./DinePlikter-CSj4oYMp.js";import{b as G,C as i}from"./FpDataContext-BcznBdmF.js";import{m as pe,o as ue,a as fe,b as ce}from"./eksisterendeSakUtils-D2JRJtdj.js";import{D as ve}from"./DinePersonopplysningerModal-B6FmekXZ.js";import{i as Se}from"./dateFormValidation-CArkorQM.js";import{V as p,g as he,s as je,a as Be}from"./velkommenUtils-C7gz3iMO.js";import{d as ye,f as De,e as Ee}from"./barnUtils-YoT_baD_.js";import{M as k}from"./message-B0EXjA4g.js";import{V as S,H as h}from"./VStack-DueXo9sZ.js";import{H as Te,B as q}from"./Link-SOWRV7cb.js";const xe=()=>{const t=G();return{oppdaterSøknadIState:(e,o)=>{t(i.SØKERSITUASJON,e.søkersituasjon),t(i.OM_BARNET,e.barn),t(i.ANNEN_FORELDER,e.annenForelder),t(i.SØKER_DATA,e.søker),t(i.UTENLANDSOPPHOLD,e.informasjonOmUtenlandsopphold?{iNorgeNeste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,iNorgeSiste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}:void 0),t(i.UTENLANDSOPPHOLD_TIDLIGERE,e.informasjonOmUtenlandsopphold?{tidligereOpphold:e.informasjonOmUtenlandsopphold.tidligereOpphold}:void 0),t(i.UTENLANDSOPPHOLD_SENERE,e.informasjonOmUtenlandsopphold?{senereOpphold:e.informasjonOmUtenlandsopphold.senereOpphold}:void 0),t(i.PERIODE_MED_FORELDREPENGER,{dekningsgrad:e.dekningsgrad}),t(i.UTTAKSPLAN,e.uttaksplan),t(i.UTTAKSPLAN_METADATA,{ønskerJustertUttakVedFødsel:e.ønskerJustertUttakVedFødsel}),o&&t(i.EKSISTERENDE_SAK,o)}}};var x=(t=>(t.SØKNAD_GJELDER_NYTT_BARN="søknad_gjeder_nytt_barn",t))(x||{});const Ne=(t,r)=>t.map(e=>{const o=e.sak!==void 0?Y(e.sak.åpenBehandling===void 0,r):void 0,n=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"";return a.jsx(N,{value:e.id,description:e.sak!==void 0?`${n}, ${o}`:n,children:a.jsx(k,{id:"velkommen.barnVelger.ufødtBarn",values:{antallBarnTekst:ye(e.antallBarn,r),termin:I(e.termindato).format(C),b:d=>a.jsx("b",{children:d})}})},e.id)}),Y=(t,r)=>t?r.formatMessage({id:"velkommen.sak.status.ferdigBehandlet"}):r.formatMessage({id:"velkommen.sak.status.underBehandling"}),_e=(t,r)=>t.map(e=>{const o=De(e.fornavn,e.fødselsdatoer,e.omsorgsovertagelse,e.alleBarnaLever,e.antallBarn,r),n=Ee(e.fødselsdatoer),d=e.type===p.FØDT||e.type===p.IKKE_UTFYLT?n:I(e.omsorgsovertagelse).format(C),j=e.type===p.FØDT||e.type===p.IKKE_UTFYLT?r.formatMessage({id:"velkommen.barnVelger.født"}):r.formatMessage({id:"velkommen.barnVelger.adopsjon"}),u=e.sak!==void 0?r.formatMessage({id:"velkommen.barnVelger.saksnummer"},{saksnummer:e.sak.saksnummer}):"",f=e.sak!==void 0?Y(e.sak.åpenBehandling===void 0,r):void 0;return a.jsx(N,{value:e.id,description:f?`${u}, ${f}`:u,children:a.jsx("b",{children:e.alleBarnaLever?`${o} ${j} ${d}`:o})},e.id)}),w=({selectableBarn:t})=>{const r=K();if(t.length===0)return null;const e=t.filter(d=>d.type===p.UFØDT),o=t.filter(d=>d.type!==p.UFØDT);let n=[];return o.length>0&&(n=n.concat(_e(o,r))),e.length>0&&(n=n.concat(Ne(e,r))),a.jsx(ae,{name:"valgteBarn",label:a.jsx(k,{id:"velkommen.intro.harSaker.barnVelger.label"}),validate:[Se(r.formatMessage({id:"steg.footer.spørsmålMåBesvares"}))],children:n.concat(a.jsx(N,{value:"søknad_gjeder_nytt_barn",description:r.formatMessage({id:"velkommen.intro.harSaker.barnVelger.info"}),children:a.jsx(k,{id:"omBarnet.gjelderAnnetBarn",values:{b:d=>a.jsx("b",{children:d})}})},"søknad_gjeder_nytt_barn"))})};w.__docgenInfo={description:"",methods:[],displayName:"BarnVelger",props:{selectableBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: string;
    type: ValgtBarnType;
    antallBarn: number;
    sortableDato: Date;
    fnr?: string[];
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
    annenForelder?: RegistrertAnnenForelder;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"ValgtBarnType",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"sortableDato",value:{name:"Date",required:!0}},{key:"fnr",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"termindato",value:{name:"Date",required:!1}},{key:"fødselsdatoer",value:{name:"Array",elements:[{name:"Date"}],raw:"Date[]",required:!1}},{key:"omsorgsovertagelse",value:{name:"Date",required:!1}},{key:"fornavn",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"kanSøkeOmEndring",value:{name:"boolean",required:!1}},{key:"sak",value:{name:"Sak",required:!1}},{key:"annenForelder",value:{name:"Omit",elements:[{name:"PersonBase"},{name:"union",raw:"'kjønn' | 'fødselsdato'",elements:[{name:"literal",value:"'kjønn'"},{name:"literal",value:"'fødselsdato'"}]}],raw:"Omit<PersonBase, 'kjønn' | 'fødselsdato'>",required:!1}},{key:"familiehendelsesdato",value:{name:"Date",required:!1}},{key:"startdatoFørsteStønadsperiode",value:{name:"Date",required:!1}},{key:"alleBarnaLever",value:{name:"boolean",required:!0}}]}}],raw:"ValgtBarn[]"},description:""}}};const $=({locale:t,saker:r,onChangeLocale:e,harGodkjentVilkår:o,søkerInfo:n,setHarGodkjentVilkår:d,setErEndringssøknad:j,setSøknadGjelderNyttBarn:u,mellomlagreSøknadOgNaviger:f})=>{const g=K(),H=ke(n.arbeidsforhold,f),[_,J]=T.useState(!1),z=G(),{oppdaterSøknadIState:B}=xe(),[W,A]=T.useState(!1),y=T.useMemo(()=>he(r,n.søker.barn),[r,n.søker.barn]),O=[...y].sort(je),Q=l=>{if(l.harForståttRettigheterOgPlikter!==!0)return;J(!0);const s=l.valgteBarn===x.SØKNAD_GJELDER_NYTT_BARN?void 0:y.find(m=>m.id===l.valgteBarn),D=s!==void 0&&!!s.kanSøkeOmEndring;let c;s!==void 0&&(c=Be(s,O),z(i.BARN_FRA_NESTE_SAK,c));const E=D&&s.sak!==void 0?r.find(m=>{var v;return m.saksnummer===((v=s.sak)==null?void 0:v.saksnummer)}):void 0,Z=c!==void 0?c.startdatoFørsteStønadsperiode:void 0,P=D&&E,V=s!==void 0&&s.sak!==void 0&&s.kanSøkeOmEndring===!1,ee=!P&&!V&&s!==void 0;let U=b.SØKERSITUASJON,L=!1;if(P){const m=pe(E,Z);U=b.UTTAKSPLAN;const v=ue(n.søker,m,g,E.annenPart,s);B(v,m)}else if(V){const m=fe(s,g,n.søker.barn,n.søker.fnr);B(m)}else if(ee){const m=ce(s);B(m)}else L=!0;return d(l.harForståttRettigheterOgPlikter),j(D),u(L),H.goToNextStep(U)},F=te({defaultValues:{harForståttRettigheterOgPlikter:o}}),R=F.watch("valgteBarn"),M=R===x.SØKNAD_GJELDER_NYTT_BARN?void 0:y.find(l=>l.id===R),X=M!==void 0&&M.kanSøkeOmEndring===!0?g.formatMessage({id:"velkommen.endreSøknad"}):g.formatMessage({id:"velkommen.begynnMedSøknad"});return a.jsx(re,{formMethods:F,onSubmit:Q,children:a.jsxs(S,{gap:"10",children:[a.jsx(se,{locale:t,availableLocales:["nb","nn"],toggle:e}),a.jsx(de,{children:a.jsxs(S,{gap:"8",children:[a.jsx(h,{justify:"center",children:a.jsx(Te,{size:"xlarge",children:a.jsx(k,{id:"velkommen.tittel"})})}),a.jsx(oe,{poster:!0,children:a.jsxs(S,{gap:"2",children:[a.jsx(k,{id:"velkommen.guidepanel.del1"}),a.jsx(k,{id:"velkommen.guidepanel.del2",values:{a:l=>a.jsx("a",{className:"lenke",rel:"noopener noreferrer",href:ie.foreldrepenger,children:l})}})]})}),a.jsx(w,{selectableBarn:O}),a.jsx(me,{variant:"info",children:a.jsx(k,{id:"velkommen.lagring.info"})}),a.jsx(ne,{name:"harForståttRettigheterOgPlikter",label:g.formatMessage({id:"velkommen.samtykke"}),validate:[l=>l!==!0?g.formatMessage({id:"valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd"}):null],children:a.jsx(S,{gap:"5",children:a.jsxs(h,{gap:"1",children:[a.jsx(q,{children:a.jsx(k,{id:"velkommen.samtykkeIntro.del1"})}),a.jsx(ge,{})]})})}),a.jsx(h,{justify:"center",children:a.jsx(le,{type:"submit",variant:"primary",disabled:_,loading:_,children:X})}),a.jsx(h,{justify:"center",children:a.jsx(q,{children:a.jsx("a",{className:"lenke",href:"#",onClick:l=>{l.preventDefault(),A(!0)},children:a.jsx(k,{id:"velkommen.lesMerOmPersonopplysninger"})})})}),a.jsx(ve,{isOpen:W,onRequestClose:()=>A(!1)})]})})]})})},ze=$;$.__docgenInfo={description:"",methods:[],displayName:"Velkommen"};export{ze as V};
