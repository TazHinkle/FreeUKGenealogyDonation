
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
    console.log(currency);
    var provider = document.getElementById(currency + '-provider-selector')
    provider.style.display = 'block';
        if(currency === 'gb-pounds') {
            provider.addEventListener(
                'click',
                ukProviderClickHandler,
                false
        )}
};

var previousEventHandler = function() {
    clearTitleDestination();
    if(ukProviderContainer.style.display !== 'none' ||
        document.getElementById('us-dollars-provider-selector').style.display !== 'none' ||
        document.getElementById('au-dollars-provider-selector').style.display  !== 'none'
    ){
        clearContentSelector();
        currencyContent.style.display = 'block';
        var currencyTitle = document.getElementById('title-currency');
        currencyTitle.style.display = 'block';
        clearContentDestination();
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


