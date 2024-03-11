import{j as o}from"./dates-a54b7688.js";import{a as r}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as c,M as p,P as u,E as d}from"./useEsNavigator-9078f7eb.js";import{V as m}from"./Velkommen-1e204fec.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./fridagerUtils-1041562e.js";import"./useControllableState-e0bf3f38.js";import"./customParseFormat-61b655e4.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./ExpansionCard-38f1f044.js";const g=()=>(...e)=>(r("button-click")(...e),Promise.resolve()),L={title:"Velkommen",component:m},x=({startSøknad:e,mellomlagreOgNaviger:s=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(m,{startSøknad:e,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:s})})})),t=x.bind({});t.args={startSøknad:r("button-click")};var n,a,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const P=["Default"];export{t as Default,P as __namedExportsOrder,L as default};
