function getMilestones(playerID) {
  let baseURL = "https://www.thesportsdb.com/api/v1/json/3/lookupmilestones.php?id=";
  let URL = baseURL + playerID;

  $.get(URL, function(data) {
    displayResults(data);
  });
}

function displayResults(data) {
  let milestones = data.milestones;
  let milestonesList = $("#milestones-list"); 
  
  milestonesList.empty();

  // Populate the milestones
  milestones.forEach(function(milestone) {
    let listItem = `
      <li>
        <img src="${milestone.strMilestoneLogo}" alt="${milestone.strMilestone}">
        <h3>${milestone.strMilestone}</h3>
        <p>Awarded on ${milestone.dateMilestone} for ${milestone.strTeam}</p>
      </li>
    `;
    milestonesList.append(listItem);
  });
}

function getPlayerID() {
  let baseURL = "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?";
  let player = $("#Player_Name").val();
  let team = $("#Player_Team").val();

  let URL = baseURL + "t=" + team + "&p=" + player;

  $.get(URL, function(data) {
    let playerID = analyze(data);
    getMilestones(playerID); 
  });
}

function analyze(data) {
  return data.player[0].idPlayer;
}
