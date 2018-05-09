import * as React from 'react';
import { Checkbox, Input } from 'nav-frontend-skjema';
import Spørsmål from '../components/spørsmål/Spørsmål';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';

interface AnnenForelderBolkProps {
    annenForelderData: AnnenForelderPartial;
    onChange: (
        data: AnnenForelderPartial,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const AnnenForelderBolk = (props: AnnenForelderBolkProps) => {
    const { annenForelderData, onChange } = props;
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
                        label="Kan ikke oppgis"
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
                        label="Navn"
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
                        label="Fødselsnummer"
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
                        label="Utenlandsk fødselsnummer"
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

export default AnnenForelderBolk;
