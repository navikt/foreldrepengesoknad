import{i as p,j as o}from"./dateFormValidation-C_pijioS.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as m,P as d,E as c,C as g}from"./useEsNavigator-HaVxnslF.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-BqOw8eL3.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-CQkTLCs1.js";import"./TidligereUtenlandsoppholdPanel-D7esOwtI.js";import"./ErrorSummaryHookForm-C7f3gm5s.js";const u=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},C={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:a("button-click")};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const M=["Default"];export{e as Default,M as __namedExportsOrder,C as default};
