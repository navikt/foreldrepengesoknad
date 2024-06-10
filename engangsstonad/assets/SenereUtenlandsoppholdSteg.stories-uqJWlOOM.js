import{i as p,j as o}from"./dateFormValidation-D7QUEZim.js";import{a as i}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as m,P as d,E as c,C as S}from"./useEsNavigator-CboEBiOx.js";import{S as s}from"./SenereUtenlandsoppholdSteg-Bipza2Kt.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-CQkTLCs1.js";import"./TidligereUtenlandsoppholdPanel-BPoV5Lxz.js";import"./ErrorSummaryHookForm-DaPJEdEa.js";const g=()=>(...t)=>(i("button-click")(...t),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},C={title:"SenereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:l=g()})=>(p(),o.jsx(m,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[S.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:l})})})),e=E.bind({});e.args={gåTilNesteSide:i("button-click")};var r,n,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
