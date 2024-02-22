import{j as n}from"./Modal-5f6515f6.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as g,C as e}from"./routes-345f7acb.js";import{O as d}from"./Oppsummering-8fada4b7.js";import{A as T,T as f}from"./useFortsettSøknadSenere-bfd4ef8d.js";import{S as v}from"./skjemanummer-548210a8.js";import{A as S}from"./attachmentType-1d378a15.js";import"./amplitude-ef1b2f86.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-c1457aac.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./attachmentApi-1d2d61fa.js";import"./IntlProvider-980bad70.js";import"./links-439b6638.js";import"./VStack-f6b4d53e.js";import"./Alert-4f08e6e5.js";import"./createIntl-f391d6e4.js";import"./ArrowRight-7eea1688.js";import"./validation-631bcf6e.js";import"./egenNæringFormUtils-aa1ac1bc.js";import"./dateUtils-8841aa4b.js";import"./ArbeidsforholdInformasjon-68722e1f.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";const Q={title:"steps/Oppsummering",component:d},E={arbeidsforhold:[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],søker:{etternavn:"Oravakangas",fornavn:"Erlinga-Mask",fnr:"30088930610",fødselsdato:"1989-08-30",kjønn:"K",barn:[]}},i=()=>(...t)=>(p("button-click")(...t),Promise.resolve()),N=({mellomlagreSøknadOgNaviger:t=i(),gåTilNesteSide:l,sendSøknad:m=()=>Promise.resolve()})=>n.jsx(g,{onDispatch:l,initialState:{[e.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:T.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:f.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:S.TILRETTELEGGING,skjemanummer:v.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[e.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},[e.UTENLANDSOPPHOLD]:{iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0}},children:n.jsx(d,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:i(),søkerInfo:E,sendSøknad:m})}),r=N.bind({});var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  sendSøknad = () => Promise.resolve()
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: [{
      id: '263929546-6215-9868-5127-161910165730101',
      arbeidsforhold: {
        arbeidsgiverId: '990322244',
        type: Arbeidsforholdstype.VIRKSOMHET,
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [],
        startdato: '2023-01-01'
      },
      varierendePerioder: [],
      behovForTilretteleggingFom: '2023-01-01',
      type: TilretteleggingstypeOptions.DELVIS,
      vedlegg: [{
        id: 'V134300149934973076055420920289127108',
        file: ({} as any),
        filename: 'vedlegg – Kopi (7).png',
        filesize: 7477,
        uploaded: true,
        pending: false,
        type: AttachmentType.TILRETTELEGGING,
        skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
        url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
        uuid: 'Created'
      }]
    }],
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    },
    [ContextDataType.UTENLANDSOPPHOLD]: {
      iNorgeNeste12Mnd: true,
      iNorgeSiste12Mnd: true
    }
  }}>
            <Oppsummering mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={søkerinfo} sendSøknad={sendSøknad} />
        </SvpDataContext>;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const W=["Default"];export{r as Default,W as __namedExportsOrder,Q as default};
