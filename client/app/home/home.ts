module sucreesweb {

	class HomeController {

		private myInterval: number;
		private slides: any[];
		private noWrapSlides: boolean;
  	private active: number ;

		constructor() {

			this.active = 0;
			this.myInterval = 6000;
			this.noWrapSlides = false;
			this.slides = [
				{
					image: '../../assets/images/cakes/fourseasons-banner.jpg',
					url: 'collections/quartets/25'
				},
				{
					image: '../../assets/images/cakes/chocotiramisu-banner.jpg',
					url: 'collections/celebration/24'
				},
				{
					image: '../../assets/images/cakes/cupcakes-banner.jpg',
					url: 'cupcakes'
				}


			];

		}






	}
angular
	.module("sucreesweb")
	.controller("HomeController", HomeController);

}
