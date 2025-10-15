import{F as e,S as r,a as o}from"./TidsperiodeSpørsmål-D7HjEJEU.js";import{P as t,B as s}from"./PeriodeListeItem-TABxNwkA.js";import"./iframe-G_Rg6CS0.js";import{U as l}from"./Uttaksplan-C-7OiqQo.js";import{w as d}from"./withUttaksplanContextDecorator-DrdoBAXi.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-5We42FHh.js";import"./PeriodeListe-Brx0UkdT.js";const T={title:"Uttaksplan - Innsyn",component:l,decorators:[d],args:{handleOnPlanChange:()=>null}},n={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:s.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},erAleneOmOmsorg:!0,erFarEllerMedmor:!1,familiehendelsedato:"2025-09-30",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},søkersPerioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:r.ForeldrepengerFørFødsel,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:t.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2025-09-30",tom:"2026-01-19",kontoType:r.Foreldrepenger,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:t.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2026-02-24",tom:"2026-06-15",kontoType:r.Foreldrepenger,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:t.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}},a={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:s.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2025-08-13",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},søkersPerioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:r.Fellesperiode,resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:t.AVSLAG_FRATREKK_PLEIEPENGER},utsettelseÅrsak:o.InstitusjonBarnet,flerbarnsdager:!1,forelder:e.mor},{fom:"2025-10-11",tom:"2025-11-25",kontoType:r.Mødrekvote,resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:t.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      kontoType: StønadskontoType.ForeldrepengerFørFødsel,
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
      kontoType: StønadskontoType.Foreldrepenger,
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
      kontoType: StønadskontoType.Foreldrepenger,
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
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
      kontoType: StønadskontoType.Fellesperiode,
      resultat: {
        innvilget: false,
        trekkerMinsterett: true,
        trekkerDager: true,
        årsak: PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER
      },
      utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
      flerbarnsdager: false,
      forelder: Forelder.mor
    }, {
      fom: '2025-10-11',
      tom: '2025-11-25',
      kontoType: StønadskontoType.Mødrekvote,
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
}`,...a.parameters?.docs?.source}}};const A=["MorAleneOmOmsorg","PrematurUker"];export{n as MorAleneOmOmsorg,a as PrematurUker,A as __namedExportsOrder,T as default};
