import{j as r}from"./jsx-runtime-69eee039.js";import{a as o}from"./chunk-AY7I2SME-331d03ca.js";import{O as j}from"./OmBarnetSteg-6f4c2e94.js";import{I as b}from"./IntlProvider-79b89341.js";import{S as s}from"./Søkersituasjon-b1a475fe.js";import{E as O}from"./useEsNavigator-fe1453fa.js";import{w as N}from"./withRouter-c9c9cf49.js";import{E as A}from"./EsContextStorybookHelper-f620b549.js";import{P as x}from"./paths-15c3400b.js";import{i as I}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./ErrorSummaryHookForm-191d9635.js";import"./StepButtons-9bea993a.js";import"./countryUtils-64ad3222.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";const L={title:"OmBarnetSteg",component:j,decorators:[N],parameters:{routerDecoratorInitUrl:x.OM_BARNET}},i=({søkersituasjon:E,kjønn:g,gåTilNesteSide:T})=>(I(),r.jsx(b,{språkkode:"nb",children:r.jsx(A,{initialState:{[O.SØKERSITUASJON]:{situasjon:E}},onDispatch:T,children:r.jsx(j,{kjønn:g})})})),e=i.bind({});e.args={søkersituasjon:s.ADOPSJON,kjønn:"K",gåTilNesteSide:o("button-click")};const n=i.bind({});n.args={søkersituasjon:s.ADOPSJON,kjønn:"M",gåTilNesteSide:o("button-click")};const t=i.bind({});t.args={søkersituasjon:s.FØDSEL,gåTilNesteSide:o("button-click")};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`({
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,S,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`({
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
}`,...(u=(k=t.parameters)==null?void 0:k.docs)==null?void 0:u.source}}};const q=["VisSideForAdopsjonKvinne","VisSideForAdopsjonMann","VisSideForFodsel"];export{e as VisSideForAdopsjonKvinne,n as VisSideForAdopsjonMann,t as VisSideForFodsel,q as __namedExportsOrder,L as default};
//# sourceMappingURL=OmBarnetSteg.stories-b7a2110c.js.map
