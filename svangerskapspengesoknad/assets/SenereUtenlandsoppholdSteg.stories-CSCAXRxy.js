import{j as t}from"./Button-uluYPR4k.js";import{a as o}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as p}from"./Uttaksdagen-BhZsPxay.js";import{a as m,S as g,C as S}from"./routes-DY2bjmhp.js";import{S as a}from"./SenereUtenlandsoppholdSteg-BhciTUNf.js";import{M as c}from"./useSvpNavigator-Bww-HRoF.js";import"./index-DVXBtNgz.js";import"./tslib.es6-pJfR_DrR.js";import"./v4-CQkTLCs1.js";import"./infobox.module-DXupakH_.js";import"./Modal-BUY5Cvog.js";import"./index-Cbx7Fas8.js";import"./index-Dcs0RV0A.js";import"./TidligereUtenlandsoppholdPanel-Ct83jYEW.js";import"./ErrorSummaryHookForm-C2oW9Y-j.js";import"./dateFormValidation--aNpoRrd.js";import"./ExpansionCard-Bjj_HrJJ.js";import"./Plus-DA51gZnq.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";const v=()=>(...r)=>(o("button-click")(...r),Promise.resolve()),u=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],f={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!0},P={title:"steps/SenereUtenlandsoppholdSteg",component:a},b=({mellomlagreSøknadOgNaviger:r=v(),gåTilNesteSide:d=o("button-click"),utenlandsforhold:l=f})=>(p(),t.jsx(c,{initialEntries:[m.SKAL_BO_I_UTLANDET],children:t.jsx(g,{onDispatch:d,initialState:{[S.UTENLANDSOPPHOLD]:l},children:t.jsx(a,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o("button-click"),arbeidsforhold:u})})})),e=b.bind({});var i,n,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.SKAL_BO_I_UTLANDET]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
    }}>
                <SenereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const V=["Default"];export{e as Default,V as __namedExportsOrder,P as default};
