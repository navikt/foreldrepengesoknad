import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';

interface AnnenForelderBolkProps {
    annenForelderData: AnnenForelderPartial;
    onChange: (
        data: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = AnnenForelderBolkProps & InjectedIntlProps;

const AnnenForelderBolk = (props: Props) => {
    const { annenForelderData, onChange, intl } = props;
    const { kanIkkeOppgis, navn, fnr, utenlandskFnr } = annenForelderData;

    const handleOnChange = (
        data: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(data, e);
    };

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <Checkbox
                        checked={kanIkkeOppgis}
                        label={getMessage(
                            intl,
                            'annenForelder.spørsmål.kanOppgis'
                        )}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange(
                                {
                                    kanIkkeOppgis: e.target.checked,
                                    navn: '',
                                    fnr: '',
                                    utenlandskFnr: undefined
                                },
                                e
                            )
                        }
                    />
                )}
            />
            <Spørsmål
                render={() => (
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.navn')}
                        name="navn"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange({ navn: e.target.value }, e)
                        }
                        value={navn}
                    />
                )}
            />
            <Spørsmål
                render={() => (
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.fnr')}
                        name="fødselsnummer"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange({ fnr: e.target.value }, e)
                        }
                        value={fnr}
                    />
                )}
            />
            <Spørsmål
                render={() => (
                    <Checkbox
                        disabled={kanIkkeOppgis}
                        checked={utenlandskFnr}
                        label={getMessage(
                            intl,
                            'annenForelder.spørsmål.utenlandskFnr'
                        )}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange(
                                { utenlandskFnr: e.target.checked },
                                e
                            )
                        }
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(AnnenForelderBolk);
