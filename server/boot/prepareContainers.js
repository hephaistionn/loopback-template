  
 module.exports = function(server){

 	const Container = server.models.Container;
	const containerPicture = 'pictures';
	  
	function containerCreated(err) {
		if (err) {
			console.log(err);
		}
	}

	function createContainer() {
		Container.createContainer({
			name: containerPicture
		}, containerCreated);
	}

	function checkContainer(err) {
		if (err) {
			createContainer();
		}
	}

	Container.getContainer(containerPicture, checkContainer);
 }

