import{j as r}from"./iframe-BkuJwZAo.js";import{f as L,c as O,S as d,T as G,C as t}from"./routes-B8DAnnZY.js";import{D as g,j as o,M as P,R as F,c as h}from"./useSvpNavigator-BEugIXb2.js";import{P as T}from"./PerioderSteg-oN8T6f_L.js";import"./dateUtils-BTuOb4qL.js";import"./Bedriftsbanner-CydlfCSi.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-CX8ohfQO.js";import"./Tag-Do8vb20p.js";const{action:y}=__STORYBOOK_MODULE_ACTIONS__,a="263929546-6215-9868-5127-161910165730101",i="0132715641-23932-19917-03900-809964087910",V=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:a,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],k={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},E=()=>()=>(y("button-click")(),Promise.resolve()),J={title:"steps/PerioderSteg",component:T,render:({gåTilNesteSide:S=y("button-click"),tilrettelegging:u,valgtTilretteleggingId:l=a,valgteArbeidsforhold:N,barn:A=k,..._})=>r.jsx(P,{initialEntries:[L(d.PERIODER,l)],children:r.jsx(O,{onDispatch:S,initialState:{[t.TILRETTELEGGINGER]:{[l]:u},[t.OM_BARNET]:A,[t.VALGTE_ARBEIDSFORHOLD]:N,[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},children:r.jsx(F,{children:r.jsx(h,{element:r.jsx(T,{..._}),path:`/${d.PERIODER}/${G}`})})})})},e={args:{arbeidsforhold:V,valgteArbeidsforhold:[a],mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),tilrettelegging:{type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER}}},s={args:{...e.args,tilrettelegging:{type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},n={args:{...e.args,valgtTilretteleggingId:i,valgteArbeidsforhold:[i],tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER}}};var p,m,I;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(I=(m=e.parameters)==null?void 0:m.docs)==null?void 0:I.source}}};var v,R,D;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(D=(R=s.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var c,b,f;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(f=(b=n.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const $=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,n as FlereStillinger,s as FremTilFødselsdato,$ as __namedExportsOrder,J as default};
