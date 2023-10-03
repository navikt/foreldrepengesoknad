import { StoryContext } from '@storybook/react';
import { Path } from 'appData/paths';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

const getElement = (currentPath: string, path: Path, Story: any) => {
    return currentPath === path ? <Story /> : <div>Neste side: {path}</div>;
};

const withRouterProvider = (Story: any, context: StoryContext) => {
    const { routerDecoratorInitUrl } = context.parameters;
    const currentPath = routerDecoratorInitUrl || 'test';

    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Navigate to={currentPath} />} />
                <Route path={Path.VELKOMMEN} element={getElement(currentPath, Path.VELKOMMEN, Story)} />
                <Route path={Path.SØKERSITUASJON} element={getElement(currentPath, Path.SØKERSITUASJON, Story)} />
                <Route path={Path.OM_BARNET} element={getElement(currentPath, Path.OM_BARNET, Story)} />
                <Route path={Path.UTENLANDSOPPHOLD} element={getElement(currentPath, Path.UTENLANDSOPPHOLD, Story)} />
                <Route
                    path={Path.SISTE_UTENLANDSOPPHOLD}
                    element={getElement(currentPath, Path.SISTE_UTENLANDSOPPHOLD, Story)}
                />
                <Route
                    path={Path.NESTE_UTENLANDSOPPHOLD}
                    element={getElement(currentPath, Path.NESTE_UTENLANDSOPPHOLD, Story)}
                />
                <Route path={Path.OPPSUMMERING} element={getElement(currentPath, Path.OPPSUMMERING, Story)} />
                <Route path={Path.KVITTERING} element={getElement(currentPath, Path.KVITTERING, Story)} />
            </Routes>
        </MemoryRouter>
    );
};

export default withRouterProvider;
