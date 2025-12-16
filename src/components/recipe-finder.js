import { LitElement, html, css } from "lit";

import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/checkbox/checkbox.js";
import "@material/web/radio/radio.js";

export class RecipeFinder extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: "Roboto", sans-serif;
                height: 100%;
                width: 100%;
            }

            *[hidden] {
                display: none !important;
            }

            .header-bar {
                width: 100%;
                background-color: var(--md-sys-color-on-primary-container);
                height: 20px;
            }

            .title {
                background-color: var(--md-sys-color-primary);
                color: var(--md-sys-color-on-primary);
                display: flex;
                height: 120px;
                align-items: center;
                justify-content: center;
            }

            .container {
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: flex-start;
                align-items: center;
            }

            .center-text {
                text-align: center;
            }

            .spacer {
                width: 92px;
            }

            .form-title {
                background-color: var(--app-accent);
                color: var(--app-text);
                display: flex;
                height: 64px;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
            }

            .left-container {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
                padding: 0 12px;
            }

            md-outlined-text-field {
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
                width: 380px;
            }

            .form-container {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
            }

            .display-horizontal {
                display: flex;
                flex-direction: row;
                align-content: center;
                align-items: center;
                gap: 12px;
            }
            
            #recipesContainer{
                overflow-y: auto;
                height: calc(100vh - 188px);
            }

            .primary-scroll {
                scrollbar-color: var(--md-sys-color-primary-container) var(--md-sys-color-surface-tint);
                scrollbar-width: thin;
            }

            .primary-scroll::-webkit-scrollbar {
                width: 5px;
            }

            .primary-scroll::-webkit-scrollbar-thumb {
                background: var(--md-sys-color-surface-tint);
            }

            .instructions-container{
                width: 80%;
                margin-bottom: 20px;
            }
        `,
    ];

    render() {
        return html`
            <header>
                <div class="header-bar"></div>
                <div class="title">
                    <h2>Buscar Receitas</h2>
                </div>
            </header>

            <div id="recipesContainer" class="primary-scroll">
                <div id="recipeFormContainer">
                    <div class="form-title center-text">
                        <span class="spacer"></span>
                        <!-- <h3>Buscar Receitas</h3> -->
                        <div class="left-container">
                            <md-filled-icon-button @click=${this._resetForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <title>eraser</title>
                                    <path
                                        d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"
                                        fill="#ffffff"
                                    />
                                </svg>
                            </md-filled-icon-button>
                        </div>
                    </div>
                    <div class="form-container recipe-form">
                        <h4>Restrições</h4>
                        <div class="display-horizontal">
                            <label>
                                <md-checkbox value="sal" name="restrictions"></md-checkbox>
                                Sal
                            </label>

                            <label>
                                <md-checkbox value="açúcar" name="restrictions"></md-checkbox>
                                Açúcar
                            </label>

                            <label>
                                <md-checkbox value="leite" name="restrictions"></md-checkbox>
                                Leite
                            </label>

                            <label>
                                <md-checkbox value="ovo" name="restrictions"></md-checkbox>
                                Ovo
                            </label>
                        </div>
                        <h4>Tipo</h4>
                        <div class="display-horizontal">
                            <label>
                                <md-radio name="dishType" value="main course"></md-radio>
                                Principal
                            </label>
                            <label>
                                <md-radio name="dishType" value="side dish"></md-radio>
                                Acompanhamento
                            </label>
                            <label>
                                <md-radio name="dishType" value="breakfast"></md-radio>
                                Café da manhã
                            </label>
                            <label>
                                <md-radio name="dishType" value="dessert"></md-radio>
                                Sobremesa
                            </label>
                            <label>
                                <md-radio name="dishType" value="snack"></md-radio>
                                Lanche
                            </label>
                        </div>
                        <h4>Ingredientes</h4>
                        <md-outlined-text-field id="ingredients" value="" type="textarea" rows="5" cols="60" name="Ingredientes"> </md-outlined-text-field>

                        <div id="btnContainer">
                            <md-filled-tonal-button @click=${this.requestRecipe}> Buscar </md-filled-tonal-button>
                        </div>
                    </div>
                </div>

                <div id="suggestedRecipeContainer" hidden class="container">
                    <h3>Receita</h3>
                    <div id="suggestedRecipe" class="container"></div>
                </div>
            </div>
        `;
    }

    requestRecipe() {
        const checkboxElements = this.shadowRoot.querySelectorAll("md-checkbox");
        let checkboxElemensList = [...checkboxElements];

        const excludeIngredientsList = [];

        checkboxElemensList.forEach((element) => {
            if (element.checked) excludeIngredientsList.push(element.getAttribute("value"));
        });

        const radioElements = this.shadowRoot.querySelectorAll("md-radio");
        let radioElemensList = [...radioElements];

        let dishType = "";

        radioElemensList.forEach((element) => {
            if (element.checked) dishType = element.getAttribute("value");
        });

        const excludeIngredients = excludeIngredientsList.join(",");
        const ingredients = this.shadowRoot.querySelector(`md-outlined-text-field`)?.value;

        if (!ingredients) {
            alert("Você deve fornecer a lista de ingredientes");
            return;
        }

        if (!dishType) {
            dishType = "breakfast";
        }

        const url = `http://127.0.0.1:5000/buscar_receita?excludeIngredients=${excludeIngredients}&ingredients=${ingredients}&dishType=${dishType}`;

        fetch(url, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                console.debug(data);

                if (data.message === "Não foi possível realizar a requisição :/") {
                    alert("Não foi possível encontrar receitas");
                    return;
                }

                const suggestedRecipeContainer = this.shadowRoot.getElementById("suggestedRecipeContainer");
                suggestedRecipeContainer.removeAttribute("hidden");

                const suggestedRecipe = this.shadowRoot.getElementById("suggestedRecipe");
                suggestedRecipe.removeAttribute("hidden");

                let recipeContent = ``;

                const recipe = data;

                recipeContent += `<h4>${recipe.titulo}</h4><br>`;
                recipeContent += `<h5>Ingredientes</h5><br>`;
                recipeContent += `<ul>`;
                recipe.ingredientes.map((ingrediente) => {
                    if (ingrediente !== "") recipeContent += `<li>${ingrediente}</li>`;
                });
                recipeContent += `</ul>`;

                recipeContent += `<h5>Preparo</h5><div class="instructions-container">${recipe.instrucoes}</div>`;

                this.shadowRoot.getElementById("suggestedRecipe").innerHTML = recipeContent;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    _resetForm(){

        const radioElements = this.shadowRoot.querySelectorAll("md-radio");
        const checkboxElements = this.shadowRoot.querySelectorAll("md-checkbox");
        const textElement = this.shadowRoot.getElementById("ingredients");

        for (let element of radioElements) {
            element.checked = false;
        }

        for (let element of checkboxElements) {
            element.checked = false;
        }

        textElement.value = "";
        
    }
}
customElements.define("recipe-finder", RecipeFinder);
