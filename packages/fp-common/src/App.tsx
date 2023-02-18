import { LanguageToggle, Sidebanner } from 'common';
import BackLink from 'common/components/back-link/BackLink';
import AppIntlProvider from 'dev/components/app-intl-provider/AppIntlProvider';
import { HashRouter } from 'react-router-dom';

const App = () => {
    return (
        <AppIntlProvider locale={'nb'}>
            <HashRouter>
                <LanguageToggle availableLocales={['nb', 'nn']} locale="nb" toggle={() => undefined} />
                <Sidebanner dialog={{ text: 'Bla bla bla', title: 'Velkommen' }}></Sidebanner>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BackLink href="#" />
                </div>
            </HashRouter>
        </AppIntlProvider>
    );
};

export default App;
