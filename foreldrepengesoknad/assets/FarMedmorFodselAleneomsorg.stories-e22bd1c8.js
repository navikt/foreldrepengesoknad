import{j as r}from"./jsx-runtime-d079401a.js";import{w as k}from"./withRouter-056ed14f.js";import{A as f}from"./AxiosMock-b335a275.js";import{R as S}from"./api-a0f6edda.js";import{s as c,a as F}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-d7879eee.js";import{F as x,C as o}from"./FpDataContext-fc20d236.js";import{m as g}from"./mapSøkerinfoDTO-aa29149d.js";import{d as a}from"./Tidsperioden-d39f673c.js";import{B as A}from"./barnUtils-2943bedb.js";import"./index-2d278ef6.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./validation-631bcf6e.js";import"./dateFormValidation-80cee100.js";import"./dates-54b128b9.js";import"./Periodene-08800708.js";import"./Perioden-22dabb05.js";import"./uttaksPlanStatus-4bc3d31e.js";import"./stringUtils-4a2fcc5c.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-81c894d5.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-bf9bef99.js";import"./FormikFileUploader-5a19581c.js";import"./AttachmentList-c97f7e55.js";import"./Attachment-0c250fce.js";import"./Link-13f307fd.js";import"./IntlProvider-e522e5d2.js";import"./Alert-2b03bb1d.js";import"./provider-d52ba294.js";import"./ExpansionCard-9e7512df.js";import"./links-b36d21ab.js";import"./leggTilPeriode-5bd531a5.js";import"./arbeidsforholdUtils-a1831a19.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-9f66eb01.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-e1abbb2a.js";import"./dateUtils-068570bb.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-89e2ca03.js";import"./velkommenUtils-a0694d5f.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const N={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},O="/innsyn/v2/annenPartVedtak",s="/konto",D=N,yt={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},T=n=>{const l=async e=>{e.onPost(O).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,n.stønadskonto100),await e.onGet(s).replyOnce(200,n.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(x,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[o.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:g(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=T.bind({});t.args={stønadskonto100:c,stønadskonto80:F,søkerinfo:D};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
