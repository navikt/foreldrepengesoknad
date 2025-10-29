import{r as E,j as f}from"./iframe-BxvTwi8Q.js";import{F as e,a as k}from"./TidsperiodeSpørsmål-B1ktsnJl.js";import{B as p}from"./PeriodeListeItem-CQofp9OK.js";import{U as s}from"./Uttaksplan-C9Va7S7P.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-dqzdc3O1.js";import"./PeriodeListe-C_7OeFNd.js";const{action:F}=__STORYBOOK_MODULE_ACTIONS__,i={farRundtFødsel:10,toTette:0},u={component:s,args:{handleOnPlanChange:F("button-click")},render:t=>{const[d,l]=E.useState(t.søkersPerioder),m=a=>{l(a),t.handleOnPlanChange(a)};return f.jsx(s,{...t,søkersPerioder:d,handleOnPlanChange:m})}},r={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:p.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:e.mor,kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:e.mor,kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:e.farMedmor,kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:i},erAleneOmOmsorg:!1}},o={args:{...r.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"}}},n={name:"Mor og far, uten felles med ferieopphold",args:{...r.args,søkersPerioder:[{forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:e.mor,kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:e.mor,kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:e.mor,utsettelseÅrsak:k.Ferie,fom:"2025-12-12",tom:"2025-12-15"},{forelder:e.farMedmor,kontoType:"FEDREKVOTE",fom:"2025-12-16",tom:"2026-03-30"}]}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
      fom: '2025-12-12',
      tom: '2025-12-15'
    }, {
      forelder: Forelder.farMedmor,
      kontoType: 'FEDREKVOTE',
      fom: '2025-12-16',
      tom: '2026-03-30'
    }]
  }
}`,...n.parameters?.docs?.source}}};const P=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{r as Default,n as MorOgFarMedFerieopphold,o as MorOgMedmor,P as __namedExportsOrder,u as default};
