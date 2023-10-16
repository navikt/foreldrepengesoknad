import{j as r}from"./jsx-runtime-69eee039.js";import{a as o}from"./chunk-AY7I2SME-331d03ca.js";import{O as j}from"./OmBarnetSteg-bc0aa37e.js";import{I as b}from"./IntlProvider-323f7bb7.js";import{S as s}from"./Søkersituasjon-b1a475fe.js";import{E as O}from"./useEsNavigator-7d967be7.js";import{w as N}from"./withRouter-c9c9cf49.js";import{E as A}from"./EsContextStorybookHelper-8788fceb.js";import{P as x}from"./paths-15c3400b.js";import{i as I}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-6083ef49.js";import"./StepButtons-472e9663.js";import"./countryUtils-ac55b9bd.js";import"./valideringsregler-beb70bac.js";import"./dateUtils-a2958f29.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";const z={title:"OmBarnetSteg",component:j,decorators:[N],parameters:{routerDecoratorInitUrl:x.OM_BARNET}},i=({søkersituasjon:E,kjønn:g,gåTilNesteSide:T})=>(I(),r.jsx(b,{språkkode:"nb",children:r.jsx(A,{initialState:{[O.SØKERSITUASJON]:{situasjon:E}},onDispatch:T,children:r.jsx(j,{kjønn:g})})})),e=i.bind({});e.args={søkersituasjon:s.ADOPSJON,kjønn:"K",gåTilNesteSide:o("button-click")};const t=i.bind({});t.args={søkersituasjon:s.ADOPSJON,kjønn:"M",gåTilNesteSide:o("button-click")};const n=i.bind({});n.args={søkersituasjon:s.FØDSEL,gåTilNesteSide:o("button-click")};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,S,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(l=(S=t.parameters)==null?void 0:S.docs)==null?void 0:l.source}}};var c,k,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`({
  søkersituasjon,
  kjønn,
  gåTilNesteSide
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.SØKERSITUASJON]: {
        situasjon: søkersituasjon
      }
    }} onDispatch={gåTilNesteSide}>
                <OmBarnetSteg kjønn={kjønn} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(u=(k=n.parameters)==null?void 0:k.docs)==null?void 0:u.source}}};const G=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,t as VisSideForAdopsjonMann,n as VisSideForFodsel,G as __namedExportsOrder,z as default};
//# sourceMappingURL=OmBarnetSteg.stories-366e959a.js.map
