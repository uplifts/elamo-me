document.addEventListener('DOMContentLoaded', function() {
  let step = Shopify.Checkout.step;
  let currenPathtURL = window.location.pathname;
  let checkoutForm = document.querySelector('.step > form');
  let proceedButton = document.querySelector('#continue_button');
  let nextStepText = document.querySelector('#continue_button [data-continue-button-content]');
  
  let stepContactA = document.querySelector('.checkout-breadcrumbs--A .breadcrumb-item[data-breadcrumb-step="contact_information"]');
  let stepShippingA = document.querySelector('.checkout-breadcrumbs--A .breadcrumb-item[data-breadcrumb-step="shipping_method"]');
  let stepPaymentA = document.querySelector('.checkout-breadcrumbs--A .breadcrumb-item[data-breadcrumb-step="payment_method"]');
  let stepSuccessA = document.querySelector('.checkout-breadcrumbs--A .breadcrumb-item[data-breadcrumb-step="thank_you"]');
  
  let stepContactB = document.querySelector('.checkout-breadcrumbs--B .breadcrumb-item[data-breadcrumb-step="contact_information"]');
  let stepPaymentB = document.querySelector('.checkout-breadcrumbs--B .breadcrumb-item[data-breadcrumb-step="payment_method"]');
  let stepSuccessB = document.querySelector('.checkout-breadcrumbs--B .breadcrumb-item[data-breadcrumb-step="thank_you"]');
  
  let secondPaymentMethodTrigger = document.querySelector('.radio-wrapper[data-select-gateway="65921155262"] .input-radio');

  if (stepTEST) {
    document.documentElement.setAttribute('data-current-step', step);
    switch (step) {
      case 'contact_information':
        stepContactA.classList.remove('mod-blank');
        stepContactA.classList.add('mod-current');

        document.body.classList.add('is-loaded');
        stepContactB.classList.remove('mod-blank');
        stepContactB.classList.add('mod-current');
        if (nextStepText) {
          nextStepText.innerHTML = themeStrings.proceedToPayment;
        }

        break;
      case 'shipping_method':
        stepContactA.classList.remove('mod-blank');
        stepContactA.classList.add('mod-completed');
        stepShippingA.classList.remove('mod-blank');
        stepShippingA.classList.add('mod-current');

        if (!(document.querySelector('.checkout-breadcrumbs--B').offsetParent === null)) {
          document.querySelector('.step__footer__continue-btn').click();
          break;
        }
        
        break;
      case 'payment_method':
        stepContactA.classList.remove('mod-blank');
        stepContactA.classList.add('mod-completed');
        stepShippingA.classList.remove('mod-blank');
        stepShippingA.classList.add('mod-completed');
        stepPaymentA.classList.remove('mod-blank');
        stepPaymentA.classList.add('mod-current');

        let paymentMethodsCheckboxes = document.querySelectorAll('.section--payment-method .input-radio');
        let initialPaymentMethod = document.querySelector('.section--payment-method .input-radio[checked="checked"]');
        stepContactB.classList.remove('mod-blank');
        stepContactB.classList.add('mod-completed');
        stepPaymentB.classList.remove('mod-blank');
        stepPaymentB.classList.add('mod-current');

        if (initialPaymentMethod) {
          initialPaymentMethod.closest('.radio-wrapper') && initialPaymentMethod.closest('.radio-wrapper').classList.add('is-active'); 
        }

        if (paymentMethodsCheckboxes) {
          console.log(paymentMethodsCheckboxes);
          paymentMethodsCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function(e) {
              let otherCheckboxes = Array.from(paymentMethodsCheckboxes).filter(item => item !== checkbox);
              checkbox.closest('.radio-wrapper').classList.toggle('is-active');
              otherCheckboxes.forEach(function(check) {
                check.closest('.radio-wrapper').classList.remove('is-active');
              })
            });
          })
        }
        break;
    
      default:
        break;
    }
  }
  if (document.documentElement.classList.contains('page--thank-youTEST')) {
    document.documentElement.setAttribute('data-current-step', 'thank_you');
    stepContactA.classList.remove('mod-blank');
    stepContactA.classList.add('mod-completed');
    stepShippingA.classList.remove('mod-blank');
    stepShippingA.classList.add('mod-completed');
    stepPaymentA.classList.remove('mod-blank');
    stepPaymentA.classList.add('mod-completed');
    stepSuccessA.classList.remove('mod-blank');
    stepSuccessA.classList.add('mod-completed');
    
    stepContactB.classList.remove('mod-blank');
    stepContactB.classList.add('mod-completed');
    stepPaymentB.classList.remove('mod-blank');
    stepPaymentB.classList.add('mod-completed');
    stepSuccessB.classList.remove('mod-blank');
    stepSuccessB.classList.add('mod-completed');
  }
});

