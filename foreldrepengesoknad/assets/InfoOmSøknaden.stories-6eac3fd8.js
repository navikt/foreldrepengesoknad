import{j as s}from"./jsx-runtime-d079401a.js";import{d as i}from"./Tidsperioden-a9e7c25c.js";import{B as R}from"./barnUtils-31e942c7.js";import{D as f}from"./Periodene-23276648.js";import{P as I,S as y}from"./Perioden-cc956828.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{w as U}from"./withRouter-d9926836.js";import{I as T}from"./InfoOmSøknaden-ebeea835.js";import{F as c,C as e}from"./FpDataContext-fc20d236.js";import{m as j}from"./mapSøkerinfoDTO-a9156b17.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./uttaksPlanStatus-2cabf12a.js";import"./stringUtils-56ddfa05.js";import"./index-cdc86f56.js";import"./validation-631bcf6e.js";import"./dateFormValidation-9e4c0ed9.js";import"./dates-fbe5e71c.js";import"./isFarEllerMedmor-120238ea.js";import"./links-b36d21ab.js";const a={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},te={title:"components/InfoOmSøknaden",component:T,decorators:[U]},o=({annenForelder:D,søker:A,søkersituasjon:u,søkerinfo:E,erIUttaksplanenSteg:N=!0,ekisterendeSak:O})=>s.jsx(c,{initialState:{[e.OM_BARNET]:{type:R.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},[e.ANNEN_FORELDER]:D,[e.SØKER]:A,[e.SØKERSITUASJON]:u,[e.UTTAKSPLAN_METADATA]:{dekningsgrad:f.HUNDRE_PROSENT}},children:s.jsx(T,{tilgjengeligeStønadskontoer:[{konto:y.Mødrekvote,dager:50}],eksisterendeSak:O,erIUttaksplanenSteg:N,person:j(E).person})}),n=o.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søker:{},søkerinfo:a};const t=o.bind({});t.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a};const r=o.bind({});r.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a,ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:f.HUNDRE_PROSENT},uttaksplan:[{type:I.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:i("2021-01-01").toDate(),tom:i("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var d,k,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
    [ContextDataType.UTTAKSPLAN_METADATA]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(p=(k=n.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var l,S,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
    [ContextDataType.UTTAKSPLAN_METADATA]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(m=(S=t.parameters)==null?void 0:S.docs)==null?void 0:m.source}}};var g,x,F;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`({
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
    [ContextDataType.UTTAKSPLAN_METADATA]: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    }
  }}>
            <InfoOmSøknaden tilgjengeligeStønadskontoer={[{
      konto: StønadskontoType.Mødrekvote,
      dager: 50
    }]} eksisterendeSak={ekisterendeSak} erIUttaksplanenSteg={erIUttaksplanenSteg} person={mapSøkerinfoDTOToSøkerinfo(søkerinfo).person} />
        </FpDataContext>;
}`,...(F=(x=r.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};const re=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,r as InfoOmMorsSak,re as __namedExportsOrder,te as default};
