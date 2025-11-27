import{k as g,j as t}from"./iframe-Co21_CTj.js";import{h as p,H as o}from"./index-yQDMDqcF.js";import{A as i}from"./queries-mrQdKPRl.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-Ck6WONM0.js";import{M as u,R as k,a as S}from"./chunk-TMI4QPZX-D6QGCFIO.js";import"./preload-helper-D9Z9MdNV.js";import"./useBackgroundColor-BoXUzKuM.js";import"./useSelectedSak-BUQsbMdf.js";import"./useQuery-DbQeQiQF.js";import"./sakerUtils-BRFFvRbD.js";import"./Snarveier-DsCZmwaU.js";import"./LenkePanel-DNFC6Fp6.js";import"./index-BVwmsfhv.js";import"./Header-BHiYH7WP.js";import"./LayoutWrapper-Ivavs8fl.js";import"./StatusTag-DvljC4Jt.js";import"./Tag-BEOANQw_.js";import"./Stroller-CfMhHfRz.js";import"./NoeGikkGalt--qZkg0xx.js";import"./skjemanummer-6mFXz7L9.js";import"./MinidialogSkjema-CfkZWCA9.js";import"./HarIkkeSaker-c4klrZqW.js";import"./SøkelenkerPanel-BdDVOFLC.js";import"./HarSaker-Va-vVv5F.js";import"./SakLink-DZBOx5qu.js";import"./guid-CsArkN6i.js";import"./ContentSection-BhaO9SXz.js";import"./BekreftelseSendtSøknad-Dbh3IF3M.js";import"./KontonummerInfo-BOld1t09.js";import"./Accordion-D10vCeXL.js";import"./Svangerskapspenger-Bmb_etRJ.js";import"./DinPlan-Dd-sJUoO.js";import"./Oppgaver-C1nbYQwz.js";import"./OppgaveLenkepanel-UHmeUYEn.js";import"./KontaktOss-xBoUlOVx.js";const Y={title:"EttersendingPage",component:a,decorators:[g],render:m=>{const{skjematypeQueryParamValue:s,...l}=m,d=s?`?skjematype=${s}`:"";return t.jsx(u,{initialEntries:[`/${n.ETTERSEND}/1${d}`],children:t.jsx(k,{children:t.jsx(S,{element:t.jsx(a,{...l}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(JSON.stringify("test-uuid"),{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[p.post(i.lastOppESVedlegg,()=>new o(null,{status:400}))]}},args:e.args};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
