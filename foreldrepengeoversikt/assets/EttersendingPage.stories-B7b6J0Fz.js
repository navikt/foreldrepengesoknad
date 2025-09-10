import{i as g,j as t}from"./iframe-Cd2Tj3NH.js";import{h as o,H as p}from"./index-BqBZeJ-Y.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-C9wTvAZB.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-Cc0mosp9.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BMbFhnQC.js";import"./useSelectedSak-DXR-hWCE.js";import"./useQuery-DmfVGBwR.js";import"./api-JHGM12Sz.js";import"./sakerUtils-B_mYDItL.js";import"./Snarveier-DXrzxFOk.js";import"./LenkePanel-ivq_3pb3.js";import"./index-BHm3344K.js";import"./Dokument-CP6ZGA3z.js";import"./dokumenterUtils-BrsOyZ9g.js";import"./Tag-Dn9_MYkG.js";import"./GrupperteDokumenter-_eJQa_Kr.js";import"./guid-CsArkN6i.js";import"./Accordion-DZ4UJZmf.js";import"./Header-CErDdS4_.js";import"./LayoutWrapper-kG9wstCi.js";import"./StatusTag-DdJxqSRW.js";import"./Stroller-C9HoKnMv.js";import"./NoeGikkGalt-CNoHtK7s.js";import"./MinidialogSkjema-CXon6TqK.js";import"./skjemanummer-DAz02o9h.js";import"./BekreftelseSendtSøknad-hdDBGOKI.js";import"./KontonummerInfo-DpP9QM0T.js";import"./HarIkkeSaker-D5-O-7Gm.js";import"./SøkelenkerPanel-20DXUWDz.js";import"./HarSaker-BPa7K91r.js";import"./SakLink-CB-Zhme5.js";import"./ContentSection-C2JcKIKm.js";import"./Svangerskapspenger-Byi039XD.js";import"./DinPlan-5m3RhAaC.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-jBtL-jpi.js";import"./OppgaveLenkepanel-Uda2Hd31.js";import"./KontaktOss-BcBeM3ZJ.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
