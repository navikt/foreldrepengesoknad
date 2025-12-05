import{k as g,j as t}from"./iframe-Bp3e24hP.js";import{h as p,H as o}from"./index-BFXzuPhJ.js";import{A as i}from"./queries-DAY86fnV.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-CyjgKWWL.js";import{M as u,R as k,a as S}from"./chunk-4WY6JWTD-DZecOFxc.js";import"./preload-helper-PPVm8Dsz.js";import"./useBackgroundColor-B4n62h5j.js";import"./useSelectedSak-BuJ5Wwrs.js";import"./useQuery-ZsBEE7wQ.js";import"./sakerUtils-BsUg9NeS.js";import"./Snarveier-2rybzzue.js";import"./LenkePanel-Cb3IoTPA.js";import"./index-Dqo1NiLS.js";import"./Header-xJsSyreE.js";import"./LayoutWrapper-DvVKj3mg.js";import"./StatusTag-C4UPAMfY.js";import"./Tag-D_uFJG5Z.js";import"./Stroller-BZ9i74y5.js";import"./NoeGikkGalt-DIQcj7Xe.js";import"./skjemanummer-CkIPvUwF.js";import"./MinidialogSkjema-DTeeZG_g.js";import"./HarIkkeSaker-ufYOmQOo.js";import"./SøkelenkerPanel-CQJTaVTl.js";import"./HarSaker-D_nGuFVD.js";import"./SakLink-CSqXG7Ao.js";import"./guid-CsArkN6i.js";import"./ContentSection-DK8H8Pnq.js";import"./BekreftelseSendtSøknad-CYlwmCVt.js";import"./KontonummerInfo-DLzfWCFe.js";import"./Accordion-Bcq2pTSD.js";import"./Svangerskapspenger-BSQbyVzQ.js";import"./DinPlan-CM74i3bK.js";import"./Oppgaver-C6ETIam8.js";import"./OppgaveLenkepanel-BruDCBFM.js";import"./KontaktOss-D7Pap1uY.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
