import{j as p}from"./tslib.es6-C_-gbNBy.js";import{a as V}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{S as C,M as B}from"./SkjemaSteg-CNfzfanr.js";import"./index-CTjT7uj6.js";import{g as H}from"./apiInterceptor-D9XpNqGK.js";import{A as S,S as T}from"./attachmentType-CO8SwnHI.js";import{i as w}from"./ByttBrowserModal-DkV6ZvDc.js";import{a as Z,S as U,C as g}from"./routes-BKH065He.js";import{A as _,M as z}from"./useSvpNavigator-6gPh0HxU.js";import"./v4-CQkTLCs1.js";import"./minMax-DNM2E0N-.js";import"./Checkbox-D0UPnPR_.js";import"./index-9r8iugjR.js";import"./Bedriftsbanner-Bzww4XgP.js";import"./index-BRV0Se7Z.js";import"./_baseIteratee-BgXxtZRV.js";import"./_baseUniq-IUta85de.js";const t=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),m=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),me={title:"steps/SkjemaSteg",component:C},e={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:_.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},q=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],x=()=>(...d)=>(V("button-click")(...d),Promise.resolve()),a=({mellomlagreSøknadOgNaviger:d=x(),gåTilNesteSide:J=V("button-click"),skalFeileOpplasting:K,maxAntallVedlegg:j=40,tilrettelegging:P})=>{w();const c=new B(H());return K||(c.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200),c.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200)),p.jsx(z,{initialEntries:[Z.SKJEMA],children:p.jsx(U,{onDispatch:J,initialState:{[g.INNTEKTSINFORMASJON]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[g.TILRETTELEGGINGER]:P,[g.VALGT_TILRETTELEGGING_ID]:"990322244",[g.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:p.jsx(C,{mellomlagreSøknadOgNaviger:d,avbrytSøknad:x(),arbeidsforhold:q,maxAntallVedlegg:j})})})},n=a.bind({});n.args={tilrettelegging:[e],skalFeileOpplasting:!1};const r=a.bind({});r.args={tilrettelegging:[e],skalFeileOpplasting:!0};const i=a.bind({});i.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:S.TILRETTELEGGING,skjemanummer:T.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1};const s=a.bind({});s.args={tilrettelegging:[e,e],skalFeileOpplasting:!1};const l=a.bind({});l.args={tilrettelegging:[{...e,arbeidsforhold:{...e.arbeidsforhold,type:_.FRILANSER}}],skalFeileOpplasting:!1};const o=a.bind({});o.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:S.TILRETTELEGGING,skjemanummer:T.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:m.name,filesize:m.size,file:m,uploaded:!0,pending:!1,type:S.TILRETTELEGGING,skjemanummer:T.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1,maxAntallVedlegg:2};var E,k,v;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(v=(k=n.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var f,N,A;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(A=(N=r.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var F,b,I;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(I=(b=i.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var u,y,M;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(M=(y=s.parameters)==null?void 0:y.docs)==null?void 0:M.source}}};var O,G,R;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(R=(G=l.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var h,D,L;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  skalFeileOpplasting,
  maxAntallVedlegg = 40,
  tilrettelegging
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  if (!skalFeileOpplasting) {
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
    apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
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
}`,...(L=(D=o.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};const Se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{l as ErTypeFrilans,o as KanMaxHaToVedlegg,s as MedToTilrettelegginger,i as MedVedlegg,r as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,Se as __namedExportsOrder,me as default};
