import{j as a}from"./jsx-runtime-DoxjgJx5.js";import{a as c}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as N}from"./Step-DS4hjKcq.js";import{F as b,C as y}from"./FpDataContext-CjNulmBK.js";import{S as E}from"./useFpNavigator-BZN6AEKG.js";import{S as u}from"./SøkersituasjonSteg-5c2KQd5O.js";import{M as R}from"./index-BUeOcrf5.js";import"./index-Cu9bd8lq.js";import"./v4-D8aEg3BZ.js";import"./Tidsperioden-BXZJ7Xx1.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-C-6Uy6j4.js";import"./index-Ckls47V4.js";import"./links-dJHPeQm3.js";import"./message-DTV81jgz.js";import"./amplitude.esm-CWYNo8IU.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BoDoOgHB.js";import"./dateFormValidation-ueMUlaIN.js";import"./ErrorSummaryHookForm-BNeZLR1K.js";const v=()=>(...r)=>(c("button-click")(...r),Promise.resolve()),X={title:"steps/SøkersituasjonSteg",component:u},o=({kjønn:r,søkersituasjon:F,mellomlagreSøknadOgNaviger:g=v(),avbrytSøknad:j=c("button-click"),gåTilNesteSide:D})=>(N(),a.jsx(R,{initialEntries:[E.SØKERSITUASJON],children:a.jsx(b,{onDispatch:D,initialState:{[y.SØKERSITUASJON]:F},children:a.jsx(u,{arbeidsforhold:[],kjønn:r,mellomlagreSøknadOgNaviger:g,avbrytSøknad:j})})})),t=o.bind({});t.args={kjønn:"K"};const e=o.bind({});e.args={kjønn:"M"};const n=o.bind({});n.args={kjønn:"K",søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}};var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
