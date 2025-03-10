import{j as t}from"./jsx-runtime-CLpGMVip.js";import{Q as k}from"./useQuery-D4bRZ7iC.js";import{h as g,H as d}from"./index-B-Pz4-0B.js";import{O as s}from"./routes-DFMVI8wI.js";import{Y as c}from"./Ytelse-7td-ciMh.js";import{E as o}from"./ForeldrepengeoversiktRoutes-Cz5xIdIP.js";import{Q as f}from"./queryClient-DpQYMfvj.js";import{M as E,R as S,a as h}from"./chunk-SYFQ2XB5-D9pMU80H.js";import"./index-CR__hKHy.js";import"./decorators-DIzpaN6C.js";import"./UttaksplanKalender-C-NL-KnI.js";import"./dates-Ch5Wtujs.js";import"./index-DjWdgH6H.js";import"./iframe-D-eaG6Je.js";import"./dateFormValidation-syVzc5Ga.js";import"./Label-vuqQZ1tj.js";import"./useId-CID_lvh_.js";import"./links-B36SqOas.js";import"./VStack-BZkCtxmu.js";import"./message-CzTHpKKo.js";import"./Alert-BICRsfrW.js";import"./Button-DEopYVou.js";import"./composeEventHandlers-BV8udL3-.js";import"./Link-C1mNwB7b.js";import"./File-lmocubeF.js";import"./UttaksdagenString-Du8CFmse.js";import"./HGrid-Bpfn9h1_.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./stønadskontoType-l1GAnwlP.js";import"./_baseIsEqual-Ca4dwh5c.js";import"./stringUtils-xBoGBqui.js";import"./ChevronDown-CtB47T9y.js";import"./Responsive-iNj1KCW0.js";import"./ArrowRight-DNLm8DIc.js";import"./index-BDNcHBiq.js";import"./Accordion-DXsYMTU8.js";import"./Checkmark-DJs5cfYY.js";import"./useBackgroundColor-CjyW9dsS.js";import"./useSelectedSak-cmBlo-Cd.js";import"./api-BLZsujro.js";import"./sakerUtils-DRp6qHjv.js";import"./Snarveier-DefuAefN.js";import"./LenkePanel-DNW8h9lC.js";import"./Dokument-C66cpH-g.js";import"./dokumenterUtils-BgjtbbvA.js";import"./Tag-DiV4T64p.js";import"./GrupperteDokumenter-CFDXKdUr.js";import"./guid-CsArkN6i.js";import"./Header-CoYPX9ez.js";import"./LayoutWrapper-Cvi31uXS.js";import"./StatusTag-ZvFZRO2_.js";import"./Stroller-CHl3Gahh.js";import"./NoeGikkGalt-DspS55ah.js";import"./MinidialogSkjema-DYn_rhtG.js";import"./skjemanummer-DfIZjofp.js";import"./BekreftelseSendtSøknad-D0HA3RFq.js";import"./KontonummerInfo-CVkE-qtF.js";import"./HarIkkeSaker-Druo-yl9.js";import"./SøkelenkerPanel-DeYZZpQ-.js";import"./HarSaker-CgAu66IX.js";import"./SakLink-DQf5Mgo8.js";import"./ContentSection-DqBoVSpP.js";import"./DinPlan-BlBXLzFX.js";import"./DekningsgradDTO-DRRk0ium.js";import"./Oppgaver-B1w6qGyF.js";import"./OppgaveLenkepanel-237Jf-LD.js";import"./KontaktOss-BS4Rot9y.js";const R=new f({defaultOptions:{queries:{retry:!1}}}),Ht={title:"EttersendingPage",component:o,render:u=>t.jsx(k,{client:R,children:t.jsx(E,{initialEntries:[`/${s.ETTERSEND}/1`],children:t.jsx(S,{children:t.jsx(h,{element:t.jsx(o,{...u}),path:`/${s.ETTERSEND}/:saksnummer`})})})})},r={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:c.ENGANGSSTØNAD,saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},e={parameters:{msw:{handlers:[g.post(".//rest/storage/engangsstonad/vedlegg",()=>new d(null,{status:400}))]}},args:r.args};var n,p,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
        ytelse: Ytelse.ENGANGSSTØNAD,
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
}`,...(a=(p=r.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const Qt=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{e as SkalFeileOpplasting,r as SkalIkkeFeileOpplasting,Qt as __namedExportsOrder,Ht as default};
