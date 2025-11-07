import{j as a}from"./iframe-IJWCyEUl.js";import{M as i,H as o}from"./useVeiviserNavigator-DpMSboC6.js";import{D as l}from"./ArbeidssituasjonSide-CuJHFZNY.js";import{O as t}from"./OppsummeringSide-KfJNx2oG.js";import"./preload-helper-D9Z9MdNV.js";import"./currencyUtils-BA_fKwkS.js";import"./HarIkkeRettTilFpInfobox-BMgpBVsT.js";import"./HøyInntektInfobox-DdVrMcA_.js";import"./LinkCard-C-9UXtV3.js";const g={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:90},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},S={title:"hvorMye/OppsummeringSide",component:t,render:d=>a.jsx(i,{initialEntries:[o.OPPSUMMERING],children:a.jsx(t,{...d})})},e={args:{stønadskontoer:g,satser:l,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"20000",lønnMåned2:"20000",lønnMåned3:"20000"}}},r={args:{...e.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"100000",lønnMåned2:"100000",lønnMåned3:"100000"}}},n={args:{...e.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"1000",lønnMåned2:"1000",lønnMåned3:"1000"}}},s={args:{...e.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"10000",lønnMåned2:"10000",lønnMåned3:"10000"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    stønadskontoer: STØNADSKONTOER,
    satser: DEFAULT_SATSER,
    arbeidssituasjon: {
      erArbeidstakerEllerFrilanser: true,
      erSelvstendigNæringsdrivende: false,
      harUtbetalingFraNav: false,
      lønnMåned1: '20000',
      lønnMåned2: '20000',
      lønnMåned3: '20000'
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...ArbeidstakerMed20000Imåneden.args,
    arbeidssituasjon: {
      erArbeidstakerEllerFrilanser: true,
      erSelvstendigNæringsdrivende: false,
      harUtbetalingFraNav: false,
      lønnMåned1: '100000',
      lønnMåned2: '100000',
      lønnMåned3: '100000'
    }
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...ArbeidstakerMed20000Imåneden.args,
    arbeidssituasjon: {
      erArbeidstakerEllerFrilanser: true,
      erSelvstendigNæringsdrivende: false,
      harUtbetalingFraNav: false,
      lønnMåned1: '1000',
      lønnMåned2: '1000',
      lønnMåned3: '1000'
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...ArbeidstakerMed20000Imåneden.args,
    arbeidssituasjon: {
      erArbeidstakerEllerFrilanser: true,
      erSelvstendigNæringsdrivende: false,
      harUtbetalingFraNav: false,
      lønnMåned1: '10000',
      lønnMåned2: '10000',
      lønnMåned3: '10000'
    }
  }
}`,...s.parameters?.docs?.source}}};const v=["ArbeidstakerMed20000Imåneden","ArbeidstakerMed100000Imåneden","ArbeidstakerMed1000Imåneden","ArbeidstakerMed10000IMåneden"];export{r as ArbeidstakerMed100000Imåneden,s as ArbeidstakerMed10000IMåneden,n as ArbeidstakerMed1000Imåneden,e as ArbeidstakerMed20000Imåneden,v as __namedExportsOrder,S as default};
