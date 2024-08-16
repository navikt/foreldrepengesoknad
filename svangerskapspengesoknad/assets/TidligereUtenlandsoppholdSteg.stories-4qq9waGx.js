import{j as i}from"./tslib.es6-C_-gbNBy.js";import{a as s}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as p}from"./ByttBrowserModal-Dv8pZ_Qo.js";import{a as m,S as g,C as v}from"./routes-BKH065He.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-BobdKlvH.js";import{M as T}from"./useSvpNavigator-DQRDlbgC.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./TidligereUtenlandsoppholdPanel-CmCC_e5D.js";import"./dateFormValidation-Q3zZfDbt.js";import"./Checkbox-B84U264Q.js";import"./ExpansionCard-zBeWyIBC.js";import"./Plus-ClKC7kKp.js";import"./_baseIteratee-BgXxtZRV.js";import"./_baseUniq-IUta85de.js";const f=()=>(...r)=>(s("button-click")(...r),Promise.resolve()),B={title:"steps/TidligereUtenlandsoppholdSteg",component:a},u=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],S=({mellomlagreSøknadOgNaviger:r=f(),gåTilNesteSide:d=s("button-click"),utenlandsopphold:l={harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!1}})=>(p(),i.jsx(T,{initialEntries:[m.HAR_BODD_I_UTLANDET],children:i.jsx(g,{onDispatch:d,initialState:{[v.UTENLANDSOPPHOLD]:l},children:i.jsx(a,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:()=>{},arbeidsforhold:u})})})),e=S.bind({});var t,o,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`({
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
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const C=["Default"];export{e as Default,C as __namedExportsOrder,B as default};
