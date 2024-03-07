import{j as a}from"./jsx-runtime-1caa8f64.js";import{a as d}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as u}from"./SøkersituasjonSteg-bf53464d.js";import{F as N,C as y}from"./FpDataContext-9c963fd7.js";import{S as E}from"./useFpNavigator-d887b885.js";import{i as R}from"./IntlProvider-1d845c21.js";import{M as v}from"./dateFormValidation-996d41a1.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./dates-c7d75be6.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./ErrorSummaryHookForm-1dae46df.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./amplitude.esm-2809efde.js";import"./createIntl-39c77dfb.js";const T=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),W={title:"steps/SøkersituasjonSteg",component:u},o=({kjønn:r,søkersituasjon:F,mellomlagreSøknadOgNaviger:g=T(),avbrytSøknad:j=d("button-click"),gåTilNesteSide:D})=>(R(),a.jsx(v,{initialEntries:[E.SØKERSITUASJON],children:a.jsxs(N,{onDispatch:D,initialState:{[y.SØKERSITUASJON]:F},children:["o",a.jsx(u,{kjønn:r,mellomlagreSøknadOgNaviger:g,avbrytSøknad:j})]})})),t=o.bind({});t.args={kjønn:"K"};const n=o.bind({});n.args={kjønn:"M"};const e=o.bind({});e.args={kjønn:"K",søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}};var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  kjønn,
  søkersituasjon,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon
    }}>
                o
                <SøkersituasjonSteg kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var S,x,l;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`({
  kjønn,
  søkersituasjon,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon
    }}>
                o
                <SøkersituasjonSteg kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(l=(x=n.parameters)==null?void 0:x.docs)==null?void 0:l.source}}};var p,k,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`({
  kjønn,
  søkersituasjon,
  mellomlagreSøknadOgNaviger = promiseAction(),
  avbrytSøknad = action('button-click'),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon
    }}>
                o
                <SøkersituasjonSteg kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(c=(k=e.parameters)==null?void 0:k.docs)==null?void 0:c.source}}};const X=["Mor","Far","HarMellomlagretData"];export{n as Far,e as HarMellomlagretData,t as Mor,X as __namedExportsOrder,W as default};
