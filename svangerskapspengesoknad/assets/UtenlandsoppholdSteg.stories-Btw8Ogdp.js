import{j as i}from"./Button-BkdplLyZ.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as p}from"./dateUtils-nwvnIjLD.js";import{a as l,S as g}from"./routes-D-wJVrwa.js";import{U as d}from"./UtenlandsoppholdSteg-C0W6Of19.js";import{M as v}from"./useSvpNavigator-Cm1dowd2.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./calendarLabel.module-BiNsxNBE.js";import"./Modal-DAo92rTS.js";import"./index-D1_ZHIBm.js";import"./index-BfyspvgH.js";import"./TidligereUtenlandsoppholdPanel-B2Ypf-V_.js";import"./ErrorSummaryHookForm-BhjBJA2e.js";import"./dateFormValidation-DpTwuuK5.js";import"./ExpansionCard-sO_gY-Ex.js";import"./Plus-BlWFA8s8.js";import"./_baseIteratee-Dcv9GQI-.js";import"./_baseUniq-BSa0oUtE.js";const P={title:"steps/UtenlandsoppholdSteg",component:d},c=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],t=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),b=({mellomlagreSøknadOgNaviger:r=t(),gåTilNesteSide:m=a("button-click")})=>(p(),i.jsx(v,{initialEntries:[l.UTENLANDSOPPHOLD],children:i.jsx(g,{onDispatch:m,children:i.jsx(d,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:t(),arbeidsforhold:c})})})),e=b.bind({});var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
            <SvpDataContext onDispatch={gåTilNesteSide}>
                <UtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const V=["Default"];export{e as Default,V as __namedExportsOrder,P as default};
