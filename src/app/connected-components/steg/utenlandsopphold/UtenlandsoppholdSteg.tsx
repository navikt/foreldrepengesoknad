import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import {
    default as InformasjonOmUtenlandsopphold,
    Utenlandsopphold,
    UtenlandsoppholdType
} from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import getMessage from 'common/util/i18nUtils';
import UtenlandsoppholdBolk from '../../../bolker/UtenlandsoppholdBolk';
import Bolk from '../../../../common/components/bolk/Bolk';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import BoddINorgeSiste12MndSpørsmål from '../../../spørsmål/BoddINorgeSiste12MndSpørsmål';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import SkalBoINorgeNeste12MndSpørsmål from '../../../spørsmål/SkalBoINorgeNeste12MndSpørsmål';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { StegID } from '../../../util/stegConfig';
import { HistoryProps } from '../../../types/common';

interface UtenlandsoppholdProps {
    søknad: Søknad;
    stegProps: StegProps;
}

type Props = UtenlandsoppholdProps &
    InjectedIntlProps &
    DispatchProps &
    HistoryProps;

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(
            this
        );
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(
            this
        );
        this.updateUtenlandsopphold = this.updateUtenlandsopphold.bind(this);
    }

    renderSkalBoINorgeNeste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <SkalBoINorgeNeste12MndSpørsmål
                iNorgeNeste12={informasjonOmUtenlandsopphold.iNorgeNeste12Mnd}
                onChange={(iNorgeNeste12Mnd: boolean) =>
                    dispatch(
                        søknadActions.updateUtenlandsopphold({
                            iNorgeNeste12Mnd
                        })
                    )
                }
            />
        );
    }

    renderHarBoddINorgeSiste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <Spørsmål
                synlig={
                    informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined
                }
                render={() => (
                    <BoddINorgeSiste12MndSpørsmål
                        iNorgeSiste12={
                            informasjonOmUtenlandsopphold.iNorgeSiste12Mnd
                        }
                        onChange={(iNorgeSiste12Mnd: boolean) =>
                            dispatch(
                                søknadActions.updateUtenlandsopphold({
                                    iNorgeSiste12Mnd
                                })
                            )
                        }
                    />
                )}
            />
        );
    }

    updateUtenlandsopphold(
        opphold: Utenlandsopphold[],
        oppholdType: UtenlandsoppholdType
    ) {
        const { dispatch } = this.props;
        dispatch(
            søknadActions.updateUtenlandsopphold({ [oppholdType]: opphold })
        );
    }

    render() {
        const { søknad, stegProps, intl } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;

        return (
            <Steg {...stegProps}>
                <Bolk
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderSkalBoINorgeNeste12MndSpørsmål
                            }
                            showUtenlandsoppholdContent={
                                informasjonOmUtenlandsopphold.iNorgeNeste12Mnd ===
                                false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.senereOpphold'
                            )}
                            opphold={
                                søknad.informasjonOmUtenlandsopphold
                                    .senereOpphold
                            }
                            oppholdType={'senereOpphold'}
                            onChange={(opphold: Utenlandsopphold[]) =>
                                this.updateUtenlandsopphold(
                                    opphold,
                                    'senereOpphold'
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={
                        informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !==
                        undefined
                    }
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderHarBoddINorgeSiste12MndSpørsmål
                            }
                            showUtenlandsoppholdContent={
                                informasjonOmUtenlandsopphold.iNorgeSiste12Mnd ===
                                false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.tidligereOpphold'
                            )}
                            opphold={
                                søknad.informasjonOmUtenlandsopphold
                                    .tidligereOpphold
                            }
                            oppholdType={'tidligereOpphold'}
                            onChange={(opphold: Utenlandsopphold[]) =>
                                this.updateUtenlandsopphold(
                                    opphold,
                                    'tidligereOpphold'
                                )
                            }
                        />
                    )}
                />
            </Steg>
        );
    }
}

const utenlandsoppholdHasValues = (info: InformasjonOmUtenlandsopphold) =>
    info.iNorgeSiste12Mnd === true ||
    (info.iNorgeSiste12Mnd === false && info.tidligereOpphold.length > 0) ||
    (info.iNorgeNeste12Mnd === true ||
        (info.iNorgeNeste12Mnd === false && info.senereOpphold.length > 0));

export default injectIntl(
    connect((state: AppState, props: Props) => {
        const { søknad } = state;
        const { informasjonOmUtenlandsopphold } = søknad;
        const { history } = props;

        const stegProps: StegProps = {
            id: StegID.UTENLANDSOPPHOLD,
            renderFortsettKnapp: utenlandsoppholdHasValues(
                informasjonOmUtenlandsopphold
            ),
            history
        };

        return {
            søknad,
            stegProps,
            ...props
        };
    })(UtenlandsoppholdSteg)
);
