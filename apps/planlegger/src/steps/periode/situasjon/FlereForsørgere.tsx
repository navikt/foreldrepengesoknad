import { CalendarIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/GreenPanel';
import InfoboksGenerell from 'components/InfoboksGenerell';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { HvemPlanlegger, isFarOgFar, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { PeriodeEnum } from 'types/Periode';

import { BodyLong, Heading, Radio, Select, VStack } from '@navikt/ds-react';

import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

export const finnNavn = (hvemPlanlegger: HvemPlanlegger) => {
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

    const hvem = finnHvemPlanlegger(hvemPlanlegger);

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
                    <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekst" />
                </BodyLong>
            </InfoboksGenerell>
            <VStack gap="2">
                <GreenPanel>
                    <RadioGroup
                        label={<FormattedMessage id="periode.hvorLangPeriode" />}
                        name="periode"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'feilmelding.periode.hvorLangPeriode.duMåOppgi',
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

            <VStack gap="10">
                <InfoboksGenerell
                    header={<FormattedMessage id="periode.infoboks.hvordanFordeleTittel" />}
                    icon={<SectorChartIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage id="periode.infoboks.hvordanFordeleTekst" />
                    </BodyLong>
                </InfoboksGenerell>
            </VStack>

            <VStack gap="2">
                <GreenPanel>
                    <Select label={<FormattedMessage id="periode.fordelingTittel" />} name="periode">
                        <option value={PeriodeEnum.HUNDRE}>
                            <FormattedMessage
                                id="periode.fordelingOption1"
                                values={{ hvem: hvem[0], hvem2: hvem[1] }}
                            />
                        </option>
                        <option value={PeriodeEnum.ÅTTI}>
                            <FormattedMessage id="periode.fordelingOption2" values={{ hvem: hvem[0] }} />
                        </option>
                        <option value={PeriodeEnum.ÅTTI}>
                            <FormattedMessage id="periode.fordelingOption2" values={{ hvem: hvem[1] }} />
                        </option>
                    </Select>
                </GreenPanel>
            </VStack>
        </VStack>
    );
};

export default FlereForsørgere;
