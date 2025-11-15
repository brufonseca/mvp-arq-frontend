import { LitElement, html, css } from 'lit';

import '@material/web/iconbutton/filled-icon-button.js';
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/switch/switch.js";

import "./form-meal-item.js";

const MEAL_TYPE = {
    'morningSnack': 'LANCHE_MANHA',
    'lunch': 'ALMOCO',
    'afternoonSnack': 'LANCHE_TARDE',
    'dinner': 'JANTAR'
};

const MEAL_LABELS = {
    'morningSnack': 'Lanche Manhã',
    'lunch': 'ALMOCO',
    'afternoonSnack': 'LANCHE_TARDE',
    'dinner': 'JANTAR'
};

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

            #tableContainer{
                height: calc(100% - 68px - 140px);
                width: 100%;
            }

            #formContainer{
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                justify-content: space-evenly;
                gap: 8px;
                margin-top: 12px;
            }

            md-outlined-text-field{
                --md-outlined-text-field-label-text-color: var(--md-sys-color-primary);
                --md-outlined-text-field-input-text-color: var(--md-sys-color-primary);
                --md-outlined-field-content-font: var(--md-sys-color-primary);
                --md-outlined-field-focus-content-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-content-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-label-text-color: var(--md-sys-color-primary);
                --md-outlined-field-hover-outline-color: var(--md-sys-color-primary);
                --md-outlined-text-field-hover-input-text-color: var(--md-sys-color-primary);
                --md-filled-text-field-input-text-font: "Roboto", sans-serif;
                --md-filled-text-field-label-text-font: "Roboto", sans-serif;
                
            }
        `
    ];

    render() {


        let mealTemplates = [];

        for(const mealType of Object.keys(MEAL_TYPE)){

            let template = html`
            
            <label for="${mealType}Switch">${MEAL_TYPE[mealType]}</label>
            <md-switch id="${mealType}Switch"></md-switch>
            
            `;

            mealTemplates.push(template);



        }


        return html`
            <div class="form-title center-text">
                <span class="spacer"></span>
                <h3>Novo Registro</h3>
                <div class="left-container">

                    <md-filled-icon-button @click=${this._saveData}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" fill="#ffffff" /></svg>
                    </md-filled-icon-button>

                    <md-filled-icon-button @click=${this._resetForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="#ffffff"/></svg>
                    </md-filled-icon-button>
                </div>
            </div>
            <div id="formContainer" class="form primary-scroll">

                <div>
                    <md-outlined-text-field id="entryDate" label="Data" value=""  type="date" required>
                    </md-outlined-text-field>
                </div>

                <h4 class="primary-color">Refeições Oferecidas</h4>

                <div>
                    ${mealTemplates}

                </div>


                <!-- <form-meal-item meal="breakfast"></form-meal-item>
                <form-meal-item meal="morningSnack"></form-meal-item>
                <form-meal-item meal="lunch"></form-meal-item>
                <form-meal-item meal="eveningSnack"></form-meal-item>
                <form-meal-item meal="dinnerSnack"></form-meal-item> -->
            </div>
        
        `;
    }

    _saveData(e){

        const dateInput = this.shadowRoot.getElementById("entryDate");
        const dateValue = dateInput?.value;

        if(!dateValue){
            alert("A data é obrigatória!");
            return;
        }

        const mealItems = this.shadowRoot.querySelectorAll("form-meal-item");
        console.log(mealItems)

        for(const mealItem of mealItems){

            // const mealData = mealItem.getData();

        }
    }

    _resetForm(){
        console.log("resetar!!")
    }
}
customElements.define('journal-form', JournalForm);
