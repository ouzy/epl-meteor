Template.teamList.rendered = function () {
	$.ajax({
      url: '/json/teams.json',
      //url: 'http://api.football-data.org/alpha/fixtures?timeFrame=n1',
      dataType: 'json',
      type: 'GET',
    }).done(function(response) {
      // do something with the response, e.g. isolate the id of a linked resource        
      //console.log("teams: "+response.teams.length);
      for(var i = 0; i < response.teams.length; i++) {
      	//$(".team_name span").append(response.teams[i].name);
      	//$(".team_value span").append(response.teams[i].squadMarketValue)
      	//console.log(response.teams[i].code);
	      $(".team_list_container").append(
	      		"<section class='team_wrapper "+ response.teams[i].code +"'>"+
	      			"<div class='crest_wrapper left' >"+
	      				"<div class='crest' style='background-image:url("+ response.teams[i].crestUrl+")'></div>" +
	      			"</div>"+
	      			"<div class='team_info_wrapper right'>"+
	      				"<h2 class='team_name'>" + response.teams[i].name + "</h2>" +
	      				"<p>" + response.teams[i].squadMarketValue + "</p>" +
	      			"</div>"+
	      		 "</section>"
			);
    	}
    }); 

    function getTeamInfo(response, i) {
    	var fixture_url = response.teams[i].fixtures.href;
    	$.ajax({
    		headers: { 'X-Auth-Token': 'd70877da801a433fb3091a07fdd7b319' },
	    	url: fixture_url,
		    //url: 'http://api.football-data.org/alpha/fixtures?timeFrame=n1',
		    dataType: 'json',
		    type: 'GET',
	    }).done(function(response) {
	      
	      for(var i = 0; i < response.teams.length; i++) {
	      	//$(".team_name span").append(response.teams[i].name);
	      	//$(".team_value span").append(response.teams[i].squadMarketValue)
	      $(".team_list_container").append(
	      		"<ul class=''>" +
	      			"<li class='team_name'>Name: <span>" + response.teams[i].name + "</span></li>" +
	      			"<li class='team_value'>Squad Market Value: <span>" +response.teams[i].squadMarketValue + "</span></li>" +
	      		 "</ul>"
			);
	      }
	    }); 
    }
}

Template.teamList.events({
	'click .menu_toggle': function(e){
		e.preventDefault();
		$('.menu_overlay').toggleClass('expanded');
    $('.menu_toggle .fa').toggleClass('rotate45');
	},
	'click .menu_overlay.expanded li': function(e){
		$('.menu_overlay')
			.toggleClass('expanded')
			.removeClass('first_time');
    $('.menu_toggle .fa')
    	.toggleClass('rotate45');

	}
})