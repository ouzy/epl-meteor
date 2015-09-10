Template.leagueTable.rendered = function () {
    var fixturesFullList;
    $.ajax({
      headers: { 'X-Auth-Token': 'd70877da801a433fb3091a07fdd7b319' },
      url: 'http://api.football-data.org/alpha/soccerseasons/398/fixtures',
      dataType: 'json',
      type: 'GET',
    }).done(function(fixturesresponse) {
        fixturesFullList = fixturesresponse;
        $.ajax({
          headers: { 'X-Auth-Token': 'd70877da801a433fb3091a07fdd7b319' },
          url: 'http://api.football-data.org/alpha/soccerseasons/398/leagueTable',
          dataType: 'json',
          type: 'GET',
        }).done(function(response) {
          // do something with the response, e.g. isolate the id of a linked resource        
          
            for(var i = 0; i < response.standing.length; i++) {
                $(".team_table_container table").append(
                    "<tr>"+
                        "<td class=''>"+(i+1)+"</td>" +
                        "<td class='header-text'> <span class='show-big'>"+response.standing[i].teamName+"</span> <span class='show-small'></span> </td>" +
                        "<td>" + response.standing[i].playedGames + "</td>" +
                        "<td>" + getTotalWins(response.standing[i].teamName) + "</td>" +
                        "<td>" + getTotalDraws(response.standing[i].teamName) + "</td>" +
                        "<td>" + getTotalLosses(response.standing[i].teamName) + "</td>" +
                        "<td>" + getHomeWins(response.standing[i].teamName) + "</td>" +
                        "<td>" + getHomeDraws(response.standing[i].teamName) + "</td>" +
                        "<td>" + getHomeLosses(response.standing[i].teamName) + "</td>" +
                        "<td>" + getAwayWins(response.standing[i].teamName) + "</td>" +
                        "<td>" + getAwayDraws(response.standing[i].teamName) + "</td>" +
                        "<td>" + getAwayLosses(response.standing[i].teamName) + "</td>" +
                        "<td>" + response.standing[i].goals + "</td>" +
                        "<td>" + response.standing[i].goalsAgainst + "</td>" +
                        "<td>" + response.standing[i].goalDifference + "</td>" +
                        "<td>" + response.standing[i].points + "</td>" +
                    "</tr>" 
                );
            }
        });
    });
    
    function getTotalWins(team) {
        return getHomeWins(team) + getAwayWins(team);
    }

    function getTotalDraws(team) {
        return getHomeDraws(team) + getAwayDraws(team);
    }

    function getTotalLosses(team) {
        return getHomeLosses(team) + getAwayLosses(team);
    }

    function getHomeWins(team) {
        var wins = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].homeTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam > fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                wins++;
            }
        }
        return wins;
    }

    function getHomeDraws(team) {
        var draws = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].homeTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam == fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                draws++;
            }
        }
        return draws;
    }

    function getHomeLosses(team) {
        var loss = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].homeTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam < fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                loss++;
            }
        }
        return loss;
    }

    function getAwayWins(team) {
        var wins = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].awayTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam < fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                wins++;
            }
        }
        return wins;
    }

    function getAwayDraws(team) {
        var draws = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].awayTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam == fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                draws++;
            }
        }
        return draws;
    }

    function getAwayLosses(team) {
        var loss = 0;
        for (var i = 0; i < fixturesFullList.fixtures.length; i++) {
            if(fixturesFullList.fixtures[i].status == "FINISHED" && fixturesFullList.fixtures[i].awayTeamName == team && fixturesFullList.fixtures[i].result.goalsHomeTeam > fixturesFullList.fixtures[i].result.goalsAwayTeam) {
                loss++;
            }
        }
        return loss;
    }
}






