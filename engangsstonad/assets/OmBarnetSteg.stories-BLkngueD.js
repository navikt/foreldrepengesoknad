import{j as r}from"./tslib.es6-C_-gbNBy.js";import{a as i}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as O,P as k,E as F,C as T}from"./useEsNavigator-DntjGnV6.js";import{i as A}from"./dateFormValidation-D6du_QBT.js";import{O as S}from"./OmBarnetSteg-DsLsiHvS.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./ErrorSummaryHookForm-CpI32w5H.js";const D=()=>(...o)=>(i("button-click")(...o),Promise.resolve()),_={title:"OmBarnetSteg",component:S},s=({søkersituasjon:o,kjønn:j,gåTilNesteSide:E,mellomlagreOgNaviger:N=D()})=>(A(),r.jsx(O,{initialEntries:[k.OM_BARNET],children:r.jsx(F,{initialState:{[T.SØKERSITUASJON]:{situasjon:o}},onDispatch:E,children:r.jsx(S,{kjønn:j,mellomlagreOgNaviger:N})})})),e=s.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const n=s.bind({});n.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const t=s.bind({});t.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const P=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,P as __namedExportsOrder,_ as default};
