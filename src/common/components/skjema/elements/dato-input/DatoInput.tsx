import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import moment from 'moment';
import { DatepickerLimitations } from 'nav-datovelger';
import Datepicker, { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import AriaText from 'common/components/aria/AriaText';
import { Avgrensninger, Feil, Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import { fridager } from 'common/util/fridagerUtils';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { getAvgrensningerDescriptionForInput } from './datoInputDescription';
import { createDatoInputVerdi } from './datoInputUtils';
import './datoInput.less';

export type DatoInputVerdi = {
    date: Date | undefined;
    dateString: string;
};

export type ValidDatoInputVerdi = {
    date: Date;
    dateString: string;
};

export interface DatoInputProps extends Omit<DatepickerProps, 'onChange' | 'input' | 'inputId'> {
    id: string;
    name: string;
    label: React.ReactNode;
    datoVerdi?: DatoInputVerdi;
    postfix?: string;
    feil?: Feil;
    onChange: (datoVerdi: DatoInputVerdi) => void;
    datoAvgrensinger?: Avgrensninger;
}

interface IntlProps {
    intl: IntlShape;
}

export type Props = DatoInputProps & IntlProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatepickerLimitations => {
    return {
        maxDate: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDate: dateToISOFormattedDateString(avgrensinger.minDato),
        weekendsNotSelectable: avgrensinger.helgedagerIkkeTillatt,
        invalidDateRanges:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                from: dateToISOFormattedDateString(t.fom)!,
                to: dateToISOFormattedDateString(t.tom)!,
            })),
    };
};

const bem = BEMHelper('datoInput');
class DatoInput extends React.Component<Props> {
    render() {
        const {
            id,
            label,
            postfix,
            feil,
            intl,
            onChange,
            calendarSettings,
            name,
            limitations,
            datoVerdi,
            datoAvgrensinger,
            ...rest
        } = this.props;
        const avgrensningerTekst = limitations ? getAvgrensningerDescriptionForInput(intl, limitations) : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;
        const inputId = `${id}_input`;

        const erHelligdag = (d: Date): boolean => {
            return fridager.some((d2) => moment(d2.date).isSame(d, 'day'));
        };

        return (
            <SkjemaInputElement inputId={inputId} feil={feil} label={label}>
                <div className={bem.block}>
                    <div className={bem.element('datovelger')}>
                        <Datepicker
                            {...rest}
                            calendarSettings={calendarSettings}
                            value={datoVerdi?.dateString}
                            inputId={inputId}
                            locale={intl.locale}
                            inputProps={{
                                name,
                                'aria-describedby': ariaDescriptionId,
                            }}
                            showYearSelector={true}
                            onChange={(datoString: string) => {
                                if (datoVerdi?.dateString !== datoString) {
                                    onChange(createDatoInputVerdi(datoString));
                                }
                            }}
                            limitations={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
                            dayPickerProps={{
                                modifiers: { erHelligdag },
                            }}
                        />
                        {ariaDescriptionId && (
                            <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                                {avgrensningerTekst}
                            </AriaText>
                        )}
                    </div>
                    {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
                </div>
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
