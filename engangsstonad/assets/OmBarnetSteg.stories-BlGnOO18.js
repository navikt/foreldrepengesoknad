import{i as O,j as o}from"./dateFormValidation-DenKtUoJ.js";import{a as i}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as k,P as F,E as T,C as A}from"./useEsNavigator-CHE60MqL.js";import{O as S}from"./OmBarnetSteg-RXtMErzE.js";import"./index-Dl6G-zuu.js";import"./index-BfyspvgH.js";import"./index-D1_ZHIBm.js";import"./v4-D8aEg3BZ.js";import"./ErrorSummaryHookForm-B7Dvr0Ea.js";const D=()=>(...s)=>(i("button-click")(...s),Promise.resolve()),_={title:"OmBarnetSteg",component:S},r=({søkersituasjon:s,kjønn:j,gåTilNesteSide:E,mellomlagreOgNaviger:N=D()})=>(O(),o.jsx(k,{initialEntries:[F.OM_BARNET],children:o.jsx(T,{initialState:{[A.SØKERSITUASJON]:{situasjon:s}},onDispatch:E,children:o.jsx(S,{kjønn:j,mellomlagreOgNaviger:N})})})),e=r.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const n=r.bind({});n.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const t=r.bind({});t.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var g,p,c;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`({
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
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,u,x;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const f=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,f as __namedExportsOrder,_ as default};
