import{j as a}from"./jsx-runtime-d079401a.js";import{w as T}from"./withRouter-d9926836.js";import{A}from"./AxiosMock-3df40305.js";import{R as D}from"./api-adcf682b.js";import{s as f,a as S}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as g}from"./UttaksplanInfo-ecb9b11b.js";import{F as M,C as r}from"./FpDataContext-fc20d236.js";import{m as E}from"./mapSøkerinfoDTO-f8d3f6d6.js";import{d as F}from"./Tidsperioden-c7c469a7.js";import{B as x}from"./barnUtils-0a7beb48.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-d706a9c9.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c51310cf.js";import"./dates-af043b32.js";import"./Periodene-73c34e76.js";import"./Perioden-1f3f8ca0.js";import"./uttaksPlanStatus-fe18f64e.js";import"./stringUtils-7a5d7d65.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-ab908a62.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-8efc2f05.js";import"./FormikFileUploader-2d256b86.js";import"./AttachmentList-e829e220.js";import"./Attachment-33f4575d.js";import"./Link-13f307fd.js";import"./IntlProvider-6f6ec735.js";import"./Alert-d624eb67.js";import"./provider-4d9680fc.js";import"./ExpansionCard-cdfa7095.js";import"./links-4d39192e.js";import"./leggTilPeriode-d6793749.js";import"./arbeidsforholdUtils-aebcba96.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-bce098ee.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-40e952a6.js";import"./dateUtils-de29fba0.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-d9114f18.js";import"./velkommenUtils-858326ea.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const R={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},u="/innsyn/v2/annenPartVedtak",s="/konto",c=R,Un={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:g,decorators:[T]},N=t=>{const O=o=>{o.onPost(u).replyOnce(200,void 0,D.FINISHED),o.onGet(s).replyOnce(200,t.stønadskonto100),o.onGet(s).replyOnce(200,t.stønadskonto80)};return a.jsx(A,{mock:O,children:a.jsx(M,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:t.barn,[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(g,{søkerInfo:E(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=N.bind({});n.args={stønadskonto100:f,stønadskonto80:S,barn:{type:x.FØDT,fødselsdatoer:[F("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:c};const e=N.bind({});e.args={stønadskonto100:f,stønadskonto80:S,barn:{type:x.FØDT,fødselsdatoer:[F("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:c};var i,p,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: args.barn,
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
        </AxiosMock>;
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,l,k;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: args.barn,
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
        </AxiosMock>;
}`,...(k=(l=e.parameters)==null?void 0:l.docs)==null?void 0:k.source}}};const yn=["UttaksplanInfoFarMedmorFødselBeggeHarRett","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{n as UttaksplanInfoFarMedmorFødselBeggeHarRett,e as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,yn as __namedExportsOrder,Un as default};
