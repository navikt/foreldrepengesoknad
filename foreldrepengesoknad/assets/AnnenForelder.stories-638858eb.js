import{j as g}from"./jsx-runtime-1caa8f64.js";import{a as V}from"./chunk-WFFRPTHA-80d37c1b.js";import{d as e}from"./dates-37291467.js";import{A as nn}from"./AxiosMock-f85117c7.js";import{B as a}from"./barnUtils-aeabd763.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as en}from"./IntlProvider-067bcbb8.js";import{F as rn,C as m}from"./FpDataContext-9c963fd7.js";import{S as tn}from"./useFpNavigator-aed5ab8f.js";import{A as Y}from"./AnnenForelder-67e94b39.js";import{M as an}from"./dateFormValidation-a676b58d.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3a69cb36.js";import"./index-6daacb67.js";import"./isFarEllerMedmor-120238ea.js";import"./index-59ab5c7e.js";import"./skjemanummer-4d711b8d.js";import"./FormikFileUploader-40bb79e5.js";import"./ExpansionCard-c4976158.js";import"./AttachmentList-260c224b.js";import"./Attachment-8de36c8d.js";import"./links-4d39192e.js";import"./RegistrertePersonalia-e61f3090.js";import"./stringUtils-d2289bbc.js";import"./validationUtil-5588aca3.js";var q=(n=>(n.UOPPGITT="UOPPGITT",n.UGIFT="UGIFT",n.GIFT="GIFT",n.ENKE_ELLER_ENKEMANN="ENKE_ELLER_ENKEMANN",n.SKILT="SKILT",n.SEPARERT="SEPARERT",n.REGISTRERT_PARTNER="REGISTRERT_PARTNER",n.SEPARERT_PARTNER="SEPARERT_PARTNER",n.SKILT_PARTNER="SKILT_PARTNER",n.GJENLEVENDE_PARTNER="GJENLEVENDE_PARTNER",n))(q||{});const on=()=>(...n)=>(V("button-click")(...n),Promise.resolve()),r={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},Hn={title:"steps/AnnenForelder",component:Y},t=({søker:n,søkersituasjon:w={situasjon:"fødsel",rolle:"mor"},barn:z={type:a.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:void 0},annenForelder:Q={kanIkkeOppgis:!0},gåTilNesteSide:W,mellomlagreSøknadOgNaviger:X=on(),avbrytSøknad:Z=V("button-click")})=>{en();const $=S=>{S.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),S.onPost("/storage/foreldrepenger").reply(200,void 0)};return g.jsx(an,{initialEntries:[tn.ANNEN_FORELDER],children:g.jsx(nn,{mock:$,children:g.jsx(rn,{onDispatch:W,initialState:{[m.SØKERSITUASJON]:w,[m.OM_BARNET]:z,[m.ANNEN_FORELDER]:Q,[m.SØKER_DATA]:{harHattAnnenInntektSiste10Mnd:void 0,harJobbetSomFrilansSiste10Mnd:void 0,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:void 0,erAleneOmOmsorg:void 0}},children:g.jsx(Y,{søker:n,mellomlagreSøknadOgNaviger:X,avbrytSøknad:Z})})})})},o=t.bind({});o.args={barn:{type:a.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),fnr:["21091981146"]},søker:r};const s=t.bind({});s.args={annenForelder:{kanIkkeOppgis:!1},søker:{...r,barn:[]}};const i=t.bind({});i.args={annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1},søker:{...r,barn:[]}};const d=t.bind({});d.args={annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1},søker:{...r,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]}};const l=t.bind({});l.args={barn:{type:a.FØDT,fødselsdatoer:[e("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:e("2021-03-15").toDate(),fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]}};const k=t.bind({});k.args={barn:{type:a.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,barn:[]}};const p=t.bind({});p.args={barn:{type:a.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,kjønn:"K",barn:[]}};const F=t.bind({});F.args={barn:{type:a.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]}};const x=t.bind({});x.args={barn:{type:a.UFØDT,antallBarn:1,termindato:e("2023-05-05").toDate()},søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{kanIkkeOppgis:!1},søker:{...r,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:q.GIFT}}};var O,c,T;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(c=o.parameters)==null?void 0:c.docs)==null?void 0:T.source}}};var D,u,E;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(E=(u=s.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var A,R,y;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(R=i.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};var f,N,M;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(N=d.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var b,v,j;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(j=(v=l.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var C,_,I;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(I=(_=k.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var B,P,L;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(L=(P=p.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var h,K,U;F.parameters={...F.parameters,docs:{...(h=F.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(K=F.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var J,G,H;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søker,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn = {
    type: BarnType.FØDT,
    fødselsdatoer: [dayjs('2021-03-15').toDate()],
    antallBarn: 1,
    datoForAleneomsorg: undefined
  },
  annenForelder = {
    kanIkkeOppgis: true
  },
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click')
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn,
        [ContextDataType.ANNEN_FORELDER]: annenForelder,
        [ContextDataType.SØKER_DATA]: {
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
                    <AnnenForelder søker={søker} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(H=(G=x.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const Vn=["Default","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{o as Default,x as FarGiftUfødtBarn,F as FarUfødtBarn,l as ForFar,p as MedmorUfødtBarn,k as MorUfødtBarn,s as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,i as SkalOppgiPersonaliaNavnMangler,Vn as __namedExportsOrder,Hn as default};
