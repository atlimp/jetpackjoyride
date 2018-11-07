class Achievement extends Entity {
  
  constructor() {
  	super();
	this.possible = [];
	this.placeHolder = document.createElement('div')
	//this.output = document.querySelector('.results');
	//this.score = Score.status();
  }

  spawnAchievement() {
    document.body.appendChild(this.placeHolder);
  }

  removeAcievement() {
  	document.body.removeChild(this.placeHolder);
  }

  update() {
  	/*Afkomenta til að sjá achievement box*/
  	//this.spawnAchievement();

  }

}
