import { root } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { AppRoutes } from './AppRoutes.js';

const router = (
  <MemoryRouter>
    <AppRoutes />
  </MemoryRouter>
);
root.render(router);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
