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

            .warning{
                font-style: italic;
                font-size: 12px;
                margin-bottom: 10px;
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
            <!-- Container rolável -->
            <div id="recipesContainer" class="primary-scroll">
                <!-- Formulário de busca -->
                <div id="recipeFormContainer">
                    <div class="form-title center-text">
                        <span class="spacer"></span>
                    </div>

                    <div class="form-container recipe-form">
                        <!-- Restrições alimentares -->
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
                        <!-- Tipo de prato -->
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
                        <!-- Ingredientes -->
                        <h4>Ingredientes</h4>
                        <md-outlined-text-field id="ingredients" value="" type="textarea" rows="5" cols="60" name="Ingredientes"> </md-outlined-text-field>
                        <span class="warning">Importante: informar os ingredientes separados por vírgula</span>

                        <!-- Botões de ação -->
                        <div id="btnContainer">
                            <md-filled-tonal-button @click=${this.requestRecipe}> Buscar </md-filled-tonal-button>
                            <md-filled-tonal-button @click=${this._resetForm}> Cancelar </md-filled-tonal-button>
                        </div>
                    </div>
                </div>

                <!-- Resultado da busca -->
                <div id="suggestedRecipeContainer" hidden class="container">
                    <h3>Receita</h3>
                    <div id="suggestedRecipe" class="container"></div>
                </div>
            </div>
        `;
    }

    // Realiza uma request de  busca de receita
    requestRecipe() {

        // Coleta restrições selecionadas nos checkboxes
        const checkboxElements = this.shadowRoot.querySelectorAll("md-checkbox");
        let checkboxElemensList = [...checkboxElements];

        const excludeIngredientsList = [];

        checkboxElemensList.forEach((element) => {
            if (element.checked) excludeIngredientsList.push(element.getAttribute("value"));
        });

         // Coleta tipo de prato nos radios
        const radioElements = this.shadowRoot.querySelectorAll("md-radio");
        let radioElemensList = [...radioElements];

        let dishType = "";

        radioElemensList.forEach((element) => {
            if (element.checked) dishType = element.getAttribute("value");
        });

        const excludeIngredients = excludeIngredientsList.join(",");

          // Ingredientes informados pelo usuário
        const ingredients = this.shadowRoot.querySelector(`md-outlined-text-field`)?.value;

        // Validação
        if (!ingredients) {
            alert("Você deve fornecer a lista de ingredientes");
            return;
        }

        if (!dishType) {
            dishType = "breakfast";
        }

        // Monta URL da request
        const url = `http://127.0.0.1:5000/buscar_receita?excludeIngredients=${excludeIngredients}&ingredients=${ingredients}&dishType=${dishType}`;


        // Chamada ao backend
        fetch(url, {
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => {
                console.debug(data);

                // Tratamento de erros 
                if (data.message === "Não foi possível realizar a requisição :/") {
                    this.shadowRoot.getElementById("suggestedRecipe").innerHTML = "";
                    alert("Não foi possível encontrar receitas");
                    return;
                }


                // Exibe container da receita
                const suggestedRecipeContainer = this.shadowRoot.getElementById("suggestedRecipeContainer");
                suggestedRecipeContainer.removeAttribute("hidden");

                const suggestedRecipe = this.shadowRoot.getElementById("suggestedRecipe");
                suggestedRecipe.removeAttribute("hidden");

                // Monta HTML da receita
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

                 // Renderiza resultado
                this.shadowRoot.getElementById("suggestedRecipe").innerHTML = recipeContent;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

     // Reseta todos os campos do formulário
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
