import { BodyLong, Heading, Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger, isFarOgFar, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { PeriodeEnum } from 'types/Periode';

const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåMedmor];
    }
    if (isMorOgFar(hvemPlanlegger)) {
        return [hvemPlanlegger.navnPåMor, hvemPlanlegger.navnPåFar];
    }
    if (!isFarOgFar(hvemPlanlegger)) {
        throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
    }
    return [hvemPlanlegger.navnPåFar, hvemPlanlegger.navnPåMedfar];
};

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const navn = finnNavn(hvemPlanlegger);

    const Nr1Penger100 = '34 000';
    const Nr2Penger100 = '31 000';

    const Nr1Penger80 = '27 000';
    const Nr2Penger80 = '24 000';

    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="periode.tittel" />
            </Heading>
            <VStack gap="2">
                <Heading size="small">
                    <FormattedMessage id="periode.hvaGjelderBegge" />
                </Heading>
                <GreenPanel>
                    <RadioGroup
                        name="periode"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'feilmelding.periode.hvorLangPeriode.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio
                            value={PeriodeEnum.HUNDRE}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelse' },
                                {
                                    navn1: navn[0],
                                    kr1: Nr1Penger100,
                                    navn2: navn[1],
                                    kr2: Nr2Penger100,
                                },
                            )}
                        >
                            <FormattedMessage id="periode.100" />
                        </Radio>
                        <Radio
                            value={PeriodeEnum.ÅTTI}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelse' },
                                {
                                    navn1: navn[0],
                                    kr1: Nr1Penger80,
                                    navn2: navn[1],
                                    kr2: Nr2Penger80,
                                },
                            )}
                        >
                            <FormattedMessage id="periode.80" />
                        </Radio>
                    </RadioGroup>
                </GreenPanel>
            </VStack>

            <VStack gap="10">
                <Infoboks header={<FormattedMessage id="periode.ikkeDekketTittel" />}>
                    <BodyLong>
                        <FormattedMessage id="periode.ikkeDekketTekst" />
                    </BodyLong>
                </Infoboks>

                <InfoboksGenerell header={<FormattedMessage id="periode.utbetalingTittel" />}>
                    <BodyLong>
                        <FormattedMessage id="periode.utbetalingTekst" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="periode.utbetalingTekst.del2" />
                    </BodyLong>
                </InfoboksGenerell>
            </VStack>
        </VStack>
    );
};

export default FlereForsørgere;
