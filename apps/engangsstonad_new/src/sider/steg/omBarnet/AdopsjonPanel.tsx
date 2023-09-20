import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Radio } from '@navikt/ds-react';
import { Block, Kjønn, hasValue, sisteMuligeDatoForOvertaOmsorg } from '@navikt/fp-common';

import AdopsjonFodselFieldArray, { FormValues as FieldArrayFormValues } from './AdopsjonFodselFieldArray';
import RadioGroupPanel from 'fpcommon/form/RadioGroupPanel';
import Datepicker from 'fpcommon/form/Datepicker';
import Select from 'fpcommon/form/Select';
import { isValidFormattedDateString } from 'fpcommon/validering/valideringsregler';
import FileUploader from 'fpcommon/uploader/FileUploader';
import { Attachment, AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';
import { useCallback } from 'react';

export type FormValues = {
    adopsjonAvEktefellesBarn?: boolean;
    adopsjonsdato?: string;
    antallBarn?: number;
    antallBarnDropDown?: number;
    søkerAdopsjonAlene?: boolean;
    vedlegg: Attachment[];
} & FieldArrayFormValues;

const validateEktefellensBarnAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.ektefellensBarn.duMåOppgi' });
    }

    if (!isValidFormattedDateString(dato)) {
        return intl.formatMessage({ id: 'invalidFormatErrorKey.adopsjonsdato' });
    }

    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid' });
    }

    return undefined;
};

const validateOvertaOmsorgAdopsjonDate = (dato: string, intl: IntlShape) => {
    if (!hasValue(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.overtaOmsorg.duMåOppgi' });
    }
    if (sisteMuligeDatoForOvertaOmsorg(dato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonDato.forLangtFremITid' });
    }
    return undefined;
};

interface OwnProps {
    kjønn: Kjønn;
}

const AdopsjonPanel: React.FunctionComponent<OwnProps> = ({ kjønn }) => {
    const intl = useIntl();
    const { watch, setValue } = useFormContext<FormValues>();

    const updateAttachments = useCallback((attachments: Attachment[]) => {
        setValue('vedlegg', attachments);
    }, []);

    const { adopsjonAvEktefellesBarn, adopsjonsdato, antallBarn, antallBarnDropDown } = watch();

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
                        validate={[
                            adopsjonAvEktefellesBarn
                                ? (value) => validateEktefellensBarnAdopsjonDate(value, intl)
                                : (value) => validateOvertaOmsorgAdopsjonDate(value, intl),
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
            <AdopsjonFodselFieldArray
                adopsjonsdato={adopsjonsdato}
                antallBarn={antallBarn}
                antallBarnDropDown={antallBarnDropDown}
            />
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
            <FileUploader
                id="adopsjon"
                attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                skjemanummber={Skjemanummer.OMSORGSOVERTAKELSE}
                existingAttachments={[]}
                updateAttachments={updateAttachments}
                label={intl.formatMessage({ id: 'vedlegg.lastoppknapp.label' })}
                legend={intl.formatMessage({ id: 'vedlegg.adopsjon' })}
                description={intl.formatMessage({ id: 'omBarnet.adopsjon.veilederpanel.adopsjon.text' })}
            />
        </>
    );
};

export default AdopsjonPanel;
