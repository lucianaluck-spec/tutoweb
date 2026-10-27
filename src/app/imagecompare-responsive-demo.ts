import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
    selector: 'imagecompare-responsive-demo',
    template: `
        
        <div class="card flex justify-center">
            <p-imagecompare class="sm:!w-96 shadow-lg rounded-2xl">
                <ng-template #right>
                    <img src="/familia.jpg" />
                </ng-template>
                <ng-template #left>
                    <img src="/familia3.jpg" />
                </ng-template>
            </p-imagecompare>
        </div>
    `,
    standalone: true,
    imports: [CommonModule, ImageCompareModule]
})
export class ImagecompareResponsiveDemo {}