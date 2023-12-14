import{j as o}from"./fridagerUtils-f3aec6f3.js";import{a as i}from"./chunk-AY7I2SME-331d03ca.js";import{i as p,M as m,P as d,E as c,b as S}from"./useEsNavigator-49099871.js";import{S as s}from"./SenereUtenlandsoppholdSteg-9f54250d.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./TidligereUtenlandsoppholdPanel-f7ad2de3.js";import"./ErrorSummaryHookForm-9e431d55.js";const g=()=>(...t)=>(i("button-click")(...t),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},L={title:"SenereUtenlandsoppholdSteg",component:s},N=({gåTilNesteSide:t,mellomlagreOgNaviger:l=g()})=>(p(),o.jsx(m,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[S.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=N.bind({});e.args={gåTilNesteSide:i("button-click")};var n,r,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const M=["Default"];export{e as Default,M as __namedExportsOrder,L as default};
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-a744b892.js.map
