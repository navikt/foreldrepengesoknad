import{j as e}from"./Modal-5f6515f6.js";import{a as s}from"./chunk-WFFRPTHA-80d37c1b.js";import{_ as l}from"./soknad-056e750f.js";import{T as p}from"./TidligereUtenlandsoppholdSteg-b209a62c.js";import{S as d,C as c}from"./routes-345f7acb.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./TidligereUtenlandsoppholdPanel-c873309f.js";import"./ErrorSummaryHookForm-2129aef0.js";import"./fridagerUtils-9d650fd8.js";import"./index-b580f7e8.js";import"./dates-1fe13765.js";import"./isNativeReflectConstruct-554b52b6.js";import"./check-dates-d5278c7f.js";import"./ArrowRight-7eea1688.js";import"./IntlProvider-ab01d157.js";import"./links-439b6638.js";import"./VStack-ea079a1e.js";import"./HStack-13158dfb.js";import"./Alert-1e997023.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude-672a2544.js";import"./createIntl-f391d6e4.js";import"./dateFormValidation-8cbaac98.js";import"./ExpansionCard-de6da795.js";import"./Plus-b48ff6db.js";import"./useFortsettSøknadSenere-ae1126db.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./validation-631bcf6e.js";const g=()=>(...o)=>(s("button-click")(...o),Promise.resolve()),X={title:"steps/TidligereUtenlandsoppholdSteg",component:p},x=l,S=({mellomlagreSøknadOgNaviger:o=g(),gåTilNesteSide:a,utenlandsopphold:m={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>e.jsx(d,{onDispatch:a,initialState:{[c.UTENLANDSOPPHOLD]:m},children:e.jsx(p,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{},søkerInfo:x.søkerinfo})}),t=S.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
  }}>
            <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
