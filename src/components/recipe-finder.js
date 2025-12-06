import { LitElement, html, css } from "lit";

import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/checkbox/checkbox.js";

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

            .container{
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: flex-start;
                align-items: center;
            }

            .center-text {
                text-align: center;
            }

            .spacer{
                width: 92px;
            }

            .form-title{
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

            <div id="recipesContainer">
                <div id="recipeFormContainer" >
                    <div class="form-title center-text" >
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
                        <div>
                            <label>
                                <md-checkbox value="sal" name="restrictions"></md-checkbox>
                                Sal
                            </label>
                        </div>
                    </div>
                </div>

                <div id="suggestedRecipeContainer" hidden class="container">
                    <h3>Receita</h3>
                    <div id="suggestedRecipe" class="container"  ></div>
                </div>

            </div>
        `;
    }
}
customElements.define("recipe-finder", RecipeFinder);
