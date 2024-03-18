import{j as o}from"./index-DZ_iNobP.js";import{a as i}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as p,M as m,P as d,E as c,C as S}from"./useEsNavigator-CCPepSoW.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DTueQdc2.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./index-BfyspvgH.js";import"./index-D1_ZHIBm.js";import"./TidligereUtenlandsoppholdPanel-BfSMpdQ2.js";import"./ErrorSummaryHookForm-BK0p70mm.js";const g=()=>(...t)=>(i("button-click")(...t),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},L={title:"SenereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=g()})=>(p(),o.jsx(m,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[S.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:i("button-click")};var n,r,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.SENERE_UTENLANDSOPPHOLD]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <SenereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const C=["Default"];export{e as Default,C as __namedExportsOrder,L as default};
