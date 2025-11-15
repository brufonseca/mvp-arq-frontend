import { LitElement, html, css } from 'lit';

import "@material/web/checkbox/checkbox.js";

export class FormMealItem extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static properties = {
        meal: { type: String, attribute: "meal" },
    };

    render() {
        return html`
            <div>${this.meal}</div>

            <label>
                <md-checkbox touch-target="wrapper"></md-checkbox>
                Checkbox one
            </label>
        `;
    }
}
customElements.define('form-meal-item', FormMealItem);
