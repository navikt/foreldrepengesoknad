import{j as d}from"./index-f7e8eec7.js";import{a as D}from"./chunk-WFFRPTHA-a68c42c5.js";import{S as L,M as P}from"./SkjemaSteg-1c81dd86.js";import"./index-f1f2c4b1.js";import{a as j}from"./attachmentApi-1d2d61fa.js";import{A as p,S as m}from"./attachmentType-7a83d42b.js";import{i as B}from"./VStack-28112b15.js";import{a as H,S as Z,C as s}from"./routes-ae734381.js";import{A as V}from"./useSvpNavigator-fc3da1bd.js";import{M as w}from"./index-0df0c4a0.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./ErrorSummaryHookForm-6bc22af4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./Button-a86d3715.js";import"./Modal-3643fac1.js";import"./index-da441cba.js";import"./Bedriftsbanner-82b43752.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";const ce={title:"steps/SkjemaSteg",component:L},e={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:V.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},U=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],T=()=>(...g)=>(D("button-click")(...g),Promise.resolve()),t=({mellomlagreSøknadOgNaviger:g=T(),gåTilNesteSide:C=D("button-click"),skalFeileOpplasting:_,maxAntallVedlegg:J=40,tilrettelegging:K})=>{B();const S=new P(j);return _||(S.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(200),S.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200)),d.jsx(w,{initialEntries:[H.SKJEMA],children:d.jsx(Z,{onDispatch:C,initialState:{[s.INNTEKTSINFORMASJON]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[s.TILRETTELEGGINGER]:K,[s.VALGT_TILRETTELEGGING_ID]:"990322244",[s.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:d.jsx(L,{mellomlagreSøknadOgNaviger:g,avbrytSøknad:T(),arbeidsforhold:U,maxAntallVedlegg:J})})})},a=t.bind({});a.args={tilrettelegging:[e],skalFeileOpplasting:!1};const n=t.bind({});n.args={tilrettelegging:[e],skalFeileOpplasting:!0};const r=t.bind({});r.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:p.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1};const i=t.bind({});i.args={tilrettelegging:[e,e],skalFeileOpplasting:!1};const o=t.bind({});o.args={tilrettelegging:[{...e,arbeidsforhold:{...e.arbeidsforhold,type:V.FRILANSER}}],skalFeileOpplasting:!1};const l=t.bind({});l.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:p.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...e,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:p.TILRETTELEGGING,skjemanummer:m.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1,maxAntallVedlegg:2};var c,x,E;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(E=(x=a.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var k,v,f;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(f=(v=n.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var N,A,b;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(b=(A=r.parameters)==null?void 0:A.docs)==null?void 0:b.source}}};var F,u,I;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(I=(u=i.parameters)==null?void 0:u.docs)==null?void 0:I.source}}};var y,h,M;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(M=(h=o.parameters)==null?void 0:h.docs)==null?void 0:M.source}}};var O,G,R;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(attachmentApi);
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
  }
  return <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harHattArbeidIUtlandet: false,
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
            </SvpDataContext>
        </MemoryRouter>;
}`,...(R=(G=l.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const xe=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{o as ErTypeFrilans,l as KanMaxHaToVedlegg,i as MedToTilrettelegginger,r as MedVedlegg,n as SkalFeileOpplasting,a as SkalIkkeFeileOpplasting,xe as __namedExportsOrder,ce as default};
