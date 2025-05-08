import{j as r}from"./index-DDg3ir62.js";import{a as u}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{c as _,a as T,S as G,C as t,T as P}from"./routes-BC9Z9msW.js";import{M as O,R as F,d as h,T as g,D as a}from"./useSvpNavigator-nz51zV2n.js";import{P as p}from"./PerioderSteg-BM3rBp22.js";import"./index-CR__hKHy.js";import"./index-CtmzRm2p.js";import"./v4-CtRu48qb.js";import"./RegisterdataUtdatert-OCsnkJ_Y.js";import"./minMax-rTBP9J_7.js";import"./ErrorSummaryHookForm-Bv91-LyL.js";import"./Checkbox-C_-kuLV3.js";import"./dateUtils-DnPHK_Lp.js";import"./Bedriftsbanner-B3j37ROA.js";import"./numberUtils-sHqsSnTP.js";import"./validationUtils-BVGBANPC.js";import"./Tag-D-KGaEKu.js";import"./ReadMore-BLe69GQT.js";import"./Plus-C3ZAbptl.js";const l="263929546-6215-9868-5127-161910165730101",i="0132715641-23932-19917-03900-809964087910",V=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:l,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],k={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},m=()=>(...n)=>(u("button-click")(...n),Promise.resolve()),re={title:"steps/PerioderSteg",component:p,render:({gåTilNesteSide:n=u("button-click"),tilrettelegging:S,valgtTilretteleggingId:d=l,valgteArbeidsforhold:N,barn:A=k,...L})=>r.jsx(O,{initialEntries:[_(T.PERIODER,d)],children:r.jsx(G,{onDispatch:n,initialState:{[t.TILRETTELEGGINGER]:{[d]:S},[t.OM_BARNET]:A,[t.VALGTE_ARBEIDSFORHOLD]:N,[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},children:r.jsx(F,{children:r.jsx(h,{element:r.jsx(p,{...L}),path:`/${T.PERIODER}/${P}`})})})})},e={args:{arbeidsforhold:V,valgteArbeidsforhold:[l],mellomlagreSøknadOgNaviger:m(),avbrytSøknad:m(),tilrettelegging:{type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER}}},s={args:{...e.args,tilrettelegging:{type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},o={args:{...e.args,valgtTilretteleggingId:i,valgteArbeidsforhold:[i],tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER}}};var E,I,v;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(v=(I=e.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var R,D,b;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(b=(D=s.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var c,f,y;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(y=(f=o.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const ie=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,o as FlereStillinger,s as FremTilFødselsdato,ie as __namedExportsOrder,re as default};
