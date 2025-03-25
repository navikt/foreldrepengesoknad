import{j as m}from"./jsx-runtime-CLpGMVip.js";import{B as n,S as r,F as e,a as f,U as R,d as L,b as G,c as o}from"./PeriodeListeItem-g0iNvDZJ.js";import{A}from"./ArbeidsgiverInfoType-An3cd7W6.js";import{P as I}from"./PeriodeListe-lIqw41r_.js";import"./index-CR__hKHy.js";import"./index-DVv2q3CG.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";const J=({perioder:B,familiehendelsedato:_,barn:N,erFarEllerMedmor:x,handleUpdatePeriode:H,handleDeletePeriode:K,handleDeletePerioder:j})=>m.jsx(G,{initialState:{[o.ER_FAR_ELLER_MEDMOR]:x,[o.FAMILIEHENDELSEDATO]:_,[o.BARN]:N,[o.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:m.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:m.jsx(I,{perioder:B,handleUpdatePeriode:H,handleDeletePeriode:K,handleDeletePerioder:j})})}),X={title:"components/PeriodeListe",component:I,render:J},d={name:"Mor søker",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:r.Fellesperiode,forelder:e.mor,samtidigUttak:50,readOnly:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:r.Fedrekvote,forelder:e.mor,readOnly:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:r.Mødrekvote,forelder:e.mor,gradering:{aktivitet:{type:R.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:A.ORGANISASJON}},arbeidstidprosent:20},readOnly:!1}]}},a={name:"Mor og far med samtidig uttak",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Mødrekvote,forelder:e.mor,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:100,readOnly:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Fedrekvote,forelder:e.farMedmor,readOnly:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:r.Fellesperiode,forelder:e.farMedmor,readOnly:!0}]}},t={name:"Far søker og mor har ikke rett",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:r.Foreldrepenger,forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:r.AktivitetsfriKvote,forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:r.Foreldrepenger,forelder:e.farMedmor,readOnly:!1,gradering:{aktivitet:{type:R.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:A.ORGANISASJON}},arbeidstidprosent:80}}]}},l={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Fedrekvote,forelder:e.farMedmor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!0}]}},s={name:"Mor har ikke lagt inn uttak første seks uker",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1}]}},i={name:"Mor er innlagt første seks uker",args:{handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:L.InstitusjonSøker,forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1}]}};var p,k,y;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-10',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      readOnly: false
    }, {
      id: '4',
      fom: '2024-06-11',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.mor,
      samtidigUttak: 50,
      readOnly: false
    }, {
      id: '5',
      fom: '2024-07-01',
      tom: '2024-07-02',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.mor,
      readOnly: false
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
      readOnly: false
    }]
  }
}`,...(y=(k=d.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var T,F,u;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      samtidigUttak: 100,
      readOnly: true
    }, {
      id: '4',
      fom: '2024-05-06',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '5',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      readOnly: true
    }, {
      id: '6',
      fom: '2024-07-01',
      tom: '2024-07-08',
      kontoType: StønadskontoType.Fellesperiode,
      forelder: Forelder.farMedmor,
      readOnly: true
    }]
  }
}`,...(u=(F=a.parameters)==null?void 0:F.docs)==null?void 0:u.source}}};var g,O,M;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-08-22',
      tom: '2024-08-29',
      kontoType: StønadskontoType.AktivitetsfriKvote,
      forelder: Forelder.farMedmor,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-08-30',
      tom: '2024-09-13',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-09-16',
      tom: '2024-09-23',
      kontoType: StønadskontoType.Foreldrepenger,
      forelder: Forelder.farMedmor,
      readOnly: false,
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
}`,...(M=(O=t.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var U,D,h;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: StønadskontoType.Fedrekvote,
      forelder: Forelder.farMedmor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: true
    }]
  }
}`,...(h=(D=l.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var S,E,c;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      readOnly: false
    }]
  }
}`,...(c=(E=s.parameters)==null?void 0:E.docs)==null?void 0:c.source}}};var P,v,b;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
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
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonSøker,
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: StønadskontoType.Mødrekvote,
      forelder: Forelder.mor,
      readOnly: false
    }]
  }
}`,...(b=(v=i.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const Z=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{t as UttaksperioderFarMorIkkeRett,d as UttaksperioderMor,s as UttaksperioderMorIkkeSøktFørsteSeksUker,i as UttaksperioderMorInnlagtFørsteSeksUker,a as UttaksperioderMorOgFar,l as UttaksperioderMorOgFarFlerbarnsdager,Z as __namedExportsOrder,X as default};
