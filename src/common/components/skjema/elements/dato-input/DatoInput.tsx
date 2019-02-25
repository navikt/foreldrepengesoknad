import * as React from 'react';

import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import NavDatovelger, { Avgrensninger as DatovelgerAvgrensninger } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/elements/dato-input/datoInputDescription';
import moment from 'moment';
import { Avgrensninger, Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';

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
        maksDato: avgrensinger.maksDato && moment.utc(avgrensinger.maksDato).format('YYYY-MM-DD'),
        minDato: avgrensinger.minDato && moment.utc(avgrensinger.minDato).format('YYYY-MM-DD'),
        helgedagerIkkeTillatt: avgrensinger.helgedagerIkkeTillatt && avgrensinger.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                fom: t.fom && moment.utc(t.fom).format('YYYY-MM-DD'),
                tom: t.fom && moment.utc(t.tom).format('YYYY-MM-DD')
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

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.className}>
                    <div className={bem.element('datovelger')}>
                        <NavDatovelger.Datovelger
                            {...rest}
                            valgtDato={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                            id={id ? id : name}
                            locale={intl.locale}
                            kalender={kalender}
                            input={{
                                id,
                                placeholder: 'dd.mm.åååå',
                                name,
                                ariaDescribedby: ariaDescriptionId
                            }}
                            onChange={(datoString: string) =>
                                onChange(datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined)
                            }
                            avgrensninger={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
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
