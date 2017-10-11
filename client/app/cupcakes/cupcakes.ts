module sucreesweb {

	interface ICakeParams extends ng.route.IRouteParamsService {
		categoryName: string;
	}

	class CupCakeController {

		private cakeslists : CakesList[];
		private categoryName: string;

		// inject dependencies into controller
		static $inject = ["cakesDataService","$routeParams"];
		constructor(private cakesDataService: ICakesDataService, private $routeParams: ICakeParams) {

			// use ng-init to make url without params instead
			//this.categoryName = $routeParams.categoryName;
			//this.getCakeListCategoryData(this.categoryName);
		}

		/**
		 * @name getCakeListCategoryData
		 * @description Get list of all cakes by category
		 * @param {string} categoryName
		 */
			getCakeListCategoryData(categoryName) {
			    var promise = this.cakesDataService.getCakesByCategory(categoryName);

					console.log(categoryName);

					promise.then((result : ng.IHttpPromiseCallbackArg<CakesList[]>) =>{
			        this.cakeslists = result;
							console.log(result);
			    })
						.catch((reason : any) => {
							alert(reason.Message || reason.message);
					})
			}

	}
	angular
		.module("sucreesweb")
		.controller("CupCakeController", CupCakeController);

}
