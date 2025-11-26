import{j as r}from"./iframe-BeHiBvQa.js";import{f as R,c as b,S as d,T as c,C as t}from"./routes-CQTDEKNm.js";import{D as n,M as D,R as f,c as u}from"./useSvpNavigator-BMMTX0EN.js";import{P as T}from"./PerioderSteg-b99mjRvO.js";import"./preload-helper-D9Z9MdNV.js";import"./dateUtils-DzhwBaQq.js";import"./Bedriftsbanner-BBsaxI5Z.js";import"./numberUtils-C8dm__ZJ.js";import"./validationUtils-xR04vroP.js";import"./Tag-BvSfCpmA.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,l="263929546-6215-9868-5127-161910165730101",i="0132715641-23932-19917-03900-809964087910",y=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:l,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:i,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],N={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},_=()=>()=>(g("button-click")(),Promise.resolve()),x={title:"steps/PerioderSteg",component:T,render:({gåTilNesteSide:m=g("button-click"),tilrettelegging:v,valgtTilretteleggingId:a=l,valgteArbeidsforhold:E,barn:p=N,...I})=>r.jsx(D,{initialEntries:[R(d.PERIODER,a)],children:r.jsx(b,{onDispatch:m,initialState:{[t.TILRETTELEGGINGER]:{[a]:v},[t.OM_BARNET]:p,[t.VALGTE_ARBEIDSFORHOLD]:E,[t.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattArbeidIUtlandet:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},children:r.jsx(f,{children:r.jsx(u,{element:r.jsx(T,{...I}),path:`/${d.PERIODER}/${c}`})})})})},e={args:{arbeidsforhold:y,valgteArbeidsforhold:[l],mellomlagreSøknadOgNaviger:_(),avbrytSøknad:()=>g("button-click"),tilrettelegging:{type:"delvis",delvisTilretteleggingPeriodeType:n.VARIERTE_PERIODER,behovForTilretteleggingFom:"2023-09-01"}}},s={args:{...e.args,tilrettelegging:{type:"delvis",delvisTilretteleggingPeriodeType:n.VARIERTE_PERIODER,behovForTilretteleggingFom:"2023-09-01"},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},o={args:{...e.args,valgtTilretteleggingId:i,valgteArbeidsforhold:[i],tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:"delvis",delvisTilretteleggingPeriodeType:n.VARIERTE_PERIODER}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    valgteArbeidsforhold: [TILRETTELEGGING_ID],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: () => action('button-click'),
    tilrettelegging: {
      type: 'delvis',
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
      behovForTilretteleggingFom: '2023-09-01'
    } satisfies DelvisTilrettelegging
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tilrettelegging: {
      type: 'delvis',
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
      behovForTilretteleggingFom: '2023-09-01'
    } satisfies DelvisTilrettelegging,
    barn: {
      erBarnetFødt: true,
      termindato: '2024-01-18',
      fødselsdato: '2023-02-18'
    }
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    valgtTilretteleggingId: ANNEN_TILRETTELEGGING_ID,
    valgteArbeidsforhold: [ANNEN_TILRETTELEGGING_ID],
    tilrettelegging: {
      behovForTilretteleggingFom: '2023-09-01',
      type: 'delvis',
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } satisfies DelvisTilrettelegging
  }
}`,...o.parameters?.docs?.source}}};const B=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,o as FlereStillinger,s as FremTilFødselsdato,B as __namedExportsOrder,x as default};
