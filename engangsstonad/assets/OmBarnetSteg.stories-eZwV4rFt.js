import{j as r}from"./fridagerUtils-j0nuJBgt.js";import{a as i}from"./chunk-WFFRPTHA-zlNDxfrq.js";import{i as O,M as k,P as F,E as T,C as A}from"./useEsNavigator-XsqJhHTq.js";import{O as S}from"./OmBarnetSteg-DejxWz0G.js";import"./index-OjgoNOWw.js";import"./index-lbrLmSir.js";import"./index-mQqIOHEI.js";import"./preview-errors-7FWlPnjy.js";import"./index-PPLHz8o0.js";import"./_baseToString-r0zJwuYG.js";import"./_createSet-pyNrvG8u.js";import"./ErrorSummaryHookForm-j1CgAre8.js";import"./isNativeReflectConstruct-3LOYyi5T.js";import"./Radio-KcrBIlM0.js";const D=()=>(...o)=>(i("button-click")(...o),Promise.resolve()),J={title:"OmBarnetSteg",component:S},s=({søkersituasjon:o,kjønn:j,gåTilNesteSide:E,mellomlagreOgNaviger:N=D()})=>(O(),r.jsx(k,{initialEntries:[F.OM_BARNET],children:r.jsx(T,{initialState:{[A.SØKERSITUASJON]:{situasjon:o}},onDispatch:E,children:r.jsx(S,{kjønn:j,mellomlagreOgNaviger:N})})})),e=s.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const t=s.bind({});t.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const n=s.bind({});n.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
}`,...(c=(g=t.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var d,u,x;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const U=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,t as VisSideForAdopsjonMann,n as VisSideForFodsel,U as __namedExportsOrder,J as default};
