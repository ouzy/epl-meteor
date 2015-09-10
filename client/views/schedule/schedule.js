Template.schedule.rendered = function () {
	$.ajax({
      headers: { 'X-Auth-Token': 'd70877da801a433fb3091a07fdd7b319' },
      url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures',
      dataType: 'json',
      type: 'GET',
    }).done(function(response) {
      // do something with the response, e.g. isolate the id of a linked resource        
      var previousFixtures = getFixtureInfo(response, 1);

      console.log("previous: " + previousFixtures);
        for(var i = 0; i < response.fixtures.length; i++) {
            console.log("status: "+response.fixtures[i].status);
            response.fixtures[i].status == "FINISHED" ? displayFinishedGame(response, i): displayUpcomingGame(response, i);
        }
    }); 

    function displayFinishedGame(response, i) {
        $(".schedule-wrapper").append(
            "<p><span>"+response.fixtures[i].homeTeamName+ ": " + response.fixtures[i].result.goalsHomeTeam + "</span> v <span>"+response.fixtures[i].result.goalsAwayTeam + " "+response.fixtures[i].awayTeamName+ "</span></p>"
          );
    }

    function displayUpcomingGame(response, i) {
        $(".schedule-wrapper").append(
            "<p><span>"+response.fixtures[i].homeTeamName+ " - </span>v<span> - "+response.fixtures[i].awayTeamName+ "</span></p>"
         );
    }

    function getFixtureInfo(response, i) {
        var fixture_url = response.fixtures[i]._links.self.href;
        var last5Fixtures;
        $.ajax({
            headers: { 'X-Auth-Token': 'd70877da801a433fb3091a07fdd7b319' },
            url: fixture_url,
            //url: 'http://api.football-data.org/alpha/fixtures?timeFrame=n1',
            dataType: 'json',
            type: 'GET',
        }).done(function(response) {
            last5Fixtures= "";
          for(var i = 0; i < 5; i++) {
            //$(".team_name span").append(response.teams[i].name);
            //$(".team_value span").append(response.teams[i].squadMarketValue)
            //$(".schedule-wrapper").append(
            //    "<p><span>"+response.head2head.fixtures[i].homeTeamName+ ": " + response.head2head.fixtures[i].result.goalsHomeTeam + "</span> v <span>"+response.head2head.fixtures[i].awayTeamName+ ": " + response.head2head.fixtures[i].result.goalsHomeTeam + "</span></p>"
            //);
            last5Fixtures += getIndividualPreviousFixtures(response, i);
            
          }
          console.log("last5Fixtures: "+ last5Fixtures);
        });

        return last5Fixtures; 
    }
    function getIndividualPreviousFixtures(response, i) {
        return "<p><span>"+response.head2head.fixtures[i].homeTeamName+ ": " + response.head2head.fixtures[i].result.goalsHomeTeam + "</span> v <span>"+response.head2head.fixtures[i].awayTeamName+ ": " + response.head2head.fixtures[i].result.goalsHomeTeam + "</span></p>";
    }
}

Template.schedule.events({
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