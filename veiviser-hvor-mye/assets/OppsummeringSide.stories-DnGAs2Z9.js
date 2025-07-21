import{j as d}from"./iframe-CXjmrB2S.js";import{M as o,H as l}from"./useVeiviserNavigator-CvBsgllQ.js";import{O as t,S as e}from"./OppsummeringSide-BCvrkWMu.js";import"./ArbeidssituasjonSide-DGBu8sps.js";import"./currencyUtils-BlWE0Pga.js";import"./HarIkkeRettTilFpInfobox-zvI_YbPA.js";import"./HøyInntektInfobox-D_OcfWW3.js";import"./BabyWrapped-CwC23aRT.js";const g={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},m={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},f={title:"hvorMye/OppsummeringSide",component:t,render:i=>d.jsx(o,{initialEntries:[l.OPPSUMMERING],children:d.jsx(t,{...i})})},r={args:{stønadskontoer:g,satser:m,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"20000",lønnMåned2:"20000",lønnMåned3:"20000"}}},n={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"100000",lønnMåned2:"100000",lønnMåned3:"100000"}}},s={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"1000",lønnMåned2:"1000",lønnMåned3:"1000"}}},a={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"10000",lønnMåned2:"10000",lønnMåned3:"10000"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    stønadskontoer: STØNADSKONTOER,
    satser: satser,
    arbeidssituasjon: {
      erArbeidstakerEllerFrilanser: true,
      erSelvstendigNæringsdrivende: false,
      harUtbetalingFraNav: false,
      lønnMåned1: '20000',
      lønnMåned2: '20000',
      lønnMåned3: '20000'
    }
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const A=["ArbeidstakerMed20000Imåneden","ArbeidstakerMed100000Imåneden","ArbeidstakerMed1000Imåneden","ArbeidstakerMed10000IMåneden"];export{n as ArbeidstakerMed100000Imåneden,a as ArbeidstakerMed10000IMåneden,s as ArbeidstakerMed1000Imåneden,r as ArbeidstakerMed20000Imåneden,A as __namedExportsOrder,f as default};
