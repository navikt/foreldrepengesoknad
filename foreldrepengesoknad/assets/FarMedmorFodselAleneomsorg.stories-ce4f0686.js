import{j as r}from"./jsx-runtime-d079401a.js";import{w as k}from"./withRouter-056ed14f.js";import{A as f}from"./AxiosMock-b335a275.js";import{R as S}from"./api-d4d72804.js";import{s as c,a as F}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-b1edbd20.js";import{F as x,C as o}from"./FpDataContext-fc20d236.js";import{m as g}from"./mapSøkerinfoDTO-d0c19276.js";import{d as a}from"./Tidsperioden-5c018ee5.js";import{B as A}from"./barnUtils-4f67c377.js";import"./index-2d278ef6.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./validation-631bcf6e.js";import"./dateFormValidation-ab672986.js";import"./dates-533c16bb.js";import"./Periodene-51bd0265.js";import"./Perioden-5c608f1b.js";import"./uttaksPlanStatus-4bdd2373.js";import"./stringUtils-e4a92736.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-af72f4f3.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-24384461.js";import"./FormikFileUploader-085e0304.js";import"./AttachmentList-10b10bff.js";import"./Attachment-2af9db68.js";import"./Link-13f307fd.js";import"./IntlProvider-0c407e3c.js";import"./Alert-403824b2.js";import"./provider-fcac13f7.js";import"./ExpansionCard-df6dc809.js";import"./links-b36d21ab.js";import"./leggTilPeriode-e49539c8.js";import"./arbeidsforholdUtils-0941c07c.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-b6b1ba0f.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-2348db3e.js";import"./dateUtils-bf2e6d4b.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-561957bb.js";import"./velkommenUtils-6c253399.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const N={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},O="/innsyn/v2/annenPartVedtak",s="/konto",D=N,yt={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},T=n=>{const l=async e=>{e.onPost(O).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,n.stønadskonto100),await e.onGet(s).replyOnce(200,n.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(x,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[o.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:g(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=T.bind({});t.args={stønadskonto100:c,stønadskonto80:F,søkerinfo:D};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  const restMock = async (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
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
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Et=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{t as UttaksplanInfoFarMedmorFødselAleneomsorg,Et as __namedExportsOrder,yt as default};
