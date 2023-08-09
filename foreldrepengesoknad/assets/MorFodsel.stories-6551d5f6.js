import{j as i}from"./jsx-runtime-2c139190.js";import{w as A}from"./withIntl-56d3014e.js";import{w as T}from"./withRouter-f5ce0c47.js";import{w as U,F as D}from"./ForeldrepengerStateMock-6cb8bbe3.js";import{A as L}from"./AxiosMock-1d20c8fe.js";import{R as _}from"./api-b639d329.js";import{s as P,a as x}from"./stønadskonto80-8e203d8f.js";import{s as I,a as G}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as N}from"./UttaksplanInfo-fa35cad5.js";import"./index-b14cf94f.js";import"./IntlProvider-8c9095a4.js";import"./validationUtils-749fcdf4.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-958c5a2a.js";import"./dateUtils-c35f161a.js";import"./getTypedFormComponents-d760cc41.js";import"./mapSøkerinfoDTO-ee5c98c4.js";import"./useFortsettSøknadSenere-3c16dad9.js";import"./amplitude-7714a9b7.js";import"./globalUtil-9d9e0ee4.js";import"./apiInterceptor-53028d2f.js";import"./AnnenForelder-5c5d4f7f.js";import"./personUtils-191596d0.js";import"./Personkort-69f3889e.js";import"./periodeUtils-756f8671.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-9e58976c.js";import"./index-47edccfa.js";import"./annenForelderUtils-c18807f3.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-7af0979d.js";import"./InfoOmSøknaden-ec4c64e6.js";import"./Sirkelmaske-09fcb65b.js";import"./Foreldrepar-ca80670f.js";import"./InnholdMedIllustrasjon-6e07de37.js";import"./links-b36d21ab.js";import"./Periodene-6b5e37b0.js";import"./useOnValidSubmit-c90b0d0a.js";import"./useSaveLoadedRoute-fbce50ec.js";import"./vedleggUtils-40a9f1c3.js";import"./Attachment-a8e5b8d1.js";import"./eksisterendeSakUtils-d06d0e1f.js";import"./velkommenUtils-95e3f8b5.js";import"./Fieldset-b670cfe0.js";import"./formUtils-7620ebbd.js";const K={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},v=4,y="/soknad/uttaksplan-info",b={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,tilleggsopplysninger:{}},version:v,currentRoute:y,søknadGjelderEtNyttBarn:!0},h={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},j={farRundtFødsel:0,generellMinsterett:0,toTette:0},w={kontoer:h,minsteretter:j},B={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},V={farRundtFødsel:0,generellMinsterett:0,toTette:0},$={kontoer:B,minsteretter:V},q={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},C={farRundtFødsel:0,generellMinsterett:0,toTette:0},H={kontoer:q,minsteretter:C},Y={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},z={farRundtFødsel:0,generellMinsterett:0,toTette:0},J={kontoer:Y,minsteretter:z},Q="/innsyn/v2/annenPartVedtak",d="/uttak-url/konto",a=K,e=b,Qe={title:"steps/uttaksplan-info/MorFødsel",component:N,decorators:[T,A,U]},k=s=>i(L,{mock:p=>{p.onPost(Q).replyOnce(200,void 0,_.FINISHED),p.onGet(d).replyOnce(200,s.stønadskonto100),p.onGet(d).replyOnce(200,s.stønadskonto80)},children:i(D,{søknad:s.context,søkerinfo:s.søkerinfo,children:i(N,{})})}),t=k.bind({});t.args={stønadskonto100:P,stønadskonto80:x,context:e,søkerinfo:a};const n=k.bind({});n.args={stønadskonto100:w,stønadskonto80:$,context:{...e,søknad:{...e.søknad,barn:{...e.søknad.barn,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"}}},søkerinfo:a};const o=k.bind({});o.args={stønadskonto100:I,stønadskonto80:G,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};const r=k.bind({});r.args={stønadskonto100:J,stønadskonto80:H,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},barn:{...e.søknad.barn,antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};var c,l,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var E,f,M;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(M=(f=n.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var g,R,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(S=(R=o.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var u,O,F;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(F=(O=r.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};const We=["UttaksplanMedAleneomsorg","UttaksplanMedPrematurFødsel","UttaksplanMedDeltUttak","UttaksplanMedFlerbarnsukerTvillinger"];export{t as UttaksplanMedAleneomsorg,o as UttaksplanMedDeltUttak,r as UttaksplanMedFlerbarnsukerTvillinger,n as UttaksplanMedPrematurFødsel,We as __namedExportsOrder,Qe as default};
//# sourceMappingURL=MorFodsel.stories-6551d5f6.js.map
