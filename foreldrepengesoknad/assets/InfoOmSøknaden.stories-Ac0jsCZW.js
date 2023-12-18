import{j as s}from"./jsx-runtime-DtaoT6pD.js";import{d as i}from"./Tidsperioden-2d_zadTE.js";import{B as R}from"./barnUtils-h4EDmpw3.js";import{D as f}from"./Periodene-FeW126ra.js";import{P as I,S as y}from"./Perioden-RLDz9uWW.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import{w as U}from"./withRouter-Y7oi-tYz.js";import{I as T}from"./InfoOmSøknaden-A87DSGoy.js";import{F as c,C as e}from"./FpDataContext-vZKgGA8_.js";import{m as j}from"./mapSøkerinfoDTO-YP8N9YZY.js";import"./index-lbrLmSir.js";import"./Link-IggFwnrW.js";import"./index-mQqIOHEI.js";import"./v4-yQnnJER4.js";import"./uttaksPlanStatus-LgTHQ4WU.js";import"./stringUtils-n8izj1FP.js";import"./index-U0S_AV9L.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-aaqGQ_dj.js";import"./dates-BDcfIrhq.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./links-BwIVhdNo.js";const a={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},te={title:"components/InfoOmSøknaden",component:T,decorators:[U]},o=({annenForelder:D,søker:A,søkersituasjon:u,søkerinfo:E,erIUttaksplanenSteg:N=!0,ekisterendeSak:O})=>s.jsx(c,{initialState:{[e.OM_BARNET]:{type:R.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},[e.ANNEN_FORELDER]:D,[e.SØKER]:A,[e.SØKERSITUASJON]:u,[e.UTTAKSPLAN_METADATA]:{dekningsgrad:f.HUNDRE_PROSENT}},children:s.jsx(T,{tilgjengeligeStønadskontoer:[{konto:y.Mødrekvote,dager:50}],eksisterendeSak:O,erIUttaksplanenSteg:N,person:j(E).person})}),n=o.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søker:{},søkerinfo:a};const t=o.bind({});t.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a};const r=o.bind({});r.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:a,ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:f.HUNDRE_PROSENT},uttaksplan:[{type:I.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:i("2021-01-01").toDate(),tom:i("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var d,k,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
