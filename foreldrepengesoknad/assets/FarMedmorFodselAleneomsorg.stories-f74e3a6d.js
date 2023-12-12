import{j as r}from"./jsx-runtime-69eee039.js";import{w as k}from"./withRouter-f0df7a0f.js";import{A as f}from"./AxiosMock-ee1c53ff.js";import{R as S}from"./api-c8cb1d61.js";import{s as c,a as g}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as d}from"./UttaksplanInfo-4e0675ee.js";import{F as A,C as n}from"./FpDataContext-75ac2616.js";import{m as N}from"./mapSøkerinfoDTO-12ccca9c.js";import{d as a}from"./Tidsperioden-57efcdec.js";import{B as O}from"./barnUtils-bee45dcc.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-24de531f.js";import"./Periodene-f56e88dc.js";import"./Perioden-1c854ba4.js";import"./uttaksPlanStatus-1f5446f4.js";import"./stringUtils-9279c9e4.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f71b1bae.js";import"./amplitude-140e185d.js";import"./routes-9effe5a6.js";import"./Uttaksplan-c276434e.js";import"./FormikFileUploader-7ddafbe0.js";import"./AttachmentList-8d3b0f2c.js";import"./Attachment-2aa2754e.js";import"./Link-b834ea2b.js";import"./links-b36d21ab.js";import"./leggTilPeriode-9260f055.js";import"./arbeidsforholdUtils-1da69487.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-22f7a163.js";import"./message-87a45ae9.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-845f0535.js";import"./dateUtils-1f54a9f2.js";import"./eksisterendeSakUtils-90c073d8.js";import"./velkommenUtils-837cf02c.js";import"./exports-70c8b745.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const T={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},u="/innsyn/v2/annenPartVedtak",s="/konto",F=T,Nt={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},D=e=>{const l=async o=>{o.onPost(u).replyOnce(200,void 0,S.FINISHED),await o.onGet(s).replyOnce(200,e.stønadskonto100),await o.onGet(s).replyOnce(200,e.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(A,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:{type:O.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[n.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:N(e.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=D.bind({});t.args={stønadskonto100:c,stønadskonto80:g,søkerinfo:F};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
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
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Ot=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{t as UttaksplanInfoFarMedmorFødselAleneomsorg,Ot as __namedExportsOrder,Nt as default};
//# sourceMappingURL=FarMedmorFodselAleneomsorg.stories-f74e3a6d.js.map
