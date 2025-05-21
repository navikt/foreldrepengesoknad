import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFamiliehendelsedato } from 'steps/oppsummering/expansion-cards/BarnehageplassOppsummering';
import { OmBarnet } from 'types/Barnet';
import { erAlenesøker as erAlene } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { Uttaksdata, getUttaksdagTilOgMedDato } from 'utils/uttakUtils';

import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT, links } from '@navikt/fp-constants';
import { IconCircleWrapper, Infobox, StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

export const barnehagestartDato = (barnet: OmBarnet) => {
    if (erBarnetAdoptert(barnet)) {
        return undefined;
    }

    const dato = erBarnetFødt(barnet) ? barnet.fødselsdato : barnet.termindato;

    if (dayjs(dato).month() < 8) {
        const newLocal = dayjs(dato).month(7).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT);
        return getUttaksdagTilOgMedDato(newLocal);
    }
    if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) {
        return getUttaksdagTilOgMedDato(dayjs(dato).add(1, 'year').endOf('month').format(ISO_DATE_FORMAT));
    }
    return getUttaksdagTilOgMedDato(
        dayjs(dato)
            .startOf('year')
            .add(2, 'year')
            .add(7, 'months')
            .endOf('week')
            .endOf('month')
            .format(ISO_DATE_FORMAT),
    );
};

interface Props {
    uttaksdata?: Uttaksdata;
}

export const BarnehageplassSteg = ({ uttaksdata }: Props) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    useScrollBehaviour();

    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erAlenesøker = erAlene(hvemPlanlegger);
    const antallBarn = barnet.antallBarn;
    const sluttdato = uttaksdata?.sluttdatoPeriode2 ? uttaksdata.sluttdatoPeriode2 : uttaksdata?.sluttdatoPeriode1;

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            <VStack gap="8">
                <Heading size="medium" level="2">
                    <FormattedMessage id="BarnehageplassSteg.Tittel" />
                </Heading>
                <VStack gap="5">
                    <BodyLong>
                        <FormattedMessage id="Barnehageplass.KommuneTekstDeg" values={{ erAlenesøker, antallBarn }} />
                    </BodyLong>
                    <Infobox
                        header={
                            erBarnetAdoptert(barnet) ? (
                                <FormattedMessage
                                    id="Barnehageplass.DatoTittel"
                                    values={{
                                        dato: intl.formatDate(sluttdato, {
                                            month: 'long',
                                            year: 'numeric',
                                        }),
                                        erAlenesøker,
                                    }}
                                />
                            ) : (
                                <FormattedMessage
                                    id="Barnehageplass.DatoTittel"
                                    values={{
                                        dato: intl.formatDate(barnehagestartDato(barnet), {
                                            month: 'long',
                                            year: 'numeric',
                                        }),
                                        erAlenesøker,
                                    }}
                                />
                            )
                        }
                        color="blue"
                        icon={
                            <IconCircleWrapper color="lightBlue" size="medium">
                                <BabyWrappedIcon height={24} width={24} color="#236B7D" fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                        }
                    >
                        <BodyLong>
                            <FormattedMessage
                                id="Barnehageplass.DatoTekst"
                                values={{
                                    a: (msg) => (
                                        <Link inlineText href={links.barnehageloven} rel="noreferrer" target="_blank">
                                            {msg}
                                        </Link>
                                    ),
                                    dato: intl.formatDate(getFamiliehendelsedato(barnet), {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }),
                                    antallBarn,
                                    erAlenesøker,
                                    erFødt: erBarnetFødt(barnet),
                                    erAdopsjon: erBarnetAdoptert(barnet),
                                }}
                            />
                        </BodyLong>
                    </Infobox>
                    <Infobox
                        header={<FormattedMessage id="Barnehageplass.BarnehageTittel" />}
                        icon={
                            <InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                        }
                        color="gray"
                    >
                        <BodyLong>
                            <FormattedMessage id="Barnehageplass.BarnehageTekst" values={{ erAlenesøker }} />
                        </BodyLong>
                    </Infobox>
                </VStack>
                <VStack gap="20">
                    <VStack>
                        <StepButtons
                            nextButtonOnClick={navigator.goToNextDefaultStep}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </VStack>
        </PlanleggerStepPage>
    );
};
