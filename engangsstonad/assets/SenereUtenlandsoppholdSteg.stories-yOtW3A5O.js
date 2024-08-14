import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a as i}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as p,P as m,E as d,C as c}from"./useEsNavigator-sT75w3db.js";import{i as S}from"./dateFormValidation-DVXNYLVh.js";import{S as s}from"./SenereUtenlandsoppholdSteg-CKyVoaGx.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./TidligereUtenlandsoppholdPanel-CjsST96w.js";import"./ErrorSummaryHookForm-CLxQXfiC.js";const g=()=>(...t)=>(i("button-click")(...t),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},C={title:"SenereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=g()})=>(S(),o.jsx(p,{initialEntries:[m.SENERE_UTENLANDSOPPHOLD],children:o.jsx(d,{onDispatch:t,initialState:{[c.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:i("button-click")};var r,n,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const M=["Default"];export{e as Default,M as __namedExportsOrder,C as default};
