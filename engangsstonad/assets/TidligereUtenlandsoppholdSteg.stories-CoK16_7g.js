import{j as o}from"./index-DZ_iNobP.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as p,M as m,P as d,E as c,C as g}from"./useEsNavigator-CCPepSoW.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-BP6lIxcD.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./index-BfyspvgH.js";import"./index-D1_ZHIBm.js";import"./TidligereUtenlandsoppholdPanel-BfSMpdQ2.js";import"./ErrorSummaryHookForm-BK0p70mm.js";const u=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},A={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:a("button-click")};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const C=["Default"];export{e as Default,C as __namedExportsOrder,A as default};
