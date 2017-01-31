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
		},

		QueryOption: {
			SEARCH_BY_IDENTY_CARD: 0,
			SEARCH_BY_NAME: 1,
			SEARCH_BY_DATE_AND_STORE: 2,
			SEARCH_BY_STORE: 3
		},

		UserAdminRole: {
			ADMINISTRATION: 'admin',
			CONTRIBUTOR: 'contributor',
			EDITOR: 'editor',
			READER: 'reader'
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

	UtilsConstants.BouquetsList = [
		{
			Id: 0,
			Name: "Ramo Mixto",
			Price: 15000,
			Code: "#011351",
			Img: "Client/Intensive/App/images/ramo1.jpg",
			Description: "Ramo especial con flores de diversos colores y tamaños, ideal para eventos y reuniones formales."
		},
		{
			Id: 1,
			Name: "Ramo Sencillo",
			Price: 10000,
			Code: "#011352",
			Img: "Client/Intensive/App/images/ramo2.jpg",
			Description: "Hermoso arreglo de flores con Garberas, en tonos primaverales. Luz, sol, alegría y energía Diseñado para encantar y saludar en ocasiones especiales, Fotografía original de la tienda Entrega puntales años de experiencia. Hermosos diseños florales para impresionar."
		},
		{
			Id: 2,
			Name: "Ramo Múltiple",
			Price: 20000,
			Code: "#01353",
			Img: "Client/Intensive/App/images/ramo3.jpg",
			Description: "Hermoso arreglo de flores con Rosas, Gerberas y otras flores en ramo. Tonos Naranjos rojos y amarillos. Luz, sol, alegría y energía Diseñado para encantar y saludar en ocasiones especiales, Hermosos diseños florales en ramo para impresionar."	
		},
		{
			Id: 3,
			Name: "Ramo de Rosas en Corazón",
			Price: 25000,
			Code: "#01354",
			Img: "Client/Intensive/App/images/ramo4.png",
			Description: "La rosa es la flor más conocida del mundo, pero ¿realmente la conocemos? En el siguiente artículo intentaremos describir la rosa más en profundidad para que la conozcamos mejor. Porque todos sabemos que es la rosa de la pasión y que la más popular es la variedad roja, pero hay muchas más cosas que se pueden decir de ella."	
		},
		{
			Id: 4,
			Name: "Ramos Para Velación",
			Price: 35000,
			Code: "#01355",
			Img: "Client/Intensive/App/images/ramo5.jpg",
			Description: "Ofrecemos los mejores ramos para despedir de una grata manera a todos aquellos seres queridos que hoy nos dejan."
		},
		{
			Id: 5,
			Name: "Ramo Para Matrimonio",
			Price: 23000,
			Code: "#01356",
			Img: "Client/Intensive/App/images/ramo6.jpg",
			Description: "Además de las costumbres y tradiciones que giran en torno a él, el ramo de flores es el elemento de la novia en el que existen más posibilidades de dar rienda suelta a la imaginación: colores, mezclas insólitas, materiales artificiales y tantas opciones como el estilo de la futura novia permita. Todo ello sin olvidar que existen unas premisas básicas en cuanto al tamaño y la forma teniendo en cuenta tanto la personalidad de la novia como la temática de la boda."	
		},
		{
			Id: 6,
			Name: "Ramo de Frutas",
			Price: 50000,
			Code: "#01357",
			Img: "Client/Intensive/App/images/ramo7.jpg",
			Description: "Que mejor que dar un ramo de flores a ese ser querido y aún más si ese ramo contiene unas deliciosas y frescas frutas."	
		}						
	];

	UtilsConstants.QueryOptionsList = [
		{
			Id: UtilsConstants.QueryOption.SEARCH_BY_IDENTY_CARD,
			Label: 'Buscar por cédula',
			IsVisible: true
		},
		{
			Id: UtilsConstants.QueryOption.SEARCH_BY_NAME,
			Label: 'Buscar por nombre',
			IsVisible: false
		},
		{
			Id: UtilsConstants.QueryOption.SEARCH_BY_DATE_AND_STORE,
			Label: 'Buscar por fecha y tienda',
			IsVisible: false
		},
		{
			Id: UtilsConstants.QueryOption.SEARCH_BY_STORE,
			Label: 'Buscar por tienda',
			IsVisible: false
		}
	];

	UtilsConstants.UserAdminRoleList = [
		{
			Label: 'Administración',
			Value: UtilsConstants.UserAdminRole.ADMINISTRATION
		},
		{
			Label: 'Contribuidor',
			Value: UtilsConstants.UserAdminRole.CONTRIBUTOR
		},
		{
			Label: 'Editor',
			Value: UtilsConstants.UserAdminRole.EDITOR
		},
		{
			Label: 'Lector',
			Value: UtilsConstants.UserAdminRole.READER
		}
	];

	angular
		.module('Intensive.Blocks.Utils')
		.constant('Intensive.Blocks.Utils.Constants', UtilsConstants);
})();