import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Radio, Button, Table } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { Block, UtvidetInformasjon, formatDateExtended } from '@navikt/fp-common';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import { getCountryName } from 'fpcommon/util/countryUtils';
import BostadUtlandModal, { FormValues as BostedUtlandFormValues } from './modal/BostadUtlandModal';

export type FormValues = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    utenlandsoppholdSiste12Mnd: BostedUtlandFormValues[];
};

const sorterOpphold = (opphold1: BostedUtlandFormValues, opphold2: BostedUtlandFormValues) => {
    if (opphold1.fom < opphold2.fom) {
        return -1;
    }
    if (opphold1.fom > opphold2.fom) {
        return 1;
    }
    return 0;
};

const TidligereBosted: React.FunctionComponent = () => {
    const intl = useIntl();

    const formMethods = useFormContext<FormValues>();

    const [valgtOppholdIndex, setValgtOppholdIndex] = useState<number | undefined>();

    const { append, remove } = useFieldArray({
        name: 'utenlandsoppholdSiste12Mnd',
        control: formMethods.control,
    });
    const leggTilOpphold = (values: BostedUtlandFormValues) => {
        append(values);
        setValgtOppholdIndex(undefined);
    };
    const fjernOpphold = (index: number) => {
        remove(index);
    };

    // TODO Manglar validering av periodar

    const utenlandsoppholdSiste12Mnd = formMethods.watch('utenlandsoppholdSiste12Mnd');
    const harBoddUtenforNorgeSiste12Mnd = formMethods.watch('harBoddUtenforNorgeSiste12Mnd');

    return (
        <>
            <Block margin="xl">
                <RadioGroupPanel
                    name="harBoddUtenforNorgeSiste12Mnd"
                    label={<FormattedMessage id="utenlandsopphold.siste12Måneder.spørsmål" />}
                    validate={[(value) => (value === undefined ? 'Felt er obligatorisk' : undefined)]}
                >
                    <Radio value={true}>
                        <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddIUtlandet" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst.radiobutton.boddINorge" />
                    </Radio>
                </RadioGroupPanel>
            </Block>
            <UtvidetInformasjon
                apneLabel={intl.formatMessage({ id: 'utenlandsopphold.siste12MånederInfotekst.apneLabel' })}
            >
                <FormattedMessage id="utenlandsopphold.siste12MånederInfotekst" />
            </UtvidetInformasjon>
            {utenlandsoppholdSiste12Mnd && utenlandsoppholdSiste12Mnd.length > 0 && (
                <Block padBottom="l">
                    <Table>
                        <Table.Body>
                            {[...utenlandsoppholdSiste12Mnd].sort(sorterOpphold).map((opphold, index) => (
                                <Table.Row key={opphold.fom} shadeOnHover={false}>
                                    <Table.DataCell>
                                        <Button variant="tertiary" onClick={() => setValgtOppholdIndex(index)}>
                                            {getCountryName(opphold.landkode, 'nb')}
                                        </Button>
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {formatDateExtended(dayjs(opphold.fom).toDate())} -{' '}
                                        {formatDateExtended(dayjs(opphold.tom).toDate())}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <Button
                                            variant="tertiary"
                                            icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                                            onClick={() => fjernOpphold(index)}
                                        />
                                    </Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Block>
            )}
            {harBoddUtenforNorgeSiste12Mnd && (
                <Block padBottom="l">
                    <Button type="button" variant="secondary" onClick={() => setValgtOppholdIndex(-1)}>
                        <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                    </Button>
                </Block>
            )}
            {valgtOppholdIndex !== undefined && (
                <BostadUtlandModal
                    utlandsopphold={valgtOppholdIndex != -1 ? utenlandsoppholdSiste12Mnd[valgtOppholdIndex] : undefined}
                    index={valgtOppholdIndex}
                    lagre={leggTilOpphold}
                    lukkModal={() => setValgtOppholdIndex(undefined)}
                    erFremtidigOpphold={false}
                />
            )}
        </>
    );
};

export default TidligereBosted;
