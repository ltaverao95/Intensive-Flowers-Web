(function(){

	'use strict';

	var UtilsConstants = {
		EnumResult : {
			ERROR  : 1,
			SUCCESS: 0
		},

		EnumStores: {
			INTENSIVE_FLOWERS_1: 0,
			INTENSIVE_FLOWERS_2: 1,
			INTENSIVE_FLOWERS_3: 2,
			INTENSIVE_FLOWERS_4: 3,
			INTENSIVE_FLOWERS_5: 4,
			INTENSIVE_FLOWERS_6: 5,
		},

		EnumWayToPay: {
			CREDIT_CARD: 0,
			DEBIT_CARD: 1,
			EFFECTIVE: 2
		}
	};

	UtilsConstants.StoresList = [
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_1,
			Name: "INTENSIVE FLOWERS",
			Address: "Cra 30-15",
			Neighborhood: "Palermo",
			Phone: "8978888",
			Img: "Client/Intensive/App/images/flores1.jpg"
		},
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_2,
			Name: "INTENSIVE FLOWERS 2",
			Address: "Cra 20-32",
			Neighborhood: "Estrella",
			Phone: "8889865",
			Img: "Client/Intensive/App/images/flores2.jpg"
		},
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_3,
			Name: "INTENSIVE FLOWERS 3",
			Address: "Cra 15-32",
			Neighborhood: "Chipre",
			Phone: "8870134",
			Img: "Client/Intensive/App/images/flores3.jpg"
		},
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_4,
			Name: "INTENSIVE FLOWERS 4",
			Address: "Cra 36-52",
			Neighborhood: "La Enea",
			Phone: "8740134",
			Img: "Client/Intensive/App/images/flores4.jpg"
		},
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_5,
			Name: "INTENSIVE FLOWERS 5",
			Address: "Cra 23-10",
			Neighborhood: "Centro",
			Phone: "8910234",
			Img: "Client/Intensive/App/images/flores5.jpg"
		},
		{
			Id: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_6,
			Name: "INTENSIVE FLOWERS 6",
			Address: "Cra 23-10",
			Neighborhood: "Alta Suiza",
			Phone: "8919876",
			Img: "Client/Intensive/App/images/flores6.png"
		}
	];

	UtilsConstants.WayToPayList = [
		{
			Id: UtilsConstants.EnumWayToPay.CREDIT_CARD,
			Name: "Tarjeta de Crédito"
		},
		{
			Id: UtilsConstants.EnumWayToPay.DEBIT_CARD,
			Name: "Tarjeta Débito"
		},
		{
			Id: UtilsConstants.EnumWayToPay.EFFECTIVE,
			Name: "Pago en Efectivo"
		},

	];

	angular
		.module('Intensive.Blocks.Utils')
		.constant('Intensive.Blocks.Utils.Constants', UtilsConstants);
})();