import{j as t}from"./Button-uluYPR4k.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as m,S as g}from"./attachmentType-CO8SwnHI.js";import{i as T}from"./Uttaksdagen-H-XNd7g7.js";import{a as v,S,C as i}from"./routes-DY2bjmhp.js";import{M as f,A as b,T as u}from"./useSvpNavigator-RswE5uDc.js";import{F as l}from"./FrilansStep-CzOhuf17.js";import"./index-DVXBtNgz.js";import"./tslib.es6-pJfR_DrR.js";import"./v4-CQkTLCs1.js";import"./dateFormValidation-CdD9UNZL.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";import"./ErrorSummaryHookForm-BvX17SUG.js";import"./infobox.module-DxLUJskk.js";import"./Modal-BUY5Cvog.js";import"./index-Cbx7Fas8.js";import"./index-Dcs0RV0A.js";import"./EgenNæring-DdBVG6ty.js";import"./Frilans-B_RcwIAw.js";import"./velgArbeidFormUtils-Bf44V_Ek.js";const P={title:"steps/FrilansStep",component:l},n=()=>(...r)=>(d("button-click")(...r),Promise.resolve()),E=[{id:"1669400414-9409-3313-0700-3334116100409",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{id:"149599873-5769-19110-21897-6184606004018",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{id:"86832061-1118-9701-6179-20647729409710",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{id:"186699244-06994-0884-1562-860234771205",arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{id:"263929546-6215-9868-5127-161910165730101",arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{id:"0132715641-23932-19917-03900-809964087910",arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],I=({mellomlagreSøknadOgNaviger:r=n(),gåTilNesteSide:p=d("button-click")})=>(T(),t.jsx(f,{initialEntries:[v.FRILANS],children:t.jsx(S,{onDispatch:p,initialState:{[i.INNTEKTSINFORMASJON]:{harJobbetSomFrilans:!0,harHattArbeidIUtlandet:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[i.TILRETTELEGGINGER]:[{id:"263929546-6215-9868-5127-161910165730101",arbeidsforhold:{arbeidsgiverId:"990322244",type:b.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:"2023-01-01",type:u.DELVIS,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:m.TILRETTELEGGING,skjemanummer:g.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[i.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:t.jsx(l,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:n(),arbeidsforhold:E})})})),e=I.bind({});var o,a,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.FRILANS]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harJobbetSomFrilans: true,
        harHattArbeidIUtlandet: false,
        harJobbetSomSelvstendigNæringsdrivende: false
      },
      [ContextDataType.TILRETTELEGGINGER]: [{
        id: '263929546-6215-9868-5127-161910165730101',
        arbeidsforhold: {
          arbeidsgiverId: '990322244',
          type: Arbeidsforholdstype.VIRKSOMHET,
          navn: 'Omsorgspartner Vestfold AS',
          stillinger: [],
          startdato: '2023-01-01'
        },
        varierendePerioder: [],
        behovForTilretteleggingFom: '2023-01-01',
        type: TilretteleggingstypeOptions.DELVIS,
        vedlegg: [{
          id: 'V134300149934973076055420920289127108',
          file: ({} as any),
          filename: 'vedlegg – Kopi (7).png',
          filesize: 7477,
          uploaded: true,
          pending: false,
          type: AttachmentType.TILRETTELEGGING,
          skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
          url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
          uuid: 'Created'
        }]
      }],
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: '2024-02-18',
        fødselsdato: '2024-02-18'
      }
    }}>
                <FrilansStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const B=["Default"];export{e as Default,B as __namedExportsOrder,P as default};
