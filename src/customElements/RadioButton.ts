import { LitElement, html, css, CSSResultGroup, HTMLTemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("radio-button")
export class Checkbox extends LitElement{
    static styles?: CSSResultGroup = css`
        .container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default radio button */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom radio button */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #eee;
            border-radius: 50%;
        }

        /* On mouse-over, add a grey background color */
        .container:hover input ~ .checkmark {
            background-color: #ccc;
        }

        /* When the checkbox is checked, add a green background */
        .container input:checked ~ .checkmark {
            background-color: var(--theme-primary-color);
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the checkmark when checked */
        .container input:checked ~ .checkmark:after {
            display: block;
        }

        /* Style the checkmark/indicator */
        .container .checkmark:after {
            top: 9px;
            left: 9px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }

        `
        @property({ type: String }) options: string = '[]'; // Receive the options as a JSON string
        @property({ type: String }) selectedOption: string = ''; // Keep track of selected option

        protected render(): HTMLTemplateResult {
            const optionsArray = JSON.parse(this.options); // Parse the JSON string to array
            return html`
                <div>
                    ${optionsArray.map(
                        (option: string) => html`
                            <label class="container">
                                ${option}
                                <input
                                    type="radio"
                                    name="radio-group"
                                    value="${option}"
                                    ?checked="${this.selectedOption === option}"
                                    @change="${this.radioChange}"
                                />
                                <span class="checkmark"></span>
                            </label>
                        `
                    )}
                </div>
            `;
        }
        //Event listener to determine which radio button is clicked
        private radioChange(event: Event) {
            const target = event.target as HTMLInputElement;
            this.selectedOption = target.value;
            this.dispatchEvent(new CustomEvent('change', { detail: { value: this.selectedOption } }));
        }
    }
