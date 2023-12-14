import{j as c}from"./jsx-runtime-69eee039.js";import{a as w}from"./chunk-AY7I2SME-331d03ca.js";import{w as $}from"./withRouter-f0df7a0f.js";import{A as nn}from"./AxiosMock-ee1c53ff.js";import{_ as en}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{A as Y}from"./AnnenForelder-5a40ebb7.js";import{F as rn,C as m}from"./FpDataContext-75ac2616.js";import{m as on}from"./mapSøkerinfoDTO-d9686cf0.js";import{d as e}from"./Tidsperioden-f06b1fb0.js";import{B as o}from"./barnUtils-6ca83891.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-53d645a6.js";import"./dates-53ab5347.js";import"./FormikFileUploader-edfedb50.js";import"./AttachmentList-0916f102.js";import"./Attachment-22089457.js";import"./Link-b834ea2b.js";import"./IntlProvider-0d1ea53b.js";import"./amplitude.esm-b6594747.js";import"./provider-679c532c.js";import"./isFarEllerMedmor-120238ea.js";import"./BackButton-9cb8c0d5.js";import"./message-42800413.js";import"./links-b36d21ab.js";import"./routes-9effe5a6.js";import"./stepsConfig-38f20682.js";import"./amplitude-3a5afcfb.js";import"./stringUtils-050465ad.js";import"./index-47edccfa.js";import"./validationUtil-77ae3e51.js";import"./RegistrertePersonalia-0ae0f610.js";import"./index-b3a39e30.js";const tn=()=>(...S)=>(w("button-click")(...S),Promise.resolve()),n=en,qn={title:"steps/AnnenForelder",component:Y,decorators:[$]},r=({søkerinfo:S,søkersituasjon:q={situasjon:"fødsel",rolle:"mor"},barn:z={type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:V,mellomlagreSøknadOgNaviger:W=tn(),avbrytSøknad:X=w("button-click")})=>{const Z=O=>{O.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),O.onPost("/storage/foreldrepenger").reply(200,void 0)};return c.jsx(nn,{mock:Z,children:c.jsx(rn,{onDispatch:V,initialState:{[m.SØKERSITUASJON]:q,[m.OM_BARNET]:z,[m.ANNEN_FORELDER]:Q,[m.SØKER]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:c.jsx(Y,{søkerInfo:on(S),mellomlagreSøknadOgNaviger:W,avbrytSøknad:X})})})},t=r.bind({});t.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkerinfo:n};const a=r.bind({});a.args={annenForelder:{kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const s=r.bind({});s.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const i=r.bind({});i.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const d=r.bind({});d.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const l=r.bind({});l.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,barn:[]}}};const k=r.bind({});k.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,kjønn:"K",barn:[]}}};const p=r.bind({});p.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const g=r.bind({});g.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var f,T,u;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(u=(T=t.parameters)==null?void 0:T.docs)==null?void 0:u.source}}};var D,y,F;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(F=(y=a.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var A,M,b;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(b=(M=s.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var v,N,R;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(R=(N=i.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var x,E,j;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(j=(E=d.parameters)==null?void 0:E.docs)==null?void 0:j.source}}};var C,B,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(I=(B=l.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var h,P,J;k.parameters={...k.parameters,docs:{...(h=k.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(J=(P=k.parameters)==null?void 0:P.docs)==null?void 0:J.source}}};var U,K,_;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(_=(K=p.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var L,H,G;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined,
    dokumentasjonAvAleneomsorg: []
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn,
      [ContextDataType.ANNEN_FORELDER]: annenForelder,
      [ContextDataType.SØKER]: {
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harHattAnnenInntektSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomFrilansSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
        // @ts-ignore TODO (TOR) Fiks Søker-typen
        erAleneOmOmsorg: undefined
      }
    }}>
                <AnnenForelder søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </AxiosMock>;
}`,...(G=(H=g.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};const zn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{t as Default,g as FarGiftUfødtBarn,p as FarUfødtBarn,d as ForFar,k as MedmorUfødtBarn,l as MorUfødtBarn,a as SkalOppgiPersonalia,i as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,s as SkalOppgiPersonaliaNavnMangler,zn as __namedExportsOrder,qn as default};
//# sourceMappingURL=AnnenForelder.stories-5aaf3515.js.map