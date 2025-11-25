import{i as g,j as t}from"./iframe-CqlIMwyD.js";import{h as p,H as o}from"./index-7TZXeNw8.js";import{A as i}from"./queries-BLDsb-vd.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Jv43dgSP.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-CuezIiIy.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-CAv2smT6.js";import"./useSelectedSak-Iy2SXwi5.js";import"./useQuery-NkKsfTLb.js";import"./sakerUtils-_oBy8g7X.js";import"./Snarveier-DwUhN7v9.js";import"./LenkePanel-COZ360NH.js";import"./index-iKKdMve9.js";import"./Header-COF0Q4GT.js";import"./LayoutWrapper-CXVq_r4R.js";import"./StatusTag-DzmNJ2Zf.js";import"./Tag-BAtcE7kH.js";import"./Stroller-BzhEvoIh.js";import"./NoeGikkGalt-Bsq9ym2N.js";import"./skjemanummer-C-dsO8-T.js";import"./MinidialogSkjema-BsqRqDAj.js";import"./HarIkkeSaker-BqD5amSB.js";import"./SøkelenkerPanel-DHPKCd4J.js";import"./HarSaker-D0nflItS.js";import"./SakLink-CVEVKV3K.js";import"./guid-CsArkN6i.js";import"./ContentSection-Cq-USxmB.js";import"./BekreftelseSendtSøknad-o8KjZy8Z.js";import"./KontonummerInfo-DiWlefA0.js";import"./Accordion-c1XjP7mn.js";import"./Svangerskapspenger-CPv6vxR9.js";import"./DinPlan-DmW6liY6.js";import"./Oppgaver-BXtYFvto.js";import"./OppgaveLenkepanel-BPAkre0n.js";import"./KontaktOss-Bd5x5GLF.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(JSON.stringify('test-uuid'), {
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
      handlers: [http.post(API_URLS.lastOppESVedlegg, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...r.parameters?.docs?.source}}};const Z=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,Z as __namedExportsOrder,Y as default};
