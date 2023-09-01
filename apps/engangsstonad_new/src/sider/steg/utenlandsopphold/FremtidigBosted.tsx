import { useState } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TrashIcon } from '@navikt/aksel-icons';
import { Radio, Button, Table } from '@navikt/ds-react';
import { Block, UtvidetInformasjon, formatDateExtended } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import { getCountryName } from 'fpcommon/util/countryUtils';
import BostadUtlandModal, { FormValues as BostedUtlandFormValues } from './modal/BostadUtlandModal';

export type FormValues = {
    skalBoUtenforNorgeNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandFormValues[];
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

const FremtidigBosted: React.FunctionComponent = () => {
    const intl = useIntl();

    const formMethods = useFormContext<FormValues>();

    const [valgtOppholdIndex, setValgtOppholdIndex] = useState<number | undefined>();

    const { append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });
    const leggTilOpphold = (values: BostedUtlandFormValues) => {
        append(values);
        setValgtOppholdIndex(undefined);
    };
    const fjernOpphold = (index: number) => {
        remove(index);
    };

    const skalBoUtenforNorgeNeste12Mnd = formMethods.watch('skalBoUtenforNorgeNeste12Mnd');
    const utenlandsoppholdNeste12Mnd = formMethods.watch('utenlandsoppholdNeste12Mnd');

    return (
        <>
            <Block margin="xl">
                <RadioGroupPanel
                    name="skalBoUtenforNorgeNeste12Mnd"
                    label={<FormattedMessage id="utenlandsopphold.neste12Måneder.spørsmål" />}
                >
                    <Radio value={true}>
                        <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddIUtlandet" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst.radiobutton.boddINorge" />
                    </Radio>
                </RadioGroupPanel>
            </Block>
            <UtvidetInformasjon
                apneLabel={intl.formatMessage({ id: 'utenlandsopphold.neste12MånederInfotekst.apneLabel' })}
            >
                <FormattedMessage id="utenlandsopphold.neste12MånederInfotekst" />
            </UtvidetInformasjon>
            {utenlandsoppholdNeste12Mnd && utenlandsoppholdNeste12Mnd.length > 0 && (
                <Block padBottom="l">
                    <Table>
                        <Table.Body>
                            {[...utenlandsoppholdNeste12Mnd].sort(sorterOpphold).map((opphold, index) => (
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
            {skalBoUtenforNorgeNeste12Mnd && (
                <Block padBottom="l">
                    <Button type="button" variant="secondary" onClick={() => setValgtOppholdIndex(-1)}>
                        <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                    </Button>
                </Block>
            )}
            {valgtOppholdIndex !== undefined && (
                <BostadUtlandModal
                    utlandsopphold={valgtOppholdIndex != -1 ? utenlandsoppholdNeste12Mnd[valgtOppholdIndex] : undefined}
                    index={valgtOppholdIndex}
                    lagre={leggTilOpphold}
                    lukkModal={() => setValgtOppholdIndex(undefined)}
                    erFremtidigOpphold
                />
            )}
        </>
    );
};

export default FremtidigBosted;
