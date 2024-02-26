import{j as o}from"./jsx-runtime-1caa8f64.js";import{d}from"./Tidsperioden-431803a3.js";import{B as O}from"./barnUtils-1eb911f4.js";import{D as x}from"./Periodene-e7e8efe3.js";import{P as A,S as N}from"./Perioden-bb61ea85.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as c,C as e}from"./FpDataContext-939a8168.js";import{B as I}from"./index-e13359d4.js";import{I as E}from"./InfoOmSøknaden-777154dc.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-24d080e0.js";import"./uttaksPlanStatus-d46e622d.js";import"./stringUtils-20940293.js";import"./dateFormValidation-ac039f93.js";import"./isFarEllerMedmor-120238ea.js";import"./links-4d39192e.js";import"./stønadskontoer-4394051d.js";const _=r=>o.jsx(I,{children:o.jsx(r,{})}),y=_;try{withRouter.displayName="withRouter",withRouter.__docgenInfo={description:"",displayName:"withRouter",props:{}}}catch{}const j={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},ee={title:"components/InfoOmSøknaden",component:E,decorators:[y]},s=({annenForelder:r,søkerData:R,søkersituasjon:f,erIUttaksplanenSteg:u=!0,ekisterendeSak:T})=>o.jsx(c,{initialState:{[e.OM_BARNET]:{type:O.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},[e.ANNEN_FORELDER]:r,[e.SØKER_DATA]:R,[e.SØKERSITUASJON]:f,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:x.HUNDRE_PROSENT}},children:o.jsx(E,{tilgjengeligeStønadskontoer:[{konto:N.Mødrekvote,dager:50}],eksisterendeSak:T,erIUttaksplanenSteg:u,søker:j})}),n=s.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søkerData:{}};const t=s.bind({});t.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}};const a=s.bind({});a.args={søkerData:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:x.HUNDRE_PROSENT},uttaksplan:[{type:A.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:d("2021-01-01").toDate(),tom:d("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var i,k,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
      datoForAleneomsorg: undefined,
      dokumentasjonAvAleneomsorg: []
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
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,m,D;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
      datoForAleneomsorg: undefined,
      dokumentasjonAvAleneomsorg: []
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
}`,...(D=(m=t.parameters)==null?void 0:m.docs)==null?void 0:D.source}}};var S,g,F;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
      datoForAleneomsorg: undefined,
      dokumentasjonAvAleneomsorg: []
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
}`,...(F=(g=a.parameters)==null?void 0:g.docs)==null?void 0:F.source}}};const ne=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,a as InfoOmMorsSak,ne as __namedExportsOrder,ee as default};
