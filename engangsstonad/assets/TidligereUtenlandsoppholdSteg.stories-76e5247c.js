import{j as o}from"./fridagerUtils-f3aec6f3.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{i as p,M as m,P as d,E as c,b as g}from"./useEsNavigator-49099871.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-4520a4a2.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./TidligereUtenlandsoppholdPanel-f7ad2de3.js";import"./ErrorSummaryHookForm-9e431d55.js";const u=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),D={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1},A={title:"TidligereUtenlandsoppholdSteg",component:s},N=({gåTilNesteSide:t,mellomlagreOgNaviger:l=u()})=>(p(),o.jsx(m,{initialEntries:[d.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[g.UTENLANDSOPPHOLD]:D},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=N.bind({});e.args={gåTilNesteSide:a("button-click")};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const M=["Default"];export{e as Default,M as __namedExportsOrder,A as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-76e5247c.js.map
