import{S as e,F as o}from"./TidsperiodeSpørsmål-DUJmkB1p.js";import{B as t}from"./PeriodeListeItem-CqVcIxMd.js";import"./iframe-DUrKw01U.js";import{U as a}from"./Uttaksplan-BCb-XXBR.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-BmTFMHKy.js";import"./PeriodeListe-n9jjcJ_a.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s={farRundtFødsel:10,toTette:0},F={component:a,args:{handleOnPlanChange:d("button-click")}},r={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:t.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:o.mor,kontoType:e.ForeldrepengerFørFødsel,fom:"2025-04-18",tom:"2025-05-08"},{forelder:o.mor,kontoType:e.Mødrekvote,fom:"2025-05-09",tom:"2025-08-21"},{forelder:o.mor,kontoType:e.Fellesperiode,fom:"2025-08-22",tom:"2025-12-11"},{forelder:o.farMedmor,kontoType:e.Fedrekvote,fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},erAleneOmOmsorg:!1}},n={args:{...r.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erFarEllerMedmor: true,
    erMedmorDelAvSøknaden: true,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Helga Utvikler'
    }
  }
}`,...n.parameters?.docs?.source}}};const T=["Default","MorOgMedmor"];export{r as Default,n as MorOgMedmor,T as __namedExportsOrder,F as default};
