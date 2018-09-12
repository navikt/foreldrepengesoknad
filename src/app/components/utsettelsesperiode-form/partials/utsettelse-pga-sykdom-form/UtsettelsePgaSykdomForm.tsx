import * as React from 'react';
import { Periode, Periodetype, UtsettelseÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../../flervalg-sp\u00F8rsm\u00E5l/FlervalgSp\u00F8rsm\u00E5l';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';

export interface OwnProps {
    forelder: Forelder;
    periode: Partial<Periode>;
    onChange: (periode: Partial<Periode>) => void;
}

type SykdomÅrsaker =
    | UtsettelseÅrsakType.Sykdom
    | UtsettelseÅrsakType.InstitusjonSøker
    | UtsettelseÅrsakType.InstitusjonBarnet;

const getSykdomAlternativ = (intl: InjectedIntl, årsak: UtsettelseÅrsakType): FlervalgAlternativ => {
    return {
        label: getMessage(intl, `utsettelse.sykdom.alternativ.${årsak}`),
        value: årsak
    };
};

type Props = OwnProps & InjectedIntlProps;

class UtsettelsePgaSykdomForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        props.onChange({ type: Periodetype.Utsettelse, forelder: props.forelder });
    }
    render() {
        const { onChange, intl, periode } = this.props;
        const sykdomÅrsak = periode.type === Periodetype.Utsettelse ? periode.årsak : undefined;
        return (
            <Block>
                <FlervalgSpørsmål
                    navn="utsttelsePgaSykdomÅrsak"
                    spørsmål="Velg alternativ"
                    valgtVerdi={sykdomÅrsak}
                    onChange={(årsak: SykdomÅrsaker) => onChange({ årsak })}
                    toKolonner={true}
                    alternativer={[
                        getSykdomAlternativ(intl, UtsettelseÅrsakType.Sykdom),
                        getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonSøker),
                        getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonBarnet)
                    ]}
                />
            </Block>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomForm);
