import * as React from 'react';
import Radioliste, {
    RadiolisteValg
} from 'uttaksplan/components/radioliste/Radioliste';
import { UttaksplamTestSkjemadata } from './UttaksplanSide';
import {
    SøkerRolle,
    Søkersituasjon
} from '../../../types/s\u00F8knad/S\u00F8knad';
import DatoInput from 'common/components/dato-input/DatoInput';
import { Checkbox } from 'nav-frontend-skjema';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';

export interface Props {
    erSynlig: boolean;
    skjemadata: UttaksplamTestSkjemadata;
    onChange: (skjemadata: UttaksplamTestSkjemadata) => void;
}

const søkerroller: RadiolisteValg[] = Object.keys(SøkerRolle).map(
    (rolle): RadiolisteValg => ({ tittel: rolle, verdi: rolle })
);

const søkersituasjoner: RadiolisteValg[] = Object.keys(Søkersituasjon).map(
    (situasjon): RadiolisteValg => ({ tittel: situasjon, verdi: situasjon })
);

const antallBarnValg: RadiolisteValg[] = ['1', '2', '3', '4'].map(
    (antall): RadiolisteValg => ({
        tittel: antall,
        verdi: antall
    })
);
const UttaksplanSideSkjema: React.StatelessComponent<Props> = (props) => {
    const { erSynlig, skjemadata, onChange } = props;
    return (
        <EkspanderbartInnhold erApen={erSynlig}>
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
                <DatoInput
                    id="hendelsesdato"
                    label="Familiehendelsesdato"
                    dato={skjemadata.dato}
                    onChange={(dato) => onChange({ ...skjemadata, dato })}
                />
            </div>
            <div className="blokk-m">
                <Checkbox
                    id="annenForelderSkalHaPermisjon"
                    label="Annen forelder skal ha permisjon"
                    checked={skjemadata.annenForelderSkalHaPermisjon === true}
                    onChange={(evt) =>
                        onChange({
                            ...skjemadata,
                            annenForelderSkalHaPermisjon: evt.target.checked
                        })
                    }
                />
            </div>
        </EkspanderbartInnhold>
    );
};

export default UttaksplanSideSkjema;
