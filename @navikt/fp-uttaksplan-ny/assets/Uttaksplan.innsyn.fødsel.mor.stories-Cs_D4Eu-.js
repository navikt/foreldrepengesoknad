import{r as i,j as n}from"./iframe-KBIX-wLF.js";import{B as s,U as d}from"./UttaksplanDataContext-DKYuP3Qh.js";import{U as a}from"./Uttaksplan-CbGXEONB.js";import{U as f}from"./useUttaksplanBuilder-BX3t1KB9.js";import"./preload-helper-D9Z9MdNV.js";import"./LeggTilPeriodePanel-CxtyLc-U.js";import"./dateTomValidators-CSnKlT5H.js";import"./TidsperiodeSpørsmål-D2wT-5b2.js";import"./PeriodeListe-Coht9B91.js";import"./PeriodeListeItem-BKEYSGnH.js";import"./validation-DG8KYvNE.js";const T={title:"Uttaksplan - Innsyn",component:a,args:{children:null,erMedmorDelAvSøknaden:!1},render:t=>{const[o,l]=i.useState(t.saksperioder),k=m=>{l(m)};return n.jsx(d,{...t,saksperioder:o??[],children:n.jsx(f,{oppdaterUttaksplan:k,children:n.jsx(a,{})})})}},e={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:s.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},aleneOmOmsorg:!0,erFarEllerMedmor:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},erDeltUttak:!1,saksperioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}},r={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:s.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},aleneOmOmsorg:!1,erFarEllerMedmor:!1,erDeltUttak:!0,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},saksperioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:"AVSLAG_FRATREKK_PLEIEPENGER"},utsettelseÅrsak:"BARN_INNLAGT",flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Mor er alene om omsorg',
  args: {
    bareFarMedmorHarRett: false,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2025-09-30'],
      termindato: '2025-10-07',
      antallBarn: 1
    },
    aleneOmOmsorg: true,
    erFarEllerMedmor: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    modus: 'innsyn',
    navnPåForeldre: {
      farMedmor: 'Annen forelder',
      mor: 'Iris'
    },
    erDeltUttak: false,
    saksperioder: [{
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    aleneOmOmsorg: false,
    erFarEllerMedmor: false,
    erDeltUttak: true,
    harAktivitetskravIPeriodeUtenUttak: false,
    modus: 'innsyn',
    navnPåForeldre: {
      farMedmor: 'Annen forelder',
      mor: 'Avansert'
    },
    saksperioder: [{
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    valgtStønadskonto: {} as any
  }
}`,...r.parameters?.docs?.source}}};const F=["MorAleneOmOmsorg","PrematurUker"];export{e as MorAleneOmOmsorg,r as PrematurUker,F as __namedExportsOrder,T as default};
