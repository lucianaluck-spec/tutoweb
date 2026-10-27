import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { ViewportScroller } from '@angular/common';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      // Garante que o scroll vá para o topo (0,0) a cada mudança de rota
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                // IMPORTANTE: Isso deve bater com o nome que colocamos no styles.scss
                cssLayer: false
            }
            }
        }),
    
    MessageService // 2. ADICIONAR O PROVEDOR AQUI NA RAIZ 
  ]
};
