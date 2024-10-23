import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a as b}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{a as L,S as A,C as n}from"./routes-B1fb87EI.js";import{M as P,T as g,D as a}from"./useSvpNavigator-yfJ1o2OX.js";import{i as _}from"./VeiviserPage-DPeYfbGG.js";import{P as d}from"./PerioderStep-MAyx7EtR.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./minMax-BeRBV8CB.js";import"./_baseUniq-BRhi2-IM.js";import"./index-BRV0Se7Z.js";import"./index-vZN_Bsf0.js";import"./ErrorSummaryHookForm-C03QHvL8.js";import"./Checkbox-BLvctaFa.js";import"./dateUtils-DnafmBGO.js";import"./Bedriftsbanner-pytk0qyo.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-CUnokTVc.js";import"./ReadMore-CJAWNmD8.js";import"./Plus-C9cnxDk0.js";const u="263929546-6215-9868-5127-161910165730101",t="0132715641-23932-19917-03900-809964087910",F=[{arbeidsgiverId:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"149599873-5769-19110-21897-6184606004018",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"86832061-1118-9701-6179-20647729409710",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"186699244-06994-0884-1562-860234771205",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:u,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:t,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-09-01",stillingsprosent:10},{arbeidsgiverId:t,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-10-01",stillingsprosent:20},{arbeidsgiverId:t,arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2023-11-01",stillingsprosent:0}],V={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},p=()=>(...s)=>(b("button-click")(...s),Promise.resolve()),Y={title:"steps/PerioderStep",component:d,render:({gåTilNesteSide:s=b("button-click"),tilrettelegging:f,valgtTilrettelegging:l=u,barn:S=V,...N})=>(_(),o.jsx(P,{initialEntries:[L.PERIODER],children:o.jsx(A,{onDispatch:s,initialState:{[n.TILRETTELEGGINGER]:{[l]:f},[n.VALGT_TILRETTELEGGING_ID]:l,[n.OM_BARNET]:S},children:o.jsx(d,{...N})})}))},e={args:{arbeidsforhold:F,mellomlagreSøknadOgNaviger:p(),avbrytSøknad:p(),tilrettelegging:{type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER}}},r={args:{...e.args,tilrettelegging:{type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER},barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},i={args:{...e.args,valgtTilrettelegging:t,tilrettelegging:{behovForTilretteleggingFom:"2023-09-01",type:g.DELVIS,delvisTilretteleggingPeriodeType:a.VARIERTE_PERIODER}}};var m,T,E;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    tilrettelegging: {
      type: Tilretteleggingstype.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as DelvisTilrettelegging
  }
}`,...(E=(T=e.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var v,I,R;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(R=(I=r.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var c,D,y;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    valgtTilrettelegging: ANNEN_TILRETTELEGGING_ID,
    tilrettelegging: {
      behovForTilretteleggingFom: '2023-09-01',
      type: Tilretteleggingstype.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as DelvisTilrettelegging
  }
}`,...(y=(D=i.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};const $=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,i as FlereStillinger,r as FremTilFødselsdato,$ as __namedExportsOrder,Y as default};
