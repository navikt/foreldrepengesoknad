import{j as r}from"./VStack-WHXoK350.js";import{P as c}from"./usePlanleggerNavigator-D5ICl2kR.js";import{P as d,g,M as k,a as u,B as x}from"./Planlegger-CfD6uvoe.js";import{r as f}from"./index-DVXBtNgz.js";import{S as e}from"./uttakUtils-Bwre5uei.js";import"./Label-fr1ceDiJ.js";import{i as M}from"./Arbeidssituasjon-CN0FLUdg.js";import{n as h,u as n,e as F,a as P}from"./nn_NO-CqX4i02I.js";import{I as S,E}from"./Infobox-DsnShUVx.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-B2i4COBs.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-Cbx7Fas8.js";import"./hvemHarRettUtils-BA6nnELj.js";import"./ArbeidssituasjonSteg-DMII0jid.js";import"./GreenRadioGroup-CBcYt_4L.js";import"./StepButtonsHookForm-fh8Q5j67.js";import"./Calendar-BZZfWk4Z.js";import"./Responsive-WWdcyc0t.js";import"./ArrowLeft-Dtu47hhV.js";import"./PlanleggerStepPage-XUVo4FBw.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Checkmark-DT9WXbuU.js";import"./Spacer-CmfZYR-2.js";import"./FordelingSteg-CbZsZbWu.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-C7iPEE71.js";import"./HvorLangPeriodeSteg-JHhM6HBr.js";import"./PersonGroup-Cfb_4mVh.js";import"./OmBarnetSteg-DO90KCRr.js";import"./TasklistStart-B0h6AqDi.js";import"./OmPlanleggerenSteg-B19H8cG0.js";import"./OppsummeringSteg-BApB_zYK.js";import"./ExpansionCard-rVhYZxvQ.js";import"./kalenderPerioderUtils-DivcWZc5.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-DTN_qf_m.js";import"./PlanenDeresSteg-D_6BjTOV.js";import"./OmÅTilpassePlanen-BvAJr-oU.js";import"./BabyWrapped-BuBGhlxi.js";import"./PersonPregnant-CPShOP20.js";import"./UforutsetteEndringer-8lwbN6uY.js";import"./Information-CMXdOA2t.js";import"./extends-CF3RwP-h.js";import"./tslib.es6-CMwweBXX.js";import"./index-Dcs0RV0A.js";const y={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},v={...P,...n.nb},b={nb:v,nn:{...h,...n.nn},en:{...F,...n.en}},Fe={title:"PlanleggerDataFetcher",component:d},o={render:l=>{M();const m=g(),a=new k(m);return l.brukStønadskontoMock?a.onPost("/rest/konto").reply(()=>[200,y]):a.onPost("/rest/konto").reply(async t=>[200,(await u.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",t.data,{withCredentials:t.withCredentials,headers:t.headers,timeout:t.timeout})).data]),r.jsx(f.StrictMode,{children:r.jsx(S,{locale:"nb",messagesGroupedByLocale:b,children:r.jsx(E,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:r.jsx(x,{children:r.jsx(c,{initialState:{},children:r.jsx(d,{locale:"nb",changeLocale:()=>{}})})})})})})}};var s,i,p;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(p=(i=o.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const Pe=["Default"];export{o as Default,Pe as __namedExportsOrder,Fe as default};
