import{i as g,j as t}from"./iframe-P9QrP3sI.js";import{h as p,H as o}from"./index-Cg2sjMYy.js";import{A as i}from"./queries-EA72RiMj.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BJ33Cx-R.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-4pqwKFXP.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-DLw4CB31.js";import"./useSelectedSak-oxVKSkmt.js";import"./useQuery-DJqSohq6.js";import"./sakerUtils-Cc1-7A0k.js";import"./Snarveier-Cf--jgEX.js";import"./LenkePanel-CE1A1bhO.js";import"./index-CqKvw51r.js";import"./Header-C6zQ1QAf.js";import"./LayoutWrapper-BKqdiCe5.js";import"./StatusTag-CYOXUQOH.js";import"./Tag-O9HttJm_.js";import"./Stroller-D5NgLZm8.js";import"./NoeGikkGalt-b3eNVIJL.js";import"./skjemanummer-B9ZFSeQS.js";import"./MinidialogSkjema-Bd7iglsN.js";import"./HarIkkeSaker-CD2_5rB1.js";import"./SøkelenkerPanel-DwizuJz6.js";import"./HarSaker-Drni6QyL.js";import"./SakLink-DR2Ir7P0.js";import"./guid-CsArkN6i.js";import"./ContentSection-C9LIUnEj.js";import"./BekreftelseSendtSøknad-CKFCR0A3.js";import"./KontonummerInfo-CfU3kcrv.js";import"./Accordion-CWRzvxp0.js";import"./Svangerskapspenger-Gxp_3ITB.js";import"./DinPlan-CCp52oX4.js";import"./Oppgaver-4ZvJ4etD.js";import"./OppgaveLenkepanel-CkkAMenz.js";import"./KontaktOss-D0M5zDpy.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
