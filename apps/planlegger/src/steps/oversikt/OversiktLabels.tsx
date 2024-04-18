import { HeartFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger, erMorDelAvSøknaden, finnAnnenPartTekst, finnSøkerTekst } from 'types/HvemPlanlegger';
import { HvemHarRett } from 'utils/hvemHarRettHjelper';
import {
    TilgjengeligStønadskonto,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
} from 'utils/stønadskontoer';
import { Uttaksdata, weeksBetween } from 'utils/uttakHjelper';

import { BodyShort, HStack, Spacer, VStack } from '@navikt/ds-react';

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

    const annenPartTekst = finnAnnenPartTekst(intl, hvemPlanlegger);

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2, familiehendelsedato } = uttaksdata;

    return (
        <VStack gap="5">
            {(hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunFarHarRett' || hvemHarRett === 'kunMorHarRett') && (
                <HStack gap="1">
                    <div className={styles.bluePanel}>
                        <HStack gap="2" align="end" wrap={false}>
                            <BodyShort>
                                <FormattedMessage
                                    id="OversiktSteg.UkerForeldrepenger"
                                    values={{
                                        hvem: capitalizeFirstLetter(finnSøkerTekst(intl, hvemPlanlegger)),
                                        uker: weeksBetween(startdatoSøker1, sluttdatoSøker1),
                                        dato: dayjs(startdatoSøker1).format('dddd D MMM'),
                                    }}
                                />
                            </BodyShort>
                            <div className={styles.margin}>
                                <BlåSirkel />
                            </div>
                        </HStack>
                    </div>
                    <Spacer />
                    {annenPartTekst && hvemHarRett === 'beggeHarRett' && startdatoSøker2 && sluttdatoSøker2 && (
                        <div className={styles.greenPanel}>
                            <HStack gap="2" align="end" wrap={false}>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OversiktSteg.UkerForeldrepenger"
                                        values={{
                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                            uker: weeksBetween(startdatoSøker2, sluttdatoSøker2),
                                            dato: dayjs(startdatoSøker2).format('dddd D MMM'),
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
                        <HStack gap="1">
                            <div className={styles.bluePanel}>
                                <HStack gap="2" align="end" wrap={false}>
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OversiktSteg.UkerUtenAktivitetskrav"
                                            values={{
                                                hvem: capitalizeFirstLetter(annenPartTekst),
                                                uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                            }}
                                        />
                                    </BodyShort>
                                    <div className={styles.margin}>
                                        <BlåSirkel />
                                    </div>
                                </HStack>
                            </div>
                            <Spacer />
                            <div className={styles.greenPanel}>
                                <HStack gap="2" align="end" wrap={false}>
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OversiktSteg.UkerMedAktivitetskrav"
                                            values={{
                                                hvem: capitalizeFirstLetter(annenPartTekst),
                                                uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                                                erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                            }}
                                        />
                                    </BodyShort>
                                    <div className={styles.margin}>
                                        <GrønnSirkel />
                                    </div>
                                </HStack>
                            </div>
                        </HStack>
                    </>
                )}
            <div className={styles.pinkPanel}>
                <HStack gap="2" align="center" wrap={false}>
                    <BodyShort>
                        {erFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Fødselsdato"
                                values={{
                                    mnd: familiehendelsedato,
                                    dato: dayjs(barnet.fødselsdato).format('DD. MMM'),
                                }}
                            />
                        )}
                        {erIkkeFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Termindato"
                                values={{
                                    dato: dayjs(barnet.termindato).format('DD. MMM'),
                                }}
                            />
                        )}
                        {erAdoptert && (
                            <FormattedMessage
                                id="OversiktSteg.Omsorgsovertakelse"
                                values={{
                                    dato: dayjs(barnet.overtakelsesdato).format('DD. MMM'),
                                }}
                            />
                        )}
                    </BodyShort>
                    <HeartFillIcon color="#F68282" />
                </HStack>
            </div>
        </VStack>
    );
};

export default OversiktLabels;
