import{i as g,j as t}from"./iframe-CgprOxAM.js";import{h as o,H as p}from"./index-YwXLezO5.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Desu4i2U.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-CS1iaA-n.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BcuoLzf-.js";import"./useSelectedSak-BVAmFLSi.js";import"./useQuery-DI2C0W1t.js";import"./api-R5XGfx5z.js";import"./sakerUtils-BUdt7KwH.js";import"./Snarveier-DfjrDR0f.js";import"./LenkePanel-CxNZ4gE5.js";import"./index-7rL4k3xa.js";import"./Dokument-t8KIc3_h.js";import"./dokumenterUtils-Bzrmt5eI.js";import"./Tag-BLhuv8qC.js";import"./GrupperteDokumenter-DsPGGX7h.js";import"./guid-CsArkN6i.js";import"./Accordion-CqVULU8j.js";import"./Header-VJTGWKqA.js";import"./LayoutWrapper-D9OkmHa8.js";import"./StatusTag-Ca5HeW6L.js";import"./Stroller-L1s-D6Xd.js";import"./NoeGikkGalt-uTDNMWhP.js";import"./MinidialogSkjema-BcAX6xO-.js";import"./skjemanummer-Dqwms7hc.js";import"./BekreftelseSendtSøknad-LOta5joo.js";import"./KontonummerInfo-CaJ1U9ru.js";import"./HarIkkeSaker-Dvy8p9tj.js";import"./SøkelenkerPanel-C0qsLMp-.js";import"./HarSaker-Cx7SDofh.js";import"./SakLink-CapL75Op.js";import"./ContentSection-DSnc54em.js";import"./Svangerskapspenger-D5VMTfeQ.js";import"./DinPlan-CDnSwFS9.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BCu297iV.js";import"./OppgaveLenkepanel-qyXhaO5A.js";import"./KontaktOss-fj98O2oM.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
