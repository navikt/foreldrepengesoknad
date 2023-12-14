import{j as o}from"./fridagerUtils-f3aec6f3.js";import{a as i}from"./chunk-AY7I2SME-331d03ca.js";import{i as E,M as T,P as A,E as x,b as R}from"./useEsNavigator-49099871.js";import{O as j}from"./OmBarnetSteg-1b747337.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-9e431d55.js";const D=()=>(...s)=>(i("button-click")(...s),Promise.resolve()),_={title:"OmBarnetSteg",component:j},r=({søkersituasjon:s,kjønn:N,gåTilNesteSide:O,mellomlagreOgNaviger:k=D()})=>(E(),o.jsx(T,{initialEntries:[A.OM_BARNET],children:o.jsx(x,{initialState:{[R.SØKERSITUASJON]:{situasjon:s}},onDispatch:O,children:o.jsx(j,{kjønn:N,mellomlagreOgNaviger:k})})})),e=r.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const n=r.bind({});n.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const t=r.bind({});t.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,u,S;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(S=(u=t.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const f=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,f as __namedExportsOrder,_ as default};
//# sourceMappingURL=OmBarnetSteg.stories-295d53fa.js.map
