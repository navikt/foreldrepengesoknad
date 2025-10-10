import{j as m}from"./iframe-Dv6HQNCo.js";import{F as e}from"./Forelder-NrmuaHZ4.js";import{B as o}from"./PeriodeListeItem-BuzDJMBw.js";import{S as r,g as f,U as p,a as A,b as S,c as n}from"./TidsperiodeSpørsmål-C_LWNAqe.js";import{A as k}from"./ArbeidsgiverInfoType-An3cd7W6.js";import{P as y}from"./PeriodeListe-C0ZSR7A-.js";import"./preload-helper-D9Z9MdNV.js";const D=({perioder:T,familiehendelsedato:F,barn:u,erFarEllerMedmor:O,erAleneOmOmsorg:g,handleAddPeriode:M,handleUpdatePeriode:h,handleDeletePeriode:P,handleDeletePerioder:U})=>m.jsx(S,{initialState:{[n.ER_FAR_ELLER_MEDMOR]:O,[n.FAMILIEHENDELSEDATO]:F,[n.BARN]:u,[n.FAMILIESITUASJON]:"fødsel",[n.MODUS]:"planlegger",[n.ALENE_OM_OMSORG]:g,[n.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:m.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:m.jsx(y,{perioder:T,handleAddPeriode:M,handleUpdatePeriode:h,handleDeletePeriode:P,handleDeletePerioder:U})})}),B={title:"components/PeriodeListe",component:y,render:D},d={name:"Mor søker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:r.Fellesperiode,forelder:e.mor,samtidigUttak:50,readOnly:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:r.Fedrekvote,forelder:e.mor,readOnly:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:r.Mødrekvote,forelder:e.mor,gradering:{aktivitet:{type:p.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:k.ORGANISASJON}},arbeidstidprosent:20},readOnly:!1}]}},a={name:"Mor og far med samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Mødrekvote,forelder:e.mor,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:r.Fedrekvote,forelder:e.farMedmor,samtidigUttak:100,readOnly:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Fedrekvote,forelder:e.farMedmor,readOnly:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:r.Fellesperiode,forelder:e.farMedmor,readOnly:!0}]}},l={name:"Far søker og mor har ikke rett",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",erAleneOmOmsorg:!0,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:r.Foreldrepenger,forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:r.AktivitetsfriKvote,forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:r.Foreldrepenger,forelder:e.farMedmor,readOnly:!1,gradering:{aktivitet:{type:p.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:k.ORGANISASJON}},arbeidstidprosent:80}}]}},t={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Mødrekvote,forelder:e.mor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:r.Fedrekvote,forelder:e.farMedmor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!0}]}},s={name:"Mor har ikke lagt inn uttak første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:f.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1}]}},i={name:"Mor er innlagt første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:o.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:r.ForeldrepengerFørFødsel,forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:A.InstitusjonSøker,forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:r.Mødrekvote,forelder:e.mor,readOnly:!1}]}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Mor søker',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    erAleneOmOmsorg: false,
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
}`,...d.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far med samtidig uttak',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    erAleneOmOmsorg: false,
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
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Far søker og mor har ikke rett',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: true,
    familiehendelsedato: '2024-05-01',
    erAleneOmOmsorg: true,
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
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far med flerbarnsdager og samtidig uttak',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    erAleneOmOmsorg: false,
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
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Mor har ikke lagt inn uttak første seks uker',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    erAleneOmOmsorg: false,
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Mor er innlagt første seks uker',
  args: {
    handleAddPeriode: () => null,
    handleUpdatePeriode: () => null,
    handleDeletePeriode: () => null,
    handleDeletePerioder: () => null,
    erFarEllerMedmor: false,
    familiehendelsedato: '2024-04-22',
    erAleneOmOmsorg: false,
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
}`,...i.parameters?.docs?.source}}};const N=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{l as UttaksperioderFarMorIkkeRett,d as UttaksperioderMor,s as UttaksperioderMorIkkeSøktFørsteSeksUker,i as UttaksperioderMorInnlagtFørsteSeksUker,a as UttaksperioderMorOgFar,t as UttaksperioderMorOgFarFlerbarnsdager,N as __namedExportsOrder,B as default};
