import{j as o}from"./fridagerUtils-39f895c9.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,M as l,P as d,E as c,C as u}from"./useEsNavigator-835bf9cd.js";import{U as s}from"./UtenlandsoppholdSteg-03c83af7.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./TidligereUtenlandsoppholdPanel-883e8365.js";import"./ErrorSummaryHookForm-99dc0573.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./Radio-8e0040fa.js";import"./ExpansionCard-c5fcbceb.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),L={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:m=g()})=>(p(),o.jsx(l,{initialEntries:[d.UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:m})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,r,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.UTENLANDSOPPHOLD]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel'
      }
    }}>
                <UtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const M=["Default"];export{t as Default,M as __namedExportsOrder,L as default};
