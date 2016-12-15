(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.PaginatorModel', PaginatorModel);

    PaginatorModel.$inject = [

    ];

    function PaginatorModel()
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                SelectAllItems: false,
                CurrentPage: 0,
                PageSize: 6,
                CountCurrentPage: 0,

                ItemsSelected: [],

                NumberOfPages: NumberOfPages,
                CurrentPageChanged: CurrentPageChanged,
                ClearItemsSelected: ClearItemsSelected

            }, dataDTO);

            //######## Public

            function NumberOfPages(itemsList)
            {
                if(itemsList == 0)
                {
                    return 0;
                }

                return Math.ceil(itemsList.length / _self.PageSize);
            }

            function CurrentPageChanged(isNextPage)
            {
                if(isNextPage)
                {
                    _self.CurrentPage = _self.CurrentPage + 1;
                    _self.CountCurrentPage = _self.CurrentPage * _self.PageSize;
                    return;
                }

                _self.CurrentPage = _self.CurrentPage - 1
                _self.CountCurrentPage = _self.CurrentPage * _self.PageSize;
            }

            function ClearItemsSelected()
            {
                _self.ItemsSelected = [];
            }
            //######## Private

        }

        return Model;
    }
})();