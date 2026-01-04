import { Routes, Route, useLocation } from 'react-router';
import { useEffect, useState } from '@lynx-js/react';
import { App } from './App';
import LoginPage from './app/views/Login/LoginPages';
import RegisterPage from './app/views/Register/RegisterPages';
import HomePage from './app/views/Home/HomePage';
import { AuthProvider } from './app/context/AuthProvider';
import { ProtectedRoute } from './app/middleware/ProtectedRoute';
import { StyleProvider } from './app/context/styleContext/StyleProvider';
function PageShell({ children, k }: { children: any; k: string }) {
  const [phase, setPhase] = useState('enter'); // enter → enter-active
  useEffect(() => {
    setPhase('enter');
    requestAnimationFrame(() => setPhase('enter-active'));
  }, [k]);
  return <view className={`page ${phase}`}>{children}</view>;
}
export function AppRoutes() {
  const loc = useLocation();
  return (
    <AuthProvider>
      <StyleProvider>
        <Routes location={loc}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<HomePage />} />}
          />
        </Routes>
      </StyleProvider>
    </AuthProvider>
    // <view className="page-stack">
    //   {/* <PageShell k={loc.key}> */}
    //   {/* </PageShell> */}
    // </view>
  );
}

// import { Routes, Route, useLocation } from 'react-router';
// import { useEffect, useState } from '@lynx-js/react';
// import { App } from './App';
// import LoginPage from './app/pages/LoginPages';
// import RegisterPage from './app/pages/RegisterPages';

// export function AppRoutes() {
//   const location = useLocation();
//   const [currentPathname, setCurrentPathname] = useState(location.pathname);
//   const [prevLocation, setPrevLocation] = useState(location);
//   const [animating, setAnimating] = useState(false);

//   // useEffect(() => {
//   //   // when location changes: remember old page + start anim
//   //   setPrevLocation(location);
//   //   setAnimating(true);
//   //   const timer = setTimeout(() => {
//   //     setAnimating(false);
//   //     setCurrentPathname(location.pathname);
//   //   }, 250);
//   //   // match CSS duration
//   //   return () => clearTimeout(timer);
//   // }, [location.pathname]);

//   return (
//     <Routes location={location}>
//       <Route path="/" element={<App />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<RegisterPage />} />
//     </Routes>
//     // {/* new page, sliding in */}
//     // {/* <view
//     //   className={`page page--front ${currentPathname !== location.pathname ? 'page--front--in' : ''}`}
//     // > */}
//     // {/* </view>{' '} */}
//     // {/* old page only exists while animating */}{' '}
//     // {/* {animating && (
//     //   <view className="page page--behind">
//     //     <Routes location={prevLocation}>
//     //       <Route path="/" element={<App />} />
//     //       <Route path="/login" element={<LoginPage />} />
//     //       <Route path="/signup" element={<RegisterPage />} />
//     //     </Routes>{' '}
//     //   </view>
//     // )}{' '} */}
//   );
// }
