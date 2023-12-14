import{j as o}from"./fridagerUtils-f3aec6f3.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{i as m,M as p,P as d,E as c,b as u}from"./useEsNavigator-49099871.js";import{U as s}from"./UtenlandsoppholdSteg-abe1ff1a.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./TidligereUtenlandsoppholdPanel-f7ad2de3.js";import"./ErrorSummaryHookForm-9e431d55.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),P={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:l=g()})=>(m(),o.jsx(p,{initialEntries:[d.UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,n,r;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.UTENLANDSOPPHOLD]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel'
      }
    }}>
                <UtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(r=(n=t.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const j=["Default"];export{t as Default,j as __namedExportsOrder,P as default};
//# sourceMappingURL=UtenlandsoppholdSteg.stories-8e5c2bb2.js.map
