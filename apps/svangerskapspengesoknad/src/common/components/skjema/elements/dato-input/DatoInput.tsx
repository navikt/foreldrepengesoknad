import React from 'react';
import { useIntl } from 'react-intl';
import AriaText from 'common/components/aria/AriaText';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/elements/dato-input/datoInputDescription';
import { Avgrensninger, Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { Datepicker, DatepickerLimitations } from 'nav-datovelger';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import './datoInput.less';
import { Label } from '@navikt/ds-react';

export interface DatoInputProps extends Omit<DatepickerProps, 'onChange' | 'input'> {
    id: string;
    name: string;
    label: React.ReactNode;
    dato?: string;
    postfix?: string;
    feil?: React.ReactNode;
    onChange: (dato?: string) => void;
    datoAvgrensinger?: Avgrensninger;
}

export type Props = DatoInputProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatepickerLimitations => {
    return {
        maxDate: avgrensinger.maksDato,
        minDate: avgrensinger.minDato,
        weekendsNotSelectable: avgrensinger.helgedagerIkkeTillatt,
        invalidDateRanges:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                from: t.fom,
                to: t.tom,
            })),
    };
};

const bem = BEMHelper('datoInput');

const DatoInput: React.FunctionComponent<Props> = ({
    id,
    label,
    postfix,
    feil,
    onChange,
    calendarSettings,
    name,
    limitations,
    dato,
    datoAvgrensinger,
    ...rest
}) => {
    const intl = useIntl();
    const avgrensningerTekst = limitations ? getAvgrensningerDescriptionForInput(limitations) : undefined;
    const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;

    return (
        <SkjemaGruppe id={id} feil={feil} legend={label ? <Label>{label}</Label> : undefined}>
            <div className={bem.block}>
                <div className={bem.element('datovelger')}>
                    <Datepicker
                        {...rest}
                        allowInvalidDateSelection={false}
                        value={dato}
                        locale={intl.locale as any}
                        calendarSettings={calendarSettings}
                        inputProps={{
                            placeholder: 'dd.mm.åååå',
                            name,
                            'aria-describedby': ariaDescriptionId,
                        }}
                        onChange={(datoString: string) => onChange(datoString)}
                        limitations={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
                    />
                    {ariaDescriptionId && (
                        <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                            {avgrensningerTekst}
                        </AriaText>
                    )}
                </div>
                {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
            </div>
        </SkjemaGruppe>
    );
};
export default DatoInput;
