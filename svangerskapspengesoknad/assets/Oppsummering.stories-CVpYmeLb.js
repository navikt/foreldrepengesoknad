import{i as l,j as i,f as p,I as v}from"./ByttBrowserModal-BQ7n7_p4.js";import{a as m}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as f,S as I}from"./attachmentType-CO8SwnHI.js";import{N as S}from"./EgenNæringPanel-yRVS92W5.js";import{a as T,S as E,C as e}from"./routes-BDkzdM6_.js";import{M as b,A as u,T as N}from"./useSvpNavigator-p4jn1obw.js";import{O as s}from"./Oppsummering-BZf7wlQ1.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DXWtzJd9.js";import"./Checkbox-CsU1Ac3Q.js";import"./ReadMore-aZXJscPJ.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./BoIUtlandetOppsummeringspunkt-B4CTkoL8.js";import"./apiInterceptor-DfqAa4et.js";import"./ConfirmationPanel-DvaxNtwV.js";import"./dateUtils-C4uirKUS.js";import"./tilretteleggingUtils-DTNrnPaL.js";const k={arbeidsforhold:[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],søker:{etternavn:"Oravakangas",fornavn:"Erlinga-Mask",fnr:"30088930610",fødselsdato:"1989-08-30",kjønn:"K",barn:[]}},n=()=>(...t)=>(m("button-click")(...t),Promise.resolve()),H={title:"steps/Oppsummering",component:s,render:({gåTilNesteSide:t=m("button-click"),...g})=>(l(),i.jsx(b,{initialEntries:[T.OPPSUMMERING],children:i.jsx(E,{onDispatch:t,initialState:{[e.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:u.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:N.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:f.TILRETTELEGGING,skjemanummer:I.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[e.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!0,harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!0},[e.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},[e.UTENLANDSOPPHOLD]:{skalBoUtenforNorgeNeste12Mnd:!1,harBoddUtenforNorgeSiste12Mnd:!1},[e.ARBEID_I_UTLANDET]:{arbeidIUtlandet:[{arbeidsgiverNavn:"MUFC",fom:"2024-01-01",land:"SE",pågående:!0,tom:""}]},[e.FRILANS]:{jobberFremdelesSomFrilans:!1,oppstart:"2023-01-01"},[e.EGEN_NÆRING]:{navnPåNæringen:"Skitt fiske",fomDato:p().subtract(5,"years").format(v),tomDato:"",næringstype:S.FISKER,pågående:!0,registrertINorge:!0,næringsinntekt:7e5,organisasjonsnummer:"12132323",hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0,varigEndringDato:"2024-01-01",varigEndringInntektEtterEndring:"500000"}},children:i.jsx(s,{...g})})}))},r={args:{sendSøknad:()=>Promise.resolve(),søkerInfo:k,mellomlagreSøknadOgNaviger:n(),avbrytSøknad:n()}};var o,a,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    sendSøknad: () => Promise.resolve(),
    søkerInfo: DEFAULT_SØKERINFO,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction()
  }
}`,...(d=(a=r.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const J=["Default"];export{r as Default,J as __namedExportsOrder,H as default};
