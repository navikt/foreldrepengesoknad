import{i as m,j as o}from"./dateFormValidation-C5fEwPHX.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as p,P as d,E as c,C as u}from"./useEsNavigator-CHcbwGjV.js";import{U as s}from"./UtenlandsoppholdSteg-Cpm-_7Kw.js";import"./index-Dl6G-zuu.js";import"./index-BfyspvgH.js";import"./index-D1_ZHIBm.js";import"./v4-D8aEg3BZ.js";import"./TidligereUtenlandsoppholdPanel-SlF7klWR.js";import"./ErrorSummaryHookForm-KIeOD5zL.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),P={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:l=g()})=>(m(),o.jsx(p,{initialEntries:[d.UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,n,r;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
