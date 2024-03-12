import{j as a}from"./jsx-runtime-1caa8f64.js";import{a as c}from"./chunk-WFFRPTHA-80d37c1b.js";import{i as N}from"./Step-09e54fbd.js";import{F as b,C as y}from"./FpDataContext-91c673b7.js";import{S as E}from"./useFpNavigator-58a97db6.js";import{S as u}from"./SøkersituasjonSteg-c612a331.js";import{M as R}from"./dateFormValidation-3538be13.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./Tidsperioden-cabe27e7.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-cd089914.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ErrorSummaryHookForm-4cc65dc9.js";import"./ConfirmationPanel-2a051438.js";const v=()=>(...r)=>(c("button-click")(...r),Promise.resolve()),X={title:"steps/SøkersituasjonSteg",component:u},o=({kjønn:r,søkersituasjon:F,mellomlagreSøknadOgNaviger:g=v(),avbrytSøknad:j=c("button-click"),gåTilNesteSide:D})=>(N(),a.jsx(R,{initialEntries:[E.SØKERSITUASJON],children:a.jsx(b,{onDispatch:D,initialState:{[y.SØKERSITUASJON]:F},children:a.jsx(u,{arbeidsforhold:[],kjønn:r,mellomlagreSøknadOgNaviger:g,avbrytSøknad:j})})})),t=o.bind({});t.args={kjønn:"K"};const e=o.bind({});e.args={kjønn:"M"};const n=o.bind({});n.args={kjønn:"K",søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}};var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
                <SøkersituasjonSteg arbeidsforhold={[]} kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var S,l,x;e.parameters={...e.parameters,docs:{...(S=e.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
                <SøkersituasjonSteg arbeidsforhold={[]} kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(x=(l=e.parameters)==null?void 0:l.docs)==null?void 0:x.source}}};var p,d,k;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
                <SøkersituasjonSteg arbeidsforhold={[]} kjønn={kjønn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={avbrytSøknad} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(k=(d=n.parameters)==null?void 0:d.docs)==null?void 0:k.source}}};const Y=["Mor","Far","HarMellomlagretData"];export{e as Far,n as HarMellomlagretData,t as Mor,Y as __namedExportsOrder,X as default};
