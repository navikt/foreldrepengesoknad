import{j as o}from"./fridagerUtils-cfd0d284.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,M as m,P as d,E as c,C as g}from"./useEsNavigator-3396cc63.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-807a96a5.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./TidligereUtenlandsoppholdPanel-55bbb6bd.js";import"./ErrorSummaryHookForm-1dc33a33.js";import"./isNativeReflectConstruct-554b52b6.js";import"./Radio-f7047926.js";import"./ExpansionCard-2934baad.js";const u=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},_={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:e,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=E.bind({});t.args={gåTilNesteSide:a("button-click")};var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
