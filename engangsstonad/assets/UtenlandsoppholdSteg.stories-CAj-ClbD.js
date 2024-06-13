import{i as m,j as o}from"./dateFormValidation-ht3trlp_.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as p,P as d,E as c,C as u}from"./useEsNavigator-C8TR9kJX.js";import{U as s}from"./UtenlandsoppholdSteg-DE2ehDMT.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-CQkTLCs1.js";import"./TidligereUtenlandsoppholdPanel-C3D1CP4K.js";import"./ErrorSummaryHookForm-D4yKW1j8.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),j={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:l=g()})=>(m(),o.jsx(p,{initialEntries:[d.UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,n,r;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
