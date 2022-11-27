import type {AppProps} from 'next/app';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import '@/styles/index.css';
import '@/styles/index.scss';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </CssVarsProvider>
  );
};

export default App;
