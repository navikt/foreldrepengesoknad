import{j as a}from"./jsx-runtime-69eee039.js";import{w as M}from"./withRouter-f0df7a0f.js";import{A as F}from"./AxiosMock-ee1c53ff.js";import{R}from"./api-37af441c.js";import{s as f,a as S}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as g}from"./UttaksplanInfo-ddaea083.js";import{F as u,C as r}from"./FpDataContext-75ac2616.js";import{m as D}from"./mapSøkerinfoDTO-97167608.js";import{d as c}from"./Tidsperioden-d85ef78f.js";import{B as N}from"./barnUtils-499d6ba0.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-a6e67bdd.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-7b994c51.js";import"./dates-6a016f0f.js";import"./Periodene-a9178143.js";import"./Perioden-3b91fa00.js";import"./uttaksPlanStatus-735e5d33.js";import"./stringUtils-0142dcf8.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./Uttaksplan-dfa35fdf.js";import"./FormikFileUploader-5a8cca88.js";import"./AttachmentList-44783354.js";import"./Attachment-0c980428.js";import"./Link-11d7c909.js";import"./IntlProvider-788f10d0.js";import"./Alert-d5660280.js";import"./provider-91e4eed5.js";import"./ExpansionCard-24c428ff.js";import"./links-b36d21ab.js";import"./leggTilPeriode-2f77dbe8.js";import"./arbeidsforholdUtils-93d6b9aa.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1c52f6e3.js";import"./index-47edccfa.js";import"./BackButton-f1649e6f.js";import"./message-5ceb38b3.js";import"./LenkeKnapp-51387f12.js";import"./InfoOmSøknaden-5bef1722.js";import"./dateUtils-eb722a91.js";import"./Ingress-40110753.js";import"./eksisterendeSakUtils-14d651fe.js";import"./velkommenUtils-171e22cc.js";import"./Tag-8c31ae50.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const E={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},I="/innsyn/v2/annenPartVedtak",s="/konto",O=E,xn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:g,decorators:[M]},T=t=>{const A=o=>{o.onPost(I).replyOnce(200,void 0,R.FINISHED),o.onGet(s).replyOnce(200,t.stønadskonto100),o.onGet(s).replyOnce(200,t.stønadskonto80)};return a.jsx(F,{mock:A,children:a.jsx(u,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:t.barn,[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:a.jsx(g,{søkerInfo:D(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=T.bind({});n.args={stønadskonto100:f,stønadskonto80:S,barn:{type:N.FØDT,fødselsdatoer:[c("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:O};const e=T.bind({});e.args={stønadskonto100:f,stønadskonto80:S,barn:{type:N.FØDT,fødselsdatoer:[c("2022-08-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:O};var i,p,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(k=(l=e.parameters)==null?void 0:l.docs)==null?void 0:k.source}}};const yn=["UttaksplanInfoFarMedmorFødselBeggeHarRett","UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB"];export{n as UttaksplanInfoFarMedmorFødselBeggeHarRett,e as UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB,yn as __namedExportsOrder,xn as default};
//# sourceMappingURL=FarMedmorFodselBeggeHarRett.stories-e3b80cb7.js.map
