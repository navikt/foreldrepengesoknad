import { BodyLong, Heading, Radio, VStack } from '@navikt/ds-react';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();

    const penger100 = '34 000';
    const penger80 = '27 000';

    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="periode.tittelDeg" />
            </Heading>
            <VStack gap="2">
                <Heading size="small">
                    <FormattedMessage id="periode.hvaGjelderDeg" />
                </Heading>
                <GreenPanel>
                    <RadioGroup
                        name="periode"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'feilmelding.periode.hvorLangPeriodeAlene.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio
                            value={PeriodeEnum.HUNDRE}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelseDeg' },
                                {
                                    kr1: penger100,
                                },
                            )}
                        >
                            <FormattedMessage id="periode.100" />
                        </Radio>
                        <Radio
                            value={PeriodeEnum.ÅTTI}
                            description={intl.formatMessage(
                                { id: 'periode.hvaGjelder.beskrivelseDeg' },
                                {
                                    kr1: penger80,
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
                        <FormattedMessage id="periode.ikkeDekketTekstDeg" />
                    </BodyLong>
                </Infoboks>

                <InfoboksGenerell header={<FormattedMessage id="periode.utbetalingTittelDeg" />}>
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

export default Aleneforsørger;
