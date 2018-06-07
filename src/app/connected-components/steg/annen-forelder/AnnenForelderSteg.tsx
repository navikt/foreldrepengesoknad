import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import Steg, { StegProps } from '../../../components/layout/Steg';
import { StegID } from '../../../util/stegConfig';
import { partials } from './partials';
import { BarnPartial, ForeldreansvarBarn } from '../../../types/søknad/Barn';

import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { Attachment } from 'storage/attachment/types/Attachment';
import { Språkkode } from 'common/intl/types';
import { HistoryProps } from '../../../types/common';
import Søker, { SøkerPartial } from '../../../types/søknad/Søker';
import Person from '../../../types/Person';
import { erFarEllerMedmor } from '../../../util/personUtil';

interface StateProps {
    person: Person;
    barn: BarnPartial;
    søknad: Søknad;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    attachments: Attachment[];
    språk: Språkkode;
    stegProps: StegProps;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    shouldRenderInfoOmDenAndreForelderenPartial() {
        const { annenForelder } = this.props;
        return annenForelder.navn && annenForelder.fnr;
    }

    renderPartials(): any[] {
        const {
            person,
            barn,
            søknad,
            søker,
            annenForelder,
            attachments,
            dispatch,
            språk
        } = this.props;
        const partialList = [] as any;

        partialList.push(
            <partials.AnnenForelderPersonaliaPartial
                søker={søker}
                annenForelder={annenForelder}
                erFarEllerMedmor={erFarEllerMedmor(
                    person.kjønn,
                    søker.søkerRolle
                )}
                dispatch={dispatch}
                språk={språk}
            />
        );

        if (this.shouldRenderInfoOmDenAndreForelderenPartial()) {
            partialList.push(
                <partials.KjentAndreForelderPartial
                    barn={barn as ForeldreansvarBarn}
                    annenForelder={annenForelder}
                    søker={søker}
                    erFarEllerMedmor={erFarEllerMedmor(
                        person.kjønn,
                        søker.søkerRolle
                    )}
                    søknad={søknad}
                    attachments={attachments}
                    dispatch={dispatch}
                />
            );
        }
        return partialList;
    }

    render() {
        const { person, stegProps } = this.props;
        if (person) {
            return <Steg {...stegProps}>{this.renderPartials()}</Steg>;
        }
        return null;
    }
}

const shouldRenderFortsettKnapp = (
    annenForelder: AnnenForelderPartial,
    søker: SøkerPartial,
    attachments: Attachment[],
    erSøkerFarEllerMedmor?: boolean
) => {
    const omsorgsovertakelseIsUploaded = attachments.length > 0;
    const annenForelderHarIkkeRettTilFPOgSøkerErMor =
        annenForelder.harRettPåForeldrepenger === false &&
        !erSøkerFarEllerMedmor;
    const morErUførSpårsmålErBesvart = annenForelder.erUfør !== undefined;
    const erInformertOmSøknadenSpørsmålBesvart =
        annenForelder.erInformertOmSøknaden !== undefined;
    const medmorEllerFarSkalIkkeHaFP =
        annenForelder.skalHaForeldrepenger === false;

    return annenForelder.kanIkkeOppgis ||
        omsorgsovertakelseIsUploaded ||
        erInformertOmSøknadenSpørsmålBesvart ||
        annenForelderHarIkkeRettTilFPOgSøkerErMor ||
        morErUførSpårsmålErBesvart ||
        medmorEllerFarSkalIkkeHaFP
        ? true
        : false;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const person = state.api.person as Person;
    const søknad = state.søknad;
    const barn = state.søknad.barn;
    const søker = state.søknad.søker;
    const annenForelder = state.søknad.annenForelder;
    const attachments = state.attachments;
    const språk = state.common.språkkode;

    const stegProps = {
        id: StegID.RELASJON_TIL_BARN_ADOPSJON,
        renderFortsettKnapp:
            person === undefined
                ? false
                : shouldRenderFortsettKnapp(
                      annenForelder,
                      søker,
                      attachments,
                      erFarEllerMedmor(person.kjønn, søker.søkerRolle)
                  ),
        history: props.history
    };

    return {
        stegProps,
        person,
        søknad,
        barn,
        søker,
        annenForelder,
        attachments,
        språk
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(AnnenForelderSteg)
);
