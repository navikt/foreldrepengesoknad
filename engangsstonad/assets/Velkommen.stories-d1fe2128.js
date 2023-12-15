import{j as o}from"./fridagerUtils-04c9cbd9.js";import{a as r}from"./chunk-AY7I2SME-331d03ca.js";import{i as c,M as p,P as u,E as d}from"./useEsNavigator-19e51dfb.js";import{V as s}from"./Velkommen-3a09f84c.js";import"./_createSet-6d88ee94.js";import"./_baseToString-474f5ca2.js";import"./index-c4a10118.js";import"./v4-a960c1f4.js";import"./ExpansionCard-a1bb8d3b.js";import"./ConfirmationPanel-5a4e305d.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),O={title:"Velkommen",component:s},k=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=k.bind({});e.args={startSøknad:r("button-click")};var a,i,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,O as default};
//# sourceMappingURL=Velkommen.stories-d1fe2128.js.map
