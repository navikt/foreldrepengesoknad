import { CalendarIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnHvemPlanlegger } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { erBarnetIkkeFødt } from 'types/Barnet';
import { HvemPlanlegger, isFarOgFar, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { Periode, PeriodeEnum } from 'types/Periode';

import { BodyLong, Heading, Radio, Select, VStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Form, RadioGroup } from '@navikt/fp-form-hooks';
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

const lagFordelingOptions = (periode: number) => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const hvem = finnHvemPlanlegger(hvemPlanlegger);
    let value = 0;

    periode ? 100 : 80;

    const uker = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const options = [<option value={value++} />];

    if (periode === 100) {
        options.push(
            <option value={value++}>
                <FormattedMessage id="periode.fordelingOptionAlt" values={{ hvem: hvem[1], uker: uker[15] }} />
            </option>,
        );
        console.log(options);

        for (let i = 0; i < 16 - 1; i++) {
            options.push(
                <option value={value++}>
                    <FormattedMessage
                        id="periode.fordelingOptions"
                        values={{ hvem: hvem[0], hvem2: hvem[1], uker: uker[i], uker2: uker[14 - i] }}
                    />
                </option>,
            );
        }

        options.push(
            <option value={value++}>
                <FormattedMessage id="periode.fordelingOptionAlt" values={{ hvem: hvem[0], uker: uker[15] }} />
            </option>,
        );
    }

    if (periode === 80) {
        options.push(
            <option value={value++}>
                <FormattedMessage id="periode.fordelingOptionAlt" values={{ hvem: hvem[1], uker: uker[18] }} />
            </option>,
        );
        console.log(options);

        for (let i = 0; i < uker.length - 1; i++) {
            options.push(
                <option value={value++}>
                    <FormattedMessage
                        id="periode.fordelingOptions"
                        values={{ hvem: hvem[0], hvem2: hvem[1], uker: uker[i], uker2: uker[17 - i] }}
                    />
                </option>,
            );
        }

        options.push(
            <option value={value++}>
                <FormattedMessage id="periode.fordelingOptionAlt" values={{ hvem: hvem[0], uker: uker[18] }} />
            </option>,
        );
    }

    return periode === 100 ? options.slice(0, 18) : options;
};

const FlereForsørgere: FunctionComponent = () => {
    const intl = useIntl();
    const formMethods = useForm<Periode>();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const periode = formMethods.watch('periode');
    const [currentOption, setCurrentOption] = useState('');

    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const treUkerFørTerminDato = dayjs(termindato).subtract(3, 'weeks').startOf('day');
    const sluttdatoMor = dayjs(treUkerFørTerminDato).add(31, 'weeks');
    const sluttdato49 = dayjs(sluttdatoMor).add(15, 'weeks');

    return (
        <Form formMethods={formMethods}>
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

                <VStack gap="10">
                    <GreenPanel>
                        <Select
                            label={<FormattedMessage id="periode.fordelingTittel" />}
                            name="fordeling"
                            onChange={(e) => {
                                setCurrentOption(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            {periode === PeriodeEnum.HUNDRE && lagFordelingOptions(100)}
                            {periode === PeriodeEnum.ÅTTI && lagFordelingOptions(80)}
                        </Select>
                    </GreenPanel>

                    {currentOption !== undefined && currentOption > '0' && (
                        <Infoboks header={<FormattedMessage id="periode.infoboksTittel" />}>
                            <BodyLong>
                                <FormattedMessage
                                    id="periode.infoboksTekst.førsteDag"
                                    values={{
                                        hvem: finnHvemPlanlegger(hvemPlanlegger)
                                            .slice(0, -1)
                                            .map(capitalizeFirstLetter),
                                        dag: treUkerFørTerminDato.format('DD.MM.YY'),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong spacing>
                                <FormattedMessage
                                    id="periode.infoboksTekst.sisteDag"
                                    values={{
                                        hvem: finnHvemPlanlegger(hvemPlanlegger)
                                            .slice(0, -1)
                                            .map(capitalizeFirstLetter),
                                        dag: sluttdatoMor.format('DD.MM.YY'),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                <FormattedMessage
                                    id="periode.infoboksTekst.førsteDag"
                                    values={{
                                        hvem: finnHvemPlanlegger(hvemPlanlegger)
                                            .slice(0, 3)
                                            .slice(-1)
                                            .map(capitalizeFirstLetter),
                                        dag: dayjs(sluttdatoMor).add(1, 'day').format('DD.MM.YY'),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong spacing>
                                <FormattedMessage
                                    id="periode.infoboksTekst.sisteDag"
                                    values={{
                                        hvem: finnHvemPlanlegger(hvemPlanlegger)
                                            .slice(0, 3)
                                            .slice(-1)
                                            .map(capitalizeFirstLetter),
                                        dag: sluttdato49.format('DD.MM.YY'),
                                    }}
                                />
                            </BodyLong>
                            <BodyLong size="small">
                                <FormattedMessage id="periode.infoboksTekst.hvis" />
                            </BodyLong>
                        </Infoboks>
                    )}
                </VStack>
            </VStack>
        </Form>
    );
};

export default FlereForsørgere;
