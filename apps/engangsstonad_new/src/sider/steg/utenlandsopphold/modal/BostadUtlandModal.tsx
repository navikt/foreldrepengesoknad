import { FunctionComponent, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { Block, date1YearFromNow, dateToday } from '@navikt/fp-common';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import { createCountryOptions } from 'fpcommon/util/countryUtils';

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
                        />
                        <Datepicker
                            name="tom"
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
                            label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
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
