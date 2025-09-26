import{i as g,j as t}from"./iframe-BWhq4fyu.js";import{h as o,H as p}from"./index-_7JYSoCF.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DKpZqzry.js";import{M as d,R as u,a as k}from"./chunk-TMI4QPZX-DoQKGFxJ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BppmhGXD.js";import"./useSelectedSak-Dwu7lkyh.js";import"./useQuery-KYWYe_x7.js";import"./api-RiahO2Kf.js";import"./sakerUtils-DuAQIJVe.js";import"./Snarveier-BGQiscSq.js";import"./LenkePanel-B2YseVyy.js";import"./index-yBHUajFG.js";import"./Dokument-buIwdCdY.js";import"./dokumenterUtils-C1uR4-Nk.js";import"./Tag-5QvliXKx.js";import"./GrupperteDokumenter-kh7bYGf_.js";import"./guid-CsArkN6i.js";import"./Accordion-CjOkC4XT.js";import"./Header-C1AtOBny.js";import"./LayoutWrapper-DSrwuGWK.js";import"./StatusTag-gx__LYeY.js";import"./Stroller-D5Y-Ajoi.js";import"./NoeGikkGalt-Cjh40HUl.js";import"./MinidialogSkjema-C8jx-ce5.js";import"./skjemanummer-jSDbEOpT.js";import"./BekreftelseSendtSøknad-W1qtU87n.js";import"./KontonummerInfo-DsoLnkEj.js";import"./HarIkkeSaker-BV89EtfZ.js";import"./SøkelenkerPanel-5s1ZnJYD.js";import"./HarSaker-tbxxB0Ps.js";import"./SakLink-DXsw_ChO.js";import"./ContentSection-Cb9ubSTK.js";import"./Svangerskapspenger-9_YCMMtx.js";import"./DinPlan-J2IgUr4H.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BPPZzKrC.js";import"./OppgaveLenkepanel-BimFY_sm.js";import"./KontaktOss-BjgAtnC1.js";const te={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...i}=m,l=s?`?skjematype=${s}`:"";return t.jsx(d,{initialEntries:[`/${n.ETTERSEND}/1${l}`],children:t.jsx(u,{children:t.jsx(k,{element:t.jsx(a,{...i}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[o.post(".//rest/storage/engangsstonad/vedlegg",()=>new p(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
