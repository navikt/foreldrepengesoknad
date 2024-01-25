import{j as o}from"./jsx-runtime-1caa8f64.js";import{d}from"./Tidsperioden-bf461132.js";import{B as c}from"./barnUtils-fb28b5ed.js";import{D as f}from"./Periodene-57742142.js";import{P as I,S as y}from"./Perioden-f531ff4a.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{B as A}from"./index-0aecae9c.js";import{I as E}from"./InfoOmSøknaden-b5bc03dd.js";import{F as _,C as e}from"./FpDataContext-c0784ba8.js";import{m as j}from"./mapSøkerinfoDTO-916ffbab.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./uttaksPlanStatus-9c0a5786.js";import"./stringUtils-2c07ad76.js";import"./dateFormValidation-3a770efe.js";import"./dates-ba1dca1c.js";import"./isFarEllerMedmor-120238ea.js";import"./links-4d39192e.js";import"./stønadskontoer-c5a024cc.js";import"./timezone-b3f5c703.js";const U=a=>o.jsx(A,{children:o.jsx(a,{})}),v=U;try{withRouter.displayName="withRouter",withRouter.__docgenInfo={description:"",displayName:"withRouter",props:{}}}catch{}const s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},ae={title:"components/InfoOmSøknaden",component:E,decorators:[v]},i=({annenForelder:a,søker:R,søkersituasjon:u,søkerinfo:T,erIUttaksplanenSteg:O=!0,ekisterendeSak:N})=>o.jsx(_,{initialState:{[e.OM_BARNET]:{type:c.FØDT,fødselsdatoer:[new Date("2021-03-15")],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},[e.ANNEN_FORELDER]:a,[e.SØKER]:R,[e.SØKERSITUASJON]:u,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:f.HUNDRE_PROSENT}},children:o.jsx(E,{tilgjengeligeStønadskontoer:[{konto:y.Mødrekvote,dager:50}],eksisterendeSak:N,erIUttaksplanenSteg:O,person:j(T).person})}),n=i.bind({});n.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!0},søker:{},søkerinfo:s};const t=i.bind({});t.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:s};const r=i.bind({});r.args={søker:{erAleneOmOmsorg:!1,harHattAnnenInntektSiste10Mnd:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{fornavn:"Olga",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerinfo:s,ekisterendeSak:{erAnnenPartsSak:!0,grunnlag:{dekningsgrad:f.HUNDRE_PROSENT},uttaksplan:[{type:I.Uttak,gradert:!0,stillingsprosent:"100",ønskerSamtidigUttak:!0,samtidigUttakProsent:"50",tidsperiode:{fom:d("2021-01-01").toDate(),tom:d("2021-01-10").toDate()}}]},erIUttaksplanenSteg:!1};var k,p,l;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`({
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
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,S,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`({
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
}`,...(g=(S=t.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var F,x,D;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`({
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
}`,...(D=(x=r.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};const oe=["Default","AnnenForelder","InfoOmMorsSak"];export{t as AnnenForelder,n as Default,r as InfoOmMorsSak,oe as __namedExportsOrder,ae as default};
