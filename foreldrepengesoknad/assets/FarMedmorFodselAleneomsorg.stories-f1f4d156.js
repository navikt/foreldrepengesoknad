import{j as a}from"./jsx-runtime-d079401a.js";import{d as s}from"./Tidsperioden-2f191506.js";import{B as N}from"./barnUtils-42471e8d.js";import{D as f}from"./Periodene-93f75033.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{w as O}from"./withRouter-d9926836.js";import{A}from"./AxiosMock-07682dd6.js";import{R as T}from"./useRequest-1bc7422a.js";import{s as S,a as D}from"./stønadskontoDeltUttak100-ce558aaf.js";import{F as R,C as n}from"./FpDataContext-6d6d78b0.js";import{m as u}from"./mapSøkerinfoDTO-7324950a.js";import{U as F}from"./UttaksplanInfo-723ff517.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./index-cdc86f56.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./timezone-29fa0fe3.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./useFpApiData-7196599a.js";import"./eksisterendeSakUtils-e1f0846a.js";import"./dateUtils-0d76b092.js";import"./leggTilPeriode-bd13d552.js";import"./velkommenUtils-76cff43a.js";import"./index-47edccfa.js";import"./Tag-01a82302.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";const M={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},y="/innsyn/v2/annenPartVedtak",i="test/konto",x=M,bn={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:F,decorators:[O]},c=o=>{const E=r=>{r.onPost(y).replyOnce(200,void 0,T.FINISHED),r.onGet(i).replyOnce(200,o.stønadskonto80),r.onGet(i).replyOnce(200,o.stønadskonto100)};return a.jsx(A,{mock:E,children:a.jsx(R,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:N.FØDT,fødselsdatoer:[s("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:s("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:o.dekningsgrad},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(F,{søkerInfo:u(o.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=c.bind({});e.args={stønadskonto100:S,stønadskonto80:D,søkerinfo:x,dekningsgrad:f.HUNDRE_PROSENT};const t=c.bind({});t.args={stønadskonto100:S,stønadskonto80:D,søkerinfo:x,dekningsgrad:f.ÅTTI_PROSENT};var d,m,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,k,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(g=(k=t.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};const jn=["UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100","UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80"];export{e as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100,t as UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80,jn as __namedExportsOrder,bn as default};
