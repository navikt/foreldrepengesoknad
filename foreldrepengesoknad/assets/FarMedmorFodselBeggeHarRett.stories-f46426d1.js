import{j as o}from"./jsx-runtime-1caa8f64.js";import{d as i}from"./Tidsperioden-50230361.js";import{B as d}from"./barnUtils-91b846b3.js";import{D as O}from"./Periodene-496bb434.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as u,C as e}from"./FpDataContext-c0784ba8.js";import{S as M}from"./useFpNavigator-4a28a96f.js";import{R as I}from"./useRequest-ec5ef0e8.js";import{m as y}from"./mapSøkerinfoDTO-12ea38d4.js";import{s as p,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_}from"./søkerinfo-d0fdfcae.js";import{A as U}from"./AxiosMock-35a08809.js";import{U as T}from"./UttaksplanInfo-c214a3de.js";import{i as v}from"./IntlProvider-6c566b41.js";import{M as P}from"./dateFormValidation-9bfd2ef5.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-0a366813.js";import"./uttaksPlanStatus-98c9f3b7.js";import"./stringUtils-5476a1f3.js";import"./apiInterceptor-71cf49c7.js";import"./timezone-b3f5c703.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-d0ea1657.js";import"./uttaksplanInfoUtils-fc2bf7e3.js";import"./uttaksplanHarForMangeFlerbarnsuker-ac82e513.js";import"./eksisterendeSakUtils-c8490a73.js";import"./dateUtils-2d535cd3.js";import"./velkommenUtils-19cb6b19.js";import"./index-8b86dca7.js";import"./Uttaksplan-d9c54917.js";import"./FormikFileUploader-6dac6a2f.js";import"./AttachmentList-43e6b13f.js";import"./Attachment-1e4dbb6d.js";import"./dates-2640516b.js";import"./ExpansionCard-68955f39.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-32269254.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-640125aa.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-56c217f0.js";import"./amplitude.esm-2809efde.js";import"./createIntl-adea17b9.js";const b="/innsyn/v2/annenPartVedtak",g="/konto",l=_,bn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:T},k=n=>{v();const A=s=>{s.onPost(b).replyOnce(200,void 0,I.FINISHED),s.onGet(g).replyOnce(200,n.stønadskonto100),s.onGet(g).replyOnce(200,n.stønadskonto80)};return o.jsx(P,{initialEntries:[M.UTTAKSPLAN_INFO],children:o.jsx(U,{mock:A,children:o.jsx(u,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:o.jsx(T,{søkerInfo:y(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=k.bind({});t.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.HUNDRE_PROSENT};const r=k.bind({});r.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.ÅTTI_PROSENT};const a=k.bind({});a.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l};var f,S,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(E=(D=r.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var N,R,c;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
}`,...(c=(R=a.parameters)==null?void 0:R.docs)==null?void 0:c.source}}};const Ln=["UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100","UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{t as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad100,r as UttaksplanInfoFarMedmorFødselBeggeHarRettDekningsgrad80,a as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,Ln as __namedExportsOrder,bn as default};
