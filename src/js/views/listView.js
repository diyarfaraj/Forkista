import { elements } from './base';
import * as jsPDF from 'jspdf';

export const renderItem = (item) => {
	const markUp = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
`;

	elements.shopping.insertAdjacentHTML('beforeend', markUp);
};

export const deleteItem = (id) => {
	const item = document.querySelector(`[data-itemid="${id}"]`);
	item.parentElement.removeChild(item);
};

export const renderBtn = () => {
	const btnMarkUp = `
  
<button class="btn-small save-btn" style="display: flex; justify-content: center;">Save to PDF</button>
  `;
	elements.shopping.insertAdjacentHTML('afterend', btnMarkUp);
};

export const saveListToPdf = (pdfItem) => {
	const saveBtn = document.querySelector('.save-btn').addEventListener('click', () => {
		console.log('pdf-btn clicked');

		const doc = new jsPDF();

		doc.fromHTML(pdfItem, 10, 10);
		doc.save('a4.pdf');
	});
};
