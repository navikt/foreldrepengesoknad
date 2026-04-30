import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { VedleggDataType } from 'types/VedleggDataType';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { VStack } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import {
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { useErAntallDagerOvertrukketIUttaksplan } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { AutomatiskJusteringSpørsmål, skalViseAutomatiskJustering } from './AutomatiskJusteringSpørsmål';
import { VilDuGåTilbakeModal } from './VilDuGåTilbakeModal';
import { validerUttaksplanForInnsending } from './utils/validerUttaksplan';

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

const NULLSTILTE_PERIODE_VEDLEGG: VedleggDataType = {
    [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [],
    [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [],
    [Skjemanummer.DOK_SYKDOM_MOR]: [],
    [Skjemanummer.DOK_SYKDOM_FAR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_BARN]: [],
    [Skjemanummer.DOK_INNLEGGELSE_MOR]: [],
    [Skjemanummer.DOK_INNLEGGELSE_FAR]: [],
    [Skjemanummer.DOK_ARBEID_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_MOR]: [],
    [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [],
};

type FormValues = {
    ønskerJustertUttakVedFødsel?: boolean;
};

interface UttaksplanFormProps {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    /** Den planen som faktisk vises (mellomlagra plan om den finst, ellers initiell). */
    gjeldendeUttaksplan: AlleUttakPerioder[];
    /** Initiell plan, brukt som fallback for lagring viss brukar ikkje har endra noko. */
    initiellPlan: AlleUttakPerioder[];
    /** Sann om brukar har ein mellomlagra plan i context. Styrer vis-tilbake-modal og lagringslogikk. */
    harMellomlagretPlan: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    setFeilmelding: (melding: ReactNode) => void;
    scrollToKvoteOppsummering: () => void;
    eksisterendeSak: FpSak_fpoversikt | undefined;
    /** Plan henta frå eksisterande sak, brukt for å avgjere om brukar berre har sletta saksperiodar. */
    planFraEksisterendeSak: AlleUttakPerioder[] | undefined;
}

export const UttaksplanForm = ({
    søkerInfo,
    gjeldendeUttaksplan,
    initiellPlan,
    harMellomlagretPlan,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    setFeilmelding,
    scrollToKvoteOppsummering,
    eksisterendeSak,
    planFraEksisterendeSak,
}: UttaksplanFormProps) => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const harJustertUttakVedFødsel = useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const oppdaterHarJustertUttakVedFødsel = useContextSaveData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);

    const erEndringssøknad = !!valgtEksisterendeSaksnr;

    // I ein endringssøknad er det berre dei nye periodane (utan resultat frå vedtak) som skal brukast
    // til validering og visning av automatisk justering.
    const planForValidering = erEndringssøknad
        ? gjeldendeUttaksplan.filter((p) => Uttaksperioden.erIkkeEøsPeriode(p) && p.resultat === undefined)
        : gjeldendeUttaksplan;

    const navigator = useFpNavigator(
        søkerInfo.arbeidsforhold,
        mellomlagreSøknadOgNaviger,
        erEndringssøknad,
        eksisterendeSak,
    );

    const formMethods = useForm<FormValues>({
        defaultValues: {
            ønskerJustertUttakVedFødsel: harJustertUttakVedFødsel,
        },
    });

    const harSvartJaPåAutoJustering = !!formMethods.watch('ønskerJustertUttakVedFødsel');

    const erAntallDagerOvertrukket = useErAntallDagerOvertrukketIUttaksplan();

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erDeltUttak =
        oppgittAnnenForelder?.harRettPåForeldrepengerINorge === true ||
        oppgittAnnenForelder?.harRettPåForeldrepengerIEØS === true;
    const erMorUfør = getErMorUfør(annenForelder, erSøkerFarEllerMedmor);
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;
    const bareFarHarRett = erSøkerFarEllerMedmor && (!erDeltUttak || erMorUfør || erAleneOmOmsorg);

    const visAutomatiskJustering = skalViseAutomatiskJustering({
        erSøkerFarEllerMedmor,
        erFødselsSituasjon: søkersituasjon.situasjon === 'fødsel',
        bareFarHarRett,
        harMellomlagretPlan,
        erEndringssøknad,
        planForValidering,
        barn,
    });

    const onSubmit = (formValues: FormValues) => {
        const feilmelding = validerUttaksplanForInnsending({
            planForValidering,
            mellomlagretPlan: harMellomlagretPlan ? gjeldendeUttaksplan : undefined,
            planFraEksisterendeSak,
            erEndringssøknad,
            erAntallDagerOvertrukket,
            erAleneOmOmsorg,
            erDeltUttak,
            erSøkerFarEllerMedmor,
        });

        if (feilmelding !== null) {
            setFeilmelding(feilmelding);
            scrollToKvoteOppsummering();
            return;
        }

        oppdaterHarJustertUttakVedFødsel(visAutomatiskJustering ? formValues.ønskerJustertUttakVedFødsel : undefined);

        // Bevarer eksisterande oppførsel: lagre initiell plan berre om brukar ikkje har mellomlagra noko.
        // For endringssøknad vart dette aldri trigga før (sidan filtrert plan var [] ikkje undefined),
        // så vi held same oppførsel her.
        if (!harMellomlagretPlan && !erEndringssøknad) {
            oppdaterUttaksplan(initiellPlan);
        }

        return navigator.goToNextDefaultStep();
    };

    //TODO (TOR) TFP-6583 Fjern bruk av VilDuGåTilbakeModal og resett context i andre steg
    const [gåTilbakeIsOpen, setGåTilbakeIsOpen] = useState(false);

    const gåTilForrigeSteg = () => {
        setGåTilbakeIsOpen(false);
        oppdaterHarJustertUttakVedFødsel(undefined);
        oppdaterUttaksplan(undefined);
        oppdaterVedlegg({ ...vedlegg, ...NULLSTILTE_PERIODE_VEDLEGG });
        navigator.goToPreviousDefaultStep();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-24">
                <VilDuGåTilbakeModal
                    isOpen={gåTilbakeIsOpen}
                    setIsOpen={setGåTilbakeIsOpen}
                    goToPreviousStep={gåTilForrigeSteg}
                />
                {visAutomatiskJustering && (
                    <AutomatiskJusteringSpørsmål
                        control={formMethods.control}
                        harSvartJaPåAutoJustering={harSvartJaPåAutoJustering}
                        uttaksplan={planForValidering}
                        barn={barn}
                    />
                )}
                <StepButtonsHookForm
                    goToPreviousStep={
                        harMellomlagretPlan
                            ? () => {
                                  setGåTilbakeIsOpen(true);
                              }
                            : navigator.goToPreviousDefaultStep
                    }
                    onAvsluttOgSlett={avbrytSøknad}
                    onFortsettSenere={navigator.fortsettSøknadSenere}
                />
            </VStack>
        </RhfForm>
    );
};
