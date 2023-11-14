document.addEventListener('DOMContentLoaded', function() {
  let step = Shopify.Checkout.step;
  let stepContact = document.querySelector('.breadcrumb-step[data-breadcrumb-step="contact_information"]');
  let stepPayment = document.querySelector('.breadcrumb-step[data-breadcrumb-step="payment_method"]');
  let stepSuccess = document.querySelector('.breadcrumb-step[data-breadcrumb-step="thank_you"]');
  let nextStepText = document.querySelector('#continue_button [data-continue-button-content]');

  if (step) {
    console.log(step);
    document.documentElement.setAttribute('data-current-step', step);
    switch (step) {
      case 'contact_information':
        document.body.classList.add('is-loaded');
        stepContact.classList.remove('mod-inactive');
        stepContact.classList.add('mod-active');
        if (nextStepText) {
          nextStepText.innerHTML = themeStrings.proceedToPayment;
        }
        break;

      case 'shipping_method':
        let firstOrSingleShippingMethod = document.querySelector('.step[data-step="shipping_method"] .input-radio');
        let checkoutForm = document.querySelector('.step[data-step="shipping_method"] form.edit_checkout');
        firstOrSingleShippingMethod.checked = true;
        checkoutForm.submit();
        break;

      case 'payment_method':
        document.body.classList.add('is-loaded');
        stepContact.classList.remove('mod-inactive');
        stepContact.classList.add('mod-passed');
        stepPayment.classList.remove('mod-inactive');
        stepPayment.classList.add('mod-active');
        break;
    
      default:
        break;
    }
  }
  if (document.documentElement.classList.contains('page--thank-you')) {
    document.body.classList.add('is-loaded');
    document.documentElement.setAttribute('data-current-step', 'thank_you');
    stepContact.classList.remove('mod-inactive');
    stepContact.classList.add('mod-passed');
    stepPayment.classList.remove('mod-inactive');
    stepPayment.classList.add('mod-passed');
    stepSuccess.classList.remove('mod-inactive');
    stepSuccess.classList.add('mod-passed');
  }

  const checkoutSupportBoxEl = document.querySelector('.checkoutSupportBoxEl');
  const checkoutSupportBoxMain = document.querySelector('.checkoutSupportBoxMain');
  if (checkoutSupportBoxEl && checkoutSupportBoxMain) {
    checkoutSupportBoxMain.appendChild(checkoutSupportBoxEl.cloneNode(true));
  }
});