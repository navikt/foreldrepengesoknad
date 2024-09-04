import{i as P,j as p}from"./ByttBrowserModal-B0_Lz7to.js";import{a as _}from"./chunk-454WOBUV-CM0pFb8Z.js";import{S as V,M as H}from"./SkjemaSteg-Bgy7pqmR.js";import"./index-CTjT7uj6.js";import{g as w}from"./apiInterceptor-DfqAa4et.js";import{A as T,S}from"./attachmentType-CO8SwnHI.js";import{a as Z,S as U,C as g}from"./routes-E6r3g9EM.js";import{A as C,M as z}from"./useSvpNavigator-DoJmEIyW.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-DvJ4k8UE.js";import"./Checkbox-EHX0GevH.js";import"./Bedriftsbanner-B3cMAY3W.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";const t=new File(["abc".repeat(1e5)],"Filnavn1.jpg"),m=new File(["abc".repeat(5e5)],"Filnavn2.jpg"),pe={title:"steps/SkjemaSteg",component:V},e={id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:C.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[]},q=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],k=()=>(...d)=>(_("button-click")(...d),Promise.resolve()),a=({mellomlagreSøknadOgNaviger:d=k(),gåTilNesteSide:J=_("button-click"),skalFeileOpplasting:B,maxAntallVedlegg:K=40,tilrettelegging:j})=>{P();const c=new H(w());return B||(c.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200),c.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200)),p.jsx(z,{initialEntries:[Z.SKJEMA],children:p.jsx(U,{onDispatch:J,initialState:{[g.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[g.TILRETTELEGGINGER]:j,[g.VALGT_TILRETTELEGGING_ID]:"990322244",[g.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:p.jsx(V,{mellomlagreSøknadOgNaviger:d,avbrytSøknad:k(),arbeidsforhold:q,maxAntallVedlegg:K})})})},n=a.bind({});n.args={tilrettelegging:[e],skalFeileOpplasting:!1};const r=a.bind({});r.args={tilrettelegging:[e],skalFeileOpplasting:!0};const i=a.bind({});i.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:T.TILRETTELEGGING,skjemanummer:S.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1};const s=a.bind({});s.args={tilrettelegging:[e,e],skalFeileOpplasting:!1};const l=a.bind({});l.args={tilrettelegging:[{...e,arbeidsforhold:{...e.arbeidsforhold,type:C.FRILANSER}}],skalFeileOpplasting:!1};const o=a.bind({});o.args={tilrettelegging:[{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:t.name,filesize:t.size,file:t,uploaded:!0,pending:!1,type:T.TILRETTELEGGING,skjemanummer:S.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]},{...e,vedlegg:[{id:"V134300149934973076055420920289127108",filename:m.name,filesize:m.size,file:m,uploaded:!0,pending:!1,type:T.TILRETTELEGGING,skjemanummer:S.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],skalFeileOpplasting:!1,maxAntallVedlegg:2};var v,E,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(f=(E=n.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var A,b,I;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(I=(b=r.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var u,N,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(y=(N=i.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var O,G,R;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(R=(G=s.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var x,M,D;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(D=(M=l.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var h,L,F;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
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
}`,...(F=(L=o.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};const me=["SkalIkkeFeileOpplasting","SkalFeileOpplasting","MedVedlegg","MedToTilrettelegginger","ErTypeFrilans","KanMaxHaToVedlegg"];export{l as ErTypeFrilans,o as KanMaxHaToVedlegg,s as MedToTilrettelegginger,i as MedVedlegg,r as SkalFeileOpplasting,n as SkalIkkeFeileOpplasting,me as __namedExportsOrder,pe as default};
