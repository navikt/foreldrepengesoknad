import{i as g,j as t}from"./iframe-BZrgh5jQ.js";import{h as o,H as p}from"./index-FKle5ceY.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-wAZgKRWO.js";import{M as d,R as u,a as k}from"./chunk-UH6JLGW7-ChtpLkAJ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DBjo82Ln.js";import"./useSelectedSak-BhprsWVO.js";import"./useQuery-BjmDcNMg.js";import"./api-B5VuMeTq.js";import"./sakerUtils-1w7b2_ow.js";import"./Snarveier-C5eD-IAu.js";import"./LenkePanel-CWFxBU4Q.js";import"./index-dEEAKM2K.js";import"./Dokument-MUYTjkzk.js";import"./dokumenterUtils-C556EEBZ.js";import"./Tag-CrvcYn81.js";import"./GrupperteDokumenter-aV_b68xU.js";import"./guid-CsArkN6i.js";import"./Accordion-DxINW8xC.js";import"./Header-CK0kSAtv.js";import"./LayoutWrapper-VEAtacyh.js";import"./StatusTag-ozOXntCF.js";import"./Stroller-CE6A9xAD.js";import"./NoeGikkGalt-DdO6-8ex.js";import"./MinidialogSkjema-BNzOZc6p.js";import"./skjemanummer-BmOfeeJq.js";import"./BekreftelseSendtSøknad-CJR2Ajqe.js";import"./KontonummerInfo-_QoGV4dW.js";import"./HarIkkeSaker-D2-YhNBD.js";import"./SøkelenkerPanel-CvSqNJ2C.js";import"./HarSaker-DseNG2k-.js";import"./SakLink-BtQbwNm9.js";import"./ContentSection-BLFXGhNE.js";import"./Svangerskapspenger-DHA7lbhE.js";import"./DinPlan-CiJxsC7V.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-Cv486UU6.js";import"./OppgaveLenkepanel-kGrcAkcv.js";import"./KontaktOss-lOURIndD.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
