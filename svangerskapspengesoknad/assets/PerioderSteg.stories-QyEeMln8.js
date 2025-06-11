import{j as r}from"./iframe-B-1MWFcT.js";import{f as L,c as O,S as T,T as G,C as t}from"./routes-Ci1DVGAr.js";import{D as o,i as a,M as P,R as F,c as h}from"./useSvpNavigator-BTztKsXx.js";import{P as E}from"./PerioderSteg-Cyv-fGAa.js";import"./dateUtils-CWLbmKft.js";import"./Bedriftsbanner-B3vUm3eR.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-B9YUBnn_.js";import"./Tag-CvLEBaIX.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,l="263929546-6215-9868-5127-161910165730101",i="0132715641-23932-19917-03900-809964087910",V=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:l,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],k={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},p=()=>(...g)=>(S("button-click")(...g),Promise.resolve()),J={title:"steps/PerioderSteg",component:E,render:({gåTilNesteSide:g=S("button-click"),tilrettelegging:u,valgtTilretteleggingId:d=l,valgteArbeidsforhold:N,barn:A=k,..._})=>r.jsx(P,{initialEntries:[L(T.PERIODER,d)],children:r.jsx(O,{onDispatch:g,initialState:{[t.TILRETTELEGGINGER]:{[d]:u},[t.OM_BARNET]:A,[t.VALGTE_ARBEIDSFORHOLD]:N,[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},children:r.jsx(F,{children:r.jsx(h,{element:r.jsx(E,{..._}),path:`/${T.PERIODER}/${G}`})})})})},e={args:{arbeidsforhold:V,valgteArbeidsforhold:[l],mellomlagreSøknadOgNaviger:p(),avbrytSøknad:p(),tilrettelegging:{type:a.DELVIS,delvisTilretteleggingPeriodeType:o.VARIERTE_PERIODER}}},s={args:{...e.args,tilrettelegging:{type:a.DELVIS,delvisTilretteleggingPeriodeType:o.VARIERTE_PERIODER},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},n={args:{...e.args,valgtTilretteleggingId:i,valgteArbeidsforhold:[i],tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:a.DELVIS,delvisTilretteleggingPeriodeType:o.VARIERTE_PERIODER}}};var m,I,v;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgteArbeidsforhold: [TILRETTELEGGING_ID],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    tilrettelegging: {
      type: Tilretteleggingstype.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as DelvisTilrettelegging
  }
}`,...(v=(I=e.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var R,D,c;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tilrettelegging: {
      type: Tilretteleggingstype.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as DelvisTilrettelegging,
    barn: {
      erBarnetFødt: true,
      termindato: '2024-01-18',
      fødselsdato: '2023-02-18'
    }
  }
}`,...(c=(D=s.parameters)==null?void 0:D.docs)==null?void 0:c.source}}};var b,f,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    valgtTilretteleggingId: ANNEN_TILRETTELEGGING_ID,
    valgteArbeidsforhold: [ANNEN_TILRETTELEGGING_ID],
    tilrettelegging: {
      behovForTilretteleggingFom: '2023-09-01',
      type: Tilretteleggingstype.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as DelvisTilrettelegging
  }
}`,...(y=(f=n.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const $=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,n as FlereStillinger,s as FremTilFødselsdato,$ as __namedExportsOrder,J as default};
