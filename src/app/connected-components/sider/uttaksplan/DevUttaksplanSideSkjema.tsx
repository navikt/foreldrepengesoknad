import * as React from 'react';
import Radioliste, {
    RadiolisteValg
} from 'uttaksplan/components/radioliste/Radioliste';
import { UttaksplamTestSkjemadata } from './UttaksplanSide';
import { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';
import DatoInput from 'common/components/dato-input/DatoInput';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import { Row, Column } from 'nav-frontend-grid';
import { guid } from 'nav-frontend-js-utils';

export interface Props {
    skjemadata: UttaksplamTestSkjemadata;
    onChange: (skjemadata: UttaksplamTestSkjemadata) => void;
}

const søkerroller: RadiolisteValg[] = Object.keys(SøkerRolle).map(
    (rolle): RadiolisteValg => ({ tittel: rolle, verdi: rolle })
);

const søkersituasjoner: RadiolisteValg[] = Object.keys(Søkersituasjon).map(
    (situasjon): RadiolisteValg => ({ tittel: situasjon, verdi: situasjon })
);

const antallBarnValg: RadiolisteValg[] = ['1', '2'].map(
    (antall): RadiolisteValg => ({
        tittel: antall,
        verdi: antall
    })
);

const getHendelsesdatoLabel = (data: UttaksplamTestSkjemadata): string => {
    if (data.søkersituasjon === Søkersituasjon.FØDSEL) {
        return data.erBarnetFødt ? 'Fødselsdato' : 'Termindato';
    }
    return 'Dato';
};

interface JaNeiProps {
    spørsmål: string;
    checked: boolean | undefined;
    onChange: (checked: boolean) => void;
    synlig?: boolean;
}

const JaNeiSpørsmål: React.StatelessComponent<JaNeiProps> = ({
    synlig = true,
    spørsmål,
    checked,
    onChange
}) => (
    <EkspanderbartInnhold erApen={synlig === true} animert={false}>
        <div className="blokkPad-s">
            <Radioliste
                kolonner="2"
                inputnavn={guid()}
                tittel={spørsmål}
                valg={[
                    {
                        tittel: 'Ja',
                        verdi: 'ja'
                    },
                    {
                        tittel: 'Nei',
                        verdi: 'nei'
                    }
                ]}
                valgtVerdi={
                    checked === undefined
                        ? undefined
                        : checked === true
                            ? 'ja'
                            : 'nei'
                }
                onChange={(v) => onChange(v === 'ja')}
            />
        </div>
    </EkspanderbartInnhold>
);

const DevUttaksplanSideSkjema: React.StatelessComponent<Props> = (props) => {
    const { skjemadata, onChange } = props;
    return (
        <div>
            <div className="blokk-m">
                <Radioliste
                    kolonner="2"
                    inputnavn="søkersituasjon"
                    tittel="Søkersituasjon"
                    valg={søkersituasjoner}
                    valgtVerdi={skjemadata.søkersituasjon.toUpperCase()}
                    onChange={(søkersituasjon: Søkersituasjon) =>
                        onChange({
                            ...props.skjemadata,
                            søkersituasjon
                        })
                    }
                />
            </div>
            <div className="blokk-m">
                <Radioliste
                    kolonner="2"
                    inputnavn="søkerrolle"
                    tittel="Søkerrolle"
                    valg={søkerroller}
                    valgtVerdi={skjemadata.søkerrolle}
                    onChange={(søkerrolle: SøkerRolle) =>
                        onChange({
                            ...props.skjemadata,
                            søkerrolle
                        })
                    }
                />
            </div>
            <div className="blokk-m">
                <Radioliste
                    kolonner="2"
                    inputnavn="antallbarn"
                    tittel="Antall barn"
                    valg={antallBarnValg}
                    valgtVerdi={skjemadata.antallBarn}
                    onChange={(antall: string) =>
                        onChange({
                            ...props.skjemadata,
                            antallBarn: antall
                        })
                    }
                />
            </div>
            <div className="blokk-m">
                <Row>
                    <Column xs="12" sm="6">
                        <h3>
                            {skjemadata.antallBarn === '1' ? 'Barnet' : 'Barna'}
                        </h3>
                        <JaNeiSpørsmål
                            spørsmål={`Er ${
                                skjemadata.antallBarn === '1'
                                    ? 'barnet'
                                    : 'barna'
                            } født`}
                            checked={skjemadata.erBarnetFødt}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    erBarnetFødt: checked
                                })
                            }
                        />

                        <DatoInput
                            id="hendelsesdato"
                            label={getHendelsesdatoLabel(skjemadata)}
                            dato={skjemadata.dato}
                            onChange={(dato) =>
                                onChange({ ...skjemadata, dato })
                            }
                        />
                    </Column>
                    <Column xs="12" sm="6">
                        <h3>Familiesituasjon</h3>
                        <JaNeiSpørsmål
                            spørsmål="Er fars fødselsnummer er oppgitt"
                            checked={skjemadata.fnrFarOppgitt}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    fnrFarOppgitt: checked
                                })
                            }
                        />
                        <JaNeiSpørsmål
                            synlig={skjemadata.fnrFarOppgitt === true}
                            spørsmål="Far har rett"
                            checked={skjemadata.farHarRett}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    farHarRett: checked
                                })
                            }
                        />
                        <JaNeiSpørsmål
                            synlig={
                                skjemadata.fnrFarOppgitt === true &&
                                skjemadata.farHarRett === true
                            }
                            spørsmål="Bor sammen"
                            checked={skjemadata.borSammen}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    borSammen: checked
                                })
                            }
                        />
                        <JaNeiSpørsmål
                            synlig={
                                skjemadata.fnrFarOppgitt === true &&
                                skjemadata.borSammen === false
                            }
                            spørsmål="Aleneomsorg"
                            checked={skjemadata.aleneomsorg}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    aleneomsorg: checked
                                })
                            }
                        />
                        <JaNeiSpørsmål
                            synlig={
                                skjemadata.fnrFarOppgitt === true &&
                                skjemadata.borSammen === false &&
                                skjemadata.aleneomsorg === true
                            }
                            spørsmål="Mor skal ha alt"
                            checked={skjemadata.skalMorHaAlt}
                            onChange={(checked) =>
                                onChange({
                                    ...skjemadata,
                                    skalMorHaAlt: checked
                                })
                            }
                        />
                    </Column>
                </Row>
            </div>
        </div>
    );
};

export default DevUttaksplanSideSkjema;
