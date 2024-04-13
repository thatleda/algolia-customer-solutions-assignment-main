const resultHit = (hit, { html, sendEvent }) => html`<a class="result-hit">
  <div class="result-hit__image-container">
    <img class="result-hit__image" src="${hit.image}" />
  </div>
  <div class="result-hit__details">
    <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
    <p class="result-hit__price">$${hit.price}</p>
  </div>
  <div class="result-hit__controls">
    <button
      id="view-item"
      class="result-hit__view"
      onClick="${(event) => {
        event.stopPropagation();
        return sendEvent('click', hit, 'Product Clicked');
      }}"
    >
      View
    </button>
    <button
      id="add-to-cart"
      class="result-hit__cart"
      onClick="${(event) => {
        event.stopPropagation();
        return sendEvent('conversion', hit, 'Added to Cart', {
          eventSubtype: 'purchase',
          // objectData: [
          //   {
          //     discount: hit.discount || 0,
          //     price: hit.price,
          //     quantity: 1,
          //     currency: 'USD',
          //   },
          // ],
        });
      }}"
    >
      Add To Cart
    </button>
  </div>
</a>`;

export default resultHit;
