import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FrilansOppdrag } from '../types/søknad/FrilansInformasjon';
import InteractiveList from '../components/interactive-list/InteractiveList';
import { ISODateToMaskedInput } from '../util/dates';
import Knapp from 'nav-frontend-knapper/lib/knapp';

interface FrilansOppdragBolkProps {
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmål: string;
    showOppdragsPerioderContent: boolean;
    oppdrag: FrilansOppdrag[];
    onChange: (oppdrag: FrilansOppdrag[]) => void;
}

export default class FrilansOppdragBolk extends React.Component<
    FrilansOppdragBolkProps
> {
    constructor(props: FrilansOppdragBolkProps) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSelect() {}
    onDelete() {}

    render() {
        const {
            oppdrag,
            oppfølgingsspørsmål,
            renderSpørsmål,
            showOppdragsPerioderContent
        } = this.props;
        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showOppdragsPerioderContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <InteractiveList
                                data={oppdrag}
                                onSelect={this.onSelect}
                                onDelete={this.onDelete}
                                renderElement={(
                                    updatedOppdrag: FrilansOppdrag
                                ) => (
                                    <FrilansOppdragListeElement
                                        oppdrag={updatedOppdrag}
                                    />
                                )}
                                deleteAriaLabel="Slett frilansoppdrag"
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp onClick={() => {}}>
                                <FormattedMessage id="frilansOppdrag.leggTilOppdrag" />
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

interface FrilansOppdragListeElementProps {
    oppdrag: FrilansOppdrag;
}

const FrilansOppdragListeElement: React.StatelessComponent<
    FrilansOppdragListeElementProps
> = ({ oppdrag }) => (
    <React.Fragment>
        <div className="interactiveList__element__land">
            {oppdrag.navnPåArbeidsgiver}
        </div>
        <div className="interactiveList__element__dato">
            <FormattedMessage
                id="tidsintervall"
                values={{
                    fom: ISODateToMaskedInput(oppdrag.tidsperiode.startdato),
                    tom: oppdrag.pågående
                        ? 'pågående'
                        : ISODateToMaskedInput(oppdrag.tidsperiode.sluttdato)
                }}
            />
        </div>
    </React.Fragment>
);
