import{j as o}from"./dates-a54b7688.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as l,M as m,P as d,E as c,C as S}from"./useEsNavigator-9078f7eb.js";import{S as s}from"./SenereUtenlandsoppholdSteg-1c91faf7.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./TidligereUtenlandsoppholdPanel-d51c0fb8.js";import"./ErrorSummaryHookForm-214b1ce2.js";import"./customParseFormat-61b655e4.js";import"./isNativeReflectConstruct-554b52b6.js";import"./Radio-7106ba17.js";import"./ExpansionCard-38f1f044.js";const g=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},y={title:"SenereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:t,mellomlagreOgNaviger:p=g()})=>(l(),o.jsx(m,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:t,initialState:{[S.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:p})})})),e=E.bind({});e.args={gåTilNesteSide:a("button-click")};var r,n,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
  gåTilNesteSide,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[Path.SENERE_UTENLANDSOPPHOLD]}>
            <EsDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <SenereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>;
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const _=["Default"];export{e as Default,_ as __namedExportsOrder,y as default};
