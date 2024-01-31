import{j as i}from"./Modal-5f6515f6.js";import{a as f}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as D,C as o}from"./routes-345f7acb.js";import{_ as I}from"./soknad-056e750f.js";import{T as d,D as T,A as F}from"./useFortsettSøknadSenere-ae1126db.js";import{P as x}from"./PerioderStep-47769786.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-9d650fd8.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./validation-631bcf6e.js";import"./dateFormValidation-8cbaac98.js";import"./dates-1fe13765.js";import"./Bedriftsbanner-0c44b2f1.js";import"./HStack-13158dfb.js";import"./VStack-ea079a1e.js";import"./dateUtils-445f5d04.js";import"./HorizontalLine-831b0129.js";import"./tilretteleggingValidation-91e87c6f.js";import"./BackButton-f80f5ffe.js";import"./Plus-b48ff6db.js";import"./Alert-1e997023.js";const $={title:"steps/PerioderStep",component:x},R=I,n=()=>(...r)=>(f("button-click")(...r),Promise.resolve()),E=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:c,tilrettelegging:S})=>i.jsx(D,{onDispatch:c,initialState:{[o.TILRETTELEGGINGER]:S,[o.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[o.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:i.jsx(x,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),søkerInfo:R.søkerinfo})}),e=E.bind({});e.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:d.DELVIS,delvisTilretteleggingPeriodeType:T.VARIERTE_PERIODER}]};const t=E.bind({});t.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",behovForTilretteleggingFom:"2023-09-01",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",type:F.VIRKSOMHET,startdato:"2023-09-01",stillinger:[{fom:"2023-09-01",stillingsprosent:10},{fom:"2023-10-01",stillingsprosent:20},{fom:"2023-11-01",stillingsprosent:0}]},type:d.DELVIS,delvisTilretteleggingPeriodeType:T.VARIERTE_PERIODER}]};var a,s,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  tilrettelegging
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(l=(s=e.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var p,m,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  tilrettelegging
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const ee=["Default","FlereStillinger"];export{e as Default,t as FlereStillinger,ee as __namedExportsOrder,$ as default};
