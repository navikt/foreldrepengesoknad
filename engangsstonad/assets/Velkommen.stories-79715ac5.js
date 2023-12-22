import{j as o}from"./fridagerUtils-808c4083.js";import{a as r}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as c,M as p,P as u,E as d}from"./useEsNavigator-dc3d6507.js";import{V as m}from"./Velkommen-fad2e96e.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./ExpansionCard-643735e5.js";import"./ConfirmationPanel-6467f892.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),v={title:"Velkommen",component:m},x=({startSøknad:t,mellomlagreOgNaviger:s=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(m,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:s})})})),e=x.bind({});e.args={startSøknad:r("button-click")};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const A=["Default"];export{e as Default,A as __namedExportsOrder,v as default};
