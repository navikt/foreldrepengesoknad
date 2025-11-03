import{r as E,j as f}from"./iframe-CEGyY0Uc.js";import{F as e}from"./TidsperiodeSpørsmål-CdO67uir.js";import{B as F}from"./PeriodeListeItem-BtQy1Vmx.js";import{U as s}from"./Uttaksplan-_JMsKITr.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-bdvFldHq.js";import"./PeriodeListe-s2mWwnoJ.js";const{action:k}=__STORYBOOK_MODULE_ACTIONS__,p={farRundtFødsel:10,toTette:0},c={component:s,args:{handleOnPlanChange:k("button-click")},render:t=>{const[d,l]=E.useState(t.søkersPerioder),m=a=>{l(a),t.handleOnPlanChange(a)};return f.jsx(s,{...t,søkersPerioder:d,handleOnPlanChange:m})}},r={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:F.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:e.mor,kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:e.mor,kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:e.farMedmor,kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:p},erAleneOmOmsorg:!1}},o={args:{...r.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"}}},n={name:"Mor og far, uten felles med ferieopphold",args:{...r.args,søkersPerioder:[{forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:e.mor,kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:e.mor,kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:e.mor,utsettelseÅrsak:"LOVBESTEMT_FERIE",fom:"2025-12-12",tom:"2025-12-15"},{forelder:e.farMedmor,kontoType:"FEDREKVOTE",fom:"2025-12-16",tom:"2026-03-30"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      forelder: Forelder.mor,
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: Forelder.mor,
      kontoType: 'MØDREKVOTE',
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: Forelder.mor,
      kontoType: 'FELLESPERIODE',
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: Forelder.farMedmor,
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erFarEllerMedmor: true,
    erMedmorDelAvSøknaden: true,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Helga Utvikler'
    }
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far, uten felles med ferieopphold',
  args: {
    ...Default.args,
    søkersPerioder: [{
      forelder: Forelder.mor,
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: Forelder.mor,
      kontoType: 'MØDREKVOTE',
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: Forelder.mor,
      kontoType: 'FELLESPERIODE',
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: Forelder.mor,
      utsettelseÅrsak: 'LOVBESTEMT_FERIE',
      fom: '2025-12-12',
      tom: '2025-12-15'
    }, {
      forelder: Forelder.farMedmor,
      kontoType: 'FEDREKVOTE',
      fom: '2025-12-16',
      tom: '2026-03-30'
    }]
  }
}`,...n.parameters?.docs?.source}}};const u=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{r as Default,n as MorOgFarMedFerieopphold,o as MorOgMedmor,u as __namedExportsOrder,c as default};
