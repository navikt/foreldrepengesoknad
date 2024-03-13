import{j as o}from"./index-b829706d.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as p,M as m,P as d,E as c,C as g}from"./useEsNavigator-3da59353.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-fcb30715.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./TidligereUtenlandsoppholdPanel-5cac4718.js";import"./ErrorSummaryHookForm-2742172e.js";import"./ExpansionCard-7b88ec1f.js";const u=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},M={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:e,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=E.bind({});t.args={gåTilNesteSide:a("button-click")};var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const R=["Default"];export{t as Default,R as __namedExportsOrder,M as default};
