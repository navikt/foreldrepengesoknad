import{F as e,a as s}from"./TidsperiodeSpørsmål-B1ktsnJl.js";import{P as r,B as a}from"./PeriodeListeItem-CQofp9OK.js";import"./iframe-BxvTwi8Q.js";import{U as o}from"./Uttaksplan-C9Va7S7P.js";import{w as l}from"./withUttaksplanContextDecorator-_czF6YkP.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-dqzdc3O1.js";import"./PeriodeListe-C_7OeFNd.js";const p={title:"Uttaksplan - Innsyn",component:o,decorators:[l],args:{handleOnPlanChange:()=>null}},t={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:a.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},erAleneOmOmsorg:!0,erFarEllerMedmor:!1,familiehendelsedato:"2025-09-30",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},søkersPerioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}},n={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:a.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},erAleneOmOmsorg:!1,erFarEllerMedmor:!1,familiehendelsedato:"2025-08-13",familiesituasjon:"fødsel",førsteUttaksdagNesteBarnsSak:void 0,gjelderAdopsjon:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},søkersPerioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.AVSLAG_FRATREKK_PLEIEPENGER},utsettelseÅrsak:s.InstitusjonBarnet,flerbarnsdager:!1,forelder:e.mor},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:r.ANNET},flerbarnsdager:!1,forelder:e.mor}],valgtStønadskonto:{}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      utsettelseÅrsak: UtsettelseÅrsakType.InstitusjonBarnet,
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
}`,...n.parameters?.docs?.source}}};const R=["MorAleneOmOmsorg","PrematurUker"];export{t as MorAleneOmOmsorg,n as PrematurUker,R as __namedExportsOrder,p as default};
