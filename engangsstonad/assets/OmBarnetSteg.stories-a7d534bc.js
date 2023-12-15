import{j as r}from"./fridagerUtils-04c9cbd9.js";import{a as i}from"./chunk-AY7I2SME-331d03ca.js";import{i as E,M as T,P as A,E as x,b as R}from"./useEsNavigator-19e51dfb.js";import{O as j}from"./OmBarnetSteg-9fd74407.js";import"./_createSet-6d88ee94.js";import"./_baseToString-474f5ca2.js";import"./index-c4a10118.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-6b08840c.js";import"./isNativeReflectConstruct-0525dbfe.js";import"./Radio-5731ed60.js";const D=()=>(...o)=>(i("button-click")(...o),Promise.resolve()),P={title:"OmBarnetSteg",component:j},s=({søkersituasjon:o,kjønn:N,gåTilNesteSide:O,mellomlagreOgNaviger:k=D()})=>(E(),r.jsx(T,{initialEntries:[A.OM_BARNET],children:r.jsx(x,{initialState:{[R.SØKERSITUASJON]:{situasjon:o}},onDispatch:O,children:r.jsx(j,{kjønn:N,mellomlagreOgNaviger:k})})})),e=s.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const t=s.bind({});t.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const n=s.bind({});n.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(c=(g=t.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var d,u,S;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(S=(u=n.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const V=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,t as VisSideForAdopsjonMann,n as VisSideForFodsel,V as __namedExportsOrder,P as default};
//# sourceMappingURL=OmBarnetSteg.stories-a7d534bc.js.map
