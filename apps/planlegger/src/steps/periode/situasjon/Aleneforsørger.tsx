import { CalendarIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/GreenPanel';
import InfoboksGenerell from 'components/InfoboksGenerell';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

import { BodyLong, Heading, Radio, VStack } from '@navikt/ds-react';

import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';

const Aleneforsørger: FunctionComponent = () => {
    const intl = useIntl();

    return (
        <VStack gap="10">
            <Heading size="large" spacing>
                <FormattedMessage id="periode.tittel" />
            </Heading>
            <InfoboksGenerell
                header={<FormattedMessage id="periode.infoboks.hvorLangPeriodeTittel" />}
                icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
            >
                <BodyLong>
                    <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekstDeg" />
                </BodyLong>
            </InfoboksGenerell>
            <VStack gap="2">
                <GreenPanel>
                    <RadioGroup
                        label={<FormattedMessage id="periode.hvorLangPeriodeDeg" />}
                        name="periode"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'feilmelding.periode.hvorLangPeriodeAlene.duMåOppgi',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={PeriodeEnum.HUNDRE}>
                            <FormattedMessage id="periode.100" />
                        </Radio>
                        <Radio value={PeriodeEnum.ÅTTI}>
                            <FormattedMessage id="periode.80" />
                        </Radio>
                    </RadioGroup>
                </GreenPanel>
            </VStack>
        </VStack>
    );
};

export default Aleneforsørger;
