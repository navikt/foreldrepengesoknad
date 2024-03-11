import{j as r}from"./index-b829706d.js";import{a as i}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as O,M as k,P as F,E as T,C as A}from"./useEsNavigator-1fee33b1.js";import{O as S}from"./OmBarnetSteg-66b51dec.js";import"./index-f1f2c4b1.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./ErrorSummaryHookForm-bc7131af.js";import"./isNativeReflectConstruct-554b52b6.js";import"./Radio-e22038aa.js";const D=()=>(...o)=>(i("button-click")(...o),Promise.resolve()),V={title:"OmBarnetSteg",component:S},s=({søkersituasjon:o,kjønn:j,gåTilNesteSide:E,mellomlagreOgNaviger:N=D()})=>(O(),r.jsx(k,{initialEntries:[F.OM_BARNET],children:r.jsx(T,{initialState:{[A.SØKERSITUASJON]:{situasjon:o}},onDispatch:E,children:r.jsx(S,{kjønn:j,mellomlagreOgNaviger:N})})})),e=s.bind({});e.args={søkersituasjon:"adopsjon",kjønn:"K",gåTilNesteSide:i("button-click")};const t=s.bind({});t.args={søkersituasjon:"adopsjon",kjønn:"M",gåTilNesteSide:i("button-click")};const n=s.bind({});n.args={søkersituasjon:"fødsel",gåTilNesteSide:i("button-click")};var a,m,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const I=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,t as VisSideForAdopsjonMann,n as VisSideForFodsel,I as __namedExportsOrder,V as default};
