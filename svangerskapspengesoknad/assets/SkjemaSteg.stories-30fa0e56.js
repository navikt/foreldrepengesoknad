import{j as T}from"./Modal-5f6515f6.js";import"./index-f1f2c4b1.js";import{a as P}from"./attachmentApi-1d2d61fa.js";import{S as p}from"./skjemanummer-548210a8.js";import{A as d}from"./attachmentType-1d378a15.js";import"./amplitude-8a437012.js";import{a as K}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as j,C as i}from"./routes-345f7acb.js";import{A as R}from"./useFortsettSøknadSenere-905f921d.js";import{S as L,M as B}from"./SkjemaSteg-6aabeae8.js";import"./index-da441cba.js";import"./fridagerUtils-89ecc5b6.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./ErrorSummaryHookForm-87de6d5c.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ArrowRight-7eea1688.js";import"./IntlProvider-a265d545.js";import"./links-439b6638.js";import"./VStack-f6b4d53e.js";import"./Alert-cf9fd4d3.js";import"./createIntl-f391d6e4.js";import"./validation-631bcf6e.js";import"./Bedriftsbanner-c68625a7.js";const fe={title:"steps/SkjemaSteg",component:L},e={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:R.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},H=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],S=()=>(...g)=>(K("button-click")(...g),Promise.resolve()),t=({mellomlagreSøknadOgNaviger:g=S(),gåTilNesteSide:V,skalFeileOpplasting:C,maxAntallVedlegg:_=40,tilrettelegging:J})=>{const m=new B(P);return C||(m.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(200),m.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200)),T.jsx(j,{onDispatch:V,initialState:{[i.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.TILRETTELEGGINGER]:J,[i.VALGT_TILRETTELEGGING_ID]:"990322244",[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:T.jsx(L,{mellomlagreSøknadOgNaviger:g,avbrytSøknad:S(),arbeidsforhold:H,maxAntallVedlegg:_})})},a=t.bind({});a.args={tilrettelegging:[e],skalFeileOpplasting:!1};const n=t.bind({});n.args={tilrettelegging:[e],skalFeileOpplasting:!0};const r=t.bind({});r.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:d.TILRETTELEGGING,skjemanummer:p.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1};const s=t.bind({});s.args={tilrettelegging:[e,e],skalFeileOpplasting:!1};const l=t.bind({});l.args={tilrettelegging:[{...e,arbeidsforhold:{...e.arbeidsforhold,type:R.FRILANSER}}],skalFeileOpplasting:!1};const o=t.bind({});o.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:d.TILRETTELEGGING,skjemanummer:p.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:d.TILRETTELEGGING,skjemanummer:p.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1,maxAntallVedlegg:2};var c,v,x;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(x=(v=a.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var k,E,f;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(f=(E=n.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var N,I,A;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(A=(I=r.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var F,b,h;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var O,G,y;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(y=(G=l.parameters)==null?void 0:G.docs)==null?void 0:y.source}}};var u,M,D;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <SkjemaSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} maxAntallVedlegg={maxAntallVedlegg} />
        </SvpDataContext>;
}`,...(D=(M=o.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};const Ne=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{l as ErTypeFrilans,o as KanMaxHaToVedlegg,s as MedToTilrettelegginger,r as MedVedlegg,n as SkalFeileOpplasting,a as SkalIkkeFeileOpplasting,Ne as __namedExportsOrder,fe as default};
