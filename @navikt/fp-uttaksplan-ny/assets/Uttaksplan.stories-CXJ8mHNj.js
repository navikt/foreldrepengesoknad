import{r as m,j as t}from"./iframe-IjB3o65_.js";import{B as p,U as R}from"./UttaksplanDataContext-8zdnXlRk.js";import{U as l}from"./Uttaksplan-DT1-gG8Z.js";import{U as f}from"./useUttaksplanBuilder--lfRSlis.js";import"./preload-helper-PPVm8Dsz.js";import"./LeggTilPeriodePanel-CYymWX4W.js";import"./dateTomValidators-CX7AYJlT.js";import"./TidsperiodeSpørsmål-B0hKGXA5.js";import"./PeriodeListe-101kf1H7.js";import"./PeriodeListeItem-t8hB9cDe.js";import"./validation-BbgwwNKw.js";const{action:k}=__STORYBOOK_MODULE_ACTIONS__,O={farRundtFødsel:10,toTette:0},v={component:l,args:{children:null,erMedmorDelAvSøknaden:!1,modus:"planlegger",harAktivitetskravIPeriodeUtenUttak:!1,oppdaterUttaksplan:k("button-click"),harEndretPlan:!1},render:r=>{const[a,E]=m.useState(r.saksperioder),d=s=>{E(s),r.oppdaterUttaksplan&&r.oppdaterUttaksplan(s)};return t.jsx(R,{...r,saksperioder:a??[],children:t.jsx(f,{oppdaterUttaksplan:d,harEndretPlan:a!==void 0,children:t.jsx(l,{})})})}},e={args:{erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:p.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},saksperioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}],bareFarMedmorHarRett:!1,erDeltUttak:!0,harAktivitetskravIPeriodeUtenUttak:!1,modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:O},aleneOmOmsorg:!1}},o={args:{...e.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"},erDeltUttak:!0}},n={name:"Mor og far, uten felles med ferieopphold",args:{...e.args,saksperioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"MOR",utsettelseÅrsak:"LOVBESTEMT_FERIE",fom:"2025-12-12",tom:"2025-12-15"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-16",tom:"2026-03-30"}],erDeltUttak:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const _=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{e as Default,n as MorOgFarMedFerieopphold,o as MorOgMedmor,_ as __namedExportsOrder,v as default};
