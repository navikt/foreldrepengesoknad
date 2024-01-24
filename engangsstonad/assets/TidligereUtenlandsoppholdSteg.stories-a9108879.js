import{j as o}from"./fridagerUtils-eebd6095.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,M as m,P as d,E as c,C as g}from"./useEsNavigator-1243e226.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-5b127bf5.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./TidligereUtenlandsoppholdPanel-82e5e1a4.js";import"./ErrorSummaryHookForm-34b28606.js";import"./isNativeReflectConstruct-554b52b6.js";import"./Radio-b396da68.js";import"./ExpansionCard-5f482df4.js";const u=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},_={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:e,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=E.bind({});t.args={gåTilNesteSide:a("button-click")};var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.TIDLIGERE_UTENLANDSOPPHOLD]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <TidligereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const v=["Default"];export{t as Default,v as __namedExportsOrder,_ as default};
