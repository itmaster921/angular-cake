module sucreesweb {
	class CakesController {

		private cakeslists : CakesList[];
		private categoryName: string;

		// inject dependencies into controller
		static $inject = ["cakesDataService"];
		constructor(private cakesDataService: ICakesDataService) {
		}

	/**
	 * @name getCakeListData
	 * @description Get list of all cakes
	 * @param null
	 */
		getCakeListData(categoryName) {
		    var promise = this.cakesDataService.getCakesByCategory(categoryName);

				promise.then((result : ng.IHttpPromiseCallbackArg<CakesList[]>) =>{
		        this.cakeslists = result;
						console.log(this.cakeslists);
		    })
					.catch((reason : any) => {
						alert(reason.Message || reason.message);
				})
		}

	}
	// chaining module and controller creates easier to read code
	angular
		.module("sucreesweb")
		.controller("CakesController", CakesController);
}
