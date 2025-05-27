import{j as U}from"./jsx-runtime-D_zvdyIk.js";import{a as Le}from"./index-B-lxVbXh.js";import{F as Ge,C as F}from"./FpDataContext-DSKr2VRc.js";import{M as $e,S as Qe}from"./useFpNavigator-BqNtlF3s.js";import{h as r,H as n}from"./index-D5WPyhm7.js";import{B as a,S as e}from"./Uttaksplan-DE7xS6a_.js";import"./dates-iBrNYYBq.js";import{w as Xe}from"./withQueryClient-BSpHrL6p.js";import{P as h}from"./PeriodeMedForeldrepengerSteg-BoRUAFbO.js";import"./v4-CtRu48qb.js";import"./index-75N07mRN.js";import"./index-BLIM7tmH.js";import"./decorators-Bnaor6Ku.js";import"./iframe-DjtxLnCN.js";import"./VStack-DI-xS76s.js";import"./index-M7yiXcen.js";import"./index-Bj-N6E0A.js";import"./QueryClientProvider-oIIDkkVB.js";import"./index-CQXckJez.js";import"./api-MhUetn1V.js";import"./getStønadskontoParams-CRGwCGSU.js";import"./barnUtils-feK3xKrp.js";import"./eksisterendeSakUtils-BQoYkH_Q.js";import"./guid-CsArkN6i.js";import"./ErrorSummaryHookForm-Cb8xLvqA.js";import"./stønadskontoerUtils-BTWEHsKb.js";const l=".//rest/innsyn/v2/annenPartVedtak",d=".//rest/konto",qe=()=>(...E)=>(Le("button-click")(...E),Promise.resolve()),p={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},g={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},we={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},s={arbeidsforhold:[],mellomlagreSøknadOgNaviger:qe(),avbrytSøknad:Le("button-click")},Nr={title:"steps/PeriodeMedForeldrepengerSteg",component:h,decorators:[Xe],render:({gåTilNesteSide:E,søkersituasjon:Je,annenForelder:xe,barnet:Ce,...Ve})=>U.jsx($e,{initialEntries:[Qe.PERIODE_MED_FORELDREPENGER],children:U.jsx(Ge,{onDispatch:E,initialState:{[F.SØKERSITUASJON]:Je,[F.OM_BARNET]:Ce,[F.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[F.ANNEN_FORELDER]:xe},children:U.jsx(h,{...Ve})})})},o={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0}}},u={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:250}]},100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:200}]}}))]}},args:{...o.args,annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1}}},m={parameters:o.parameters,args:{...o.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},f={parameters:m.parameters,args:{...m.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-06-30"}}},k={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},T={parameters:k.parameters,args:{...k.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]}}},t={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}))]}},args:{...s,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0}}},i={parameters:t.parameters,args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},S={parameters:i.parameters,args:{...i.args,søkersituasjon:{situasjon:"adopsjon",rolle:"far"}}},O={parameters:t.parameters,args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},c={parameters:t.parameters,args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:a.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},A={parameters:t.parameters,args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1}}},N={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,tillegg:{prematur:43,flerbarn:0}},80:{...g,tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},j={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0}}},R={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},M={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:105}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},v={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:280}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0}}},D={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[we],dekningsgrad:"HUNDRE"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},I={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},y={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[we],dekningsgrad:"ÅTTI"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};var P,B,_;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(_=(B=o.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var b,H,K;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(K=(H=u.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var L,w,J;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(J=(w=m.parameters)==null?void 0:w.docs)==null?void 0:J.source}}};var x,C,V;f.parameters={...f.parameters,docs:{...(x=f.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: FarEllerMedmorFødselBeggeHarRett.parameters,
  args: {
    ...FarEllerMedmorFødselBeggeHarRett.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-30'
    }
  }
}`,...(V=(C=f.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var G,$,Q;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(Q=($=k.parameters)==null?void 0:$.docs)==null?void 0:Q.source}}};var X,q,z;T.parameters={...T.parameters,docs:{...(X=T.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(z=(q=T.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var W,Y,Z;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Z=(Y=t.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,re,ne;i.parameters={...i.parameters,docs:{...(ee=i.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ne=(re=i.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ae,te,se;S.parameters={...S.parameters,docs:{...(ae=S.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedDeltUttak.parameters,
  args: {
    ...MorSøkerAdopsjonMedDeltUttak.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    }
  }
}`,...(se=(te=S.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var oe,le,de;O.parameters={...O.parameters,docs:{...(oe=O.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(de=(le=O.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var pe,ge,me;c.parameters={...c.parameters,docs:{...(pe=c.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
      // @ts-ignore FIX
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
}`,...(me=(ge=c.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var ke,ie,Fe;A.parameters={...A.parameters,docs:{...(ke=A.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Fe=(ie=A.parameters)==null?void 0:ie.docs)==null?void 0:Fe.source}}};var ue,fe,Te;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(Te=(fe=N.parameters)==null?void 0:fe.docs)==null?void 0:Te.source}}};var Se,Oe,ce;j.parameters={...j.parameters,docs:{...(Se=j.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(ce=(Oe=j.parameters)==null?void 0:Oe.docs)==null?void 0:ce.source}}};var Ae,Ne,je;R.parameters={...R.parameters,docs:{...(Ae=R.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(je=(Ne=R.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Re,Me,ve;M.parameters={...M.parameters,docs:{...(Re=M.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(ve=(Me=M.parameters)==null?void 0:Me.docs)==null?void 0:ve.source}}};var De,Ie,ye;v.parameters={...v.parameters,docs:{...(De=v.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(ye=(Ie=v.parameters)==null?void 0:Ie.docs)==null?void 0:ye.source}}};var Ee,Ue,he;D.parameters={...D.parameters,docs:{...(Ee=D.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(he=(Ue=D.parameters)==null?void 0:Ue.docs)==null?void 0:he.source}}};var Pe,Be,_e;I.parameters={...I.parameters,docs:{...(Pe=I.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(_e=(Be=I.parameters)==null?void 0:Be.docs)==null?void 0:_e.source}}};var be,He,Ke;y.parameters={...y.parameters,docs:{...(be=y.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(Ke=(He=y.parameters)==null?void 0:He.docs)==null?void 0:Ke.source}}};const jr=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselOgMorHarIkkeRett","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorFødselBeggeHarRettFødselFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{o as FarEllerMedmorAleneomsorgFødsel,m as FarEllerMedmorFødselBeggeHarRett,f as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,u as FarEllerMedmorFødselOgMorHarIkkeRett,D as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,I as FarMedMorMedTermin1Juli2024,S as FarSøkerAdopsjonMedDeltUttak,A as MorAleneomsorgFødsel,j as MorAleneomsorgPrematurFødsel,T as MorBeggeHarRettAdopsjonEtter1Juli2024,v as MorFødselAleneomsorgMedTrillingFlerbarnsuker,k as MorFødselBeggeHarRettFødselFør1Juli2024,R as MorFødselDeltUttak,N as MorFødselDeltUttakPrematurFødsel,M as MorFødselMedTvillingFlerbarnsuker,y as MorMedTermin1Juli2024OgFarsSøknad,O as MorSøkerAdopsjonDerFarHarRettIEOS,t as MorSøkerAdopsjonMedAleneomsorg,i as MorSøkerAdopsjonMedDeltUttak,c as MorSøkerFodselDerFarHarRettIEOS,jr as __namedExportsOrder,Nr as default};
