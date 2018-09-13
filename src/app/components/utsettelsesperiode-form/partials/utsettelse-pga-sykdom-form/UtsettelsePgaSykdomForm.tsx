import * as React from 'react';
import { Periode, Periodetype, UtsettelseÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../../flervalg-spørsmål/FlervalgSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import { RecursivePartial } from '../../../../types/Partial';
import UtsettelseTidsperiodeSpørsmål from '../UtsettelseTidsperiodeSp\u00F8rsm\u00E5l';
import { getValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';

export interface OwnProps {
    forelder: Forelder;
    periode: RecursivePartial<Periode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
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
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);
        return (
            <>
                <Block>
                    <UtsettelseTidsperiodeSpørsmål
                        tidsperiode={periode.tidsperiode as Partial<Tidsperiode>}
                        onChange={(t) => onChange({ tidsperiode: t })}
                    />
                </Block>
                <Block visible={validTidsperiode !== undefined}>
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
            </>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomForm);
