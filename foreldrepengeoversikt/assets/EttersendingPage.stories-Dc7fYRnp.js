import{i as g,j as t}from"./iframe-B4DvhS-C.js";import{h as o,H as p}from"./index-BTdXeUkd.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-B0Mqul5f.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-C8kCrgCq.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-h6lI1oW5.js";import"./useSelectedSak-DY4okQAb.js";import"./useQuery-_3Tyk20M.js";import"./api-CEfg8NtQ.js";import"./sakerUtils-DWjvxByn.js";import"./Snarveier-Cv3GixdY.js";import"./LenkePanel-CZyNEHn1.js";import"./index-B_qLMfAU.js";import"./Dokument-Da3x8vyL.js";import"./dokumenterUtils-D4lHRRja.js";import"./Tag-WzRfIu_H.js";import"./GrupperteDokumenter-CjTAPtfF.js";import"./guid-CsArkN6i.js";import"./Accordion-Ch8qUFTc.js";import"./Header-CEPxdBj8.js";import"./LayoutWrapper-BDmL2sop.js";import"./StatusTag-DGxH3ae3.js";import"./Stroller-B_c-yBxm.js";import"./NoeGikkGalt-F0umhOPz.js";import"./MinidialogSkjema-Tdd1xYEQ.js";import"./skjemanummer-DGotJGIt.js";import"./BekreftelseSendtSøknad-B6mQig8s.js";import"./KontonummerInfo-kWyfUpOA.js";import"./HarIkkeSaker-BgbViMVj.js";import"./SøkelenkerPanel--tsb97kD.js";import"./HarSaker-a8ENtcQu.js";import"./SakLink-CNfQVuQq.js";import"./ContentSection-DKrWYwn5.js";import"./Svangerskapspenger-9l7ns1Mp.js";import"./DinPlan-DjbFDc02.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CKg8Wd4h.js";import"./OppgaveLenkepanel-CqrmfRqd.js";import"./KontaktOss-C_fikdmx.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
