import{j as m}from"./iframe-BxvTwi8Q.js";import{F as e}from"./Forelder-NrmuaHZ4.js";import{B as n}from"./PeriodeListeItem-CQofp9OK.js";import{A as f}from"./ArbeidsgiverInfoType-An3cd7W6.js";import{e as i,U as E,a as P,b as M,c as r}from"./TidsperiodeSpørsmål-B1ktsnJl.js";import{P as p}from"./PeriodeListe-C_7OeFNd.js";import"./preload-helper-D9Z9MdNV.js";const h=({perioder:O,familiehendelsedato:T,barn:y,erFarEllerMedmor:k,erAleneOmOmsorg:F,handleAddPeriode:R,handleUpdatePeriode:u,handleDeletePeriode:D,handleDeletePerioder:g})=>m.jsx(M,{initialState:{[r.ER_FAR_ELLER_MEDMOR]:k,[r.FAMILIEHENDELSEDATO]:T,[r.BARN]:y,[r.FAMILIESITUASJON]:"fødsel",[r.MODUS]:"planlegger",[r.ALENE_OM_OMSORG]:F,[r.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:m.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:m.jsx(p,{perioder:O,handleAddPeriode:R,handleUpdatePeriode:u,handleDeletePeriode:D,handleDeletePerioder:g})})}),N={title:"components/PeriodeListe",component:p,render:h},o={name:"Mor søker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:"FELLESPERIODE",forelder:e.mor,samtidigUttak:50,readOnly:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:"FEDREKVOTE",forelder:e.mor,readOnly:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:"MØDREKVOTE",forelder:e.mor,gradering:{aktivitet:{type:E.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:f.ORGANISASJON}},arbeidstidprosent:20},readOnly:!1}]}},a={name:"Mor og far med samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:"MØDREKVOTE",forelder:e.mor,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:"FEDREKVOTE",forelder:e.farMedmor,samtidigUttak:100,readOnly:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:e.mor,readOnly:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:"FEDREKVOTE",forelder:e.farMedmor,readOnly:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:"FELLESPERIODE",forelder:e.farMedmor,readOnly:!0}]}},d={name:"Far søker og mor har ikke rett",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",erAleneOmOmsorg:!0,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:"FORELDREPENGER",forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:"AKTIVITETSFRI_KVOTE",forelder:e.farMedmor,readOnly:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:"FORELDREPENGER",forelder:e.farMedmor,readOnly:!1,gradering:{aktivitet:{type:E.ORDINÆRT_ARBEID,arbeidsgiver:{id:"1",navn:"TESTY TEST",type:f.ORGANISASJON}},arbeidstidprosent:80}}]}},l={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:e.mor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:"FEDREKVOTE",forelder:e.farMedmor,flerbarnsdager:!0,samtidigUttak:100,readOnly:!0}]}},t={name:"Mor har ikke lagt inn uttak første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:e.mor,readOnly:!1}]}},s={name:"Mor er innlagt første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:e.mor,readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:P.InstitusjonSøker,forelder:e.mor,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:e.mor,readOnly:!1}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
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
      kontoType: 'FELLESPERIODE',
      forelder: Forelder.mor,
      samtidigUttak: 50,
      readOnly: false
    }, {
      id: '5',
      fom: '2024-07-01',
      tom: '2024-07-02',
      kontoType: 'FEDREKVOTE',
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '6',
      fom: '2024-07-03',
      tom: '2024-07-10',
      kontoType: 'MØDREKVOTE',
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: 'FEDREKVOTE',
      forelder: Forelder.farMedmor,
      samtidigUttak: 100,
      readOnly: true
    }, {
      id: '4',
      fom: '2024-05-06',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '5',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: 'FEDREKVOTE',
      forelder: Forelder.farMedmor,
      readOnly: true
    }, {
      id: '6',
      fom: '2024-07-01',
      tom: '2024-07-08',
      kontoType: 'FELLESPERIODE',
      forelder: Forelder.farMedmor,
      readOnly: true
    }]
  }
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER',
      forelder: Forelder.farMedmor,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-08-22',
      tom: '2024-08-29',
      kontoType: 'AKTIVITETSFRI_KVOTE',
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
      kontoType: 'FORELDREPENGER',
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
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      forelder: Forelder.mor,
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'FEDREKVOTE',
      forelder: Forelder.farMedmor,
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: true
    }]
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
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
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      readOnly: false
    }]
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
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
      kontoType: 'MØDREKVOTE',
      forelder: Forelder.mor,
      readOnly: false
    }]
  }
}`,...s.parameters?.docs?.source}}};const b=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{d as UttaksperioderFarMorIkkeRett,o as UttaksperioderMor,t as UttaksperioderMorIkkeSøktFørsteSeksUker,s as UttaksperioderMorInnlagtFørsteSeksUker,a as UttaksperioderMorOgFar,l as UttaksperioderMorOgFarFlerbarnsdager,b as __namedExportsOrder,N as default};
