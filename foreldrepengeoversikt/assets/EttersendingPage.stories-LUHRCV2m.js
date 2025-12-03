import{k as g,j as t}from"./iframe-DsGsQw9v.js";import{h as p,H as o}from"./index-HpukULMR.js";import{A as i}from"./queries-Bt-SZI59.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BZVF6RoS.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-B41SJznC.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-D-mgyLB_.js";import"./useSelectedSak-BPmWeyAT.js";import"./useQuery-Ce6ZbQu4.js";import"./sakerUtils-DWiB8uaM.js";import"./Snarveier-G89MiYN5.js";import"./LenkePanel-BjO-1Bpl.js";import"./index-C_8GM9F2.js";import"./Header-Br3edl2P.js";import"./LayoutWrapper-109CqojS.js";import"./StatusTag-DzhUhQ2z.js";import"./Tag-BGbxi9pS.js";import"./Stroller-Cpql9gcg.js";import"./NoeGikkGalt-edz6sxgt.js";import"./skjemanummer-EnhMCYbj.js";import"./MinidialogSkjema-YL3OEC6w.js";import"./HarIkkeSaker-D44ZySC6.js";import"./SøkelenkerPanel-BheKuPd5.js";import"./HarSaker-B5VIhajh.js";import"./SakLink-DybhnZgV.js";import"./guid-CsArkN6i.js";import"./ContentSection-3pQl6Ncf.js";import"./BekreftelseSendtSøknad-YuIZzFqz.js";import"./KontonummerInfo-DbJJnXJa.js";import"./Accordion-CtAUmVu5.js";import"./Svangerskapspenger-DXwWuV7K.js";import"./DinPlan-gmDwB-oJ.js";import"./Oppgaver-76n-pfLF.js";import"./OppgaveLenkepanel-CO-wFH1Y.js";import"./KontaktOss-DDBwNror.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
