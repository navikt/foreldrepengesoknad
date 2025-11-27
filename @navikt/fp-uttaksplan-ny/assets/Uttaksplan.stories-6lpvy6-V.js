import{r as m,j as t}from"./iframe-CmTPBrVT.js";import{B as p,U as R}from"./UttaksplanDataContext-D-vUx0uq.js";import{U as s}from"./Uttaksplan-B0I7UZxy.js";import{U as k}from"./useUttaksplanBuilder-CK0XoDTn.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-CHeHGiqU.js";import"./dateTomValidators-BKJvcUGA.js";import"./TidsperiodeSpørsmål-CHKaUyYs.js";import"./PeriodeListe-D-5lrfi0.js";import"./PeriodeListeItem-LFd6_Wqm.js";import"./validation-Bxd0P2Oz.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,O={farRundtFødsel:10,toTette:0},_={component:s,args:{children:null,erMedmorDelAvSøknaden:!1,modus:"planlegger",harAktivitetskravIPeriodeUtenUttak:!1,oppdaterUttaksplan:f("button-click")},render:r=>{const[l,E]=m.useState(r.saksperioder),d=a=>{E(a),r.oppdaterUttaksplan&&r.oppdaterUttaksplan(a)};return t.jsx(R,{...r,saksperioder:l??[],children:t.jsx(k,{oppdaterUttaksplan:d,children:t.jsx(s,{})})})}},e={args:{erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:p.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},saksperioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}],bareFarMedmorHarRett:!1,erDeltUttak:!0,harAktivitetskravIPeriodeUtenUttak:!1,modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:O},aleneOmOmsorg:!1}},o={args:{...e.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"},erDeltUttak:!0}},n={name:"Mor og far, uten felles med ferieopphold",args:{...e.args,saksperioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"MOR",utsettelseÅrsak:"LOVBESTEMT_FERIE",fom:"2025-12-12",tom:"2025-12-15"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-16",tom:"2026-03-30"}],erDeltUttak:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    erFarEllerMedmor: false,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Espen Utvikler'
    },
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2025-05-09'],
      antallBarn: 1,
      termindato: '2025-05-09'
    },
    saksperioder: [{
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      fom: '2025-12-12',
      tom: '2026-03-26'
    }],
    bareFarMedmorHarRett: false,
    erDeltUttak: true,
    harAktivitetskravIPeriodeUtenUttak: false,
    modus: 'planlegger',
    valgtStønadskonto: {
      kontoer: [{
        konto: 'MØDREKVOTE',
        dager: 95
      }, {
        konto: 'FEDREKVOTE',
        dager: 95
      }, {
        konto: 'FELLESPERIODE',
        dager: 101
      }, {
        konto: 'FORELDREPENGER_FØR_FØDSEL',
        dager: 15
      }],
      minsteretter: MINSTERETTER
    },
    aleneOmOmsorg: false
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erFarEllerMedmor: true,
    erMedmorDelAvSøknaden: true,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Helga Utvikler'
    },
    erDeltUttak: true
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far, uten felles med ferieopphold',
  args: {
    ...Default.args,
    saksperioder: [{
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: 'MOR',
      utsettelseÅrsak: 'LOVBESTEMT_FERIE',
      fom: '2025-12-12',
      tom: '2025-12-15'
    }, {
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      fom: '2025-12-16',
      tom: '2026-03-30'
    }],
    erDeltUttak: true
  }
}`,...n.parameters?.docs?.source}}};const v=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{e as Default,n as MorOgFarMedFerieopphold,o as MorOgMedmor,v as __namedExportsOrder,_ as default};
