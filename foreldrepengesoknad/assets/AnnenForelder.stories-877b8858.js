import{j as m}from"./jsx-runtime-d079401a.js";import{a as w}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as $}from"./withRouter-d9926836.js";import{A as nn}from"./AxiosMock-07682dd6.js";import{_ as en}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{A as Y}from"./AnnenForelder-2b4284a5.js";import{F as rn,C as x}from"./FpDataContext-6d6d78b0.js";import{m as on}from"./mapSøkerinfoDTO-7324950a.js";import{d as e}from"./Tidsperioden-2f191506.js";import{B as o}from"./barnUtils-42471e8d.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./Link-13f307fd.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./amplitude.esm-ec80886e.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./isFarEllerMedmor-120238ea.js";import"./BackButton-2183a9fc.js";import"./links-4d39192e.js";import"./routes-7ba66c63.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./stringUtils-e263f9a0.js";import"./index-47edccfa.js";import"./validationUtil-2196efb2.js";import"./RegistrertePersonalia-0c5fa5bf.js";import"./timezone-29fa0fe3.js";import"./index-b580f7e8.js";const tn=()=>(...g)=>(w("button-click")(...g),Promise.resolve()),n=en,Xn={title:"steps/AnnenForelder",component:Y,decorators:[$]},r=({søkerinfo:g,søkersituasjon:q={situasjon:"fødsel",rolle:"mor"},barn:z={type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:V,mellomlagreSøknadOgNaviger:W=tn(),avbrytSøknad:X=w("button-click")})=>{const Z=S=>{S.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),S.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(nn,{mock:Z,children:m.jsx(rn,{onDispatch:V,initialState:{[x.SØKERSITUASJON]:q,[x.OM_BARNET]:z,[x.ANNEN_FORELDER]:Q,[x.SØKER]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:m.jsx(Y,{søkerInfo:on(g),mellomlagreSøknadOgNaviger:W,avbrytSøknad:X})})})},t=r.bind({});t.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkerinfo:n};const a=r.bind({});a.args={annenForelder:{kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const s=r.bind({});s.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const i=r.bind({});i.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const d=r.bind({});d.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const l=r.bind({});l.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,barn:[]}}};const k=r.bind({});k.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,kjønn:"K",barn:[]}}};const p=r.bind({});p.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const F=r.bind({});F.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var c,O,f;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(f=(O=t.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var T,D,u;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`({
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
}`,...(u=(D=a.parameters)==null?void 0:D.docs)==null?void 0:u.source}}};var y,A,M;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`({
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
}`,...(M=(A=s.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var b,v,N;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
}`,...(N=(v=i.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var E,R,j;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`({
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
}`,...(j=(R=d.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var C,B,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`({
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
}`,...(_=(K=p.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var L,H,G;F.parameters={...F.parameters,docs:{...(L=F.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(G=(H=F.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};const Zn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{t as Default,F as FarGiftUfødtBarn,p as FarUfødtBarn,d as ForFar,k as MedmorUfødtBarn,l as MorUfødtBarn,a as SkalOppgiPersonalia,i as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,s as SkalOppgiPersonaliaNavnMangler,Zn as __namedExportsOrder,Xn as default};
