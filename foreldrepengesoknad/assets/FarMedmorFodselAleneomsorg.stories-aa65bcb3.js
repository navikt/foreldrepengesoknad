import{j as r}from"./jsx-runtime-69eee039.js";import{w as k}from"./withRouter-f0df7a0f.js";import{A as f}from"./AxiosMock-ee1c53ff.js";import{R as S}from"./api-5938920d.js";import{s as c,a as g}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-b77ca744.js";import{F as A,C as n}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-a5e0e12b.js";import{d as a}from"./Tidsperioden-4072d221.js";import{B as O}from"./barnUtils-add2ce08.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-b25b10db.js";import"./dates-b21a3b0a.js";import"./Periodene-a8a436f1.js";import"./Perioden-3047fca2.js";import"./uttaksPlanStatus-71e43445.js";import"./stringUtils-15d9a2c2.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-99aab0f1.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./Uttaksplan-d6e5bdd8.js";import"./FormikFileUploader-ae51358a.js";import"./AttachmentList-25c5660d.js";import"./Attachment-cdd13d4c.js";import"./Link-b834ea2b.js";import"./IntlProvider-54af2afe.js";import"./provider-0f1d4d22.js";import"./links-b36d21ab.js";import"./leggTilPeriode-f89f8cb3.js";import"./arbeidsforholdUtils-44f9c5f5.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-f87232b7.js";import"./message-e59c93c2.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-37596ffe.js";import"./dateUtils-a3f64a51.js";import"./eksisterendeSakUtils-275dc27c.js";import"./velkommenUtils-c267258f.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const T={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},u="/innsyn/v2/annenPartVedtak",s="/konto",F=T,ut={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},D=o=>{const l=async e=>{e.onPost(u).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,o.stønadskonto100),await e.onGet(s).replyOnce(200,o.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(A,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:O.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:N(o.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=D.bind({});t.args={stønadskonto100:c,stønadskonto80:g,søkerinfo:F};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  const restMock = async (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2022-03-24').toDate(),
        dokumentasjonAvAleneomsorg: []
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: {
        etternavn: 'dfg',
        fornavn: 'dfg',
        fnr: '02068629902',
        utenlandskFnr: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: true,
        erInformertOmSøknaden: true
      }
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Ft=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{t as UttaksplanInfoFarMedmorFødselAleneomsorg,Ft as __namedExportsOrder,ut as default};
//# sourceMappingURL=FarMedmorFodselAleneomsorg.stories-aa65bcb3.js.map
