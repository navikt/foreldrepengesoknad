import{j as r}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{T as l}from"./TilretteleggingStep-3d0769f1.js";import{_ as g}from"./soknad-056e750f.js";import{S as c,C as o}from"./routes-345f7acb.js";import{d as a}from"./fridagerUtils-bf3b07ca.js";import{I as i}from"./dates-5d9af962.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c112d50a.js";import"./useFortsettSøknadSenere-40515bb0.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./Bedriftsbanner-7ae7022f.js";import"./HStack-13158dfb.js";import"./VStack-ea079a1e.js";import"./dateUtils-8598b125.js";import"./index-47edccfa.js";import"./tilretteleggingValidation-9056159c.js";import"./BackButton-f80f5ffe.js";import"./ExpansionCard-9832699c.js";import"./index-b580f7e8.js";const K={title:"steps/TilretteleggingStep",component:l},n=()=>(...e)=>(x("button-click")(...e),Promise.resolve()),m=g,E=({mellomlagreSøknadOgNaviger:e=n(),gåTilNesteSide:T})=>r.jsx(c,{onDispatch:T,initialState:{[o.TILRETTELEGGINGER]:m.søknad.tilrettelegging,[o.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[o.OM_BARNET]:{erBarnetFødt:!1,termindato:a().add(45,"days").format(i),fødselsdato:a().add(45,"days").format(i)}},children:r.jsx(l,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:n(),søkerInfo:m.søkerinfo})}),t=E.bind({});var s,p,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
      fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT)
    }
  }}>
            <TilretteleggingStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const Q=["Default"];export{t as Default,Q as __namedExportsOrder,K as default};
