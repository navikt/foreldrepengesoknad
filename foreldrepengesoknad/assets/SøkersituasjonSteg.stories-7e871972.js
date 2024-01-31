import{j as a}from"./jsx-runtime-1caa8f64.js";import{a as d}from"./chunk-WFFRPTHA-80d37c1b.js";import{S as u}from"./SøkersituasjonSteg-2d41c6dd.js";import{F as N,C as y}from"./FpDataContext-c0784ba8.js";import{S as E}from"./useFpNavigator-35d501ad.js";import{i as R}from"./IntlProvider-3646511b.js";import{M as v}from"./dateFormValidation-58034f6f.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./Tidsperioden-0ce27701.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./ErrorSummaryHookForm-d377c7b0.js";import"./dates-11179115.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const T=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),X={title:"steps/SøkersituasjonSteg",component:u},o=({kjønn:r,søkersituasjon:F,mellomlagreSøknadOgNaviger:g=T(),avbrytSøknad:j=d("button-click"),gåTilNesteSide:D})=>(R(),a.jsx(v,{initialEntries:[E.SØKERSITUASJON],children:a.jsxs(N,{onDispatch:D,initialState:{[y.SØKERSITUASJON]:F},children:["o",a.jsx(u,{kjønn:r,mellomlagreSøknadOgNaviger:g,avbrytSøknad:j})]})})),t=o.bind({});t.args={kjønn:"K"};const n=o.bind({});n.args={kjønn:"M"};const e=o.bind({});e.args={kjønn:"K",søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}};var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(c=(k=e.parameters)==null?void 0:k.docs)==null?void 0:c.source}}};const Y=["Mor","Far","HarMellomlagretData"];export{n as Far,e as HarMellomlagretData,t as Mor,Y as __namedExportsOrder,X as default};
