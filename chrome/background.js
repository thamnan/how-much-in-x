var rateProvider = (function() {

  var currentRate = 0;

  var updateInterval = 30 * 60 * 1000; // 30 minutes

  var API_URL = "http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.xchange%20where%20pair%20in%20%28%22USDLKR%22%29&env=store://datatables.org/alltableswithkeys";

  var updateRates = function() {
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", API_URL, true );

    xhr.onreadystatechange = function() {
      if( xhr.readyState !== XMLHttpRequest.DONE ) {
        return;
      }

      if( xhr.status !== 200 ) {
        return;
      }

      var bidTag = xhr.responseXML.getElementsByTagName( 'Rate' );
      console.assert( bidTag.length === 1 );
      var rateStr = bidTag[0].textContent;
      currentRate = Number( rateStr );
    };

    xhr.send();
  };

  // Update rates at the beginning
  updateRates();

  // Schedule periodic updates
  setInterval( updateRates, updateInterval );

  return {
    getRate: function() {
      return currentRate;
    }
  };

})();

