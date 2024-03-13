import{j as t}from"./index-f7e8eec7.js";import{a as d}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,d as E,I as f}from"./VStack-1b7d0c8f.js";import{A as S,S as T}from"./attachmentType-7a83d42b.js";import{a as v,S as N,C as e}from"./routes-01c30f19.js";import{N as u}from"./EgenNæring-1a3aa973.js";import{A as I,T as b}from"./useSvpNavigator-d2e8748f.js";import{O as g}from"./Oppsummering-d08c8dfd.js";import{M as x}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./Button-07c65ca4.js";import"./Modal-d372bfb0.js";import"./index-da441cba.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";import"./attachmentApi-1d2d61fa.js";import"./ReadMore-dee6d77c.js";import"./dateUtils-596e9d2c.js";import"./tilretteleggingUtils-496043bb.js";import"./ArbeidsforholdInformasjon-f6b5263a.js";const Q={title:"steps/Oppsummering",component:g},y={arbeidsforhold:[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],søker:{etternavn:"Oravakangas",fornavn:"Erlinga-Mask",fnr:"30088930610",fødselsdato:"1989-08-30",kjønn:"K",barn:[]}},i=()=>(...n)=>(d("button-click")(...n),Promise.resolve()),k=({mellomlagreSøknadOgNaviger:n=i(),gåTilNesteSide:l=d("button-click"),sendSøknad:m=()=>Promise.resolve()})=>(p(),t.jsx(x,{initialEntries:[v.OPPSUMMERING],children:t.jsx(N,{onDispatch:l,initialState:{[e.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:I.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:b.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:S.TILRETTELEGGING,skjemanummer:T.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[e.INNTEKTSINFORMASJON]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!0},[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},[e.UTENLANDSOPPHOLD]:{skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!1},[e.ARBEID_I_UTLANDET]:{arbeidIUtlandet:[{arbeidsgiverNavn:"MUFC",fom:"2024-01-01",land:"SE",pågående:!0,tom:""}]},[e.FRILANS]:{jobberFremdelesSomFrilans:!1,oppstart:"2023-01-01"},[e.EGEN_NÆRING]:{navnPåNæringen:"Skitt fiske",fomDato:E().subtract(5,"years").format(f),tomDato:"",næringstype:u.FISKER,pågående:!0,registrertINorge:!0,næringsinntekt:"700000",organisasjonsnummer:"12132323",hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,varigEndringDato:"2024-01-01",varigEndringInntektEtterEndring:"500000"}},children:t.jsx(g,{mellomlagreSøknadOgNaviger:n,avbrytSøknad:i(),søkerInfo:y,sendSøknad:m})})})),r=k.bind({});var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  sendSøknad = () => Promise.resolve()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
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
        harHattArbeidIUtlandet: true,
        harJobbetSomFrilans: true,
        harJobbetSomSelvstendigNæringsdrivende: true
      },
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      },
      [ContextDataType.UTENLANDSOPPHOLD]: {
        skalBoUtenforNorgeNeste12Mnd: false,
        harBoddUtenforNorgeSiste12Mnd: false
      },
      [ContextDataType.ARBEID_I_UTLANDET]: {
        arbeidIUtlandet: [{
          arbeidsgiverNavn: 'MUFC',
          fom: '2024-01-01',
          land: 'SE',
          pågående: true,
          tom: ''
        }]
      },
      [ContextDataType.FRILANS]: {
        jobberFremdelesSomFrilans: false,
        oppstart: '2023-01-01'
      },
      [ContextDataType.EGEN_NÆRING]: {
        navnPåNæringen: 'Skitt fiske',
        fomDato: dayjs().subtract(5, 'years').format(ISO_DATE_FORMAT),
        tomDato: '',
        næringstype: Næringstype.FISKER,
        pågående: true,
        registrertINorge: true,
        næringsinntekt: '700000',
        organisasjonsnummer: '12132323',
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
        varigEndringDato: '2024-01-01',
        varigEndringInntektEtterEndring: '500000'
      }
    }}>
                <Oppsummering mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={søkerinfo} sendSøknad={sendSøknad} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const W=["Default"];export{r as Default,W as __namedExportsOrder,Q as default};
