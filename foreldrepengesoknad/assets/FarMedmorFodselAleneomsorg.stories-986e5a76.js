import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as s}from"./Tidsperioden-3740d843.js";import{B as E}from"./barnUtils-422ebf13.js";import{D as g}from"./Periodene-929c4e05.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{A as c}from"./AxiosMock-ed819255.js";import{R as O}from"./useRequest-a00d1ba3.js";import{s as S,a as F}from"./stønadskontoDeltUttak100-ce558aaf.js";import{F as T,C as n}from"./FpDataContext-c0784ba8.js";import{m as R}from"./mapSøkerinfoDTO-739a59ed.js";import{U as x}from"./UttaksplanInfo-b2838da9.js";import{S as u}from"./useFpNavigator-f31fd526.js";import{i as M}from"./amplitude-db41cfb9.js";import{M as y}from"./dateFormValidation-bfde5cde.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-c95d8939.js";import"./uttaksPlanStatus-4880748a.js";import"./stringUtils-ee6805af.js";import"./index-bcca6cba.js";import"./apiInterceptor-716e24db.js";import"./timezone-b3f5c703.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-3fe99876.js";import"./IntlProvider-4448d7ec.js";import"./dates-096df86f.js";import"./provider-40d4318a.js";import"./uttaksplanInfoUtils-4e93fc0c.js";import"./uttaksplanHarForMangeFlerbarnsuker-bfdd82b6.js";import"./eksisterendeSakUtils-e9e81b77.js";import"./dateUtils-dfe049d0.js";import"./velkommenUtils-228b2bf6.js";import"./index-47edccfa.js";import"./Tag-70ce2969.js";import"./Uttaksplan-8003b46c.js";import"./FormikFileUploader-a4d3b0c4.js";import"./AttachmentList-36ade0db.js";import"./Attachment-46d026a8.js";import"./ExpansionCard-7ff5568c.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-05558051.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-28f62441.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-9ae25833.js";import"./Ingress-f6f9f70c.js";import"./InfoOmSøknaden-6a4fe26b.js";import"./amplitude.esm-2809efde.js";const I={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},_="/innsyn/v2/annenPartVedtak",i="test/konto",D=I,Un={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:x},A=o=>{M();const N=a=>{a.onPost(_).replyOnce(200,void 0,O.FINISHED),a.onGet(i).replyOnce(200,o.stønadskonto80),a.onGet(i).replyOnce(200,o.stønadskonto100)};return r.jsx(y,{initialEntries:[u.UTTAKSPLAN_INFO],children:r.jsx(c,{mock:N,children:r.jsx(T,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:E.FØDT,fødselsdatoer:[s("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:s("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:o.dekningsgrad},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(x,{søkerInfo:R(o.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=A.bind({});e.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:D,dekningsgrad:g.HUNDRE_PROSENT};const t=A.bind({});t.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:D,dekningsgrad:g.ÅTTI_PROSENT};var d,m,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2022-03-01').toDate()],
          antallBarn: 1,
          datoForAleneomsorg: dayjs('2022-03-24').toDate(),
          dokumentasjonAvAleneomsorg: []
        },
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: true,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,k,f;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.FØDT,
          fødselsdatoer: [dayjs('2022-03-01').toDate()],
          antallBarn: 1,
          datoForAleneomsorg: dayjs('2022-03-24').toDate(),
          dokumentasjonAvAleneomsorg: []
        },
        [ContextDataType.SØKER]: {
          erAleneOmOmsorg: true,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'dfg',
          fornavn: 'dfg',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const Pn=["UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100","UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80"];export{e as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100,t as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80,Pn as __namedExportsOrder,Un as default};
