import{j as i}from"./jsx-runtime-DEdD30eg.js";import{B as n,S as r,F as e,a as f,c as x,U as H,b as o}from"./PeriodeListeItem-CKtDdi4R.js";import{U as D,A as I}from"./UttakArbeidType-QEIA8E0B.js";import{P as O}from"./PeriodeListe-DMlLXfi8.js";import"./index-RYns6xqu.js";import"./_getTag-D1s5wLXX.js";import"./index-BGsHwagi.js";const K=({perioder:B,familiehendelsedato:_,barn:N,erFarEllerMedmor:h})=>i.jsx(H,{initialState:{[o.ER_FAR_ELLER_MEDMOR]:h,[o.FAMILIEHENDELSEDATO]:_,[o.BARN]:N,[o.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:i.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:i.jsx(O,{perioder:B})})}),q={title:"components/PeriodeListe",component:O,render:K},t={name:"Mor søker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:r.Fellesperiode,forelder:e.mor,samtidigUttak:50,gjelderAnnenPart:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:r.Fedrekvote,forelder:e.mor,gjelderAnnenPart:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:r.Mødrekvote,forelder:e.mor,gradering:{aktivitet:{type:D.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:I.ORGANISASJON}},arbeidstidprosent:20},gjelderAnnenPart:!1}]}},a={name:"Mor og far med samtidig uttak",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Mødrekvote,forelder:e.mor,samtidigUttak:100,gjelderAnnenPart:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:100,gjelderAnnenPart:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,gjelderAnnenPart:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Fedrekvote,forelder:e.farMedmor,gjelderAnnenPart:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:r.Fellesperiode,forelder:e.farMedmor,gjelderAnnenPart:!0}]}},d={name:"Far søker og mor har ikke rett",args:{erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:r.Foreldrepenger,forelder:e.farMedmor,gjelderAnnenPart:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:r.AktivitetsfriKvote,forelder:e.farMedmor,gjelderAnnenPart:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:r.Foreldrepenger,forelder:e.farMedmor,gjelderAnnenPart:!1,gradering:{aktivitet:{type:D.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:I.ORGANISASJON}},arbeidstidprosent:80}}]}},l={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,flerbarnsdager:!0,samtidigUttak:100,gjelderAnnenPart:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Fedrekvote,forelder:e.farMedmor,flerbarnsdager:!0,samtidigUttak:100,gjelderAnnenPart:!0}]}},s={name:"Mor har ikke lagt inn uttak første seks uker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,gjelderAnnenPart:!1}]}},m={name:"Mor er innlagt første seks uker",args:{erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,gjelderAnnenPart:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:x.InstitusjonSøker,forelder:e.mor,gjelderAnnenPart:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,gjelderAnnenPart:!1}]}};var p,k,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-10',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '4',
      fom: '2024-06-11',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      samtidigUttak: 50,
      gjelderAnnenPart: false
    }, {
      id: '5',
      fom: '2024-07-01',
      tom: '2024-07-02',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '6',
      fom: '2024-07-03',
      tom: '2024-07-10',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gradering: {
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID,
          arbeidsgiver: {
            id: '1',
            navn: 'TESTY TEST',
            type: ArbeidsgiverInfoType.ORGANISASJON
          }
        },
        arbeidstidprosent: 20
      },
      gjelderAnnenPart: false
    }]
  }
}`,...(g=(k=t.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};var T,F,y;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttak: 100,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttak: 100,
      gjelderAnnenPart: true
    }, {
      id: '4',
      fom: '2024-05-06',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '5',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: true
    }, {
      id: '6',
      fom: '2024-07-01',
      tom: '2024-07-08',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: true
    }]
  }
}`,...(y=(F=a.parameters)==null?void 0:F.docs)==null?void 0:y.source}}};var A,M,P;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-05-01',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-05-01',
      tom: '2024-08-21',
      kontoType: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-08-22',
      tom: '2024-08-29',
      kontoType: StønadskontoType.AktivitetsfriKvote,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-08-30',
      tom: '2024-09-13',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-09-16',
      tom: '2024-09-23',
      kontoType: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      gjelderAnnenPart: false,
      gradering: {
        aktivitet: {
          type: UttakArbeidType.ORDINÆRT_ARBEID,
          arbeidsgiver: {
            id: '1',
            navn: 'TESTY TEST',
            type: ArbeidsgiverInfoType.ORGANISASJON
          }
        },
        arbeidstidprosent: 80
      }
    }]
  }
}`,...(P=(M=d.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var u,j,S;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      gjelderAnnenPart: true
    }]
  }
}`,...(S=(j=l.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var E,c,U;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }]
  }
}`,...(U=(c=s.parameters)==null?void 0:c.docs)==null?void 0:U.source}}};var v,b,R;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    barn: {
      type: BarnType.FØDT,
      antallBarn: 1,
      fødselsdatoer: ['2023-08-19'],
      termindato: '2023-08-15',
      fnr: ['19482356071']
    },
    perioder: [{
      id: '1',
      fom: '2024-04-01',
      tom: '2024-04-19',
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      gjelderAnnenPart: false
    }]
  }
}`,...(R=(b=m.parameters)==null?void 0:b.docs)==null?void 0:R.source}}};const w=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{d as UttaksperioderFarMorIkkeRett,t as UttaksperioderMor,s as UttaksperioderMorIkkeSøktFørsteSeksUker,m as UttaksperioderMorInnlagtFørsteSeksUker,a as UttaksperioderMorOgFar,l as UttaksperioderMorOgFarFlerbarnsdager,w as __namedExportsOrder,q as default};
