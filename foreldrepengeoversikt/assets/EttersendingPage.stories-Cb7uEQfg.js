import{i as g,j as t}from"./iframe-Lc3OGXsy.js";import{h as o,H as p}from"./index-DIe_NsMR.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Cog4qmLP.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-CV44JBAv.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BGEhOZJs.js";import"./useSelectedSak-T-qJXpJP.js";import"./useQuery-BFnh0Y6v.js";import"./api-Dm-jk1Wa.js";import"./sakerUtils-Bx0qlz1y.js";import"./Snarveier-fTVV_bz0.js";import"./LenkePanel-Cdh00fAS.js";import"./index-SLMkpCDL.js";import"./Dokument-CNUqFVgi.js";import"./dokumenterUtils-Ci-GjdCP.js";import"./Tag-B59OVe05.js";import"./GrupperteDokumenter-CSiLrlO2.js";import"./guid-CsArkN6i.js";import"./Accordion-BoovF1Of.js";import"./Header-qZvOJZZU.js";import"./LayoutWrapper-B3QKQgCW.js";import"./StatusTag-DKz1Zao8.js";import"./Stroller-BGIVo7Ue.js";import"./NoeGikkGalt-DKq9JEXw.js";import"./MinidialogSkjema-CBX0PZFZ.js";import"./skjemanummer-Dyw0X2lt.js";import"./BekreftelseSendtSøknad-BGEu1HsI.js";import"./KontonummerInfo-qFwdGMpD.js";import"./HarIkkeSaker-CnvqGq6G.js";import"./SøkelenkerPanel-DyIXsAXU.js";import"./HarSaker-Dv7MvARM.js";import"./SakLink-BM6-mNqu.js";import"./ContentSection-DJLDj166.js";import"./Svangerskapspenger-BUTS7h96.js";import"./DinPlan-BYyxOSn4.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-H3YDibDu.js";import"./OppgaveLenkepanel-Bn4LUVL9.js";import"./KontaktOss-JfxdvvcY.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
