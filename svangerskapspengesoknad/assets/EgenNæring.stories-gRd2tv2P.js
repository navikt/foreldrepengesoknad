import{j as t}from"./tslib.es6-C_-gbNBy.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as g,S as m}from"./attachmentType-CO8SwnHI.js";import{i as T}from"./ByttBrowserModal-iiEVx-55.js";import{a as v,S as f,C as i}from"./routes-BKH065He.js";import{M as S,A as E,T as b}from"./useSvpNavigator-Bmm3IUMq.js";import{E as d}from"./EgenNæringStep-Dl9eCJ05.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./dateFormValidation-BKcBHHfi.js";import"./_baseIteratee-Dyzk-1k8.js";import"./_baseUniq-DYqiuyAy.js";import"./ErrorSummaryHookForm-DTQrR26r.js";import"./Checkbox-CH-QuQDz.js";import"./EgenNæring-DdBVG6ty.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-Ipqx8FzI.js";import"./velgArbeidFormUtils-NVEofYxq.js";import"./ReadMore-Buh9l1h-.js";const P={title:"steps/EgenNæringStep",component:d},n=()=>(...r)=>(p("button-click")(...r),Promise.resolve()),u=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],I=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:l})=>(T(),t.jsx(S,{initialEntries:[v.NÆRING],children:t.jsx(f,{onDispatch:l,initialState:{[i.INNTEKTSINFORMASJON]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1},[i.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:E.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:b.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:g.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(d,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:u})})})),e=I.bind({});var o,a,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
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
          file: {} as any,
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
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const B=["Default"];export{e as Default,B as __namedExportsOrder,P as default};
