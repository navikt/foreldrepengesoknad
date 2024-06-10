import{j as t}from"./Button-uluYPR4k.js";import{a as m}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as T,d as o,I as n}from"./dateUtils-DBWcpdL8.js";import{A as f,S as E}from"./attachmentType-CO8SwnHI.js";import{a as v,S as I,C as i}from"./routes-DY2bjmhp.js";import{M as u,A as S}from"./useSvpNavigator-0JW2Goo0.js";import{T as p}from"./TilretteleggingStep-Cxet84pU.js";import"./index-DVXBtNgz.js";import"./tslib.es6-pJfR_DrR.js";import"./v4-CQkTLCs1.js";import"./dateFormValidation-CpnB1umx.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";import"./ErrorSummaryHookForm-wJykuSsY.js";import"./infobox.module-D-7l-hcE.js";import"./Modal-BUY5Cvog.js";import"./index-Cbx7Fas8.js";import"./index-Dcs0RV0A.js";import"./dateUtils-BUkNVLAZ.js";import"./validationUtils-BIplXdMj.js";import"./Bedriftsbanner-isVxGW3r.js";import"./numberUtils-DCxWcr3S.js";import"./ReadMore-CLVVY0E5.js";import"./useControllableState-cgc7bYZe.js";import"./ExpansionCard-DLtY8t2X.js";const w={title:"steps/TilretteleggingStep",component:p},a=()=>(...r)=>(m("button-click")(...r),Promise.resolve()),y=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2014-05-22T00:00:00.000Z",stillingsprosent:32.63,tom:"2019-05-31T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-04-09T00:00:00.000Z",stillingsprosent:0,tom:"2018-09-09T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2018-06-25T00:00:00.000Z",stillingsprosent:80,tom:"2018-08-05T00:00:00.000Z"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Sykehuset i Vestfold",fom:"2019-06-01T00:00:00.000Z",stillingsprosent:85.09},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Omsorgspartner Vestfold AS",fom:"2017-04-05T00:00:00.000Z",stillingsprosent:100},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Re Kommune",fom:"2018-06-01T00:00:00.000Z",stillingsprosent:0}],G=({mellomlagreSøknadOgNaviger:r=a(),gåTilNesteSide:g=m("button-click")})=>(T(),t.jsx(u,{initialEntries:[v.TILRETTELEGGING],children:t.jsx(I,{onDispatch:g,initialState:{[i.TILRETTELEGGINGER]:[{id:"990322244",arbeidsforhold:{arbeidsgiverId:"990322244",type:S.VIRKSOMHET,navn:"Omsorgspartner Vestfold AS",stillinger:[],startdato:"2023-01-01"},varierendePerioder:[],behovForTilretteleggingFom:void 0,type:void 0,vedlegg:[{id:"V134300149934973076055420920289127108",file:{},filename:"vedlegg – Kopi (7).png",filesize:7477,uploaded:!0,pending:!1,type:f.TILRETTELEGGING,skjemanummer:E.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,url:"http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108",uuid:"Created"}]}],[i.VALGT_TILRETTELEGGING_ID]:"990322244",[i.OM_BARNET]:{erBarnetFødt:!1,termindato:o().add(45,"days").format(n),fødselsdato:o().add(45,"days").format(n)}},children:t.jsx(p,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:a(),arbeidsforhold:y})})})),e=G.bind({});var s,d,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.TILRETTELEGGING]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.TILRETTELEGGINGER]: [{
        id: '990322244',
        arbeidsforhold: {
          arbeidsgiverId: '990322244',
          type: Arbeidsforholdstype.VIRKSOMHET,
          navn: 'Omsorgspartner Vestfold AS',
          stillinger: [],
          startdato: '2023-01-01'
        },
        varierendePerioder: [],
        behovForTilretteleggingFom: undefined!,
        type: undefined!,
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
      [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
      [ContextDataType.OM_BARNET]: {
        erBarnetFødt: false,
        termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
        fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT)
      }
    }}>
                <TilretteleggingStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={arbeidsforhold} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const Q=["Default"];export{e as Default,Q as __namedExportsOrder,w as default};
