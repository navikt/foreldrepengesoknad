import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { PeriodeEnum } from 'types/Periode';

import { Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

const FlereForsørgere: FunctionComponent = () => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const hvem = finnHvemPlanlegger(hvemPlanlegger);

    return (
        <VStack gap="10">
            <VStack gap="5">
                <Heading size="large" spacing>
                    <FormattedMessage id="oversikt.tittel" />
                </Heading>
                <ToggleGroup defaultValue="100" onChange={console.log} size="medium" variant="neutral">
                    <ToggleGroup.Item value="100">
                        <FormattedMessage id="oversikt.100" />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="80">
                        <FormattedMessage id="oversikt.80" />
                    </ToggleGroup.Item>
                </ToggleGroup>
                <Select label="" name="periode">
                    <option value={PeriodeEnum.HUNDRE}>
                        <FormattedMessage
                            id="periode.fellesperioden.fordelingOption1"
                            values={{ hvem: hvem[0], hvem2: hvem[1] }}
                        />
                    </option>
                    <option value={PeriodeEnum.ÅTTI}>
                        <FormattedMessage id="periode.fellesperioden.fordelingOption2" values={{ hvem: hvem[0] }} />
                    </option>
                    <option value={PeriodeEnum.ÅTTI}>
                        <FormattedMessage id="periode.fellesperioden.fordelingOption2" values={{ hvem: hvem[1] }} />
                    </option>
                </Select>
            </VStack>
        </VStack>
    );
};

export default FlereForsørgere;
