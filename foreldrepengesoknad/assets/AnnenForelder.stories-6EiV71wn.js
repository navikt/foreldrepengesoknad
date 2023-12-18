import{j as m}from"./jsx-runtime-DtaoT6pD.js";import{a as w}from"./chunk-WFFRPTHA-4hQ1D0Dg.js";import{w as $}from"./withRouter-Y7oi-tYz.js";import{A as nn}from"./AxiosMock-KQlr1Nb8.js";import{_ as en}from"./søkerinfoKvinneMedEttBarn-A8PP0pIk.js";import{A as Y}from"./AnnenForelder-VfRvui5_.js";import{F as rn,C as x}from"./FpDataContext-vZKgGA8_.js";import{m as on}from"./mapSøkerinfoDTO-YP8N9YZY.js";import{d as e}from"./Tidsperioden-2d_zadTE.js";import{B as o}from"./barnUtils-h4EDmpw3.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./preview-errors-UTk86sAa.js";import"./index-PPLHz8o0.js";import"./v4-yQnnJER4.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-aaqGQ_dj.js";import"./dates-BDcfIrhq.js";import"./FormikFileUploader-ZstSdyRH.js";import"./AttachmentList-8zPlJAaZ.js";import"./Attachment-PxACXjOX.js";import"./Link-IggFwnrW.js";import"./IntlProvider-eOIIgBUy.js";import"./Alert-OmuhvhWR.js";import"./amplitude.esm-OOIXs19H.js";import"./provider-hl4zZLWq.js";import"./ExpansionCard-2pe3TaGZ.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./BackButton-wq7GY9KI.js";import"./links-BwIVhdNo.js";import"./routes-IIwIGa6S.js";import"./stepsConfig-e97TxKrD.js";import"./amplitude--qTo3lH-.js";import"./stringUtils-n8izj1FP.js";import"./index-w2TxLgAC.js";import"./validationUtil-jsJYy7ee.js";import"./RegistrertePersonalia-NY0QlmNP.js";import"./index-lbrLmSir.js";const tn=()=>(...g)=>(w("button-click")(...g),Promise.resolve()),n=en,Wn={title:"steps/AnnenForelder",component:Y,decorators:[$]},r=({søkerinfo:g,søkersituasjon:q={situasjon:"fødsel",rolle:"mor"},barn:z={type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0,dokumentasjonAvAleneomsorg:[]},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:V,mellomlagreSøknadOgNaviger:W=tn(),avbrytSøknad:X=w("button-click")})=>{const Z=S=>{S.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),S.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(nn,{mock:Z,children:m.jsx(rn,{onDispatch:V,initialState:{[x.SØKERSITUASJON]:q,[x.OM_BARNET]:z,[x.ANNEN_FORELDER]:Q,[x.SØKER]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:m.jsx(Y,{søkerInfo:on(g),mellomlagreSøknadOgNaviger:W,avbrytSøknad:X})})})},t=r.bind({});t.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkerinfo:n};const a=r.bind({});a.args={annenForelder:{kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const s=r.bind({});s.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[]}}};const i=r.bind({});i.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søkerinfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999"}}]}}};const d=r.bind({});d.args={barn:{type:o.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),dokumentasjonAvAleneomsorg:[],fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerinfo:{søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}}};const l=r.bind({});l.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,barn:[]}}};const k=r.bind({});k.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,kjønn:"K",barn:[]}}};const p=r.bind({});p.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}}};const F=r.bind({});F.args={barn:{type:o.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søkerinfo:{...n,søker:{...n.søker,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:"GIFT"}}}};var c,O,f;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(J=(P=k.parameters)==null?void 0:P.docs)==null?void 0:J.source}}};var U,_,K;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
}`,...(K=(_=p.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var L,H,G;F.parameters={...F.parameters,docs:{...(L=F.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
}`,...(G=(H=F.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};const Xn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{t as Default,F as FarGiftUfødtBarn,p as FarUfødtBarn,d as ForFar,k as MedmorUfødtBarn,l as MorUfødtBarn,a as SkalOppgiPersonalia,i as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,s as SkalOppgiPersonaliaNavnMangler,Xn as __namedExportsOrder,Wn as default};
