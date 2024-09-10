import{i as D,j as s}from"./ByttBrowserModal-D-dl2k5L.js";import{a as c}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as u,S as A,C as n}from"./routes-b_WeQUFK.js";import{M as O,T as o,D as l,A as V}from"./useSvpNavigator-CQmO1TTH.js";import{P as g}from"./PerioderStep-QH5_XOAX.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./minMax-Bl9Cwq6Q.js";import"./Checkbox-CepFfn-8.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./dateUtils-CG7y_F0H.js";import"./Bedriftsbanner-Dv3RVD03.js";import"./tilretteleggingUtils-Hmee-pNo.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-D2Tl9U6F.js";import"./ReadMore-DkhEVH8s.js";import"./Plus-C145UCtF.js";const P=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],h={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},a=()=>(...t)=>(c("button-click")(...t),Promise.resolve()),W={component:g,render:({gåTilNesteSide:t=c("button-click"),tilrettelegging:y,barn:b=h,...S})=>(D(),s.jsx(O,{initialEntries:[u.PERIODER],children:s.jsx(A,{onDispatch:t,initialState:{[n.TILRETTELEGGINGER]:y,[n.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[n.OM_BARNET]:b},children:s.jsx(g,{...S})})}))},e={args:{arbeidsforhold:P,mellomlagreSøknadOgNaviger:a(),avbrytSøknad:a(),tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:o.DELVIS,delvisTilretteleggingPeriodeType:l.VARIERTE_PERIODER}]}},r={args:{...e.args,tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:o.DELVIS,delvisTilretteleggingPeriodeType:l.VARIERTE_PERIODER}],barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}}},i={args:{...e.args,tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",behovForTilretteleggingFom:"2023-09-01",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",type:V.VIRKSOMHET,startdato:"2023-09-01",stillinger:[{fom:"2023-09-01",stillingsprosent:10},{fom:"2023-10-01",stillingsprosent:20},{fom:"2023-11-01",stillingsprosent:0}]},type:o.DELVIS,delvisTilretteleggingPeriodeType:l.VARIERTE_PERIODER}]}};var d,p,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: promiseAction(),
    tilrettelegging: [({
      id: '263929546-6215-9868-5127-161910165730101',
      arbeidsforhold: {
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [{
          fom: '2019-01-01',
          stillingsprosent: 100
        }]
      },
      type: TilretteleggingstypeOptions.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as Tilrettelegging)]
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var T,f,E;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tilrettelegging: [({
      id: '263929546-6215-9868-5127-161910165730101',
      arbeidsforhold: {
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [{
          fom: '2019-01-01',
          stillingsprosent: 100
        }]
      },
      type: TilretteleggingstypeOptions.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as Tilrettelegging)],
    barn: {
      erBarnetFødt: true,
      termindato: '2024-01-18',
      fødselsdato: '2023-02-18'
    }
  }
}`,...(E=(f=r.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var v,R,I;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tilrettelegging: [({
      id: '263929546-6215-9868-5127-161910165730101',
      behovForTilretteleggingFom: '2023-09-01',
      arbeidsforhold: {
        navn: 'Omsorgspartner Vestfold AS',
        type: Arbeidsforholdstype.VIRKSOMHET,
        startdato: '2023-09-01',
        stillinger: [{
          fom: '2023-09-01',
          stillingsprosent: 10
        }, {
          fom: '2023-10-01',
          stillingsprosent: 20
        }, {
          fom: '2023-11-01',
          stillingsprosent: 0
        }]
      },
      type: TilretteleggingstypeOptions.DELVIS,
      delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER
    } as Tilrettelegging)]
  }
}`,...(I=(R=i.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};const X=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,i as FlereStillinger,r as FremTilFødselsdato,X as __namedExportsOrder,W as default};
