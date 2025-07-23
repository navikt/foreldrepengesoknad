import{j as d}from"./iframe-WwVPQ7tt.js";import{M as o,H as l}from"./useVeiviserNavigator-_z0bZ5m8.js";import{O as t,S as e}from"./OppsummeringSide-C8yK2tWn.js";import{D as g}from"./ArbeidssituasjonSide-CcLCejyy.js";import"./currencyUtils-Dw7JTp9t.js";import"./HarIkkeRettTilFpInfobox-Cg6hgLp8.js";import"./HøyInntektInfobox-DX9hIzIp.js";import"./BabyWrapped-C44VYMI7.js";const m={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},A={title:"hvorMye/OppsummeringSide",component:t,render:i=>d.jsx(o,{initialEntries:[l.OPPSUMMERING],children:d.jsx(t,{...i})})},r={args:{stønadskontoer:m,satser:g,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"20000",lønnMåned2:"20000",lønnMåned3:"20000"}}},n={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"100000",lønnMåned2:"100000",lønnMåned3:"100000"}}},s={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"1000",lønnMåned2:"1000",lønnMåned3:"1000"}}},a={args:{...r.args,arbeidssituasjon:{erArbeidstakerEllerFrilanser:!0,erSelvstendigNæringsdrivende:!1,harUtbetalingFraNav:!1,lønnMåned1:"10000",lønnMåned2:"10000",lønnMåned3:"10000"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const S=["ArbeidstakerMed20000Imåneden","ArbeidstakerMed100000Imåneden","ArbeidstakerMed1000Imåneden","ArbeidstakerMed10000IMåneden"];export{n as ArbeidstakerMed100000Imåneden,a as ArbeidstakerMed10000IMåneden,s as ArbeidstakerMed1000Imåneden,r as ArbeidstakerMed20000Imåneden,S as __namedExportsOrder,A as default};
