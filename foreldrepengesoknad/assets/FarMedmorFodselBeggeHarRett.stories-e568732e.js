import{j as a}from"./jsx-runtime-1caa8f64.js";import{d as i}from"./Tidsperioden-3740d843.js";import{B as d}from"./barnUtils-422ebf13.js";import{D as O}from"./Periodene-929c4e05.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as u,C as e}from"./FpDataContext-c0784ba8.js";import{S as M}from"./useFpNavigator-f31fd526.js";import{R as I}from"./useRequest-a00d1ba3.js";import{m as y}from"./mapSøkerinfoDTO-739a59ed.js";import{s as p,a as m}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_}from"./søkerinfo-d0fdfcae.js";import{A as U}from"./AxiosMock-ed819255.js";import{U as T}from"./UttaksplanInfo-b2838da9.js";import{i as v}from"./amplitude-db41cfb9.js";import{M as P}from"./dateFormValidation-bfde5cde.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-c95d8939.js";import"./uttaksPlanStatus-4880748a.js";import"./stringUtils-ee6805af.js";import"./apiInterceptor-716e24db.js";import"./timezone-b3f5c703.js";import"./index-bcca6cba.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-3fe99876.js";import"./IntlProvider-4448d7ec.js";import"./dates-096df86f.js";import"./provider-40d4318a.js";import"./uttaksplanInfoUtils-4e93fc0c.js";import"./uttaksplanHarForMangeFlerbarnsuker-bfdd82b6.js";import"./eksisterendeSakUtils-e9e81b77.js";import"./dateUtils-dfe049d0.js";import"./velkommenUtils-228b2bf6.js";import"./index-47edccfa.js";import"./Tag-70ce2969.js";import"./Uttaksplan-8003b46c.js";import"./FormikFileUploader-a4d3b0c4.js";import"./AttachmentList-36ade0db.js";import"./Attachment-46d026a8.js";import"./ExpansionCard-7ff5568c.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-05558051.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./formUtils-28f62441.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-9ae25833.js";import"./Ingress-f6f9f70c.js";import"./InfoOmSøknaden-6a4fe26b.js";import"./amplitude.esm-2809efde.js";const b="/innsyn/v2/annenPartVedtak",g="/konto",l=_,Kn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:T},k=n=>{v();const A=s=>{s.onPost(b).replyOnce(200,void 0,I.FINISHED),s.onGet(g).replyOnce(200,n.stønadskonto100),s.onGet(g).replyOnce(200,n.stønadskonto80)};return a.jsx(P,{initialEntries:[M.UTTAKSPLAN_INFO],children:a.jsx(U,{mock:A,children:a.jsx(u,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(T,{søkerInfo:y(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=k.bind({});t.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.HUNDRE_PROSENT};const r=k.bind({});r.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l,dekningsgrad:O.ÅTTI_PROSENT};const o=k.bind({});o.args={stønadskonto100:p,stønadskonto80:m,barn:{type:d.FØDT,fødselsdatoer:[i("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:l};var f,S,F;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
