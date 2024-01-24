import{j as a}from"./jsx-runtime-1caa8f64.js";import{d as i}from"./Tidsperioden-17ce50bb.js";import{B as d}from"./barnUtils-83c58311.js";import{D as O}from"./Periodene-dea6e734.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as u,C as e}from"./FpDataContext-c0784ba8.js";import{S as M}from"./useFpNavigator-84241c56.js";import{R as I}from"./useRequest-ec5ef0e8.js";import{m as y}from"./mapSøkerinfoDTO-27dc6acb.js";import{s as p,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_}from"./søkerinfo-d0fdfcae.js";import{A as U}from"./AxiosMock-35a08809.js";import{U as T}from"./UttaksplanInfo-39168f65.js";import{i as v}from"./amplitude-0b5405b7.js";import{M as P}from"./dateFormValidation-46b46a42.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-56036cec.js";import"./uttaksPlanStatus-640e4161.js";import"./stringUtils-a9168712.js";import"./apiInterceptor-71cf49c7.js";import"./timezone-b3f5c703.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-e4065a96.js";import"./IntlProvider-5ccc1ca9.js";import"./dates-01028c04.js";import"./createIntl-bf1d8c16.js";import"./uttaksplanInfoUtils-cc16af4c.js";import"./uttaksplanHarForMangeFlerbarnsuker-7b6d3f11.js";import"./eksisterendeSakUtils-412a6125.js";import"./dateUtils-8c5fa214.js";import"./velkommenUtils-24f8c4c3.js";import"./index-47edccfa.js";import"./Tag-3d686a5d.js";import"./Uttaksplan-dfd0a3e2.js";import"./FormikFileUploader-64cc17d7.js";import"./AttachmentList-ba6bbc3b.js";import"./Attachment-2e83e825.js";import"./ExpansionCard-1aa9e169.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-37e4afdd.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-86bf2e8b.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-eca8f236.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b684306a.js";import"./amplitude.esm-2809efde.js";const b="/innsyn/v2/annenPartVedtak",g="/konto",l=_,Kn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:T},k=n=>{v();const A=s=>{s.onPost(b).replyOnce(200,void 0,I.FINISHED),s.onGet(g).replyOnce(200,n.stønadskonto100),s.onGet(g).replyOnce(200,n.stønadskonto80)};return a.jsx(P,{initialEntries:[M.UTTAKSPLAN_INFO],children:a.jsx(U,{mock:A,children:a.jsx(u,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(T,{søkerInfo:y(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=k.bind({});t.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.HUNDRE_PROSENT};const r=k.bind({});r.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.ÅTTI_PROSENT};const o=k.bind({});o.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l};var f,S,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
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
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(F=(S=t.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var x,D,E;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
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
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(E=(D=r.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var N,R,c;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
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
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(c=(R=o.parameters)==null?void 0:R.docs)==null?void 0:c.source}}};const hn=["UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100","UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{t as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100,r as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80,o as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,hn as __namedExportsOrder,Kn as default};
