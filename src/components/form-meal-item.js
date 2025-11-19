import { LitElement, html, css } from "lit";

import "@material/web/radio/radio.js";
import "@material/web/iconbutton/filled-icon-button.js";

const MEAL_TYPE = {
    morningSnack: "LANCHE_MANHA",
    lunch: "ALMOCO",
    afternoonSnack: "LANCHE_TARDE",
    dinner: "JANTAR",
};

const MEAL_METHOD = [
    { type: "BLW", label: "BLW" },
    { type: "PARTICIPATIVO", label: "Participativo" },
    { type: "TRADICIONAL", label: "Tradicional" },
];

const MEAL_ACCEPTANCE = [
    { type: "OTIMO", label: "Ótimo" },
    { type: "BOM", label: "Bom" },
    { type: "REGULAR", label: "Regular" },
    { type: "RECUSOU", label: "Recusou" },
];

const MEAL_RATING = [
    { type: "SUCESSO", label: "Sucesso" },
    { type: "OK", label: "Bom" },
    { type: "CAOS", label: "Caos" },
];

export class FormMealItem extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];

    static properties = {
        meal: { type: String, attribute: "meal" },
    };

    render() {
        return html`
            <h4>Método</h4>
            ${MEAL_METHOD.map(item => html`
            <div> 
                <md-radio  id="${item.type}" name="metodo" value="${item.type}"></md-radio>
                <label for="${item.type}">${item.label}</label>
            </div>
          `)}

            <h4>Aceitação</h4>

            <h4>Avaliação Geral</h4>

            <h4>Comentários</h4>
        `;
    }
}
customElements.define("form-meal-item", FormMealItem);
