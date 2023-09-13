import{j as i}from"./jsx-runtime-69eee039.js";import{w as T}from"./withIntl-e58a24a5.js";import{w as U}from"./withRouter-7855e4ba.js";import{w as D,F as L}from"./ForeldrepengerStateMock-3005dbc2.js";import{A as _}from"./AxiosMock-17aa2afc.js";import{R as x}from"./api-758ba7aa.js";import{s as P,a as I}from"./stønadskonto80-8e203d8f.js";import{s as G,a as K}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as N}from"./UttaksplanInfo-f8b2a09b.js";import"./index-7c191284.js";import"./IntlProvider-81e30403.js";import"./validationUtils-98d33cd3.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./extends-fed75772.js";import"./index-ecbee218.js";import"./index-e13aeee6.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-73e632aa.js";import"./dateUtils-3d3f8269.js";import"./getTypedFormComponents-b55cb5c1.js";import"./mapSøkerinfoDTO-d68bd2d0.js";import"./useSaveLoadedRoute-952bea34.js";import"./amplitude-bdf1e125.js";import"./globalUtil-c820f73d.js";import"./submitUtils-6c106b54.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-7a6031f5.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-09efc595.js";import"./Periodene-393eac0e.js";import"./apiInterceptor-d433db8f.js";import"./personUtils-3b6d427a.js";import"./Personkort-69e10f4f.js";import"./Dekningsgrad-fced8842.js";import"./useSøkerinfo-a62987d5.js";import"./index-47edccfa.js";import"./annenForelderUtils-c5a9f33a.js";import"./constants-c4bc2eb8.js";import"./LenkeKnapp-2a36bcd6.js";import"./InfoOmSøknaden-3a76676e.js";import"./Sirkelmaske-229c502e.js";import"./Foreldrepar-cfed28e8.js";import"./InnholdMedIllustrasjon-2174ca3a.js";import"./links-b36d21ab.js";import"./useOnValidSubmit-6a51f59a.js";import"./eksisterendeSakUtils-1a72f3c6.js";import"./velkommenUtils-0901e514.js";import"./Fieldset-2a6c6c1b.js";import"./formUtils-17a5d191.js";const v={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},y=4,b="/soknad/uttaksplan-info",j={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{type:"født",fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1,tilleggsopplysninger:{}},version:y,currentRoute:b,søknadGjelderEtNyttBarn:!0},h={FORELDREPENGER:273,FORELDREPENGER_FØR_FØDSEL:15},w={farRundtFødsel:0,generellMinsterett:0,toTette:0},B={kontoer:h,minsteretter:w},V={FORELDREPENGER:323,FORELDREPENGER_FØR_FØDSEL:15},$={farRundtFødsel:0,generellMinsterett:0,toTette:0},q={kontoer:V,minsteretter:$},C={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:195,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:105},H={farRundtFødsel:0,generellMinsterett:0,toTette:0},Y={kontoer:C,minsteretter:H},z={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15,FLERBARNSDAGER:85},J={farRundtFødsel:0,generellMinsterett:0,toTette:0},Q={kontoer:z,minsteretter:J},W="/innsyn/v2/annenPartVedtak",d="/uttak-url/konto",a=v,e=j,Qe={title:"steps/uttaksplan-info/MorFødsel",component:N,decorators:[U,T,D]},k=s=>{const A=p=>{p.onPost(W).replyOnce(200,void 0,x.FINISHED),p.onGet(d).replyOnce(200,s.stønadskonto100),p.onGet(d).replyOnce(200,s.stønadskonto80)};return i.jsx(_,{mock:A,children:i.jsx(L,{søknad:s.context,søkerinfo:s.søkerinfo,children:i.jsx(N,{})})})},t=k.bind({});t.args={stønadskonto100:P,stønadskonto80:I,context:e,søkerinfo:a};const n=k.bind({});n.args={stønadskonto100:B,stønadskonto80:q,context:{...e,søknad:{...e.søknad,barn:{...e.søknad.barn,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"}}},søkerinfo:a};const o=k.bind({});o.args={stønadskonto100:G,stønadskonto80:K,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};const r=k.bind({});r.args={stønadskonto100:Q,stønadskonto80:Y,context:{...e,søknad:{...e.søknad,søker:{...e.søknad.søker,erAleneOmOmsorg:!1},barn:{...e.søknad.barn,antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1}}},søkerinfo:a};var c,l,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var E,f,R;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
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
}`,...(R=(f=n.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var g,M,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(S=(M=o.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var u,O,F;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=MorFodsel.stories-5ccb8113.js.map
