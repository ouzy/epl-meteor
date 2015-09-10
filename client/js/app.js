EPLTeams = new Mongo.Collection("eplteams");


Router.configure({
	layoutTemplate: 'home',
});


Router.route('/', {
    name:"homepage"
});


Router.route('teamList', {
	path: '/teams'
});

Router.route('leagueTable', {
	path: '/table'
});

Router.route('schedule', { //fixtures
    name:"schedule"
});

Template.teamList.helpers({
	num_of_teams: function () {
  		console.log("length: "+ team_list.teams.lenght);
    	return teams.lenght;
	}
});