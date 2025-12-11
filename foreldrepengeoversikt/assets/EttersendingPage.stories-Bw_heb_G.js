import{k as g,j as t}from"./iframe-GxllekYB.js";import{h as p,H as o}from"./index-CGMFkHgn.js";import{A as i}from"./queries-BChmSeD1.js";import{O as n}from"./routes-BgSQQwXh.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Cqz1x0cW.js";import{M as u,R as k,a as S}from"./chunk-WWGJGFF6-DytR9U5C.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-CenlDiMk.js";import"./useSelectedSak-SFPcf27I.js";import"./useQuery-Bw0ApQ6C.js";import"./sakerUtils-CJnfgtA2.js";import"./Snarveier-DBYmg36s.js";import"./LenkePanel-CYjkigtj.js";import"./index-C7Q_IgF1.js";import"./Header-56FNSbi0.js";import"./LayoutWrapper-B9v12AcT.js";import"./StatusTag-CNGaDhRR.js";import"./Tag-D3itlNxi.js";import"./Stroller-DPYm6HHE.js";import"./BabyWrapped-CbyjBFWw.js";import"./NoeGikkGalt-y8Wj-KaV.js";import"./skjemanummer-DFgqw4Ai.js";import"./MinidialogSkjema-laBhWxKs.js";import"./HarIkkeSaker-CkGu7df3.js";import"./SøkelenkerPanel-CG74Fdgm.js";import"./HarSaker-DaWlwf9T.js";import"./SakLink-BQZoWiao.js";import"./guid-CsArkN6i.js";import"./ContentSection-Ck2C2EsH.js";import"./BekreftelseSendtSøknad-6sOo1zX7.js";import"./tidslinjeUtils-BHv-zdWS.js";import"./KontonummerInfo-XYmgH86Q.js";import"./Accordion-BEZ-dZRe.js";import"./Svangerskapspenger-9GiImH6z.js";import"./DinPlan-CaxTltfz.js";import"./Oppgaver-CaHgAToZ.js";import"./OppgaveLenkepanel-C6aSPSYa.js";import"./Tidslinje-CPyq2QYQ.js";import"./Paperplane-BMDD7gfh.js";import"./KontaktOss-BrUzCZfT.js";const re={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const se=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,se as __namedExportsOrder,re as default};
