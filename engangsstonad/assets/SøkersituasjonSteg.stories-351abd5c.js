import{j as r}from"./fridagerUtils-0d0dbd1f.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,M as l,P as c,E as u}from"./useEsNavigator-3ff6cf7e.js";import{S as n}from"./SøkersituasjonSteg-60436f41.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./ErrorSummaryHookForm-d9e802b5.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./Radio-8d0f6dba.js";const S=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),M={title:"SøkersituasjonSteg",component:n},g=({gåTilNesteSide:e,mellomlagreOgNaviger:m=S()})=>(p(),r.jsx(l,{initialEntries:[c.SØKERSITUASJON],children:r.jsx(u,{onDispatch:e,children:r.jsx(n,{mellomlagreOgNaviger:m})})})),t=g.bind({});t.args={gåTilNesteSide:a("button-click")};var o,i,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.SØKERSITUASJON]}>
            <EsDataContext onDispatch={gåTilNesteSide}>
                <SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const P=["Default"];export{t as Default,P as __namedExportsOrder,M as default};
