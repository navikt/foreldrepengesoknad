import{j as a}from"./jsx-runtime-DtaoT6pD.js";import{w as D}from"./withRouter-Y7oi-tYz.js";import{A as N}from"./AxiosMock-KQlr1Nb8.js";import{F as T,U as M}from"./UttaksplanInfo-10B08EuT.js";import{R as O}from"./api-PCBAHsoT.js";import{F as R,C as r}from"./FpDataContext-vZKgGA8_.js";import{m as E}from"./mapSøkerinfoDTO-YP8N9YZY.js";import{d as s}from"./Tidsperioden-2d_zadTE.js";import{B as A}from"./barnUtils-h4EDmpw3.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-aaqGQ_dj.js";import"./dates-BDcfIrhq.js";import"./Periodene-FeW126ra.js";import"./Perioden-RLDz9uWW.js";import"./uttaksPlanStatus-LgTHQ4WU.js";import"./stringUtils-n8izj1FP.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./stepsConfig-e97TxKrD.js";import"./amplitude--qTo3lH-.js";import"./amplitude.esm-OOIXs19H.js";import"./routes-IIwIGa6S.js";import"./Uttaksplan-794uH-Ql.js";import"./FormikFileUploader-ZstSdyRH.js";import"./AttachmentList-8zPlJAaZ.js";import"./Attachment-PxACXjOX.js";import"./Link-IggFwnrW.js";import"./IntlProvider-eOIIgBUy.js";import"./Alert-OmuhvhWR.js";import"./provider-hl4zZLWq.js";import"./ExpansionCard-2pe3TaGZ.js";import"./links-BwIVhdNo.js";import"./leggTilPeriode-8JEB_1Ph.js";import"./arbeidsforholdUtils-JS96dF4z.js";import"./_baseIteratee-j829L0Q9.js";import"./_baseUniq-2KlOTSab.js";import"./index-w2TxLgAC.js";import"./BackButton-wq7GY9KI.js";import"./LenkeKnapp-VMWcRTHZ.js";import"./InfoOmSøknaden-A87DSGoy.js";import"./dateUtils-OZb8Q1fw.js";import"./Ingress-xQnNY-7S.js";import"./eksisterendeSakUtils-34MS1kwV.js";import"./velkommenUtils-TB_Dbj6j.js";import"./Tag-WODZmQq7.js";import"./index-lbrLmSir.js";import"./v4-yQnnJER4.js";const I={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y={FORELDREPENGER:250},u={farRundtFødsel:0,generellMinsterett:0,toTette:0},F={kontoer:y,minsteretter:u},v={FORELDREPENGER:200},U={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:v,minsteretter:U},_="/innsyn/v2/annenPartVedtak",i="/konto",c=I,Pe={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:T,decorators:[D]},x=n=>{const g=o=>{o.onPost(_).replyOnce(200,void 0,O.FINISHED),o.onGet(i).replyOnce(200,n.stønadskonto100),o.onGet(i).replyOnce(200,n.stønadskonto80)};return a.jsx(N,{mock:g,children:a.jsx(R,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[s("2021-07-01").toDate()],antallBarn:1,termindato:s("2021-07-01").toDate()},[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:n.annenForelder},children:a.jsx(M,{søkerInfo:E(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=x.bind({});e.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};const t=x.bind({});t.args={stønadskonto100:S,stønadskonto80:F,søkerinfo:c,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var p,d,l;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const Le=["UttaksplanDerMorIkkeHarRettPåForeldrepenger","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{e as UttaksplanDerMorIkkeHarRettPåForeldrepenger,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,Le as __namedExportsOrder,Pe as default};
