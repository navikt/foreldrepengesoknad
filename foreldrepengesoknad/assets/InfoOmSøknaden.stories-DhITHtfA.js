import{j as r}from"./jsx-runtime-_e34SzbC.js";import{d}from"./Tidsperioden-C-i4iOOf.js";import{B as N}from"./index-BW63EAkN.js";import"./index--IHLcpuH.js";import"./index-DVXBtNgz.js";import{S as I}from"./TilgjengeligeStønadskontoer-BZwpkCmT.js";import{D as E,P as c,B as _}from"./index-L4B05WfX.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{F as y,C as e}from"./FpDataContext-BcznBdmF.js";import{I as m}from"./InfoOmSøknaden-Ng1VYweQ.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./index-Cbx7Fas8.js";import"./dateFormValidation-DEBWM2F4.js";import"./links-BFd19Kxc.js";import"./annenForelderUtils-DMoQ7nHE.js";import"./barnUtils-CdPtdEjc.js";import"./message-2fcxXlkE.js";const R=s=>r.jsx(N,{children:r.jsx(s,{})}),A=R;R.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const U={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},W={title:"components/InfoOmSøknaden",component:m,decorators:[A]},o=({annenForelder:s,søkerData:f,søkersituasjon:T,erIUttaksplanenSteg:u=!0,ekisterendeSak:O})=>r.jsx(y,{initialState:{[e.OM_BARNET]:{type:_.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},[e.ANNEN_FORELDER]:s,[e.SØKER_DATA]:f,[e.SØKERSITUASJON]:T,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:E.HUNDRE_PROSENT}},children:r.jsx(m,{tilgjengeligeStønadskontoer:[{konto:I.Mødrekvote,dager:50}],eksisterendeSak:O,erIUttaksplanenSteg:u,søker:U})}),n=o.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søkerData:{}};const t=o.bind({});t.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const a=o.bind({});a.args={søkerData:{harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:E.HUNDRE_PROSENT},uttaksplan:[{type:c.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:d("2021-01-01").toDate(),tom:d("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var i,k,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,S,D;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(D=(S=t.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var x,g,F;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.SØKER_DATA]: søkerData,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} søker={søker} />
        </FpDataContext>;
}`,...(F=(g=a.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};const X=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,a as InfoOmMorsSak,X as __namedExportsOrder,W as default};
