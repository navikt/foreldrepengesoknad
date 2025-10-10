import{r as p,j as f}from"./iframe-Dv6HQNCo.js";import{S as e,F as r,a as i}from"./TidsperiodeSpørsmål-C_LWNAqe.js";import{B as F}from"./PeriodeListeItem-BuzDJMBw.js";import{U as s}from"./Uttaksplan-DBGGEx9B.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-Cjl3NZtt.js";import"./PeriodeListe-C0ZSR7A-.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,T={farRundtFødsel:10,toTette:0},U={component:s,args:{handleOnPlanChange:g("button-click")},render:a=>{const[l,m]=p.useState(a.søkersPerioder),k=d=>{m(d),a.handleOnPlanChange(d)};return f.jsx(s,{...a,søkersPerioder:l,handleOnPlanChange:k})}},o={args:{familiehendelsedato:"2025-05-09",erFarEllerMedmor:!1,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Espen Utvikler"},barn:{type:F.FØDT,fødselsdatoer:["2025-05-09"],antallBarn:1,termindato:"2025-05-09"},søkersPerioder:[{forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel,fom:"2025-04-18",tom:"2025-05-08"},{forelder:r.mor,kontoType:e.Mødrekvote,fom:"2025-05-09",tom:"2025-08-21"},{forelder:r.mor,kontoType:e.Fellesperiode,fom:"2025-08-22",tom:"2025-12-11"},{forelder:r.farMedmor,kontoType:e.Fedrekvote,fom:"2025-12-12",tom:"2026-03-26"}],gjelderAdopsjon:!1,bareFarMedmorHarRett:!1,harAktivitetskravIPeriodeUtenUttak:!1,førsteUttaksdagNesteBarnsSak:void 0,familiesituasjon:"fødsel",modus:"planlegger",valgtStønadskonto:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:T},erAleneOmOmsorg:!1}},n={args:{...o.args,erFarEllerMedmor:!0,erMedmorDelAvSøknaden:!0,navnPåForeldre:{mor:"Olga Utvikler",farMedmor:"Helga Utvikler"}}},t={name:"Mor og far, uten felles med ferieopphold",args:{...o.args,søkersPerioder:[{forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel,fom:"2025-04-18",tom:"2025-05-08"},{forelder:r.mor,kontoType:e.Mødrekvote,fom:"2025-05-09",tom:"2025-08-21"},{forelder:r.mor,kontoType:e.Fellesperiode,fom:"2025-08-22",tom:"2025-12-11"},{forelder:r.mor,utsettelseÅrsak:i.Ferie,fom:"2025-12-12",tom:"2025-12-15"},{forelder:r.farMedmor,kontoType:e.Fedrekvote,fom:"2025-12-16",tom:"2026-03-30"}]}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erFarEllerMedmor: true,
    erMedmorDelAvSøknaden: true,
    navnPåForeldre: {
      mor: 'Olga Utvikler',
      farMedmor: 'Helga Utvikler'
    }
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Mor og far, uten felles med ferieopphold',
  args: {
    ...Default.args,
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
      forelder: Forelder.mor,
      utsettelseÅrsak: UtsettelseÅrsakType.Ferie,
      fom: '2025-12-12',
      tom: '2025-12-15'
    }, {
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote,
      fom: '2025-12-16',
      tom: '2026-03-30'
    }]
  }
}`,...t.parameters?.docs?.source}}};const E=["Default","MorOgMedmor","MorOgFarMedFerieopphold"];export{o as Default,t as MorOgFarMedFerieopphold,n as MorOgMedmor,E as __namedExportsOrder,U as default};
