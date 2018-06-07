import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';

interface NavnPåAnnenForelderSpørsmålProps {
    navn?: string;
    kanIkkeOppgis?: boolean;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = NavnPåAnnenForelderSpørsmålProps & InjectedIntlProps;

const NavnPåAnnenForelderSpørsmål = (props: Props) => {
    const { kanIkkeOppgis, navn, onChange, intl } = props;

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.navn')}
                        name="navn"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({ navn: e.target.value }, e)
                        }
                        value={navn === undefined ? '' : navn}
                    />
                )}
            />

            <Spørsmål
                render={() => (
                    <Checkbox
                        checked={kanIkkeOppgis}
                        label={getMessage(
                            intl,
                            'annenForelder.spørsmål.kanOppgis'
                        )}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(
                                {
                                    navn: undefined,
                                    fnr: undefined,
                                    utenlandskFnr: undefined,
                                    kanIkkeOppgis: e.target.checked,
                                    harRettPåForeldrepenger: undefined
                                },
                                e
                            )
                        }
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(NavnPåAnnenForelderSpørsmål);
