import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as p,P as m,E as d,C as c}from"./useEsNavigator-CqM_OAU4.js";import{i as g}from"./dateFormValidation-Bi0yPGRg.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-nnYbzpBD.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./TidligereUtenlandsoppholdPanel-D5JCUAxm.js";import"./ErrorSummaryHookForm-ClN0amvw.js";const u=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},C={title:"TidligereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=u()})=>(g(),o.jsx(p,{initialEntries:[m.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(d,{onDispatch:t,initialState:{[c.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:a("button-click")};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
