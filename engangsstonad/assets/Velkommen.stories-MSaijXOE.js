import{j as o}from"./index-DZ_iNobP.js";import{a as r}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as c,M as p,P as u,E as d}from"./useEsNavigator-CCPepSoW.js";import{V as s}from"./Velkommen-BytumYNz.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./index-BfyspvgH.js";import"./index-D1_ZHIBm.js";import"./ConfirmationPanel-BRWpuimZ.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),S={title:"Velkommen",component:s},x=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=x.bind({});e.args={startSøknad:r("button-click")};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
  startSøknad,
  mellomlagreOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.VELKOMMEN]}>
            <EsDataContext onDispatch={gåTilNesteSide}>
                <Velkommen startSøknad={startSøknad} onChangeLocale={action('button-click')} locale="nb" erVelkommen={false} mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const O=["Default"];export{e as Default,O as __namedExportsOrder,S as default};
