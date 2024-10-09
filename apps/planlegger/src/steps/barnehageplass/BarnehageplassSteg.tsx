import { BabyWrappedIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erAlenesøker as erAlene } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';

import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, links } from '@navikt/fp-constants';
import { LocaleAll } from '@navikt/fp-types';
import { Infobox, StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

export const barnehagestartDato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erIkkeFødt || erAdoptert) {
        const dato = erAdoptert || erFødt ? barnet.fødselsdato : barnet.termindato;

        if (dayjs(dato).month() < 8) return dayjs(dato).month(7).add(1, 'year').format('YYYY-MM-DD');

        if (dayjs(dato).month() >= 8 && dayjs(dato).month() < 11) return dayjs(dato).add(1, 'year').format('MMMM YYYY');

        if (dayjs(dato).month() === 11)
            return dayjs(dato).startOf('year').add(2, 'year').add(7, 'months').format('MMMM YYYY');
    }
    return undefined;
};

interface Props {
    locale: LocaleAll;
}

const BarnehageplassSteg: React.FunctionComponent<Props> = ({ locale }) => {
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    useScrollBehaviour();

    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            <VStack gap="10">
                <Heading size="large">
                    <FormattedMessage id="BarnehageplassSteg.Tittel" />
                </Heading>
                <VStack gap="10">
                    <BodyLong>
                        <FormattedMessage id="Barnehageplass.KommuneTekstDeg" values={{ erAlenesøker }} />
                    </BodyLong>
                    <Infobox
                        header={
                            <FormattedMessage
                                id="Barnehageplass.DatoTittel"
                                values={{
                                    dato: barnehagestartDato(barnet),
                                    erAlenesøker,
                                }}
                            />
                        }
                        color="blue"
                        icon={<BabyWrappedIcon height={24} width={24} color="#236B7D" fontSize="1.5rem" aria-hidden />}
                    >
                        <BodyLong>
                            {(erFødt || erAdoptert) && (
                                <FormattedMessage
                                    id="Barnehageplass.DatoTekst"
                                    values={{
                                        a: (msg: any) => (
                                            <Link
                                                inlineText
                                                href={links.barnehageloven}
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                        dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                        antallBarn: barnet.antallBarn,
                                        erAlenesøker,
                                    }}
                                />
                            )}
                            {erIkkeFødt && (
                                <FormattedMessage
                                    id="Barnehageplass.DatoTekstTermin"
                                    values={{
                                        a: (msg: any) => (
                                            <Link
                                                inlineText
                                                href={links.barnehageloven}
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                        dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT),
                                        antallBarn: barnet.antallBarn,
                                        erAlenesøker,
                                    }}
                                />
                            )}
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

export default BarnehageplassSteg;
