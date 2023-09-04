import { FunctionComponent, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { Block, date1YearFromNow, dateToday } from '@navikt/fp-common';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import { createCountryOptions } from 'fpcommon/util/countryUtils';
import { validateFromDate, validateToDate } from 'fpcommon/validering/valideringsregler';

export type FormValues = {
    fom: string;
    tom: string;
    landkode: string;
};

interface Props {
    utlandsopphold?: FormValues;
    index?: number;
    lagre: (utenlandsopphold: FormValues, index?: number) => void;
    lukkModal: () => void;
    erFremtidigOpphold: boolean;
}

const BostadUtlandModal: FunctionComponent<Props> = ({
    utlandsopphold,
    index,
    lagre,
    lukkModal,
    erFremtidigOpphold,
}) => {
    const intl = useIntl();
    const formMethods = useForm<FormValues>({
        defaultValues: utlandsopphold,
    });

    const lagreOpphold = useCallback((values: FormValues) => {
        lagre(values, index);
    }, []);

    const tom = formMethods.watch('tom');
    const fom = formMethods.watch('fom');

    return (
        <Modal open onClose={lukkModal}>
            <Modal.Content>
                <FormProvider {...formMethods}>
                    <Heading size="medium">
                        <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.tittel'} />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.tidsrom'} />
                    </BodyShort>
                    <Block padBottom="l">
                        <Datepicker
                            name="fom"
                            disabledDays={[
                                {
                                    from: dayjs().subtract(50, 'year').toDate(),
                                    to: dayjs(dateToday).subtract(1, 'day').toDate(),
                                },
                                {
                                    from: tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                    to: dayjs().add(50, 'year').toDate(),
                                },
                            ]}
                            label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                            validate={[
                                (fomValue) => {
                                    if (tom && fomValue && dayjs(tom).isSame(fomValue)) {
                                        return intl.formatMessage({ id: 'valideringsfeil.fomErLikTom' });
                                    }
                                    return validateFromDate(
                                        intl,
                                        dayjs(fomValue).toDate(),
                                        dayjs(dateToday).subtract(1, 'day').toDate(),
                                        tom ? dayjs(tom).toDate() : dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                        dayjs(tom).toDate(),
                                    );
                                },
                            ]}
                        />
                        <Datepicker
                            name="tom"
                            label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                            disabledDays={[
                                {
                                    from: dayjs().subtract(50, 'year').toDate(),
                                    to: dayjs(fom || dateToday)
                                        .subtract(1, 'day')
                                        .toDate(),
                                },
                                {
                                    from: dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                    to: dayjs().add(50, 'year').toDate(),
                                },
                            ]}
                            validate={[
                                (tomValue) => {
                                    if (tomValue && fom && dayjs(tomValue).isSame(fom)) {
                                        return intl.formatMessage({ id: 'valideringsfeil.tomErLikFom' });
                                    }
                                    return validateToDate(
                                        intl,
                                        dayjs(tomValue).toDate(),
                                        dayjs(fom || dateToday)
                                            .subtract(1, 'day')
                                            .toDate(),
                                        dayjs(date1YearFromNow).add(1, 'day').toDate(),
                                        dayjs(fom).toDate(),
                                    );
                                },
                            ]}
                        />
                    </Block>
                    <Block padBottom="l">
                        <Select
                            name="landkode"
                            label={
                                <FormattedMessage
                                    id={
                                        erFremtidigOpphold
                                            ? 'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'
                                            : 'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI'
                                    }
                                />
                            }
                            validate={[
                                (country) => {
                                    if (country === '' || !country) {
                                        return erFremtidigOpphold
                                            ? intl.formatMessage({
                                                  id: 'valideringsfeil.leggTilUtenlandsopphold.landDuSkalBoIPåkreved',
                                              })
                                            : intl.formatMessage({
                                                  id: 'valideringsfeil.leggTilUtenlandsopphold.landDuHarBoddIPåkrevd',
                                              });
                                    }

                                    return undefined;
                                },
                            ]}
                        >
                            {createCountryOptions().map((o: Record<string, any>) => (
                                <option key={o[0]} value={o[0]}>
                                    {o[1]}
                                </option>
                            ))}
                        </Select>
                    </Block>
                    <Block padBottom="l">
                        <Button onClick={formMethods.handleSubmit(lagreOpphold)}>Neste</Button>
                        <Button type="button" variant="tertiary" onClick={lukkModal}>
                            Avbryt
                        </Button>
                    </Block>
                </FormProvider>
            </Modal.Content>
        </Modal>
    );
};

export default BostadUtlandModal;
