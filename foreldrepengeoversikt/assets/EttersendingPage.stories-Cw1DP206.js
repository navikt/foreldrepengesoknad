import{k as g,j as t}from"./iframe-C0R_477Z.js";import{h as p,H as o}from"./index-Ds3UyqQV.js";import{A as i}from"./queries-DRMr9xHm.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DrjUQXTq.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-DQpDkLTJ.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-Ccw6l7bl.js";import"./useSelectedSak-BAHppzTV.js";import"./useQuery-DR1U2mtr.js";import"./sakerUtils-BAkqT1XW.js";import"./Snarveier-9XvrVtA_.js";import"./LenkePanel-C874mWeL.js";import"./index-CIijIYK0.js";import"./Header-vNUrMwli.js";import"./LayoutWrapper-D0oAnIac.js";import"./StatusTag-CBXVt74q.js";import"./Tag-DkrWPVfl.js";import"./Stroller-DycvbsIT.js";import"./NoeGikkGalt-D7bECneX.js";import"./skjemanummer-DctC70Cl.js";import"./MinidialogSkjema-BgHRgna9.js";import"./HarIkkeSaker-DtA5A6n2.js";import"./SøkelenkerPanel-BQzdMZVs.js";import"./HarSaker-DsgQjhPe.js";import"./SakLink-B08wp0Xx.js";import"./guid-CsArkN6i.js";import"./ContentSection-CUXwMpaj.js";import"./BekreftelseSendtSøknad-Krzm3tfw.js";import"./KontonummerInfo-B1curDGR.js";import"./Accordion-TYSykiay.js";import"./Svangerskapspenger-BhsqLaDt.js";import"./DinPlan-CHqVopfO.js";import"./Oppgaver-BXsGUhFx.js";import"./OppgaveLenkepanel-BtQW8azI.js";import"./KontaktOss-BarQqmV_.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
