import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Formik, FormikProps, FormikActions } from 'formik';

import { AppState } from '../../../redux/reducers';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';

import Block from 'common/components/block/Block';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';

import { getSøkerrollerForBruker } from '../../../util/domain/søkerrollerUtils';
import isAvailable from '../util/isAvailable';
import { inngangErGyldig } from '../../../util/validation/steg/inngang';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Kjønn, HistoryProps } from '../../../types/common';
import { resolveStegToRender } from '../util/navigation';
import visibility from './visibility';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';
import NewSteg, { NewStegProps } from 'app/components/steg/NewSteg';

export interface StateProps {
    kjønn: Kjønn;
    situasjon: Søkersituasjon;
    valgtRolle: SøkerRolle;
    velgbareRoller: SøkerRolle[];
    stegProps: NewStegProps;
    søker: Søker;
    erEndringssøknad: boolean;
    saksnummer?: string;
}

interface InngangStegValues {
    søkersituasjon: Søkersituasjon;
}

export type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps;

class InngangSteg extends React.Component<Props, {}> {
    initiellSituasjon: Søkersituasjon | undefined;
    initiellSøkerrolle: SøkerRolle | undefined;

    constructor(props: Props) {
        super(props);

        this.cleanupSøknad = this.cleanupSøknad.bind(this);
        this.updateSituasjonAndRolleInState = this.updateSituasjonAndRolleInState.bind(this);

        this.initiellSituasjon = props.situasjon;
        this.initiellSøkerrolle = props.valgtRolle;
    }

    resolveSøkerRolle(situasjon: Søkersituasjon) {
        const { kjønn, søker } = this.props;
        const { rolle } = søker;

        if (situasjon === Søkersituasjon.ADOPSJON && kjønn === Kjønn.KVINNE) {
            return SøkerRolle.MOR;
        }

        if (kjønn === Kjønn.MANN) {
            return SøkerRolle.FAR;
        }

        return rolle;
    }

    updateSituasjonAndRolleInState(situasjon: Søkersituasjon) {
        const { søker, dispatch } = this.props;

        const updatedSøker: SøkerPartial = {
            ...søker,
            rolle: this.resolveSøkerRolle(situasjon)
        };

        dispatch(
            søknadActions.updateSøknad({
                situasjon,
                søker: updatedSøker as Søker
            })
        );
    }

    cleanupSøknad() {
        const { valgtRolle, saksnummer, situasjon, erEndringssøknad, dispatch } = this.props;
        if (situasjon !== this.initiellSituasjon || valgtRolle !== this.initiellSøkerrolle) {
            dispatch(
                søknadActions.setSøknad({
                    erEndringssøknad,
                    saksnummer,
                    situasjon,
                    harGodkjentVilkår: true
                })
            );
            dispatch(
                søknadActions.updateSøker({
                    rolle: valgtRolle
                })
            );
        }
    }

    render() {
        const { velgbareRoller, søker, dispatch, kjønn, stegProps } = this.props;
        const erRolleGyldig = velgbareRoller.some((r) => r === søker.rolle);
        const { rolle } = søker;

        return (
            <Formik
                initialValues={{}}
                onSubmit={(values: InngangStegValues, actions: FormikActions<InngangStegValues>) => {
                    actions.setSubmitting(false);
                    this.updateSituasjonAndRolleInState(values.søkersituasjon);
                }}
                render={(formikBag: FormikProps<InngangStegValues>) => (
                    <NewSteg
                        {...stegProps}
                        renderFortsettKnapp={inngangErGyldig(formikBag.values.søkersituasjon, kjønn, erRolleGyldig)}
                        nesteStegID={resolveStegToRender(formikBag.values.søkersituasjon)}
                        onSubmit={formikBag.handleSubmit}
                        isSubmitting={formikBag.isSubmitting}
                        isFormik={true}>
                        <Block>
                            <SøkersituasjonSpørsmål
                                situasjon={formikBag.values.søkersituasjon}
                                onChange={formikBag.handleChange}
                            />
                        </Block>
                        <Block
                            visible={visibility.søkerRolleSpørsmål({
                                velgbareRoller,
                                situasjon: formikBag.values.søkersituasjon
                            })}>
                            <SøkerrolleSpørsmål
                                rolle={rolle}
                                roller={velgbareRoller}
                                onChange={(nyRolle: SøkerRolle) =>
                                    dispatch(
                                        søknadActions.updateSøker({
                                            rolle: nyRolle
                                        })
                                    )
                                }
                            />
                        </Block>
                        <Block visible={visibility.papirsøknadInfo(formikBag.values.søkersituasjon)}>
                            <Veilederinfo>
                                <Block margin="xs">
                                    <FormattedMessage id="velkommen.foreldreansvar.veileder" />
                                </Block>
                                <Lenke href={lenker.papirsøknad}>
                                    <FormattedMessage id="papirsøknad.lenke" />
                                </Lenke>
                            </Veilederinfo>
                        </Block>
                    </NewSteg>
                )}
            />
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const kjønn = props.søkerinfo.person.kjønn;
    const situasjon = state.søknad.situasjon;
    const søker = state.søknad.søker;
    const valgtRolle = state.søknad.søker.rolle;
    const velgbareRoller = kjønn && situasjon ? getSøkerrollerForBruker(kjønn, situasjon) : [];
    const erEndringssøknad = state.søknad.erEndringssøknad;

    const stegProps: NewStegProps = {
        id: StegID.INNGANG,
        renderFormTag: false,
        history: props.history,
        isAvailable: isAvailable(StegID.INNGANG, state.søknad, props.søkerinfo),
        onSubmit: () => null,
        isSubmitting: false
    };

    return {
        kjønn,
        søker,
        situasjon,
        valgtRolle,
        velgbareRoller,
        stegProps,
        erEndringssøknad,
        saksnummer: state.søknad.saksnummer
    };
};

export default connect<StateProps>(mapStateToProps)(InngangSteg);
