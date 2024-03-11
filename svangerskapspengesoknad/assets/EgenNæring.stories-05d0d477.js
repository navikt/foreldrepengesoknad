import{j as t}from"./index-f7e8eec7.js";import{a as m}from"./chunk-WFFRPTHA-a68c42c5.js";import{A as p,S as g}from"./attachmentType-7a83d42b.js";import{i as T}from"./VStack-28112b15.js";import{a as v,S as f,C as i}from"./routes-ae734381.js";import{A as S,T as E}from"./useSvpNavigator-fc3da1bd.js";import{E as d}from"./EgenNæringStep-e32cd8e4.js";import{M as b}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./Button-a86d3715.js";import"./Modal-3643fac1.js";import"./index-da441cba.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";import"./ErrorSummaryHookForm-6bc22af4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./EgenNæring-1a3aa973.js";import"./Frilans-f45bffb0.js";import"./validationUtils-250fce27.js";import"./velgArbeidFormUtils-b52b57ce.js";import"./Radio-d0ab925f.js";import"./ReadMore-499561cd.js";const q={title:"steps/EgenNæringStep",component:d},n=()=>(...r)=>(m("button-click")(...r),Promise.resolve()),u=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],I=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:l})=>(T(),t.jsx(b,{initialEntries:[v.NÆRING],children:t.jsx(f,{onDispatch:l,initialState:{[i.INNTEKTSINFORMASJON]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1},[i.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:S.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:E.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:p.TILRETTELEGGING,skjemanummer:g.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(d,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:u})})})),e=I.bind({});var o,a,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.NÆRING]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harJobbetSomSelvstendigNæringsdrivende: true,
        harHattArbeidIUtlandet: false,
        harJobbetSomFrilans: false
      },
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
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <EgenNæringStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,q as default};
