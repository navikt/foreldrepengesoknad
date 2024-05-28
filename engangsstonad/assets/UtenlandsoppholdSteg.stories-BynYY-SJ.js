import{i as m,j as o}from"./dateFormValidation-DCL9nYFn.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as p,P as d,E as c,C as u}from"./useEsNavigator-Coec-Teu.js";import{U as s}from"./UtenlandsoppholdSteg-DBWNt_Z1.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-D8aEg3BZ.js";import"./TidligereUtenlandsoppholdPanel-BDul-Bdn.js";import"./ErrorSummaryHookForm-DKy1c4mH.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),j={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:l=g()})=>(m(),o.jsx(p,{initialEntries:[d.UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,n,r;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(r=(n=t.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const C=["Default"];export{t as Default,C as __namedExportsOrder,j as default};
