import * as React from 'react';
import { Tidsperiode } from 'common/types';
import TidsperiodeBolk from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface Props {
    tidsperiode: Partial<Tidsperiode>;
    familiehendelsesdato: Date;
    feil?: Feil;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

const UtsettelseTidsperiodeSpørsmål: React.StatelessComponent<Props & InjectedIntlProps> = ({
    onChange,
    familiehendelsesdato,
    tidsperiode,
    feil,
    intl
}) => (
    <TidsperiodeBolk
        onChange={(t: Partial<Tidsperiode>) => onChange(t)}
        tidsperiode={tidsperiode ? (tidsperiode as Partial<Tidsperiode>) : {}}
        datoAvgrensninger={{
            fra: {
                minDato: familiehendelsesdato,
                maksDato: tidsperiode ? (tidsperiode.tom as Date) : undefined
            },
            til: {
                minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined
            }
        }}
        datoValidatorer={{
            fra: [{ test: () => tidsperiode.fom !== undefined, failText: getMessage(intl, 'påkrevd') }],
            til: [{ test: () => tidsperiode.tom !== undefined, failText: getMessage(intl, 'påkrevd') }]
        }}
        feil={feil}
        visVarighet={true}
    />
);

export default injectIntl(UtsettelseTidsperiodeSpørsmål);
