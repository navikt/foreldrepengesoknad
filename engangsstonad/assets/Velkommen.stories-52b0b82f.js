import{j as o}from"./fridagerUtils-f3aec6f3.js";import{a as r}from"./chunk-AY7I2SME-331d03ca.js";import{i as c,M as p,P as u,E as d}from"./useEsNavigator-2b82a4d5.js";import{V as s}from"./Velkommen-17bf7b76.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),N={title:"Velkommen",component:s},k=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=k.bind({});e.args={startSøknad:r("button-click")};var a,i,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const S=["Default"];export{e as Default,S as __namedExportsOrder,N as default};
//# sourceMappingURL=Velkommen.stories-52b0b82f.js.map
