import{j as i}from"./index-DjQlcsKf.js";import{a as s}from"./chunk-MZXVCX43-DWuJqIWT.js";import{i as p}from"./VStack-7ThGWPLh.js";import{a as m,S as g,C as v}from"./routes-CNaXZGz1.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-DCQ633sY.js";import{M as T}from"./useSvpNavigator-BdOkPM0z.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./Button-BLGHixGq.js";import"./Modal-CfcGZiRT.js";import"./index-D1_ZHIBm.js";import"./index-BfyspvgH.js";import"./createIntl-3lAAbMQb.js";import"./TidligereUtenlandsoppholdPanel-CJBBdiYv.js";import"./ErrorSummaryHookForm-5siRA4qs.js";import"./ExpansionCard-mC9D6fSj.js";import"./Plus-i_xX1OI2.js";import"./_baseIteratee-DR4_vQwt.js";import"./_baseUniq-BvvQ7sai.js";const f=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),L={title:"steps/TidligereUtenlandsoppholdSteg",component:a},u=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],S=({mellomlagreSøknadOgNaviger:r=f(),gåTilNesteSide:d=s("button-click"),utenlandsopphold:l={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1}})=>(p(),i.jsx(T,{initialEntries:[m.HAR_BODD_I_UTLANDET],children:i.jsx(g,{onDispatch:d,initialState:{[v.UTENLANDSOPPHOLD]:l},children:i.jsx(a,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:()=>{},arbeidsforhold:u})})})),e=S.bind({});var t,o,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false
  }
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.HAR_BODD_I_UTLANDET]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,L as default};
