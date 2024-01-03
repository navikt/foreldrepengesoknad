import{j as a}from"./jsx-runtime-d079401a.js";import{w as D}from"./withRouter-056ed14f.js";import{A as N}from"./AxiosMock-b335a275.js";import{F as T,U as M}from"./UttaksplanInfo-b1edbd20.js";import{R as O}from"./api-d4d72804.js";import{F as R,C as r}from"./FpDataContext-fc20d236.js";import{m as E}from"./mapSøkerinfoDTO-d0c19276.js";import{d as s}from"./Tidsperioden-5c018ee5.js";import{B as A}from"./barnUtils-4f67c377.js";import"./index-2d278ef6.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./validation-631bcf6e.js";import"./dateFormValidation-ab672986.js";import"./dates-533c16bb.js";import"./Periodene-51bd0265.js";import"./Perioden-5c608f1b.js";import"./uttaksPlanStatus-4bdd2373.js";import"./stringUtils-e4a92736.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-af72f4f3.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-9effe5a6.js";import"./Uttaksplan-24384461.js";import"./FormikFileUploader-085e0304.js";import"./AttachmentList-10b10bff.js";import"./Attachment-2af9db68.js";import"./Link-13f307fd.js";import"./IntlProvider-0c407e3c.js";import"./Alert-403824b2.js";import"./provider-fcac13f7.js";import"./ExpansionCard-df6dc809.js";import"./links-b36d21ab.js";import"./leggTilPeriode-e49539c8.js";import"./arbeidsforholdUtils-0941c07c.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./index-47edccfa.js";import"./BackButton-b6b1ba0f.js";import"./LenkeKnapp-9b88ce13.js";import"./InfoOmSøknaden-2348db3e.js";import"./dateUtils-bf2e6d4b.js";import"./Ingress-6c1bbb1b.js";import"./eksisterendeSakUtils-561957bb.js";import"./velkommenUtils-6c253399.js";import"./Tag-01a82302.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";const I={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y={FORELDREPENGER:250},u={farRundtFødsel:0,generellMinsterett:0,toTette:0},F={kontoer:y,minsteretter:u},v={FORELDREPENGER:200},U={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:v,minsteretter:U},P="/innsyn/v2/annenPartVedtak",i="/konto",c=I,_e={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:T,decorators:[D]},x=n=>{const g=o=>{o.onPost(P).replyOnce(200,void 0,O.FINISHED),o.onGet(i).replyOnce(200,n.stønadskonto100),o.onGet(i).replyOnce(200,n.stønadskonto80)};return a.jsx(N,{mock:g,children:a.jsx(R,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[s("2021-07-01").toDate()],antallBarn:1,termindato:s("2021-07-01").toDate()},[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:n.annenForelder},children:a.jsx(M,{søkerInfo:E(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=x.bind({});e.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};const t=x.bind({});t.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var p,d,l;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,k,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const Le=["UttaksplanDerMorIkkeHarRettPåForeldrepenger","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{e as UttaksplanDerMorIkkeHarRettPåForeldrepenger,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Le as __namedExportsOrder,_e as default};
