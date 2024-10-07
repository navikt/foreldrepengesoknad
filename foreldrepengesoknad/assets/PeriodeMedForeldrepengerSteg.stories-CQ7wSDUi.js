import{j as l}from"./jsx-runtime-Cw0GR0a5.js";import{a as he}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{F as qe}from"./getStønadskontoParams-B4wLiLsb.js";import{F as we,C as k}from"./FpDataContext-BUlrLNeW.js";import{M as ze,S as Qe}from"./useFpNavigator-Sc0Lgjsf.js";import{S as e,i as We,B as n}from"./Uttaksplan-p68l6r8v.js";import{D as Ke}from"./eksisterendeSakUtils-BXdN2yQB.js";import"./Uttaksdagen-DvO4WBPg.js";import{A as Ye}from"./AxiosMock-tcBAr2bT.js";import{P as R}from"./PeriodeMedForeldrepengerSteg-5q3DsX8o.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-CtTgMZF6.js";import"./Environment-Bt0OjbDD.js";import"./barnUtils-B7TbROoD.js";import"./Label-CEor7wE8.js";import"./iframe-D6H01ci2.js";import"../sb-preview/runtime.js";import"./links-SJ-psabG.js";import"./VStack-BNla2fw4.js";import"./index-vZN_Bsf0.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BYq83q8P.js";import"./guid-CsArkN6i.js";import"./ErrorSummaryHookForm-vr-tZHCX.js";import"./stønadskontoerUtils-D4P9PlsG.js";const Ze="/rest/innsyn/v2/annenPartVedtak",$e="/rest/konto",en=()=>(...I)=>(he("button-click")(...I),Promise.resolve()),r={kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},o={kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},He={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},a={arbeidsforhold:[],mellomlagreSøknadOgNaviger:en(),avbrytSøknad:he("button-click")},yn={title:"steps/PeriodeMedForeldrepengerSteg",component:R,render:({gåTilNesteSide:I,søkersituasjon:Je,annenForelder:xe,barnet:Le,stønadskonto:Ve,annenPartVedtak:Ce,...Ge})=>{We();const Xe=y=>{y.onPost(Ze).replyOnce(200,Ce),y.onPost($e).replyOnce(200,Ve)};return l.jsx(ze,{initialEntries:[Qe.PERIODE_MED_FORELDREPENGER],children:l.jsx(Ye,{mock:Xe,children:l.jsx(qe,{children:l.jsx(we,{onDispatch:I,initialState:{[k.SØKERSITUASJON]:Je,[k.OM_BARNET]:Le,[k.ARBEIDSFORHOLD_OG_INNTEKT]:{harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[k.ANNEN_FORELDER]:xe},children:l.jsx(R,{...Ge})})})})})}},s={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2022-03-01"],antallBarn:1,termindato:"2022-03-24"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:r,80:o}}},i={args:{...s.args,annenForelder:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,erInformertOmSøknaden:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...r,kontoer:[{konto:e.Foreldrepenger,dager:200}]},80:{...o,kontoer:[{konto:e.Foreldrepenger,dager:250}]}}}},d={args:{...s.args,barnet:{type:n.UFØDT,antallBarn:1,termindato:"2022-03-24"},annenForelder:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1}}},m={args:{...d.args,barnet:{type:n.UFØDT,antallBarn:1,termindato:"2024-06-30"}}},p={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2024-06-30"],termindato:"2024-06-30"},annenForelder:{etternavn:"Pettersen",fornavn:"Hans",fnr:"02458945678",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0,erAleneOmOmsorg:!1},stønadskonto:{100:r,80:o}}},F={args:{...p.args,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2024-07-01",fødselsdatoer:["2024-07-01"]}}},t={args:{...a,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barnet:{type:n.ADOPTERT_ANNET_BARN,antallBarn:1,adopsjonsdato:"2021-03-15",adoptertIUtlandet:!1,fødselsdatoer:[]},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...r,kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}]},80:{...o,kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}]}}}},g={args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},f={args:{...g.args,søkersituasjon:{situasjon:"adopsjon",rolle:"far"}}},u={args:{...t.args,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},O={args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{fødselsdatoer:["2022-06-14"],termindato:"2022-08-14",antallBarn:1,adopsjonsdato:void 0,adoptertIUtlandet:void 0,type:n.FØDT},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}},T={args:{...t.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1}}},c={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...r,tillegg:{prematur:43,flerbarn:0}},80:{...o,tillegg:{prematur:43,flerbarn:0}}}}},S={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2021-01-11"],termindato:"2021-03-11"},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...r,kontoer:[{konto:e.Foreldrepenger,dager:273},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}},80:{...o,kontoer:[{konto:e.Foreldrepenger,dager:323},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:43,flerbarn:0}}}}},A={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:r,80:o}}},N={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:{...r,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:85}},80:{...o,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Foreldrepenger,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:105}}}}},v={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:3},annenForelder:{kanIkkeOppgis:!0},stønadskonto:{100:{...r,kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:230}},80:{...o,kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:195},{konto:e.ForeldrepengerFørFødsel,dager:15}],tillegg:{prematur:0,flerbarn:280}}}}},j={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:2},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[He],dekningsgrad:Ke.HUNDRE_PROSENT},stønadskonto:{100:r,80:o}}},D={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Helga",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},stønadskonto:{100:r,80:o}}},M={args:{...a,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barnet:{type:n.UFØDT,termindato:"2024-07-01",antallBarn:1},annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"12117212090",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},annenPartVedtak:{perioder:[He],dekningsgrad:Ke.ÅTTI_PROSENT},stønadskonto:{100:r,80:o}}};var E,P,B;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(B=(P=s.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var b,_,U;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
      '100': {
        ...STØNADSKONTO_100,
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 200
        }]
      },
      '80': {
        ...STØNADSKONTO_80,
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 250
        }]
      }
    }
  }
}`,...(U=(_=i.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var h,K,H;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(H=(K=d.parameters)==null?void 0:K.docs)==null?void 0:H.source}}};var J,x,L;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    ...FarEllerMedmorFødselBeggeHarRett.args,
    barnet: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2024-06-30'
    }
  }
}`,...(L=(x=m.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var V,C,G;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(G=(C=p.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var X,q,w;F.parameters={...F.parameters,docs:{...(X=F.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(w=(q=F.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
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
    }
  }
}`,...(W=(Q=t.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var Y,Z,$;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...($=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ne,re;f.parameters={...f.parameters,docs:{...(ee=f.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...MorSøkerAdopsjonMedDeltUttak.args,
    søkersituasjon: {
      situasjon: 'adopsjon',
      rolle: 'far'
    }
  }
}`,...(re=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var oe,ae,te;u.parameters={...u.parameters,docs:{...(oe=u.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(te=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var se,le,de;O.parameters={...O.parameters,docs:{...(se=O.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(de=(le=O.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var pe,ge,ke;T.parameters={...T.parameters,docs:{...(pe=T.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(ke=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:ke.source}}};var ie,me,Fe;c.parameters={...c.parameters,docs:{...(ie=c.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
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
    }
  }
}`,...(Fe=(me=c.parameters)==null?void 0:me.docs)==null?void 0:Fe.source}}};var fe,ue,Oe;S.parameters={...S.parameters,docs:{...(fe=S.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
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
    }
  }
}`,...(Oe=(ue=S.parameters)==null?void 0:ue.docs)==null?void 0:Oe.source}}};var Te,ce,Se;A.parameters={...A.parameters,docs:{...(Te=A.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(Se=(ce=A.parameters)==null?void 0:ce.docs)==null?void 0:Se.source}}};var Ae,Ne,ve;N.parameters={...N.parameters,docs:{...(Ae=N.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
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
    }
  }
}`,...(ve=(Ne=N.parameters)==null?void 0:Ne.docs)==null?void 0:ve.source}}};var je,De,Me;v.parameters={...v.parameters,docs:{...(je=v.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
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
    }
  }
}`,...(Me=(De=v.parameters)==null?void 0:De.docs)==null?void 0:Me.source}}};var Ie,ye,Re;j.parameters={...j.parameters,docs:{...(Ie=j.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
    },
    annenPartVedtak: {
      perioder: [uttaksperiode],
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(Re=(ye=j.parameters)==null?void 0:ye.docs)==null?void 0:Re.source}}};var Ee,Pe,Be;D.parameters={...D.parameters,docs:{...(Ee=D.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(Be=(Pe=D.parameters)==null?void 0:Pe.docs)==null?void 0:Be.source}}};var be,_e,Ue;M.parameters={...M.parameters,docs:{...(be=M.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
    },
    annenPartVedtak: {
      perioder: [uttaksperiode],
      dekningsgrad: DekningsgradDTO.ÅTTI_PROSENT
    },
    stønadskonto: {
      '100': STØNADSKONTO_100,
      '80': STØNADSKONTO_80
    }
  }
}`,...(Ue=(_e=M.parameters)==null?void 0:_e.docs)==null?void 0:Ue.source}}};const Rn=["FarEllerMedmorAleneomsorgFødsel","FarEllerMedmorFødselOgMorHarIkkeRett","FarEllerMedmorFødselBeggeHarRett","FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024","MorFødselBeggeHarRettFødselFør1Juli2024","MorBeggeHarRettAdopsjonEtter1Juli2024","MorSøkerAdopsjonMedAleneomsorg","MorSøkerAdopsjonMedDeltUttak","FarSøkerAdopsjonMedDeltUttak","MorSøkerAdopsjonDerFarHarRettIEOS","MorSøkerFodselDerFarHarRettIEOS","MorAleneomsorgFødsel","MorFødselDeltUttakPrematurFødsel","MorAleneomsorgPrematurFødsel","MorFødselDeltUttak","MorFødselMedTvillingFlerbarnsuker","MorFødselAleneomsorgMedTrillingFlerbarnsuker","FarEllerMedmorSøkerOgMorHarLagetUttaksplan","FarMedMorMedTermin1Juli2024","MorMedTermin1Juli2024OgFarsSøknad"];export{s as FarEllerMedmorAleneomsorgFødsel,d as FarEllerMedmorFødselBeggeHarRett,m as FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,i as FarEllerMedmorFødselOgMorHarIkkeRett,j as FarEllerMedmorSøkerOgMorHarLagetUttaksplan,D as FarMedMorMedTermin1Juli2024,f as FarSøkerAdopsjonMedDeltUttak,T as MorAleneomsorgFødsel,S as MorAleneomsorgPrematurFødsel,F as MorBeggeHarRettAdopsjonEtter1Juli2024,v as MorFødselAleneomsorgMedTrillingFlerbarnsuker,p as MorFødselBeggeHarRettFødselFør1Juli2024,A as MorFødselDeltUttak,c as MorFødselDeltUttakPrematurFødsel,N as MorFødselMedTvillingFlerbarnsuker,M as MorMedTermin1Juli2024OgFarsSøknad,u as MorSøkerAdopsjonDerFarHarRettIEOS,t as MorSøkerAdopsjonMedAleneomsorg,g as MorSøkerAdopsjonMedDeltUttak,O as MorSøkerFodselDerFarHarRettIEOS,Rn as __namedExportsOrder,yn as default};
