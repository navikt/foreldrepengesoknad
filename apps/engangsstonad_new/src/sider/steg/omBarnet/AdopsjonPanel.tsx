import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { Radio } from '@navikt/ds-react';
import { Block, Kjønn } from '@navikt/fp-common';

import AdopsjonFodselFieldArray from './AdopsjonFodselFieldArray';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';

export type FormValues = {
    adopsjonAvEktefellesBarn?: boolean;
    adopsjonsdato?: string;
    antallBarn?: number;
    antallBarnDropDown?: number;
    fødselsdatoer?: {
        dato?: string;
    }[];
    søkerAdopsjonAlene?: boolean;
};

interface OwnProps {
    kjønn: Kjønn;
}

const AdopsjonPanel: React.FunctionComponent<OwnProps> = ({ kjønn }) => {
    const { watch } = useFormContext<FormValues>();

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn } = watch();

    return (
        <>
            <Block margin="xl">
                <RadioGroupPanel
                    name="adopsjonAvEktefellesBarn"
                    label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.stebarnsadopsjon" />}
                >
                    <Radio value={true}>
                        <FormattedMessage id="omBarnet.adopsjon.text.ja" />
                    </Radio>
                    <Radio value={false}>
                        <FormattedMessage id="omBarnet.adopsjon.text.nei" />
                    </Radio>
                </RadioGroupPanel>
            </Block>
            {adopsjonAvEktefellesBarn && (
                <Block margin="xl">
                    <Datepicker
                        name="adopsjonsdato"
                        label={
                            <FormattedMessage
                                id={
                                    adopsjonAvEktefellesBarn
                                        ? 'omBarnet.adopsjon.spørsmål.stebarnsadopsjondato'
                                        : 'omBarnet.adopsjon.spørsmål.overtaomsorgdato'
                                }
                            />
                        }
                        disabledDays={[
                            {
                                from: dayjs().subtract(6, 'month').toDate(),
                            },
                        ]}
                    />
                </Block>
            )}
            {adopsjonsdato && (
                <Block margin="xl">
                    <RadioGroupPanel
                        name="antallBarn"
                        label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.antallBarnAdoptert" />}
                    >
                        <Radio value="1">
                            <FormattedMessage id="omBarnet.radiobutton.ettbarn" />
                        </Radio>
                        <Radio value="2">
                            <FormattedMessage id="omBarnet.radiobutton.toBarn" />
                        </Radio>
                        <Radio value="3">
                            <FormattedMessage id="omBarnet.radiobutton.flere" />
                        </Radio>
                    </RadioGroupPanel>
                </Block>
            )}
            {antallBarn && antallBarn >= 3 && (
                <Block margin="xl">
                    <Select
                        name="antallBarnDropDown"
                        label={<FormattedMessage id="omBarnet.text.antallBarn.omsorgsovertakelse" />}
                    >
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
            <AdopsjonFodselFieldArray />
            {antallBarn && kjønn === 'M' && adopsjonAvEktefellesBarn === false && (
                <Block margin="xl">
                    <RadioGroupPanel
                        name="søkerAdopsjonAlene"
                        label={<FormattedMessage id="omBarnet.adopsjon.spørsmål.adoptererDuAlene" />}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="omBarnet.adopsjon.text.ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="omBarnet.adopsjon.text.nei" />
                        </Radio>
                    </RadioGroupPanel>
                </Block>
            )}
        </>
    );
};

export default AdopsjonPanel;
