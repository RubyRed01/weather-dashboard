const searchBtn = document.getElementById("search-button")


searchBtn.addEventListener("click", function(event){
   event.preventDefault()
   var cityName = document.getElementById("city").value
   console.log(cityName)
} )