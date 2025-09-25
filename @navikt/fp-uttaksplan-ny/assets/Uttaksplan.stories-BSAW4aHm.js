import{S as e,F as r}from"./TidsperiodeSpørsmål-vNTB60eB.js";import{B as n}from"./PeriodeListeItem-BOauIg1Z.js";import"./iframe-De6WueNW.js";import{U as t}from"./Uttaksplan-BW4XXaYz.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-DJd5n4BU.js";import"./PeriodeListe-XbrtNUwt.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,d={farRundtFødsel:10,toTette:0},F={component:t,args:{handleOnPlanChange:a("button-click")}},o={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:n.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel,fom:"2025-04-18",tom:"2025-05-08"},{forelder:r.mor,kontoType:e.Mødrekvote,fom:"2025-05-09",tom:"2025-08-21"},{forelder:r.mor,kontoType:e.Fellesperiode,fom:"2025-08-22",tom:"2025-12-11"},{forelder:r.farMedmor,kontoType:e.Fedrekvote,fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:d},erAleneOmOmsorg:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Mødrekvote,
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Fellesperiode,
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote,
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
        konto: StønadskontoType.Mødrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fedrekvote,
        dager: 95
      }, {
        konto: StønadskontoType.Fellesperiode,
        dager: 101
      }, {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
      }],
      minsteretter: MINSTERETTER
    },
    erAleneOmOmsorg: false
  }
}`,...o.parameters?.docs?.source}}};const g=["Default"];export{o as Default,g as __namedExportsOrder,F as default};
