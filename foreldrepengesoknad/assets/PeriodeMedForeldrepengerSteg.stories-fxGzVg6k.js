import{j as F}from"./jsx-runtime-CLpGMVip.js";import{a as Le}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{Q as Ve,a as qe}from"./index-0JiJ8puv.js";import{F as Ge,C as u}from"./FpDataContext-DWIUkGg8.js";import{M as $e,S as Xe}from"./useFpNavigator-C5KzMNH_.js";import{h as r,H as n}from"./index-B-Pz4-0B.js";import{S as e,B as a}from"./Uttaksplan-az1jpCpO.js";import"./dates-AkG-ZPn6.js";import{P as h}from"./PeriodeMedForeldrepengerSteg-Crd0LFLL.js";import"./v4-CtRu48qb.js";import"./index-DI2V0i71.js";import"./List-CllE7Dzf.js";import"./decorators-DIzpaN6C.js";import"./iframe-DZL61O0O.js";import"./VStack-CblYb0Xi.js";import"./index-Go8-pri6.js";import"./index-DNwIpxWs.js";import"./api-0fExISiV.js";import"./barnUtils-R8-8OddU.js";import"./eksisterendeSakUtils-BShFlBil.js";import"./guid-CsArkN6i.js";import"./ErrorSummaryHookForm-CH6fZO3z.js";import"./ConfirmationPanel-BsekZZI4.js";import"./stønadskontoerUtils-DW9jT6nk.js";import"./ReadMore-iJgqXu6k.js";const l=".//rest/innsyn/v2/annenPartVedtak",d=".//rest/konto",ze=()=>(...U)=>(Le("button-click")(...U),Promise.resolve()),p={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},g={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},we={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},s={arbeidsforhold:[],mellomlagreSøknadOgNaviger:ze(),avbrytSøknad:Le("button-click")},We=new Ve({defaultOptions:{queries:{retry:!1}}}),jr={title:"steps/PeriodeMedForeldrepengerSteg",component:h,render:({gåTilNesteSide:U,søkersituasjon:Je,annenForelder:xe,barnet:Ce,...Qe})=>F.jsx(qe,{client:We,children:F.jsx($e,{initialEntries:[Xe.PERIODE_MED_FORELDREPENGER],children:F.jsx(Ge,{onDispatch:U,initialState:{[u.SØKERSITUASJON]:Je,[u.OM_BARNET]:Ce,[u.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[u.ANNEN_FORELDER]:xe},children:F.jsx(h,{...Qe})})})})},o={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0}}},f={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:250}]},100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:200}]}}))]}},args:{...o.args,annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1}}},m={parameters:o.parameters,args:{...o.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},T={parameters:m.parameters,args:{...m.args,barnet:{type:a.UFØDT,antallBarn:1,termindato:"2024-06-30"}}},k={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},S={parameters:k.parameters,args:{...k.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]}}},t={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}))]}},args:{...s,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:a.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0}}},i={parameters:t.parameters,args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},O={parameters:i.parameters,args:{...i.args,søkersituasjon:{situasjon:"adopsjon",rolle:"far"}}},c={parameters:t.parameters,args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},A={parameters:t.parameters,args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:a.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},N={parameters:t.parameters,args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1}}},j={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,tillegg:{prematur:43,flerbarn:0}},80:{...g,tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},R={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...g,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0}}},M={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},v={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:105}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},D={parameters:{msw:{handlers:[r.post(l,()=>new n(null,{status:200})),r.post(d,()=>n.json({100:{...p,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...g,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:280}}}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0}}},y={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[we],dekningsgrad:"HUNDRE"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},I={parameters:o.parameters,args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},E={parameters:{msw:{handlers:[r.post(l,()=>n.json({perioder:[we],dekningsgrad:"ÅTTI"})),r.post(d,()=>n.json({80:g,100:p}))]}},args:{...s,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:a.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};var P,B,_;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(_=(B=o.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var b,H,K;f.parameters={...f.parameters,docs:{...(b=f.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(K=(H=f.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var L,w,J;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(J=(w=m.parameters)==null?void 0:w.docs)==null?void 0:J.source}}};var x,C,Q;T.parameters={...T.parameters,docs:{...(x=T.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: FarEllerMedmorFødselBeggeHarRett.parameters,
  args: {
    ...FarEllerMedmorFødselBeggeHarRett.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-30'
    }
  }
}`,...(Q=(C=T.parameters)==null?void 0:C.docs)==null?void 0:Q.source}}};var V,q,G;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(G=(q=k.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var $,X,z;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(z=(X=S.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var W,Y,Z;t.parameters={...t.parameters,docs:{...(W=t.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(ne=(re=i.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ae,te,se;O.parameters={...O.parameters,docs:{...(ae=O.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  parameters: MorSøkerAdopsjonMedDeltUttak.parameters,
  args: {
    ...MorSøkerAdopsjonMedDeltUttak.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    }
  }
}`,...(se=(te=O.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var oe,le,de;c.parameters={...c.parameters,docs:{...(oe=c.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(de=(le=c.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var pe,ge,me;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(me=(ge=A.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var ke,ie,Fe;N.parameters={...N.parameters,docs:{...(ke=N.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Fe=(ie=N.parameters)==null?void 0:ie.docs)==null?void 0:Fe.source}}};var ue,fe,Te;j.parameters={...j.parameters,docs:{...(ue=j.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(Te=(fe=j.parameters)==null?void 0:fe.docs)==null?void 0:Te.source}}};var Se,Oe,ce;R.parameters={...R.parameters,docs:{...(Se=R.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(ce=(Oe=R.parameters)==null?void 0:Oe.docs)==null?void 0:ce.source}}};var Ae,Ne,je;M.parameters={...M.parameters,docs:{...(Ae=M.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(je=(Ne=M.parameters)==null?void 0:Ne.docs)==null?void 0:je.source}}};var Re,Me,ve;v.parameters={...v.parameters,docs:{...(Re=v.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(ve=(Me=v.parameters)==null?void 0:Me.docs)==null?void 0:ve.source}}};var De,ye,Ie;D.parameters={...D.parameters,docs:{...(De=D.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(Ie=(ye=D.parameters)==null?void 0:ye.docs)==null?void 0:Ie.source}}};var Ee,Ue,he;y.parameters={...y.parameters,docs:{...(Ee=y.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(he=(Ue=y.parameters)==null?void 0:Ue.docs)==null?void 0:he.source}}};var Pe,Be,_e;I.parameters={...I.parameters,docs:{...(Pe=I.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(_e=(Be=I.parameters)==null?void 0:Be.docs)==null?void 0:_e.source}}};var be,He,Ke;E.parameters={...E.parameters,docs:{...(be=E.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(Ke=(He=E.parameters)==null?void 0:He.docs)==null?void 0:Ke.source}}};const Rr=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselOgMorHarIkkeRett","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorFødselBeggeHarRettFødselFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{o as FarEllerMedmorAleneomsorgFødsel,m as FarEllerMedmorFødselBeggeHarRett,T as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,f as FarEllerMedmorFødselOgMorHarIkkeRett,y as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,I as FarMedMorMedTermin1Juli2024,O as FarSøkerAdopsjonMedDeltUttak,N as MorAleneomsorgFødsel,R as MorAleneomsorgPrematurFødsel,S as MorBeggeHarRettAdopsjonEtter1Juli2024,D as MorFødselAleneomsorgMedTrillingFlerbarnsuker,k as MorFødselBeggeHarRettFødselFør1Juli2024,M as MorFødselDeltUttak,j as MorFødselDeltUttakPrematurFødsel,v as MorFødselMedTvillingFlerbarnsuker,E as MorMedTermin1Juli2024OgFarsSøknad,c as MorSøkerAdopsjonDerFarHarRettIEOS,t as MorSøkerAdopsjonMedAleneomsorg,i as MorSøkerAdopsjonMedDeltUttak,A as MorSøkerFodselDerFarHarRettIEOS,Rr as __namedExportsOrder,jr as default};
