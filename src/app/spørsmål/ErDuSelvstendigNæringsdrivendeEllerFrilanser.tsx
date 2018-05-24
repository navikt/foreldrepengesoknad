import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';

enum SelvstendigNæringsdrivendeEllerFrilanser {
    'ER_SELVSTENDIG_NÆRINGSDRIVENDE_ELLER_FRILANS' = 'erSelvstendigNæringsdrivendeEllerFrilans',
    'INGEN_AV_DELENE' = 'ingenAvDelene'
}

interface SelvstendigNæringsdrivendeEllerFrilanserBolkProps {
    erSelvstendigNæringsdrivendeEllerFrilanser: boolean;
    onChange: (
        erSelvstendigNæringsdrivendeEllerFrilanser: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = SelvstendigNæringsdrivendeEllerFrilanserBolkProps &
    InjectedIntlProps;

const ErDuSelvstendigNæringsdrivendeEllerFrilanserSpørsmål = (props: Props) => {
    const {
        onChange,
        erSelvstendigNæringsdrivendeEllerFrilanser,
        intl,
        ...otherProps
    } = props;

    let checked;
    if (erSelvstendigNæringsdrivendeEllerFrilanser === true) {
        checked =
            SelvstendigNæringsdrivendeEllerFrilanser.ER_SELVSTENDIG_NÆRINGSDRIVENDE_ELLER_FRILANS;
    } else if (erSelvstendigNæringsdrivendeEllerFrilanser === false) {
        checked = SelvstendigNæringsdrivendeEllerFrilanser.INGEN_AV_DELENE;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(
                intl,
                'erDuSelvstendigNæringsdrivendeEllerFrilanser.spørsmål'
            )}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        SelvstendigNæringsdrivendeEllerFrilanser.ER_SELVSTENDIG_NÆRINGSDRIVENDE_ELLER_FRILANS
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        SelvstendigNæringsdrivendeEllerFrilanser.INGEN_AV_DELENE
                }
            ]}
            name="erSelvstendigNæringsdrivendeEllerFrilanser"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: SelvstendigNæringsdrivendeEllerFrilanser
            ) =>
                onChange(
                    v ===
                        SelvstendigNæringsdrivendeEllerFrilanser.ER_SELVSTENDIG_NÆRINGSDRIVENDE_ELLER_FRILANS,
                    e
                )
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErDuSelvstendigNæringsdrivendeEllerFrilanserSpørsmål);
