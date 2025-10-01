import{j as r}from"./iframe-C9OeWWm6.js";import{f as c,c as b,S as d,T as f,C as t}from"./routes-DpyOdGZS.js";import{D as g,j as o,M as y,R as S,c as u}from"./useSvpNavigator-SBppcWOJ.js";import{P as T}from"./PerioderSteg-CHrNiwf0.js";import"./preload-helper-D9Z9MdNV.js";import"./dateUtils-DRH4CdG-.js";import"./Bedriftsbanner-CGoIEhgy.js";import"./numberUtils-C8dm__ZJ.js";import"./validationUtils-BjwyvFBt.js";import"./Tag-CKjtcAM2.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,a="263929546-6215-9868-5127-161910165730101",i="0132715641-23932-19917-03900-809964087910",N=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:a,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],A={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},E=()=>()=>(p("button-click")(),Promise.resolve()),B={title:"steps/PerioderSteg",component:T,render:({gåTilNesteSide:m=p("button-click"),tilrettelegging:I,valgtTilretteleggingId:l=a,valgteArbeidsforhold:v,barn:R=A,...D})=>r.jsx(y,{initialEntries:[c(d.PERIODER,l)],children:r.jsx(b,{onDispatch:m,initialState:{[t.TILRETTELEGGINGER]:{[l]:I},[t.OM_BARNET]:R,[t.VALGTE_ARBEIDSFORHOLD]:v,[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},children:r.jsx(S,{children:r.jsx(u,{element:r.jsx(T,{...D}),path:`/${d.PERIODER}/${f}`})})})})},e={args:{arbeidsforhold:N,valgteArbeidsforhold:[a],mellomlagreSøknadOgNaviger:E(),avbrytSøknad:E(),tilrettelegging:{type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER}}},s={args:{...e.args,tilrettelegging:{type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},n={args:{...e.args,valgtTilretteleggingId:i,valgteArbeidsforhold:[i],tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:o.DELVIS,delvisTilretteleggingPeriodeType:g.VARIERTE_PERIODER}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const j=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,n as FlereStillinger,s as FremTilFødselsdato,j as __namedExportsOrder,B as default};
