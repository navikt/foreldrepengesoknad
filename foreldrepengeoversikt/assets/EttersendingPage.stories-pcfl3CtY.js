import{i as g,j as t}from"./iframe-Baoq88Fe.js";import{h as o,H as p}from"./index-DblHznge.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Brs2U7ui.js";import{M as d,R as u,a as k}from"./chunk-EF7DTUVF-BvOFs0KQ.js";import"./useBackgroundColor-BRvgRZfE.js";import"./useSelectedSak-rGpYydVI.js";import"./useQuery-D1YKbV9M.js";import"./api-hQm1_me2.js";import"./sakerUtils-6UWt1QJM.js";import"./Snarveier-kd57qi5l.js";import"./LenkePanel-DaEnUprO.js";import"./Dokument-CdDZWZt2.js";import"./dokumenterUtils-DRdq1CND.js";import"./Tag-l7ulZf3T.js";import"./GrupperteDokumenter-DQhFXVdC.js";import"./guid-CsArkN6i.js";import"./Header-Ymuv3e6o.js";import"./LayoutWrapper-BlZ0ES8X.js";import"./StatusTag-Ddy2CxUY.js";import"./Stroller-D2Uc72ma.js";import"./NoeGikkGalt-C5i3H-SN.js";import"./MinidialogSkjema-nyQsl2RO.js";import"./skjemanummer-B4VNiHIk.js";import"./BekreftelseSendtSøknad-BKoT9TZl.js";import"./KontonummerInfo-BBqLX_UL.js";import"./HarIkkeSaker-DQgtHPZe.js";import"./SøkelenkerPanel-C6WFfGvU.js";import"./HarSaker-B5xJRSmR.js";import"./SakLink-7DpP9Gsr.js";import"./ContentSection-BHScy55T.js";import"./Svangerskapspenger-Dr_F6G9k.js";import"./DinPlan-CiyFkbh3.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-CR3XMza5.js";import"./OppgaveLenkepanel-BQ8FFNi8.js";import"./KontaktOss-BqoKCqx7.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
