import{r as d,j as m}from"./iframe-E9iq-gRa.js";import{B as f}from"./PeriodeListeItem-CLoFJl4D.js";import{U as a}from"./Uttaksplan-BhdXY2F0.js";import"./preload-helper-D9Z9MdNV.js";import"./TidsperiodeSpørsmål-CWQlTv5X.js";import"./LeggTilPeriodePanel-DSevXRd8.js";import"./PeriodeListe-DX1bzkC2.js";const{action:R}=__STORYBOOK_MODULE_ACTIONS__,O={farRundtFødsel:10,toTette:0},D={component:a,args:{handleOnPlanChange:R("button-click")},render:n=>{const[s,E]=d.useState(n.søkersPerioder),l=t=>{E(t),n.handleOnPlanChange(t)};return m.jsx(a,{...n,søkersPerioder:s,handleOnPlanChange:l})}},e={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:f.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:O},erAleneOmOmsorg:!1}},r={args:{...e.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"}}},o={name:"Mor og far, uten felles med ferieopphold",args:{...e.args,søkersPerioder:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"MOR",utsettelseÅrsak:"LOVBESTEMT_FERIE",fom:"2025-12-12",tom:"2025-12-15"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-16",tom:"2026-03-30"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    familiehendelsedato: '2025-05-09',
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
    søkersPerioder: [{
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
    gjelderAdopsjon: false,
    bareFarMedmorHarRett: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    førsteUttaksdagNesteBarnsSak: undefined,
    familiesituasjon: 'fødsel',
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
    erAleneOmOmsorg: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erFarEllerMedmor: true,
    erMedmorDelAvSøknaden: true,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Helga Utvikler'
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far, uten felles med ferieopphold',
  args: {
    ...Default.args,
    søkersPerioder: [{
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
    }]
  }
}`,...o.parameters?.docs?.source}}};const c=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{e as Default,o as MorOgFarMedFerieopphold,r as MorOgMedmor,c as __namedExportsOrder,D as default};
