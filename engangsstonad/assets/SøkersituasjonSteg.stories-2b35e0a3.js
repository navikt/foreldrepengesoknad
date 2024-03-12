import{j as r}from"./index-b829706d.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as l,M as p,P as c,E as u}from"./useEsNavigator-ae9c7adf.js";import{S as n}from"./SøkersituasjonSteg-5c40a284.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./ErrorSummaryHookForm-5e019214.js";const S=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),O={title:"SøkersituasjonSteg",component:n},g=({gåTilNesteSide:e,mellomlagreOgNaviger:m=S()})=>(l(),r.jsx(p,{initialEntries:[c.SØKERSITUASJON],children:r.jsx(u,{onDispatch:e,children:r.jsx(n,{mellomlagreOgNaviger:m})})})),t=g.bind({});t.args={gåTilNesteSide:a("button-click")};var o,i,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.SØKERSITUASJON]}>
            <EsDataContext onDispatch={gåTilNesteSide}>
                <SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const R=["Default"];export{t as Default,R as __namedExportsOrder,O as default};
