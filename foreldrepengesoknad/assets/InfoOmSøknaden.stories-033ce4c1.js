import{j as o}from"./jsx-runtime-1caa8f64.js";import{d}from"./dates-c7d75be6.js";import{B as O}from"./index-49077f34.js";import{B as N}from"./barnUtils-397fbc9c.js";import{D as x}from"./Dekningsgrad-fced8842.js";import{k as c,S as I}from"./Perioden-b1f81fc9.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as _,C as e}from"./FpDataContext-9c963fd7.js";import{I as E}from"./InfoOmSøknaden-2c9122c9.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dateFormValidation-996d41a1.js";import"./isFarEllerMedmor-120238ea.js";import"./Periodene-3a8fbd9d.js";import"./uttaksPlanStatus-4d798447.js";import"./stringUtils-17aed94c.js";import"./links-4d39192e.js";import"./stønadskontoer-e5e38a52.js";const y=r=>o.jsx(O,{children:o.jsx(r,{})}),A=y;try{withRouter.displayName="withRouter",withRouter.__docgenInfo={description:"",displayName:"withRouter",props:{}}}catch{}const U={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},ee={title:"components/InfoOmSøknaden",component:E,decorators:[A]},s=({annenForelder:r,søkerData:R,søkersituasjon:f,erIUttaksplanenSteg:u=!0,ekisterendeSak:T})=>o.jsx(_,{initialState:{[e.OM_BARNET]:{type:N.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0},[e.ANNEN_FORELDER]:r,[e.SØKER_DATA]:R,[e.SØKERSITUASJON]:f,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:x.HUNDRE_PROSENT}},children:o.jsx(E,{tilgjengeligeStønadskontoer:[{konto:I.Mødrekvote,dager:50}],eksisterendeSak:T,erIUttaksplanenSteg:u,søker:U})}),n=s.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søkerData:{}};const t=s.bind({});t.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const a=s.bind({});a.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:x.HUNDRE_PROSENT},uttaksplan:[{type:c.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:d("2021-01-01").toDate(),tom:d("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var i,k,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: [new Date('2021-03-15')],
      antallBarn: 1,
      datoForAleneomsorg: undefined
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
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,D,S;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: [new Date('2021-03-15')],
      antallBarn: 1,
      datoForAleneomsorg: undefined
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
}`,...(S=(D=t.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var g,m,F;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`({
  annenForelder,
  søkerData,
  søkersituasjon,
  erIUttaksplanenSteg = true,
  ekisterendeSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: [new Date('2021-03-15')],
      antallBarn: 1,
      datoForAleneomsorg: undefined
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
}`,...(F=(m=a.parameters)==null?void 0:m.docs)==null?void 0:F.source}}};const ne=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,a as InfoOmMorsSak,ne as __namedExportsOrder,ee as default};
