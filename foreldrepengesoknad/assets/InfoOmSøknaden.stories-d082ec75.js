import{j as s}from"./jsx-runtime-d079401a.js";import{d as i}from"./Tidsperioden-2f191506.js";import{B as I}from"./barnUtils-42471e8d.js";import{D}from"./Periodene-93f75033.js";import{P as A,S as y}from"./Perioden-756f4214.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{w as c}from"./withRouter-d9926836.js";import{I as f}from"./InfoOmSøknaden-dc520488.js";import{F as j,C as e}from"./FpDataContext-6d6d78b0.js";import{m as U}from"./mapSøkerinfoDTO-7324950a.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./index-cdc86f56.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./links-4d39192e.js";import"./stønadskontoer-1088bac0.js";import"./timezone-29fa0fe3.js";const a={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},ae={title:"components/InfoOmSøknaden",component:f,decorators:[c]},o=({annenForelder:E,søker:T,søkersituasjon:R,søkerinfo:u,erIUttaksplanenSteg:O=!0,ekisterendeSak:N})=>s.jsx(j,{initialState:{[e.OM_BARNET]:{type:I.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},[e.ANNEN_FORELDER]:E,[e.SØKER]:T,[e.SØKERSITUASJON]:R,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:D.HUNDRE_PROSENT}},children:s.jsx(f,{tilgjengeligeStønadskontoer:[{konto:y.Mødrekvote,dager:50}],eksisterendeSak:N,erIUttaksplanenSteg:O,person:U(u).person})}),n=o.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søker:{},søkerinfo:a};const t=o.bind({});t.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a};const r=o.bind({});r.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a,ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:D.HUNDRE_PROSENT},uttaksplan:[{type:A.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:i("2021-01-01").toDate(),tom:i("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var d,k,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
  annenForelder,
  søker,
  søkersituasjon,
  søkerinfo,
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
    [ContextDataType.SØKER]: søker,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,m,S;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
  annenForelder,
  søker,
  søkersituasjon,
  søkerinfo,
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
    [ContextDataType.SØKER]: søker,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(S=(m=t.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var F,g,x;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`({
  annenForelder,
  søker,
  søkersituasjon,
  søkerinfo,
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
    [ContextDataType.SØKER]: søker,
    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const oe=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,r as InfoOmMorsSak,oe as __namedExportsOrder,ae as default};
