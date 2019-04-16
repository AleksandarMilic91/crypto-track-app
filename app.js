// window.addEventListener('load', function(){
// 	get_fetched_data();
// 	interval();
// })

var myVar;

function myFunction(){
	myVar = showPage();
}

function showPage(){
	document.getElementById("loader").style.display = "none";
  	document.getElementById("container").style.display = "block";
  	get_fetched_data();
	interval();
}

function get_fetched_data(){

let apiKey = "11183602-721d-4a8d-93f6-6187cf457027";
let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
		qString = "?CMC_PRO_API_KEY=" + apiKey + "&start=1&limit=50&convert=USD"

fetch(url + qString)

	.then(function(resp){
		return resp.json();
	})
	.then(function(data){
		console.log(data.data);
		var cryptos = data.data;
		var table = document.getElementById("cryptoTable");

		for(var i = 0; i < cryptos.length; i++){
			var cryptos_name = cryptos[i].name;
			var cryptos_short = cryptos[i].symbol;
			var cryptos_value = cryptos[i].quote.USD.price;
			var cryptos_last24h = cryptos[i].quote.USD.percent_change_24h;
			

			var row = table.insertRow();
			var cell1 = row.insertCell();
			var cell2 = row.insertCell();
			var cell3 = row.insertCell();
			var cell4 = row.insertCell();
			var cell5 = row.insertCell();
			var cell6 = row.insertCell();
			cell1.innerHTML = cryptos_name;
			cell2.innerHTML = cryptos_short;
			cell3.innerHTML = '$' + ' ' + Math.round(cryptos_value * 100)/100;
			cell4.innerHTML = Math.round(cryptos_last24h * 100)/100 + '%';
			cell5.innerHTML = '<input type="number" style="width: 100%;"></input><button style="width: 100%;">Save</button>';
			cell6.innerHTML = '$ 0.00';

			if(cryptos_last24h > 0){
				cell4.style.color = '#00a005';
			} else {
				cell4.style.color = '#ef1f1f';
			}
		}
	});

}

var vreme = 60;
function interval(){

var my_timer = setInterval(function () {
        vreme = vreme - 5;
        if (vreme == 0) {
            get_fetched_data();
            vreme = 60;
        }
        document.getElementById('timer').innerHTML = vreme;
    }, 5000);

}