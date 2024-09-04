import{i as c,j as o}from"./dateFormValidation-CSo1Ghro.js";import{a as r}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as p,P as u,E as d}from"./useEsNavigator-DL6e_ycb.js";import{V as s}from"./Velkommen-BEsQH1Is.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./ConfirmationPanel-CMnGIRc5.js";const g=()=>(...t)=>(r("button-click")(...t),Promise.resolve()),S={title:"Velkommen",component:s},k=({startSøknad:t,mellomlagreOgNaviger:m=g(),gåTilNesteSide:l})=>(c(),o.jsx(p,{initialEntries:[u.VELKOMMEN],children:o.jsx(d,{onDispatch:l,children:o.jsx(s,{startSøknad:t,onChangeLocale:r("button-click"),locale:"nb",erVelkommen:!1,mellomlagreOgNaviger:m})})})),e=k.bind({});e.args={startSøknad:r("button-click")};var a,i,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const O=["Default"];export{e as Default,O as __namedExportsOrder,S as default};
