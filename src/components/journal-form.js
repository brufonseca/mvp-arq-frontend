import { LitElement, html, css , svg} from 'lit';

import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/switch/switch.js";

import "./form-meal-item.js";

const MEAL_TYPE = {
    'morningSnack': {
        ptType: 'LANCHE_MANHA',
        ptLabel: 'Lanche Manhã'

    },
    'lunch': {
        ptType: 'ALMOCO',
        ptLabel: 'Almoço'

    },
    'afternoonSnack': {
        ptType: 'LANCHE_TARDE',
        ptLabel: 'Lanche Tarde'

    },
    'dinner': {
        ptType: 'JANTAR',
        ptLabel: 'Jantar'

    },
};

const chevronUpSvg = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up</title><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" fill="#354479" /></svg>
`;

const chevronDownSvg = svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" fill="#354479"/></svg>
`;

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

            .switch-container{
                display: flex;
                flex-direction: row;
                align-content: center;
                align-items: center;
                justify-content: flex-start;
                gap: 24px;
            }

            md-switch{
                --md-switch-track-width: 44px;
                --md-switch-track-height: 24px;
                --md-switch-selected-handle-color : var(--md-sys-color-on-surface)
                /* --md-switch-selected-track-color  */
            }

            .meals-container{
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: space-evenly;
                align-items: flex-start;
                gap: 12px;
            }

            *[hidden]{
                display: none !important;
            }
        `
    ];

    render() {


        let mealTemplates = [];

        for(const mealType of Object.keys(MEAL_TYPE)){

            

            let template = html`

            <div class="switch-container" >
                <label for="${mealType}Switch">${MEAL_TYPE[mealType].ptLabel}</label>
                <md-switch id="${mealType}Switch" meal="${mealType}"
                @change=${this._computeItemsVisibility}></md-switch>
                <div id="${mealType}Btns" class="action-btn-container" hidden>

                    <!-- <md-filled-tonal-icon-button id="${mealType}HideShowBtn" @click=${this._toggleItem} meal="${mealType}">
                    ${chevronUpSvg}
                    </md-filled-tonal-icon-button> -->
                    <md-filled-tonal-icon-button id="${mealType}ResetBtn" @click=${this._resetItem} meal="${mealType}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eraser</title><path d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" fill="#354479" /></svg>
                    </md-filled-tonal-icon-button>

                </div>
            </div>

            <form-meal-item id="${mealType}Item" meal="${mealType}" hidden></form-meal-item>
            
            
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

                <div class="meals-container">
                    ${mealTemplates}

                </div>


                
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

    _computeItemsVisibility(e){


        const mealType = e.target.getAttribute("meal");

        const mealTypeSwitch = this.shadowRoot.getElementById(`${mealType}Switch`);

        const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);
        const mealTypeBtns = this.shadowRoot.getElementById(`${mealType}Btns`);


       if(mealTypeSwitch?.selected){
            mealTypeItem.removeAttribute("hidden");
            mealTypeBtns.removeAttribute("hidden");
       } else{
            mealTypeItem.setAttribute("hidden", null);
            mealTypeBtns.setAttribute("hidden", null);
       }

    }

    _resetItem(e){
        const mealType = e.target.getAttribute("meal");
        console.log(`reset ${mealType}`)
    }

    _toggleItem(e){

        const mealType = e.target.getAttribute("meal");

        const hideShowBtn = this.shadowRoot.getElementById(`${mealType}HideShowBtn`);
        const mealTypeItem = this.shadowRoot.getElementById(`${mealType}Item`);

        mealTypeItem?.toggleAttribute("hidden");
        const newIcon = hideShowBtn.innerHTML.includes('chevron-up') ? chevronDownSvg : chevronUpSvg;


        const currentIconElement = hideShowBtn.querySelector('svg');


        console.log(hideShowBtn)

         hideShowBtn.removeChild(currentIconElement);

        //  const ele = document.createElement(newIcon)
          hideShowBtn.innerHTML = newIcon;

    }
}
customElements.define('journal-form', JournalForm);
