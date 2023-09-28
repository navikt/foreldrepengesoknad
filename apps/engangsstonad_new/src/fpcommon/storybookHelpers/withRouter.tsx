import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

const withRouterProvider = (Story: any, context: any) => {
    const path = context.parameters.withRouterDecoratorUrl || 'test';
    return (
        <MemoryRouter>
            <Routes>
                <Route path="*" element={<Navigate to={path} />} />
                <Route path={path} element={<Story />} />
            </Routes>
        </MemoryRouter>
    );
};

export default withRouterProvider;
