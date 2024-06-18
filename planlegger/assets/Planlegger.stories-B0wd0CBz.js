import{j as e}from"./jsx-runtime-_e34SzbC.js";import{P as s}from"./usePlanleggerNavigator-BZ6Y1tld.js";import{P as p,M as l,p as d,B as c}from"./Planlegger-BEoxCU2O.js";import{r as g}from"./index-DVXBtNgz.js";import{S as r}from"./uttakUtils-DxdAnUVc.js";import"./Uttaksdagen-oR0d4Gua.js";import{i as k}from"./Arbeidssituasjon-rAW6RSqH.js";import{n as u,u as t,e as M,a as F}from"./nn_NO-uY67aDle.js";import{I as f,E as S}from"./infobox.module-DtPzhx7Z.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-CHTffTZd.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-Cbx7Fas8.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./amplitude.esm-BThBy0fb.js";import"./ArbeidssituasjonSteg-CMg_q4s0.js";import"./GreenRadioGroup-DsnT97XG.js";import"./StepButtonsHookForm-BvshQKFy.js";import"./clsx-B-dksMZM.js";import"./useId-BuMKUBu9.js";import"./Button-DG980N3E.js";import"./Label-DFEFJLqZ.js";import"./Select-Dt8IwbBp.js";import"./useId-DbilmxAP.js";import"./ChevronDown-CcwFV5Ek.js";import"./Calendar-DfqO_VWn.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./GreenPanel-h__UB972.js";import"./Box-DGewKQma.js";import"./css-CqApuV4H.js";import"./PlanleggerStepPage-AXsh-H93.js";import"./GreenHeading-B5QLwpFd.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./PlanleggerPage-BtCD0bLx.js";import"./VStack-DzX3uTsq.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./Checkmark-BZX4qwFf.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-DQp7wRCl.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-CiHWlmqs.js";import"./HvorLangPeriodeSteg-Ixb4_27f.js";import"./PersonGroup-DiEFwi66.js";import"./OmBarnetSteg-DCWOOMa0.js";import"./TasklistStart-06HzpnvP.js";import"./OmPlanleggerenSteg-Cd-gZWbl.js";import"./LanguageToggle-D9wy30FU.js";import"./OppsummeringSteg-uRPK18j4.js";import"./ExpansionCard-_FY0jhnH.js";import"./kalenderPerioderUtils-Uy6941uC.js";import"./CalendarIconLabel-D3VA8mep.js";import"./FamiliehendelseLabel-CLEzLQ0W.js";import"./PlanenDeresSteg-BTJ7opWX.js";import"./OmÅTilpassePlanen-DPoipxP_.js";import"./BabyWrapped-Dn1_Bla9.js";import"./PersonPregnant-Barn0uDD.js";import"./UforutsetteEndringer-DDxf0ia_.js";import"./Information-DnqWs4L0.js";import"./extends-CF3RwP-h.js";import"./index-Dcs0RV0A.js";const x={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},E={...F,...t.nb},P={nb:E,nn:{...u,...t.nn},en:{...M,...t.en}},Gr={title:"PlanleggerDataFetcher",component:p},o={render:m=>(k(),m.brukStønadskontoMock&&new l(d).onPost("/rest/konto").reply(()=>[200,x]),e.jsx(g.StrictMode,{children:e.jsx(f,{locale:"nb",messagesGroupedByLocale:P,children:e.jsx(S,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:e.jsx(c,{children:e.jsx(s,{initialState:{},children:e.jsx(p,{locale:"nb",changeLocale:()=>{}})})})})})}))};var n,i,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => {
    initAmplitude();
    if (args.brukStønadskontoMock) {
      const apiMock = new MockAdapter(planleggerApi);
      apiMock.onPost('/rest/konto').reply(() => {
        return [200, kontoer];
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
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const wr=["Default"];export{o as Default,wr as __namedExportsOrder,Gr as default};
