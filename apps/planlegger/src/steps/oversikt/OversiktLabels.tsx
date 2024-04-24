import { HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import {
    erMorDelAvSøknaden,
    finnAnnenPartTekst,
    finnSøkerTekst,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
} from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'utils/barnetUtils';
import { HvemHarRett } from 'utils/hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
} from 'utils/stønadskontoer';
import { Uttaksdata, weeksBetween } from 'utils/uttakHjelper';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import BlåSirkel from './ikoner/BlåSirkel';
import GrønnSirkel from './ikoner/GrønnSirkel';
import styles from './oversiktLabels.module.css';

interface Props {
    barnet: OmBarnet;
    uttaksdata: Uttaksdata;
    hvemPlanlegger: HvemPlanlegger;
    hvemHarRett: HvemHarRett;
    valgtStønadskonto: TilgjengeligStønadskonto[];
}

const OversiktLabels: FunctionComponent<Props> = ({
    barnet,
    uttaksdata,
    hvemPlanlegger,
    hvemHarRett,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const søkerTekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåSøker(hvemPlanlegger, intl)
            : finnSøkerTekst(intl, hvemPlanlegger);
    const annenPartTekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåAnnenPart(hvemPlanlegger, intl)
            : finnAnnenPartTekst(intl, hvemPlanlegger);

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2, familiehendelsedato } = uttaksdata;

    return (
        <VStack gap={{ sm: '1', md: '2' }}>
            {(hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunFarHarRett' || hvemHarRett === 'kunMorHarRett') && (
                <HStack gap="1">
                    <div className={styles.bluePanel}>
                        <HStack gap="2" align="end" wrap={false}>
                            <BodyShort>
                                <FormattedMessage
                                    id="OversiktSteg.UkerForeldrepenger"
                                    values={{
                                        hvem: capitalizeFirstLetter(søkerTekst),
                                        uker: weeksBetween(startdatoSøker1, sluttdatoSøker1),
                                        dato: intl.formatDate(startdatoSøker1, {
                                            day: '2-digit',
                                            month: 'short',
                                            weekday: 'long',
                                        }),
                                    }}
                                />
                            </BodyShort>
                            <div className={styles.margin}>
                                <BlåSirkel />
                            </div>
                        </HStack>
                    </div>

                    {annenPartTekst && hvemHarRett === 'beggeHarRett' && startdatoSøker2 && sluttdatoSøker2 && (
                        <div className={styles.greenPanel}>
                            <HStack gap="2" align="end" wrap={false}>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OversiktSteg.UkerForeldrepenger"
                                        values={{
                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                            uker: weeksBetween(startdatoSøker2, sluttdatoSøker2),
                                            dato: intl.formatDate(startdatoSøker2, {
                                                day: '2-digit',
                                                month: 'short',
                                                weekday: 'long',
                                            }),
                                        }}
                                    />
                                </BodyShort>
                                <div className={styles.margin}>
                                    <GrønnSirkel />
                                </div>
                            </HStack>
                        </div>
                    )}
                </HStack>
            )}
            {annenPartTekst &&
                (hvemHarRett === 'kunMedfarEllerMedmorHarRett' || hvemHarRett === 'kunFarHarRettMorHovedsøker') && (
                    <>
                        <div className={styles.bluePanel}>
                            <HStack gap="2" align="end" wrap={false}>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OversiktSteg.UkerUtenAktivitetskrav"
                                        values={{
                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                            uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                                        }}
                                    />
                                </BodyShort>
                                <div className={styles.margin}>
                                    <BlåSirkel />
                                </div>
                            </HStack>
                        </div>
                        <div className={styles.greenPanel}>
                            <HStack gap="2" align="end" wrap={false}>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OversiktSteg.UkerMedAktivitetskrav"
                                        values={{
                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                            uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                                        }}
                                    />
                                </BodyShort>
                                <div className={styles.margin}>
                                    <GrønnSirkel />
                                </div>
                            </HStack>
                        </div>
                    </>
                )}
            <div className={styles.pinkPanel}>
                <HStack gap="2" align="center">
                    <BodyShort>
                        {erFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Fødselsdato"
                                values={{
                                    mnd: familiehendelsedato,
                                    dato: intl.formatDate(barnet.fødselsdato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                        {erIkkeFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Termindato"
                                values={{
                                    dato: intl.formatDate(barnet.termindato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                        {erAdoptert && (
                            <FormattedMessage
                                id="OversiktSteg.Omsorgsovertakelse"
                                values={{
                                    dato: intl.formatDate(barnet.overtakelsesdato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                    </BodyShort>
                    <HeartFillIcon color="#F68282" aria-hidden />
                </HStack>
            </div>
        </VStack>
    );
};

export default OversiktLabels;
