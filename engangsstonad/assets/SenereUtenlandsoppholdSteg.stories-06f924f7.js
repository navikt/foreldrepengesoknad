import{j as o}from"./fridagerUtils-d98855ba.js";import{a}from"./chunk-WFFRPTHA-a68c42c5.js";import{i as l,M as m,P as d,E as c,C as S}from"./useEsNavigator-e13763b8.js";import{S as s}from"./SenereUtenlandsoppholdSteg-cc92e8f1.js";import"./index-f1f2c4b1.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./_baseToString-b5f87fbe.js";import"./_createSet-915b0824.js";import"./TidligereUtenlandsoppholdPanel-dbf7b03d.js";import"./ErrorSummaryHookForm-388f6479.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./Radio-c972aff9.js";import"./ExpansionCard-3882eee8.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),u={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},_={title:"SenereUtenlandsoppholdSteg",component:s},E=({gåTilNesteSide:e,mellomlagreOgNaviger:p=g()})=>(l(),o.jsx(m,{initialEntries:[d.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{onDispatch:e,initialState:{[S.UTENLANDSOPPHOLD]:u},children:o.jsx(s,{mellomlagreOgNaviger:p})})})),t=E.bind({});t.args={gåTilNesteSide:a("button-click")};var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const v=["Default"];export{t as Default,v as __namedExportsOrder,_ as default};
