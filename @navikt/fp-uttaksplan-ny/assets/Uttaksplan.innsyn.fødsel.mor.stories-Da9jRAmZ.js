import{F as e}from"./TidsperiodeSpørsmål-BzAe119J.js";import{P as r,B as a}from"./PeriodeListeItem-C3hiEzc1.js";import"./iframe-DojCjvqX.js";import{U as s}from"./Uttaksplan-CN5mJPX4.js";import{w as o}from"./withUttaksplanContextDecorator-CtwH_2_m.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-B8g6WnEP.js";import"./PeriodeListe-BCk3UTrK.js";const g={title:"Uttaksplan - Innsyn",component:s,decorators:[o],args:{handleOnPlanChange:()=>null}},n={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:a.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},erAleneOmOmsorg:!0,erFarEllerMedmor:!1,familiehendelsedato:"2025-09-30",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},søkersPerioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}},t={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:a.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2025-08-13",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},søkersPerioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.AVSLAG_FRATREKK_PLEIEPENGER},utsettelseÅrsak:"BARN_INNLAGT",flerbarnsdager:!1,forelder:e.mor},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
        årsak: PeriodeResultatÅrsak.ANNET
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
        årsak: PeriodeResultatÅrsak.ANNET
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
        årsak: PeriodeResultatÅrsak.ANNET
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }],
    valgtStønadskonto: {} as any
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
        årsak: PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER
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
        årsak: PeriodeResultatÅrsak.ANNET
      },
      flerbarnsdager: false,
      forelder: Forelder.mor
    }],
    valgtStønadskonto: {} as any
  }
}`,...t.parameters?.docs?.source}}};const p=["MorAleneOmOmsorg","PrematurUker"];export{n as MorAleneOmOmsorg,t as PrematurUker,p as __namedExportsOrder,g as default};
