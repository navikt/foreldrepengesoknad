import{j as o}from"./jsx-runtime-1caa8f64.js";import{d}from"./Tidsperioden-9e986206.js";import{B as l}from"./barnUtils-24a73acd.js";import{D as c}from"./Periodene-61c184c8.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as M,C as n}from"./FpDataContext-939a8168.js";import{S as u}from"./useFpNavigator-b6dca37b.js";import{R as I}from"./useRequest-603f2ddc.js";import{s as p,a as m}from"./stønadskontoDeltUttak80-23916c37.js";import{A as y}from"./AxiosMock-f85117c7.js";import{U as O}from"./UttaksplanInfo-9cd7435c.js";import{i as _}from"./IntlProvider-b5213292.js";import{M as v}from"./dateFormValidation-a28db7fc.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-a34ba53a.js";import"./Perioden-226b58a8.js";import"./uttaksPlanStatus-28e7517d.js";import"./stringUtils-8514ece2.js";import"./apiInterceptor-d1094a41.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-17ea66ac.js";import"./uttaksplanInfoUtils-bf85826d.js";import"./uttaksplanHarForMangeFlerbarnsuker-817828f9.js";import"./eksisterendeSakUtils-723d3db9.js";import"./dateUtils-97af0947.js";import"./velkommenUtils-ed1d7052.js";import"./index-770d096e.js";import"./Uttaksplan-9a163d8e.js";import"./FormikFileUploader-d12b9cf3.js";import"./AttachmentList-9367778d.js";import"./Attachment-a70938ff.js";import"./ExpansionCard-8141c4b0.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-fdb5aba8.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b3680da2.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3e09be91.js";const U="/innsyn/v2/annenPartVedtak",g="/konto",s={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Mn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:O},k=a=>{_();const T=i=>{i.onPost(U).replyOnce(200,void 0,I.FINISHED),i.onGet(g).replyOnce(200,a.stønadskonto100),i.onGet(g).replyOnce(200,a.stønadskonto80)};return o.jsx(v,{initialEntries:[u.UTTAKSPLAN_INFO],children:o.jsx(y,{mock:T,children:o.jsx(M,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:a.barn,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:a.dekningsgrad},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:o.jsx(O,{søker:s.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=k.bind({});e.args={stønadskonto100:p,stønadskonto80:m,barn:{type:l.FØDT,fødselsdatoer:[d("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:s,dekningsgrad:c.HUNDRE_PROSENT};const t=k.bind({});t.args={stønadskonto100:p,stønadskonto80:m,barn:{type:l.FØDT,fødselsdatoer:[d("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:s,dekningsgrad:c.ÅTTI_PROSENT};const r=k.bind({});r.args={stønadskonto100:p,stønadskonto80:m,barn:{type:l.FØDT,fødselsdatoer:[d("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:s};var f,S,F;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
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
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(F=(S=e.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var x,E,N;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
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
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(N=(E=t.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var D,R,A;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
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
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(A=(R=r.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};const un=["UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100","UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{e as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100,t as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80,r as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,un as __namedExportsOrder,Mn as default};
