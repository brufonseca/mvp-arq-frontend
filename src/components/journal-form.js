import { LitElement, html, css } from 'lit';

import '@material/web/icon/icon.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';


export class JournalForm extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
            }

            .form-title{
                padding:8px;
                background-color: var(--md-sys-color-primary-container);
                color: var(--md-sys-color-on-primary-container);
                display: flex;
                height: 64px;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
            }

            .spacer{
                width: 92px;
            }

            .center-text {
                text-align: center;
            }

            .left-container {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
                gap: 12px;
            }
        `
    ];

    render() {
        return html`
            <div class="form-title center-text">
                <span class="spacer"></span>
                <h3>Novo Registro</h3>
                <div class="left-container">

                    <md-filled-tonal-icon-button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                    </md-filled-tonal-icon-button>

                    <md-filled-tonal-icon-button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                    </md-filled-tonal-icon-button>

                </div>

                

            </div>
        
        `;
    }
}
customElements.define('journal-form', JournalForm);
