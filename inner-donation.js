
var paymentHolder = document.getElementById('payment-holder');
var nextButton = document.getElementById('next-button');
var contentDestination = document.getElementById('content-destination');
var providerContainer = document.getElementById('provider-selector');
var contentContainer = document.getElementById('content-selector');
var ukProviderContainer = document.getElementById('gb-pounds-provider-selector');
var previousCollection = document.getElementsByClassName('previous');
var currencyContent = document.getElementById('currency-selector');
var titleDestination = document.getElementById('title-payment');
var currency = '';
var giftaidNext = document.getElementsByClassName('next-giftaid');
var contentBank = document.getElementById('content-bank-transfer');
var contentCheque = document.getElementById('content-cheque');
var prevContainer = document.getElementById('prev-container');
var dividerContainer = document.getElementById('break-container');

var clearContentDestination = function() {
    var contentItems = Array.prototype.slice.apply(
        contentDestination.children
    );
    contentItems.forEach(function(contentItem) {
        contentItem.style.display = 'none';
    });
    document.getElementById('content-default').style.display = 'block';
};

var clearContentSelector = function() {
    var selectorItems = Array.prototype.slice.apply(
        contentContainer.children
    );
    selectorItems.forEach(function(selectorItem) {
        selectorItem.style.display = 'none';
    })
}

var clearTitleDestination = function() {
    var titleItems = Array.prototype.slice.apply(
        titleDestination.children
    );
    titleItems.forEach(function(titleItem) {
        titleItem.style.display = 'none';
    });
}

var advanceClickHandler = function() {
    currency = document.querySelector('input[name="drone"]:checked').value;
    clearTitleDestination();
    clearContentSelector();
    prevContainer.style.display = 'block';
    var provider = document.getElementById(currency + '-provider-selector')
    provider.style.display = 'block';
        if(currency === 'gb-pounds') {
            provider.addEventListener(
                'click',
                ukProviderClickHandler,
                false
        );
            document.getElementById('kindlink-button').focus();
            document.getElementById('title-kindlink').style.display = 'block';
            document.getElementById('content-kindlink').style.display = 'block';
            dividerContainer.style.display = 'block';
        }
        else {
            var paypalTitle = document.getElementById('title-paypal');
            paypalTitle.style.display = 'block';
            for(var l = 0; l < previousCollection.length; l++) {
                previousCollection[l].style.width = "auto";
            }
        }
};

var previousEventHandler = function() {
    var selectorContainer = document.getElementById(currency + '-provider-selector');
    if(selectorContainer.style.display !== 'none'){
        clearTitleDestination();
        clearContentSelector();
        clearContentDestination();
        resetGiftaid();
        currencyContent.style.display = 'block';
        document.getElementById('title-currency').style.display = 'block';
        for(var i = 0; i<previousCollection.length; i++) {
            previousCollection[i].style.width = "90%";
        }
        if(document.getElementById('currency-selector').style.display !== 'none') {
            prevContainer.style.display = 'none';
            dividerContainer.style.display = 'none';
        }
    }
};

var ukProviderClickHandler = function(event) {
    var provider = event.target.dataset.provider;
    if(provider) {
        clearContentDestination();
        var providerContent = document.getElementById('content-' + provider);
        dividerContainer.style.display = 'block';
    }
    if(provider) {
        var titleItems = Array.prototype.slice.apply(
            titleDestination.children
        );
        titleItems.forEach(function(titleItem) {
            titleItem.style.display = 'none';
        });
        var titleContent = document.getElementById('title-' + provider);
        titleContent.style.display = 'block';
        if(provider ===
            'bank-transfer' ||
            'cheque'
        ) {
            document.getElementById('giftaid-eligible').style.display = 'block';
            providerContent.style.display = 'none';
            document.getElementById('giftaid-option').style.display = 'block';
            document.getElementById('giftaid-next').style.display = 'block';

        }
        if(provider === 'kindlink') {
            document.getElementById('content-kindlink').style.display = 'block';
            resetGiftaid();
        }
        if(provider === 'paypal') {
            document.getElementById('content-paypal').style.display = 'block';
            resetGiftaid();
        }
    }
};

var resetGiftaid = function() {
    document.getElementById('giftaid-eligible').style.display = 'none';
    document.getElementById('giftaid-form').style.display = 'none';
    document.getElementById('giftaid-option').style.display = 'none';
    document.getElementById('giftaid-next').style.display = 'none';
    document.getElementById('thank-you').style.display = 'none';
}

var loadGiftaidForm = function() {
    // this must be changed a lot a lot.
    var giftaidRadio = document.querySelector('input[name="ga-selector"]:checked').value;
    document.getElementById('giftaid-eligible').style.display = 'none';
    if (giftaidRadio === 'giftaid') {
        document.getElementById('giftaid-option').style.display = 'none';
        document.getElementById('giftaid-option').style.display = 'none';
        document.getElementById('giftaid-form').style.display = 'inline';

    }
    else {
        document.getElementById('giftaid-option').style.display = 'none';
        document.getElementById('thank-you').style.display = 'block';
        document.getElementById('giftaid-next').style.display = 'none';
    }
};

nextButton.addEventListener(
    'click',
    advanceClickHandler
);

Array.from(giftaidNext).forEach(function(giftaidNextButton) {
    giftaidNextButton.addEventListener(
        'click',
        loadGiftaidForm
    );
});

Array.from(previousCollection).forEach(function(previous) {
    previous.addEventListener(
        'click',
        previousEventHandler
    );
});

