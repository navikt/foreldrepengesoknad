import{j as r}from"./jsx-runtime-69eee039.js";import{a as o}from"./chunk-AY7I2SME-331d03ca.js";import{O as j}from"./OmBarnetSteg-4f32d9d9.js";import{I as b}from"./IntlProvider-705c2bb3.js";import{S as s}from"./Søkersituasjon-b1a475fe.js";import{P as O,E as N}from"./useEsNavigator-8eca5e12.js";import{w as A}from"./withRouter-1c11d623.js";import{E as x}from"./EsContextStorybookHelper-09ff5d7a.js";import{i as I}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-581b703a.js";import"./StepButtons-32021d55.js";import"./countryUtils-ea39d97c.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";const w={title:"OmBarnetSteg",component:j,decorators:[A],parameters:{routerDecoratorInitUrl:O.OM_BARNET}},i=({søkersituasjon:E,kjønn:g,gåTilNesteSide:T})=>(I(),r.jsx(b,{språkkode:"nb",children:r.jsx(x,{initialState:{[N.SØKERSITUASJON]:{situasjon:E}},onDispatch:T,children:r.jsx(j,{kjønn:g})})})),e=i.bind({});e.args={søkersituasjon:s.ADOPSJON,kjønn:"K",gåTilNesteSide:o("button-click")};const n=i.bind({});n.args={søkersituasjon:s.ADOPSJON,kjønn:"M",gåTilNesteSide:o("button-click")};const t=i.bind({});t.args={søkersituasjon:s.FØDSEL,gåTilNesteSide:o("button-click")};var a,p,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,S,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`({
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
}`,...(l=(S=n.parameters)==null?void 0:S.docs)==null?void 0:l.source}}};var c,k,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(u=(k=t.parameters)==null?void 0:k.docs)==null?void 0:u.source}}};const L=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,L as __namedExportsOrder,w as default};
//# sourceMappingURL=OmBarnetSteg.stories-db8f43d5.js.map
