import{bo as w,bp as a,X as y,bA as e}from"./iframe-JWm6FP5D.js";import{h as r,A as h,e as n}from"./index-CL_Ikzr_.js";import{F as J,C as F}from"./FpDataContext-9-QoVLai.js";import{M as x,S as C}from"./useFpNavigator-T9bTsjAI.js";import{P as U}from"./PeriodeMedForeldrepengerSteg-Dx9EQVGX.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-B9MMHzuY.js";import"./eksisterendeSakUtils-BfzDczJX.js";import"./stønadskontoerUtils-DlytpuH5.js";const{action:_}=__STORYBOOK_MODULE_ACTIONS__,l=h.annenPartVedtak,d=h.konto,V=()=>()=>(_("button-click")(),Promise.resolve()),p={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},g={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},P={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},t={arbeidsforhold:[],mellomlagreSøknadOgNaviger:V(),avbrytSøknad:_("button-click")},ee={title:"steps/PeriodeMedForeldrepengerSteg",component:U,decorators:[w],render:({gåTilNesteSide:B,søkersituasjon:b,annenForelder:H,barnet:K,...L})=>y.jsx(x,{initialEntries:[C.PERIODE_MED_FORELDREPENGER],children:y.jsx(J,{onDispatch:B,initialState:{[F.SØKERSITUASJON]:b,[F.OM_BARNET]:K,[F.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[F.ANNEN_FORELDER]:H},children:y.jsx(U,{...L})})})},o={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0}}},u={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:250}]},100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:200}]}}))]}},args:{...o.args,annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1}}},m={parameters:o.parameters,args:{...o.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},f={parameters:m.parameters,args:{...m.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-06-30"}}},k={parameters:o.parameters,args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},T={parameters:k.parameters,args:{...k.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]}}},s={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}))]}},args:{...t,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0}}},i={parameters:s.parameters,args:{...s.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},O={parameters:i.parameters,args:{...i.args,søkersituasjon:{situasjon:"adopsjon",rolle:"far"}}},S={parameters:s.parameters,args:{...s.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},c={parameters:s.parameters,args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:a.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},A={parameters:s.parameters,args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1}}},N={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,tillegg:{prematur:43,flerbarn:0}},80:{...g,tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},j={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0}}},R={parameters:o.parameters,args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},M={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:105}}}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},v={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:280}}}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0}}},D={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[P],dekningsgrad:"HUNDRE"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},I={parameters:o.parameters,args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},E={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[P],dekningsgrad:"ÅTTI"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...t,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 250
          }]
        },
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 200
          }]
        }
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
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: FarEllerMedmorFødselBeggeHarRett.parameters,
  args: {
    ...FarEllerMedmorFødselBeggeHarRett.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-30'
    }
  }
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 230
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }]
        },
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 280
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedDeltUttak.parameters,
  args: {
    ...MorSøkerAdopsjonMedDeltUttak.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    }
  }
}`,...O.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
        },
        '80': {
          ...STØNADSKONTO_80,
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        }
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
}`,...N.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 273
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        },
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: StønadskontoType.Foreldrepenger,
            dager: 323
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 43,
            flerbarn: 0
          }
        }
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
}`,...j.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: StønadskontoType.Mødrekvote,
            dager: 75
          }, {
            konto: StønadskontoType.Fedrekvote,
            dager: 75
          }, {
            konto: StønadskontoType.Fellesperiode,
            dager: 165
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 85
          }
        },
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: StønadskontoType.Mødrekvote,
            dager: 95
          }, {
            konto: StønadskontoType.Fedrekvote,
            dager: 95
          }, {
            konto: StønadskontoType.Foreldrepenger,
            dager: 195
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 105
          }
        }
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
}`,...M.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(UTTAKSPLAN_ANNEN_URL, () => new HttpResponse(null, {
        status: 200
      })), http.post(STØNADSKONTO_URL, () => HttpResponse.json({
        '100': {
          ...STØNADSKONTO_100,
          kontoer: [{
            konto: StønadskontoType.Mødrekvote,
            dager: 75
          }, {
            konto: StønadskontoType.Fedrekvote,
            dager: 75
          }, {
            konto: StønadskontoType.Fellesperiode,
            dager: 165
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 230
          }
        },
        '80': {
          ...STØNADSKONTO_80,
          kontoer: [{
            konto: StønadskontoType.Mødrekvote,
            dager: 95
          }, {
            konto: StønadskontoType.Fedrekvote,
            dager: 95
          }, {
            konto: StønadskontoType.Fellesperiode,
            dager: 195
          }, {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15
          }],
          tillegg: {
            prematur: 0,
            flerbarn: 280
          }
        }
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
}`,...v.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};const re=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselOgMorHarIkkeRett","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorFødselBeggeHarRettFødselFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{o as FarEllerMedmorAleneomsorgFødsel,m as FarEllerMedmorFødselBeggeHarRett,f as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,u as FarEllerMedmorFødselOgMorHarIkkeRett,D as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,I as FarMedMorMedTermin1Juli2024,O as FarSøkerAdopsjonMedDeltUttak,A as MorAleneomsorgFødsel,j as MorAleneomsorgPrematurFødsel,T as MorBeggeHarRettAdopsjonEtter1Juli2024,v as MorFødselAleneomsorgMedTrillingFlerbarnsuker,k as MorFødselBeggeHarRettFødselFør1Juli2024,R as MorFødselDeltUttak,N as MorFødselDeltUttakPrematurFødsel,M as MorFødselMedTvillingFlerbarnsuker,E as MorMedTermin1Juli2024OgFarsSøknad,S as MorSøkerAdopsjonDerFarHarRettIEOS,s as MorSøkerAdopsjonMedAleneomsorg,i as MorSøkerAdopsjonMedDeltUttak,c as MorSøkerFodselDerFarHarRettIEOS,re as __namedExportsOrder,ee as default};
