import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './PeriodeUttakForm.stories';
import dayjs from 'dayjs';

const {
    NyPeriodeForMorEttBarnDeltUttakINorge,
    NyPeriodeForMorEttBarnFarHarRettIEØS,
    NyPeriodeForFar1BarnDeltUttakINorge,
    NyPeriodeForFar2BarnDeltUttakINorge,
    NyPeriodeFørFødselForFar1BarnDeltUttakINorge,
    NyPeriodeRundtFødselForFar2BarnDeltUttakINorge,
    NyPeriodeForFarEttBarnMorHarRettIEØS,
    NyPeriodeForFarEttBarnMorHarRettIEØSSøkerFørste6Uker,
    NyPeriodeForFarToBarnMorHarRettIEØS,
    NyPeriodeBFHRToBarnFørWLBMorIkkeUfør,
    NyPeriodeBFHRToBarnEtterWLBMorIkkeUfør,
    NyPeriodeForBareFarHarRett,
    NyPeriodeForBareFarHarRettRundtFødsel,
    NyPeriodeFarAleneomssorg,
    NyPeriodeMorAleneomssorg,
} = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';
const TIDSROM = 'Tidsrom';
const FRA_OG_MED = 'Fra og med';
const TIL_OG_MED = 'Til og med';
const VARGHET_PÅ_PERIODEN = 'Varighet på perioden';
const ANTALL_UKER = 'Antall uker';
const ANTALL_DAGER = 'Antall dager';
const HVEM_SKAL_HA_FP = 'Hvem skal ha foreldrepenger?';
const MOR_NAVN = 'Vakker';
const FAR_NAVN = 'Pen';
const HVILKEN_KONTO = 'Hvilken del av foreldrepengene skal du ta ut?';
const HVILKEN_KONTO_ANNEN_FORELDER_MOR = 'Hvilken del av foreldrepengene skal Vakker ta ut?';
const HVILKEN_KONTO_ANNEN_FORELDER_FAR = 'Hvilken del av foreldrepengene skal Pen ta ut?';
const MORS_KVOTE = 'Vakkers kvote';
const FARS_KVOTE = 'Pens kvote';
const FELLESPERIODE = 'Fellesperiode';
const FORELDREPENGER_MED_AKTIVITETSKRAV = 'Foreldrepenger med aktivitetskrav';
const FORELDREPENGER_UTEN_AKTIVITETSKRAV = 'Foreldrepenger';
const FORELDREPENGER = 'Foreldrepenger';
const SAMTIDIG_UTTAK_SPM_MOR = 'Skal Pen ha foreldrepenger i samme periode?';
const SAMTIDIG_UTTAK_SPM_FAR = 'Skal Vakker ha foreldrepenger i samme periode?';
const SAMTIDIG_UTTAK_PROSENT_INPUT = 'Oppgi hvor mange prosent foreldrepenger du skal ta ut';
const DELVIS_ARBEID_SPM = 'Skal du kombinere foreldrepengene med delvis arbeid?';
const JA = 'Ja';
const NEI = 'Nei';
const OPPGI_STILLINGSPROSENT_INPUT = 'Oppgi stillingsprosenten du skal jobbe';
const HVOR_JOBBE = 'Hvor skal du jobbe?';
const FABRIKK_AS = 'Fabrikk AS';
const SELVSTENDING = 'Selvstendig næringsdrivende';
const FRILANS = 'Frilans';
const LEGG_TIL = 'Legg til';
const HVORFOR_OVERTA_FARS_KVOTE_SPM = 'Hvorfor skal du overta Pens kvote?';
const HVORFOR_OVERTA_MORS_KVOTE_SPM = 'Hvorfor skal du overta Vakkers kvote?';
const FAR_INNLAGT = 'Pen er innlagt på helseinstitusjon';
const FAR_FOR_SYK = 'Pen er for syk til å ta seg av barnet';
const MOR_INNLAGT = 'Vakker er innlagt på helseinstitusjon';
const MOR_FOR_SYK = 'Vakker er for syk til å ta seg av barnet';
const AKTIVIET_MOR_SPM = 'Hva skal Vakker gjøre i denne perioden?';
const ARBEID = 'Arbeid';
const UTDANNING = 'Utdanning';
const SAMTIDIG_UTTAK_RUNDT_FØDSEL_SPM = 'Ønsker du å ta ut foreldrepenger rundt fødselen samtidig med mor?';
const FLERBARNSDAGER_SPM = 'Ønsker du å benytte deg av flerbarnsdagene?';
const ER_MOR_FOR_SYK_SPM = 'Er mor for syk til å ta seg av barnet eller innlagt i helseinstitusjon?';
const FAR_ER_FOR_SYK_DOKUMENTASJON_INFO = 'Når Pen er syk må legen dokumentere at Pen er helt avhengig av hjelp';
const MOR_ER_FOR_SYK_DOKUMENTASJON_INFO = 'Når Vakker er syk må legen dokumentere at Vakker er helt avhengig av hjelp';
const MOR_ER_FOR_SYK_DOKUMENTASJON = 'Last opp dokumentasjon for mors sykdom';
const NEI_MOR_ER_SYK_ELLER_INNLAGT = 'Nei, mor er syk eller innlagt helseinstitusjon';
const INFO_OM_UTTAK_RUNDT_FØDSEL = 'Du har 10 dager som du kan ta ut av din egen kvote rundt fødselen';

describe('PeriodeUttakForm - tidsrom input', () => {
    it('skal ikke kunne gå videre uten å skrive inn tom', async () => {
        render(<NyPeriodeForMorEttBarnDeltUttakINorge />);
        expect(await screen.findByText(TIDSROM)).toBeInTheDocument();
        expect(await screen.findByText(FRA_OG_MED)).toBeInTheDocument();
        expect(await screen.findByText(TIL_OG_MED)).toBeInTheDocument();
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(
            await screen.findByText('Til og med dato må være en gyldig dato på formatet dd.mm.åååå')
        ).toBeInTheDocument();
    });
    it('skal ikke kunne gå videre med tom som er før fom', async () => {
        render(<NyPeriodeForMorEttBarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2021-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(
            await screen.findByText('Du må legge inn en fra og med dato som er før til og med datoen.')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Til og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er', {
                exact: false,
            })
        ).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Mor søker, 1 barn, delt uttak i Norge', () => {
    it('mor skal kunne legge til sin egen kvote med samtidig uttak og delvis arbeid', async () => {
        render(<NyPeriodeForMorEttBarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(await screen.findByText(VARGHET_PÅ_PERIODEN)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_UKER)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_DAGER)).toBeInTheDocument();

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(await screen.findByText(MOR_NAVN)).toBeInTheDocument();
        expect(await screen.findByText(FAR_NAVN)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MOR_NAVN));

        //Skal kunne besvare hvilken konto hun ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MORS_KVOTE));

        //Skal kunne legge inn samtidig uttak med far i perioden
        expect(await screen.findByText(SAMTIDIG_UTTAK_SPM_MOR)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[0]);
        expect(
            await screen.findByText('Dere kan ta ut inntil 100 prosent foreldrepenger til sammen', { exact: false })
        ).toBeInTheDocument();
        expect(await screen.findByText(SAMTIDIG_UTTAK_PROSENT_INPUT)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        const samtidigUttakInput = screen.getByLabelText(SAMTIDIG_UTTAK_PROSENT_INPUT);
        await userEvent.type(samtidigUttakInput, '50');

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(await screen.findByText(OPPGI_STILLINGSPROSENT_INPUT)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        const prosentInput = screen.getByLabelText(OPPGI_STILLINGSPROSENT_INPUT);
        await userEvent.type(prosentInput, '60');
        expect(await screen.findByText(HVOR_JOBBE)).toBeInTheDocument();
        expect(await screen.findByText(FABRIKK_AS)).toBeInTheDocument();
        expect(await screen.findByText(SELVSTENDING)).toBeInTheDocument();
        expect(await screen.findByText(FRILANS)).toBeInTheDocument();
        expect(await screen.findByText(FRILANS)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FABRIKK_AS));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('mor skal kunne legge til uttak til far av fars kvote eller fellesperiode', async () => {
        render(<NyPeriodeForMorEttBarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_NAVN));

        //Skal kunne besvare at far ønsker fedrekvote
        expect(await screen.findByText(HVILKEN_KONTO_ANNEN_FORELDER_FAR)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal kunne besvare at far ønsker fellesperiode
        await userEvent.click(screen.getByText(FELLESPERIODE));
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('mor skal kunne legge til overføring av fars kvote', async () => {
        render(<NyPeriodeForMorEttBarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MOR_NAVN));

        //Skal kunne besvare at far ønsker fedrekvote
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal måtte oppgi grunn til overføring
        expect(await screen.findByText(HVORFOR_OVERTA_FARS_KVOTE_SPM)).toBeInTheDocument();
        expect(await screen.findByText(FAR_INNLAGT)).toBeInTheDocument();
        expect(await screen.findByText(FAR_FOR_SYK)).toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_INNLAGT));
        expect(await screen.findByText(FAR_ER_FOR_SYK_DOKUMENTASJON_INFO, { exact: false })).toBeInTheDocument();

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, 1 barn, delt uttak i Norge', () => {
    it('far skal kunne legge til sin egen kvote med samtidig uttak og delvis arbeid', async () => {
        render(<NyPeriodeForFar1BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(await screen.findByText(VARGHET_PÅ_PERIODEN)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_UKER)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_DAGER)).toBeInTheDocument();

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(await screen.findByText(MOR_NAVN)).toBeInTheDocument();
        expect(await screen.findByText(FAR_NAVN)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_NAVN));

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal kunne legge inn samtidig uttak med mor i perioden
        expect(await screen.findByText(SAMTIDIG_UTTAK_SPM_FAR)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[0]);
        expect(
            await screen.findByText('Dere kan ta ut inntil 100 prosent foreldrepenger til sammen', { exact: false })
        ).toBeInTheDocument();
        expect(await screen.findByText(SAMTIDIG_UTTAK_PROSENT_INPUT)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        const samtidigUttakInput = screen.getByLabelText(SAMTIDIG_UTTAK_PROSENT_INPUT);
        await userEvent.type(samtidigUttakInput, '10');

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);
        expect(await screen.findByText(OPPGI_STILLINGSPROSENT_INPUT)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        const prosentInput = screen.getByLabelText(OPPGI_STILLINGSPROSENT_INPUT);
        await userEvent.type(prosentInput, '70');
        expect(await screen.findByText(HVOR_JOBBE)).toBeInTheDocument();
        expect(await screen.findByText(FABRIKK_AS)).toBeInTheDocument();
        expect(await screen.findByText(SELVSTENDING)).toBeInTheDocument();
        expect(await screen.findByText(FRILANS)).toBeInTheDocument();
        expect(await screen.findByText(FRILANS)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FABRIKK_AS));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('far skal kunne legge mors uttak', async () => {
        render(<NyPeriodeForFar1BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MOR_NAVN));

        //Skal kunne besvare hvilken konto mor skal å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO_ANNEN_FORELDER_MOR)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MORS_KVOTE));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('far skal kunne legge til overføring av mors kvote til seg selv', async () => {
        render(<NyPeriodeForFar1BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_NAVN));

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MORS_KVOTE));

        //Skal måtte oppgi grunn til overføring
        expect(await screen.findByText(HVORFOR_OVERTA_MORS_KVOTE_SPM)).toBeInTheDocument();
        expect(await screen.findByText(MOR_FOR_SYK)).toBeInTheDocument();
        expect(await screen.findByText(MOR_INNLAGT)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MOR_FOR_SYK));
        expect(await screen.findByText(MOR_ER_FOR_SYK_DOKUMENTASJON_INFO, { exact: false })).toBeInTheDocument();

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('far skal kunne legge til periode før fødsel', async () => {
        render(<NyPeriodeFørFødselForFar1BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-01')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, 2 barn, delt uttak i Norge', () => {
    it('skal kunne legge til sin egen kvote med flerbarnsdager, samtidig uttak, og delvis arbeid, fra 7. uke etter fødsel', async () => {
        render(<NyPeriodeForFar2BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(await screen.findByText(VARGHET_PÅ_PERIODEN)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_UKER)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_DAGER)).toBeInTheDocument();

        //Skal kunne besvare hvem som skal ta ut foreldrepenger i perioden
        expect(await screen.findByText(HVEM_SKAL_HA_FP)).toBeInTheDocument();
        expect(await screen.findByText(MOR_NAVN)).toBeInTheDocument();
        expect(await screen.findByText(FAR_NAVN)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_NAVN));

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal bli spurt om bruk av flerbarnsdager
        expect(await screen.findByText(FLERBARNSDAGER_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI));

        //Skal kunne legge inn samtidig uttak med mor i perioden
        expect(await screen.findByText(SAMTIDIG_UTTAK_SPM_FAR)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[1]);

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[2]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kunne legge til sin egen kvote rundt fødsel med samtidig uttak, flerbarnsdager og delvis arbeid', async () => {
        render(<NyPeriodeRundtFødselForFar2BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-02')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));
        expect(await screen.findByText(VARGHET_PÅ_PERIODEN)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_UKER)).toBeInTheDocument();
        expect(await screen.findByText(ANTALL_DAGER)).toBeInTheDocument();

        //Skal ikke bli spurt om  hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal kunne legge inn samtidig uttak med mor i perioden
        expect(await screen.findByText(SAMTIDIG_UTTAK_RUNDT_FØDSEL_SPM)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(JA));
        expect(
            await screen.findByText(INFO_OM_UTTAK_RUNDT_FØDSEL, {
                exact: false,
            })
        ).toBeInTheDocument();

        //Skal bli spurt om bruk av flerbarnsdager
        expect(await screen.findByText(FLERBARNSDAGER_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[1]);

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[1]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kunne legge til sin egen kvote rundt fødsel uten samtidig uttak fordi mor er syk', async () => {
        render(<NyPeriodeRundtFødselForFar2BarnDeltUttakINorge />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-02')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal ikke bli spurt om  hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal kunne legge inn samtidig uttak med mor i perioden
        expect(await screen.findByText(SAMTIDIG_UTTAK_RUNDT_FØDSEL_SPM)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI_MOR_ER_SYK_ELLER_INNLAGT));

        //Skal da ikke bli spurt om bruk av flerbarnsdager
        expect(screen.queryByText(FLERBARNSDAGER_SPM)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getByText(NEI));

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, bare far har rett', () => {
    it('skal kun vise relevante spørsmål når far velger kvote med aktivitetskrav', async () => {
        render(<NyPeriodeForBareFarHarRett />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_MED_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER_MED_AKTIVITETSKRAV));

        //Skal måtte legge inn mors aktivitet
        expect(await screen.findByText(AKTIVIET_MOR_SPM)).toBeInTheDocument();
        const grunnInput = screen.getByLabelText(AKTIVIET_MOR_SPM, { exact: false });
        await userEvent.selectOptions(grunnInput, UTDANNING);
        expect(
            await screen.findByText('Du må legge ved bekreftelse på at Vakker er fulltidsstudent', { exact: false })
        ).toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål når far velger kvote uten aktivitetskrav', async () => {
        render(<NyPeriodeForBareFarHarRett />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_MED_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV));

        //Skal ikke måtte legge inn mors aktivitet
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål når far søker rundt fødsel', async () => {
        render(<NyPeriodeForBareFarHarRettRundtFødsel />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-05')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_MED_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV));

        //Skal ikke måtte legge inn mors aktivitet
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal kunne velge konto uten aktivitetskrav og si at mor ikke er for syk og legge til
        await userEvent.click(screen.getByText(FORELDREPENGER_MED_AKTIVITETSKRAV));
        expect(await screen.findByText(ER_MOR_FOR_SYK_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(screen.queryByText(DELVIS_ARBEID_SPM)).not.toBeInTheDocument();
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal bli spurt om delvis arbied hvis svarer ja på at mor er for syk
        await userEvent.click(screen.getAllByText(JA)[0]);
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});
describe('PeriodeUttakForm - Far søker, bare far har rett, 2 barn, mor ikke ufør, før WLB', () => {
    it('skal kunne si ja til flerbarnsdager som utgjør foreldrepenger uten aktivitetskrav, og da ikke bli spurt om mors aktivitet. Hvis sier nei til flerbanrsdager, skal bli spurt om mor er for syk.', async () => {
        render(<NyPeriodeBFHRToBarnFørWLBMorIkkeUfør />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-08')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_MED_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER_MED_AKTIVITETSKRAV));

        //Skal bli spurt om bruk av flerbarnsdager
        expect(await screen.findByText(FLERBARNSDAGER_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[0]);

        //Skal ikke måtte legge inn mors aktivitet
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[1]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Hvis svarer nei på flerbarnsdager...
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal bli spurt om mor er for syk
        expect(await screen.findByText(ER_MOR_FOR_SYK_SPM)).toBeInTheDocument();

        //Hvis sier at mor er for syk...
        await userEvent.click(screen.getAllByText(JA)[1]);

        //Skal be om dokumentasjon når mor er for syk:
        expect(await screen.findByText(MOR_ER_FOR_SYK_DOKUMENTASJON_INFO, { exact: false })).toBeInTheDocument();
        expect(await screen.findByText(MOR_ER_FOR_SYK_DOKUMENTASJON)).toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[2]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Hvis sier at mor ikke er for syk...
        await userEvent.click(screen.getAllByText(NEI)[1]);

        //Skal ikke måtte svare på flere spørsmål fordi far skal ikke kunne ta ut denne perioden med mindre mor er syk og validering vil vise feilmelding under planen.
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();
        expect(screen.queryByText(DELVIS_ARBEID_SPM)).not.toBeInTheDocument();

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, bare far har rett, 2 barn, mor ikke ufør, etter WLB', () => {
    it('skal vise relevante spørsmål, og ikke stille spørsmål om flerbarnsdager siden to kvoter med og uten aktivitetskrav finnes', async () => {
        render(<NyPeriodeBFHRToBarnEtterWLBMorIkkeUfør />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-15')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_MED_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER_MED_AKTIVITETSKRAV));

        //Skal måtte legge inn mors aktivitet
        expect(await screen.findByText(AKTIVIET_MOR_SPM)).toBeInTheDocument();
        const grunnInput = screen.getByLabelText(AKTIVIET_MOR_SPM, { exact: false });
        await userEvent.selectOptions(grunnInput, UTDANNING);
        expect(
            await screen.findByText('Du må legge ved bekreftelse på at Vakker er fulltidsstudent', { exact: false })
        ).toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal ikke bli spurt om bruk av flerbarnsdager
        expect(screen.queryByText(FLERBARNSDAGER_SPM)).not.toBeInTheDocument();

        //Hvis endrer til foreldrepenger uten aktivitetskrav...
        await userEvent.click(screen.getByText(FORELDREPENGER_UTEN_AKTIVITETSKRAV));

        //Skal ikke måtte legge inn mors aktivitet
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal ikke bli spurt om bruk av flerbarnsdager
        expect(screen.queryByText(FLERBARNSDAGER_SPM)).not.toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, aleneomsorg', () => {
    it('skal kun vise relevante spørsmål når far har aleneomsorg', async () => {
        render(<NyPeriodeFarAleneomssorg />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER));

        //Skal ikke måtte legge inn mors aktivitet
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Mor søker, aleneomsorg', () => {
    it('skal kun vise relevante spørsmål når mor har aleneomsorg', async () => {
        render(<NyPeriodeMorAleneomssorg />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto hun ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(FORELDREPENGER)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FORELDREPENGER));

        //Skal ikke bli spurt om samtidig uttak i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Mor søker, 1 barn, far har kun rett i EØS', () => {
    it('skal kun vise relevante spørsmål for mor når hun velger sin kvote', async () => {
        render(<NyPeriodeForMorEttBarnFarHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto hun ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MORS_KVOTE));

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål for mor når hun ønsker å ta ut fars kvote', async () => {
        render(<NyPeriodeForMorEttBarnFarHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto hun ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal måtte svare på grunn til overtagelse av fars kvote
        expect(await screen.findByText(HVORFOR_OVERTA_FARS_KVOTE_SPM)).toBeInTheDocument();
        expect(await screen.findByText(FAR_INNLAGT)).toBeInTheDocument();
        expect(await screen.findByText(FAR_FOR_SYK)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FAR_FOR_SYK));
        expect(
            await screen.findByText('Når Pen er syk må legen dokumentere at', {
                exact: false,
            })
        );

        //Skal ikke så spm om delvis arbeid
        expect(screen.queryByText(DELVIS_ARBEID_SPM)).not.toBeInTheDocument();

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål for mor når hun velger fellesperiode', async () => {
        render(<NyPeriodeForMorEttBarnFarHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto hun ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        await userEvent.click(screen.getByText(FELLESPERIODE));

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});

describe('PeriodeUttakForm - Far søker, 1 barn, mor har kun rett i EØS', () => {
    it('skal kun vise relevante spørsmål når far velger sin kvote', async () => {
        render(<NyPeriodeForFarEttBarnMorHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(await screen.findByText(MORS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FARS_KVOTE)).toBeInTheDocument();
        expect(await screen.findByText(FELLESPERIODE)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål når far ønsker å ta ut fars kvote', async () => {
        render(<NyPeriodeForFarEttBarnMorHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MORS_KVOTE));

        //Skal måtte svare på grunn til overtagelse av fars kvote
        expect(await screen.findByText(HVORFOR_OVERTA_MORS_KVOTE_SPM)).toBeInTheDocument();
        expect(await screen.findByText(MOR_INNLAGT)).toBeInTheDocument();
        expect(await screen.findByText(MOR_FOR_SYK)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(MOR_INNLAGT));
        expect(
            await screen.findByText('Når Vakker er syk må legen dokumentere at', {
                exact: false,
            })
        );

        //Skal ikke så spm om delvis arbeid
        expect(screen.queryByText(DELVIS_ARBEID_SPM)).not.toBeInTheDocument();

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål med aktivitetskrav for mor når far velger fellesperiode', async () => {
        render(<NyPeriodeForFarEttBarnMorHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        await userEvent.click(screen.getByText(FELLESPERIODE));

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal måtte svare om mors aktivitet
        expect(await screen.findByText(AKTIVIET_MOR_SPM, { exact: false })).toBeInTheDocument();
        const grunnInput = screen.getByLabelText(AKTIVIET_MOR_SPM, { exact: false });
        await userEvent.selectOptions(grunnInput, ARBEID);

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal vise relevante spørsmål når far legger til periode rundt fødsel', async () => {
        render(<NyPeriodeForFarEttBarnMorHarRettIEØSSøkerFørste6Uker />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-08-05')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal måtte svar om grunn til uttak rundt fødsel
        expect(await screen.findByText(SAMTIDIG_UTTAK_RUNDT_FØDSEL_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(JA)[0]);

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
});
describe('PeriodeUttakForm - Far søker, 2 barn, mor har kun rett i EØS', () => {
    it('skal kun vise relevante spørsmål for far når det er to barn og far legger til fedrekvote', async () => {
        render(<NyPeriodeForFarToBarnMorHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FARS_KVOTE));

        //Skal ikke bli spurt om å bruke flerbarnsdager
        expect(screen.queryByText(FLERBARNSDAGER_SPM)).not.toBeInTheDocument();

        //Skal ikke bli spurt om samtidig uttak med far i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();
    });
    it('skal kun vise relevante spørsmål for far når det er to barn og far legger til fellesperiode', async () => {
        render(<NyPeriodeForFarToBarnMorHarRettIEØS />);
        const tomDagInput = screen.getByLabelText(TIL_OG_MED);
        await userEvent.type(tomDagInput, dayjs(new Date('2022-09-23')).format('DD.MM.YYYY'));
        await userEvent.tab();
        await userEvent.click(screen.getByText(GÅ_VIDERE_KNAPP));

        //Skal slippe å besvare hvem som skal ta ut foreldrepenger i perioden
        expect(screen.queryByText(HVEM_SKAL_HA_FP)).not.toBeInTheDocument();

        //Skal kunne besvare hvilken konto han ønsker å ta ut i perioden
        expect(await screen.findByText(HVILKEN_KONTO)).toBeInTheDocument();
        expect(screen.queryByText(LEGG_TIL)).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(FELLESPERIODE));

        //Skal bli spurt om flerbarnsdager
        expect(await screen.findByText(FLERBARNSDAGER_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[0]);

        //Skal ikke bli spurt om samtidig uttak med mor i perioden
        expect(screen.queryByText(SAMTIDIG_UTTAK_SPM_MOR)).not.toBeInTheDocument();

        //Skal bli spurt om mors aktivitet
        expect(await screen.findByText(AKTIVIET_MOR_SPM)).toBeInTheDocument();
        const grunnInput = screen.getByLabelText(AKTIVIET_MOR_SPM, { exact: false });
        await userEvent.selectOptions(grunnInput, ARBEID);

        //Skal kunne legge inn informasjon om delvis arbeid
        expect(await screen.findByText(DELVIS_ARBEID_SPM)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(NEI)[1]);

        //Skal kunne legge til perioden.
        expect(await screen.findByText(LEGG_TIL)).toBeInTheDocument();

        //Skal ikke bli spurt om mors aktivitet hvis svaer ja på bruk av flerbarnsdager
        await userEvent.click(screen.getAllByText(JA)[0]);
        expect(screen.queryByText(AKTIVIET_MOR_SPM)).not.toBeInTheDocument();
    });
});
