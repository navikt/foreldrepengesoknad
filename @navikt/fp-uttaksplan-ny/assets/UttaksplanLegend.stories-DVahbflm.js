import{j as o}from"./iframe-DJLmuMy4.js";import{B as t,U as l}from"./UttaksplanDataContext-CTiKm5vc.js";import{U as a}from"./UttaksplanLegend-BTZT_I9z.js";import"./preload-helper-PPVm8Dsz.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,d={farRundtFødsel:10,toTette:0},k={title:"UttaksplanLegend",component:a,args:{modus:"søknad",valgtStønadskonto:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:d},aleneOmOmsorg:!1,erMedmorDelAvSøknaden:!1,navnPåForeldre:{mor:"Hanne",farMedmor:"Hans"},saksperioder:[],children:null,selectLegend:s("select-legend"),skjulTekstSomDefault:!1},render:e=>o.jsx(l,{barn:e.barn,erFarEllerMedmor:e.erFarEllerMedmor,navnPåForeldre:e.navnPåForeldre,modus:e.modus,valgtStønadskonto:e.valgtStønadskonto,aleneOmOmsorg:e.aleneOmOmsorg||!1,erMedmorDelAvSøknaden:e.erMedmorDelAvSøknaden||!1,bareFarMedmorHarRett:e.bareFarMedmorHarRett||!1,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:e.erDeltUttak||!1,saksperioder:e.saksperioder,children:o.jsx(a,{perioderForKalendervisning:e.perioderForKalendervisning,selectLegend:e.selectLegend,readOnly:e.readOnly,skjulTekstSomDefault:e.skjulTekstSomDefault})})},r={args:{perioderForKalendervisning:[{fom:"2024-03-14",tom:"2024-04-03",color:"PINK",legendLabel:"ADOPSJON"},{fom:"2024-04-04",tom:"2024-04-18",color:"BLUE",legendLabel:"MORS_DEL"},{fom:"2024-05-17",tom:"2024-05-23",color:"GREEN",legendLabel:"FARS_DEL"},{fom:"2024-05-31",tom:"2024-06-13",color:"LIGHTGREENBLUE",legendLabel:"SAMTIDIG_UTTAK"},{fom:"2024-06-14",tom:"2024-06-27",color:"BLACK",legendLabel:"TAPTE_DAGER"},{fom:"2024-06-28",tom:"2024-07-02",color:"GREENOUTLINE",legendLabel:"MORS_DEL_GRADERT"},{fom:"2024-06-28",tom:"2024-07-02",color:"BLUEOUTLINE",legendLabel:"UTSETTELSE"},{fom:"2024-07-03",tom:"2024-07-15",color:"GREENSTRIPED",legendLabel:"FARS_DEL_AKTIVITETSFRI"}],barn:{type:t.FØDT,fødselsdatoer:["2024-04-04"],antallBarn:1},erDeltUttak:!0,erFarEllerMedmor:!1,harAktivitetskravIPeriodeUtenUttak:!1,bareFarMedmorHarRett:!1,readOnly:!1}},n={args:{...r.args,skjulTekstSomDefault:!0,readOnly:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    perioderForKalendervisning: [{
      fom: '2024-03-14',
      tom: '2024-04-03',
      color: 'PINK',
      legendLabel: 'ADOPSJON'
    }, {
      fom: '2024-04-04',
      tom: '2024-04-18',
      color: 'BLUE',
      legendLabel: 'MORS_DEL'
    }, {
      fom: '2024-05-17',
      tom: '2024-05-23',
      color: 'GREEN',
      legendLabel: 'FARS_DEL'
    }, {
      fom: '2024-05-31',
      tom: '2024-06-13',
      color: 'LIGHTGREENBLUE',
      legendLabel: 'SAMTIDIG_UTTAK'
    }, {
      fom: '2024-06-14',
      tom: '2024-06-27',
      color: 'BLACK',
      legendLabel: 'TAPTE_DAGER'
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      color: 'GREENOUTLINE',
      legendLabel: 'MORS_DEL_GRADERT'
    }, {
      fom: '2024-06-28',
      tom: '2024-07-02',
      color: 'BLUEOUTLINE',
      legendLabel: 'UTSETTELSE'
    }, {
      fom: '2024-07-03',
      tom: '2024-07-15',
      color: 'GREENSTRIPED',
      legendLabel: 'FARS_DEL_AKTIVITETSFRI'
    }],
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2024-04-04'],
      antallBarn: 1
    },
    erDeltUttak: true,
    erFarEllerMedmor: false,
    harAktivitetskravIPeriodeUtenUttak: false,
    bareFarMedmorHarRett: false,
    readOnly: false
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...VisAlleMedTekst.args,
    skjulTekstSomDefault: true,
    readOnly: true
  }
}`,...n.parameters?.docs?.source}}};const f=["VisAlleMedTekst","VisAlleUtenTekst"];export{r as VisAlleMedTekst,n as VisAlleUtenTekst,f as __namedExportsOrder,k as default};
