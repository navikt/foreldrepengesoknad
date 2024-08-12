import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a as r}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as c,P as p,E as u}from"./useEsNavigator-QmtnVCSA.js";import{i as d}from"./dateFormValidation-ByrywAdZ.js";import{V as s}from"./Velkommen-34czaDTh.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./ConfirmationPanel-BqH4VN7G.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),O={title:"Velkommen",component:s},x=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(d(),o.jsx(c,{initialEntries:[p.VELKOMMEN],children:o.jsx(u,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=x.bind({});e.args={startSøknad:r("button-click")};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,O as default};
