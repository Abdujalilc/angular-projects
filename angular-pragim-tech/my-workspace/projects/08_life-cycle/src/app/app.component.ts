import { Component } from '@angular/core';

// Notice we have placed the text box in this root component
// To keep the value in the textbox and the component property
// value "userText" in sync we are using 2 way data binding
// We have also bound userText property of this component
// to the input property of the SimpleComponent
@Component({
    selector: 'my-app',
    template: `Your Text : <input type='text' [(ngModel)]='userText'/>
               <br/><br/>
               <simple [simpleInput]='userText'></simple>
              `
})
export class AppComponent {
    userText: string = 'Pragim';
}
