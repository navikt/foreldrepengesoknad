import{j as s}from"./iframe-BUH9yzXu.js";import{B as n}from"./PeriodeListeItem-l_Rd21b2.js";import{c as i,U as M,a as e}from"./TidsperiodeSpørsmål-BGsR7cmH.js";import{P as m}from"./PeriodeListe-bCcLuNHB.js";import"./preload-helper-D9Z9MdNV.js";const u=({perioder:f,familiehendelsedato:E,barn:O,erFarEllerMedmor:R,erAleneOmOmsorg:p,handleAddPeriode:y,handleUpdatePeriode:k,handleDeletePeriode:T,handleDeletePerioder:D})=>s.jsx(M,{initialState:{[e.ER_FAR_ELLER_MEDMOR]:R,[e.FAMILIEHENDELSEDATO]:E,[e.BARN]:O,[e.FAMILIESITUASJON]:"fødsel",[e.MODUS]:"planlegger",[e.ALENE_OM_OMSORG]:p,[e.NAVN_PÅ_FORELDRE]:{farMedmor:"Far",mor:"Mor"}},children:s.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:s.jsx(m,{perioder:f,handleAddPeriode:y,handleUpdatePeriode:k,handleDeletePeriode:T,handleDeletePerioder:D})})}),_={title:"components/PeriodeListe",component:m,render:u},r={name:"Mor søker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:"FELLESPERIODE",forelder:"MOR",samtidigUttak:50,readOnly:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:"FEDREKVOTE",forelder:"MOR",readOnly:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:"MØDREKVOTE",forelder:"MOR",gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:20},readOnly:!1}]}},a={name:"Mor og far med samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:"MØDREKVOTE",forelder:"MOR",samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",samtidigUttak:100,readOnly:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",readOnly:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:"FELLESPERIODE",forelder:"FAR_MEDMOR",readOnly:!0}]}},o={name:"Far søker og mor har ikke rett",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",erAleneOmOmsorg:!0,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:"FORELDREPENGER",forelder:"FAR_MEDMOR",readOnly:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:"AKTIVITETSFRI_KVOTE",forelder:"FAR_MEDMOR",readOnly:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:"FORELDREPENGER",forelder:"FAR_MEDMOR",readOnly:!1,gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:80}}]}},l={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",flerbarnsdager:!0,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",flerbarnsdager:!0,samtidigUttak:100,readOnly:!0}]}},d={name:"Mor har ikke lagt inn uttak første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:i.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1}]}},t={name:"Mor er innlagt første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:n.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:"SØKER_INNLAGT",forelder:"MOR",readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
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
      forelder: 'MOR',
      samtidigUttak: 50,
      readOnly: false
    }, {
      id: '5',
      fom: '2024-07-01',
      tom: '2024-07-02',
      kontoType: 'FEDREKVOTE',
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '6',
      fom: '2024-07-03',
      tom: '2024-07-10',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      gradering: {
        aktivitet: {
          type: 'ORDINÆRT_ARBEID',
          arbeidsgiver: {
            id: '1',
            type: 'ORGANISASJON'
          }
        },
        arbeidstidprosent: 20
      },
      readOnly: false
    }]
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-03',
      kontoType: 'FEDREKVOTE',
      forelder: 'FAR_MEDMOR',
      samtidigUttak: 100,
      readOnly: true
    }, {
      id: '4',
      fom: '2024-05-06',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '5',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: 'FEDREKVOTE',
      forelder: 'FAR_MEDMOR',
      readOnly: true
    }, {
      id: '6',
      fom: '2024-07-01',
      tom: '2024-07-08',
      kontoType: 'FELLESPERIODE',
      forelder: 'FAR_MEDMOR',
      readOnly: true
    }]
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
      forelder: 'FAR_MEDMOR',
      readOnly: false
    }, {
      id: '2',
      fom: '2024-08-22',
      tom: '2024-08-29',
      kontoType: 'AKTIVITETSFRI_KVOTE',
      forelder: 'FAR_MEDMOR',
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
      forelder: 'FAR_MEDMOR',
      readOnly: false,
      gradering: {
        aktivitet: {
          type: 'ORDINÆRT_ARBEID',
          arbeidsgiver: {
            id: '1',
            type: 'ORGANISASJON'
          }
        },
        arbeidstidprosent: 80
      }
    }]
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: false
    }, {
      id: '3',
      fom: '2024-04-22',
      tom: '2024-05-31',
      kontoType: 'FEDREKVOTE',
      forelder: 'FAR_MEDMOR',
      flerbarnsdager: true,
      samtidigUttak: 100,
      readOnly: true
    }]
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
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
      forelder: 'MOR',
      readOnly: false
    }]
  }
}`,...d.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '2',
      fom: '2024-04-22',
      tom: '2024-05-31',
      utsettelseÅrsak: 'SØKER_INNLAGT',
      forelder: 'MOR',
      readOnly: false
    }, {
      id: '3',
      fom: '2024-06-03',
      tom: '2024-06-28',
      kontoType: 'MØDREKVOTE',
      forelder: 'MOR',
      readOnly: false
    }]
  }
}`,...t.parameters?.docs?.source}}};const U=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{o as UttaksperioderFarMorIkkeRett,r as UttaksperioderMor,d as UttaksperioderMorIkkeSøktFørsteSeksUker,t as UttaksperioderMorInnlagtFørsteSeksUker,a as UttaksperioderMorOgFar,l as UttaksperioderMorOgFarFlerbarnsdager,U as __namedExportsOrder,_ as default};
