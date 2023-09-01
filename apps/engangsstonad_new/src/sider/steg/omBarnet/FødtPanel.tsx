import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { Radio } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';

import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import Select from 'fpcommon/form/RadioGroupPanel';
import Datepicker from 'fpcommon/form/Datepicker';

export type FormValues = {
    erBarnetFødt?: boolean;
    antallBarn?: number;
    antallBarnDropDown?: number;
    fødselsdatoer?: string[];
};

const FødtPanel: React.FunctionComponent = () => {
    const { watch } = useFormContext<FormValues>();

    const erBarnetFødt = watch('erBarnetFødt');
    const antallBarn = watch('antallBarn');

    return (
        <>
            <Block margin="xl" padBottom="xl">
                <RadioGroupPanel name="erBarnetFødt" label={<FormattedMessage id="omBarnet.spørsmål.erBarnetFødt" />}>
                    <Radio value={true}>
                        <FormattedMessage id="omBarnet.radiobutton.ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="omBarnet.radiobutton.nei" />
                    </Radio>
                </RadioGroupPanel>
            </Block>
            {erBarnetFødt && (
                <RadioGroupPanel name="antallBarn" label={<FormattedMessage id="omBarnet.text.antallBarn.født" />}>
                    <Radio value="1">
                        <FormattedMessage id="omBarnet.radiobutton.ettbarn" />
                    </Radio>
                    <Radio value="2">
                        <FormattedMessage id="omBarnet.radiobutton.tvillinger" />
                    </Radio>
                    <Radio value="3">
                        <FormattedMessage id="omBarnet.radiobutton.flere" />
                    </Radio>
                </RadioGroupPanel>
            )}
            {antallBarn && antallBarn >= 3 && (
                <Block margin="xl">
                    <Select name="antallBarnDropDown" label={<FormattedMessage id="omBarnet.text.antallBarn.født" />}>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </Select>
                </Block>
            )}
            {antallBarn && (
                <Block margin="xl">
                    <Datepicker
                        name="fødselsdatoer.0"
                        disabledDays={[
                            {
                                from: dayjs().subtract(50, 'year').toDate(),
                                to: dayjs().subtract(6, 'month').toDate(),
                            },
                            {
                                from: dayjs().toDate(),
                            },
                        ]}
                    />
                </Block>
            )}
        </>
    );
};

export default FødtPanel;
