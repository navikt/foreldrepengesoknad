import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as m,P as p,E as d,C as c}from"./useEsNavigator-EU22a36Z.js";import{i as u}from"./dateFormValidation-ihTjb01P.js";import{U as s}from"./UtenlandsoppholdSteg-7mkzA8VT.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./TidligereUtenlandsoppholdPanel-B9SycCYt.js";import"./ErrorSummaryHookForm-CPJhaCtS.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),j={title:"UtenlandsoppholdSteg",component:s},S=({gåTilNesteSide:e,mellomlagreOgNaviger:l=g()})=>(u(),o.jsx(m,{initialEntries:[p.UTENLANDSOPPHOLD],children:o.jsx(d,{onDispatch:e,initialState:{[c.SØKERSITUASJON]:{situasjon:"fødsel"}},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),t=S.bind({});t.args={gåTilNesteSide:a("button-click")};var i,r,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const C=["Default"];export{t as Default,C as __namedExportsOrder,j as default};
