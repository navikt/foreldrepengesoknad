import{j as r}from"./jsx-runtime-69eee039.js";import{w as k}from"./withRouter-f0df7a0f.js";import{A as f}from"./AxiosMock-ee1c53ff.js";import{R as S}from"./api-cfbd0b51.js";import{s as c,a as g}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-907c5187.js";import{F as A,C as n}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-d9686cf0.js";import{d as a}from"./Tidsperioden-f06b1fb0.js";import{B as O}from"./barnUtils-6ca83891.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-53d645a6.js";import"./dates-53ab5347.js";import"./Periodene-0a8f4fdf.js";import"./Perioden-258f0205.js";import"./uttaksPlanStatus-eb75c060.js";import"./stringUtils-050465ad.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-38f20682.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./routes-9effe5a6.js";import"./Uttaksplan-3d83941c.js";import"./FormikFileUploader-edfedb50.js";import"./AttachmentList-0916f102.js";import"./Attachment-22089457.js";import"./Link-b834ea2b.js";import"./IntlProvider-0d1ea53b.js";import"./provider-679c532c.js";import"./links-b36d21ab.js";import"./leggTilPeriode-6d2e14ee.js";import"./arbeidsforholdUtils-25b9ff22.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-9cb8c0d5.js";import"./message-42800413.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-12be774c.js";import"./dateUtils-d252c747.js";import"./eksisterendeSakUtils-ae52dae6.js";import"./velkommenUtils-c9ac41d3.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const T={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},u="/innsyn/v2/annenPartVedtak",s="/konto",F=T,ut={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},D=o=>{const l=async e=>{e.onPost(u).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,o.stønadskonto100),await e.onGet(s).replyOnce(200,o.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(A,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:O.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:N(o.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=D.bind({});t.args={stønadskonto100:c,stønadskonto80:g,søkerinfo:F};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
//# sourceMappingURL=FarMedmorFodselAleneomsorg.stories-6bd584ee.js.map
