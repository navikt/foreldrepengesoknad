import * as React from 'react';

import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { injectIntl, IntlShape } from 'react-intl';
import AriaText from 'common/components/aria/AriaText';
import moment from 'moment';
import { Avgrensninger, Tidsperiode, Feil } from 'common/types';
import BEMHelper from 'common/util/bem';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import { fridager } from 'common/util/fridagerUtils';
import { getAvgrensningerDescriptionForInput } from './datoInputDescription';
import Datepicker, { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { DatepickerLimitations } from 'nav-datovelger';

import './datoInput.less';

export interface DatoInputProps extends Omit<DatepickerProps, 'onChange' | 'input' | 'inputId'> {
    inputId: string;
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    onChange: (dato?: Date) => void;
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
            inputId: id,
            label,
            postfix,
            feil,
            intl,
            onChange,
            calendarSettings,
            name,
            limitations,
            dato,
            datoAvgrensinger,
            ...rest
        } = this.props;
        const avgrensningerTekst = limitations ? getAvgrensningerDescriptionForInput(intl, limitations) : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;
        const erHelligdag = (d: Date): boolean => {
            return fridager.some((d2) => moment(d2.date).isSame(d, 'day'));
        };

        return (
            <SkjemaInputElement id={id} feil={feil} label={label}>
                <div className={bem.block}>
                    <div className={bem.element('datovelger')}>
                        <Datepicker
                            {...rest}
                            calendarSettings={calendarSettings}
                            value={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                            inputId={id ? id : name}
                            locale={intl.locale}
                            inputProps={{
                                placeholder: 'dd.mm.åååå',
                                name,
                                'aria-describedby': ariaDescriptionId,
                            }}
                            showYearSelector={true}
                            onChange={(datoString: string) => {
                                const nyDato =
                                    datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined;
                                if (dato !== nyDato) {
                                    onChange(nyDato);
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
