import{j as r}from"./jsx-runtime-_e34SzbC.js";import{P as c}from"./usePlanleggerNavigator-BZ6Y1tld.js";import{P as m,g,M as k,a as u,B as x}from"./Planlegger-BBOM8vIo.js";import{r as f}from"./index-DVXBtNgz.js";import{S as e}from"./uttakUtils-DxdAnUVc.js";import"./Uttaksdagen-oR0d4Gua.js";import{i as M}from"./Arbeidssituasjon-rAW6RSqH.js";import{n as h,u as n,e as F,a as P}from"./nn_NO-uY67aDle.js";import{I as S,E}from"./infobox.module-DtPzhx7Z.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-CHTffTZd.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-Cbx7Fas8.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./amplitude.esm-BThBy0fb.js";import"./ArbeidssituasjonSteg-CMg_q4s0.js";import"./GreenRadioGroup-DsnT97XG.js";import"./StepButtonsHookForm-BvshQKFy.js";import"./clsx-B-dksMZM.js";import"./useId-BuMKUBu9.js";import"./Button-DG980N3E.js";import"./Label-DFEFJLqZ.js";import"./Select-Dt8IwbBp.js";import"./useId-DbilmxAP.js";import"./ChevronDown-CcwFV5Ek.js";import"./Calendar-DfqO_VWn.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./GreenPanel-h__UB972.js";import"./Box-DGewKQma.js";import"./css-CqApuV4H.js";import"./PlanleggerStepPage-AXsh-H93.js";import"./GreenHeading-B5QLwpFd.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./PlanleggerPage-BtCD0bLx.js";import"./VStack-DzX3uTsq.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./Checkmark-BZX4qwFf.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-DQp7wRCl.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CiHWlmqs.js";import"./HvorLangPeriodeSteg-Ixb4_27f.js";import"./PersonGroup-DiEFwi66.js";import"./OmBarnetSteg-DCWOOMa0.js";import"./TasklistStart-06HzpnvP.js";import"./OmPlanleggerenSteg-Cd-gZWbl.js";import"./LanguageToggle-D9wy30FU.js";import"./OppsummeringSteg-uRPK18j4.js";import"./ExpansionCard-_FY0jhnH.js";import"./kalenderPerioderUtils-Uy6941uC.js";import"./CalendarIconLabel-D3VA8mep.js";import"./FamiliehendelseLabel-CLEzLQ0W.js";import"./PlanenDeresSteg-BTJ7opWX.js";import"./OmÅTilpassePlanen-DPoipxP_.js";import"./BabyWrapped-Dn1_Bla9.js";import"./PersonPregnant-Barn0uDD.js";import"./UforutsetteEndringer-DDxf0ia_.js";import"./Information-DnqWs4L0.js";import"./extends-CF3RwP-h.js";import"./index-Dcs0RV0A.js";const y={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={...P,...n.nb},b={nb:v,nn:{...h,...n.nn},en:{...F,...n.en}},Ne={title:"PlanleggerDataFetcher",component:m},o={render:d=>{M();const l=g(),a=new k(l);return d.brukStønadskontoMock?a.onPost("/rest/konto").reply(()=>[200,y]):a.onPost("/rest/konto").reply(async t=>[200,(await u.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),r.jsx(f.StrictMode,{children:r.jsx(S,{locale:"nb",messagesGroupedByLocale:b,children:r.jsx(E,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:r.jsx(x,{children:r.jsx(c,{initialState:{},children:r.jsx(m,{locale:"nb",changeLocale:()=>{}})})})})})})}};var i,s,p;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => {
    initAmplitude();
    const axiosInstance = getAxiosInstance();
    const apiMock = new MockAdapter(axiosInstance);
    if (args.brukStønadskontoMock) {
      apiMock.onPost('/rest/konto').reply(() => {
        return [200, kontoer];
      });
    } else {
      apiMock.onPost('/rest/konto').reply(async config => {
        const redirectResponse = await axios.create().post('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', config.data, {
          withCredentials: config.withCredentials,
          headers: config.headers,
          timeout: config.timeout
        });
        return [200, redirectResponse.data];
      });
    }
    return <StrictMode>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                        <BrowserRouter>
                            <PlanleggerDataContext initialState={{}}>
                                <PlanleggerDataFetcher locale="nb" changeLocale={() => undefined} />
                            </PlanleggerDataContext>
                        </BrowserRouter>
                    </ErrorBoundary>
                </IntlProvider>
            </StrictMode>;
  }
}`,...(p=(s=o.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const Te=["Default"];export{o as Default,Te as __namedExportsOrder,Ne as default};
