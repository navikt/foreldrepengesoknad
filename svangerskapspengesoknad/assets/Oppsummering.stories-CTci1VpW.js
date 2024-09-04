import{i as p,j as t,f,I as T}from"./ByttBrowserModal-B0_Lz7to.js";import{a as d}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as v,S as E}from"./attachmentType-CO8SwnHI.js";import{N as S}from"./EgenNæringPanel-CJ_lAXXV.js";import{a as u,S as I,C as e}from"./routes-E6r3g9EM.js";import{M as N,A as b,T as y}from"./useSvpNavigator-DoJmEIyW.js";import{O as g}from"./Oppsummering-BoaSC9By.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DvJ4k8UE.js";import"./Checkbox-EHX0GevH.js";import"./ReadMore-BuABtR1D.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./BoIUtlandetOppsummeringspunkt-MMMoBM6o.js";import"./apiInterceptor-DfqAa4et.js";import"./ConfirmationPanel-BgkMr3VL.js";import"./dateUtils-SvT5BRX6.js";import"./tilretteleggingUtils-BDeNJYbV.js";const z={title:"steps/Oppsummering",component:g},k={arbeidsforhold:[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],søker:{etternavn:"Oravakangas",fornavn:"Erlinga-Mask",fnr:"30088930610",fødselsdato:"1989-08-30",kjønn:"K",barn:[]}},i=()=>(...n)=>(d("button-click")(...n),Promise.resolve()),O=({mellomlagreSøknadOgNaviger:n=i(),gåTilNesteSide:l=d("button-click"),sendSøknad:m=()=>Promise.resolve()})=>(p(),t.jsx(N,{initialEntries:[u.OPPSUMMERING],children:t.jsx(I,{onDispatch:l,initialState:{[e.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:b.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:y.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:v.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[e.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!0},[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},[e.UTENLANDSOPPHOLD]:{skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!1},[e.ARBEID_I_UTLANDET]:{arbeidIUtlandet:[{arbeidsgiverNavn:"MUFC",fom:"2024-01-01",land:"SE",pågående:!0,tom:""}]},[e.FRILANS]:{jobberFremdelesSomFrilans:!1,oppstart:"2023-01-01"},[e.EGEN_NÆRING]:{navnPåNæringen:"Skitt fiske",fomDato:f().subtract(5,"years").format(T),tomDato:"",næringstype:S.FISKER,pågående:!0,registrertINorge:!0,næringsinntekt:7e5,organisasjonsnummer:"12132323",hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,varigEndringDato:"2024-01-01",varigEndringInntektEtterEndring:"500000"}},children:t.jsx(g,{mellomlagreSøknadOgNaviger:n,avbrytSøknad:i(),søkerInfo:k,sendSøknad:m})})})),r=O.bind({});var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
        næringsinntekt: 700000,
        organisasjonsnummer: '12132323',
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
        varigEndringDato: '2024-01-01',
        varigEndringInntektEtterEndring: '500000'
      }
    }}>
                <Oppsummering mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={søkerinfo} sendSøknad={sendSøknad} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const q=["Default"];export{r as Default,q as __namedExportsOrder,z as default};
