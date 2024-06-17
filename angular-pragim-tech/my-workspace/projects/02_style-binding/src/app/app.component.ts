import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
                <button class='colorClass' [ngClass]='addClasses()'>My Button</button>
             `,
    styles: [`  
            .boldClass{ font-weight:bold; }  
            .italicsClass{  font-style:italic; }     
            .colorClass{ color:red; }
             `]
})
export class AppComponent {
    applyBoldClass: boolean = true;
    applyItalicsClass: boolean = true;

    addClasses() {
        let classes = {
            boldClass: this.applyBoldClass,
            italicsClass: this.applyItalicsClass
        };

        return classes;
    }
}