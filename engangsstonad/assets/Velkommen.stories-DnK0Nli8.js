import{i as c,j as o}from"./dateFormValidation-DCL9nYFn.js";import{a as r}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as p,P as u,E as d}from"./useEsNavigator-Coec-Teu.js";import{V as s}from"./Velkommen-DM5_2WU8.js";import"./index-DVXBtNgz.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./index-Cbx7Fas8.js";import"./v4-D8aEg3BZ.js";import"./ConfirmationPanel-F6ub969D.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),O={title:"Velkommen",component:s},x=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=x.bind({});e.args={startSøknad:r("button-click")};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
