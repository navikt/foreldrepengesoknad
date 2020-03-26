import * as React from 'react';
import { UtsettelseÅrsakType } from '../../../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import Block from 'common/components/block/Block';
import FlervalgSpørsmål from '../../../../../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import { Skjemanummer } from '../../../../../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema';

export interface UtsettelsePgaSykdomChangePayload {
    sykdomsårsak: UtsettelseÅrsakType;
}

export interface OwnProps {
    forelder: Forelder;
    sykdomsårsak?: UtsettelseÅrsakType;
    onChange: (payload: UtsettelsePgaSykdomChangePayload) => void;
}

export const visVedlegg = (sykdomsårsak?: UtsettelseÅrsakType) => sykdomsårsak !== undefined;

const getSykdomAlternativ = (intl: InjectedIntl, årsak: UtsettelseÅrsakType, radioName: string): RadioProps => {
    return {
        label: getMessage(intl, `utsettelse.sykdom.alternativ.${årsak}`),
        value: årsak,
        name: radioName
    };
};

type Props = OwnProps & InjectedIntlProps;

class UtsettelsePgaSykdomPart extends React.Component<Props> {
    getAttachmentSkjemanummer() {
        const { sykdomsårsak } = this.props;
        switch (sykdomsårsak) {
            case UtsettelseÅrsakType.Sykdom:
                return Skjemanummer.DOK_OVERFØRING_FOR_SYK;
            case UtsettelseÅrsakType.InstitusjonSøker:
            case UtsettelseÅrsakType.InstitusjonBarnet:
                return Skjemanummer.DOK_INNLEGGELSE;
            default:
                return Skjemanummer.ANNET;
        }
    }

    render() {
        const { onChange, intl, sykdomsårsak } = this.props;
        const radioName = 'utsettelsePgaSykdomÅrsak';
        return (
            <>
                <Block>
                    <FlervalgSpørsmål
                        navn={radioName}
                        spørsmål={getMessage(intl, 'utsettelse.sykdom.alternativer.spørsmål')}
                        valgtVerdi={sykdomsårsak}
                        onChange={(årsak: UtsettelseÅrsakType) => onChange({ sykdomsårsak: årsak })}
                        toKolonner={true}
                        alternativer={[
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.Sykdom, radioName),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonSøker, radioName),
                            getSykdomAlternativ(intl, UtsettelseÅrsakType.InstitusjonBarnet, radioName)
                        ]}
                    />
                </Block>
            </>
        );
    }
}
export default injectIntl(UtsettelsePgaSykdomPart);
