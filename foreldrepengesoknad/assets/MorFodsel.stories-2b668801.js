import{j as m}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-35a08809.js";import{R as b}from"./useRequest-ec5ef0e8.js";import{s as U,a as L}from"./stønadskonto80-8e203d8f.js";import{s as K,a as C}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as I}from"./UttaksplanInfo-dbb5a4c6.js";import{F as G,C as t}from"./FpDataContext-c0784ba8.js";import{m as h}from"./mapSøkerinfoDTO-916ffbab.js";import{d as n}from"./Tidsperioden-bf461132.js";import{B as d}from"./barnUtils-fb28b5ed.js";import{D as k}from"./Periodene-57742142.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{S as j}from"./useFpNavigator-dc4587e4.js";import{i as B}from"./IntlProvider-d9dad12d.js";import{M as J}from"./dateFormValidation-3a770efe.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-66f2ffe8.js";import"./Perioden-f531ff4a.js";import"./uttaksPlanStatus-9c0a5786.js";import"./stringUtils-2c07ad76.js";import"./uttaksplanInfoUtils-196e2787.js";import"./uttaksplanHarForMangeFlerbarnsuker-91b4dd47.js";import"./eksisterendeSakUtils-ef462427.js";import"./dateUtils-b788b56c.js";import"./timezone-b3f5c703.js";import"./velkommenUtils-c6c35a41.js";import"./index-004a6d92.js";import"./Uttaksplan-f42bc5fe.js";import"./FormikFileUploader-9bd10cdc.js";import"./AttachmentList-264fa359.js";import"./Attachment-2babbc9f.js";import"./Link-d47e444a.js";import"./dates-ba1dca1c.js";import"./ExpansionCard-3603c101.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-e3e62bdd.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-c5a024cc.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b5bc03dd.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-4ce78a2a.js";const H={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},q={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},$={farRundtFødsel:0,generellMinsterett:0,toTette:0},w={kontoer:q,minsteretter:$},V={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},Y={farRundtFødsel:0,generellMinsterett:0,toTette:0},z={kontoer:V,minsteretter:Y},Q={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},W={farRundtFødsel:0,generellMinsterett:0,toTette:0},X={kontoer:Q,minsteretter:W},Z={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},ee={farRundtFødsel:0,generellMinsterett:0,toTette:0},ne={kontoer:Z,minsteretter:ee},te="/innsyn/v2/annenPartVedtak",g="/konto",l=H,nn={title:"steps/uttaksplan-info/MorFødsel",component:I},p=e=>{B();const P=E=>{E.onPost(te).replyOnce(200,void 0,b.FINISHED),E.onGet(g).replyOnce(200,e.stønadskonto100),E.onGet(g).replyOnce(200,e.stønadskonto80)};return m.jsx(J,{initialEntries:[j.UTTAKSPLAN_INFO],children:m.jsx(v,{mock:P,children:m.jsx(G,{initialState:{[t.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"},[t.OM_BARNET]:e.barn,[t.SØKER]:e.søker,[t.ANNEN_FORELDER]:e.annenForelder,[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad}},children:m.jsx(I,{søkerInfo:h(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=p.bind({});r.args={stønadskonto100:U,stønadskonto80:L,søkerinfo:l,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:k.HUNDRE_PROSENT};const o=p.bind({});o.args={stønadskonto100:U,stønadskonto80:L,søkerinfo:l,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:k.ÅTTI_PROSENT};const a=p.bind({});a.args={stønadskonto100:w,stønadskonto80:z,barn:{type:d.FØDT,antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[n("2021-01-11").toDate()],termindato:n("2021-03-11").toDate()},annenForelder:{kanIkkeOppgis:!0},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};const s=p.bind({});s.args={stønadskonto100:K,stønadskonto80:C,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:1,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};const i=p.bind({});i.args={stønadskonto100:ne,stønadskonto80:X,barn:{type:d.FØDT,fødselsdatoer:[n("2021-03-15").toDate()],antallBarn:2,datoForAleneomsorg:new Date,dokumentasjonAvAleneomsorg:[]},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søker:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT};var D,F,S;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(S=(F=r.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var R,x,c;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(x=o.parameters)==null?void 0:x.docs)==null?void 0:c.source}}};var N,T,O;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(T=a.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var A,f,M;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(f=s.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var u,_,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.SØKER]: args.søker,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(_=i.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};const tn=["UttaksplanMedAleneomsorgDekningsgrad100","UttaksplanMedAleneomsorgDekningsgrad80","UttaksplanMedPrematurFødselDekningsgrad100","UttaksplanMedDeltUttakDekningsgrad100","UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100"];export{r as UttaksplanMedAleneomsorgDekningsgrad100,o as UttaksplanMedAleneomsorgDekningsgrad80,s as UttaksplanMedDeltUttakDekningsgrad100,i as UttaksplanMedFlerbarnsukerTvillingerDekningsgrad100,a as UttaksplanMedPrematurFødselDekningsgrad100,tn as __namedExportsOrder,nn as default};
