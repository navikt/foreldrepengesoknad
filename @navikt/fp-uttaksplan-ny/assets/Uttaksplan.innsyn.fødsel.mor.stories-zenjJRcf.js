import{F as e}from"./TidsperiodeSpørsmål-3o5dX_UL.js";import{B as t}from"./PeriodeListeItem-Bi_7msBN.js";import"./iframe-CHjOvvs1.js";import{U as a}from"./Uttaksplan-BiwsVDWF.js";import{w as s}from"./withUttaksplanContextDecorator-BHTvzjZ8.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-CEsfBRVP.js";import"./PeriodeListe-DuEIEA6R.js";const E={title:"Uttaksplan - Innsyn",component:a,decorators:[s],args:{handleOnPlanChange:()=>null}},r={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:t.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},erAleneOmOmsorg:!0,erFarEllerMedmor:!1,familiehendelsedato:"2025-09-30",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},søkersPerioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:e.mor},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:e.mor},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}},n={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:t.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2025-08-13",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},søkersPerioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:"AVSLAG_FRATREKK_PLEIEPENGER"},utsettelseÅrsak:"BARN_INNLAGT",flerbarnsdager:!1,forelder:e.mor},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Mor er alene om omsorg',
  args: {
    bareFarMedmorHarRett: false,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2025-09-30'],
      termindato: '2025-10-07',
      antallBarn: 1
    },
    erAleneOmOmsorg: true,
    erFarEllerMedmor: false,
    familiehendelsedato: '2025-09-30',
    familiesituasjon: 'fødsel',
    førsteUttaksdagNesteBarnsSak: undefined,
    gjelderAdopsjon: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    modus: 'innsyn',
    navnPåForeldre: {
      farMedmor: 'Annen forelder',
      mor: 'Iris'
    },
    søkersPerioder: [{
      fom: '2025-09-16',
      tom: '2025-09-29',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }, {
      fom: '2025-09-30',
      tom: '2026-01-19',
      kontoType: 'FORELDREPENGER',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }, {
      fom: '2026-02-24',
      tom: '2026-06-15',
      kontoType: 'FORELDREPENGER',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }],
    valgtStønadskonto: {} as any
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Mor har prematuruker',
  args: {
    bareFarMedmorHarRett: false,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2025-08-13'],
      termindato: '2025-10-19',
      antallBarn: 1
    },
    erAleneOmOmsorg: false,
    erFarEllerMedmor: false,
    familiehendelsedato: '2025-08-13',
    familiesituasjon: 'fødsel',
    førsteUttaksdagNesteBarnsSak: undefined,
    gjelderAdopsjon: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    modus: 'innsyn',
    navnPåForeldre: {
      farMedmor: 'Annen forelder',
      mor: 'Avansert'
    },
    søkersPerioder: [{
      fom: '2025-08-13',
      tom: '2025-10-10',
      kontoType: 'FELLESPERIODE',
      resultat: {
        innvilget: false,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'AVSLAG_FRATREKK_PLEIEPENGER'
      },
      utsettelseÅrsak: 'BARN_INNLAGT',
      flerbarnsdager: false,
      forelder: Forelder.mor
    }, {
      fom: '2025-10-11',
      tom: '2025-11-25',
      kontoType: 'MØDREKVOTE',
      resultat: {
        innvilget: true,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: 'ANNET'
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }],
    valgtStønadskonto: {} as any
  }
}`,...n.parameters?.docs?.source}}};const g=["MorAleneOmOmsorg","PrematurUker"];export{r as MorAleneOmOmsorg,n as PrematurUker,g as __namedExportsOrder,E as default};
