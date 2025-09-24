import{i as g,j as t}from"./iframe-DnYRF4zf.js";import{h as o,H as p}from"./index-BxuBRL8T.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Dufnp_fv.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-xzLFzQus.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DDj8hruh.js";import"./useSelectedSak-AuoLYAFn.js";import"./useQuery-l25sG66Q.js";import"./api-C9wBztrE.js";import"./sakerUtils-Dc0tVNwZ.js";import"./Snarveier-20kTzjmO.js";import"./LenkePanel-epq7rmgp.js";import"./index-dZacAveH.js";import"./Dokument-D98YyAMK.js";import"./dokumenterUtils-DskUQb5f.js";import"./Tag-CxAybYHL.js";import"./GrupperteDokumenter-YuJ3QoRm.js";import"./guid-CsArkN6i.js";import"./Accordion-D4teQbww.js";import"./Header-C6p_7mlZ.js";import"./LayoutWrapper-4DkI5ef-.js";import"./StatusTag-64V7AERa.js";import"./Stroller-B7D-SzwX.js";import"./NoeGikkGalt-B5WHzjCt.js";import"./MinidialogSkjema-Cs156I7s.js";import"./skjemanummer-BuNqaHw5.js";import"./BekreftelseSendtSøknad-HCS4TpmQ.js";import"./KontonummerInfo-up-Fnv6B.js";import"./HarIkkeSaker-F7BixEtU.js";import"./SøkelenkerPanel-CHpTpRoG.js";import"./HarSaker-Bb848w7d.js";import"./SakLink-BEWA2DxK.js";import"./ContentSection-6_1-Il7-.js";import"./Svangerskapspenger-DXbiAsBu.js";import"./DinPlan-DvSsw3W_.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-vD03aZXM.js";import"./OppgaveLenkepanel-CMgwhRpS.js";import"./KontaktOss-C3C10Lq3.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: 'ENGANGSSTØNAD',
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const re=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,re as __namedExportsOrder,te as default};
