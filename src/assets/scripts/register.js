$(function(){
	let countries= [];

    getCountries();

    $(document).on('change','#formCountry', function (e) {
        $('#formCity').html(`<option disabled selected aria-readonly="true">Şəhər seçin</option>`);
        $('.defaultCountrySelect').prop('disabled', 'disabled');
        getCitiesByCountry(this.value)
    });

    async function getCountries() { 
        await fetch('https://localhost:44337/api/settings/getCountries/')
        .then(response => response.json())
        .then(data => countries = data.data)
        .then(data=>{
            countries.forEach(element => {
                $('#formCountry').append(`<option value="${element.id}">${element.name}</option>`);
            })
        })
        .catch(error => {
            throw(error);
        });
    }


    async function getCitiesByCountry(countryId) { 
        await fetch(`https://localhost:44337/api/settings/getCitiesByCountry/${countryId}`)
        .then(response => response.json())
        .then(data=>{
            data.data.forEach(element => {
                $('#formCity').append(`<option value="${element.id}">${element.name}</option>`);
            })
        })
        .catch(error => {
            throw(error);
        });
    }

  });