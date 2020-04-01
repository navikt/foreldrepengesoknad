import * as React from 'react';

import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AriaText from 'common/components/aria/AriaText';
import moment from 'moment';
import { Avgrensninger, Tidsperiode, Feil } from 'common/types';
import BEMHelper from 'common/util/bem';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import { fridager } from 'common/util/fridagerUtils';
import { getAvgrensningerDescriptionForInput } from './datoInputDescription';
import Datovelger, { DatovelgerCommonProps } from 'nav-datovelger/lib/Datovelger';
import { DatovelgerAvgrensninger } from 'nav-datovelger';

import './datoInput.less';

export interface DatoInputProps extends DatovelgerCommonProps {
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    onChange: (dato?: Date) => void;
    datoAvgrensinger?: Avgrensninger;
}

export type Props = DatoInputProps & InjectedIntlProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatovelgerAvgrensninger => {
    return {
        maksDato: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDato: dateToISOFormattedDateString(avgrensinger.minDato),
        helgedagerIkkeTillatt: avgrensinger.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                fom: dateToISOFormattedDateString(t.fom)!,
                tom: dateToISOFormattedDateString(t.tom)!
            }))
    };
};

const bem = BEMHelper('datoInput');
class DatoInput extends React.Component<Props, {}> {
    render() {
        const {
            id,
            label,
            postfix,
            feil,
            intl,
            onChange,
            kalender,
            name,
            avgrensninger,
            dato,
            datoAvgrensinger,
            ...rest
        } = this.props;
        const avgrensningerTekst = this.props.avgrensninger
            ? getAvgrensningerDescriptionForInput(intl, this.props.avgrensninger)
            : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;
        const erHelligdag = (d: Date): boolean => {
            return fridager.some((d2) => moment(d2.date).isSame(d, 'day'));
        };

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.block}>
                    <div className={bem.element('datovelger')}>
                        <Datovelger
                            {...rest}
                            valgtDato={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                            id={id ? id : name}
                            locale={intl.locale}
                            kalender={kalender}
                            input={{
                                id,
                                placeholder: 'dd.mm.åååå',
                                name,
                                ariaDescribedby: ariaDescriptionId,
                                onChange: (datoString: string, evt: any) => {
                                    if (moment(datoString, 'DDMMYYYY', true).isValid()) {
                                        onChange(moment.utc(datoString, 'DDMMYYYY').toDate());
                                    }

                                    if (moment(datoString, 'D.M.YYYY', true).isValid()) {
                                        onChange(moment.utc(datoString, 'D.M.YYYY').toDate());
                                    }
                                }
                            }}
                            visÅrVelger={true}
                            onChange={(datoString: string) => {
                                const nyDato =
                                    datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined;
                                if (dato !== nyDato) {
                                    onChange(nyDato);
                                }
                            }}
                            avgrensninger={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
                            dayPickerProps={{
                                modifiers: { erHelligdag }
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
