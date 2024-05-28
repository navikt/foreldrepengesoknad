import{i as O,j as r}from"./dateFormValidation-DCL9nYFn.js";import{a as i}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as k,P as F,E as T,C as A}from"./useEsNavigator-Coec-Teu.js";import{O as S}from"./OmBarnetSteg-BxCHDVxY.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-D8aEg3BZ.js";import"./ErrorSummaryHookForm-DKy1c4mH.js";const D=()=>(...o)=>(i("button-click")(...o),Promise.resolve()),f={title:"OmBarnetSteg",component:S},s=({søkersituasjon:o,kjønn:j,gåTilNesteSide:E,mellomlagreOgNaviger:N=D()})=>(O(),r.jsx(k,{initialEntries:[F.OM_BARNET],children:r.jsx(T,{initialState:{[A.SØKERSITUASJON]:{situasjon:o}},onDispatch:E,children:r.jsx(S,{kjønn:j,mellomlagreOgNaviger:N})})})),e=s.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const n=s.bind({});n.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const t=s.bind({});t.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.OM_BARNET]}>
            <EsDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,c;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.OM_BARNET]}>
            <EsDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(c=(g=n.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var d,u,x;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.OM_BARNET]}>
            <EsDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const P=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,P as __namedExportsOrder,f as default};
