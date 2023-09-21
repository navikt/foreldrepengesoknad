import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, VStack, HStack, Link } from '@navikt/ds-react';
import { Step, StepButtonWrapper, dateToday } from '@navikt/fp-common';

import { createCountryOptions } from 'fpcommon/util/countryUtils';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import stepConfig, { getPreviousStepHref } from '../stepConfig';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import dayjs from 'dayjs';

export type FormValues = {
    utenlandsoppholdNeste12Mnd: {
        fom?: string;
        tom?: string;
        landkode?: string;
    }[];
};

interface OwnProps {
    lagretFremtidigUtenlandsopphold?: FormValues;
    lagreFremtidigUtenlandsopphold: (data: FormValues) => void;
    avbrytSøknad: () => void;
}

const FremtidigUtlandsopphold: React.FunctionComponent<OwnProps> = ({
    lagretFremtidigUtenlandsopphold,
    lagreFremtidigUtenlandsopphold,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const defaultValues = useMemo(() => lagretFremtidigUtenlandsopphold || { utenlandsoppholdNeste12Mnd: [{}] }, []);
    const formMethods = useForm<FormValues>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append({});
    }, [append]);
    const fjernOpphold = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove],
    );

    // TODO Manglar validering av periodar

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="utenlandsoppholdFremtidig"
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.fremtidig' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagreFremtidigUtenlandsopphold)}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((_field, index) => (
                                <VStack gap="5" align="start">
                                    <Select
                                        name={`utenlandsoppholdNeste12Mnd.${index}.landkode`}
                                        label={
                                            <FormattedMessage
                                                id={
                                                    'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'
                                                }
                                            />
                                        }
                                    >
                                        {createCountryOptions().map((o: Record<string, any>) => (
                                            <option key={o[0]} value={o[0]}>
                                                {o[1]}
                                            </option>
                                        ))}
                                    </Select>
                                    <HStack gap="10">
                                        <Datepicker
                                            name={`utenlandsoppholdNeste12Mnd.${index}.fom`}
                                            label={
                                                <FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />
                                            }
                                            disabledDays={[
                                                {
                                                    from: dayjs().subtract(50, 'year').toDate(),
                                                    to: dayjs(dateToday).subtract(1, 'day').toDate(),
                                                },
                                                {
                                                    from: tom
                                                        ? dayjs(tom).toDate()
                                                        : dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                                    to: dayjs().add(50, 'year').toDate(),
                                                },
                                            ]}
                                        />
                                        <Datepicker
                                            name={`utenlandsoppholdNeste12Mnd.${index}.tom`}
                                            label={
                                                <FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />
                                            }
                                        />
                                    </HStack>
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="tertiary"
                                            size="small"
                                            icon={<TrashIcon aria-hidden />}
                                            onClick={() => fjernOpphold(index)}
                                        >
                                            <FormattedMessage id="utenlandsopphold.knapp.SlettOpphold" />
                                        </Button>
                                    )}
                                    {fields.length > 1 && <hr style={{ width: '100%' }} color="#99C4DD" />}
                                </VStack>
                            ))}
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                icon={<PlusIcon aria-hidden />}
                                onClick={leggTilOpphold}
                            >
                                <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                            </Button>
                        </VStack>
                        <StepButtonWrapper>
                            <Button variant="secondary" as={Link} to={getPreviousStepHref('utenlandsoppholdFremtidig')}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            <Button type="submit">
                                <FormattedMessage id="søknad.gåVidere" />
                            </Button>
                        </StepButtonWrapper>
                    </VStack>
                </form>
            </FormProvider>
        </Step>
    );
};

export default FremtidigUtlandsopphold;
