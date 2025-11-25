import{r as d,j as a}from"./iframe-DitHk6TC.js";import{B as o,U as i}from"./UttaksplanDataContext-A9NY7tmu.js";import{U as s}from"./Uttaksplan-D68uUBsC.js";import"./preload-helper-D9Z9MdNV.js";import"./useUttaksplanBuilder-B4uFT9gh.js";import"./dateTomValidators-Mf6fkQ5G.js";import"./validation-B3ffqz7j.js";import"./LeggTilPeriodePanel-DRBDV3Sx.js";import"./TidsperiodeSpørsmål-CckB9-fl.js";import"./PeriodeListe-CrmLXOLQ.js";import"./PeriodeListeItem-CXBPxlHT.js";const F={title:"Uttaksplan - Innsyn",component:s,args:{oppdaterUttaksplan:()=>null,children:null,erMedmorDelAvSøknaden:!1,erFlereUttaksplanversjoner:!1},render:e=>{const[l,k]=d.useState(e.saksperioder),m=n=>{k(n),e.oppdaterUttaksplan&&e.oppdaterUttaksplan(n)};return a.jsx(i,{...e,saksperioder:l,children:a.jsx(s,{oppdaterUttaksplan:m})})}},r={name:"Mor er alene om omsorg",args:{bareFarMedmorHarRett:!1,barn:{type:o.FØDT,fødselsdatoer:["2025-09-30"],termindato:"2025-10-07",antallBarn:1},aleneOmOmsorg:!0,erFarEllerMedmor:!1,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Iris"},erDeltUttak:!1,saksperioder:[{fom:"2025-09-16",tom:"2025-09-29",kontoType:"FORELDREPENGER_FØR_FØDSEL",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-09-30",tom:"2026-01-19",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"},{fom:"2026-02-24",tom:"2026-06-15",kontoType:"FORELDREPENGER",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}},t={name:"Mor har prematuruker",args:{bareFarMedmorHarRett:!1,barn:{type:o.FØDT,fødselsdatoer:["2025-08-13"],termindato:"2025-10-19",antallBarn:1},aleneOmOmsorg:!1,erFarEllerMedmor:!1,erDeltUttak:!0,harAktivitetskravIPeriodeUtenUttak:!1,modus:"innsyn",navnPåForeldre:{farMedmor:"Annen forelder",mor:"Avansert"},saksperioder:[{fom:"2025-08-13",tom:"2025-10-10",kontoType:"FELLESPERIODE",resultat:{innvilget:!1,trekkerMinsterett:!0,trekkerDager:!0,årsak:"AVSLAG_FRATREKK_PLEIEPENGER"},utsettelseÅrsak:"BARN_INNLAGT",flerbarnsdager:!1,forelder:"MOR"},{fom:"2025-10-11",tom:"2025-11-25",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1,forelder:"MOR"}],valgtStønadskonto:{}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const N=["MorAleneOmOmsorg","PrematurUker"];export{r as MorAleneOmOmsorg,t as PrematurUker,N as __namedExportsOrder,F as default};
