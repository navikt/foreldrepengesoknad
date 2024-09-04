import{i as p,j as o}from"./dateFormValidation-CSo1Ghro.js";import{a}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as m,P as d,E as c,C as g}from"./useEsNavigator-DL6e_ycb.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-CWyTEFD_.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./TidligereUtenlandsoppholdPanel-BC-rpWDr.js";import"./ErrorSummaryHookForm-Cl5Hi6CA.js";const u=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},A={title:"TidligereUtenlandsoppholdSteg",component:s},N=({gåTilNesteSide:t,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=N.bind({});e.args={gåTilNesteSide:a("button-click")};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
