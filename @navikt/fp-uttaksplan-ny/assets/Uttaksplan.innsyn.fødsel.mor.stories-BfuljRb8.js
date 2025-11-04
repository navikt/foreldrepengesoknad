import{B as n}from"./PeriodeListeItem-i8tR8xZs.js";import"./iframe-CaOPiLOy.js";import{U as t}from"./Uttaksplan-BACPCNWR.js";import{w as a}from"./withUttaksplanContextDecorator-BV3gsKDE.js";import"./TidsperiodeSpørsmål-CfuDYskj.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-iPLJOkh2.js";import"./PeriodeListe-BLGJvzqp.js";const u={title:"Uttaksplan - Innsyn",component:t,decorators:[a],args:{handleOnPlanChange:()=>null}},e={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:n.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},erAleneOmOmsorg:!0,erFarEllerMedmor:!1,familiehendelsedato:"2025-09-30",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},søkersPerioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}},r={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:n.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2025-08-13",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},søkersPerioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:"AVSLAG_FRATREKK_PLEIEPENGER"},utsettelseÅrsak:"BARN_INNLAGT",flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR'
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
      forelder: 'MOR'
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
      forelder: 'MOR'
    }],
    valgtStønadskonto: {} as any
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      forelder: 'MOR'
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
      forelder: 'MOR'
    }],
    valgtStønadskonto: {} as any
  }
}`,...r.parameters?.docs?.source}}};const E=["MorAleneOmOmsorg","PrematurUker"];export{e as MorAleneOmOmsorg,r as PrematurUker,E as __namedExportsOrder,u as default};
