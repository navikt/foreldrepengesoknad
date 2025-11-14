import{j as t}from"./iframe-D1AXJEaL.js";import{P as s,B as e,U as T}from"./UttaksplanDataContext-DlBSSHEY.js";import{P as i}from"./PeriodeListe-C2SIJCj0.js";import"./preload-helper-D9Z9MdNV.js";import"./PeriodeListeItem-BX53xH0W.js";import"./SamtidigUttakSpørsmål-D2XbPze3.js";import"./TidsperiodeSpørsmål-CC2ASZja.js";import"./validation-C5ObFUzi.js";const D=({perioder:m,barn:f,erFarEllerMedmor:E,erAleneOmOmsorg:O,handleAddPeriode:R,handleUpdatePeriode:p,handleDeletePeriode:k,handleDeletePerioder:y})=>t.jsx(T,{erFarEllerMedmor:E,barn:f,modus:"planlegger",aleneOmOmsorg:O,navnPåForeldre:{farMedmor:"Far",mor:"Mor"},valgtStønadskonto:{},erMedmorDelAvSøknaden:!0,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:!0,saksperioder:[],children:t.jsx("div",{style:{maxWidth:"704px",margin:"2rem 4rem"},children:t.jsx(i,{perioder:m,handleAddPeriode:R,handleUpdatePeriode:p,handleDeletePeriode:k,handleDeletePerioder:y})})}),U={title:"components/PeriodeListe",component:i,render:D},n={name:"Mor søker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-10",periodeHullÅrsak:s.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"4",fom:"2024-06-11",tom:"2024-06-28",kontoType:"FELLESPERIODE",forelder:"MOR",samtidigUttak:50,readOnly:!1},{id:"5",fom:"2024-07-01",tom:"2024-07-02",kontoType:"FEDREKVOTE",forelder:"MOR",readOnly:!1},{id:"6",fom:"2024-07-03",tom:"2024-07-10",kontoType:"MØDREKVOTE",forelder:"MOR",gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:20},readOnly:!1}]}},r={name:"Mor og far med samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-03",kontoType:"MØDREKVOTE",forelder:"MOR",samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-03",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",samtidigUttak:100,readOnly:!0},{id:"4",fom:"2024-05-06",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1},{id:"5",fom:"2024-06-03",tom:"2024-06-28",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",readOnly:!0},{id:"6",fom:"2024-07-01",tom:"2024-07-08",kontoType:"FELLESPERIODE",forelder:"FAR_MEDMOR",readOnly:!0}]}},a={name:"Far søker og mor har ikke rett",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!0,familiehendelsedato:"2024-05-01",erAleneOmOmsorg:!0,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-05-01",tom:"2024-08-21",kontoType:"FORELDREPENGER",forelder:"FAR_MEDMOR",readOnly:!1},{id:"2",fom:"2024-08-22",tom:"2024-08-29",kontoType:"AKTIVITETSFRI_KVOTE",forelder:"FAR_MEDMOR",readOnly:!1},{id:"2",fom:"2024-08-30",tom:"2024-09-13",periodeHullÅrsak:s.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"2",fom:"2024-09-16",tom:"2024-09-23",kontoType:"FORELDREPENGER",forelder:"FAR_MEDMOR",readOnly:!1,gradering:{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"1",type:"ORGANISASJON"}},arbeidstidprosent:80}}]}},o={name:"Mor og far med flerbarnsdager og samtidig uttak",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",kontoType:"MØDREKVOTE",forelder:"MOR",flerbarnsdager:!0,samtidigUttak:100,readOnly:!1},{id:"3",fom:"2024-04-22",tom:"2024-05-31",kontoType:"FEDREKVOTE",forelder:"FAR_MEDMOR",flerbarnsdager:!0,samtidigUttak:100,readOnly:!0}]}},l={name:"Mor har ikke lagt inn uttak første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",periodeHullÅrsak:s.PERIODE_UTEN_UTTAK,readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1}]}},d={name:"Mor er innlagt første seks uker",args:{handleAddPeriode:()=>null,handleUpdatePeriode:()=>null,handleDeletePeriode:()=>null,handleDeletePerioder:()=>null,erFarEllerMedmor:!1,familiehendelsedato:"2024-04-22",erAleneOmOmsorg:!1,barn:{type:e.FØDT,antallBarn:1,fødselsdatoer:["2023-08-19"],termindato:"2023-08-15",fnr:["19482356071"]},perioder:[{id:"1",fom:"2024-04-01",tom:"2024-04-19",kontoType:"FORELDREPENGER_FØR_FØDSEL",forelder:"MOR",readOnly:!1},{id:"2",fom:"2024-04-22",tom:"2024-05-31",utsettelseÅrsak:"SØKER_INNLAGT",forelder:"MOR",readOnly:!1},{id:"3",fom:"2024-06-03",tom:"2024-06-28",kontoType:"MØDREKVOTE",forelder:"MOR",readOnly:!1}]}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const c=["UttaksperioderMor","UttaksperioderMorOgFar","UttaksperioderFarMorIkkeRett","UttaksperioderMorOgFarFlerbarnsdager","UttaksperioderMorIkkeSøktFørsteSeksUker","UttaksperioderMorInnlagtFørsteSeksUker"];export{a as UttaksperioderFarMorIkkeRett,n as UttaksperioderMor,l as UttaksperioderMorIkkeSøktFørsteSeksUker,d as UttaksperioderMorInnlagtFørsteSeksUker,r as UttaksperioderMorOgFar,o as UttaksperioderMorOgFarFlerbarnsdager,c as __namedExportsOrder,U as default};
