
var nextButton = document.getElementById('next-button');
var contentDestination = document.getElementById('content-destination');
var providerContainer = document.getElementById('provider-selector');
var contentContainer = document.getElementById('content-selector');
var ukProviderContainer = document.getElementById('gb-pounds-provider-selector');
var previousCollection = document.getElementsByClassName('previous');
var currencyContent = document.getElementById('currency-selector');
var titleDestination = document.getElementById('title-payment');
var currency = '';

var clearContentDestination = function() {
    var contentItems = Array.prototype.slice.apply(
        contentDestination.children
    );
    contentItems.forEach(function(contentItem) {
        contentItem.style.display = 'none';
    });
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
    var provider = document.getElementById(currency + '-provider-selector')
    provider.style.display = 'block';
        if(currency === 'gb-pounds') {
            provider.addEventListener(
                'click',
                ukProviderClickHandler,
                false
        );
            document.getElementById('title-kindlink').style.display = 'block';
            document.getElementById('content-kindlink').style.display = 'block';
        }
        else {
            var paypalTitle = document.getElementById('title-paypal');
            paypalTitle.style.display = 'block';
            for(var l = 0; l < previousCollection.length; l++) {
                previousCollection[l].style.width = "20%";
            }
        }
};

var previousEventHandler = function() {
    var selectorContainer = document.getElementById(currency + '-provider-selector');
    if(selectorContainer.style.display !== 'none'){
        clearTitleDestination();
        clearContentSelector();
        clearContentDestination();
        currencyContent.style.display = 'block';
        var currencyTitle = document.getElementById('title-currency');
        currencyTitle.style.display = 'block';
        for(var i = 0; i<previousCollection.length; i++) {
            previousCollection[i].style.width = "50%";
        }
    }
};

var ukProviderClickHandler = function(event) {
    var provider = event.target.dataset.provider;
    if(provider) {
        clearContentDestination();
        var providerContent = document.getElementById('content-' + provider);
        providerContent.style.display = 'block';
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
    }
};

nextButton.addEventListener(
    'click',
    advanceClickHandler
);

Array.from(previousCollection).forEach(function(previous) {
    previous.addEventListener(
        'click',
        previousEventHandler
    );
});


