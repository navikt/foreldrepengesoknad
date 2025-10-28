import{br as H,bs as r,l as M}from"./iframe-DST6YQOm.js";import{h as e,A as I,f as n}from"./index-B3vXg_A-.js";import{F as G,C as E}from"./FpDataContext-Bf-xDzfj.js";import{M as w,S as V}from"./useFpNavigator-mIhi1BTt.js";import{P as L}from"./PeriodeMedForeldrepengerSteg-DToHwl2e.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-Botrn0Y6.js";import"./eksisterendeSakUtils-B_brmwR-.js";import"./stønadskontoerUtils-CB8BOhBL.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,o=I.annenPartVedtak,l=I.konto,J=()=>()=>(v("button-click")(),Promise.resolve()),d={kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},p={kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},B={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},s={arbeidsforhold:[],mellomlagreSøknadOgNaviger:J(),avbrytSøknad:v("button-click")},$={title:"steps/PeriodeMedForeldrepengerSteg",component:L,decorators:[H],render:({gåTilNesteSide:U,søkersituasjon:h,annenForelder:K,barnet:b,...y})=>M.jsx(w,{initialEntries:[V.PERIODE_MED_FORELDREPENGER],children:M.jsx(G,{onDispatch:U,initialState:{[E.SØKERSITUASJON]:h,[E.OM_BARNET]:b,[E.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[E.ANNEN_FORELDER]:K},children:M.jsx(L,{...y})})})},t={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({80:p,100:d}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0}}},k={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({80:{...p,kontoer:[{konto:"FORELDREPENGER",dager:250}]},100:{...d,kontoer:[{konto:"FORELDREPENGER",dager:200}]}}))]}},args:{...t.args,annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1}}},g={parameters:t.parameters,args:{...t.args,barnet:{type:r.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},F={parameters:g.parameters,args:{...g.args,barnet:{type:r.UFØDT,antallBarn:1,termindato:"2024-06-30"}}},m={parameters:t.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},R={parameters:m.parameters,args:{...m.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:r.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]}}},a={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({100:{...d,kontoer:[{konto:"FORELDREPENGER",dager:230},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}]},80:{...p,kontoer:[{konto:"FORELDREPENGER",dager:280},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}]}}))]}},args:{...s,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:r.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0}}},i={parameters:a.parameters,args:{...a.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},u={parameters:i.parameters,args:{...i.args,søkersituasjon:{situasjon:"adopsjon",rolle:"far"}}},O={parameters:a.parameters,args:{...a.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},f={parameters:a.parameters,args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:r.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},T={parameters:a.parameters,args:{...a.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1}}},N={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({100:{...d,tillegg:{prematur:43,flerbarn:0}},80:{...p,tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},D={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({100:{...d,kontoer:[{konto:"FORELDREPENGER",dager:273},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...p,kontoer:[{konto:"FORELDREPENGER",dager:323},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0}}},S={parameters:t.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},c={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({100:{...d,kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:165},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...p,kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FORELDREPENGER",dager:195},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:0,flerbarn:105}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},A={parameters:{msw:{handlers:[e.post(o,()=>new n(null,{status:200})),e.post(l,()=>n.json({100:{...d,kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:165},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...p,kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:195},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],tillegg:{prematur:0,flerbarn:280}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0}}},j={parameters:{msw:{handlers:[e.post(o,()=>n.json({perioder:[B],dekningsgrad:"HUNDRE"})),e.post(l,()=>n.json({80:p,100:d}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},P={parameters:t.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:r.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},_={parameters:{msw:{handlers:[e.post(o,()=>n.json({perioder:[B],dekningsgrad:"ÅTTI"})),e.post(l,()=>n.json({80:p,100:d}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:r.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': STØNADSKONTO_80,
        '100': STØNADSKONTO_100
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2022-03-01'],
      antallBarn: 1,
      termindato: '2022-03-24'
    },
    annenForelder: {
      kanIkkeOppgis: true
    }
  }
}`,...t.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 250
          }]
        } satisfies KontoBeregningDto,
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 200
          }]
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    ...FarEllerMedmorAleneomsorgFødsel.args,
    annenForelder: {
      etternavn: 'dfg',
      fornavn: 'dfg',
      fnr: '02068629902',
      utenlandskFnr: false,
      kanIkkeOppgis: false,
      harRettPåForeldrepengerINorge: false,
      erInformertOmSøknaden: false,
      erAleneOmOmsorg: false
    }
  }
}`,...k.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
  args: {
    ...FarEllerMedmorAleneomsorgFødsel.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2022-03-24'
    },
    annenForelder: {
      etternavn: 'Pettersen',
      fornavn: 'Helga',
      fnr: '02458945678',
      utenlandskFnr: false,
      kanIkkeOppgis: false,
      harRettPåForeldrepengerINorge: true,
      erInformertOmSøknaden: true,
      erAleneOmOmsorg: false
    }
  }
}`,...g.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorFødselBeggeHarRett.parameters,
  args: {
    ...FarEllerMedmorFødselBeggeHarRett.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-30'
    }
  }
}`,...F.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2024-06-30'],
      termindato: '2024-06-30'
    },
    annenForelder: {
      etternavn: 'Pettersen',
      fornavn: 'Hans',
      fnr: '02458945678',
      utenlandskFnr: false,
      kanIkkeOppgis: false,
      harRettPåForeldrepengerINorge: true,
      erInformertOmSøknaden: true,
      erAleneOmOmsorg: false
    }
  }
}`,...m.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: MorFødselBeggeHarRettFødselFør1Juli2024.parameters,
  args: {
    ...MorFødselBeggeHarRettFødselFør1Juli2024.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      adopsjonsdato: '2024-07-01',
      fødselsdatoer: ['2024-07-01']
    }
  }
}`,...R.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 230
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }]
        },
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 280
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }]
        }
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.ADOPTERT_ANNET_BARN,
      antallBarn: 1,
      adopsjonsdato: '2021-03-15',
      adoptertIUtlandet: false,
      fødselsdatoer: []
    },
    annenForelder: {
      kanIkkeOppgis: true
    }
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
  args: {
    ...MorSøkerAdopsjonMedAleneomsorg.args,
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedDeltUttak.parameters,
  args: {
    ...MorSøkerAdopsjonMedDeltUttak.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    }
  }
}`,...u.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
  args: {
    ...MorSøkerAdopsjonMedAleneomsorg.args,
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...O.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
  args: {
    ...MorSøkerAdopsjonMedAleneomsorg.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      fødselsdatoer: ['2022-06-14'],
      termindato: '2022-08-14',
      antallBarn: 1,
      //@ts-expect-error fiks
      adopsjonsdato: undefined,
      adoptertIUtlandet: undefined,
      type: BarnType.FØDT
    },
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...f.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedAleneomsorg.parameters,
  args: {
    ...MorSøkerAdopsjonMedAleneomsorg.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    }
  }
}`,...T.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        } satisfies KontoBeregningDto,
        '80': {
          ...STØNADSKONTO_80,
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2021-01-11'],
      termindato: '2021-03-11'
    },
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...N.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 273
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        } satisfies KontoBeregningDto,
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: 'FORELDREPENGER',
            dager: 323
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2021-01-11'],
      termindato: '2021-03-11'
    },
    annenForelder: {
      kanIkkeOppgis: true
    }
  }
}`,...D.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...S.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 165
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 85
          }
        } satisfies KontoBeregningDto,
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FORELDREPENGER',
            dager: 195
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 105
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 2
    },
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...c.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 75
          }, {
            konto: 'FEDREKVOTE',
            dager: 75
          }, {
            konto: 'FELLESPERIODE',
            dager: 165
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 230
          }
        } satisfies KontoBeregningDto,
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: 'MØDREKVOTE',
            dager: 95
          }, {
            konto: 'FEDREKVOTE',
            dager: 95
          }, {
            konto: 'FELLESPERIODE',
            dager: 195
          }, {
            konto: 'FORELDREPENGER_FØR_FØDSEL',
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 280
          }
        } satisfies KontoBeregningDto
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 3
    },
    annenForelder: {
      kanIkkeOppgis: true
    }
  }
}`,...A.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json({
        perioder: [uttaksperiode],
        dekningsgrad: 'HUNDRE'
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': STØNADSKONTO_80,
        '100': STØNADSKONTO_100
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 2
    },
    annenForelder: {
      fornavn: 'Helga',
      etternavn: 'Utvikler',
      fnr: '12117212090',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...j.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorAleneomsorgFødsel.parameters,
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    barnet: {
      type: BarnType.UFØDT,
      termindato: '2024-07-01',
      antallBarn: 1
    },
    annenForelder: {
      fornavn: 'Helga',
      etternavn: 'Utvikler',
      fnr: '12117212090',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...P.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => HttpResponse.json({
        perioder: [uttaksperiode],
        dekningsgrad: 'ÅTTI'
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': STØNADSKONTO_80,
        '100': STØNADSKONTO_100
      }))]
    }
  },
  args: {
    ...fellesProps,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    barnet: {
      type: BarnType.UFØDT,
      termindato: '2024-07-01',
      antallBarn: 1
    },
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '12117212090',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,..._.parameters?.docs?.source}}};const ee=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselOgMorHarIkkeRett","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorFødselBeggeHarRettFødselFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{t as FarEllerMedmorAleneomsorgFødsel,g as FarEllerMedmorFødselBeggeHarRett,F as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,k as FarEllerMedmorFødselOgMorHarIkkeRett,j as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,P as FarMedMorMedTermin1Juli2024,u as FarSøkerAdopsjonMedDeltUttak,T as MorAleneomsorgFødsel,D as MorAleneomsorgPrematurFødsel,R as MorBeggeHarRettAdopsjonEtter1Juli2024,A as MorFødselAleneomsorgMedTrillingFlerbarnsuker,m as MorFødselBeggeHarRettFødselFør1Juli2024,S as MorFødselDeltUttak,N as MorFødselDeltUttakPrematurFødsel,c as MorFødselMedTvillingFlerbarnsuker,_ as MorMedTermin1Juli2024OgFarsSøknad,O as MorSøkerAdopsjonDerFarHarRettIEOS,a as MorSøkerAdopsjonMedAleneomsorg,i as MorSøkerAdopsjonMedDeltUttak,f as MorSøkerFodselDerFarHarRettIEOS,ee as __namedExportsOrder,$ as default};
