import{j as e}from"./jsx-runtime-69eee039.js";import{w as d}from"./withRouter-a172066d.js";import{w as k,F as l}from"./ForeldrepengerStateMock-c0a24792.js";import{A as c}from"./AxiosMock-5d611184.js";import{R as f}from"./api-32ec0d49.js";import{s as u,a as g}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as i}from"./UttaksplanInfo-8cbd9c6f.js";import"./index-7c191284.js";import"./useSøknad-26978d9c.js";import"./Tidsperioden-bc4aa89e.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-03fa3834.js";import"./amplitude-e7683f28.js";import"./submitUtils-3b298622.js";import"./Periodene-3e3b4ab3.js";import"./apiInterceptor-565c1682.js";import"./leggTilPeriode-197d6712.js";import"./Uttaksplan-2cb6efb2.js";import"./FormikFileUploader-5c0e4e48.js";import"./AttachmentList-6bd7cc9e.js";import"./Attachment-3a7d5334.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-5ef2b738.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./formUtils-9352967f.js";import"./message-0de53699.js";import"./useSøkerinfo-417aa154.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-72c7ff20.js";import"./useOnValidSubmit-1caa3e37.js";import"./dateUtils-9225f718.js";import"./eksisterendeSakUtils-9faa4d73.js";import"./velkommenUtils-67ca2dfd.js";const A={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},F=4,O="/soknad/uttaksplan-info",N={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{type:"født",fødselsdatoer:["2022-03-01"],antallBarn:"1",datoForAleneomsorg:"2022-03-24",dokumentasjonAvAleneomsorg:[]},annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0},søker:{erAleneOmOmsorg:!0,språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1},version:F,currentRoute:O,søknadGjelderEtNyttBarn:!0},S="/innsyn/v2/annenPartVedtak",n="/konto",M=A,x=N,co={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:i,decorators:[d,k]},U=t=>{const m=async r=>{r.onPost(S).replyOnce(200,void 0,f.FINISHED),await r.onGet(n).replyOnce(200,t.stønadskonto100),await r.onGet(n).replyOnce(200,t.stønadskonto80)};return e.jsx(c,{mock:m,children:e.jsx(l,{søknad:t.context,søkerinfo:t.søkerinfo,children:e.jsx(i,{})})})},o=U.bind({});o.args={stønadskonto100:u,stønadskonto80:g,context:x,søkerinfo:M};var s,a,p;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const restMock = async (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={(args.context as ForeldrepengesøknadContextState)} søkerinfo={(args.søkerinfo as SøkerinfoDTO)}>
                <UttaksplanInfo />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(p=(a=o.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const fo=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{o as UttaksplanInfoFarMedmorFødselAleneomsorg,fo as __namedExportsOrder,co as default};
//# sourceMappingURL=FarMedmorFodselAleneomsorg.stories-13d6bd07.js.map