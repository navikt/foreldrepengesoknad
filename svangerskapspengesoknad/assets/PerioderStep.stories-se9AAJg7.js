import{j as o}from"./tslib.es6-C_-gbNBy.js";import{a as b}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as D}from"./ByttBrowserModal-DkV6ZvDc.js";import{a as y,S as N,C as n}from"./routes-BKH065He.js";import{T as a,D as s,A,M as F}from"./useSvpNavigator-6gPh0HxU.js";import{P as x}from"./PerioderStep-CN5AEiwt.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-BRV0Se7Z.js";import"./index-9r8iugjR.js";import"./minMax-DNM2E0N-.js";import"./Checkbox-D0UPnPR_.js";import"./_baseIteratee-BgXxtZRV.js";import"./_baseUniq-IUta85de.js";import"./dateUtils-D7C27Uee.js";import"./Bedriftsbanner-Bzww4XgP.js";import"./tilretteleggingUtils-C-F3JBlX.js";import"./numberUtils-DCxWcr3S.js";import"./validationUtils-DSdP68ax.js";import"./ReadMore-Bb6b_GDg.js";import"./Plus-C788Nq4q.js";const Y={title:"steps/PerioderStep",component:x},G=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],L={erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"},d=()=>(...i)=>(b("button-click")(...i),Promise.resolve()),l=({mellomlagreSøknadOgNaviger:i=d(),gåTilNesteSide:I=b("button-click"),tilrettelegging:u,barn:f=L})=>(D(),o.jsx(F,{initialEntries:[y.PERIODER],children:o.jsx(N,{onDispatch:I,initialState:{[n.TILRETTELEGGINGER]:u,[n.VALGT_TILRETTELEGGING_ID]:"263929546-6215-9868-5127-161910165730101",[n.OM_BARNET]:f},children:o.jsx(x,{mellomlagreSøknadOgNaviger:i,avbrytSøknad:d(),arbeidsforhold:G})})})),e=l.bind({});e.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:a.DELVIS,delvisTilretteleggingPeriodeType:s.VARIERTE_PERIODER}]};const t=l.bind({});t.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",stillinger:[{fom:"2019-01-01",stillingsprosent:100}]},type:a.DELVIS,delvisTilretteleggingPeriodeType:s.VARIERTE_PERIODER}],barn:{erBarnetFødt:!0,termindato:"2024-01-18",fødselsdato:"2023-02-18"}};const r=l.bind({});r.args={tilrettelegging:[{id:"263929546-6215-9868-5127-161910165730101",behovForTilretteleggingFom:"2023-09-01",arbeidsforhold:{navn:"Omsorgspartner Vestfold AS",type:A.VIRKSOMHET,startdato:"2023-09-01",stillinger:[{fom:"2023-09-01",stillingsprosent:10},{fom:"2023-10-01",stillingsprosent:20},{fom:"2023-11-01",stillingsprosent:0}]},type:a.DELVIS,delvisTilretteleggingPeriodeType:s.VARIERTE_PERIODER}]};var g,p,m;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  tilrettelegging,
  barn = DEFAULT_BARN
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODER]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
      [ContextDataType.OM_BARNET]: barn
    }}>
                <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var T,E,S;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  tilrettelegging,
  barn = DEFAULT_BARN
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODER]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
      [ContextDataType.OM_BARNET]: barn
    }}>
                <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(S=(E=t.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var c,R,v;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click'),
  tilrettelegging,
  barn = DEFAULT_BARN
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.PERIODER]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
      [ContextDataType.OM_BARNET]: barn
    }}>
                <PerioderStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(v=(R=r.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};const $=["Default","FremTilFødselsdato","FlereStillinger"];export{e as Default,r as FlereStillinger,t as FremTilFødselsdato,$ as __namedExportsOrder,Y as default};
